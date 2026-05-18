import Docker from 'dockerode';

const docker = new Docker(); // uses /var/run/docker.sock by default
const CONTAINER_NAME = 'scrypted';
const IMAGE = 'ghcr.io/koush/scrypted:latest';

export async function getContainer() {
  try {
    return docker.getContainer(CONTAINER_NAME);
  } catch {
    return null;
  }
}

export async function getStatus(): Promise<'running' | 'stopped' | 'missing'> {
  const list = await docker.listContainers({ all: true });
  const c = list.find(c => c.Names.includes(`/${CONTAINER_NAME}`));
  if (!c) return 'missing';
  return c.State === 'running' ? 'running' : 'stopped';
}

export async function ensureContainer() {
  const status = await getStatus();
  if (status !== 'missing') return docker.getContainer(CONTAINER_NAME);

  // Pull image if needed
  await new Promise<void>((resolve, reject) => {
    docker.pull(IMAGE, (err: any, stream: any) => {
      if (err) return reject(err);
      docker.modem.followProgress(stream, (e) => (e ? reject(e) : resolve()));
    });
  });

  return docker.createContainer({
    name: CONTAINER_NAME,
    Image: IMAGE,
    HostConfig: {
      NetworkMode: 'host',
      RestartPolicy: { Name: 'unless-stopped' },
      Binds: [`${process.env.HOME}/.scrypted/volume:/server/volume`],
    },
  });
}

export async function start() {
  const c = await ensureContainer();
  await c.start().catch((e: any) => {
    if (e.statusCode !== 304) throw e; // 304 = already started
  });
}

export async function stop() {
  const c = await getContainer();
  if (!c) return;
  await c.stop().catch((e: any) => {
    if (e.statusCode !== 304) throw e; // 304 = already stopped
  });
}

export async function streamLogs(onData: (chunk: string) => void) {
  const c = await getContainer();
  if (!c) return () => {};
  const stream = await c.logs({
    follow: true,
    stdout: true,
    stderr: true,
    tail: 200,
    timestamps: false,
  });
  stream.on('data', (buf: Buffer) => onData(buf.toString('utf8')));
  return () => (stream as any).destroy?.();
}