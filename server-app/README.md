## Releases

Tagging a commit with `server-app-vX.Y.Z` triggers
[`.github/workflows/server-app-release.yml`](../.github/workflows/server-app-release.yml),
which builds Linux AppImage + .deb artifacts and attaches them to a GitHub
Release.

```sh
# Cut a release
git tag server-app-v0.1.0
git push origin server-app-v0.1.0
```

To test the build without tagging, use the workflow's "Run workflow" button
on the Actions tab (`workflow_dispatch`). Artifacts will be available on the
run page but no Release will be created.
