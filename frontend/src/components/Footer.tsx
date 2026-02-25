import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier =
    typeof window !== 'undefined'
      ? encodeURIComponent(window.location.hostname)
      : 'naveen-projects';

  return (
    <footer
      className="relative z-10 mt-auto"
      style={{
        background: 'rgba(5, 5, 16, 0.9)',
        borderTop: '1px solid rgba(0, 245, 255, 0.1)',
      }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <p
            className="text-sm font-rajdhani tracking-wider"
            style={{ color: 'rgba(0, 245, 255, 0.6)' }}
          >
            © {currentYear} Naveen Projects – Priyadarshini Engineering College
          </p>
          <p
            className="flex items-center gap-1.5 text-xs"
            style={{ color: 'rgba(150, 170, 200, 0.5)' }}
          >
            Built with{' '}
            <Heart
              className="h-3.5 w-3.5 fill-current"
              style={{ color: '#00f5ff' }}
            />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors"
              style={{ color: 'rgba(0, 245, 255, 0.7)' }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
