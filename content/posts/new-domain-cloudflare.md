+++
date = '2026-07-17T19:08:03+08:00'
draft = false
title = '博客搬新家：changzh.me + Cloudflare 全自动部署实录'
tags = ['Web', 'Cloudflare', 'Hugo', '建站', 'CI/CD']
ShowToc = true
+++

## 一个好消息：博客有自己的域名了 🎉

从今天起，这个博客有了一个**专属的、好记的新域名**：

> **[https://changzh.me](https://changzh.me)**

`changzh` 取自我名字的拼音 **Chang Zh(ihang)**，短、好敲、还带点设计感。以后你只要记住这一个地址就能找到我。

原来那串又长又绕的地址（挂在 GitHub 上的 `changzhihang.github.io/blog/`）正式退休。新域名不仅更好记，背后整套技术架构也升级了——网站现在跑在 **Cloudflare** 的全球网络上，打开更快、更稳、自带 HTTPS。

这篇文章顺便把**整个搬家 + 配置的过程**完整记录下来。如果你也想给自己的静态博客配一个域名 + 全自动部署，这就是一份可以照抄的实录。

---

## 先搞懂几个概念

在动手之前，得先明白网站是怎么"活着"的。

- **托管（Hosting）**：你的网页文件得放在一台 24 小时开着的服务器上，别人才能随时访问。自己的电脑会关机，不行——得找一台一直在线的机器替你"存着并对外提供"网站。
- **DNS**：互联网的"电话簿"，负责把域名（`changzh.me`）翻译成机器认识的 IP 地址。
- **CDN**：把你的网页缓存到全球各地的节点，用户就近访问，所以快。
- **CI/CD**：让机器自动帮你"构建 + 部署"，你只管写文章，剩下的全自动。

Cloudflare 一家就把**托管、DNS、CDN、HTTPS** 全包了，而且个人博客用它的免费额度完全够。

---

## 为什么从 GitHub Pages 搬到 Cloudflare

原来这个博客是用 **GitHub Pages** 托管的，也能自动部署，其实挺好。这次搬家主要为了：

1. **换个好记的自定义域名**，摆脱 `github.io/blog/` 这种长地址；
2. **体验 Cloudflare 的全球 CDN**，让访问更快；
3. 顺便**折腾一遍现代建站的完整流程**，把概念真正学会。

值得一提的是：这个博客是用 **Hugo** 做的（一个静态网站生成器）。Hugo 有个关键特性——**源码 ≠ 成品**：

```
我写的 Markdown 文章 + 模板   →   [hugo 构建]   →   浏览器能看的 HTML
```

所以不能把源码直接拖上去，必须先"构建"。谁来构建？这就引出了自动化。

---

## 核心思路：让 GitHub 自动构建，再推给 Cloudflare

我没有用 Cloudflare 的 Git 连接，而是选择在 **GitHub Actions** 里写脚本，自己掌控流程：

```
我本地写文章 → git push
        ↓
GitHub Actions 自动：
   1. 安装 Hugo + 拉取主题
   2. hugo 构建成 public/（成品 HTML）
   3. 用 wrangler 把 public/ 推到 Cloudflare Pages
        ↓
Cloudflare 全球托管 + 自动 HTTPS
        ↓
访客访问 changzh.me 秒开
```

关键的部署步骤长这样（`wrangler` 是 Cloudflare 的官方命令行工具）：

```yaml
- name: Deploy to Cloudflare Pages
  run: npx wrangler@3 pages deploy public --project-name blogofbrian --branch main
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

---

## 一个绕不开的安全细节：API Token

GitHub 的服务器要往我的 Cloudflare 里传东西，Cloudflare 凭什么放行？总不能把账号密码写进脚本吧——那太危险了。

正确做法是用 **API Token**：

- 它是一把**权限受限的钥匙**——我只给了它"编辑 Pages"的权限，别的什么都干不了。就算泄露，别人也删不了我账号、动不了 DNS 和账单。这叫**最小权限原则**。
- Token 存在 **GitHub Secrets**（加密保险箱）里，脚本能用，但任何人看代码都看不到内容——公开的脚本里只有 `${{ secrets.CLOUDFLARE_API_TOKEN }}` 这个"名字"，没有真身。

万一泄露也不慌：去 Cloudflare 一键作废旧 Token、重建一个即可，那把钥匙瞬间变废铁。

---

## 中途踩的一个坑

第一次推送时，**构建成功但部署失败**，报错 `Project not found`。

原因是：Cloudflare 上还没有对应的项目"文件夹"，wrangler 想往一个不存在的地方推，自然失败。（脚本本想自动创建，但命令行创建首个项目时有个已知的抽风。）

解决很简单——**在 Cloudflare 网页里手动建一次项目**，之后自动部署就一路畅通了。

> 这也是一课：**报错不可怕，错误信息会告诉你缺了什么。** `Project not found` = 目标不存在 → 那就先把目标建出来。

---

## 最后一步：绑定域名 + 修好链接

因为域名是直接在 Cloudflare 注册的，DNS 天生就在 Cloudflare 手里，所以绑定自定义域名几乎是一键完成，HTTPS 证书也自动签发。

绑好后还有个小尾巴要处理：文章里有些链接**写死了旧域名**（比如指向 `github.io/blog/...`），换域名后就会 404。修法是把它们改成**相对链接**（`/physics/...`），这样跟域名解绑，**不管用哪个地址都不会错**。

---

## 现在的成果

一套 **自己的域名 + 全自动部署 + 全球加速** 的博客系统就位了：

| 能力 | 实现 |
| --- | --- |
| 好记的域名 | `changzh.me`（Cloudflare 注册） |
| 托管 + 加速 | Cloudflare Pages（全球 CDN） |
| HTTPS | 自动签发，零配置 |
| 自动部署 | `git push` 即上线（GitHub Actions） |
| 安全授权 | 最小权限 API Token + GitHub Secrets |

以后我写新文章，只需要在本地 `git push`，一分钟后就自动出现在 `changzh.me` 上。

---

## 写在最后

从"一串长地址"到"自己的域名 + 一套工程化的自动流水线"，这中间用到的每个概念——托管、DNS、CDN、CI/CD、API Token——其实都是现代软件上线的通用套路。亲手走一遍，比看十篇教程都管用。

欢迎收藏新地址 **[changzh.me](https://changzh.me)**，我们下篇文章见 👋
