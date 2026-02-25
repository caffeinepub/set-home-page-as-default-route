import { useEffect, useRef } from 'react';
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

            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
              {/* Avatar */}
              <div
                className="flex-shrink-0 w-28 h-28 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(0, 245, 255, 0.08)',
                  border: '2px solid rgba(0, 245, 255, 0.4)',
                  boxShadow: '0 0 30px rgba(0, 245, 255, 0.2)',
                }}
              >
                <User className="w-14 h-14" style={{ color: '#00f5ff' }} />
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
            style={{ color: '#00f5ff', textShadow: '0 0 10px rgba(0,245,255,0.4)' }}
          >
            PROJECT INTERESTS
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {interests.map((item, i) => (
              <div
                key={i}
                className="glass-card p-6 transition-all duration-300 group"
                style={{ cursor: 'default' }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 40px rgba(0,0,0,0.5), 0 0 20px ${item.color}22`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}40`,
                    boxShadow: `0 0 15px ${item.color}20`,
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
                <p className="text-sm font-inter" style={{ color: 'rgba(180, 200, 230, 0.7)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </RevealSection>

        {/* AI Tech Hero Image */}
        <RevealSection>
          <div className="glass-card p-4 overflow-hidden">
            <div
              className="text-xs font-rajdhani font-semibold tracking-widest mb-3 px-2"
              style={{ color: 'rgba(0, 245, 255, 0.5)' }}
            >
              AI TECHNOLOGY VISUALIZATION
            </div>
            <img
              src="/assets/generated/ai-tech-hero.dim_1200x600.png"
              alt="AI Technology"
              className="w-full rounded-xl object-cover"
              style={{
                maxHeight: '400px',
                border: '1px solid rgba(0, 245, 255, 0.15)',
                boxShadow: '0 0 30px rgba(0, 245, 255, 0.08)',
              }}
            />
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
