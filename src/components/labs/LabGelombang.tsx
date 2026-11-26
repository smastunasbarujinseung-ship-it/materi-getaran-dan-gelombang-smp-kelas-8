import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Plus, CheckCircle2 } from 'lucide-react';
import {
  calculateWaveSpeed,
  calculatePeriodFromFrequency,
  formatIndonesianDecimal,
} from '../../physics/formulas';
import { NarratorBar } from '../NarratorBar';

interface LabGelombangProps {
  completedLabs: string[];
  onCompleteLab: (labId: string) => void;
}

type WaveExp = 'transversal' | 'longitudinal' | 'pengukuran';

export function LabGelombang({ completedLabs, onCompleteLab }: LabGelombangProps) {
  const [activeExp, setActiveExp] = useState<WaveExp>('transversal');

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pilih Eksperimen Gelombang">
        {[
          { id: 'transversal' as const, label: 'Eksperimen 1: Gelombang Transversal' },
          { id: 'longitudinal' as const, label: 'Eksperimen 2: Gelombang Longitudinal' },
          { id: 'pengukuran' as const, label: 'Eksperimen 3: Pengukuran Gelombang' },
        ].map((tab) => {
          const isDone = completedLabs.includes(`lab-gelombang-${tab.id}`);
          const active = activeExp === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveExp(tab.id)}
              className={`inline-flex min-h-[44px] items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {isDone && (
                <CheckCircle2
                  className={`h-4 w-4 ${active ? 'text-cyan-200' : 'text-emerald-600'}`}
                  aria-hidden="true"
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeExp === 'transversal' && (
        <TransverseWaveLab onComplete={() => onCompleteLab('lab-gelombang-transversal')} />
      )}
      {activeExp === 'longitudinal' && (
        <LongitudinalWaveLab onComplete={() => onCompleteLab('lab-gelombang-longitudinal')} />
      )}
      {activeExp === 'pengukuran' && (
        <WaveMeasurementLab onComplete={() => onCompleteLab('lab-gelombang-pengukuran')} />
      )}
    </div>
  );
}

function TransverseWaveLab({ onComplete }: { onComplete: () => void }) {
  const [ampCm, setAmpCm] = useState<number>(3.0);
  const [freqHz, setFreqHz] = useState<number>(1.5);
  const [wavelengthM, setWavelengthM] = useState<number>(2.0);
  const [showMarkers, setShowMarkers] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(true);

  const waveSpeed = calculateWaveSpeed(wavelengthM, freqHz);
  const periodS = calculatePeriodFromFrequency(freqHz);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paramsRef = useRef({ ampCm, freqHz, wavelengthM, showMarkers, running });
  paramsRef.current = { ampCm, freqHz, wavelengthM, showMarkers, running };

  useEffect(() => {
    let raf = 0;
    let time = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const p = paramsRef.current;
      if (p.running) {
        time += dt;
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawTransverseWaveFrame(ctx, canvas.width, canvas.height, time, p);
        }
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleSpeedSliderChange = (newSpeed: number) => {
    // Keep f fixed and update lambda = v / f so v = lambda * f stays mathematically exact
    const nextLambda = Math.min(5.0, Math.max(0.5, Number((newSpeed / freqHz).toFixed(2))));
    setWavelengthM(nextLambda);
    onComplete();
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-7">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Gelombang Transversal pada Tali</h3>
              <p className="text-xs text-slate-500">
                Ubah amplitudo, frekuensi, atau panjang gelombang dan amati hubungan v = λ × f secara langsung
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setRunning((r) => !r);
                  onComplete();
                }}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {running ? 'JEDA' : 'MULAI'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAmpCm(3.0);
                  setFreqHz(1.5);
                  setWavelengthM(2.0);
                  setRunning(true);
                }}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                RESET
              </button>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={580}
            height={300}
            data-testid="lab-transverse-canvas"
            className="w-full rounded-xl border border-slate-100 bg-slate-50"
          />

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-2.5">
              <div className="text-[11px] font-medium text-slate-500">Cepat Rambat (v = λ·f)</div>
              <div className="font-mono-num text-base font-bold text-blue-700">
                {formatIndonesianDecimal(waveSpeed, 2)} m/s
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <div className="text-[11px] font-medium text-slate-500">Panjang Gelombang (λ)</div>
              <div className="font-mono-num text-base font-bold text-slate-900">
                {formatIndonesianDecimal(wavelengthM, 2)} m
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <div className="text-[11px] font-medium text-slate-500">Frekuensi (f)</div>
              <div className="font-mono-num text-base font-bold text-slate-900">
                {formatIndonesianDecimal(freqHz, 2)} Hz
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <div className="text-[11px] font-medium text-slate-500">Periode (T = 1/f)</div>
              <div className="font-mono-num text-base font-bold text-cyan-700">
                {formatIndonesianDecimal(periodS, 2)} s
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:col-span-5">
          <h4 className="text-sm font-bold text-slate-900">Panel Kontrol Gelombang Tali</h4>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="trans-amp">Amplitudo (A)</label>
              <span className="font-mono-num text-blue-600">{formatIndonesianDecimal(ampCm, 1)} cm</span>
            </div>
            <input
              id="trans-amp"
              type="range"
              min={1}
              max={5}
              step={0.5}
              value={ampCm}
              onChange={(e) => {
                setAmpCm(Number(e.target.value));
                onComplete();
              }}
              className="physics-slider w-full"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="trans-freq">Frekuensi (f)</label>
              <span className="font-mono-num text-blue-600">{formatIndonesianDecimal(freqHz, 1)} Hz</span>
            </div>
            <input
              id="trans-freq"
              type="range"
              min={0.5}
              max={3.0}
              step={0.25}
              value={freqHz}
              onChange={(e) => {
                setFreqHz(Number(e.target.value));
                onComplete();
              }}
              className="physics-slider w-full"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="trans-lambda">Panjang Gelombang (λ)</label>
              <span className="font-mono-num text-blue-600">{formatIndonesianDecimal(wavelengthM, 2)} m</span>
            </div>
            <input
              id="trans-lambda"
              type="range"
              min={1.0}
              max={5.0}
              step={0.25}
              value={wavelengthM}
              onChange={(e) => {
                setWavelengthM(Number(e.target.value));
                onComplete();
              }}
              className="physics-slider w-full"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="trans-speed">Cepat Rambat (v) — menyesuaikan λ</label>
              <span className="font-mono-num text-cyan-700">{formatIndonesianDecimal(waveSpeed, 2)} m/s</span>
            </div>
            <input
              id="trans-speed"
              type="range"
              min={Math.max(0.5, Number((0.5 * freqHz).toFixed(2)))}
              max={Number((5.0 * freqHz).toFixed(2))}
              step={0.25}
              value={waveSpeed}
              onChange={(e) => handleSpeedSliderChange(Number(e.target.value))}
              className="physics-slider w-full"
            />
          </div>

          <label className="flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700">
            <input
              type="checkbox"
              checked={showMarkers}
              onChange={(e) => setShowMarkers(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-blue-600"
            />
            Tampilkan Penanda Puncak, Lembah, Amplitudo, λ & Arah Rambat
          </label>
        </div>
      </div>

      <NarratorBar
        title="Panduan Eksperimen Gelombang Transversal"
        segments={[
          'Di simulasi tali ini, gerakkan pengatur Amplitudo untuk melihat tinggi puncak dan dalam lembah berubah tanpa mengubah kecepatan rambat.',
          'Sekarang coba geser Panjang Gelombang lambda atau Frekuensi f. Perhatikan bahwa angka Cepat Rambat v langsung berubah sesuai persamaan v sama dengan lambda dikali f!',
          'Titik hijau pada tali membuktikan bahwa partikel tali hanya bergerak naik dan turun di tempatnya, tegak lurus terhadap arah rambat gelombang ke kanan.',
        ]}
        compact
      />
    </div>
  );
}

function drawTransverseWaveFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  p: { ampCm: number; freqHz: number; wavelengthM: number; showMarkers: boolean }
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, w, h);

  // Subtle metric grid (60px = 1 meter)
  const pxPerMeter = 76;
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  for (let gx = 44; gx < w - 16; gx += pxPerMeter) {
    ctx.beginPath();
    ctx.moveTo(gx, 28);
    ctx.lineTo(gx, h - 34);
    ctx.stroke();
  }

  const startX = 44;
  const endX = w - 24;
  const midY = h / 2;
  const ampPx = p.ampCm * 15; // up to 75px
  const lambdaPx = p.wavelengthM * pxPerMeter;
  const k = (2 * Math.PI) / lambdaPx;
  const omega = 2 * Math.PI * p.freqHz;

  // Equilibrium line
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(startX, midY);
  ctx.lineTo(endX, midY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Rope curve
  ctx.strokeStyle = '#0066FF';
  ctx.lineWidth = 3.5;
  ctx.beginPath();
  for (let x = startX; x <= endX; x += 2) {
    const y = midY - ampPx * Math.sin(k * (x - startX) - omega * time);
    if (x === startX) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();

  // Oscillating driver node at startX
  const driverY = midY - ampPx * Math.sin(-omega * time);
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.arc(startX, driverY, 7, 0, Math.PI * 2);
  ctx.fill();

  // Reference particle moving only vertically
  const refX = startX + 140;
  const refY = midY - ampPx * Math.sin(k * (refX - startX) - omega * time);
  ctx.fillStyle = '#059669';
  ctx.beginPath();
  ctx.arc(refX, refY, 6, 0, Math.PI * 2);
  ctx.fill();

  if (p.showMarkers) {
    // Direction arrow
    ctx.strokeStyle = '#0284C7';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(w - 145, 22);
    ctx.lineTo(w - 42, 22);
    ctx.stroke();
    ctx.fillStyle = '#0284C7';
    ctx.beginPath();
    ctx.moveTo(w - 42, 17);
    ctx.lineTo(w - 32, 22);
    ctx.lineTo(w - 42, 27);
    ctx.fill();
    ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Arah Rambat →', w - 92, 14);

    // Wavelength bracket
    const lamEnd = Math.min(endX - 10, startX + lambdaPx);
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(startX, h - 22);
    ctx.lineTo(lamEnd, h - 22);
    ctx.moveTo(startX, h - 28);
    ctx.lineTo(startX, h - 16);
    ctx.moveTo(lamEnd, h - 28);
    ctx.lineTo(lamEnd, h - 16);
    ctx.stroke();

    ctx.fillStyle = '#0F172A';
    ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`λ = ${formatIndonesianDecimal(p.wavelengthM, 2)} m`, (startX + lamEnd) / 2, h - 28);

    // Find first visible crest and trough
    const crestPhase = Math.PI / 2 + omega * time;
    const nCrest = Math.ceil((0 - crestPhase) / (2 * Math.PI));
    const crestX = startX + ((crestPhase + nCrest * 2 * Math.PI) / k) % lambdaPx;
    if (crestX > startX + 20 && crestX < endX - 20) {
      ctx.fillStyle = '#DC2626';
      ctx.beginPath();
      ctx.arc(crestX, midY - ampPx, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('Puncak', crestX, midY - ampPx - 10);

      // Amplitude line
      ctx.strokeStyle = '#059669';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(crestX, midY);
      ctx.lineTo(crestX, midY - ampPx);
      ctx.stroke();
      ctx.fillStyle = '#059669';
      ctx.textAlign = 'left';
      ctx.fillText('A', crestX + 5, midY - ampPx / 2 + 4);
      ctx.textAlign = 'center';
    }

    const troughX = crestX + lambdaPx * 0.5 < endX - 20 ? crestX + lambdaPx * 0.5 : crestX - lambdaPx * 0.5;
    if (troughX > startX + 20 && troughX < endX - 20) {
      ctx.fillStyle = '#D97706';
      ctx.beginPath();
      ctx.arc(troughX, midY + ampPx, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillText('Lembah', troughX, midY + ampPx + 16);
    }

    ctx.fillStyle = '#64748B';
    ctx.textAlign = 'right';
    ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Garis Keseimbangan', endX, midY - 6);
  }
}

function LongitudinalWaveLab({ onComplete }: { onComplete: () => void }) {
  const [freqHz, setFreqHz] = useState<number>(1.5);
  const [ampMm, setAmpMm] = useState<number>(14);
  const [speedMs, setSpeedMs] = useState<number>(3.0);
  const [running, setRunning] = useState<boolean>(true);

  const wavelengthM = speedMs / freqHz;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ref = useRef({ freqHz, ampMm, speedMs, running });
  ref.current = { freqHz, ampMm, speedMs, running };

  useEffect(() => {
    let raf = 0;
    let time = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const p = ref.current;
      if (p.running) time += dt;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawSlinkyFrame(ctx, canvas.width, canvas.height, time, p);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-7">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Simulasi Gelombang Longitudinal (Slinky)</h3>
              <p className="text-xs text-slate-500">
                Amati rapatan dan renggangan berjalan sepanjang pegas slinky searah getaran
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setRunning((r) => !r);
                  onComplete();
                }}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
              >
                {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {running ? 'JEDA' : 'MULAI'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFreqHz(1.5);
                  setAmpMm(14);
                  setSpeedMs(3.0);
                  setRunning(true);
                }}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" />
                RESET
              </button>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={580}
            height={250}
            data-testid="lab-longitudinal-canvas"
            className="w-full rounded-xl border border-slate-100 bg-slate-50"
          />

          <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-2.5">
              <div className="text-[11px] font-medium text-slate-500">Cepat Rambat (v)</div>
              <div className="font-mono-num text-base font-bold text-blue-700">
                {formatIndonesianDecimal(speedMs, 2)} m/s
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <div className="text-[11px] font-medium text-slate-500">Frekuensi (f)</div>
              <div className="font-mono-num text-base font-bold text-slate-900">
                {formatIndonesianDecimal(freqHz, 2)} Hz
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <div className="text-[11px] font-medium text-slate-500">Panjang Gelombang (λ)</div>
              <div className="font-mono-num text-base font-bold text-cyan-700">
                {formatIndonesianDecimal(wavelengthM, 2)} m
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:col-span-5">
          <h4 className="text-sm font-bold text-slate-900">Pengaturan Slinky</h4>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="long-freq">Frekuensi Dorongan (f)</label>
              <span className="font-mono-num text-blue-600">{formatIndonesianDecimal(freqHz, 1)} Hz</span>
            </div>
            <input
              id="long-freq"
              type="range"
              min={0.5}
              max={3.0}
              step={0.25}
              value={freqHz}
              onChange={(e) => {
                setFreqHz(Number(e.target.value));
                onComplete();
              }}
              className="physics-slider w-full"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="long-amp">Simpangan Partikel (Amplitudo)</label>
              <span className="font-mono-num text-blue-600">{ampMm} mm</span>
            </div>
            <input
              id="long-amp"
              type="range"
              min={6}
              max={20}
              step={1}
              value={ampMm}
              onChange={(e) => {
                setAmpMm(Number(e.target.value));
                onComplete();
              }}
              className="physics-slider w-full"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="long-speed">Kecepatan Rambat (v)</label>
              <span className="font-mono-num text-blue-600">{formatIndonesianDecimal(speedMs, 1)} m/s</span>
            </div>
            <input
              id="long-speed"
              type="range"
              min={1.5}
              max={6.0}
              step={0.5}
              value={speedMs}
              onChange={(e) => {
                setSpeedMs(Number(e.target.value));
                onComplete();
              }}
              className="physics-slider w-full"
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-700">
            <strong className="text-slate-900">Petunjuk Pengamatan:</strong> Perhatikan salah satu titik lilitan berwarna merah. Lilitan itu hanya bergeser maju-mundur di sekitar posisi awalnya (sejajar arah rambat), sementara daerah rapatan berwarna biru meluncur dari kiri ke kanan!
          </div>
        </div>
      </div>

      <NarratorBar
        title="Penjelasan Simulasi Gelombang Longitudinal"
        segments={[
          'Pada gelombang longitudinal, kita mendorong dan menarik ujung pegas slinky maju-mundur secara horizontal.',
          'Daerah di mana lilitan slinky berimpit disebut Rapatan, sedangkan daerah yang renggang disebut Renggangan.',
          'Jika kamu menaikkan frekuensi dorongan sambil menjaga kecepatan rambat tetap, maka jarak antara satu rapatan ke rapatan berikutnya akan makin dekat karena panjang gelombangnya mengecil!',
        ]}
        compact
      />
    </div>
  );
}

function drawSlinkyFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number,
  p: { freqHz: number; ampMm: number; speedMs: number }
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, w, h);

  const coils = 48;
  const startX = 36;
  const span = w - 72;
  const centerY = h / 2 + 10;
  const lambdaM = p.speedMs / p.freqHz;
  const pxPerMeter = 110;
  const lambdaPx = lambdaM * pxPerMeter;
  const k = (2 * Math.PI) / lambdaPx;
  const omega = 2 * Math.PI * p.freqHz;

  const xs: number[] = [];
  for (let i = 0; i <= coils; i++) {
    const x0 = startX + (i / coils) * span;
    const disp = p.ampMm * Math.sin(k * (x0 - startX) - omega * time);
    xs.push(x0 + disp);
  }

  let minSpacing = Infinity;
  let maxSpacing = -Infinity;
  let minIdx = 0;
  let maxIdx = 0;
  const baseSpacing = span / coils;

  for (let i = 0; i < coils; i++) {
    const sp = xs[i + 1] - xs[i];
    if (sp < minSpacing) {
      minSpacing = sp;
      minIdx = i;
    }
    if (sp > maxSpacing) {
      maxSpacing = sp;
      maxIdx = i;
    }

    const isRedMarker = i === 16;
    const isCompressed = sp < baseSpacing * 0.86;
    ctx.strokeStyle = isRedMarker ? '#DC2626' : isCompressed ? '#0066FF' : '#64748B';
    ctx.lineWidth = isRedMarker ? 3.2 : isCompressed ? 2.6 : 1.7;

    ctx.beginPath();
    ctx.ellipse((xs[i] + xs[i + 1]) / 2, centerY, Math.max(3.5, sp * 0.65), 42, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Labels for current Rapatan & Renggangan
  const rapatanX = (xs[minIdx] + xs[minIdx + 1]) / 2;
  const rengganganX = (xs[maxIdx] + xs[maxIdx + 1]) / 2;

  ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#0066FF';
  ctx.fillText('Rapatan', rapatanX, centerY - 54);

  ctx.fillStyle = '#475569';
  ctx.fillText('Renggangan', rengganganX, centerY + 62);

  ctx.fillStyle = '#DC2626';
  ctx.textAlign = 'left';
  ctx.fillText('● Titik acuan partikel bergetar ↔', 24, 24);
}

function WaveMeasurementLab({ onComplete }: { onComplete: () => void }) {
  const [wavelengthM, setWavelengthM] = useState<number>(2.0);
  const [freqHz, setFreqHz] = useState<number>(1.0);
  const [answerChoice, setAnswerChoice] = useState<number | null>(null);
  const [logs, setLogs] = useState<{ lambda: number; f: number; T: number; v: number }[]>([]);

  const period = calculatePeriodFromFrequency(freqHz);
  const speed = calculateWaveSpeed(wavelengthM, freqHz);

  // Static calibrated SVG measuring grid for 8 meters width
  const width = 560;
  const height = 190;
  const startX = 36;
  const span = width - 64; // represents 8.0 meters
  const pxPerMeter = span / 8;
  const midY = 98;
  const ampPx = 44;

  const pathPts: string[] = [];
  for (let x = 0; x <= span; x += 2) {
    const meters = x / pxPerMeter;
    const y = midY - ampPx * Math.sin((2 * Math.PI * meters) / wavelengthM);
    pathPts.push(`${x === 0 ? 'M' : 'L'}${(startX + x).toFixed(1)},${y.toFixed(1)}`);
  }

  const handleLog = () => {
    onComplete();
    setLogs((prev) => [...prev.slice(-4), { lambda: wavelengthM, f: freqHz, T: period, v: speed }]);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-7">
          <h3 className="text-base font-bold text-slate-900">Laboratorium Pengukuran Gelombang</h3>
          <p className="mb-3 text-xs text-slate-500">
            Gunakan penggaris skala meter di bawah gelombang untuk mengukur panjang gelombang, lalu uji pengaruh frekuensi
          </p>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full rounded-xl border border-slate-100 bg-slate-50">
            {/* Meter ruler grid */}
            {Array.from({ length: 9 }).map((_, m) => {
              const x = startX + m * pxPerMeter;
              return (
                <g key={m}>
                  <line x1={x} y1={24} x2={x} y2={height - 28} stroke="#E2E8F0" strokeWidth="1" />
                  <text x={x} y={height - 10} textAnchor="middle" fontSize="10" fill="#475569" fontWeight="600">
                    {m} m
                  </text>
                </g>
              );
            })}
            <line x1={startX} y1={midY} x2={startX + span} y2={midY} stroke="#94A3B8" strokeDasharray="4 4" />
            <path d={pathPts.join(' ')} fill="none" stroke="#0066FF" strokeWidth="3.5" strokeLinecap="round" />

            {/* Highlight 1 wavelength */}
            <line
              x1={startX}
              y1={24}
              x2={startX + wavelengthM * pxPerMeter}
              y2={24}
              stroke="#059669"
              strokeWidth="2.5"
            />
            <text
              x={startX + (wavelengthM * pxPerMeter) / 2}
              y={16}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#059669"
            >
              1 λ = {formatIndonesianDecimal(wavelengthM, 1)} m
            </text>
          </svg>

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <div className="text-[11px] text-slate-500">Panjang Gelombang (λ)</div>
              <div className="font-mono-num text-base font-bold text-slate-900">
                {formatIndonesianDecimal(wavelengthM, 1)} m
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <div className="text-[11px] text-slate-500">Frekuensi (f)</div>
              <div className="font-mono-num text-base font-bold text-slate-900">
                {formatIndonesianDecimal(freqHz, 1)} Hz
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
              <div className="text-[11px] text-slate-500">Periode (T = 1/f)</div>
              <div className="font-mono-num text-base font-bold text-cyan-700">
                {formatIndonesianDecimal(period, 2)} s
              </div>
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-2.5">
              <div className="text-[11px] text-slate-500">Cepat Rambat (v = λ·f)</div>
              <div className="font-mono-num text-base font-bold text-blue-700">
                {formatIndonesianDecimal(speed, 2)} m/s
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
                <label htmlFor="meas-lambda">Atur Panjang Gelombang (λ)</label>
                <span className="font-mono-num text-blue-600">{formatIndonesianDecimal(wavelengthM, 1)} m</span>
              </div>
              <input
                id="meas-lambda"
                type="range"
                min={1.0}
                max={4.0}
                step={0.5}
                value={wavelengthM}
                onChange={(e) => setWavelengthM(Number(e.target.value))}
                className="physics-slider w-full"
              />
            </div>

            <div>
              <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
                <label htmlFor="meas-freq">Atur Frekuensi (f)</label>
                <span className="font-mono-num text-blue-600">{formatIndonesianDecimal(freqHz, 1)} Hz</span>
              </div>
              <input
                id="meas-freq"
                type="range"
                min={0.5}
                max={4.0}
                step={0.5}
                value={freqHz}
                onChange={(e) => setFreqHz(Number(e.target.value))}
                className="physics-slider w-full"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleLog}
            className="mt-3 inline-flex min-h-[42px] items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            <Plus className="h-4 w-4" />
            Catat Hasil Pengukuran Gelombang
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:col-span-5">
          <div className="rounded-xl border border-cyan-200 bg-cyan-50/70 p-4">
            <h4 className="text-xs font-bold text-slate-900">
              Tantangan Eksperimen: Jika frekuensi gelombang diperbesar sementara panjang gelombang tetap, bagaimana perubahan cepat rambatnya?
            </h4>
            <div className="mt-2.5 space-y-2">
              {[
                'Cepat rambat (v) ikut membesar sebanding dengan kenaikan frekuensi.',
                'Cepat rambat (v) menjadi lebih kecil karena periode membesar.',
                'Cepat rambat (v) selalu tetap meskipun frekuensi diubah dan λ tetap.',
              ].map((opt, idx) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setAnswerChoice(idx);
                    onComplete();
                  }}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left text-xs transition-colors ${
                    answerChoice === idx
                      ? idx === 0
                        ? 'border-emerald-500 bg-emerald-50 font-semibold text-emerald-900'
                        : 'border-rose-400 bg-rose-50 font-semibold text-rose-900'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {answerChoice !== null && (
              <p className="mt-2.5 text-xs leading-relaxed text-slate-700">
                {answerChoice === 0
                  ? 'Tepat sekali! Berdasarkan rumus v = λ × f, jika λ tetap (misalnya 2 m) lalu f naik dari 1 Hz ke 2 Hz, maka v naik dari 2 m/s menjadi 4 m/s.'
                  : 'Coba uji langsung pada penggeser di samping: biarkan λ = 2,0 m lalu naikkan f dari 1,0 Hz menjadi 2,0 Hz. Terlihat nilai v ikut naik dari 2,0 m/s ke 4,0 m/s!'}
              </p>
            )}
          </div>

          {logs.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-2.5 py-2 font-semibold">λ (m)</th>
                    <th className="px-2.5 py-2 font-semibold">f (Hz)</th>
                    <th className="px-2.5 py-2 font-semibold">T (s)</th>
                    <th className="px-2.5 py-2 font-semibold">v (m/s)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono-num">
                  {logs.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-2.5 py-2">{formatIndonesianDecimal(row.lambda, 1)}</td>
                      <td className="px-2.5 py-2">{formatIndonesianDecimal(row.f, 1)}</td>
                      <td className="px-2.5 py-2">{formatIndonesianDecimal(row.T, 2)}</td>
                      <td className="px-2.5 py-2 font-bold text-blue-600">{formatIndonesianDecimal(row.v, 2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <NarratorBar
        title="Interpretasi Hasil Pengukuran Gelombang"
        segments={[
          'Pada pengukuran gelombang, langkah pertama adalah membaca jarak satu gelombang penuh, yaitu satu puncak dan satu lembah, pada mistar di bawah kurva.',
          'Jika kamu menjaga panjang gelombang tetap 2 meter, lalu menaikkan frekuensi dari 1 Hertz menjadi 3 Hertz, cepat rambat gelombang otomatis meningkat tiga kali lipat dari 2 menjadi 6 meter per sekon!',
        ]}
        compact
      />
    </div>
  );
}
