import { X, Calculator } from 'lucide-react';

interface RumusModalProps {
  open: boolean;
  onClose: () => void;
}

export function RumusModal({ open, onClose }: RumusModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rumus-modal-title"
    >
      <div className="max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Calculator className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="rumus-modal-title" className="text-lg font-extrabold text-slate-900">
                Kumpulan Rumus Getaran & Gelombang
              </h2>
              <p className="text-xs text-slate-500">
                Referensi cepat besaran, satuan SI, dan persamaan Kelas VIII SMP
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Kumpulan Rumus"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-blue-700">1. Rumus Materi Getaran</h3>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormulaCard
                formula="T = t / n"
                title="Periode Getaran"
                detail="T = periode (s), t = waktu total (s), n = jumlah getaran"
              />
              <FormulaCard
                formula="f = n / t"
                title="Frekuensi Getaran"
                detail="f = frekuensi (Hz), n = jumlah getaran, t = waktu total (s)"
              />
              <FormulaCard
                formula="T = 1 / f   |   f = 1 / T"
                title="Hubungan T dan f"
                detail="Periode dan frekuensi selalu berbanding terbalik"
              />
              <FormulaCard
                formula="n = f × t   |   t = n × T"
                title="Jumlah & Waktu Getaran"
                detail="Turunan langsung dari definisi f dan T"
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-cyan-700">2. Rumus Materi Gelombang</h3>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormulaCard
                formula="v = λ × f"
                title="Cepat Rambat (via Frekuensi)"
                detail="v = cepat rambat (m/s), λ = panjang gelombang (m), f = frekuensi (Hz)"
              />
              <FormulaCard
                formula="v = λ / T"
                title="Cepat Rambat (via Periode)"
                detail="v = cepat rambat (m/s), λ = panjang gelombang (m), T = periode (s)"
              />
              <FormulaCard
                formula="λ = s / n"
                title="Panjang Gelombang"
                detail="s = jarak total gelombang (m), n = jumlah gelombang penuh"
              />
              <FormulaCard
                formula="1 λ Penuh"
                title="Definisi Satu Gelombang"
                detail="Transversal: 1 puncak + 1 lembah · Longitudinal: 1 rapatan + 1 renggangan"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-end border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-xl bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-700"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

function FormulaCard({
  formula,
  title,
  detail,
}: {
  formula: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5">
      <div className="text-xs font-bold text-slate-900">{title}</div>
      <div className="mt-1 font-mono-num text-lg font-extrabold text-blue-700">{formula}</div>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">{detail}</p>
    </div>
  );
}
