# @supanexus/dsh-plugin-file-explorer

中文 · [English](./README.en.md)

在 DeepSeek Harness 里浏览、编辑工作区文件：中间列目录树 + 多标签编辑器；左侧仍是官方对话列表。

仓库：[GitHub](https://github.com/supanexus/dsh-plugin-file-explorer)

## 安装

```bash
dsh plugin --profile web add github:supanexus/dsh-plugin-file-explorer#v0.1.1
```

安装后请**完全重启** `dsh web`（或 Desktop Host），并用打印的 `?token=` 地址打开。

## 能做什么

- 会话顶部 **文件** Tab：目录树 | 编辑器分栏，并固定当前会话工作目录
- 多标签打开文件，未保存会标 dirty；`Ctrl/Cmd+S` 保存
- Markdown 可在源码 / 预览间切换
- 新建、重命名、删除（非空目录不能删）
- 可选：对话里的文件路径链接直接在编辑器中打开
- 代码编辑优先用 Monaco（jsDelivr CDN）；加载失败或超时会自动改用纯文本框

## 怎么用

1. 打开或新建一个会话
2. 点顶部 **文件** Tab
3. 在左侧树中浏览；双击（或点开）文件即可编辑
4. 改完用 `Ctrl/Cmd+S` 保存
5. 右键树节点可新建 / 重命名 / 删除

外观（背景色、字号、方案）可在编辑器工具栏中调整。

## 可选配置

设置 → 插件 → **SupaNexus 文件浏览**，可热更新例如：

| 项 | 含义 | 默认 |
|----|------|------|
| `root` | 浏览根目录 | 当前进程工作目录 |
| `openLinksInEditor` | 对话内文件链接是否在编辑器打开 | `false` |

## License

MIT © SupaNexus
