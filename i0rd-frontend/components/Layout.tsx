// components/Layout.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import WalletConnect from './WalletConnect';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      localStorage.setItem('theme', newTheme);
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`p-4 flex justify-between items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow'}`}>
        <div className="flex items-center">
          <button
            className="md:hidden mr-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">I0rd</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded"
          >
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>
          <WalletConnect />
        </div>
      </header>
      <div className="flex">
        <aside
          className={`w-64 p-4 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 fixed md:static top-0 left-0 h-full z-10 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow'}`}
        >
          <nav>
            <ul>
              <li className="py-2"><a href="/" className="hover:text-blue-400">Dashboard</a></li>
              <li className="py-2"><a href="/watchlist" className="hover:text-blue-400">Watchlist</a></li>
              <li className="py-2"><a href="/portfolio" className="hover:text-blue-400">Portfolio</a></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;