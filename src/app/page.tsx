import UserCard from '@/components/user';
import Image from 'next/image';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={'loading user...'}>
        <UserCard />
      </Suspense>
    </main>
  );
}
