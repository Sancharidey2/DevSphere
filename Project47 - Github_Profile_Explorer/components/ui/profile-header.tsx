'use client';

import { GitHubUser } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Users, GitFork, BookOpen } from 'lucide-react';
import Image from 'next/image';

interface ProfileHeaderProps {
  user: GitHubUser;
  originalReposCount: number;
  forkedReposCount: number;
}

export function ProfileHeader({ user, originalReposCount, forkedReposCount }: ProfileHeaderProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold">{user.name || user.login}</h2>
            <p className="text-muted-foreground">{user.bio}</p>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Users className="h-4 w-4" />
                <span>{user.followers} followers</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <Users className="h-4 w-4" />
                <span>{user.following} following</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <BookOpen className="h-4 w-4" />
                <span>{originalReposCount} original repos</span>
              </div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <GitFork className="h-4 w-4" />
                <span>{forkedReposCount} forked repos</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}