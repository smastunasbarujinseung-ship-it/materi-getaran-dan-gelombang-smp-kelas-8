import { BookOpen, FlaskConical, ClipboardCheck, Gamepad2, Network, ArrowRight } from 'lucide-react';
import {
  computeLearningProgress,
  TOTAL_LAB_EXPERIMENTS,
  TOTAL_MATERI_TOPICS,
  type ProgressState,
} from '../physics/formulas';
import { PhysicsImage } from './PhysicsImage';
import { NarratorBar } from './NarratorBar';

export type AppSection = 'home' | 'materi' | 'lab' | 'latihan' | 'game' | 'rangkuman';

interface HomeViewProps {
  progress: ProgressState;
  onNavigate: (section: AppSection, subTab?: string) => void;
}

export function HomeView({ progress, onNavigate }: HomeViewProps) {
  const totalPct = computeLearningProgress(progress);

  const welcomeSegments = [
    'Halo! Selamat datang di Fisika Explorer: Petualangan Getaran dan Gelombang untuk kelas 8 SMP.',
    'Di sini kamu akan belajar fisika seperti dibimbing langsung oleh guru privat: mulai dari memahami konsep lewat animasi, bereksperimen di laboratorium virtual, bermain kuis detektif gelombang, sampai menguji kemampuanmu di latihan soal!',
    'Klik tombol Mulai Belajar untuk membuka materi Getaran dan Gelombang secara bertahap.',
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white">
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-12">
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:col-span-7 lg:p-10">
            <p className="text-xs font-semibold tracking-wide text-blue-600">
              Bimbingan Belajar Digital IPA-Fisika · Kelas VIII SMP
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl [text-wrap:balance]">
              FISIKA EXPLORER
            </h1>
            <p className="mt-2 text-lg font-semibold text-cyan-700 sm:text-xl">
              Petualangan Getaran dan Gelombang
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Pahami konsep Getaran dan Gelombang dari dasar hingga mahir melalui suara narator guru fisika, simulasi laboratorium interaktif, visualisasi nyata, mini-game edukatif, serta latihan soal lengkap dengan pembahasan.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => onNavigate('materi')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs sm:text-sm font-bold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 whitespace-nowrap"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                MULAI BELAJAR
              </button>

              <button
                type="button"
                onClick={() => onNavigate('lab')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3 text-xs sm:text-sm font-bold text-blue-700 transition-colors hover:bg-blue-100 whitespace-nowrap"
              >
                <FlaskConical className="h-4 w-4" aria-hidden="true" />
                LABORATORIUM VIRTUAL
              </button>

              <button
                type="button"
                onClick={() => onNavigate('latihan')}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap"
              >
                <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
                LATIHAN SOAL
              </button>
            </div>
          </div>

          <div className="relative bg-slate-50 p-4 sm:p-6 lg:col-span-5 lg:p-6">
            <PhysicsImage
              src="/src/assets/images/hero_fisika_waves_1795686255068.jpg"
              alt="Ilustrasi laboratorium fisika: bandul sederhana, pegas vertikal, garpu tala, dan gelombang harmonik"
              aspectClass="aspect-[16/10] lg:h-full lg:aspect-auto"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* Indikator Progres Pembelajaran */}
      <section
        aria-label="Indikator Progres Pembelajaran"
        className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Indikator Progres Pembelajaran</h2>
            <p className="text-xs text-slate-500">
              Progres belajarmu tersimpan otomatis di perangkat ini
            </p>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono-num text-2xl font-extrabold text-blue-600">{totalPct}%</span>
            <span className="text-xs font-medium text-slate-500">tuntas</span>
          </div>
        </div>

        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-[width] duration-300"
            style={{ width: `${totalPct}%` }}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Materi Dipelajari</div>
            <div className="mt-0.5 font-mono-num text-lg font-bold text-slate-900">
              {progress.completedTopics.length} / {TOTAL_MATERI_TOPICS}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Eksperimen Lab</div>
            <div className="mt-0.5 font-mono-num text-lg font-bold text-slate-900">
              {progress.completedLabs.length} / {TOTAL_LAB_EXPERIMENTS}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Nilai Latihan Getaran</div>
            <div className="mt-0.5 font-mono-num text-lg font-bold text-blue-600">
              {progress.getaranQuizScore !== null ? `${progress.getaranQuizScore} / 100` : 'Belum'}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3">
            <div className="text-xs text-slate-500">Nilai Latihan Gelombang</div>
            <div className="mt-0.5 font-mono-num text-lg font-bold text-cyan-700">
              {progress.gelombangQuizScore !== null ? `${progress.gelombangQuizScore} / 100` : 'Belum'}
            </div>
          </div>
        </div>
      </section>

      {/* Narator Pembuka */}
      <NarratorBar title="Sapaan Guru Fisika" segments={welcomeSegments} compact />

      {/* Jalur Fitur Utama */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
              <Gamepad2 className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900">Tantangan & Permainan Fisika</h3>
            <p className="mt-1 text-sm text-slate-600">
              Asah pemahaman lewat 4 mini-game interaktif: Tebak Jenis Getaran, Detektif Gelombang, Tantangan Hitung Cepat, dan Benar atau Salah.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('game')}
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 self-start rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100"
          >
            Mainkan Mini-Game
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Network className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-3 text-base font-bold text-slate-900">Rangkuman, Peta Konsep & Progres</h3>
            <p className="mt-1 text-sm text-slate-600">
              Tinjau peta konsep visual Getaran dan Gelombang sebelum ulangan, lihat ringkasan rumus, atau kelola riwayat progres belajarmu.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('rangkuman')}
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 self-start rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-100"
          >
            Buka Peta Konsep
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
