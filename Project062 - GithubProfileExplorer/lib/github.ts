interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  html_url: string;
}

interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

interface Contribution {
  owner: number[];
  all: number[];
}

export async function getGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('User not found');
  }

  return response.json();
}

export async function getUserRepositories(username: string): Promise<Repository[]> {
  const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  return response.json();
}

export async function getUserContributions(username: string): Promise<Contribution[]> {
  const response = await fetch(`https://api.github.com/users/${username}/stats/participation`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json',
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch contributions');
  }

  return response.json();
}
