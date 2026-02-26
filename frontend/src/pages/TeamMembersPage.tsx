import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  college: string;
  description: string;
  accentColor: string;
  initials: string;
  photo: string;
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
    photo: '/assets/generated/naveen-profile.dim_600x800.png',
  },
  {
    name: 'Saarumathi A',
    role: 'Problem Solver & Project Developer',
    college: 'Priyadarshini Engineering College',
    description:
      "Saarumathi brings sharp analytical skills and strong development expertise, turning complex problems into clean, working solutions. Her ability to dissect technical challenges and implement efficient code makes her the backbone of the project's development phase. She excels at finding elegant solutions where others see only obstacles.",
    accentColor: '#bf5af2',
    initials: 'SA',
    photo: '/assets/generated/saarumathi-profile-enhanced.dim_400x500.jpg',
  },
];

export default function TeamMembersPage() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
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
  const hasImgError = imgError[current];

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

            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              {/* Avatar column — glassmorphic portrait card */}
              <div className="flex-shrink-0 flex flex-col items-center gap-5">

                {/* Outer glow halo */}
                <div
                  style={{
                    filter: `drop-shadow(0 0 28px ${member.accentColor}60) drop-shadow(0 0 56px ${member.accentColor}25)`,
                  }}
                >
                  {/* Glassmorphic portrait frame */}
                  <div
                    className="relative"
                    style={{
                      width: '200px',
                      height: '240px',
                      borderRadius: '20px',
                      background: `linear-gradient(145deg, ${member.accentColor}18 0%, rgba(5,5,16,0.6) 60%, ${member.accentColor}08 100%)`,
                      backdropFilter: 'blur(18px)',
                      WebkitBackdropFilter: 'blur(18px)',
                      border: `1.5px solid ${member.accentColor}50`,
                      boxShadow: `
                        0 0 0 1px ${member.accentColor}15,
                        0 8px 40px rgba(0,0,0,0.6),
                        0 0 30px ${member.accentColor}30,
                        inset 0 1px 0 rgba(255,255,255,0.10),
                        inset 0 -1px 0 ${member.accentColor}20
                      `,
                      overflow: 'hidden',
                    }}
                  >
                    {/* Inner image */}
                    {!hasImgError ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top"
                        style={{
                          filter: 'brightness(1.12) contrast(1.1) saturate(1.15)',
                          borderRadius: '18px',
                        }}
                        onError={() => setImgError((prev) => ({ ...prev, [current]: true }))}
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center"
                        style={{
                          background: `radial-gradient(circle at 40% 35%, ${member.accentColor}22, rgba(5,5,16,0.8))`,
                        }}
                      >
                        <span
                          className="font-orbitron font-bold text-5xl select-none"
                          style={{
                            color: member.accentColor,
                            textShadow: `0 0 24px ${member.accentColor}90, 0 0 48px ${member.accentColor}40`,
                          }}
                        >
                          {member.initials}
                        </span>
                      </div>
                    )}

                    {/* Frosted bottom overlay with name */}
                    <div
                      className="absolute bottom-0 left-0 right-0 px-3 py-2.5"
                      style={{
                        background: `linear-gradient(to top, rgba(5,5,16,0.88) 0%, rgba(5,5,16,0.55) 70%, transparent 100%)`,
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        borderTop: `1px solid ${member.accentColor}25`,
                      }}
                    >
                      <p
                        className="text-center font-orbitron font-bold text-xs tracking-widest truncate"
                        style={{
                          color: member.accentColor,
                          textShadow: `0 0 10px ${member.accentColor}80`,
                        }}
                      >
                        {member.name.toUpperCase()}
                      </p>
                    </div>

                    {/* Neon inner ring overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        borderRadius: '18px',
                        boxShadow: `inset 0 0 18px ${member.accentColor}18, inset 0 0 4px ${member.accentColor}30`,
                      }}
                    />

                    {/* Corner accent dots */}
                    {[
                      { top: '8px', left: '8px' },
                      { top: '8px', right: '8px' },
                      { bottom: '38px', left: '8px' },
                      { bottom: '38px', right: '8px' },
                    ].map((pos, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
                        style={{
                          ...pos,
                          background: member.accentColor,
                          boxShadow: `0 0 6px ${member.accentColor}`,
                          opacity: 0.85,
                        }}
                      />
                    ))}

                    {/* Scan-line shimmer */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: `repeating-linear-gradient(
                          0deg,
                          transparent,
                          transparent 3px,
                          ${member.accentColor}04 3px,
                          ${member.accentColor}04 4px
                        )`,
                        borderRadius: '18px',
                      }}
                    />
                  </div>
                </div>

                {/* Sparkle badge */}
                <div
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-rajdhani font-semibold tracking-wider"
                  style={{
                    background: `${member.accentColor}10`,
                    border: `1px solid ${member.accentColor}35`,
                    color: `${member.accentColor}cc`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  TEAM MEMBER
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
                  <GraduationCap className="w-4 h-4 flex-shrink-0" style={{ color: member.accentColor }} />
                  <span
                    className="text-sm font-rajdhani"
                    style={{ color: 'rgba(200, 220, 240, 0.7)' }}
                  >
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
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(10,15,30,0.85)',
              border: '1px solid rgba(191,90,242,0.3)',
              boxShadow: '0 0 15px rgba(191,90,242,0.2)',
              color: '#bf5af2',
            }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'rgba(10,15,30,0.85)',
              border: '1px solid rgba(191,90,242,0.3)',
              boxShadow: '0 0 15px rgba(191,90,242,0.2)',
              color: '#bf5af2',
            }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Member count */}
        <div className="text-center mt-8">
          <span
            className="text-xs font-rajdhani tracking-widest"
            style={{ color: 'rgba(150, 180, 220, 0.4)' }}
          >
            {current + 1} / {teamMembers.length}
          </span>
        </div>
      </div>
    </div>
  );
}
