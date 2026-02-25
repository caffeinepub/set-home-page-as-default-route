import { useState, useRef, useEffect } from 'react';
import {
  Monitor,
  Code2,
  BookOpen,
  Wrench,
  FileText,
  Zap,
  TestTube,
  BarChart3,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from 'lucide-react';

interface ResourceCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  color: string;
  items: string[];
}

const categories: ResourceCategory[] = [
  {
    id: 'hardware',
    title: 'Hardware Resources',
    icon: Monitor,
    color: '#00f5ff',
    items: [
      'Computer / Laptop',
      'Minimum 4 GB RAM',
      'Any modern CPU (Intel / AMD)',
      'Minimum 10–20 GB free storage',
      'Operating System: Windows / Linux / macOS (Linux preferred)',
    ],
  },
  {
    id: 'software',
    title: 'Software Resources',
    icon: Code2,
    color: '#bf5af2',
    items: [
      'Operating System: Windows 10 / 11 or Ubuntu / any Linux distribution',
      'Programming Language: Python 3.x',
      'Python Library: os',
      'Python Library: time',
      'Python Library: datetime',
      'Python Library: watchdog',
      'Python Library: csv / sqlite3',
    ],
  },
  {
    id: 'knowledge',
    title: 'Knowledge Resources',
    icon: BookOpen,
    color: '#00f5ff',
    items: [
      'Basic Python programming',
      'Understanding of file systems',
      'OS concepts (files, directories, permissions)',
      'Event-driven programming',
      'Log analysis concepts',
    ],
  },
  {
    id: 'development',
    title: 'Development Resources',
    icon: Wrench,
    color: '#bf5af2',
    items: [
      'Code Editor / IDE (VS Code / PyCharm / Spyder)',
      'Terminal / Command Prompt',
      'Sample directories and files for testing',
    ],
  },
  {
    id: 'documentation',
    title: 'Documentation Resources',
    icon: FileText,
    color: '#00f5ff',
    items: [
      'Python official documentation',
      'OS file system documentation',
      'College project report format',
    ],
  },
  {
    id: 'optional',
    title: 'Optional / Advanced Resources',
    icon: Zap,
    color: '#bf5af2',
    items: [
      'SQLite database',
      'GUI library (Tkinter)',
      'Notification system (email / desktop alert)',
      'Visualization tools (matplotlib)',
    ],
  },
  {
    id: 'testing',
    title: 'Testing Resources',
    icon: TestTube,
    color: '#00f5ff',
    items: [
      'Test folders with sample files',
      'File operations (create / delete / modify)',
      'Stress testing with multiple file changes',
    ],
  },
];

const summaryItems = [
  { label: 'Hardware', value: 'Computer with minimum 4GB RAM', color: '#00f5ff' },
  { label: 'Software', value: 'Python 3.x, Watchdog library, OS (Windows/Linux)', color: '#bf5af2' },
  { label: 'Tools', value: 'VS Code / PyCharm', color: '#00f5ff' },
  { label: 'Knowledge', value: 'Python, File System, OS concepts', color: '#bf5af2' },
];

function ResourceCard({ category }: { category: ResourceCategory }) {
  const [open, setOpen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal">
      <div
        className="glass-card overflow-hidden transition-all duration-300"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = `${category.color}40`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = '';
        }}
      >
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between p-5 text-left transition-all duration-200"
          style={{
            background: open ? `${category.color}08` : 'transparent',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${category.color}15`,
                border: `1px solid ${category.color}40`,
                boxShadow: `0 0 12px ${category.color}20`,
              }}
            >
              <category.icon className="w-5 h-5" style={{ color: category.color }} />
            </div>
            <h3
              className="font-orbitron font-bold text-sm tracking-wider"
              style={{ color: category.color }}
            >
              {category.title}
            </h3>
          </div>
          <div style={{ color: `${category.color}80` }}>
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {/* Content */}
        {open && (
          <div
            className="px-5 pb-5"
            style={{ borderTop: `1px solid ${category.color}15` }}
          >
            <ul className="space-y-2 mt-4">
              {category.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{ color: `${category.color}80` }}
                  />
                  <span
                    className="text-sm font-inter"
                    style={{ color: 'rgba(180, 200, 230, 0.8)' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
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
              color: '#00f5ff',
              textShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
            }}
          >
            RESOURCES NEEDED
          </h1>
          <p
            className="text-sm font-rajdhani tracking-widest mb-2"
            style={{ color: 'rgba(150, 180, 220, 0.6)' }}
          >
            SMART FILE SYSTEM ACTIVITY MONITOR & ACCESS ANALYZER
          </p>
          <div
            className="w-24 h-0.5 mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)' }}
          />
        </div>

        {/* Resource categories */}
        <div className="space-y-4 mb-12">
          {categories.map((cat) => (
            <ResourceCard key={cat.id} category={cat} />
          ))}
        </div>

        {/* Summary Card */}
        <div className="reveal">
          <div
            className="glass-card p-8"
            style={{
              border: '1px solid rgba(0, 245, 255, 0.25)',
              boxShadow: '0 0 40px rgba(0, 245, 255, 0.05)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: 'rgba(0, 245, 255, 0.1)',
                  border: '1px solid rgba(0, 245, 255, 0.4)',
                  boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)',
                }}
              >
                <BarChart3 className="w-5 h-5" style={{ color: '#00f5ff' }} />
              </div>
              <h2
                className="font-orbitron font-bold text-lg"
                style={{ color: '#00f5ff', textShadow: '0 0 10px rgba(0,245,255,0.4)' }}
              >
                SHORT SUMMARY
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {summaryItems.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl"
                  style={{
                    background: `${item.color}08`,
                    border: `1px solid ${item.color}20`,
                  }}
                >
                  <div
                    className="text-xs font-orbitron font-bold tracking-widest mb-1"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </div>
                  <div
                    className="text-sm font-inter"
                    style={{ color: 'rgba(180, 200, 230, 0.8)' }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
