# Deployment Guide for Tiny Doodle

This guide covers various options for deploying Tiny Doodle so you can test it with friends' kids on their devices.

## Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Pros:** Free, automatic HTTPS, instant updates, easy setup
**Best for:** Quick testing, sharing with friends

#### Steps:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Build the app**
   ```bash
   cd /Users/jamesburney/projects/tiny-doodle
   npm run build
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Link to your Vercel account (create free account if needed)
   - Confirm project settings
   - Get your live URL (e.g., `https://tiny-doodle.vercel.app`)

5. **Share the URL** with friends to test on their iPhones/iPads!

#### Future Updates:
```bash
npm run build
vercel --prod
```

### Option 2: Netlify

**Pros:** Free, drag-and-drop deploy, form handling, automatic deploys from Git
**Best for:** Easy deploys without CLI

#### Steps:

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Go to Netlify**
   - Visit https://app.netlify.com
   - Sign up for free account
   - Click "Add new site" → "Deploy manually"

3. **Drag and drop**
   - Drag the `dist` folder to the deploy area
   - Wait for deployment to complete
   - Get your URL (e.g., `https://tiny-doodle.netlify.app`)

#### With Git (Automatic Deploys):
1. Push your code to GitHub
2. In Netlify: "Add new site" → "Import from Git"
3. Connect GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy!

### Option 3: GitHub Pages

**Pros:** Free, integrated with GitHub, simple
**Cons:** Requires some configuration for SPA routing

#### Steps:

1. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **Update package.json**
   Add these scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Add base path to vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/tiny-doodle/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Deploy from branch `gh-pages`
   - URL: `https://[username].github.io/tiny-doodle/`

### Option 4: Local Network Testing

**Pros:** No internet required, instant testing, no deployment needed
**Best for:** Quick tests with devices on same WiFi

#### Steps:

1. **Find your local IP**
   ```bash
   # On Mac:
   ipconfig getifaddr en0

   # On Linux:
   hostname -I

   # On Windows:
   ipconfig
   ```

2. **Start dev server with host flag**
   ```bash
   npm run dev -- --host
   ```

3. **Access from mobile device**
   - Make sure phone/tablet is on same WiFi
   - Open Safari/Chrome on mobile
   - Go to `http://[YOUR-IP]:3000`
   - Example: `http://192.168.1.100:3000`

4. **Add to Home Screen** for testing PWA features

### Option 5: Self-Hosted (Advanced)

**Pros:** Full control, can customize domain
**Best for:** Long-term hosting, custom domain

#### Requirements:
- VPS or web hosting with Node.js support
- Domain name (optional)

#### Steps:

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Upload dist folder**
   - Use FTP/SFTP to upload `dist` folder contents
   - Or use SSH: `scp -r dist/* user@server:/var/www/html/`

3. **Configure web server**

   **Nginx config:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

   **Apache config (.htaccess):**
   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On
       RewriteBase /
       RewriteRule ^index\.html$ - [L]
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule . /index.html [L]
   </IfModule>
   ```

## Testing After Deployment

### On iPhone/iPad:

1. **Open in Safari** (other browsers may not support PWA fully)
2. **Test the app** - draw, save, etc.
3. **Add to Home Screen**
   - Tap Share button
   - "Add to Home Screen"
   - Tap "Add"
4. **Open from home screen** - should open like native app
5. **Test offline** - turn off WiFi, app should still work

### What to Test:

- [ ] Drawing works smoothly
- [ ] Colors can be selected
- [ ] Brush sizes change
- [ ] Undo/Redo works
- [ ] Can save drawings
- [ ] Gallery loads saved drawings
- [ ] Can delete drawings
- [ ] Works in Guided Access mode
- [ ] Responsive to different screen sizes
- [ ] Touch targets are large enough
- [ ] No lag or performance issues

## Custom Domain (Optional)

### With Vercel:
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed
4. Wait for DNS propagation (5 minutes - 24 hours)

### With Netlify:
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Update DNS records
4. Enable HTTPS (automatic)

## Environment-Specific Configuration

If you need different settings for production:

1. **Create .env files**
   ```bash
   # .env.development
   VITE_API_URL=http://localhost:3000

   # .env.production
   VITE_API_URL=https://api.tinydoodle.com
   ```

2. **Use in code**
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

## Deployment Checklist

Before deploying:

- [ ] Test locally on mobile device (local network)
- [ ] Build succeeds without errors
- [ ] All features work in production build
- [ ] PWA icons are added (see public/ICONS-NEEDED.md)
- [ ] No console errors in production
- [ ] Tested on iOS Safari
- [ ] Tested offline functionality
- [ ] Guided Access instructions are clear

After deploying:

- [ ] URL is accessible
- [ ] App loads correctly
- [ ] Can add to home screen
- [ ] PWA manifest loads
- [ ] Service worker registers
- [ ] All features work as expected
- [ ] Tested with actual children (if possible!)

## Troubleshooting Deployment

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### PWA Not Installing
- Check that you have HTTPS (required for PWA)
- Verify manifest.json is being served
- Check browser console for errors
- Ensure icons exist in public folder

### Blank Page After Deploy
- Check base path in vite.config.ts
- Verify index.html is in root of dist
- Check browser console for errors
- Ensure SPA routing is configured on server

### Slow Performance
- Enable compression on server (gzip/brotli)
- Check bundle size: `npm run build -- --mode analyze`
- Optimize images/assets
- Enable caching headers

## Monitoring & Analytics (Optional)

If you want to track usage (only with parental consent!):

### Privacy-Friendly Options:
- **Plausible Analytics** - GDPR compliant, no cookies
- **Simple Analytics** - Privacy-focused
- **Self-hosted Matomo** - Full control

**Important:** For children's apps, consider NOT using analytics at all to ensure COPPA compliance and maximum privacy.

## Cost Breakdown

### Free Options:
- Vercel: Free tier (100GB bandwidth/month)
- Netlify: Free tier (100GB bandwidth/month)
- GitHub Pages: Free unlimited
- Local network: Free

### Paid Options (if you outgrow free):
- Vercel Pro: $20/month
- Netlify Pro: $19/month
- Custom VPS: $5-10/month
- Custom domain: $10-15/year

## Next Steps

1. **Choose a deployment method** (I recommend Vercel for quickest start)
2. **Deploy the app**
3. **Get the URL**
4. **Test on your iPhone/iPad first**
5. **Share with friends** for testing with their kids
6. **Gather feedback**
7. **Iterate and improve!**

## Quick Deploy Commands Reference

```bash
# Vercel
npm run build && vercel

# Netlify (with CLI)
npm run build && netlify deploy --prod

# GitHub Pages
npm run deploy

# Local testing
npm run dev -- --host
```

---

Good luck with your deployment! If you run into any issues, check the troubleshooting section or the main README.md file.
