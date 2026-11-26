import { useState } from 'react';
import { LabGetaran } from './labs/LabGetaran';
import { LabGelombang } from './labs/LabGelombang';

interface LabViewProps {
  initialLab?: 'getaran' | 'gelombang';
  completedLabs: string[];
  onCompleteLab: (labId: string) => void;
}

export function LabView({
  initialLab = 'getaran',
  completedLabs,
  onCompleteLab,
}: LabViewProps) {
  const [labTab, setLabTab] = useState<'getaran' | 'gelombang'>(initialLab);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Laboratorium Fisika Virtual</h1>
          <p className="text-sm text-slate-600">
            Ubah variabel eksperimen secara langsung dan amati hasil perhitungan fisika real-time
          </p>
        </div>

        <div className="grid w-full grid-cols-2 rounded-xl border border-slate-200 bg-white p-1 sm:inline-flex sm:w-auto">
          <button
            type="button"
            onClick={() => setLabTab('getaran')}
            className={`min-h-[44px] rounded-lg px-2.5 py-2 text-xs sm:px-4 sm:text-sm font-bold transition-colors whitespace-nowrap ${
              labTab === 'getaran'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lab Getaran (3)
          </button>
          <button
            type="button"
            onClick={() => setLabTab('gelombang')}
            className={`min-h-[44px] rounded-lg px-2.5 py-2 text-xs sm:px-4 sm:text-sm font-bold transition-colors whitespace-nowrap ${
              labTab === 'gelombang'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lab Gelombang (3)
          </button>
        </div>
      </div>

      {labTab === 'getaran' ? (
        <LabGetaran completedLabs={completedLabs} onCompleteLab={onCompleteLab} />
      ) : (
        <LabGelombang completedLabs={completedLabs} onCompleteLab={onCompleteLab} />
      )}
    </div>
  );
}
