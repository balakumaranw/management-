# Flowgrid Website

A responsive, premium black-and-white website for Flowgrid, built with React and Vite.

## Included
- Animated hero, orbit graphics, moving ticker, reveal-on-scroll sections and Flowgrid Bot visual
- Services, process, team, FAQ and contact sections
- WhatsApp contact button and email/phone links
- Responsive mobile navigation
- Custom Flowgrid SVG logo

## Run locally

You need Node.js 18+ installed.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build for deployment

```bash
npm run build
npm run preview
```

The production website is generated in the `dist/` folder.

## Publish to GitHub

1. Create a new empty repository on GitHub named `flowgrid-website`.
2. Extract this project ZIP.
3. In a terminal opened inside the extracted folder, run:

```bash
git init
git add .
git commit -m "Create Flowgrid website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/flowgrid-website.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Deploy with GitHub Pages / Vercel / Netlify
Vercel and Netlify can deploy this Vite project directly. Set the build command to `npm run build` and output directory to `dist`.

For GitHub Pages, configure the Vite `base` option to `'/flowgrid-website/'` in `vite.config.js` if deploying to a project page, then build and publish `dist`.

## Before launch
- Confirm that the phone number and email are correct.
- Replace the initials-based team visuals with approved team portraits if you want real people shown.
- The office/team photography uses remote Unsplash image URLs, so an internet connection is needed to load those photos.
- Flowgrid Bot is presented as a product/service concept. Connect the actual telephony, AI and CRM systems before advertising live capabilities. Concurrent call capacity depends on infrastructure and provider limits.
