'use client'

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import UserList from './components/UserList';
// import { User } from './types/user';
import Image from 'next/image';
import { FC } from 'react';
const queryClient = new QueryClient()

function HomePage() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://randomuser.me/api/?results=10');
      const data = await res.json();
      return data.results;
    }
  })

  if (isLoading) return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
      <Image
        src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif"
        alt="Loading"
        width={200}
        height={200}
        className="w-auto h-auto max-w-[200px]"
      />
    </div>
  )
  if (error) return <div>Error fetching users</div>

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">User Library</h1>
      <UserList initialUsers={users || []} />
    </div>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  )
}