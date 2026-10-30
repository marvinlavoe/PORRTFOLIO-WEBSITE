/**
 * Utilities for parsing GitHub repository URLs and fetching README and metadata.
 */

/**
 * Extracts { owner, repo } from a GitHub URL or string.
 * Supports:
 * - https://github.com/owner/repo
 * - github.com/owner/repo
 * - owner/repo
 * - https://github.com/owner/repo.git
 * @param {string} input
 * @returns {{ owner: string, repo: string } | null}
 */
export function parseGitHubRepo(input) {
  if (!input || typeof input !== "string") return null;
  const value = input.trim();
  let parts;

  if (/^(https?:\/\/)?(www\.)?github\.com\//i.test(value)) {
    try {
      const url = new URL(
        /^https?:\/\//i.test(value) ? value : `https://${value}`,
      );
      if (
        url.hostname.toLowerCase() !== "github.com" ||
        url.username ||
        url.password
      )
        return null;
      parts = url.pathname.split("/").filter(Boolean).slice(0, 2);
    } catch {
      return null;
    }
  } else {
    parts = value.split("/");
  }

  if (parts.length !== 2 || !parts[0] || !parts[1]) return null;

  const owner = parts[0];
  const repo = parts[1].replace(/\.git$/i, "");
  if (!/^[\w.-]+$/.test(owner) || !/^[\w.-]+$/.test(repo)) return null;
  return { owner, repo };
}

/**
 * Fetches the raw README.md content from a GitHub repository.
 * Tries HEAD, main, and master branches.
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<{ content: string | null, error: string | null }>}
 */
export async function fetchGitHubReadme(owner, repo, defaultBranch) {
  const branches = [
    ...new Set([defaultBranch, "main", "master"].filter(Boolean)),
  ];

  for (const branch of branches) {
    try {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/README.md`;
      const response = await fetch(url);
      if (response.ok) {
        const content = await response.text();
        if (content && content.trim()) {
          return { content, error: null };
        }
      }
    } catch {
      // Continue to next branch
    }
  }

  // Also try lowercase readme.md
  try {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/HEAD/readme.md`;
    const response = await fetch(url);
    if (response.ok) {
      const content = await response.text();
      return { content, error: null };
    }
  } catch {
    // Continue
  }

  return {
    content: null,
    error: `Could not find a README.md file in repository "${owner}/${repo}". Make sure the repo is public.`,
  };
}

/**
 * Fetches public GitHub repository metadata (description, topics, homepage).
 * @param {string} owner
 * @param {string} repo
 * @returns {Promise<{ description?: string, homepage?: string, topics?: string[], html_url?: string }>}
 */
export async function fetchGitHubRepoDetails(owner, repo) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
    );
    if (response.ok) {
      const data = await response.json();
      return {
        description: data.description || "",
        homepage: data.homepage || "",
        topics: data.topics || [],
        default_branch: data.default_branch || "",
        html_url: data.html_url || `https://github.com/${owner}/${repo}`,
      };
    }
  } catch (err) {
    console.warn("Could not fetch GitHub repo details from API:", err);
  }

  return {
    description: "",
    homepage: "",
    topics: [],
    default_branch: "",
    html_url: `https://github.com/${owner}/${repo}`,
  };
}

/**
 * Fetches a user's most recently updated public repositories for quick selection.
 * @param {string} username
 * @returns {Promise<Array<{ name: string, full_name: string, html_url: string, description: string }>>}
 */
export async function fetchGitHubUserRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&direction=desc&per_page=8`,
  );
  if (!response.ok) {
    throw new Error(
      response.status === 404
        ? `GitHub user "${username}" was not found.`
        : `Could not load public repositories (GitHub returned ${response.status}).`,
    );
  }

  const repositories = await response.json();
  return repositories.map(({ name, full_name, html_url, description }) => ({
    name,
    full_name,
    html_url,
    description: description || "",
  }));
}
