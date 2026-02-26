import { useEffect, useRef, useState } from 'react';
import {
  Brain,
  Code2,
  Database,
  Cpu,
  Network,
  Layers,
  GraduationCap,
  MapPin,
  User,
  Sparkles,
} from 'lucide-react';

const skills = [
  { label: 'Python', icon: Code2 },
  { label: 'Artificial Intelligence', icon: Brain },
  { label: 'Data Science', icon: Database },
  { label: 'Machine Learning', icon: Cpu },
  { label: 'System Design', icon: Layers },
  { label: 'Neural Networks', icon: Network },
  { label: 'Deep Learning', icon: Brain },
  { label: 'Data Analysis', icon: Database },
];

const interests = [
  {
    title: 'AI & Machine Learning',
    desc: 'Exploring intelligent algorithms that learn from data to make predictions and decisions.',
    icon: Brain,
    color: '#00f5ff',
  },
  {
    title: 'System-Based Projects',
    desc: 'Building robust OS-level tools like file monitors, memory managers, and process analyzers.',
    icon: Cpu,
    color: '#bf5af2',
  },
  {
    title: 'Data Engineering',
    desc: 'Designing pipelines and databases to store, process, and visualize large datasets efficiently.',
    icon: Database,
    color: '#00f5ff',
  },
];

function useRevealOnScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

function RevealSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref as React.RefObject<HTMLElement>);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

export default function HostDetailsPage() {
  const [avatarError, setAvatarError] = useState(false);

  return (
    <div
      className="relative min-h-screen py-12 px-4 grid-bg"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="container mx-auto max-w-5xl">
        {/* Hero Section */}
        <RevealSection className="mb-12">
          <div className="glass-card p-8 md:p-12 relative overflow-hidden">
            {/* Decorative glow */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0,245,255,0.08), transparent)',
                filter: 'blur(40px)',
              }}
            />
            <div
              className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(191,90,242,0.06), transparent)',
                filter: 'blur(40px)',
              }}
            />

            <div className="flex flex-col md:flex-row items-center md:items-start gap-10 relative z-10">
              {/* Glassmorphic Profile Photo Card */}
              <div className="flex-shrink-0 flex flex-col items-center">
                {/* Outer glow ring */}
                <div
                  className="relative"
                  style={{
                    filter: 'drop-shadow(0 0 24px rgba(0,245,255,0.45)) drop-shadow(0 0 48px rgba(0,245,255,0.18))',
                  }}
                >
                  {/* Glassmorphic frame */}
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    style={{
                      width: '220px',
                      height: '290px',
                      background: 'linear-gradient(135deg, rgba(0,245,255,0.10) 0%, rgba(191,90,242,0.07) 60%, rgba(0,0,0,0.35) 100%)',
                      backdropFilter: 'blur(18px)',
                      WebkitBackdropFilter: 'blur(18px)',
                      border: '1.5px solid rgba(0,245,255,0.38)',
                      boxShadow:
                        '0 8px 40px rgba(0,245,255,0.18), 0 2px 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(191,90,242,0.12)',
                    }}
                  >
                    {/* Inner shimmer top edge */}
                    <div
                      className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.6), rgba(191,90,242,0.4), transparent)',
                      }}
                    />
                    {/* Inner shimmer left edge */}
                    <div
                      className="absolute top-0 left-0 bottom-0 w-px pointer-events-none"
                      style={{
                        background: 'linear-gradient(180deg, rgba(0,245,255,0.5), transparent 60%)',
                      }}
                    />

                    {/* Photo */}
                    {!avatarError ? (
                      <img
                        src="/assets/generated/naveen-profile.dim_600x800.png"
                        alt="Naveen V"
                        className="w-full h-full object-cover object-top"
                        style={{ display: 'block' }}
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{ background: 'rgba(0,245,255,0.06)' }}
                      >
                        <User className="w-20 h-20" style={{ color: '#00f5ff' }} />
                      </div>
                    )}

                    {/* Bottom frosted overlay with name */}
                    <div
                      className="absolute bottom-0 left-0 right-0 px-3 py-3"
                      style={{
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.38) 60%, transparent 100%)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                      }}
                    >
                      <p
                        className="text-center font-orbitron font-bold text-xs tracking-widest"
                        style={{ color: '#00f5ff', textShadow: '0 0 10px rgba(0,245,255,0.7)' }}
                      >
                        NAVEEN V
                      </p>
                      <p
                        className="text-center font-rajdhani text-xs mt-0.5 tracking-wider"
                        style={{ color: 'rgba(191,90,242,0.9)' }}
                      >
                        HOST · PROJECT LEAD
                      </p>
                    </div>

                    {/* Corner accent dots */}
                    <div
                      className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: '#00f5ff', boxShadow: '0 0 6px #00f5ff' }}
                    />
                    <div
                      className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full"
                      style={{ background: 'rgba(0,245,255,0.4)' }}
                    />
                  </div>

                  {/* Neon scan line animation */}
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
                    style={{ width: '220px', height: '290px' }}
                  >
                    <div
                      className="absolute left-0 right-0 h-px"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.5), transparent)',
                        animation: 'scanLine 3s linear infinite',
                        top: '0',
                      }}
                    />
                  </div>
                </div>

                {/* Status badge below photo */}
                <div
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-rajdhani font-semibold tracking-widest"
                  style={{
                    background: 'rgba(0, 245, 255, 0.08)',
                    border: '1px solid rgba(0, 245, 255, 0.25)',
                    color: 'rgba(0, 245, 255, 0.8)',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: '#00f5ff', boxShadow: '0 0 6px #00f5ff', display: 'inline-block' }}
                  />
                  ONLINE
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-rajdhani font-semibold tracking-widest mb-3"
                  style={{
                    background: 'rgba(0, 245, 255, 0.08)',
                    border: '1px solid rgba(0, 245, 255, 0.25)',
                    color: 'rgba(0, 245, 255, 0.8)',
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  HOST / PROJECT LEAD
                </div>

                <h1
                  className="text-4xl md:text-5xl font-orbitron font-bold mb-3"
                  style={{
                    color: '#00f5ff',
                    textShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
                  }}
                >
                  NAVEEN V
                </h1>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <GraduationCap className="w-4 h-4 flex-shrink-0" style={{ color: '#bf5af2' }} />
                    <span className="text-sm font-rajdhani" style={{ color: 'rgba(200, 220, 240, 0.8)' }}>
                      B.Tech – Artificial Intelligence and Data Science
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#bf5af2' }} />
                    <span className="text-sm font-rajdhani" style={{ color: 'rgba(200, 220, 240, 0.8)' }}>
                      Priyadarshini Engineering College
                    </span>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                  {[
                    { label: 'Projects', value: '5+' },
                    { label: 'Skills', value: '8+' },
                    { label: 'Focus', value: 'AI/DS' },
                    { label: 'Year', value: '2026' },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-xl px-4 py-3 text-center"
                      style={{
                        background: 'rgba(0,245,255,0.05)',
                        border: '1px solid rgba(0,245,255,0.15)',
                      }}
                    >
                      <div
                        className="font-orbitron font-bold text-lg"
                        style={{ color: '#00f5ff', textShadow: '0 0 8px rgba(0,245,255,0.5)' }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="font-rajdhani text-xs tracking-wider"
                        style={{ color: 'rgba(150,180,220,0.6)' }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* Bio Section */}
        <RevealSection className="mb-12">
          <div className="glass-card p-8">
            <h2
              className="text-xl font-orbitron font-bold mb-4"
              style={{ color: '#00f5ff', textShadow: '0 0 10px rgba(0,245,255,0.4)' }}
            >
              ABOUT ME
            </h2>
            <div className="space-y-4 font-inter" style={{ color: 'rgba(200, 220, 240, 0.8)', lineHeight: '1.8' }}>
              <p>
                I am <strong style={{ color: '#00f5ff' }}>Naveen V</strong>, a passionate B.Tech student specializing in
                Artificial Intelligence and Data Science at Priyadarshini Engineering College. I am deeply fascinated by
                the intersection of intelligent systems and real-world problem solving.
              </p>
              <p>
                I am currently developing projects that bridge the gap between theoretical AI concepts and practical
                system-level implementations. My focus lies in building tools that monitor, analyze, and optimize
                computer systems using Python and AI-driven approaches.
              </p>
              <p>
                From designing <strong style={{ color: '#bf5af2' }}>Virtual Memory Management systems</strong> to
                building <strong style={{ color: '#bf5af2' }}>Smart File Activity Monitors</strong>, I believe in
                creating software that is not just functional but intelligent. Every project I undertake is a step
                toward mastering the art of AI-powered system design.
              </p>
              <p>
                My vision is to contribute to the future of computing by developing AI systems that can autonomously
                manage, optimize, and secure digital environments — making technology smarter, faster, and more
                efficient for everyone.
              </p>
            </div>
          </div>
        </RevealSection>

        {/* Skills Section */}
        <RevealSection className="mb-12">
          <div className="glass-card p-8">
            <h2
              className="text-xl font-orbitron font-bold mb-6"
              style={{ color: '#00f5ff', textShadow: '0 0 10px rgba(0,245,255,0.4)' }}
            >
              TECHNICAL SKILLS
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className="skill-tag flex items-center gap-2"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <skill.icon className="w-3.5 h-3.5" />
                  {skill.label}
                </div>
              ))}
            </div>
          </div>
        </RevealSection>

        {/* Interests Section */}
        <RevealSection className="mb-12">
          <h2
            className="text-xl font-orbitron font-bold mb-6 text-center"
            style={{ color: '#bf5af2', textShadow: '0 0 10px rgba(191,90,242,0.4)' }}
          >
            AREAS OF INTEREST
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {interests.map((item, i) => (
              <div
                key={i}
                className="glass-card p-6 text-center group"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}30`,
                    boxShadow: `0 0 15px ${item.color}15`,
                  }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <h3
                  className="font-orbitron font-bold text-sm mb-2"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h3>
                <p className="text-xs font-inter leading-relaxed" style={{ color: 'rgba(180, 200, 230, 0.65)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>
      </div>

      {/* Scan line keyframe */}
      <style>{`
        @keyframes scanLine {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
