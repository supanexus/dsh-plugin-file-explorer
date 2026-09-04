# @supanexus/dsh-plugin-file-explorer

中文 · [English](./README.en.md)

SupaNexus 工作区文件浏览插件：中间列目录树 + 多标签编辑器；左侧保持官方对话列表。

## 安装

```bash
dsh plugin --profile web add github:supanexus/dsh-plugin-file-explorer#v0.1.0
```

安装后请**完全重启** `dsh web`（或 Desktop Host），并用打印的 `?token=` 地址打开。

## 功能

- 顶部会话 **文件** Tab：中间列为目录树 | 编辑器分栏，并 pin 当前会话 cwd；不占领 `sidebar.workspaces`
- 多标签编辑、dirty 标记、Ctrl/Cmd+S 保存
- Markdown 源码 / 预览切换（`marked`）
- 新建 / 重命名 / 删除（非空目录拒绝）
- 可选：对话内文件路径链接在编辑器中打开
- Monaco 经 [jsDelivr CDN](https://cdn.jsdelivr.net/npm/monaco-editor@0.52.2/min/vs) 加载；失败或超时降级为 `<textarea>`

## 配置

见 `cordis.patch.yml`；设置 → 插件 → **SupaNexus 文件浏览** 可热更新。

## 开发 / 重构建

公开 npm 上没有 `@deepseek-ai/*`。需在 DeepSeek Harness / `whale-harness-free` 的 engine 工作区内构建：

```bash
pnpm install && pnpm build && pnpm test
dsh plugin --profile web add "file:/绝对路径/dsh-plugin-file-explorer"
```

GitHub 安装使用仓内已提交的 `lib/`，用户侧无需编译。

## License

MIT © SupaNexus
