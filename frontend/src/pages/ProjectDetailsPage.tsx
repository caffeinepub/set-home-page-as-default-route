import { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Target,
  AlertTriangle,
  FileText,
  Cpu,
  Layers,
  Play,
  ThumbsUp,
  Globe,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';

interface Section {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
}

const sections: Section[] = [
  { id: 'introduction', title: 'Introduction', icon: BookOpen, color: '#00f5ff' },
  { id: 'objective', title: 'Objective of the Project', icon: Target, color: '#bf5af2' },
  { id: 'page-fault', title: 'What is a Page Fault?', icon: AlertTriangle, color: '#00f5ff' },
  { id: 'description', title: 'Project Description', icon: FileText, color: '#bf5af2' },
  { id: 'algorithms', title: 'Page Replacement Algorithms', icon: Cpu, color: '#00f5ff' },
  { id: 'modules', title: 'Modules in the Project', icon: Layers, color: '#bf5af2' },
  { id: 'example', title: 'Example Working', icon: Play, color: '#00f5ff' },
  { id: 'advantages', title: 'Advantages', icon: ThumbsUp, color: '#bf5af2' },
  { id: 'applications', title: 'Applications', icon: Globe, color: '#00f5ff' },
  { id: 'conclusion', title: 'Conclusion', icon: CheckCircle, color: '#bf5af2' },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

function SectionBlock({
  id,
  title,
  icon: Icon,
  color,
  children,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref as React.RefObject<HTMLElement>);

  return (
    <div ref={ref} id={id} className="reveal mb-8">
      <div className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${color}15`,
              border: `1px solid ${color}40`,
              boxShadow: `0 0 15px ${color}20`,
            }}
          >
            <Icon className="w-5 h-5" style={{ color }} />
          </div>
          <h2
            className="font-orbitron font-bold text-base md:text-lg"
            style={{ color, textShadow: `0 0 10px ${color}40` }}
          >
            {title}
          </h2>
        </div>
        <div
          className="font-inter text-sm leading-relaxed space-y-3"
          style={{ color: 'rgba(180, 200, 230, 0.82)' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function AlgoTable({
  name,
  color,
  frames,
  pages,
  rows,
  faults,
}: {
  name: string;
  color: string;
  frames: number;
  pages: number[];
  rows: (string | null)[][];
  faults: boolean[];
}) {
  return (
    <div
      className="rounded-xl overflow-hidden mb-4"
      style={{ border: `1px solid ${color}25` }}
    >
      <div
        className="px-4 py-2 text-xs font-orbitron font-bold tracking-widest"
        style={{ background: `${color}12`, color }}
      >
        {name} – {frames} Frames
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
              <th
                className="px-3 py-2 text-left font-rajdhani font-semibold tracking-wider"
                style={{ color: 'rgba(150,180,220,0.6)' }}
              >
                Page
              </th>
              {pages.map((p, i) => (
                <th
                  key={i}
                  className="px-3 py-2 text-center font-rajdhani font-semibold"
                  style={{ color: faults[i] ? '#ff4444' : 'rgba(150,180,220,0.6)' }}
                >
                  {p}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: frames }).map((_, fi) => (
              <tr key={fi} style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                <td
                  className="px-3 py-2 font-rajdhani font-semibold"
                  style={{ color: `${color}80` }}
                >
                  F{fi + 1}
                </td>
                {rows[fi].map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-3 py-2 text-center font-inter"
                    style={{ color: cell ? 'rgba(200,220,240,0.9)' : 'rgba(100,120,150,0.3)' }}
                  >
                    {cell ?? '–'}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ borderTop: `1px solid ${color}20` }}>
              <td
                className="px-3 py-2 font-rajdhani font-semibold text-xs"
                style={{ color: '#ff4444' }}
              >
                Fault?
              </td>
              {faults.map((f, i) => (
                <td key={i} className="px-3 py-2 text-center">
                  {f ? (
                    <span style={{ color: '#ff4444', fontWeight: 700 }}>✗</span>
                  ) : (
                    <span style={{ color: '#00f5ff', fontWeight: 700 }}>✓</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ProjectDetailsPage() {
  const [activeSection, setActiveSection] = useState('introduction');

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // FIFO example: pages [7,0,1,2,0,3,0,4,2,3,0,3,2], 3 frames
  const fifoPages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3];
  const fifoRows: (string | null)[][] = [
    ['7', '7', '7', '2', '2', '2', '2', '4', '4', '4'],
    [null, '0', '0', '0', '0', '3', '3', '3', '2', '2'],
    [null, null, '1', '1', '1', '1', '0', '0', '0', '3'],
  ];
  const fifoFaults = [true, true, true, true, false, true, true, true, true, true];

  // LRU example
  const lruPages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3];
  const lruRows: (string | null)[][] = [
    ['7', '7', '7', '2', '2', '2', '2', '4', '4', '4'],
    [null, '0', '0', '0', '0', '0', '0', '0', '2', '2'],
    [null, null, '1', '1', '1', '3', '3', '3', '3', '3'],
  ];
  const lruFaults = [true, true, true, true, false, true, false, true, true, true];

  // Optimal example
  const optPages = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3];
  const optRows: (string | null)[][] = [
    ['7', '7', '7', '2', '2', '2', '2', '2', '2', '2'],
    [null, '0', '0', '0', '0', '0', '0', '4', '4', '4'],
    [null, null, '1', '1', '1', '3', '3', '3', '3', '3'],
  ];
  const optFaults = [true, true, true, true, false, true, false, true, false, false];

  return (
    <div
      className="relative min-h-screen py-12 px-4 grid-bg"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-rajdhani font-semibold tracking-widest mb-4"
            style={{
              background: 'rgba(0, 245, 255, 0.08)',
              border: '1px solid rgba(0, 245, 255, 0.25)',
              color: 'rgba(0, 245, 255, 0.8)',
            }}
          >
            <Cpu className="w-3 h-3" />
            FULL PROJECT DETAILS
          </div>
          <h1
            className="text-2xl md:text-4xl font-orbitron font-bold mb-3 leading-tight"
            style={{
              color: '#00f5ff',
              textShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
            }}
          >
            VIRTUAL MEMORY MANAGEMENT
          </h1>
          <h2
            className="text-lg md:text-2xl font-orbitron font-semibold mb-4"
            style={{ color: 'rgba(191, 90, 242, 0.9)' }}
          >
            & PAGE REPLACEMENT ALGORITHMS
          </h2>
          <div
            className="w-32 h-0.5 mx-auto"
            style={{ background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)' }}
          />
        </div>

        <div className="flex gap-8">
          {/* Floating TOC sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <div
              className="sticky top-24 glass-card p-4"
              style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
            >
              <div
                className="text-xs font-orbitron font-bold tracking-widest mb-4"
                style={{ color: 'rgba(0, 245, 255, 0.6)' }}
              >
                CONTENTS
              </div>
              <nav className="space-y-1">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs font-rajdhani font-semibold tracking-wide transition-all duration-200"
                    style={{
                      color: activeSection === sec.id ? sec.color : 'rgba(150, 180, 220, 0.5)',
                      background: activeSection === sec.id ? `${sec.color}10` : 'transparent',
                      border: activeSection === sec.id ? `1px solid ${sec.color}25` : '1px solid transparent',
                    }}
                  >
                    <ChevronRight
                      className="w-3 h-3 flex-shrink-0"
                      style={{ opacity: activeSection === sec.id ? 1 : 0.3 }}
                    />
                    {sec.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <SectionBlock id="introduction" title="Introduction" icon={BookOpen} color="#00f5ff">
              <p>
                Virtual Memory Management is a fundamental concept in modern operating systems that allows a computer
                to use more memory than is physically available. It creates an illusion of a large, contiguous memory
                space by using a combination of physical RAM and disk storage.
              </p>
              <p>
                When a program runs, it doesn't need all its data in RAM at once. The OS divides memory into fixed-size
                blocks called <strong style={{ color: '#00f5ff' }}>pages</strong> and loads only the required pages
                into physical memory. This technique enables multitasking, process isolation, and efficient memory
                utilization.
              </p>
              <p>
                Page Replacement Algorithms are the decision-making mechanisms that determine which page to remove
                from physical memory when a new page needs to be loaded and no free frames are available.
              </p>
            </SectionBlock>

            <SectionBlock id="objective" title="Objective of the Project" icon={Target} color="#bf5af2">
              <p>The primary objectives of this project are:</p>
              <ul className="space-y-2 mt-2">
                {[
                  'Simulate virtual memory management using Python to understand how OS handles memory.',
                  'Implement and compare three major page replacement algorithms: FIFO, LRU, and Optimal.',
                  'Visualize page faults and frame states at each step of the simulation.',
                  'Analyze the efficiency of each algorithm in terms of page fault count.',
                  'Provide an educational tool for understanding OS memory management concepts.',
                  'Demonstrate the trade-offs between simplicity and efficiency in algorithm design.',
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span
                      className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                      style={{ background: 'rgba(191,90,242,0.15)', color: '#bf5af2', border: '1px solid rgba(191,90,242,0.3)' }}
                    >
                      {i + 1}
                    </span>
                    {obj}
                  </li>
                ))}
              </ul>
            </SectionBlock>

            <SectionBlock id="page-fault" title="What is a Page Fault?" icon={AlertTriangle} color="#00f5ff">
              <p>
                A <strong style={{ color: '#00f5ff' }}>Page Fault</strong> occurs when a program tries to access a
                page that is currently not loaded in physical memory (RAM). When this happens, the CPU generates a
                page fault interrupt, and the operating system must handle it.
              </p>
              <div
                className="p-4 rounded-xl mt-3"
                style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.15)' }}
              >
                <p className="font-semibold mb-2" style={{ color: '#00f5ff' }}>Page Fault Handling Process:</p>
                <ol className="space-y-1.5 list-decimal list-inside">
                  <li>CPU detects the page is not in RAM → generates page fault interrupt</li>
                  <li>OS saves the current process state</li>
                  <li>OS finds the required page on disk (swap space)</li>
                  <li>If RAM is full, OS selects a victim page using a replacement algorithm</li>
                  <li>The victim page is written to disk (if modified)</li>
                  <li>The required page is loaded into the freed frame</li>
                  <li>Process resumes execution from the faulting instruction</li>
                </ol>
              </div>
              <p className="mt-3">
                <strong style={{ color: '#ff4444' }}>Impact:</strong> Frequent page faults cause{' '}
                <strong style={{ color: '#ff4444' }}>thrashing</strong> — a condition where the system spends more
                time swapping pages than executing processes, severely degrading performance.
              </p>
            </SectionBlock>

            <SectionBlock id="description" title="Project Description (Simple Words)" icon={FileText} color="#bf5af2">
              <p>
                Think of physical RAM as a small desk with limited space. Your entire program is like a large book
                stored in a cabinet (disk). You can only keep a few pages of the book on your desk at a time.
              </p>
              <p>
                When you need a page that's not on your desk, you have to go to the cabinet, get it, and if your desk
                is full, put one of the existing pages back. This "putting back" decision is what page replacement
                algorithms decide.
              </p>
              <p>
                This project simulates this process in Python. You provide a sequence of page requests and the number
                of available frames (desk spaces). The program then shows you step-by-step which pages are in memory,
                when page faults occur, and how many total faults each algorithm produces.
              </p>
              <div
                className="p-4 rounded-xl mt-3"
                style={{ background: 'rgba(191,90,242,0.05)', border: '1px solid rgba(191,90,242,0.15)' }}
              >
                <p style={{ color: '#bf5af2' }} className="font-semibold mb-1">Key Terms:</p>
                <ul className="space-y-1">
                  <li><strong style={{ color: '#bf5af2' }}>Frame:</strong> A slot in physical RAM that can hold one page</li>
                  <li><strong style={{ color: '#bf5af2' }}>Page:</strong> A fixed-size block of a program's virtual memory</li>
                  <li><strong style={{ color: '#bf5af2' }}>Hit:</strong> The requested page is already in RAM (no fault)</li>
                  <li><strong style={{ color: '#bf5af2' }}>Miss/Fault:</strong> The requested page is not in RAM</li>
                </ul>
              </div>
            </SectionBlock>

            <SectionBlock id="algorithms" title="Page Replacement Algorithms" icon={Cpu} color="#00f5ff">
              {/* FIFO */}
              <div className="mb-6">
                <h3
                  className="font-orbitron font-bold text-sm mb-2"
                  style={{ color: '#00f5ff' }}
                >
                  1. FIFO – First In, First Out
                </h3>
                <p className="mb-3">
                  The simplest algorithm. The page that has been in memory the longest is replaced first. It works
                  like a queue — the first page to enter is the first to leave. Easy to implement but can suffer from
                  Bélády's anomaly (more frames → more faults).
                </p>
                <AlgoTable
                  name="FIFO"
                  color="#00f5ff"
                  frames={3}
                  pages={fifoPages}
                  rows={fifoRows}
                  faults={fifoFaults}
                />
                <p className="text-xs" style={{ color: 'rgba(150,180,220,0.6)' }}>
                  Total Page Faults: {fifoFaults.filter(Boolean).length} / {fifoPages.length}
                </p>
              </div>

              {/* LRU */}
              <div className="mb-6">
                <h3
                  className="font-orbitron font-bold text-sm mb-2"
                  style={{ color: '#bf5af2' }}
                >
                  2. LRU – Least Recently Used
                </h3>
                <p className="mb-3">
                  Replaces the page that has not been used for the longest time. Based on the principle of temporal
                  locality — recently used pages are likely to be used again soon. More efficient than FIFO but
                  requires tracking usage history.
                </p>
                <AlgoTable
                  name="LRU"
                  color="#bf5af2"
                  frames={3}
                  pages={lruPages}
                  rows={lruRows}
                  faults={lruFaults}
                />
                <p className="text-xs" style={{ color: 'rgba(150,180,220,0.6)' }}>
                  Total Page Faults: {lruFaults.filter(Boolean).length} / {lruPages.length}
                </p>
              </div>

              {/* Optimal */}
              <div>
                <h3
                  className="font-orbitron font-bold text-sm mb-2"
                  style={{ color: '#00f5ff' }}
                >
                  3. Optimal Algorithm
                </h3>
                <p className="mb-3">
                  Replaces the page that will not be used for the longest time in the future. Produces the minimum
                  possible page faults — it's the theoretical best. However, it requires future knowledge of page
                  requests, making it impractical for real systems. Used as a benchmark to evaluate other algorithms.
                </p>
                <AlgoTable
                  name="Optimal"
                  color="#00f5ff"
                  frames={3}
                  pages={optPages}
                  rows={optRows}
                  faults={optFaults}
                />
                <p className="text-xs" style={{ color: 'rgba(150,180,220,0.6)' }}>
                  Total Page Faults: {optFaults.filter(Boolean).length} / {optPages.length}
                </p>
              </div>
            </SectionBlock>

            <SectionBlock id="modules" title="Modules in the Project" icon={Layers} color="#bf5af2">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Input Module',
                    desc: 'Accepts page reference string and number of frames from the user. Validates input for correctness.',
                  },
                  {
                    name: 'FIFO Module',
                    desc: 'Implements the First-In-First-Out page replacement logic using a queue data structure.',
                  },
                  {
                    name: 'LRU Module',
                    desc: 'Implements Least Recently Used algorithm by tracking the last access time of each page.',
                  },
                  {
                    name: 'Optimal Module',
                    desc: 'Implements the Optimal algorithm by looking ahead in the reference string to find the best victim.',
                  },
                  {
                    name: 'Simulation Engine',
                    desc: 'Orchestrates the simulation, processes each page request, and records frame states at each step.',
                  },
                  {
                    name: 'Output / Display Module',
                    desc: 'Displays the frame state table, highlights page faults, and shows total fault count for each algorithm.',
                  },
                ].map((mod, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl"
                    style={{
                      background: 'rgba(191,90,242,0.05)',
                      border: '1px solid rgba(191,90,242,0.15)',
                    }}
                  >
                    <div
                      className="font-orbitron font-bold text-xs mb-1"
                      style={{ color: '#bf5af2' }}
                    >
                      {mod.name}
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(180,200,230,0.75)' }}>
                      {mod.desc}
                    </p>
                  </div>
                ))}
              </div>
            </SectionBlock>

            <SectionBlock id="example" title="Example Working" icon={Play} color="#00f5ff">
              <p>
                <strong style={{ color: '#00f5ff' }}>Input:</strong> Page Reference String: 7, 0, 1, 2, 0, 3, 0, 4, 2, 3
                &nbsp;|&nbsp; Number of Frames: 3
              </p>
              <div
                className="p-4 rounded-xl mt-3"
                style={{ background: 'rgba(0,245,255,0.05)', border: '1px solid rgba(0,245,255,0.15)' }}
              >
                <p className="font-semibold mb-2" style={{ color: '#00f5ff' }}>Step-by-Step (FIFO):</p>
                <ol className="space-y-1.5 text-xs">
                  <li><strong style={{ color: '#00f5ff' }}>Step 1:</strong> Page 7 requested → Frames: [7, –, –] → PAGE FAULT (empty frame)</li>
                  <li><strong style={{ color: '#00f5ff' }}>Step 2:</strong> Page 0 requested → Frames: [7, 0, –] → PAGE FAULT (empty frame)</li>
                  <li><strong style={{ color: '#00f5ff' }}>Step 3:</strong> Page 1 requested → Frames: [7, 0, 1] → PAGE FAULT (empty frame)</li>
                  <li><strong style={{ color: '#00f5ff' }}>Step 4:</strong> Page 2 requested → Frames: [2, 0, 1] → PAGE FAULT (replace 7, oldest)</li>
                  <li><strong style={{ color: '#00f5ff' }}>Step 5:</strong> Page 0 requested → Frames: [2, 0, 1] → HIT (0 already in memory)</li>
                  <li><strong style={{ color: '#00f5ff' }}>Step 6:</strong> Page 3 requested → Frames: [2, 3, 1] → PAGE FAULT (replace 0, oldest)</li>
                  <li><strong style={{ color: '#00f5ff' }}>Step 7:</strong> Page 0 requested → Frames: [2, 3, 0] → PAGE FAULT (replace 1, oldest)</li>
                  <li><strong style={{ color: '#00f5ff' }}>Step 8:</strong> Page 4 requested → Frames: [4, 3, 0] → PAGE FAULT (replace 2, oldest)</li>
                  <li><strong style={{ color: '#00f5ff' }}>Step 9:</strong> Page 2 requested → Frames: [4, 2, 0] → PAGE FAULT (replace 3, oldest)</li>
                  <li><strong style={{ color: '#00f5ff' }}>Step 10:</strong> Page 3 requested → Frames: [4, 2, 3] → PAGE FAULT (replace 0, oldest)</li>
                </ol>
              </div>
              <p className="mt-3">
                <strong style={{ color: '#ff4444' }}>FIFO Result:</strong> 9 page faults &nbsp;|&nbsp;
                <strong style={{ color: '#bf5af2' }}>LRU Result:</strong> 8 page faults &nbsp;|&nbsp;
                <strong style={{ color: '#00f5ff' }}>Optimal Result:</strong> 6 page faults
              </p>
            </SectionBlock>

            <SectionBlock id="advantages" title="Advantages" icon={ThumbsUp} color="#bf5af2">
              <ul className="space-y-2">
                {[
                  'Enables programs larger than physical RAM to run efficiently.',
                  'Provides process isolation — each process has its own virtual address space.',
                  'Simplifies memory management for programmers (no manual memory layout needed).',
                  'Allows efficient multitasking by sharing physical memory among multiple processes.',
                  'Reduces memory waste through demand paging (only load what is needed).',
                  'LRU and Optimal algorithms significantly reduce page faults compared to naive approaches.',
                  'Educational value: helps students understand OS internals and algorithm trade-offs.',
                ].map((adv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#bf5af2' }} />
                    {adv}
                  </li>
                ))}
              </ul>
            </SectionBlock>

            <SectionBlock id="applications" title="Applications" icon={Globe} color="#00f5ff">
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { title: 'Operating Systems', desc: 'Used in Windows, Linux, macOS for managing RAM and virtual memory.' },
                  { title: 'Database Systems', desc: 'Buffer pool management in databases like MySQL and PostgreSQL.' },
                  { title: 'Web Browsers', desc: 'Tab memory management and caching of web resources.' },
                  { title: 'Embedded Systems', desc: 'Memory management in resource-constrained IoT devices.' },
                  { title: 'Virtual Machines', desc: 'Hypervisors use page replacement to manage guest OS memory.' },
                  { title: 'Game Engines', desc: 'Streaming large game worlds by loading/unloading memory pages.' },
                  { title: 'Cloud Computing', desc: 'Memory overcommitment in cloud VMs using balloon drivers.' },
                  { title: 'AI/ML Frameworks', desc: 'GPU memory management for large neural network training.' },
                ].map((app, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl"
                    style={{
                      background: 'rgba(0,245,255,0.04)',
                      border: '1px solid rgba(0,245,255,0.12)',
                    }}
                  >
                    <div
                      className="font-orbitron font-bold text-xs mb-1"
                      style={{ color: '#00f5ff' }}
                    >
                      {app.title}
                    </div>
                    <p className="text-xs" style={{ color: 'rgba(180,200,230,0.7)' }}>
                      {app.desc}
                    </p>
                  </div>
                ))}
              </div>
            </SectionBlock>

            <SectionBlock id="conclusion" title="Conclusion" icon={CheckCircle} color="#bf5af2">
              <p>
                This project successfully demonstrates the core concepts of Virtual Memory Management and Page
                Replacement Algorithms through a Python-based simulation. By implementing FIFO, LRU, and Optimal
                algorithms, we gain a deep understanding of how operating systems manage the critical resource of
                physical memory.
              </p>
              <p>
                The comparison reveals that while FIFO is the simplest to implement, it is not always the most
                efficient. LRU provides a practical balance between performance and implementation complexity.
                The Optimal algorithm, though impractical for real systems, serves as the gold standard for
                evaluating other algorithms.
              </p>
              <p>
                This simulation bridges the gap between theoretical OS concepts and practical implementation,
                making it an invaluable educational tool for students of Computer Science and Artificial
                Intelligence. The insights gained here form the foundation for understanding advanced topics
                like cache management, garbage collection, and AI memory optimization.
              </p>
              <div
                className="p-4 rounded-xl mt-4"
                style={{
                  background: 'rgba(191,90,242,0.06)',
                  border: '1px solid rgba(191,90,242,0.2)',
                }}
              >
                <p
                  className="text-center font-orbitron font-bold text-sm"
                  style={{ color: '#bf5af2' }}
                >
                  "Understanding memory management is understanding the heart of every operating system."
                </p>
              </div>
            </SectionBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
