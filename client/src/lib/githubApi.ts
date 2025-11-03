/**
 * GitHub API integration for fetching real commit data
 * No authentication required for public repos
 */

export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  stats?: {
    additions: number;
    deletions: number;
    total: number;
  };
  files?: Array<{
    filename: string;
    additions: number;
    deletions: number;
    changes: number;
  }>;
}

const GITHUB_API_BASE = 'https://api.github.com';

/**
 * Fetch commits for a specific repository
 * @param owner - GitHub username (e.g., 'dhanush')
 * @param repo - Repository name (e.g., 'UniquePortfolio')
 * @param branch - Branch name (default: 'main')
 * @param perPage - Number of commits to fetch (max 100)
 */
export async function fetchCommits(
  owner: string,
  repo: string,
  branch: string = 'main',
  perPage: number = 30
): Promise<GitHubCommit[]> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits?sha=${branch}&per_page=${perPage}`;
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
      // Optional: Add your GitHub token for higher rate limits
      // 'Authorization': `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch detailed commit info including file stats
 * @param owner - GitHub username
 * @param repo - Repository name  
 * @param sha - Commit SHA
 */
export async function fetchCommitDetails(
  owner: string,
  repo: string,
  sha: string
): Promise<GitHubCommit> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/commits/${sha}`;
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Transform GitHub API response to our GitCommit format
 */
export function transformGitHubCommit(commit: GitHubCommit, branch: string = 'main') {
  return {
    hash: commit.sha.substring(0, 7),
    message: commit.commit.message.split('\n')[0], // First line only
    author: commit.commit.author.name,
    date: commit.commit.author.date,
    branch: branch,
    files: commit.files?.length || 0,
    additions: commit.stats?.additions || 0,
    deletions: commit.stats?.deletions || 0,
    tags: extractTags(commit.commit.message),
  };
}

/**
 * Extract conventional commit tags from message
 */
function extractTags(message: string): string[] {
  const tags: string[] = [];
  
  // Check for conventional commit format: feat(scope): message
  const conventionalMatch = message.match(/^(\w+)(?:\(([^)]+)\))?:/);
  if (conventionalMatch) {
    tags.push(conventionalMatch[1]); // feat, fix, docs, etc.
    if (conventionalMatch[2]) {
      tags.push(conventionalMatch[2]); // scope
    }
  }
  
  return tags;
}

/**
 * Get repository info
 */
export async function fetchRepoInfo(owner: string, repo: string) {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`;
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get list of branches
 */
export async function fetchBranches(owner: string, repo: string) {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/branches`;
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.statusText}`);
  }

  return response.json();
}
