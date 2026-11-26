import { useEffect, useState } from 'react';
import {
  Home,
  BookOpen,
  FlaskConical,
  ClipboardCheck,
  Gamepad2,
  Calculator,
  Network,
} from 'lucide-react';
import { loadProgress, saveProgress, clearProgress } from './utils/storage';
import type { ProgressState } from './physics/formulas';
import { HomeView, type AppSection } from './components/HomeView';
import { MateriView } from './components/MateriView';
import { LabView } from './components/LabView';
import { LatihanView } from './components/LatihanView';
import { GameView } from './components/GameView';
import { RangkumanView } from './components/RangkumanView';
import { RumusModal } from './components/RumusModal';

export default function App() {
  const [section, setSection] = useState<AppSection>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return 'materi';
    }
    return 'home';
  });
  const [initialLabTab, setInitialLabTab] = useState<'getaran' | 'gelombang'>('getaran');
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [rumusOpen, setRumusOpen] = useState(false);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const handleToggleTopic = (topicId: string) => {
    setProgress((prev) => {
      const exists = prev.completedTopics.includes(topicId);
      return {
        ...prev,
        completedTopics: exists
          ? prev.completedTopics.filter((t) => t !== topicId)
          : [...prev.completedTopics, topicId],
      };
    });
  };

  const handleCompleteLab = (labId: string) => {
    setProgress((prev) => {
      if (prev.completedLabs.includes(labId)) return prev;
      return {
        ...prev,
        completedLabs: [...prev.completedLabs, labId],
      };
    });
  };

  const handleSaveQuizScore = (category: 'getaran' | 'gelombang', score: number) => {
    setProgress((prev) => ({
      ...prev,
      getaranQuizScore: category === 'getaran' ? score : prev.getaranQuizScore,
      gelombangQuizScore: category === 'gelombang' ? score : prev.gelombangQuizScore,
    }));
  };

  const handleSaveGameScore = (score: number) => {
    setProgress((prev) => ({
      ...prev,
      gameBestScore: Math.max(prev.gameBestScore, score),
    }));
  };

  const handleResetProgress = () => {
    const fresh = clearProgress();
    setProgress(fresh);
  };

  const handleNavigate = (target: AppSection, subTab?: string) => {
    if (target === 'lab' && (subTab === 'getaran' || subTab === 'gelombang')) {
      setInitialLabTab(subTab);
    }
    setSection(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems: { id: AppSection; label: string }[] = [
    { id: 'home', label: 'Beranda' },
    { id: 'materi', label: 'Materi' },
    { id: 'lab', label: 'Lab Virtual' },
    { id: 'latihan', label: 'Latihan Soal' },
    { id: 'game', label: 'Mini-Game' },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8FAFC] pb-20 text-slate-900 md:pb-10">
      {/* Top Bar Contract: 3 zones separated by gap-8 (1-line Brand, 5 single-line nav links, 1 primary action) */}
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:gap-8 sm:px-6">
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('home');
            }}
            className="text-base font-extrabold tracking-tight text-blue-700 whitespace-nowrap shrink-0 sm:text-lg"
          >
            FISIKA EXPLORER
          </a>

          <nav className="hidden md:flex items-center gap-6" aria-label="Navigasi Utama">
            {navItems.map((item) => {
              const active = section === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`relative py-1 text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'text-blue-600 underline decoration-2 underline-offset-8'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setRumusOpen(true)}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 py-2 text-xs font-bold text-white transition-colors hover:bg-blue-700 whitespace-nowrap shrink-0 sm:px-4"
            >
              <Calculator className="h-3.5 w-3.5" aria-hidden="true" />
              Kumpulan Rumus
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Quick sub-links to Mini-Game & Rangkuman when browsing other views */}
        {section !== 'home' && (
          <div className="mb-4 flex flex-wrap items-center justify-end gap-4">
            {section !== 'game' && (
              <button
                type="button"
                onClick={() => handleNavigate('game')}
                className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 md:hidden"
              >
                <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
                Mini-Game Fisika
              </button>
            )}
            {section !== 'rangkuman' && (
              <button
                type="button"
                onClick={() => handleNavigate('rangkuman')}
                className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700"
              >
                <Network className="h-3.5 w-3.5" aria-hidden="true" />
                Lihat Peta Konsep &amp; Rangkuman
              </button>
            )}
          </div>
        )}

        {section === 'home' && (
          <HomeView progress={progress} onNavigate={handleNavigate} />
        )}

        {section === 'materi' && (
          <MateriView
            completedTopics={progress.completedTopics}
            onToggleTopicComplete={handleToggleTopic}
            onGoToLab={(chapter) => handleNavigate('lab', chapter)}
          />
        )}

        {section === 'lab' && (
          <LabView
            initialLab={initialLabTab}
            completedLabs={progress.completedLabs}
            onCompleteLab={handleCompleteLab}
          />
        )}

        {section === 'latihan' && (
          <LatihanView
            getaranScore={progress.getaranQuizScore}
            gelombangScore={progress.gelombangQuizScore}
            onSaveScore={handleSaveQuizScore}
            onGoToMateri={() => handleNavigate('materi')}
          />
        )}

        {section === 'game' && (
          <GameView
            bestScore={progress.gameBestScore}
            onSaveBestScore={handleSaveGameScore}
          />
        )}

        {section === 'rangkuman' && (
          <RangkumanView
            progress={progress}
            onResetProgress={handleResetProgress}
            onOpenRumus={() => setRumusOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Compact 56px + top 56px = 112px < 15% of 844px mobile viewport) */}
      <nav
        aria-label="Navigasi Bawah Ponsel"
        className="fixed bottom-0 left-0 right-0 z-40 grid h-14 grid-cols-5 border-t border-slate-200 bg-white/95 backdrop-blur-md md:hidden"
      >
        {[
          { id: 'home' as const, label: 'Beranda', icon: Home },
          { id: 'materi' as const, label: 'Materi', icon: BookOpen },
          { id: 'lab' as const, label: 'Lab', icon: FlaskConical },
          { id: 'latihan' as const, label: 'Latihan', icon: ClipboardCheck },
          { id: 'rangkuman' as const, label: 'Peta', icon: Network },
        ].map((item) => {
          const Icon = item.icon;
          const active = section === item.id || (item.id === 'rangkuman' && section === 'game');
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavigate(item.id)}
              className={`flex min-h-[44px] flex-col items-center justify-center gap-0.5 text-[10px] font-semibold ${
                active ? 'text-blue-600' : 'text-slate-500'
              }`}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Kumpulan Rumus Modal */}
      <RumusModal open={rumusOpen} onClose={() => setRumusOpen(false)} />
    </div>
  );
}
