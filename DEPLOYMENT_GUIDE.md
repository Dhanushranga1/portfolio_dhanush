# Deployment Guide - dhanushranga.dev

## SEO Optimizations Completed ✅

### 1. Meta Tags Enhancement
- ✅ Primary meta tags (title, description, keywords)
- ✅ Open Graph tags for social media sharing (Facebook, LinkedIn)
- ✅ Twitter Card tags for Twitter/X sharing
- ✅ Canonical URLs to prevent duplicate content
- ✅ Robots meta tag for search engine crawling
- ✅ Author and language meta tags

### 2. SEO Files Created
- ✅ `sitemap.xml` - Lists all pages for search engines
- ✅ `robots.txt` - Tells search engines what to crawl
- ✅ SEO component for dynamic page metadata
- ✅ Pre-configured SEO configs for each page

### 3. Dynamic SEO Implementation
Pages with SEO:
- ✅ Home page
- ✅ Blog listing page
- ✅ Individual blog posts (dynamic metadata)
- 🔲 About, Projects, Contact (you can add these later)

### 4. Vercel Configuration
- ✅ `vercel.json` with proper redirects and headers
- ✅ Security headers (X-Content-Type-Options, X-Frame-Options)
- ✅ Cache control for static assets
- ✅ SPA routing configuration

---

## Deploying to Vercel with Your Custom Domain

### Step 1: Prepare for Deployment

1. **Build Test** (optional but recommended):
   ```bash
   npm run build
   ```
   Make sure there are no build errors.

2. **Commit Your Changes**:
   ```bash
   git add .
   git commit -m "Add SEO optimizations and deployment config"
   git push origin main
   ```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **portfolio** (or whatever you prefer)
   - Directory? **./UniquePortfolio** (press Enter)
   - Override settings? **N**

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

#### Option B: Vercel Dashboard (Easier for First Time)

1. Go to https://vercel.com and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your repository: `portfolio_dhanush`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (or `./UniquePortfolio` if needed)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **"Deploy"**

### Step 3: Connect Your Custom Domain

1. **In Vercel Dashboard**:
   - Go to your project
   - Click **"Settings"** → **"Domains"**
   - Click **"Add"** and enter: `dhanushranga.dev`
   - Also add: `www.dhanushranga.dev` (Vercel will auto-redirect)

2. **Configure DNS with Your Domain Provider**:

   You need to add these DNS records where you bought your domain:

   **For Root Domain (dhanushranga.dev):**
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `76.76.21.21` (Vercel's IP)
   
   OR (preferred method):
   - Type: `CNAME`
   - Name: `@` (or leave blank)
   - Value: `cname.vercel-dns.com`

   **For WWW Subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`

3. **Wait for DNS Propagation** (5 minutes to 48 hours, usually ~1 hour)

4. **Verify in Vercel**:
   - Vercel will automatically detect DNS changes
   - Once detected, SSL certificate will be issued automatically
   - Your site will be live at `https://dhanushranga.dev` 🎉

### Step 4: Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads at `https://dhanushranga.dev`
- [ ] All pages work (Home, About, Projects, Blog, etc.)
- [ ] Blog posts load correctly
- [ ] Images load properly
- [ ] Contact form works (if using Formspree)
- [ ] Mobile responsive design works
- [ ] Check `https://dhanushranga.dev/sitemap.xml` loads
- [ ] Check `https://dhanushranga.dev/robots.txt` loads

---

## SEO Post-Deployment Tasks

### 1. Create Open Graph Image

You need to create `og-image.png` (1200x630px):
- Use Canva: https://www.canva.com/create/open-graph/
- Include: Your name, title, domain
- Match your terminal aesthetic
- Save as `/client/public/og-image.png`
- Redeploy after adding

### 2. Submit to Search Engines

**Google Search Console:**
1. Go to https://search.google.com/search-console
2. Add property: `dhanushranga.dev`
3. Verify ownership (Vercel makes this easy - HTML tag method)
4. Submit sitemap: `https://dhanushranga.dev/sitemap.xml`

**Bing Webmaster Tools:**
1. Go to https://www.bing.com/webmasters
2. Add site: `dhanushranga.dev`
3. Verify ownership
4. Submit sitemap

### 3. Test SEO

**Check these tools:**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Lighthouse (in Chrome DevTools): Check SEO score

**Expected Lighthouse SEO Score: 95-100**

### 4. Update Sitemap (When Adding New Content)

When you publish new blog posts, update `/client/public/sitemap.xml`:
- Add new URL entry
- Update `<lastmod>` dates
- Keep priority values consistent

---

## Environment Variables (If Needed)

If you're using any API keys (Formspree, etc.), add them in Vercel:

1. Dashboard → Your Project → **Settings** → **Environment Variables**
2. Add each variable:
   - `VITE_FORMSPREE_ID` = your-formspree-id
   - etc.
3. Redeploy for changes to take effect

---

## Continuous Deployment

Once set up, Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update blog post"
git push origin main
```

Vercel will:
1. Detect the push
2. Run `npm install`
3. Run `npm run build`
4. Deploy to production
5. Notify you via email/Slack

---

## Common Issues & Solutions

### Issue: Domain not connecting
**Solution:** 
- Check DNS records are correct
- Wait longer (DNS can take 24-48 hours)
- Use `dig dhanushranga.dev` to check DNS propagation

### Issue: 404 on routes
**Solution:** 
- Vercel should auto-detect SPA routing
- If not, `vercel.json` rewrites should fix it

### Issue: Build fails
**Solution:**
```bash
# Test build locally first
npm run build

# Check the build logs in Vercel dashboard
# Common issues: TypeScript errors, missing dependencies
```

### Issue: Images not loading
**Solution:**
- Make sure images are in `/client/public/`
- Use absolute paths: `/image.png` not `./image.png`
- Check Vercel logs for 404s

---

## Performance Optimizations (Post-Launch)

1. **Enable Vercel Analytics** (free):
   - Dashboard → Your Project → **Analytics**
   - Shows real user metrics

2. **Add Vercel Speed Insights**:
   ```bash
   npm install @vercel/speed-insights
   ```

3. **Optimize Images**:
   - Use WebP format
   - Use proper sizing (don't load 4K images)
   - Consider Vercel Image Optimization

4. **Monitor Performance**:
   - Use Lighthouse regularly
   - Check Core Web Vitals
   - Monitor bundle size

---

## Next Steps After Deployment

1. ✅ Deploy to Vercel
2. ✅ Connect custom domain
3. ✅ Create OG image
4. ✅ Submit sitemaps to Google/Bing
5. 📝 Share on LinkedIn, Twitter with your new domain
6. 📝 Add domain to resume and GitHub profile
7. 📝 Set up Google Analytics (optional)
8. 📝 Monitor search console for indexing

---

## Questions?

If you run into issues:
1. Check Vercel logs in dashboard
2. Use browser DevTools console
3. Test locally with `npm run dev`
4. Check DNS with `dig` or `nslookup`

**Your site will be live at:**
- Primary: https://dhanushranga.dev
- Preview: https://portfolio-xxx.vercel.app

Good luck with the deployment! 🚀
