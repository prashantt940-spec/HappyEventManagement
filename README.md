# Happy Event Management Website

A static website version of Happy Event Management ready for free hosting.

## What changed

- Converted the booking section into a contact/lead capture form for static hosting.
- Removed dynamic backend dependencies from the public website.
- Added hosting instructions for Netlify and GitHub Pages.

## Hosting options (free)

### Option 1: Netlify

1. Create a free Netlify account.
2. Connect your GitHub repository or drag the `public` folder into Netlify.
3. Set the publish directory to `public`.
4. Deploy.

### Option 2: GitHub Pages

1. Create a GitHub repository for this project.
2. Push your project to GitHub.
3. In repository settings, set GitHub Pages source to the `main` branch and `/public` folder (or use `docs/` if you move files there).
4. Save and wait for the site URL.

## Deployment notes

- The static website uses `public/index.html`, `public/style.css`, and `public` assets.
- Booking submissions are routed through FormSubmit. Replace `YOUR_EMAIL_HERE` in `public/index.html` with your actual email address.
- If you want the full booking system instead of a static site, a paid backend or cloud host is required.

## Local preview

You can preview the static site by opening `public/index.html` directly in a browser.
