import { Link, useRouterState } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Home, FolderKanban } from 'lucide-react';

export default function Header() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FolderKanban className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold">ProjectHub</span>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            <Link to="/">
              <Button
                variant={currentPath === '/' ? 'default' : 'ghost'}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/project-details">
              <Button
                variant={currentPath === '/project-details' ? 'default' : 'ghost'}
                className="gap-2"
              >
                <FolderKanban className="h-4 w-4" />
                Projects
              </Button>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">Sign In</Button>
        </div>
      </div>
    </header>
  );
}
