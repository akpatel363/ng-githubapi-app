import { User } from "./User";

export interface Repository {
  name: string;
  html_url: string;
  fork: boolean;
  owner: User;
  homepage: string;
  language: string;
  watchers_count: number;
  stargazers_count: number;
  forks: number;
  description: string;
}
