import { useState, useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useLogVisitor } from '@/hooks/useQueries';
import { Loader2, ArrowRight, Cpu } from 'lucide-react';

const WELCOME_TEXT = 'Welcome to Naveen Projects';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const logVisitor = useLogVisitor();
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect
  useEffect(() => {
    const speed = isDeleting ? 50 : 80;
    const pauseAtEnd = 2000;
    const pauseAtStart = 500;

    if (!isDeleting && charIndex === WELCOME_TEXT.length) {
      const timeout = setTimeout(() => setIsDeleting(true), pauseAtEnd);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && charIndex === 0) {
      const timeout = setTimeout(() => setIsDeleting(false), pauseAtStart);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(WELCOME_TEXT.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setDisplayText(WELCOME_TEXT.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError('Please enter your username to continue.');
      return;
    }
    setError('');

    // Store name in session storage immediately
    sessionStorage.setItem('username', trimmed);

    // Log the visitor to the backend, then navigate
    try {
      await logVisitor.mutateAsync(trimmed);
    } catch {
      // Continue navigation even if logging fails — don't block the user
    }

    navigate({ to: '/host' });
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#050510' }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/generated/neural-network-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.35,
        }}
      />

      {/* Animated grid overlay */}
      <div
        className="absolute inset-0 z-0 grid-bg"
        style={{ opacity: 0.4 }}
      />

      {/* Animated orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,245,255,0.15), transparent)',
          filter: 'blur(60px)',
          animation: 'orb-float 6s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(191,90,242,0.15), transparent)',
          filter: 'blur(60px)',
          animation: 'orb-float 8s ease-in-out infinite reverse',
        }}
      />

      {/* Scan line effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.03 }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
            animation: 'scan-line 4s linear infinite',
          }}
        />
      </div>

      {/* Main card */}
      <div
        className="relative z-10 w-full max-w-md mx-4 animate-fade-in-up"
        style={{ animationFillMode: 'both' }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div
            className="flex items-center justify-center w-20 h-20 rounded-2xl"
            style={{
              background: 'rgba(0, 245, 255, 0.08)',
              border: '1px solid rgba(0, 245, 255, 0.4)',
              boxShadow: '0 0 30px rgba(0, 245, 255, 0.2), inset 0 0 20px rgba(0, 245, 255, 0.05)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          >
            <Cpu className="w-10 h-10" style={{ color: '#00f5ff' }} />
          </div>
        </div>

        {/* Typewriter heading */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl md:text-3xl font-orbitron font-bold mb-2 min-h-[2.5rem]"
            style={{
              color: '#00f5ff',
              textShadow: '0 0 20px rgba(0, 245, 255, 0.6), 0 0 40px rgba(0, 245, 255, 0.3)',
            }}
          >
            {displayText}
            <span
              style={{
                borderRight: '2px solid #00f5ff',
                marginLeft: '2px',
                animation: 'blink 1s step-end infinite',
                display: 'inline-block',
                height: '1.2em',
                verticalAlign: 'middle',
              }}
            />
          </h1>
          <p
            className="text-sm font-rajdhani tracking-widest"
            style={{ color: 'rgba(150, 200, 230, 0.6)' }}
          >
            IDENTIFY YOURSELF TO PROCEED
          </p>
        </div>

        {/* Glass card form */}
        <div
          className="glass-card p-8"
          style={{
            boxShadow: '0 8px 40px rgba(0, 0, 0, 0.6), 0 0 60px rgba(0, 245, 255, 0.05), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-rajdhani font-semibold tracking-widest mb-2"
                style={{ color: 'rgba(0, 245, 255, 0.7)' }}
              >
                USERNAME
              </label>
              <input
                ref={inputRef}
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter your username..."
                className="w-full px-4 py-3 rounded-xl text-sm font-inter outline-none transition-all duration-300"
                style={{
                  background: 'rgba(0, 245, 255, 0.05)',
                  border: error
                    ? '1px solid rgba(255, 68, 68, 0.6)'
                    : '1px solid rgba(0, 245, 255, 0.3)',
                  color: '#e0f0ff',
                  boxShadow: error
                    ? '0 0 10px rgba(255, 68, 68, 0.15)'
                    : '0 0 10px rgba(0, 245, 255, 0.08)',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(0, 245, 255, 0.7)';
                  e.target.style.boxShadow = '0 0 15px rgba(0, 245, 255, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.border = error
                    ? '1px solid rgba(255, 68, 68, 0.6)'
                    : '1px solid rgba(0, 245, 255, 0.3)';
                  e.target.style.boxShadow = error
                    ? '0 0 10px rgba(255, 68, 68, 0.15)'
                    : '0 0 10px rgba(0, 245, 255, 0.08)';
                }}
                autoComplete="off"
              />
              {error && (
                <p
                  className="mt-2 text-xs font-rajdhani"
                  style={{ color: '#ff4444' }}
                >
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={logVisitor.isPending}
              className="w-full py-3 px-6 rounded-xl font-orbitron font-bold text-sm tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                background: logVisitor.isPending
                  ? 'rgba(0, 245, 255, 0.08)'
                  : 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(0, 245, 255, 0.08))',
                border: '1px solid rgba(0, 245, 255, 0.5)',
                color: '#00f5ff',
                boxShadow: logVisitor.isPending
                  ? 'none'
                  : '0 0 20px rgba(0, 245, 255, 0.2)',
                cursor: logVisitor.isPending ? 'not-allowed' : 'pointer',
              }}
              onMouseEnter={(e) => {
                if (!logVisitor.isPending) {
                  (e.target as HTMLButtonElement).style.boxShadow =
                    '0 0 30px rgba(0, 245, 255, 0.4), 0 0 60px rgba(0, 245, 255, 0.2)';
                  (e.target as HTMLButtonElement).style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.boxShadow =
                  '0 0 20px rgba(0, 245, 255, 0.2)';
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
              }}
            >
              {logVisitor.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  LOGGING IN...
                </>
              ) : (
                <>
                  ENTER
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div
            className="mt-6 pt-4 text-center text-xs font-rajdhani tracking-wider"
            style={{
              borderTop: '1px solid rgba(0, 245, 255, 0.1)',
              color: 'rgba(150, 180, 210, 0.4)',
            }}
          >
            YOUR VISIT WILL BE LOGGED FOR SECURITY
          </div>
        </div>

        {/* Decorative corner accents */}
        <div
          className="absolute -top-1 -left-1 w-6 h-6 pointer-events-none"
          style={{
            borderTop: '2px solid rgba(0, 245, 255, 0.6)',
            borderLeft: '2px solid rgba(0, 245, 255, 0.6)',
          }}
        />
        <div
          className="absolute -top-1 -right-1 w-6 h-6 pointer-events-none"
          style={{
            borderTop: '2px solid rgba(0, 245, 255, 0.6)',
            borderRight: '2px solid rgba(0, 245, 255, 0.6)',
          }}
        />
        <div
          className="absolute -bottom-1 -left-1 w-6 h-6 pointer-events-none"
          style={{
            borderBottom: '2px solid rgba(0, 245, 255, 0.6)',
            borderLeft: '2px solid rgba(0, 245, 255, 0.6)',
          }}
        />
        <div
          className="absolute -bottom-1 -right-1 w-6 h-6 pointer-events-none"
          style={{
            borderBottom: '2px solid rgba(0, 245, 255, 0.6)',
            borderRight: '2px solid rgba(0, 245, 255, 0.6)',
          }}
        />
      </div>
    </div>
  );
}
