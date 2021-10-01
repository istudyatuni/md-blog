# Markdown static blog

## Usage

Write what you want in `.md` files, place in `site` folder, and publish as static site. All links should be relative for `site` folder, with `#/` and without `.md` extension, for examle, for [`site/second.md`](site/second.md):

```md
[link](#/second)
```

## Additional data

Simple frontmatter is supported, for example:

```md
---
title: Second page
---

# Other content
```

Supported keys:

```yaml
title: Page title
redirect: path/to/new/page # path for redirect
```
