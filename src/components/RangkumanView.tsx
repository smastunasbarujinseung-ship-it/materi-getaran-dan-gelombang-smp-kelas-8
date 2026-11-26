import { useState } from 'react';
import { RotateCcw, Calculator } from 'lucide-react';
import {
  computeLearningProgress,
  TOTAL_LAB_EXPERIMENTS,
  TOTAL_MATERI_TOPICS,
  type ProgressState,
} from '../physics/formulas';

interface RangkumanViewProps {
  progress: ProgressState;
  onResetProgress: () => void;
  onOpenRumus: () => void;
}

export function RangkumanView({
  progress,
  onResetProgress,
  onOpenRumus,
}: RangkumanViewProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const totalPct = computeLearningProgress(progress);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Rangkuman & Peta Konsep</h1>
          <p className="text-sm text-slate-600">
            Ringkasan visual Getaran & Gelombang beserta catatan progres belajarmu
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenRumus}
          className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
        >
          <Calculator className="h-4 w-4" aria-hidden="true" />
          Buka Kumpulan Rumus
        </button>
      </div>

      {/* Interactive SVG Peta Konsep */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-bold text-slate-900">Peta Konsep Getaran & Gelombang</h2>
        <p className="text-xs text-slate-500">
          Alur hubungan konsep utama dari Getaran hingga Cepat Rambat Gelombang
        </p>

        <div className="mt-4 overflow-x-auto">
          <svg
            viewBox="0 0 760 336"
            className="min-w-[640px] w-full rounded-2xl border border-slate-100 bg-slate-50"
            aria-label="Peta konsep getaran dan gelombang"
          >
            {/* Connectors */}
            <path d="M 380 56 L 200 105" stroke="#94A3B8" strokeWidth="2" fill="none" />
            <path d="M 380 56 L 560 105" stroke="#94A3B8" strokeWidth="2" fill="none" />
            <path d="M 200 145 L 110 205" stroke="#CBD5E1" strokeWidth="2" fill="none" />
            <path d="M 200 145 L 285 205" stroke="#CBD5E1" strokeWidth="2" fill="none" />
            <path d="M 560 145 L 470 205" stroke="#CBD5E1" strokeWidth="2" fill="none" />
            <path d="M 560 145 L 650 205" stroke="#CBD5E1" strokeWidth="2" fill="none" />

            {/* Root */}
            <rect x="275" y="16" width="210" height="40" rx="12" fill="#0F172A" />
            <text x="380" y="41" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
              GETARAN &amp; GELOMBANG
            </text>

            {/* Branch 1: Getaran */}
            <rect x="115" y="105" width="170" height="40" rx="10" fill="#0066FF" />
            <text x="200" y="130" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
              GETARAN
            </text>

            {/* Branch 2: Gelombang */}
            <rect x="475" y="105" width="170" height="40" rx="10" fill="#0891B2" />
            <text x="560" y="130" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
              GELOMBANG
            </text>

            {/* Leaves under Getaran */}
            <rect x="20" y="205" width="180" height="108" rx="10" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="1.5" />
            <text x="110" y="226" textAnchor="middle" fill="#1E40AF" fontSize="11.5" fontWeight="700">
              Ciri &amp; Besaran
            </text>
            <text x="110" y="247" textAnchor="middle" fill="#334155" fontSize="10.5">• Gerak bolak-balik teratur</text>
            <text x="110" y="266" textAnchor="middle" fill="#334155" fontSize="10.5">• Amplitudo (A): simpangan maks</text>
            <text x="110" y="285" textAnchor="middle" fill="#334155" fontSize="10.5">• 1 getaran: A-B-C-B-A</text>

            <rect x="215" y="205" width="150" height="108" rx="10" fill="#FFFFFF" stroke="#BFDBFE" strokeWidth="1.5" />
            <text x="290" y="226" textAnchor="middle" fill="#1E40AF" fontSize="11.5" fontWeight="700">
              Periode &amp; Frekuensi
            </text>
            <text x="290" y="248" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="700">T = t / n (s)</text>
            <text x="290" y="268" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="700">f = n / t (Hz)</text>
            <text x="290" y="288" textAnchor="middle" fill="#0066FF" fontSize="11" fontWeight="700">T = 1/f · f = 1/T</text>

            {/* Leaves under Gelombang */}
            <rect x="390" y="205" width="170" height="108" rx="10" fill="#FFFFFF" stroke="#A5F3FC" strokeWidth="1.5" />
            <text x="475" y="226" textAnchor="middle" fill="#0E7490" fontSize="11.5" fontWeight="700">
              Jenis Berdasarkan Arah
            </text>
            <text x="475" y="246" textAnchor="middle" fill="#334155" fontSize="10.5">• Transversal (tegak lurus)</text>
            <text x="475" y="262" textAnchor="middle" fill="#64748B" fontSize="10">Puncak &amp; Lembah</text>
            <text x="475" y="281" textAnchor="middle" fill="#334155" fontSize="10.5">• Longitudinal (sejajar)</text>
            <text x="475" y="297" textAnchor="middle" fill="#64748B" fontSize="10">Rapatan &amp; Renggangan</text>

            <rect x="575" y="205" width="165" height="108" rx="10" fill="#FFFFFF" stroke="#A5F3FC" strokeWidth="1.5" />
            <text x="657" y="226" textAnchor="middle" fill="#0E7490" fontSize="11.5" fontWeight="700">
              Cepat Rambat (v)
            </text>
            <text x="657" y="248" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="700">v = λ × f (m/s)</text>
            <text x="657" y="268" textAnchor="middle" fill="#0F172A" fontSize="11" fontWeight="700">v = λ / T</text>
            <text x="657" y="288" textAnchor="middle" fill="#334155" fontSize="10">λ = panjang 1 gelombang</text>
          </svg>
        </div>
      </section>

      {/* Two Column Written Summary */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-extrabold text-blue-700">Ringkasan Materi Getaran</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Pengertian:</strong> Gerak bolak-balik secara teratur melalui titik keseimbangan.
            </li>
            <li>
              <strong>Amplitudo (A):</strong> Simpangan terjauh dari titik keseimbangan (satuan m atau cm).
            </li>
            <li>
              <strong>Periode (T):</strong> Waktu untuk 1 getaran penuh, <span className="font-mono-num font-bold">T = t/n</span> (sekon).
            </li>
            <li>
              <strong>Frekuensi (f):</strong> Banyaknya getaran dalam 1 sekon, <span className="font-mono-num font-bold">f = n/t</span> (Hz).
            </li>
            <li>
              <strong>Hubungan T &amp; f:</strong> Berbanding terbalik (<span className="font-mono-num font-bold">T = 1/f</span>).
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h3 className="text-base font-extrabold text-cyan-700">Ringkasan Materi Gelombang</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>
              <strong>Pengertian:</strong> Getaran yang merambat membawa energi tanpa memindahkan medium secara permanen.
            </li>
            <li>
              <strong>Gelombang Transversal:</strong> Arah getar tegak lurus arah rambat; ciri puncak dan lembah.
            </li>
            <li>
              <strong>Gelombang Longitudinal:</strong> Arah getar sejajar arah rambat; ciri rapatan dan renggangan.
            </li>
            <li>
              <strong>Panjang Gelombang (λ):</strong> Jarak 1 gelombang penuh (meter).
            </li>
            <li>
              <strong>Cepat Rambat (v):</strong> <span className="font-mono-num font-bold">v = λ × f</span> atau <span className="font-mono-num font-bold">v = λ / T</span> (m/s).
            </li>
          </ul>
        </div>
      </div>

      {/* Progress Management + Reset */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Catatan Progres Belajar Lokal</h2>
            <p className="text-xs text-slate-500">
              Total pencapaian saat ini: <strong className="font-mono-num text-blue-600">{totalPct}%</strong> · Materi{' '}
              {progress.completedTopics.length}/{TOTAL_MATERI_TOPICS} · Lab {progress.completedLabs.length}/{TOTAL_LAB_EXPERIMENTS}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="inline-flex min-h-[44px] items-center gap-2 self-start rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            RESET PROGRES
          </button>
        </div>

        {confirmOpen && (
          <div
            className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4"
            role="alertdialog"
            aria-label="Konfirmasi Reset Progres"
          >
            <p className="text-sm font-bold text-rose-900">
              Apakah kamu yakin ingin menghapus seluruh progres materi, eksperimen, dan nilai latihan?
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setConfirmOpen(false);
                }}
                className="min-h-[40px] rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white hover:bg-rose-700"
              >
                Ya, Hapus Progres
              </button>
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="min-h-[40px] rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
