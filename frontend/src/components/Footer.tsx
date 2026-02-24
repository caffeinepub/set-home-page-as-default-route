import { SiGithub, SiX } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname)
    : 'unknown-app';

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">ProjectHub</h3>
            <p className="text-sm text-muted-foreground">
              Your all-in-one project management solution built on the Internet Computer.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/project-details" className="hover:text-foreground transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Connect</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-accent"
                aria-label="GitHub"
              >
                <SiGithub className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background transition-colors hover:bg-accent"
                aria-label="X (Twitter)"
              >
                <SiX className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} ProjectHub. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1">
            Built with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
