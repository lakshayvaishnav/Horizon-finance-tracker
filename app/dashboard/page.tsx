'use client';

import { AppSidebar } from '@/components/AppSidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const GridBackground = () => (
  <div className="absolute inset-0 bg-black">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:14px_24px]" />
  </div>
);

const Loader = () => (
  <motion.div
    className="w-16 h-16 border-4 border-gray-300 rounded-full"
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      borderRadius: ["50%", "25%", "50%"],
    }}
    transition={{
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
    }}
  />
);

export default function DashboardLoader() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      // router.push('/dashboard/home');
    }
  }, [status, router]);

  if (status === 'unauthenticated') {
    return (
      <section className="flex justify-center items-center h-screen bg-black">
        <p className="text-gray-300 text-xl font-semibold">Please log in to access the dashboard.</p>
      </section>
    );
  }

  return (
    <section className="relative flex justify-center items-center h-screen overflow-hidden">
      <GridBackground />
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <Loader />
        <motion.p
          className="text-white text-xl font-semibold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Loading your dashboard...
        </motion.p>
      </div>
    </section>
  );
}