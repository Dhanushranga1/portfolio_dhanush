# Git Timeline - GitHub Integration Guide

## Overview

The Git Timeline feature now supports **both mock data and real GitHub data**. You can switch between them with a single button click.

## Current Status

✅ **Mock Data Mode** (Default)
- Shows 6 example commits from the enhance/hybrid-terminal branch
- Works immediately without any configuration
- Perfect for development and demos

✅ **GitHub API Integration** (Optional)
- Click "load from GitHub" button to fetch real commits
- Uses GitHub's public REST API (no authentication required for public repos)
- Displays your actual commit history with stats

## How to Use Real GitHub Data

### Step 1: Update Configuration

Edit `/client/src/pages/GitTimeline.tsx` and update these constants (around line 120):

```typescript
// Configuration - update these with your GitHub details
const GITHUB_OWNER = "dhanush"; // Your GitHub username
const GITHUB_REPO = "UniquePortfolio"; // Your repo name  
const GITHUB_BRANCH = "enhance/hybrid-terminal"; // Default branch
```

### Step 2: Click "Load from GitHub" Button

1. Navigate to `/git-timeline` page
2. Click the **"load from GitHub"** button in the top-right of the control panel
3. The app will fetch commits from your repository
4. You'll see a toast notification confirming the data loaded

### Step 3: Make Repo Public (if private)

If you get a 404 error, your repository might be private. GitHub's public API only works with public repos unless you add authentication.

**To make repo public:**
1. Go to GitHub: `https://github.com/dhanush/UniquePortfolio/settings`
2. Scroll to "Danger Zone"
3. Click "Change visibility" → "Make public"

**OR add authentication (see Advanced Setup below)**

## Features with Real Data

When using GitHub data, you get:

✅ **Real commit messages** - Your actual conventional commit messages
✅ **Actual dates** - When commits were made
✅ **File statistics** - Number of files changed, additions, deletions
✅ **Branch info** - Shows which branch commits belong to
✅ **Auto-extracted tags** - Parses conventional commit format (feat, fix, docs, etc.)

## Advanced Setup: Private Repos

If you want to keep your repo private, you need a GitHub Personal Access Token (PAT).

### 1. Create GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "Portfolio Git Timeline"
4. Set expiration: 90 days (or longer)
5. Select scopes:
   - ✅ `repo` (for private repos)
   - ✅ `public_repo` (for public repos only)
6. Click "Generate token"
7. **Copy the token immediately** (you won't see it again!)

### 2. Add Token to Environment

Create `.env` file in project root:

```bash
VITE_GITHUB_TOKEN=ghp_your_token_here
```

Add to `.gitignore`:
```bash
.env
.env.local
```

### 3. Update API Call

The code in `client/src/lib/githubApi.ts` already supports tokens:

```typescript
const response = await fetch(url, {
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    // This line uses the token if available
    ...(import.meta.env.VITE_GITHUB_TOKEN && {
      'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
    })
  }
});
```

Just uncomment the Authorization line if you added the token.

## API Rate Limits

GitHub API rate limits:

- **Without authentication**: 60 requests/hour
- **With authentication**: 5,000 requests/hour

For a portfolio site, unauthenticated is usually fine since:
- Each page load = 1 API call
- Data is cached in browser
- Visitors won't hit the limit

## Troubleshooting

### "404 Not Found"

**Cause**: Repository is private or doesn't exist

**Fix**: 
1. Check `GITHUB_OWNER` and `GITHUB_REPO` are correct
2. Make repo public OR add authentication token

### "403 Forbidden - Rate Limit"

**Cause**: Hit GitHub's 60 requests/hour limit

**Fix**: 
1. Wait an hour, or
2. Add GitHub token (see Advanced Setup)

### "Failed to load GitHub data"

**Check**:
1. Repository name is correct
2. Branch name exists (try "main" or "master" instead of "enhance/hybrid-terminal")
3. You have internet connection
4. GitHub is not down (check https://www.githubstatus.com/)

## Architecture

```
GitTimeline Component
    ↓
Load Button Clicked
    ↓
fetchCommits() in githubApi.ts
    ↓
GitHub REST API
    ↓
transformGitHubCommit()
    ↓
Display in Timeline
```

### Files Involved

1. **`client/src/pages/GitTimeline.tsx`**
   - Main component
   - Contains config (OWNER, REPO, BRANCH)
   - Handles button click → API call → state update

2. **`client/src/lib/githubApi.ts`**
   - GitHub API wrapper functions
   - `fetchCommits()` - Gets commit list
   - `fetchCommitDetails()` - Gets individual commit stats
   - `transformGitHubCommit()` - Converts GitHub format to our format

3. **`client/src/App.tsx`**
   - Routing configuration
   - `/git-timeline` route points to GitTimeline component

## Next Steps

### Display Multiple Repos

Edit `GitTimeline.tsx` to add a repo selector:

```typescript
const repos = [
  { owner: "dhanush", repo: "UniquePortfolio", branch: "main" },
  { owner: "dhanush", repo: "OtherProject", branch: "develop" },
];

const [selectedRepo, setSelectedRepo] = useState(repos[0]);
```

### Add Diff Viewer

The GitHub API supports fetching actual file diffs:

```typescript
// In githubApi.ts
export async function fetchCommitDiff(owner: string, repo: string, sha: string) {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${sha}`;
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3.diff', // Request diff format
    }
  });
  return response.text(); // Returns git diff as text
}
```

### Add Branch Switcher

Fetch all branches and let user switch:

```typescript
const branches = await fetchBranches(GITHUB_OWNER, GITHUB_REPO);
// Display in dropdown, on select → fetchCommits(owner, repo, selectedBranch)
```

## Example: Full GitHub Setup

```typescript
// 1. Update GitTimeline.tsx configuration
const GITHUB_OWNER = "dhanush";
const GITHUB_REPO = "UniquePortfolio"; 
const GITHUB_BRANCH = "main"; // or enhance/hybrid-terminal

// 2. Click "load from GitHub" button in UI

// 3. (Optional) Add .env for private repos
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

// 4. Commit and push
git add client/src/pages/GitTimeline.tsx
git commit -m "feat(git-timeline): configure GitHub integration"
git push origin enhance/hybrid-terminal
```

## Resources

- GitHub REST API Docs: https://docs.github.com/en/rest
- List Commits: https://docs.github.com/en/rest/commits/commits#list-commits
- Get Commit: https://docs.github.com/en/rest/commits/commits#get-a-commit
- Rate Limits: https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting

## Summary

✅ Works out-of-box with mock data
✅ One-click switch to real GitHub data
✅ No authentication needed for public repos
✅ Easy configuration (3 constants)
✅ Proper error handling and loading states
✅ Respects GitHub rate limits

Just update `GITHUB_OWNER`, `GITHUB_REPO`, and `GITHUB_BRANCH`, then click the button!
