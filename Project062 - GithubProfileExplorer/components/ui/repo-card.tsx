'use client';

import { Repository } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitFork, Star } from 'lucide-react';
import Link from 'next/link';

interface RepoCardProps {
  repo: Repository;
  isParent?: boolean;
}

export function RepoCard({ repo, isParent }: RepoCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <Link 
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {repo.full_name}
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              {repo.stargazers_count.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-4 w-4" />
              {repo.forks_count.toLocaleString()}
            </span>
          </div>
        </CardTitle>
        <CardDescription>{repo.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isParent && (
          <div className="text-sm text-muted-foreground">
            Original Repository
          </div>
        )}
      </CardContent>
    </Card>
  );
}