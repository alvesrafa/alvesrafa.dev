import type { GitHubRepo } from '@/types';

const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_USERNAME = 'alvesrafa';

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=12&type=owner`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: {
          revalidate: 3600, // Revalidate every hour
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out forked repos and sort by stars
    return repos
      .filter((repo) => !repo.name.includes('.github'))
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return [];
  }
}

export async function getPinnedRepos(): Promise<GitHubRepo[]> {
  // GitHub doesn't have a direct API for pinned repos
  // We'll use GraphQL API if available, otherwise fall back to regular repos
  try {
    if (!process.env.GITHUB_TOKEN) {
      // Fall back to regular repos if no token
      return getGitHubRepos();
    }

    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          pinnedItems(first: 6, types: REPOSITORY) {
            nodes {
              ... on Repository {
                id
                name
                description
                url
                homepageUrl
                primaryLanguage {
                  name
                }
                repositoryTopics(first: 10) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                stargazerCount
                forkCount
                updatedAt
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL error: ${response.status}`);
    }

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const pinnedRepos = data.data?.user?.pinnedItems?.nodes || [];

    // Transform to our GitHubRepo format
    return pinnedRepos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      full_name: `${GITHUB_USERNAME}/${repo.name}`,
      description: repo.description,
      html_url: repo.url,
      homepage: repo.homepageUrl,
      language: repo.primaryLanguage?.name || null,
      topics: repo.repositoryTopics?.nodes?.map((t: any) => t.topic.name) || [],
      stargazers_count: repo.stargazerCount,
      forks_count: repo.forkCount,
      updated_at: repo.updatedAt,
    }));
  } catch (error) {
    console.error('Failed to fetch pinned repos:', error);
    // Fall back to regular repos
    return getGitHubRepos();
  }
}
