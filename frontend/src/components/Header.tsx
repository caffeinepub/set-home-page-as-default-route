import { Link, useRouterState } from '@tanstack/react-router';
import { Shield, Cpu } from 'lucide-react';

const navLinks = [
  { to: '/host', label: 'Host Details' },
  { to: '/team', label: 'Team' },
  { to: '/resources', label: 'Resources' },
  { to: '/project', label: 'Project' },
];

export default function Header() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{
        background: 'rgba(5, 5, 16, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 245, 255, 0.12)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{
              background: 'rgba(0, 245, 255, 0.1)',
              border: '1px solid rgba(0, 245, 255, 0.4)',
              boxShadow: '0 0 12px rgba(0, 245, 255, 0.2)',
            }}
          >
            <Cpu className="h-5 w-5" style={{ color: '#00f5ff' }} />
          </div>
          <span
            className="text-lg font-bold font-orbitron tracking-wider"
            style={{
              color: '#00f5ff',
              textShadow: '0 0 10px rgba(0, 245, 255, 0.6)',
            }}
          >
            NAVEEN PROJECTS
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = currentPath === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-sm font-rajdhani font-semibold tracking-wider transition-all duration-300"
                style={{
                  color: isActive ? '#00f5ff' : 'rgba(200, 220, 240, 0.7)',
                  background: isActive ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(0, 245, 255, 0.3)' : '1px solid transparent',
                  textShadow: isActive ? '0 0 8px rgba(0, 245, 255, 0.5)' : 'none',
                  boxShadow: isActive ? '0 0 12px rgba(0, 245, 255, 0.15)' : 'none',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Admin icon */}
        <Link
          to="/admin"
          className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300"
          style={{
            color: currentPath === '/admin' ? '#ff4444' : 'rgba(200, 220, 240, 0.5)',
            background: currentPath === '/admin' ? 'rgba(255, 68, 68, 0.1)' : 'transparent',
            border: currentPath === '/admin' ? '1px solid rgba(255, 68, 68, 0.3)' : '1px solid transparent',
          }}
          title="Admin Panel"
        >
          <Shield className="h-5 w-5" />
          <span className="hidden md:inline text-xs font-rajdhani font-semibold tracking-wider">ADMIN</span>
        </Link>
      </div>

      {/* Mobile nav */}
      <div
        className="flex md:hidden items-center gap-1 px-4 pb-2 overflow-x-auto"
        style={{ borderTop: '1px solid rgba(0, 245, 255, 0.06)' }}
      >
        {navLinks.map((link) => {
          const isActive = currentPath === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className="px-3 py-1.5 rounded-lg text-xs font-rajdhani font-semibold tracking-wider whitespace-nowrap transition-all duration-300"
              style={{
                color: isActive ? '#00f5ff' : 'rgba(200, 220, 240, 0.6)',
                background: isActive ? 'rgba(0, 245, 255, 0.1)' : 'transparent',
                border: isActive ? '1px solid rgba(0, 245, 255, 0.3)' : '1px solid transparent',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
