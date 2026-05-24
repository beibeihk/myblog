# GitHub + CloudBase 自动部署说明

这个项目已经改成了“一次 `git push`，同时更新 GitHub Pages，并在配置好密钥后自动更新 CloudBase”的模式。

## 现在项目里的关键设置

- Hexo 正式地址改成了 GitHub Pages 域名
- `root` 固定成了 `/myblog/`
- GitHub Actions 工作流文件：
  [deploy-blog.yml](C:/D_Drive/我的博客/搭建博客hexo/hexo/blog/.github/workflows/deploy-blog.yml)

这样做的目的，是让 GitHub 和 CloudBase 都共用同一份 `public/` 构建结果。

## 你以后更新博客的方式

1. 在本地修改 Hexo 内容
2. 提交源码到 GitHub 的 `main` 分支
3. GitHub Actions 自动构建
4. 自动更新 GitHub Pages
5. 如果你已经填好 CloudBase 密钥，也会自动更新 CloudBase

## 你需要手动做的事

### 1. 让 GitHub 仓库保存“源码”

这套方案要求 GitHub 仓库里放的是 Hexo 源码，不是单独的 `public/` 静态文件。

如果你 GitHub 上现在放的还是纯静态页面，需要先把这份工程内容推上去。

### 2. 打开 GitHub Pages 的 GitHub Actions 部署

到 GitHub 仓库里设置：

- `Settings`
- `Pages`
- `Build and deployment`
- `Source` 选 `GitHub Actions`

完成后，仓库每次 push 到 `main`，都会执行工作流。

## CloudBase 需要的一次性准备

### 1. 创建 CloudBase 环境

在 CloudBase 控制台里：

- 新建一个环境
- 开通静态网站托管

免费版默认域名更适合个人副本和测试，不适合高流量正式站点。

### 2. 申请云 API 密钥

你需要拿到：

- `SecretId`
- `SecretKey`
- `环境 ID`

### 3. 在 GitHub 仓库里添加 3 个 Secrets

进入：

- `Settings`
- `Secrets and variables`
- `Actions`

添加这三个仓库密钥：

- `TCB_SECRET_ID`
- `TCB_SECRET_KEY`
- `TCB_ENV_ID`

只要这 3 个值填好，工作流里的 CloudBase 步骤就会自动启用。

## CloudBase 会部署到哪里

工作流里已经固定把站点发到：

```text
/myblog
```

也就是 CloudBase 默认域名访问时，路径会是：

```text
https://你的默认域名/myblog/
```

这样刚好和 GitHub Pages 的 `/myblog/` 路径一致，所以同一份 Hexo 构建能在两个网址下正常打开。

## 工作流里已经做好的事

GitHub Actions 会自动：

- 安装依赖
- 执行 `npm run clean && npm run build`
- 发布到 GitHub Pages
- 如果检测到 CloudBase 的 3 个 Secrets，额外发布到 CloudBase

## 本地常用命令

本地预览：

```powershell
npm run server
```

本地重新生成静态文件：

```powershell
npm run deploy
```

提醒部署方式：

```powershell
npm run publish:hint
```

## 你最终会有两个地址

GitHub Pages：

```text
https://beibeihk.github.io/myblog/
```

CloudBase：

```text
https://你的默认域名/myblog/
```

## 如果你的仓库名不是 `myblog`

那要同步改两处：

- `_config.yml` 里的 `root`
- 工作流里 CloudBase 的部署路径

现在这套配置默认假设你的仓库名就是 `myblog`。
