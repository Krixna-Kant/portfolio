# Krishna Kant — Portfolio

Static site. Edit copy in `js/content.js`. Drop your real CV over `assets/resume.pdf`.

## Run locally

Open `index.html` in a browser, or from this folder:

```bash
npx --yes serve .
```

Downloads (Resume / Portfolio) work best on a local server or after deploy — not always on a raw `file://` open.

## Deploy (GitHub Pages)

Repo: [Krixna-Kant/portfolio](https://github.com/Krixna-Kant/portfolio)

GitHub will not go live until Pages is switched on **once** in the repo Settings (Actions cannot do this for you):

1. Open **[this link](https://github.com/Krixna-Kant/portfolio/settings/pages)** while logged in as **Krixna-Kant**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: **main** · Folder: **/ (root)** → **Save**.
4. Wait about a minute. Site: https://krixna-kant.github.io/portfolio/

Later edits (email, resume link, copy) go in `js/content.js`. Push `main` again and Pages updates in a minute or two.
