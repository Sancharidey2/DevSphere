export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  fork: boolean;
  language: string;
  updated_at: string;
  parent?: {
    full_name: string;
    html_url: string;
  };
}

export interface Contribution {
  total: number;
  weeks: {
    w: string;
    c: number;
  }[];
}

export interface GitHubError {
  message: string;
  documentation_url: string;
}