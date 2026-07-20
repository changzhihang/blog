+++
date = '2026-07-17T19:08:03+08:00'
draft = false
title = 'New Home for the Blog: changzh.me + Fully Automated Cloudflare Deployment'
tags = ['Web', 'Cloudflare', 'Hugo', 'Site Building', 'CI/CD']
ShowToc = true
+++

## Good News: The Blog Has Its Own Domain

Starting today, this blog has a **dedicated, easy-to-remember new domain**:

> **[https://changzh.me](https://changzh.me)**

The old, unwieldy address `changzhihang.github.io/blog/` has been **intentionally retired** — it is no longer maintained and should no longer point to this site. **A note of caution**: if you ever click a link somewhere and get redirected to that old address, something is misconfigured. Please let me know so I can track it down and fix it. The new domain is not only easier to remember — the entire technical stack behind it has been upgraded. The site now runs on **Cloudflare**'s global network, loading faster and more reliably, with HTTPS included automatically.

This post documents the **complete migration and configuration process**. If you want to set up a custom domain and fully automated deployment for your own static blog, consider this a step-by-step walkthrough you can follow.

---

## Understanding the Key Concepts

Before diving in, it helps to understand how a website stays "alive" on the internet.

- **Hosting**: Your web files need to sit on a server that is on 24/7 so visitors can access them at any time. Your own computer shuts down — you need a machine that is always online to store and serve your site.
- **DNS**: The internet's "phone book." It translates a domain name (`changzh.me`) into an IP address that machines understand.
- **CDN**: Caches your web pages at nodes distributed around the world so users load them from a nearby location, making the site faster.
- **CI/CD**: Lets a machine automatically "build and deploy" for you. You focus on writing; everything else is automated.

Cloudflare covers **hosting, DNS, CDN, and HTTPS** all in one — and the free tier is more than enough for a personal blog.

---

## Why Move from GitHub Pages to Cloudflare

The blog was originally hosted on **GitHub Pages**, which also supported automatic deployment and worked quite well. The reasons for this migration were:

1. **Get a clean custom domain** and escape the long `github.io/blog/` address;
2. **Experience Cloudflare's global CDN** for faster load times;
3. **Walk through the full modern site-building workflow** and actually internalize the concepts.

Worth noting: this blog is built with **Hugo** (a static site generator). Hugo has a key characteristic — **source code is not the final product**:

```
Markdown posts + templates   →   [hugo build]   →   HTML the browser can render
```

So you cannot upload the source directly — it must be "built" first. Who does the building? That is where automation comes in.

---

## The Core Approach: Let GitHub Build, Then Push to Cloudflare

Rather than using Cloudflare's built-in Git integration, I chose to write the pipeline myself in **GitHub Actions** to maintain full control over the process:

```
Write post locally → git push
        ↓
GitHub Actions automatically:
   1. Install Hugo + pull theme
   2. hugo build → public/ (the final HTML)
   3. Use wrangler to push public/ to Cloudflare Pages
        ↓
Cloudflare global hosting + automatic HTTPS
        ↓
Visitors open changzh.me instantly
```

The key deployment step looks like this (`wrangler` is Cloudflare's official CLI tool):

```yaml
- name: Deploy to Cloudflare Pages
  run: npx wrangler@3 pages deploy public --project-name blogofbrian --branch main
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

---

## An Important Security Detail: API Tokens

GitHub's servers need to push files into my Cloudflare account — but why should Cloudflare allow that? You certainly cannot hard-code your account password into a script — that would be far too dangerous.

The right approach is an **API Token**:

- It is a **scoped key** — I granted it only "edit Pages" permission and nothing else. Even if it leaks, no one can delete my account, touch DNS settings, or access billing. This is the **principle of least privilege**.
- The token is stored in **GitHub Secrets** (an encrypted vault). The workflow can use it, but no one reading the code can see the actual value — the public script only contains `${{ secrets.CLOUDFLARE_API_TOKEN }}`, a name, not the secret itself.

If it ever leaks: go to Cloudflare, revoke the old token, and generate a new one. The old key becomes instantly useless.

---

## A Pitfall Along the Way

On the first push, **the build succeeded but the deployment failed** with `Project not found`.

The reason: there was no corresponding project "folder" on Cloudflare yet. Wrangler tried to push to a destination that did not exist and naturally failed. (The script was intended to auto-create it, but there is a known quirk when creating the very first project via the CLI.)

The fix was straightforward — **manually create the project once in the Cloudflare dashboard**, and automatic deployment has worked flawlessly ever since.

> A useful lesson: **error messages are not scary — they tell you what is missing.** `Project not found` = the target does not exist → create the target first.

---

## Final Step: Binding the Domain and Fixing Links

Because the domain was registered directly through Cloudflare, DNS was already under Cloudflare's control, making the custom domain binding nearly one-click. The HTTPS certificate was issued automatically.

After binding, there was one loose end: some posts had **hardcoded old-domain links** (pointing to `github.io/blog/...`), which would 404 after the domain change. The fix was to convert them to **relative links** (`/physics/...`), decoupling them from the domain entirely — they work correctly regardless of which address is used.

---

## The Result

A complete blog system with **a custom domain, fully automated deployment, and global acceleration** is now in place:

| Capability | Implementation |
| --- | --- |
| Easy-to-remember domain | `changzh.me` (registered via Cloudflare) |
| Hosting + acceleration | Cloudflare Pages (global CDN) |
| HTTPS | Automatically issued, zero configuration |
| Automated deployment | `git push` goes live (GitHub Actions) |
| Secure authorization | Least-privilege API Token + GitHub Secrets |

Now whenever I write a new post, I just `git push` locally, and it appears on `changzh.me` within a minute automatically.

---

## Closing Thoughts

Going from "a long, forgettable URL" to "your own domain backed by an automated engineering pipeline" — every concept along the way (hosting, DNS, CDN, CI/CD, API tokens) is a fundamental pattern in how modern software ships. Walking through it hands-on is worth more than reading ten tutorials.

Bookmark the new address **[changzh.me](https://changzh.me)** — see you in the next post.
