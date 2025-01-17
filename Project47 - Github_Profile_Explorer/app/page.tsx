'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProfileHeader } from '@/components/ui/profile-header';
import { RepoList } from '@/components/ui/repo-list';
import { GitHubUser, Repository } from '@/lib/types';
import { getGitHubUser, getUserRepositories } from '@/lib/github';
import { SiGithub } from 'react-icons/si';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUser(null);
    setRepositories([]);
    setLoading(true);

    try {
      const [userData, reposData] = await Promise.all([
        getGitHubUser(username),
        getUserRepositories(username),
      ]);

      setUser(userData as GitHubUser);
      setRepositories(reposData as Repository[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const originalRepos = repositories.filter(repo => !repo.fork);
  const forkedRepos = repositories.filter(repo => repo.fork);

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="text-center space-y-4">
          <SiGithub className="mx-auto h-12 w-12" />
          <h1 className="text-4xl font-bold">GitHub Profile Explorer</h1>
          <p className="text-muted-foreground">
            Enter a GitHub username to view their profile and repositories
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <Input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'View Profile'}
          </Button>
        </form>

        {error && (
          <div className="p-4 text-destructive bg-destructive/10 rounded-lg text-center">
            {error}
          </div>
        )}

        {user && (
          <div className="space-y-8">
            <ProfileHeader 
              user={user}
              originalReposCount={originalRepos.length}
              forkedReposCount={forkedRepos.length}
            />

            <Tabs defaultValue="original" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="original">
                  Original Repositories ({originalRepos.length})
                </TabsTrigger>
                <TabsTrigger value="forked">
                  Forked Repositories ({forkedRepos.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="original">
                <RepoList 
                  repositories={originalRepos}
                  title="Original Repositories"
                />
              </TabsContent>
              <TabsContent value="forked">
                <RepoList 
                  repositories={forkedRepos}
                  title="Forked Repositories"
                />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </main>
  );
}
