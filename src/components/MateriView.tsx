import { useState } from 'react';
import { CheckCircle2, ArrowRight, Lightbulb, Calculator } from 'lucide-react';
import { GETARAN_TOPICS, GELOMBANG_TOPICS, type MateriTopic } from '../data/materiData';
import { NarratorBar } from './NarratorBar';
import { PhysicsImage } from './PhysicsImage';
import { ConceptVisuals } from './diagrams/ConceptVisuals';

interface MateriViewProps {
  completedTopics: string[];
  onToggleTopicComplete: (topicId: string) => void;
  onGoToLab: (chapter: 'getaran' | 'gelombang') => void;
}

export function MateriView({
  completedTopics,
  onToggleTopicComplete,
  onGoToLab,
}: MateriViewProps) {
  const [chapter, setChapter] = useState<'getaran' | 'gelombang'>('getaran');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const topics = chapter === 'getaran' ? GETARAN_TOPICS : GELOMBANG_TOPICS;
  const activeTopic: MateriTopic = topics[selectedIndex] ?? topics[0];
  const isCompleted = completedTopics.includes(activeTopic.id);

  const handleSwitchChapter = (nextChapter: 'getaran' | 'gelombang') => {
    setChapter(nextChapter);
    setSelectedIndex(0);
  };

  const handleNextTopic = () => {
    if (!isCompleted) {
      onToggleTopicComplete(activeTopic.id);
    }
    if (selectedIndex < topics.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else if (chapter === 'getaran') {
      setChapter('gelombang');
      setSelectedIndex(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Chapter Switcher */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Materi Pembelajaran Interaktif</h1>
          <p className="text-sm text-slate-600">
            Pelajari konsep dasar, animasi interaktif, dan contoh soal langkah demi langkah
          </p>
        </div>

        <div className="grid w-full grid-cols-2 rounded-xl border border-slate-200 bg-white p-1 sm:inline-flex sm:w-auto">
          <button
            type="button"
            onClick={() => handleSwitchChapter('getaran')}
            className={`min-h-[42px] rounded-lg px-2.5 py-2 text-xs sm:px-4 sm:text-sm font-bold transition-colors whitespace-nowrap ${
              chapter === 'getaran'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Getaran ({GETARAN_TOPICS.filter((t) => completedTopics.includes(t.id)).length}/6)
          </button>
          <button
            type="button"
            onClick={() => handleSwitchChapter('gelombang')}
            className={`min-h-[42px] rounded-lg px-2.5 py-2 text-xs sm:px-4 sm:text-sm font-bold transition-colors whitespace-nowrap ${
              chapter === 'gelombang'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gelombang ({GELOMBANG_TOPICS.filter((t) => completedTopics.includes(t.id)).length}/6)
          </button>
        </div>
      </div>

      {/* Topic Selector */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <h2 className="px-2 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Daftar Topik {chapter === 'getaran' ? 'Getaran' : 'Gelombang'}
            </h2>
            <nav className="flex flex-col gap-1.5" aria-label="Daftar Topik Materi">
              {topics.map((topic, idx) => {
                const done = completedTopics.includes(topic.id);
                const active = idx === selectedIndex;
                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={`flex min-h-[46px] w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${
                      active
                        ? 'bg-blue-50 font-bold text-blue-700 ring-1 ring-blue-200'
                        : 'font-medium text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">
                      {topic.code}. {topic.shortTitle}
                    </span>
                    {done && (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-label="Sudah dipelajari" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => onGoToLab(chapter)}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
              >
                Praktikkan di Lab {chapter === 'getaran' ? 'Getaran' : 'Gelombang'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Topic Content */}
        <article className="space-y-5 lg:col-span-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-blue-600">
                  Materi {chapter === 'getaran' ? 'Getaran' : 'Gelombang'} · Bagian {activeTopic.code}
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">
                  {activeTopic.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => onToggleTopicComplete(activeTopic.id)}
                className={`inline-flex min-h-[42px] items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-colors whitespace-nowrap ${
                  isCompleted
                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {isCompleted ? 'Sudah Dipelajari' : 'Tandai Selesai'}
              </button>
            </div>

            <p className="mt-3 text-base font-medium leading-relaxed text-slate-800">
              {activeTopic.summary}
            </p>

            {/* Analogi Kehidupan Sehari-hari */}
            <div className="mt-4 rounded-xl border border-cyan-200 bg-cyan-50/70 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-800">
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
                Analogi Sehari-hari
              </div>
              <p className="mt-1 text-sm leading-relaxed text-slate-700">{activeTopic.analogy}</p>
            </div>
          </div>

          {/* Narator TTS Guru Fisika */}
          <NarratorBar
            title={`Penjelasan Guru: ${activeTopic.shortTitle}`}
            segments={activeTopic.narratorScript}
          />

          {/* Interactive Concept Visualizer */}
          <ConceptVisuals type={activeTopic.visualType} />

          {/* Realistic High-Resolution Illustration if present */}
          {activeTopic.imageUrl && (
            <figure className="rounded-2xl border border-slate-200 bg-white p-4">
              <PhysicsImage
                src={activeTopic.imageUrl}
                alt={activeTopic.imageAlt || activeTopic.title}
                aspectClass="aspect-[16/9]"
                className="w-full"
              />
              {activeTopic.imageAlt && (
                <figcaption className="mt-2.5 text-center text-xs text-slate-500">
                  {activeTopic.imageAlt}
                </figcaption>
              )}
            </figure>
          )}

          {/* Poin-Poin Penting */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h3 className="text-base font-bold text-slate-900">Poin Penting Konsep</h3>
            <ul className="mt-3 space-y-2.5">
              {activeTopic.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-700">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            {/* Tabel Perbandingan (untuk Topik E Gelombang) */}
            {activeTopic.comparisonRows && activeTopic.comparisonHeaders && (
              <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs font-bold text-slate-700">
                    <tr>
                      {activeTopic.comparisonHeaders.map((h) => (
                        <th key={h} className="px-4 py-3">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeTopic.comparisonRows.map((row) => (
                      <tr key={row.aspect}>
                        <td className="px-4 py-3 font-semibold text-slate-900">{row.aspect}</td>
                        <td className="px-4 py-3 text-slate-700">{row.left}</td>
                        <td className="px-4 py-3 text-slate-700">{row.right}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Rumus Penting */}
          {activeTopic.formulas && activeTopic.formulas.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900">
                <Calculator className="h-5 w-5 text-blue-600" aria-hidden="true" />
                Rumus Penting
              </div>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {activeTopic.formulas.map((f, idx) => (
                  <div key={idx} className="rounded-xl border border-blue-200 bg-blue-50/60 p-4">
                    <div className="font-mono-num text-xl font-extrabold text-blue-700">
                      {f.expression}
                    </div>
                    <p className="mt-1 text-xs font-medium text-slate-600">{f.description}</p>
                    <ul className="mt-2.5 space-y-1 text-xs text-slate-700">
                      {f.variables.map((v) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contoh Soal & Penyelesaian */}
          {activeTopic.workedExample && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h3 className="text-base font-bold text-slate-900">
                {activeTopic.workedExample.title}
              </h3>
              <p className="mt-2 rounded-xl bg-slate-50 p-3.5 text-sm font-medium text-slate-800">
                {activeTopic.workedExample.problem}
              </p>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
                <div className="rounded-xl border border-slate-200 p-3">
                  <div className="font-bold text-slate-900">Diketahui:</div>
                  <ul className="mt-1 space-y-1 text-slate-700">
                    {activeTopic.workedExample.known.map((k) => (
                      <li key={k}>{k}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-slate-200 p-3">
                  <div className="font-bold text-slate-900">Ditanyakan & Rumus:</div>
                  <p className="mt-1 text-slate-700">{activeTopic.workedExample.asked}</p>
                  <p className="mt-1 font-mono-num font-bold text-blue-600">
                    {activeTopic.workedExample.formula}
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50/50 p-3.5">
                <div className="text-xs font-bold text-emerald-900">Langkah Penyelesaian:</div>
                <ol className="mt-1.5 list-decimal space-y-1 pl-4 text-sm text-slate-800">
                  {activeTopic.workedExample.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <div className="mt-2 font-mono-num text-sm font-extrabold text-emerald-800">
                  Jawaban Akhir: {activeTopic.workedExample.answer}
                </div>
              </div>
            </div>
          )}

          {/* Next Topic Footer Action */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <span className="text-xs text-slate-500">
              Topik {selectedIndex + 1} dari {topics.length} ({chapter === 'getaran' ? 'Getaran' : 'Gelombang'})
            </span>
            <button
              type="button"
              onClick={handleNextTopic}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
            >
              {selectedIndex < topics.length - 1
                ? 'Selesai & Lanjut Topik Berikutnya'
                : chapter === 'getaran'
                ? 'Lanjut ke Materi Gelombang'
                : 'Tandai Materi Tuntas'}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
