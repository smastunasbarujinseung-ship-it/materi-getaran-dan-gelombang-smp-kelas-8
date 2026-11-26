import { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Plus, CheckCircle2 } from 'lucide-react';
import {
  calculatePendulumPeriod,
  calculateSpringPeriod,
  calculateFrequencyFromPeriod,
  calculatePeriodFromCount,
  calculateFrequencyFromCount,
  formatIndonesianDecimal,
} from '../../physics/formulas';
import { NarratorBar } from '../NarratorBar';

interface LabGetaranProps {
  completedLabs: string[];
  onCompleteLab: (labId: string) => void;
}

type VibrationExp = 'bandul' | 'pegas' | 'pengukuran';

interface TrialRow {
  id: number;
  paramLabel: string;
  n: number;
  t: number;
  T: number;
  f: number;
}

export function LabGetaran({ completedLabs, onCompleteLab }: LabGetaranProps) {
  const [activeExp, setActiveExp] = useState<VibrationExp>('bandul');

  return (
    <div className="space-y-6">
      {/* Sub-experiment selector */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pilih Eksperimen Getaran">
        {[
          { id: 'bandul' as const, label: 'Eksperimen 1: Bandul Sederhana' },
          { id: 'pegas' as const, label: 'Eksperimen 2: Pegas & Beban' },
          { id: 'pengukuran' as const, label: 'Eksperimen 3: Pengukuran Getaran' },
        ].map((tab) => {
          const isDone = completedLabs.includes(`lab-getaran-${tab.id}`);
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

      {activeExp === 'bandul' && (
        <PendulumLab onComplete={() => onCompleteLab('lab-getaran-bandul')} />
      )}
      {activeExp === 'pegas' && (
        <SpringLab onComplete={() => onCompleteLab('lab-getaran-pegas')} />
      )}
      {activeExp === 'pengukuran' && (
        <MeasurementLab onComplete={() => onCompleteLab('lab-getaran-pengukuran')} />
      )}
    </div>
  );
}

function PendulumLab({ onComplete }: { onComplete: () => void }) {
  const [lengthM, setLengthM] = useState<number>(1.0);
  const [angleDeg, setAngleDeg] = useState<number>(20);
  const [speed, setSpeed] = useState<number>(1.0);
  const [running, setRunning] = useState<boolean>(true);
  const [elapsed, setElapsed] = useState<number>(0);
  const [trials, setTrials] = useState<TrialRow[]>([]);

  const period = calculatePendulumPeriod(lengthM);
  const freq = calculateFrequencyFromPeriod(period);
  const oscillationCount = elapsed / period;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ lengthM, angleDeg, speed, running, elapsed, period });
  stateRef.current = { lengthM, angleDeg, speed, running, elapsed, period };

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const s = stateRef.current;
      let nextElapsed = s.elapsed;
      if (s.running) {
        nextElapsed += dt * s.speed;
        setElapsed(nextElapsed);
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawPendulumFrame(ctx, canvas.width, canvas.height, s.lengthM, s.angleDeg, nextElapsed, s.period);
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleReset = () => {
    setRunning(false);
    setElapsed(0);
  };

  const handleRecordTrial = () => {
    onComplete();
    setTrials((prev) => [
      ...prev.slice(-4),
      {
        id: Date.now(),
        paramLabel: `L = ${formatIndonesianDecimal(lengthM)} m · θ = ${angleDeg}°`,
        n: Number(oscillationCount.toFixed(1)),
        t: Number(elapsed.toFixed(2)),
        T: period,
        f: freq,
      },
    ]);
  };

  const narratorSegments = [
    'Selamat datang di Eksperimen 1: Bandul Sederhana! Di sini kamu bisa menyelidiki pertanyaan penting: bagaimana pengaruh panjang tali terhadap periode bandul?',
    'Coba atur Panjang Tali ke 0,5 meter lalu tekan Catat Perbandingan. Setelah itu geser Panjang Tali menjadi 2,0 meter dan catat lagi.',
    'Perhatikan baik-baik! Ketika tali diperpanjang, gerakan bandul menjadi lebih lambat sehingga Periodenya membesar, sementara sudut simpangan awal yang kecil hampir tidak mengubah periode!',
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Stage */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-7">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Simulasi Bandul Sederhana</h3>
              <p className="text-xs text-slate-500">
                Visualisasi tali, titik tumpu, garis keseimbangan, sudut simpangan, dan lintasan gerak
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setRunning((r) => !r);
                  onComplete();
                }}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 whitespace-nowrap"
              >
                {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {running ? 'JEDA' : 'MULAI'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
              >
                <RotateCcw className="h-4 w-4" />
                RESET
              </button>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={560}
            height={330}
            data-testid="lab-pendulum-canvas"
            className="w-full rounded-xl border border-slate-100 bg-slate-50"
          />

          {/* Live Physics Metrics */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <MetricBox label="Jumlah Getaran (n)" value={formatIndonesianDecimal(oscillationCount, 1)} unit="getaran" highlight />
            <MetricBox label="Waktu Pengamatan (t)" value={formatIndonesianDecimal(elapsed, 2)} unit="s" />
            <MetricBox label="Periode (T)" value={formatIndonesianDecimal(period, 2)} unit="s" />
            <MetricBox label="Frekuensi (f)" value={formatIndonesianDecimal(freq, 2)} unit="Hz" />
          </div>
        </div>

        {/* Control Deck */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:col-span-5">
          <h4 className="text-sm font-bold text-slate-900">Pengaturan Variabel Eksperimen</h4>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="pendulum-length">Panjang Tali (L)</label>
              <span className="font-mono-num text-blue-600">{formatIndonesianDecimal(lengthM, 2)} m</span>
            </div>
            <input
              id="pendulum-length"
              type="range"
              min={0.25}
              max={2.0}
              step={0.05}
              value={lengthM}
              onChange={(e) => {
                setLengthM(Number(e.target.value));
                setElapsed(0);
              }}
              className="physics-slider w-full"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-400">
              <span>0,25 m (pendek)</span>
              <span>2,00 m (panjang)</span>
            </div>
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="pendulum-angle">Sudut Simpangan Awal (θ)</label>
              <span className="font-mono-num text-blue-600">{angleDeg}°</span>
            </div>
            <input
              id="pendulum-angle"
              type="range"
              min={5}
              max={35}
              step={1}
              value={angleDeg}
              onChange={(e) => setAngleDeg(Number(e.target.value))}
              className="physics-slider w-full"
            />
          </div>

          <div>
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">Kecepatan Animasi</span>
            <div className="grid grid-cols-3 gap-2">
              {[0.5, 1.0, 2.0].map((sp) => (
                <button
                  key={sp}
                  type="button"
                  onClick={() => setSpeed(sp)}
                  className={`min-h-[40px] rounded-xl text-xs font-semibold font-mono-num transition-colors ${
                    speed === sp
                      ? 'bg-blue-600 text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {sp}x
                </button>
              ))}
            </div>
          </div>

          {/* Inquiry Box */}
          <div className="rounded-xl border border-cyan-200 bg-cyan-50/70 p-3.5">
            <h5 className="text-xs font-bold text-slate-900">
              Pertanyaan Eksperimen: Bagaimana pengaruh panjang tali terhadap periode bandul?
            </h5>
            <p className="mt-1 text-xs leading-relaxed text-slate-700">
              Ubah panjang tali beberapa kali lalu catat hasilnya ke tabel untuk membuktikan hubungan{' '}
              <span className="font-mono-num font-semibold">T = 2π √(L / g)</span>.
            </p>
            <button
              type="button"
              onClick={handleRecordTrial}
              className="mt-3 inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Catat Hasil ke Tabel Perbandingan
            </button>
          </div>

          {trials.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-2.5 py-2 font-semibold">Variabel</th>
                    <th className="px-2.5 py-2 font-semibold">T (s)</th>
                    <th className="px-2.5 py-2 font-semibold">f (Hz)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trials.map((row) => (
                    <tr key={row.id}>
                      <td className="px-2.5 py-2 font-medium text-slate-800">{row.paramLabel}</td>
                      <td className="px-2.5 py-2 font-mono-num font-bold text-blue-600">
                        {formatIndonesianDecimal(row.T, 2)}
                      </td>
                      <td className="px-2.5 py-2 font-mono-num text-slate-700">
                        {formatIndonesianDecimal(row.f, 2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <NarratorBar title="Panduan & Interpretasi Eksperimen Bandul" segments={narratorSegments} compact />
    </div>
  );
}

function drawPendulumFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  lengthM: number,
  angleDeg: number,
  elapsed: number,
  period: number
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, w, h);

  const pivotX = w / 2;
  const pivotY = 32;
  // Map lengthM (0.25..2.0) to pixel length (90..230)
  const pxLen = 75 + ((lengthM - 0.25) / 1.75) * 165;
  const maxRad = (angleDeg * Math.PI) / 180;
  const omega = (2 * Math.PI) / period;
  const theta = maxRad * Math.cos(omega * elapsed);

  // Support bar
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(pivotX - 110, pivotY);
  ctx.lineTo(pivotX + 110, pivotY);
  ctx.stroke();

  // Equilibrium vertical dashed line
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#94A3B8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(pivotX, pivotY);
  ctx.lineTo(pivotX, pivotY + pxLen + 26);
  ctx.stroke();
  ctx.setLineDash([]);

  // Trajectory arc
  ctx.strokeStyle = '#BAE6FD';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(pivotX, pivotY, pxLen, Math.PI / 2 - maxRad, Math.PI / 2 + maxRad);
  ctx.stroke();

  // Angle arc indicator near pivot
  ctx.strokeStyle = '#0284C7';
  ctx.lineWidth = 2;
  ctx.beginPath();
  const startA = Math.PI / 2;
  const endA = Math.PI / 2 - theta;
  ctx.arc(pivotX, pivotY, 42, Math.min(startA, endA), Math.max(startA, endA));
  ctx.stroke();

  ctx.fillStyle = '#0284C7';
  ctx.font = '600 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`θ=${((theta * 180) / Math.PI).toFixed(1)}°`, pivotX + 10, pivotY + 56);

  // Pivot pin
  ctx.fillStyle = '#0F172A';
  ctx.beginPath();
  ctx.arc(pivotX, pivotY, 5, 0, Math.PI * 2);
  ctx.fill();

  // String
  const bobX = pivotX + pxLen * Math.sin(theta);
  const bobY = pivotY + pxLen * Math.cos(theta);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(pivotX, pivotY);
  ctx.lineTo(bobX, bobY);
  ctx.stroke();

  // Bob
  const grad = ctx.createRadialGradient(bobX - 5, bobY - 5, 2, bobX, bobY, 18);
  grad.addColorStop(0, '#60A5FA');
  grad.addColorStop(1, '#0052CC');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(bobX, bobY, 17, 0, Math.PI * 2);
  ctx.fill();

  // Labels
  ctx.fillStyle = '#64748B';
  ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Titik Keseimbangan', pivotX, pivotY + pxLen + 40);
}

function SpringLab({ onComplete }: { onComplete: () => void }) {
  const [massKg, setMassKg] = useState<number>(0.5);
  const [kConst, setKConst] = useState<number>(25);
  const [ampCm, setAmpCm] = useState<number>(6);
  const [running, setRunning] = useState<boolean>(true);
  const [elapsed, setElapsed] = useState<number>(0);
  const [trials, setTrials] = useState<TrialRow[]>([]);

  const period = calculateSpringPeriod(massKg, kConst);
  const freq = calculateFrequencyFromPeriod(period);
  const omega = (2 * Math.PI) / period;
  const displacementCm = ampCm * Math.cos(omega * elapsed);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ massKg, kConst, ampCm, running, elapsed, period });
  stateRef.current = { massKg, kConst, ampCm, running, elapsed, period };

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const s = stateRef.current;
      let nextElapsed = s.elapsed;
      if (s.running) {
        nextElapsed += dt;
        setElapsed(nextElapsed);
      }

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawSpringFrame(ctx, canvas.width, canvas.height, s.massKg, s.ampCm, nextElapsed, s.period);
        }
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleRecord = () => {
    onComplete();
    setTrials((prev) => [
      ...prev.slice(-4),
      {
        id: Date.now(),
        paramLabel: `m = ${formatIndonesianDecimal(massKg, 1)} kg · k = ${kConst} N/m`,
        n: Number((elapsed / period).toFixed(1)),
        t: Number(elapsed.toFixed(2)),
        T: period,
        f: freq,
      },
    ]);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-7">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Simulasi Pegas dan Beban Vertikal</h3>
              <p className="text-xs text-slate-500">
                Osilasi harmonik sederhana dengan titik keseimbangan dan simpangan langsung
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
                  setRunning(false);
                  setElapsed(0);
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
            width={560}
            height={330}
            data-testid="lab-spring-canvas"
            className="w-full rounded-xl border border-slate-100 bg-slate-50"
          />

          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <MetricBox label="Simpangan (y)" value={formatIndonesianDecimal(displacementCm, 2)} unit="cm" highlight />
            <MetricBox label="Waktu (t)" value={formatIndonesianDecimal(elapsed, 2)} unit="s" />
            <MetricBox label="Periode (T)" value={formatIndonesianDecimal(period, 2)} unit="s" />
            <MetricBox label="Frekuensi (f)" value={formatIndonesianDecimal(freq, 2)} unit="Hz" />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:col-span-5">
          <h4 className="text-sm font-bold text-slate-900">Pengaturan Pegas & Beban</h4>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="spring-mass">Massa Beban (m)</label>
              <span className="font-mono-num text-blue-600">{formatIndonesianDecimal(massKg, 1)} kg</span>
            </div>
            <input
              id="spring-mass"
              type="range"
              min={0.2}
              max={2.0}
              step={0.1}
              value={massKg}
              onChange={(e) => setMassKg(Number(e.target.value))}
              className="physics-slider w-full"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="spring-k">Konstanta Pegas (k)</label>
              <span className="font-mono-num text-blue-600">{kConst} N/m</span>
            </div>
            <input
              id="spring-k"
              type="range"
              min={10}
              max={80}
              step={5}
              value={kConst}
              onChange={(e) => setKConst(Number(e.target.value))}
              className="physics-slider w-full"
            />
          </div>

          <div>
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="spring-amp">Amplitudo Awal (A)</label>
              <span className="font-mono-num text-blue-600">{ampCm} cm</span>
            </div>
            <input
              id="spring-amp"
              type="range"
              min={2}
              max={10}
              step={1}
              value={ampCm}
              onChange={(e) => setAmpCm(Number(e.target.value))}
              className="physics-slider w-full"
            />
          </div>

          <div className="rounded-xl border border-cyan-200 bg-cyan-50/70 p-3.5">
            <h5 className="text-xs font-bold text-slate-900">
              Eksperimen: Bagaimana pengaruh massa terhadap periode getaran pegas?
            </h5>
            <p className="mt-1 text-xs leading-relaxed text-slate-700">
              Bandingkan massa 0,4 kg dan 1,6 kg dengan konstanta k tetap. Makin berat beban, periode makin besar!
            </p>
            <button
              type="button"
              onClick={handleRecord}
              className="mt-3 inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
            >
              <Plus className="h-4 w-4" />
              Catat Hasil Percobaan Pegas
            </button>
          </div>

          {trials.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-2.5 py-2 font-semibold">Parameter</th>
                    <th className="px-2.5 py-2 font-semibold">T (s)</th>
                    <th className="px-2.5 py-2 font-semibold">f (Hz)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {trials.map((r) => (
                    <tr key={r.id}>
                      <td className="px-2.5 py-2 font-medium text-slate-800">{r.paramLabel}</td>
                      <td className="px-2.5 py-2 font-mono-num font-bold text-blue-600">
                        {formatIndonesianDecimal(r.T, 2)}
                      </td>
                      <td className="px-2.5 py-2 font-mono-num text-slate-700">
                        {formatIndonesianDecimal(r.f, 2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <NarratorBar
        title="Penjelasan Eksperimen Pegas & Beban"
        segments={[
          'Pada eksperimen kedua ini kita mengamati pegas vertikal yang digantungi beban.',
          'Berbeda dengan bandul, periode getaran pegas sangat dipengaruhi oleh massa beban dan kekakuan atau konstanta pegas.',
          'Coba perbesar massa bebannya! Semakin besar massa, beban semakin sulit dipercepat oleh pegas sehingga geraknya melambat dan periodenya bertambah besar.',
          'Sebaliknya, jika kamu memakai pegas yang lebih kaku dengan nilai konstanta k lebih besar, pegas menarik lebih kuat sehingga getarannya lebih cepat!',
        ]}
        compact
      />
    </div>
  );
}

function drawSpringFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  massKg: number,
  ampCm: number,
  elapsed: number,
  period: number
) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, w, h);

  const centerX = w / 2 - 20;
  const topY = 26;
  const eqY = 185;
  const omega = (2 * Math.PI) / period;
  // Scale ampCm (2..10) to pixels (18..75)
  const ampPx = (ampCm / 10) * 75;
  const offsetPx = ampPx * Math.cos(omega * elapsed);
  const massTopY = eqY + offsetPx;

  // Ruler scale on right
  const rulerX = centerX + 115;
  ctx.strokeStyle = '#CBD5E1';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(rulerX, 85);
  ctx.lineTo(rulerX, 285);
  ctx.stroke();

  // Equilibrium line
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#0EA5E9';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(centerX - 80, eqY + 22);
  ctx.lineTo(rulerX + 18, eqY + 22);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#0284C7';
  ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Titik Keseimbangan (y = 0)', rulerX + 22, eqY + 26);

  // Ceiling bar
  ctx.fillStyle = '#1E293B';
  ctx.fillRect(centerX - 75, topY - 8, 150, 10);

  // Draw zigzag coil spring from topY to massTopY
  const coils = 12;
  const springSpan = Math.max(40, massTopY - topY);
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.8;
  ctx.beginPath();
  ctx.moveTo(centerX, topY);
  for (let i = 1; i <= coils; i++) {
    const y = topY + (i / (coils + 1)) * springSpan;
    const x = centerX + (i % 2 === 0 ? -18 : 18);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(centerX, massTopY);
  ctx.stroke();

  // Mass block scaled subtly with massKg
  const boxSize = 36 + massKg * 10;
  const grad = ctx.createLinearGradient(centerX - boxSize / 2, massTopY, centerX + boxSize / 2, massTopY + boxSize);
  grad.addColorStop(0, '#2563EB');
  grad.addColorStop(1, '#0052CC');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(centerX - boxSize / 2, massTopY, boxSize, boxSize, 8);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 12px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`${massKg.toFixed(1)} kg`, centerX, massTopY + boxSize / 2 + 4);
}

function MeasurementLab({ onComplete }: { onComplete: () => void }) {
  const [lengthM, setLengthM] = useState<number>(1.0);
  const [running, setRunning] = useState<boolean>(false);
  const [elapsed, setElapsed] = useState<number>(0);
  const [records, setRecords] = useState<TrialRow[]>([]);
  const [reflectionChoice, setReflectionChoice] = useState<number | null>(null);

  const truePeriod = calculatePendulumPeriod(lengthM);
  const completedOsc = Math.floor(elapsed / truePeriod);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const refState = useRef({ running, elapsed, lengthM, truePeriod });
  refState.current = { running, elapsed, lengthM, truePeriod };

  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const s = refState.current;
      let t = s.elapsed;
      if (s.running) {
        t += dt;
        setElapsed(t);
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          drawPendulumFrame(ctx, canvas.width, canvas.height, s.lengthM, 18, t, s.truePeriod);
        }
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleRecordObservation = () => {
    if (completedOsc < 1 || elapsed <= 0) return;
    const T = calculatePeriodFromCount(elapsed, completedOsc);
    const f = calculateFrequencyFromCount(completedOsc, elapsed);
    onComplete();
    setRecords((prev) => [
      ...prev,
      {
        id: Date.now(),
        paramLabel: `L = ${formatIndonesianDecimal(lengthM, 2)} m`,
        n: completedOsc,
        t: Number(elapsed.toFixed(2)),
        T,
        f,
      },
    ]);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:col-span-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900">Stopwatch & Pengukuran Getaran</h3>
              <p className="text-xs text-slate-500">
                1. Jalankan bandul · 2. Hitung n getaran · 3. Catat waktu t untuk menghitung T & f
              </p>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            width={480}
            height={280}
            data-testid="lab-measurement-canvas"
            className="w-full rounded-xl border border-slate-100 bg-slate-50"
          />

          <div className="mt-3 grid grid-cols-2 gap-3">
            <MetricBox label="Getaran Penuh Teramati (n)" value={String(completedOsc)} unit="kali" highlight />
            <MetricBox label="Stopwatch (t)" value={formatIndonesianDecimal(elapsed, 2)} unit="sekon" />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setRunning((r) => !r)}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {running ? 'Hentikan Sementara' : 'Jalankan Bandul'}
            </button>
            <button
              type="button"
              onClick={handleRecordObservation}
              disabled={completedOsc < 1}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
              Catat ke Tabel (n ≥ 1)
            </button>
            <button
              type="button"
              onClick={() => {
                setRunning(false);
                setElapsed(0);
              }}
              className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>

          <div className="mt-3">
            <div className="mb-1 flex justify-between text-xs font-semibold text-slate-700">
              <label htmlFor="measure-length">Pilih Panjang Tali Percobaan</label>
              <span className="font-mono-num text-blue-600">{formatIndonesianDecimal(lengthM, 2)} m</span>
            </div>
            <input
              id="measure-length"
              type="range"
              min={0.3}
              max={1.8}
              step={0.1}
              value={lengthM}
              onChange={(e) => {
                setLengthM(Number(e.target.value));
                setRunning(false);
                setElapsed(0);
              }}
              className="physics-slider w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 lg:col-span-6">
          <h4 className="text-sm font-bold text-slate-900">Tabel Data Pengamatan & Perhitungan</h4>

          {records.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-xs text-slate-500">
              Belum ada data. Klik <strong>Jalankan Bandul</strong> hingga minimal 1 getaran penuh, lalu klik{' '}
              <strong>Catat ke Tabel</strong> untuk menghitung T = t/n dan f = n/t secara otomatis!
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Panjang</th>
                    <th className="px-3 py-2 font-semibold">n</th>
                    <th className="px-3 py-2 font-semibold">t (s)</th>
                    <th className="px-3 py-2 font-semibold">T = t/n (s)</th>
                    <th className="px-3 py-2 font-semibold">f = n/t (Hz)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono-num">
                  {records.map((r) => (
                    <tr key={r.id}>
                      <td className="px-3 py-2 font-sans font-medium text-slate-800">{r.paramLabel}</td>
                      <td className="px-3 py-2">{r.n}</td>
                      <td className="px-3 py-2">{formatIndonesianDecimal(r.t, 2)}</td>
                      <td className="px-3 py-2 font-bold text-blue-600">{formatIndonesianDecimal(r.T, 2)}</td>
                      <td className="px-3 py-2 font-bold text-cyan-700">{formatIndonesianDecimal(r.f, 2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pertanyaan Refleksi */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h5 className="text-xs font-bold text-slate-900">
              Pertanyaan Refleksi & Interpretasi Hasil
            </h5>
            <p className="mt-1 text-xs text-slate-700">
              Mengapa di laboratorium nyata kita disarankan mengukur waktu untuk 10 atau 20 getaran sekaligus lalu membaginya dengan n, bukan hanya mengukur 1 getaran?
            </p>
            <div className="mt-2.5 space-y-2">
              {[
                'Agar kesalahan refleks tangan saat menekan stopwatch menjadi lebih kecil per getaran.',
                'Karena periode bandul berubah setiap kali berayun sehingga harus dijumlahkan.',
                'Supaya jumlah getarannya menjadi sama dengan panjang talinya.',
              ].map((opt, idx) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setReflectionChoice(idx);
                    onComplete();
                  }}
                  className={`w-full rounded-xl border px-3 py-2.5 text-left text-xs transition-colors ${
                    reflectionChoice === idx
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
            {reflectionChoice !== null && (
              <p className="mt-2.5 text-xs font-medium text-slate-700">
                {reflectionChoice === 0
                  ? 'Benar sekali! Mengukur banyak getaran membagi kesalahan reaksi jari dengan nilai n sehingga hasil T dan f jauh lebih teliti.'
                  : 'Kurang tepat. Periode ayunan tetap stabil; mengukur 10-20 getaran bertujuan memperkecil kesalahan reaksi tangan saat menekan stopwatch!'}
              </p>
            )}
          </div>
        </div>
      </div>

      <NarratorBar
        title="Bimbingan Praktikum Pengukuran Getaran"
        segments={[
          'Dalam praktikum pengukuran getaran ini, kamu berperan langsung sebagai peneliti fisika!',
          'Tekan Jalankan Bandul, amati jumlah getaran penuh yang terjadi pada penghitung, lalu klik Catat ke Tabel setelah minimal satu getaran selesai.',
          'Sistem akan membantumu menghitung Periode dengan rumus T sama dengan t dibagi n, dan Frekuensi dengan rumus f sama dengan n dibagi t.',
        ]}
        compact
      />
    </div>
  );
}

function MetricBox({
  label,
  value,
  unit,
  highlight = false,
}: {
  label: string;
  value: string;
  unit: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-2.5 ${
        highlight ? 'border-blue-200 bg-blue-50/70' : 'border-slate-200 bg-slate-50'
      }`}
    >
      <div className="text-[11px] font-medium text-slate-500">{label}</div>
      <div className="mt-0.5 flex items-baseline gap-1">
        <span
          className={`font-mono-num text-base font-bold ${
            highlight ? 'text-blue-700' : 'text-slate-900'
          }`}
        >
          {value}
        </span>
        <span className="text-[11px] font-medium text-slate-500">{unit}</span>
      </div>
    </div>
  );
}
