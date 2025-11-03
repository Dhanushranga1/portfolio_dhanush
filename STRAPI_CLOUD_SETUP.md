# Strapi Cloud Setup Guide

This guide will help you set up **Strapi Cloud** for your portfolio project. Your portfolio is a **frontend-only React app** that will connect to a **separate Strapi Cloud project** for content management.

## ✅ What's Already Done

Your portfolio already has:
- `@strapi/client` (v1.5.0) - SDK for connecting to Strapi
- `axios` - HTTP client
- `strapiConfig.ts` - Configuration file with helper functions
- Strapi hooks ready in `client/src/hooks/useStrapi.ts`

## 🎯 What You Need to Do

You need to create a **separate Strapi project** on Strapi Cloud to manage your content (movies, photos, blog posts).

---

## Step 1: Create a Strapi Cloud Account

1. Go to [https://cloud.strapi.io](https://cloud.strapi.io)
2. Sign up with one of these options:
   - **GitHub** (recommended - easiest)
   - Google
   - GitLab
   - Magic link (email)

---

## Step 2: Create a New Strapi Cloud Project

### Option A: Use a Template (Easiest - Recommended for Beginners)

1. Click **Create project** button
2. Choose your plan:
   - **Free** (good for testing)
   - **Essential** ($99/month - for production)
   - **Pro** ($299/month)
   - **Scale** (custom pricing)

3. Click **Use template**
4. In the modal:
   - Select your GitHub account
   - Choose a template (e.g., "Blog" template)
   - Strapi will create a new repository for you

5. Configure your project:
   ```
   Display name: portfolio-cms (or any name)
   Git branch: main
   Deploy on push: ✅ (checked)
   Region: Choose closest to you (US East, Europe West, Asia Southeast, or Oceania)
   ```

6. (Optional) Advanced settings:
   - **Base directory**: Leave blank (unless Strapi is in a subfolder)
   - **Node version**: Auto-detected (leave default)
   - **Environment variables**: Skip for now

7. Click **Continue to billing** (or **Create project** if using Free plan)

8. If using a paid plan, enter payment details

9. Click **Create project**

10. Wait 2-5 minutes for deployment ⏳

### Option B: Use Your Own Repository (Advanced)

If you want to create your own Strapi project from scratch:

1. Create a new GitHub/GitLab repository
2. Clone it locally:
   ```bash
   npx create-strapi-app@latest my-portfolio-cms --quickstart
   cd my-portfolio-cms
   git remote add origin YOUR_REPO_URL
   git add .
   git commit -m "Initial Strapi setup"
   git push -u origin main
   ```

3. Follow steps 1-10 from Option A above, selecting your own repository

---

## Step 3: Access Your Strapi Admin Panel

1. Once deployment is complete, you'll see a **Visit App** button
2. Click it to open your Strapi Cloud URL: `https://your-project.strapiapp.com`
3. You'll see a registration page - **Create your first admin user**:
   ```
   First name: Your name
   Last name: Your last name
   Email: your.email@example.com
   Password: (strong password - save it!)
   ```

4. Click **Let's start** - you're now in the Strapi admin dashboard! 🎉

---

## Step 4: Create Content Types

Now you need to create the data structures for your portfolio content.

### 4.1 Create "Movie" Content Type (for Favorites page)

1. In Strapi admin, click **Content-Type Builder** (left sidebar)
2. Click **Create new collection type**
3. Name it `movie` (singular)
4. Click **Continue**
5. Add these fields:

   | Field Name | Type | Settings |
   |------------|------|----------|
   | `title` | Text | Required |
   | `year` | Number | Integer format |
   | `rating` | Number | Decimal (0-10), Required |
   | `personalNotes` | Rich Text | - |
   | `watched` | Boolean | Default: false |
   | `tmdbId` | Number | Integer, Unique |
   | `posterPath` | Text | - |
   | `overview` | Text (Long) | - |
   | `genres` | JSON | - |

6. Click **Finish** then **Save**

### 4.2 Create "Photo Album" Content Type

1. Click **Create new collection type**
2. Name it `photoAlbum` (singular)
3. Add fields:

   | Field Name | Type | Settings |
   |------------|------|----------|
   | `title` | Text | Required |
   | `description` | Text (Long) | - |
   | `coverImage` | Media (Single) | Images only |
   | `date` | Date | - |

4. Click **Finish** then **Save**

### 4.3 Create "Photo" Content Type

1. Click **Create new collection type**
2. Name it `photo` (singular)
3. Add fields:

   | Field Name | Type | Settings |
   |------------|------|----------|
   | `title` | Text | Required |
   | `description` | Text (Long) | - |
   | `image` | Media (Single) | Images only, Required |
   | `album` | Relation | photo (many) → photoAlbum (one) |
   | `tags` | JSON | - |
   | `dateTaken` | Date | - |
   | `camera` | Text | - |
   | `location` | Text | - |

4. Click **Finish** then **Save**

### 4.4 Create "Blog Category" Content Type

1. Click **Create new collection type**
2. Name it `blogCategory` (singular)
3. Add fields:

   | Field Name | Type | Settings |
   |------------|------|----------|
   | `name` | Text | Required, Unique |
   | `slug` | UID (based on name) | Required |
   | `description` | Text | - |

4. Click **Finish** then **Save**

### 4.5 Create "Blog Post" Content Type

1. Click **Create new collection type**
2. Name it `blogPost` (singular)
3. Add fields:

   | Field Name | Type | Settings |
   |------------|------|----------|
   | `title` | Text | Required |
   | `slug` | UID (based on title) | Required |
   | `content` | Rich Text | Required |
   | `excerpt` | Text (Long) | - |
   | `coverImage` | Media (Single) | Images only |
   | `category` | Relation | blogPost (many) → blogCategory (one) |
   | `featured` | Boolean | Default: false |
   | `publishedAt` | Date | - |
   | `readTime` | Number | Integer (minutes) |

4. Click **Finish** then **Save**

---

## Step 5: Configure API Permissions

By default, Strapi blocks all API access. You need to allow public read access.

1. Go to **Settings** (left sidebar)
2. Click **Users & Permissions Plugin** → **Roles**
3. Click **Public**
4. Scroll down to **Permissions** section
5. Expand each content type and check these permissions:
   - **Movie**: `find`, `findOne`
   - **Photo**: `find`, `findOne`
   - **Photo Album**: `find`, `findOne`
   - **Blog Category**: `find`, `findOne`
   - **Blog Post**: `find`, `findOne`
6. Click **Save** (top right)

---

## Step 6: Generate API Token

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Fill in:
   ```
   Name: Portfolio Frontend
   Description: Token for portfolio website
   Token duration: Unlimited
   Token type: Read-only
   ```
4. Click **Save**
5. **IMPORTANT**: Copy the token immediately (you won't see it again!)
   ```
   Example: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```

---

## Step 7: Add Environment Variables to Your Portfolio

1. In your portfolio project, create `.env` file in the root:
   ```bash
   cd /home/dhanush/Development/Nexora/portfolio_dhanush/UniquePortfolio
   touch .env
   ```

2. Add these lines (replace with your actual values):
   ```env
   # Strapi Cloud Configuration
   VITE_STRAPI_URL=https://your-project.strapiapp.com
   VITE_STRAPI_TOKEN=your_api_token_here
   
   # GitHub Token (optional - for Git Timeline)
   VITE_GITHUB_TOKEN=your_github_token
   
   # TMDb API (optional - for movie data)
   VITE_TMDB_API_KEY=your_tmdb_key
   ```

3. Find your Strapi Cloud URL:
   - Go to your Strapi Cloud project dashboard
   - Copy the URL (e.g., `https://portfolio-cms-abc123.strapiapp.com`)

4. Restart your dev server:
   ```bash
   npm run dev
   ```

---

## Step 8: Test the Connection

1. Open your portfolio: `http://localhost:5000`
2. Open browser console (F12)
3. Check for Strapi connection messages
4. Try adding test data in Strapi admin:
   - Go to **Content Manager** → **Movie**
   - Click **Create new entry**
   - Fill in test data and **Publish**
5. Your portfolio should now fetch this data!

---

## Step 9: Add Sample Content

Add some test content to see it on your site:

### Movies (for Favorites page)
1. **Content Manager** → **Movie** → **Create new entry**
2. Example:
   ```
   Title: The Shawshank Redemption
   Year: 1994
   Rating: 9.5
   Personal Notes: My all-time favorite!
   Watched: true
   TMDB ID: 278
   ```

### Photos (for Gallery page)
1. **Content Manager** → **Photo Album** → **Create new entry**
   ```
   Title: Travel 2024
   Description: My travels around Europe
   ```
2. **Content Manager** → **Photo** → **Create new entry**
   - Upload an image
   - Select the album you just created

### Blog Posts
1. **Content Manager** → **Blog Category** → **Create new entry**
   ```
   Name: Technology
   ```
2. **Content Manager** → **Blog Post** → **Create new entry**
   ```
   Title: My First Blog Post
   Content: This is my first post!
   Category: Technology
   Featured: true
   ```

---

## Step 10: Deploy to Vercel (Optional)

When you're ready to deploy your portfolio:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables:
   - `VITE_STRAPI_URL`
   - `VITE_STRAPI_TOKEN`
4. Deploy!

---

## 🔧 Troubleshooting

### "Failed to fetch from Strapi"
- Check your `.env` file has correct URL and token
- Verify API permissions are set to Public
- Check Strapi Cloud project is running (green status)

### "CORS Error"
- Strapi Cloud automatically allows CORS from any origin
- If you see this, check your Strapi URL is correct

### "401 Unauthorized"
- Your API token is invalid or expired
- Generate a new token in Strapi Settings → API Tokens

### "Content not showing"
- Make sure you clicked **Publish** (not just Save as Draft)
- Check Content Manager → your content type → Status = "Published"

---

## 📚 Next Steps

Once Strapi Cloud is set up:

1. **Replace mock data** in your components:
   - `Favorites.tsx` - use real movie data from Strapi
   - `Photos.tsx` - use real photo albums from Strapi
   - `Blog.tsx` - use real blog posts from Strapi

2. **Update Strapi hooks** in `client/src/hooks/useStrapi.ts`

3. **Add authentication** (optional) - allow users to submit messages

4. **Set up webhooks** (optional) - auto-deploy when content changes

---

## 📖 Useful Resources

- [Strapi Cloud Documentation](https://docs.strapi.io/cloud)
- [Strapi REST API Reference](https://docs.strapi.io/dev-docs/api/rest)
- [Strapi Content-Type Builder](https://docs.strapi.io/user-docs/content-type-builder)

---

## ✅ Checklist

- [ ] Created Strapi Cloud account
- [ ] Deployed Strapi Cloud project
- [ ] Created admin user
- [ ] Created all 5 content types (Movie, Photo, Photo Album, Blog Category, Blog Post)
- [ ] Set API permissions to Public
- [ ] Generated API token
- [ ] Added environment variables to `.env`
- [ ] Tested connection in browser
- [ ] Added sample content
- [ ] Verified data appears on portfolio site

---

**Questions?** Check the [GITHUB_SETUP.md](./GITHUB_SETUP.md) file or Strapi Cloud documentation!
