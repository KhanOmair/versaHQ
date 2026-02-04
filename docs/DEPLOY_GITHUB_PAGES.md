# Deploying to GitHub Pages

This project includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) to automatically deploy your site to GitHub Pages.

## Step 1: Push to GitHub
Result: The Action will run, build your site, and deploy it to a `gh-pages` environment.

## Step 2: Configure Repository Settings
1. Go to your repository on GitHub.
2. Navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, ensure **Source** is set to **GitHub Actions**.
4. (Optional) If you don't see the site live yet, check the **Actions** tab for any errors.

## Step 3: Custom Domain (Important)
To use a custom domain (e.g., `www.versahq.online`):

1. **DNS Settings**:
   - Go to your specific Domain Registrar (GoDaddy, Namecheap, etc.).
   - Add a `CNAME` record for `www` pointing to `<your-username>.github.io`.
   - Add `A` records for the apex domain pointing to GitHub's IPs (185.199.108.153, etc.).

2. **GitHub Settings**:
   - In **Settings** > **Pages** > **Custom domain**, enter your domain (e.g., `versahq.online`).
   - GitHub will automatically generate a `CNAME` file in your deployment.
   - **Important**: This setting might reset if the `CNAME` file isn't in your `public/` folder.
   - **Fix**: Create a file named `CNAME` (no extension) in the `public/` directory of this project containing your domain name (e.g. `versahq.online`).

3. **Update Config**:
   - Update `site` in `astro.config.mjs` to your new domain.
