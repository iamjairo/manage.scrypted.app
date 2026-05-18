import os from 'node:os';
import { PassThrough } from 'node:stream';
import Docker from 'dockerode';

const docker = new Docker();
const CONTAINER_NAME = 'scrypted';
const IMAGE = 'ghcr.io/koush/scrypted:latest';

type ScryptedStatus = 'running' | 'stopped' | 'missing';

async function inspectContainer() {
  const container = docker.getContainer(CONTAINER_NAME);
  try {
    const inspect = await container.inspect();
    return { container, inspect };
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode;
    if (statusCode === 404) {
      return null;
    }
    throw error;
  }
}

async function ensureImage() {
  try {
    await docker.getImage(IMAGE).inspect();
    return;
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode;
    if (statusCode !== 404) {
      throw error;
    }
  }

  const stream = await docker.pull(IMAGE);
  await new Promise<void>((resolve, reject) => {
    docker.modem.followProgress(stream, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

export async function getStatus(): Promise<ScryptedStatus> {
  const found = await inspectContainer();
  if (!found) {
    return 'missing';
  }

  return found.inspect.State?.Running ? 'running' : 'stopped';
}

export async function ensureContainer() {
  const found = await inspectContainer();
  if (found) {
    return found.container;
  }

  await ensureImage();

  return docker.createContainer({
    name: CONTAINER_NAME,
    Image: IMAGE,
    HostConfig: {
      NetworkMode: 'host',
      RestartPolicy: { Name: 'unless-stopped' },
      Binds: [`${os.homedir()}/.scrypted/volume:/server/volume`],
    },
  });
}

export async function start() {
  const container = await ensureContainer();
  try {
    await container.start();
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode;
    if (statusCode !== 304) {
      throw error;
    }
  }
}

export async function stop() {
  const found = await inspectContainer();
  if (!found) {
    return;
  }

  try {
    await found.container.stop();
  } catch (error) {
    const statusCode = (error as { statusCode?: number }).statusCode;
    if (statusCode !== 304) {
      throw error;
    }
  }
}

export async function streamLogs(
  onData: (chunk: string) => void,
  onEnd?: () => void,
): Promise<() => void> {
  const found = await inspectContainer();
  if (!found) {
    onData('[scrypted] container is missing.\r\n');
    onEnd?.();
    return () => undefined;
  }

  const stream = (await found.container.logs({
    follow: true,
    stdout: true,
    stderr: true,
    tail: 200,
    timestamps: false,
  })) as NodeJS.ReadableStream & { destroy?: () => void };

  const stdout = new PassThrough();
  const stderr = new PassThrough();
  docker.modem.demuxStream(stream, stdout, stderr);

  const emitStdout = (chunk: Buffer) => onData(chunk.toString('utf8'));
  const emitStderr = (chunk: Buffer) => onData(chunk.toString('utf8'));
  let closed = false;

  const close = () => {
    if (closed) {
      return;
    }
    closed = true;
    onEnd?.();
  };

  stdout.on('data', emitStdout);
  stderr.on('data', emitStderr);
  stream.on('end', close);
  stream.on('close', close);
  stream.on('error', close);

  return () => {
    stdout.off('data', emitStdout);
    stderr.off('data', emitStderr);
    stream.off('end', close);
    stream.off('close', close);
    stream.off('error', close);
    stream.destroy?.();
    close();
  };
}
