'use client';

import { Calendar, Home, Inbox, Settings, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

// Menu items.
const items = [
    {
        title: 'Home',
        url: '/dashboard/home',
        icon: Home,
    },
    {
        title: 'Add Expenses',
        url: '/dashboard/addExpense',
        icon: Inbox,
    },
    {
        title: 'Transaction History',
        url: '/dashboard/history',
        icon: Calendar,
    },
    {
        title: 'Add Account',
        url: '/dashboard/addAccount',
        icon: Settings,
    },
];

export function AppSidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
            setIsOpen(window.innerWidth >= 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                onClick={toggleSidebar}
                className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-gray-800 text-gray-300 rounded-md"
                aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <AnimatePresence>
                {(isOpen || !isMobile) && (
                    <motion.aside
                        initial={{ x: -250 }}
                        animate={{ x: 0 }}
                        exit={{ x: -250 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={`bg-black text-gray-300 w-64 min-h-screen fixed top-0 left-0 z-10 overflow-y-auto
                        ${isMobile ? 'shadow-lg' : 'border-r border-gray-800'}`}
                    >
                        <div className="p-4 flex items-center justify-between">
                            <Link href="/" className="flex items-center space-x-2">
                                <span className="text-xl font-bold tracking-tight">Horizon</span>
                            </Link>
                            {isMobile && (
                                <button onClick={toggleSidebar} className="lg:hidden" aria-label="Close sidebar">
                                    <X size={24} />
                                </button>
                            )}
                        </div>
                        <nav className="mt-8">
                            <ul className="space-y-2">
                                {items.map((item) => (
                                    <li key={item.title}>
                                        <Link
                                            href={item.url}
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                                  ${
                                      pathname === item.url
                                          ? 'bg-gray-800 text-gray-100'
                                          : 'hover:bg-gray-800 hover:text-gray-100'
                                  }`}
                                        >
                                            <item.icon size={20} />
                                            <span className="tracking-tight text-base">{item.title}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
            {isMobile && isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-0" onClick={toggleSidebar} aria-hidden="true" />
            )}
        </>
    );
}
