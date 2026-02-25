import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Briefcase, GraduationCap } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  college: string;
  description: string;
  accentColor: string;
  initials: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Naveen V',
    role: 'Project Manager & Project Designer',
    college: 'Priyadarshini Engineering College',
    description:
      'Naveen is the visionary behind the project, driving the design architecture and overall project strategy with a keen eye for AI-based innovations. His leadership ensures the team stays focused, organized, and aligned with the project goals. With a deep passion for intelligent systems, Naveen transforms complex ideas into structured, executable plans.',
    accentColor: '#00f5ff',
    initials: 'NV',
  },
  {
    name: 'Saarumathi A',
    role: 'Problem Solver & Project Developer',
    college: 'Priyadarshini Engineering College',
    description:
      "Saarumathi brings sharp analytical skills and strong development expertise, turning complex problems into clean, working solutions. Her ability to dissect technical challenges and implement efficient code makes her the backbone of the project's development phase. She excels at finding elegant solutions where others see only obstacles.",
    accentColor: '#bf5af2',
    initials: 'SA',
  },
];

export default function TeamMembersPage() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number, dir: 'left' | 'right') => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };

  const prev = () => {
    const idx = (current - 1 + teamMembers.length) % teamMembers.length;
    goTo(idx, 'left');
  };

  const next = () => {
    const idx = (current + 1) % teamMembers.length;
    goTo(idx, 'right');
  };

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(() => {
      const idx = (current + 1) % teamMembers.length;
      goTo(idx, 'right');
    }, 5000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [current, animating]);

  const member = teamMembers[current];

  return (
    <div
      className="relative min-h-screen py-12 px-4 grid-bg"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1
            className="text-3xl md:text-4xl font-orbitron font-bold mb-3"
            style={{
              color: '#bf5af2',
              textShadow: '0 0 20px rgba(191, 90, 242, 0.5)',
            }}
          >
            TEAM MEMBERS
          </h1>
          <p
            className="text-sm font-rajdhani tracking-widest"
            style={{ color: 'rgba(150, 180, 220, 0.6)' }}
          >
            THE MINDS BEHIND THE PROJECT
          </p>
          <div
            className="w-24 h-0.5 mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, #bf5af2, transparent)' }}
          />
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Main slide */}
          <div
            className="glass-card-purple p-8 md:p-12 overflow-hidden"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction === 'right' ? '-30px' : '30px'})`
                : 'translateX(0)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {/* Decorative glow */}
            <div
              className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${member.accentColor}10, transparent)`,
                filter: 'blur(50px)',
              }}
            />

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
              {/* Avatar column */}
              <div className="flex-shrink-0 flex flex-col items-center gap-4">
                {/* Initials avatar */}
                <div
                  className="w-36 h-36 rounded-full flex items-center justify-center relative"
                  style={{
                    border: `3px solid ${member.accentColor}60`,
                    boxShadow: `0 0 30px ${member.accentColor}30, 0 0 60px ${member.accentColor}10`,
                    background: `radial-gradient(circle at 30% 30%, ${member.accentColor}20, ${member.accentColor}08)`,
                  }}
                >
                  <span
                    className="font-orbitron font-bold text-4xl select-none"
                    style={{
                      color: member.accentColor,
                      textShadow: `0 0 20px ${member.accentColor}80`,
                    }}
                  >
                    {member.initials}
                  </span>
                </div>

                {/* Slide indicator dots */}
                <div className="flex gap-2">
                  {teamMembers.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i, i > current ? 'right' : 'left')}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: i === current ? '24px' : '8px',
                        height: '8px',
                        background: i === current ? member.accentColor : 'rgba(255,255,255,0.2)',
                        boxShadow: i === current ? `0 0 8px ${member.accentColor}` : 'none',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-rajdhani font-semibold tracking-widest mb-3"
                  style={{
                    background: `${member.accentColor}12`,
                    border: `1px solid ${member.accentColor}30`,
                    color: `${member.accentColor}cc`,
                  }}
                >
                  <Briefcase className="w-3 h-3" />
                  {member.role}
                </div>

                <h2
                  className="text-3xl md:text-4xl font-orbitron font-bold mb-4"
                  style={{
                    color: member.accentColor,
                    textShadow: `0 0 20px ${member.accentColor}50`,
                  }}
                >
                  {member.name}
                </h2>

                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                  <GraduationCap className="w-4 h-4 flex-shrink-0" style={{ color: 'rgba(150,180,220,0.6)' }} />
                  <span className="text-sm font-rajdhani" style={{ color: 'rgba(180, 200, 230, 0.7)' }}>
                    {member.college}
                  </span>
                </div>

                <p
                  className="text-sm font-inter leading-relaxed"
                  style={{ color: 'rgba(180, 200, 230, 0.75)' }}
                >
                  {member.description}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: 'rgba(5, 5, 16, 0.9)',
              border: `1px solid ${member.accentColor}40`,
              color: member.accentColor,
              boxShadow: `0 0 15px ${member.accentColor}20`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${member.accentColor}50`;
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) translateX(-20px) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 15px ${member.accentColor}20`;
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) translateX(-20px) scale(1)';
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: 'rgba(5, 5, 16, 0.9)',
              border: `1px solid ${member.accentColor}40`,
              color: member.accentColor,
              boxShadow: `0 0 15px ${member.accentColor}20`,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 20px ${member.accentColor}50`;
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) translateX(20px) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 15px ${member.accentColor}20`;
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-50%) translateX(20px) scale(1)';
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Member counter */}
        <div className="text-center mt-8">
          <span
            className="text-xs font-rajdhani tracking-widest"
            style={{ color: 'rgba(150, 180, 220, 0.4)' }}
          >
            {current + 1} / {teamMembers.length} MEMBERS
          </span>
        </div>
      </div>
    </div>
  );
}
