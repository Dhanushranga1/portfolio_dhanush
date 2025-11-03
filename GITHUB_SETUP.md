# GitHub Setup Guide

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `portfolio_dhanush`
3. Description: "Personal portfolio website with terminal aesthetic"
4. Make it **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have code)
6. Click "Create repository"

## Step 2: Push Code to GitHub

Once the repository is created, run these commands:

```bash
cd /home/dhanush/Development/Nexora/portfolio_dhanush/UniquePortfolio

# Push the enhance/hybrid-terminal branch
git push -u origin enhance/hybrid-terminal

# Push main branch too
git push -u origin main

# Set enhance/hybrid-terminal as the default branch (optional)
git push -u origin enhance/hybrid-terminal:main --force
```

## Step 3: Set Up Strapi Cloud Integration

### Create Strapi Cloud Project

1. Go to https://cloud.strapi.io/
2. Sign up / Log in
3. Click "Create new project"
4. Choose a plan (Free tier available)
5. Project name: `portfolio-cms`
6. Region: Choose closest to your users
7. Wait for deployment (takes 2-3 minutes)

### Get Your Strapi Cloud URL

After deployment, you'll get a URL like:
```
https://your-project-name-abc123.strapiapp.com
```

### Create API Token

1. Open your Strapi Cloud URL in browser
2. Log in to admin panel (use credentials from email)
3. Go to Settings → API Tokens → Create new API Token
4. Name: `Portfolio Frontend`
5. Token type: `Read-Only` (for security)
6. Token duration: `Unlimited`
7. Click "Save"
8. **Copy the token immediately** (you won't see it again!)

### Add Environment Variables

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env

# Edit with your values
nano .env  # or use VS Code
```

Add your Strapi Cloud credentials:
```
VITE_STRAPI_URL=https://your-project-name-abc123.strapiapp.com
VITE_STRAPI_TOKEN=your_api_token_here
```

## Step 4: Create Strapi Content Types

In your Strapi Cloud admin panel:

### Content Type: Movies

1. Go to Content-Type Builder → Create new collection type
2. Name: `movie`
3. Add these fields:
   - `title` (Text, required)
   - `year` (Number, required)
   - `director` (Text)
   - `genre` (Text)
   - `rating` (Number, min: 0, max: 10)
   - `posterUrl` (Text, URL format)
   - `trailerUrl` (Text, URL format)
   - `imdbId` (Text)
   - `tmdbId` (Number)
   - `tags` (JSON)
   - `notes` (Rich Text)
   - `isFavorite` (Boolean, default: false)
   - `watchedAt` (Date)
4. Save

### Content Type: Photo Albums

1. Create collection type: `photo-album`
2. Fields:
   - `name` (Text, required)
   - `description` (Text)
   - `coverPhotoUrl` (Text, URL format)
   - `photoCount` (Number)
3. Save

### Content Type: Photos

1. Create collection type: `photo`
2. Fields:
   - `title` (Text, required)
   - `description` (Text)
   - `imageUrl` (Text, URL format, required)
   - `location` (Text)
   - `dateTaken` (Date)
   - `camera` (Text)
   - `tags` (JSON)
   - `isFeatured` (Boolean, default: false)
   - `album` (Relation: Many-to-one with photo-albums)
3. Save

### Content Type: Blog Categories

1. Create collection type: `blog-category`
2. Fields:
   - `name` (Text, required)
   - `slug` (UID, attached to name)
   - `description` (Text)
3. Save

### Content Type: Blog Posts

1. Create collection type: `blog-post`
2. Fields:
   - `title` (Text, required)
   - `slug` (UID, attached to title)
   - `excerpt` (Text)
   - `content` (Rich Text, required)
   - `coverImage` (Text, URL format)
   - `author` (Text, default: "Dhanush")
   - `readTime` (Number, in minutes)
   - `tags` (JSON)
   - `isFeatured` (Boolean, default: false)
   - `publishedAt` (DateTime)
   - `category` (Relation: Many-to-one with blog-categories)
3. Save

### Set Permissions

1. Go to Settings → Roles → Public
2. Enable these permissions for public access:
   - **Movies**: `find`, `findOne`
   - **Photos**: `find`, `findOne`
   - **Photo-albums**: `find`, `findOne`
   - **Blog-posts**: `find`, `findOne`
   - **Blog-categories**: `find`, `findOne`
3. Save

## Step 5: Connect Frontend to Strapi

### Test Connection

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open browser and check:
   - http://localhost:5000/favorites (should load movies from Strapi)
   - http://localhost:5000/photos (should load photos from Strapi)
   - http://localhost:5000/blog (should load blog posts from Strapi)

### Switch from Mock Data to Strapi

Once Strapi has data, update your page components:

#### Favorites.tsx
```typescript
// Change this:
const MOCK_MOVIES = [...];

// To this:
import { useMovies } from "@/lib/strapiHooks";
const { data: movies, isLoading } = useMovies();
```

#### Photos.tsx
```typescript
// Change this:
const MOCK_PHOTOS = [...];

// To this:
import { usePhotos, usePhotoAlbums } from "@/lib/strapiHooks";
const { data: photos, isLoading } = usePhotos();
const { data: albums } = usePhotoAlbums();
```

#### Blog.tsx
```typescript
// Change this:
const MOCK_POSTS = [...];

// To this:
import { useBlogPosts, useBlogCategories } from "@/lib/strapiHooks";
const { data: posts, isLoading } = useBlogPosts();
const { data: categories } = useBlogCategories();
```

## Step 6: Deploy to Vercel/Netlify

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to https://vercel.com/
3. Click "Import Project"
4. Select your GitHub repository
5. Add Environment Variables:
   - `VITE_STRAPI_URL`: Your Strapi Cloud URL
   - `VITE_STRAPI_TOKEN`: Your API token
6. Deploy!

### Netlify

1. Push your code to GitHub
2. Go to https://netlify.com/
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add Environment Variables:
   - `VITE_STRAPI_URL`: Your Strapi Cloud URL
   - `VITE_STRAPI_TOKEN`: Your API token
7. Deploy!

## Troubleshooting

### CORS Issues
If you get CORS errors, add your frontend URL to Strapi:
1. Strapi Admin → Settings → CORS
2. Add your deployed URL (e.g., `https://your-site.vercel.app`)

### API Token Not Working
- Make sure token type is "Read-Only"
- Check that Public role has correct permissions
- Verify token is in `.env` file correctly

### Images Not Loading
- Use absolute URLs in Strapi (include https://)
- Or use Strapi's upload plugin for local images

## Next Steps

1. ✅ Create GitHub repository
2. ✅ Push code to GitHub
3. ✅ Set up Strapi Cloud project
4. ✅ Create content types in Strapi
5. ✅ Add some test content
6. ✅ Configure environment variables
7. ✅ Test locally
8. ✅ Deploy to Vercel/Netlify
9. ✅ Update Strapi CORS settings
10. ✅ Done! 🎉

---

**Your Portfolio URLs:**
- Frontend (after Vercel): https://your-site.vercel.app
- Strapi CMS: https://your-project.strapiapp.com/admin
- GitHub Repo: https://github.com/Dhanushranga1/portfolio_dhanush
