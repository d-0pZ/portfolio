'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface NavItem {
  name: string;
  href: string;
  submenu?: { name: string; href: string; description: string }[];
}

const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  {
    name: 'About',
    href: '/about',
    submenu: [
      { name: 'About Me', href: '/about/me', description: 'My story and journey' },
      { name: 'Skills', href: '/about/skills', description: 'Technical expertise' },
      { name: 'Certifications', href: '/about/certifications', description: 'Professional credentials' },
    ],
  },
  {
    name: 'Work',
    href: '/work',
    submenu: [
      { name: 'Projects', href: '/work/projects', description: 'Featured portfolio projects' },
      { name: 'Services', href: '/work/services', description: 'What I can do for you' },
    ],
  },
  { name: 'Resources', href: '/resources' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const isActiveRoute = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'navbar-blur shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">YN</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Muneer<span className="text-gradient">Ali</span>
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.submenu && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                      isActiveRoute(item.href)
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      {item.name}
                      {item.submenu && (
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                    
                    {/* Active indicator */}
                    {isActiveRoute(item.href) && (
                      <motion.div
                        className="absolute -bottom-1 left-1/2 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        initial={{ scaleX: 0, x: '-50%' }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {item.submenu && activeDropdown === item.name && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 w-72 glass rounded-xl shadow-xl overflow-hidden"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <div className="py-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-3 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                  {subItem.name}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {subItem.description}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <motion.div
                className="w-6 h-6 flex flex-col justify-center items-center"
                animate={isMobileMenuOpen ? 'open' : 'closed'}
              >
                <motion.span
                  className="w-5 h-0.5 bg-current transform transition-all"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 2 }
                  }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-current transform transition-all mt-1"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-current transform transition-all mt-1"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -2 }
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden glass rounded-b-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                        isActiveRoute(item.href)
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/30'
                          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      {item.name}
                    </Link>
                    
                    {/* Mobile Submenu */}
                    {item.submenu && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50/30 dark:hover:bg-gray-800/30 rounded-lg transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}