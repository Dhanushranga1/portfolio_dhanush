# Local Strapi Setup Guide

## ✅ What's Done

I've set up a **local Strapi CMS** for you - much simpler than Strapi Cloud!

**Location:** `/home/dhanush/Development/Nexora/portfolio_dhanush/portfolio-cms`

## 🎯 Architecture

```
/portfolio_dhanush/
├── UniquePortfolio/          ← Your portfolio (frontend)
│   ├── client/               ← React app
│   ├── server/               ← Express server
│   ├── .env                  ← Points to local Strapi ✅
│   └── start-dev.sh          ← Run both at once ✅
│
└── portfolio-cms/            ← Strapi CMS (backend) ✅ INSTALLED
    ├── src/api/              ← Content types (you'll create these)
    ├── config/               ← Strapi config
    ├── database/             ← SQLite database (auto-created)
    └── .env                  ← Strapi config
```

##

 🚀 Quick Start (2 steps!)

### Step 1: Start Strapi

```bash
cd /home/dhanush/Development/Nexora/portfolio_dhanush/portfolio-cms
npm run develop
```

**Wait 30-60 seconds** for Strapi to start. You'll see:
```
✔ Building build context
✔ Creating admin
✔ Loading Strapi
✔ Compiling TS

 Project information                                                        

┌────────────────────────┬──────────────────────────────────────────────────┐
│ Time                   │ Mon Nov 04 2025 03:41:45 GMT-0800 (Pacific Stan… │
│ Launched in            │ 21442 ms                                         │
│ Environment            │ development                                      │
│ Process PID            │ 12345                                            │
│ Version                │ 5.30.0 (node v22.20.0)                          │
│ Edition                │ Community                                        │
│ Database               │ sqlite                                           │
└────────────────────────┴──────────────────────────────────────────────────┘

 Actions available                                                          

One more thing...
Create your first administrator 💻 by going to the administration panel at:

┌─────────────────────────────┐
│ http://localhost:1337/admin │
└─────────────────────────────┘
```

### Step 2: Create Admin User

1. Open **http://localhost:1337/admin** in your browser
2. You'll see a registration form - fill it in:
   ```
   First name: Your name
   Last name: Your last name  
   Email: admin@example.com (or your real email)
   Password: (create a strong password - save it!)
   ```
3. Click **Let's start** → You're in the Strapi admin panel! 🎉

## 📦 Create Content Types

Now create the data structures your portfolio needs.

### 1. Movie Content Type (for Favorites page)

1. Click **Content-Type Builder** (left sidebar)
2. Click **Create new collection type**
3. Enter display name: `movie` (singular)
4. Click **Continue**
5. Add these fields:

#### Field: title
- Type: **Text**
- Click **Add another field** → Text
- Name: `title`
- Type: Short text
- Advanced settings: ✅ Required
- Click **Finish**

#### Field: year
- Click **Add another field** → Number
- Name: `year`
- Number format: integer
- Click **Finish**

#### Field: rating
- Click **Add another field** → Number
- Name: `rating`
- Number format: decimal
- Advanced settings: ✅ Required
- Click **Finish**

#### Field: personalNotes
- Click **Add another field** → Rich Text
- Name: `personalNotes`
- Click **Finish**

#### Field: watched
- Click **Add another field** → Boolean
- Name: `watched`
- Default value: false
- Click **Finish**

#### Field: tmdbId
- Click **Add another field** → Number
- Name: `tmdbId`
- Number format: integer
- Advanced settings: ✅ Unique
- Click **Finish**

#### Field: posterPath
- Click **Add another field** → Text
- Name: `posterPath`
- Type: Short text
- Click **Finish**

#### Field: overview
- Click **Add another field** → Text
- Name: `overview`
- Type: Long text
- Click **Finish**

#### Field: genres
- Click **Add another field** → JSON
- Name: `genres`
- Click **Finish**

6. Click **Save** (top right) - Strapi will restart

### 2. Photo Album Content Type

1. Click **Create new collection type**
2. Name: `photoAlbum`
3. Add fields:

   - **title**: Text (Short), Required
   - **description**: Text (Long)
   - **coverImage**: Media (Single image)
   - **date**: Date

4. Click **Save**

### 3. Photo Content Type

1. Click **Create new collection type**
2. Name: `photo`
3. Add fields:

   - **title**: Text (Short), Required
   - **description**: Text (Long)
   - **image**: Media (Single image), Required
   - **album**: Relation → photo (many) to photoAlbum (one)
   - **tags**: JSON
   - **dateTaken**: Date
   - **camera**: Text (Short)
   - **location**: Text (Short)

4. Click **Save**

### 4. Blog Category Content Type

1. Click **Create new collection type**
2. Name: `blogCategory`
3. Add fields:

   - **name**: Text (Short), Required, Unique
   - **slug**: UID (attached to name), Required
   - **description**: Text (Short)

4. Click **Save**

### 5. Blog Post Content Type

1. Click **Create new collection type**
2. Name: `blogPost`
3. Add fields:

   - **title**: Text (Short), Required
   - **slug**: UID (attached to title), Required
   - **content**: Rich Text, Required
   - **excerpt**: Text (Long)
   - **coverImage**: Media (Single image)
   - **category**: Relation → blogPost (many) to blogCategory (one)
   - **featured**: Boolean, Default: false
   - **publishedAt**: Date
   - **readTime**: Number (integer)

4. Click **Save**

## 🔓 Set Public Permissions

By default, Strapi blocks all API access. Enable public read access:

1. Go to **Settings** (left sidebar)
2. Click **Users & Permissions Plugin** → **Roles**
3. Click **Public**
4. Scroll to **Permissions** section
5. For each content type, expand it and check:
   - ✅ `find`
   - ✅ `findOne`
6. Click **Save** (top right)

## 🔑 Generate API Token

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Fill in:
   ```
   Name: Portfolio Frontend
   Description: Token for local portfolio
   Token duration: Unlimited
   Token type: Read-only
   ```
4. Click **Save**
5. **Copy the token!** (you won't see it again)
6. Add it to your `.env` file:
   ```bash
   cd /home/dhanush/Development/Nexora/portfolio_dhanush/UniquePortfolio
   nano .env
   # Update this line:
   VITE_STRAPI_TOKEN=paste_your_token_here
   ```

## 📝 Add Sample Content

Let's add test data to see it work!

### Add a Movie

1. Click **Content Manager** (left sidebar)
2. Click **Movie** → **Create new entry**
3. Fill in:
   ```
   Title: The Shawshank Redemption
   Year: 1994
   Rating: 9.5
   Personal Notes: My all-time favorite!
   Watched: true
   TMDB ID: 278
   ```
4. Click **Save** → Click **Publish**

### Add a Blog Category

1. **Content Manager** → **Blog Category** → **Create new entry**
2. Fill in:
   ```
   Name: Technology
   ```
   (slug auto-generates to "technology")
3. Click **Save** → **Publish**

### Add a Blog Post

1. **Content Manager** → **Blog Post** → **Create new entry**
2. Fill in:
   ```
   Title: My First Blog Post
   Content: This is my first post using local Strapi!
   Category: Technology
   Featured: true
   ```
3. Click **Save** → **Publish**

## 🎨 Start Your Portfolio

Now start your portfolio to see the data!

```bash
cd /home/dhanush/Development/Nexora/portfolio_dhanush/UniquePortfolio
npm run dev
```

Open **http://localhost:5000** and navigate to:
- **/favorites** - See your movie!
- **/blog** - See your blog post!

## 🚀 Easy Startup Script

I've created a script to start BOTH Strapi and your portfolio together:

```bash
cd /home/dhanush/Development/Nexora/portfolio_dhanush/UniquePortfolio
./start-dev.sh
```

This will:
1. Start Strapi on **http://localhost:1337**
2. Wait for it to be ready
3. Start your portfolio on **http://localhost:5000**
4. Show you all the URLs
5. Press Ctrl+C to stop both

## 📂 File Structure

### Strapi (Backend)
```
/portfolio-cms/
├── src/
│   ├── api/              ← Your content types
│   │   ├── movie/
│   │   ├── photo/
│   │   ├── photo-album/
│   │   ├── blog-category/
│   │   └── blog-post/
│   ├── admin/            ← Admin panel customization
│   └── extensions/       ← Plugin extensions
├── config/
│   ├── database.ts       ← SQLite config (default)
│   ├── server.ts         ← Server config
│   └── admin.ts          ← Admin panel config
├── database/
│   └── data.db           ← SQLite database file
├── public/
│   └── uploads/          ← Uploaded images
├── .env                  ← Strapi environment variables
└── package.json
```

### Portfolio (Frontend)
```
/UniquePortfolio/
├── client/src/
│   ├── lib/
│   │   └── strapiConfig.ts    ← Already configured! ✅
│   ├── hooks/
│   │   └── useStrapi.ts       ← Already configured! ✅
│   └── pages/
│       ├── Favorites.tsx      ← Will fetch from Strapi
│       ├── Photos.tsx         ← Will fetch from Strapi
│       └── Blog.tsx           ← Will fetch from Strapi
├── .env                       ← Points to localhost:1337 ✅
└── start-dev.sh               ← Start script ✅
```

## 🔧 Troubleshooting

### "Strapi won't start"
```bash
# Kill any existing Strapi process
pkill -f strapi

# Try again
cd /home/dhanush/Development/Nexora/portfolio_dhanush/portfolio-cms
npm run develop
```

### "Port 1337 is already in use"
```bash
# Find and kill the process
lsof -ti:1337 | xargs kill -9

# Or use a different port in portfolio-cms/config/server.ts
```

### "Can't see my content on the portfolio"
1. Make sure you clicked **Publish** (not just Save)
2. Check Content Manager → Status should be "Published"
3. Verify permissions are set to Public (Settings → Roles → Public)
4. Check `.env` has correct URL: `VITE_STRAPI_URL=http://localhost:1337`
5. Restart your portfolio: `npm run dev`

### "Database locked" error
```bash
# Restart Strapi
cd /home/dhanush/Development/Nexora/portfolio_dhanush/portfolio-cms
npm run develop
```

## 🎓 What's Different from Cloud?

| Feature | Strapi Cloud | Local Strapi |
|---------|--------------|--------------|
| Setup | Complex account creation | ✅ Simple npm install |
| Cost | $99/month (Essential plan) | ✅ FREE |
| Database | PostgreSQL (managed) | SQLite (file-based) |
| Storage | Cloud storage | ✅ Local filesystem |
| URL | `https://project.strapiapp.com` | `http://localhost:1337` |
| Admin Panel | `https://project.strapiapp.com/admin` | `http://localhost:1337/admin` |
| Deployment | Auto-deploys on push | ✅ No deployment needed |
| Accessibility | Public internet | ✅ Local machine only |
| Backups | Automatic | Manual (copy database file) |

## 📖 Strapi Documentation

- **Local docs**: http://localhost:1337/admin/documentation (after installing docs plugin)
- **Official docs**: https://docs.strapi.io/dev-docs/quick-start
- **Content-Type Builder**: https://docs.strapi.io/user-docs/content-type-builder
- **REST API**: https://docs.strapi.io/dev-docs/api/rest

## ✅ Checklist

- [x] Strapi installed at `/portfolio-cms`
- [x] `.env` configured for local Strapi
- [x] `start-dev.sh` script created
- [ ] Create admin user
- [ ] Create 5 content types (Movie, Photo, Album, Blog Category, Blog Post)
- [ ] Set public permissions
- [ ] Generate API token
- [ ] Add sample content
- [ ] Test portfolio connection

## 🚀 Next Steps

1. **Start Strapi**: `cd ../portfolio-cms && npm run develop`
2. **Create admin user**: http://localhost:1337/admin
3. **Create content types**: Follow the guide above
4. **Set permissions**: Settings → Roles → Public
5. **Add sample data**: Content Manager
6. **Start portfolio**: `npm run dev` or use `./start-dev.sh`

---

**That's it!** Local Strapi is WAY simpler than Cloud - no account needed, no billing, just install and go! 🎉
