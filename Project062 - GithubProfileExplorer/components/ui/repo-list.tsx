'use client';

import { Repository } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GitFork, Star, Code } from 'lucide-react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

interface RepoListProps {
  repositories: Repository[];
  title: string;
}

export function RepoList({ repositories, title }: RepoListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
      <div className="grid gap-4">
        {repositories.map((repo) => (
          <Card key={repo.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <Link 
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {repo.name}
                </Link>
                <div className="flex items-center gap-4 text-sm">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <Code className="h-4 w-4" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-4 w-4" />
                    {repo.forks_count}
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{repo.description}</p>
              <div className="mt-2 text-sm text-muted-foreground">
                Updated {formatDistanceToNow(new Date(repo.updated_at))} ago
                {repo.fork && repo.parent && (
                  <span className="ml-2">
                    • Forked from{' '}
                    <Link
                      href={repo.parent.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {repo.parent.full_name}
                    </Link>
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}