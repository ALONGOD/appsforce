'use client'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import UserList from './components/UserList';
import Image from 'next/image';

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
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <Image src="https://res.cloudinary.com/bytesizedpieces/image/upload/v1656084931/article/a-how-to-guide-on-making-an-animated-loading-image-for-a-website/animated_loader_gif_n6b5x0.gif"
        alt="Loading" width={200} height={200} className="w-auto h-auto max-w-[200px]" priority />
    </div>
  )

  if (error) return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-lg text-red-600 dark:text-red-400">
        Error fetching users
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-lg mb-8 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          User Library
        </h1>
      </header>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UserList initialUsers={users || []} />
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  )
}