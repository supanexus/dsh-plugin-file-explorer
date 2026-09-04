# @supanexus/dsh-plugin-file-explorer

[中文](./README.md) · English

SupaNexus workspace file explorer for DeepSeek Harness: center tree | multi-tab editor; left sidebar keeps the official conversation list.

## Install

```bash
dsh plugin --profile web add github:supanexus/dsh-plugin-file-explorer#v0.1.0
```

Restart `dsh web` (or Desktop Host) after install. Open the printed `?token=` URL.

## Features

- Top **Files** conversation tab: center tree | editor split; pins session cwd; does **not** occupy `sidebar.workspaces`
- Multi-tab editing, dirty marks, Ctrl/Cmd+S
- Markdown source / preview toggle (`marked`)
- Create / rename / delete (non-empty directories are rejected)
- Optional: open conversation file-path links in the editor
- Monaco via [jsDelivr CDN](https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs); falls back to `<textarea>` on failure or timeout

## Config

`cordis.patch.yml`:

```yaml
config:
  root: !!js process.cwd()
  openLinksInEditor: false
```

Settings → Plugins → **SupaNexus file explorer** hot-updates these fields.

## Develop / rebuild

Peer `@deepseek-ai/*` packages are not on the public npm registry. Build inside a DeepSeek Harness / `whale-harness-free` engine checkout:

```bash
pnpm install && pnpm build && pnpm test
dsh plugin --profile web add "file:/absolute/path/to/dsh-plugin-file-explorer"
```

Published installs use the committed `lib/` artifacts (no user-side build).

## License

MIT © SupaNexus
