# Strapi CMS Setup Guide

## Overview

This portfolio uses **Strapi** as a headless CMS to manage:
- 🎬 **Movies** - Your favorite films with ratings and notes
- 📸 **Photos** - Photo gallery with albums and metadata
- 📝 **Blog Posts** - Articles with categories and tags

## Why Strapi?

✅ **Self-hosted** - You own your data
✅ **Free & Open Source** - No vendor lock-in
✅ **Type-safe** - TypeScript support
✅ **Media Library** - Built-in image management
✅ **RESTful API** - Easy integration
✅ **Admin Panel** - Beautiful UI for content editing

## Quick Start

### Step 1: Install Strapi

In a **separate directory** (not inside your portfolio project):

```bash
# Create Strapi project
npx create-strapi-app@latest portfolio-cms --quickstart

# This will:
# 1. Create a new folder: portfolio-cms/
# 2. Install Strapi
# 3. Start the development server on http://localhost:1337
# 4. Open the admin panel in your browser
```

### Step 2: Create Admin Account

When Strapi opens, you'll see the registration page:
1. Enter your details (email, password)
2. Click "Let's start"
3. You're now in the Strapi admin panel!

### Step 3: Create Content Types

Now we'll create the content types for Movies, Photos, and Blog Posts.

#### A. Movie Content Type

1. Click **Content-Type Builder** in the sidebar
2. Click **"Create new collection type"**
3. Display name: `Movie`
4. Click **Continue**
5. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| `title` | Text (Short) | Required |
| `year` | Number (Integer) | Required |
| `director` | Text (Short) | Optional |
| `genre` | JSON | Optional (for tags) |
| `rating` | Number (Decimal) | Optional, Min: 0, Max: 10 |
| `watched` | Boolean | Default: false |
| `watchedDate` | Date | Optional |
| `poster` | Media (Single) | Optional |
| `tmdbId` | Text (Short) | Optional |
| `notes` | Rich Text | Optional |
| `tags` | JSON | Optional |
| `favorite` | Boolean | Default: false |

6. Click **Save**
7. Click **Restart** when prompted

#### B. Photo Content Type

1. Create new collection type: `Photo`
2. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| `title` | Text (Short) | Required |
| `description` | Text (Long) | Optional |
| `image` | Media (Single) | Required |
| `album` | Relation | Photo (many) → Photo Album (one) |
| `tags` | JSON | Optional |
| `location` | Text (Short) | Optional |
| `capturedAt` | Date | Optional |
| `camera` | Text (Short) | Optional |
| `featured` | Boolean | Default: false |

3. Click **Save** and **Restart**

#### C. Photo Album Content Type

1. Create new collection type: `Photo Album`
2. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| `name` | Text (Short) | Required |
| `description` | Text (Long) | Optional |
| `coverImage` | Media (Single) | Optional |
| `photos` | Relation | Photo Album (one) → Photo (many) |
| `slug` | UID | Attached to: name |

3. Click **Save** and **Restart**

#### D. Blog Post Content Type

1. Create new collection type: `Blog Post`
2. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| `title` | Text (Short) | Required |
| `slug` | UID | Attached to: title, Required |
| `excerpt` | Text (Long) | Optional |
| `content` | Rich Text | Required |
| `coverImage` | Media (Single) | Optional |
| `category` | Relation | Blog Post (many) → Blog Category (one) |
| `tags` | JSON | Optional |
| `featured` | Boolean | Default: false |
| `readTime` | Number (Integer) | Optional |
| `seo` | Component (repeatable) | See below |

**SEO Component:**
- Create a new component called `seo` in category `metadata`
- Add fields:
  - `metaTitle` (Text Short)
  - `metaDescription` (Text Long)
  - `keywords` (Text Short)

3. Click **Save** and **Restart**

#### E. Blog Category Content Type

1. Create new collection type: `Blog Category`
2. Add these fields:

| Field Name | Type | Settings |
|------------|------|----------|
| `name` | Text (Short) | Required |
| `slug` | UID | Attached to: name |
| `description` | Text (Long) | Optional |
| `posts` | Relation | Blog Category (one) → Blog Post (many) |

3. Click **Save** and **Restart**

### Step 4: Configure Permissions

Make content accessible to the public API:

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click on **Public** role
3. Expand each content type and check:
   - ✅ `find` (get list)
   - ✅ `findOne` (get single item)
4. Click **Save**

**For authenticated users (you as admin):**
1. Click on **Authenticated** role
2. Check ALL permissions for Movies, Photos, Blog Posts
3. This allows you to create/update/delete via API

### Step 5: Generate API Token

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Name: `Portfolio Frontend`
4. Token duration: `Unlimited`
5. Token type: `Full access`
6. Click **Save**
7. **COPY THE TOKEN** (you'll only see it once!)

### Step 6: Configure Portfolio Frontend

Create a `.env` file in your portfolio project root:

```bash
# Strapi Configuration
VITE_STRAPI_URL=http://localhost:1337
VITE_STRAPI_TOKEN=your_token_here_paste_from_step_5
```

Add to `.gitignore`:
```
.env
.env.local
```

### Step 7: Add Sample Data

Let's add some test content:

#### Add a Movie:
1. Go to **Content Manager** → **Movie**
2. Click **Create new entry**
3. Fill in:
   - Title: "The Matrix"
   - Year: 1999
   - Genre: `["Sci-Fi", "Action"]`
   - Rating: 9.5
   - Watched: Yes
   - Favorite: Yes
4. Upload a poster image
5. Click **Save** then **Publish**

#### Add a Photo:
1. Go to **Content Manager** → **Photo**
2. Click **Create new entry**
3. Upload an image
4. Fill in title and description
5. Click **Save** then **Publish**

#### Add a Blog Post:
1. Go to **Content Manager** → **Blog Post**
2. Click **Create new entry**
3. Fill in title, content, etc.
4. Click **Save** then **Publish**

### Step 8: Test API Connection

Open your browser console and run:

```javascript
fetch('http://localhost:1337/api/movies?populate=*', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

You should see your movie data!

## Using in Portfolio

The portfolio already has everything set up:

### Fetch Movies:
```typescript
import { useMovies } from '@/hooks/useStrapi';

function MyComponent() {
  const { data, isLoading, error } = useMovies({ 
    favorite: true,
    sort: 'rating:desc' 
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading movies</div>;
  
  return (
    <div>
      {data?.data.map(movie => (
        <div key={movie.id}>{movie.attributes.title}</div>
      ))}
    </div>
  );
}
```

### Fetch Photos:
```typescript
import { usePhotos } from '@/hooks/useStrapi';

const { data } = usePhotos({ featured: true });
```

### Fetch Blog Posts:
```typescript
import { useBlogPosts } from '@/hooks/useStrapi';

const { data } = useBlogPosts({ limit: 5 });
```

## Production Deployment

### Deploy Strapi

**Option 1: Strapi Cloud (Recommended)**
1. Go to https://cloud.strapi.io
2. Sign up and create a new project
3. Connect your Strapi repository
4. Deploy automatically

**Option 2: Self-hosted (Render, Railway, DigitalOcean)**
1. Push your `portfolio-cms` folder to GitHub
2. Create a PostgreSQL database
3. Configure environment variables
4. Deploy!

### Update Frontend

Update `.env` with production URL:
```bash
VITE_STRAPI_URL=https://your-strapi-url.com
VITE_STRAPI_TOKEN=your_production_token
```

## Troubleshooting

### CORS Errors

If you get CORS errors, update `portfolio-cms/config/middlewares.ts`:

```typescript
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'img-src': ['*'],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:5000', 'https://your-portfolio-url.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### Images Not Loading

Make sure:
1. Images are uploaded in Strapi
2. You're using `getStrapiImageUrl()` helper
3. Public permissions are enabled for the media library

### API Token Invalid

1. Generate a new token in Strapi admin
2. Update `.env` file
3. Restart dev server

## Next Steps

1. ✅ Install Strapi
2. ✅ Create content types
3. ✅ Add sample data
4. ✅ Configure frontend
5. 🎬 Build Favorites page
6. 📸 Build Photos page
7. 📝 Build Blog page

## Resources

- Strapi Docs: https://docs.strapi.io
- Strapi Cloud: https://cloud.strapi.io
- Strapi Discord: https://discord.strapi.io
- Your CMS: http://localhost:1337/admin

## File Structure

```
portfolio-cms/               # Strapi CMS (separate project)
├── config/
├── src/
│   └── api/
│       ├── movie/
│       ├── photo/
│       ├── photo-album/
│       ├── blog-post/
│       └── blog-category/
└── public/uploads/          # Your images

UniquePortfolio/             # Portfolio frontend (this project)
├── client/src/
│   ├── lib/
│   │   └── strapiConfig.ts  # Strapi configuration
│   ├── hooks/
│   │   └── useStrapi.ts     # React hooks for Strapi
│   └── pages/
│       ├── Favorites.tsx    # Uses Strapi movies
│       ├── Photos.tsx       # Uses Strapi photos
│       └── Blog.tsx         # Uses Strapi blog posts
└── shared/
    └── strapi-types.ts      # TypeScript types
```

Ready to start adding content! 🚀
