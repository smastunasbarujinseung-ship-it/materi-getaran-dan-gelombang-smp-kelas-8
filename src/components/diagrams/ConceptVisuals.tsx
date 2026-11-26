import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import type { MateriTopic } from '../../data/materiData';

interface ConceptVisualsProps {
  type: MateriTopic['visualType'];
}

export function ConceptVisuals({ type }: ConceptVisualsProps) {
  if (type === 'amplitudo-bandul' || type === 'getaran-intro') {
    return <PendulumConceptCanvas showAmplitudeFocus={type === 'amplitudo-bandul'} />;
  }
  if (type === 'periode-demo' || type === 'frekuensi-demo') {
    return <OscillationCounterVisual mode={type === 'periode-demo' ? 'periode' : 'frekuensi'} />;
  }
  if (type === 'hubungan-t-f') {
    return <InverseRelationChart />;
  }
  if (type === 'gelombang-transversal' || type === 'besaran-gelombang' || type === 'gelombang-intro') {
    return <TransverseConceptCanvas showFullLabels={type === 'gelombang-transversal' || type === 'besaran-gelombang'} />;
  }
  if (type === 'gelombang-longitudinal') {
    return <LongitudinalConceptCanvas />;
  }
  return null;
}

function PendulumConceptCanvas({ showAmplitudeFocus }: { showAmplitudeFocus: boolean }) {
  const [running, setRunning] = useState(true);
  const [angleDeg, setAngleDeg] = useState(24);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let phase = 0;
    let lastTs = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - lastTs) / 1000);
      lastTs = now;
      if (running) {
        phase += dt * 2.4;
      }

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Background subtle grid
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, w, h);

      const pivotX = w / 2;
      const pivotY = 28;
      const len = 155;
      const maxRad = (angleDeg * Math.PI) / 180;
      const currentTheta = maxRad * Math.cos(phase);

      // Draw support bar
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(pivotX - 90, pivotY);
      ctx.lineTo(pivotX + 90, pivotY);
      ctx.stroke();

      // Equilibrium dashed line (B)
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = '#94A3B8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(pivotX, pivotY + len + 25);
      ctx.stroke();
      ctx.setLineDash([]);

      // Arc path from A to C
      ctx.strokeStyle = '#BAE6FD';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, len, Math.PI / 2 - maxRad, Math.PI / 2 + maxRad);
      ctx.stroke();

      // Ghost positions A (left) and C (right)
      const ax = pivotX - len * Math.sin(maxRad);
      const ay = pivotY + len * Math.cos(maxRad);
      const bx = pivotX;
      const by = pivotY + len;
      const cx = pivotX + len * Math.sin(maxRad);
      const cy = pivotY + len * Math.cos(maxRad);

      [
        { x: ax, y: ay, label: 'A (Kiri)' },
        { x: bx, y: by, label: 'B (Seimbang)' },
        { x: cx, y: cy, label: 'C (Kanan)' },
      ].forEach((pt, idx) => {
        ctx.fillStyle = idx === 1 ? '#0EA5E9' : '#CBD5E1';
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 11, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#0F172A';
        ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pt.label, pt.x, pt.y + 28);
      });

      // Amplitude measurement lines from B to A and B to C
      if (showAmplitudeFocus) {
        ctx.strokeStyle = '#0066FF';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(bx, by + 44);
        ctx.lineTo(ax, by + 44);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(bx, by + 44);
        ctx.lineTo(cx, by + 44);
        ctx.stroke();

        // Ticks
        [ax, bx, cx].forEach((xPos) => {
          ctx.beginPath();
          ctx.moveTo(xPos, by + 37);
          ctx.lineTo(xPos, by + 51);
          ctx.stroke();
        });

        ctx.fillStyle = '#0066FF';
        ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
        ctx.fillText('Amplitudo (A)', (ax + bx) / 2, by + 62);
        ctx.fillText('Amplitudo (A)', (bx + cx) / 2, by + 62);
      }

      // Active pendulum string and bob
      const bobX = pivotX + len * Math.sin(currentTheta);
      const bobY = pivotY + len * Math.cos(currentTheta);

      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Velocity direction arrow
      const velDir = -Math.sin(phase);
      if (Math.abs(velDir) > 0.15) {
        const arrowLen = velDir * 28;
        ctx.strokeStyle = '#06B6D4';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(bobX, bobY - 22);
        ctx.lineTo(bobX + arrowLen, bobY - 22);
        ctx.stroke();
      }

      const grad = ctx.createRadialGradient(bobX - 4, bobY - 4, 2, bobX, bobY, 16);
      grad.addColorStop(0, '#60A5FA');
      grad.addColorStop(1, '#0052CC');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(bobX, bobY, 15, 0, Math.PI * 2);
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [running, angleDeg, showAmplitudeFocus]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {showAmplitudeFocus
              ? 'Visualisasi Amplitudo Bandul (A - B - C)'
              : 'Animasi Gerak Getaran Bandul & Titik Keseimbangan'}
          </h4>
          <p className="text-xs text-slate-500">
            Satu getaran penuh: A → B → C → B → A · Amplitudo diukur dari B ke A atau B ke C
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? 'Jeda' : 'Putar'}
        </button>
      </div>

      <canvas
        ref={canvasRef}
        width={520}
        height={265}
        data-testid="concept-pendulum-canvas"
        className="w-full rounded-xl border border-slate-100 bg-slate-50"
      />

      <div className="mt-3 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="concept-amp-slider" className="text-xs font-semibold text-slate-700">
          Simpangan Maksimum (Amplitudo Sudut):{' '}
          <span className="font-mono-num text-blue-600">{angleDeg}°</span>
        </label>
        <input
          id="concept-amp-slider"
          type="range"
          min={10}
          max={38}
          value={angleDeg}
          onChange={(e) => setAngleDeg(Number(e.target.value))}
          className="physics-slider w-full sm:w-56"
        />
      </div>
    </div>
  );
}

function OscillationCounterVisual({ mode }: { mode: 'periode' | 'frekuensi' }) {
  const [freq, setFreq] = useState<number>(mode === 'frekuensi' ? 2 : 1);
  const [running, setRunning] = useState<boolean>(true);
  const [elapsed, setElapsed] = useState<number>(0);

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setElapsed((prev) => (prev + dt > 10 ? 0 : prev + dt));
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const period = 1 / freq;
  const count = Math.floor(elapsed * freq);
  const posX = 50 + 38 * Math.sin(2 * Math.PI * freq * elapsed);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            {mode === 'periode'
              ? 'Peragaan Periode: Waktu untuk 1 Getaran Penuh'
              : 'Peragaan Frekuensi: Jumlah Getaran Tiap 1 Sekon'}
          </h4>
          <p className="text-xs text-slate-500">
            Ubah frekuensi untuk melihat perubahan kecepatan getar dan waktunya
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? 'Jeda' : 'Putar'}
        </button>
      </div>

      <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
        <svg viewBox="0 0 400 72" className="w-full" aria-label="Animasi osilator horizontal">
          <line x1="30" y1="36" x2="370" y2="36" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="200" y1="14" x2="200" y2="58" stroke="#0EA5E9" strokeWidth="2" />
          <text x="200" y="11" textAnchor="middle" fontSize="10" fill="#0284C7" fontWeight="600">
            Titik Keseimbangan
          </text>
          <circle cx={(posX / 100) * 340 + 30} cy="36" r="14" fill="#0066FF" />
        </svg>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <div className="rounded-lg bg-white p-2.5 border border-slate-200/70">
            <div className="text-[11px] text-slate-500">Waktu (t)</div>
            <div className="font-mono-num text-base font-bold text-slate-900">
              {elapsed.toFixed(1).replace('.', ',')} s
            </div>
          </div>
          <div className="rounded-lg bg-white p-2.5 border border-slate-200/70">
            <div className="text-[11px] text-slate-500">Jumlah Getaran (n)</div>
            <div className="font-mono-num text-base font-bold text-blue-600">{count}</div>
          </div>
          <div className="rounded-lg bg-white p-2.5 border border-slate-200/70">
            <div className="text-[11px] text-slate-500">Periode (T = 1/f)</div>
            <div className="font-mono-num text-base font-bold text-slate-900">
              {period.toFixed(2).replace('.', ',')} s
            </div>
          </div>
          <div className="rounded-lg bg-white p-2.5 border border-slate-200/70">
            <div className="text-[11px] text-slate-500">Frekuensi (f)</div>
            <div className="font-mono-num text-base font-bold text-cyan-700">
              {freq.toFixed(1).replace('.', ',')} Hz
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="freq-concept-slider" className="text-xs font-semibold text-slate-700">
          Atur Frekuensi (f): <span className="font-mono-num text-blue-600">{freq} Hz</span>
        </label>
        <input
          id="freq-concept-slider"
          type="range"
          min={0.5}
          max={4}
          step={0.5}
          value={freq}
          onChange={(e) => setFreq(Number(e.target.value))}
          className="physics-slider w-full sm:w-56"
        />
      </div>
    </div>
  );
}

function InverseRelationChart() {
  const [freq, setFreq] = useState<number>(2);
  const period = 1 / freq;

  // Build SVG curve points for T = 1/f from f=0.5 to f=5
  const width = 460;
  const height = 210;
  const padL = 48;
  const padB = 34;
  const padT = 20;
  const padR = 24;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const toX = (f: number) => padL + ((f - 0.5) / 4.5) * plotW;
  const toY = (t: number) => padT + (1 - t / 2.2) * plotH;

  const points: string[] = [];
  for (let f = 0.5; f <= 5.001; f += 0.1) {
    points.push(`${toX(f).toFixed(1)},${toY(1 / f).toFixed(1)}`);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-2">
        <h4 className="text-sm font-bold text-slate-900">
          Grafik Interaktif Hubungan Periode (T) vs Frekuensi (f)
        </h4>
        <p className="text-xs text-slate-500">
          Geser frekuensi dan amati bahwa semakin besar f, semakin kecil nilai T
        </p>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full rounded-xl bg-slate-50 border border-slate-100">
        {/* Axes */}
        <line x1={padL} y1={padT} x2={padL} y2={height - padB} stroke="#64748B" strokeWidth="1.5" />
        <line x1={padL} y1={height - padB} x2={width - padR} y2={height - padB} stroke="#64748B" strokeWidth="1.5" />

        {/* Grid ticks */}
        {[0.5, 1.0, 1.5, 2.0].map((tVal) => (
          <g key={tVal}>
            <line
              x1={padL}
              y1={toY(tVal)}
              x2={width - padR}
              y2={toY(tVal)}
              stroke="#E2E8F0"
              strokeDasharray="3 3"
            />
            <text x={padL - 8} y={toY(tVal) + 4} textAnchor="end" fontSize="10" fill="#475569">
              {tVal.toFixed(1)}s
            </text>
          </g>
        ))}

        {[1, 2, 3, 4, 5].map((fVal) => (
          <text key={fVal} x={toX(fVal)} y={height - 14} textAnchor="middle" fontSize="10" fill="#475569">
            {fVal} Hz
          </text>
        ))}

        {/* Curve */}
        <polyline
          fill="none"
          stroke="#0066FF"
          strokeWidth="3"
          strokeLinecap="round"
          points={points.join(' ')}
        />

        {/* Active projection */}
        <line
          x1={toX(freq)}
          y1={toY(period)}
          x2={toX(freq)}
          y2={height - padB}
          stroke="#06B6D4"
          strokeDasharray="4 4"
          strokeWidth="1.5"
        />
        <line
          x1={padL}
          y1={toY(period)}
          x2={toX(freq)}
          y2={toY(period)}
          stroke="#06B6D4"
          strokeDasharray="4 4"
          strokeWidth="1.5"
        />
        <circle cx={toX(freq)} cy={toY(period)} r="7" fill="#0066FF" stroke="#FFFFFF" strokeWidth="2.5" />

        <text x={toX(freq) + 10} y={Math.max(24, toY(period) - 10)} fontSize="11" fontWeight="700" fill="#0F172A">
          f={freq} Hz → T={period.toFixed(2).replace('.', ',')} s
        </text>
      </svg>

      <div className="mt-3 flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="tf-slider" className="text-xs font-semibold text-slate-700">
          Frekuensi (f): <span className="font-mono-num text-blue-600">{freq} Hz</span> · Periode (T):{' '}
          <span className="font-mono-num text-cyan-700">{period.toFixed(2).replace('.', ',')} s</span>
        </label>
        <input
          id="tf-slider"
          type="range"
          min={0.5}
          max={5}
          step={0.5}
          value={freq}
          onChange={(e) => setFreq(Number(e.target.value))}
          className="physics-slider w-full sm:w-56"
        />
      </div>
    </div>
  );
}

function TransverseConceptCanvas({ showFullLabels }: { showFullLabels: boolean }) {
  const [running, setRunning] = useState(true);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setPhase((p) => (p + dt * 2.8) % (Math.PI * 2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  const width = 520;
  const height = 210;
  const midY = 105;
  const amp = 46;
  const startX = 40;
  const waveLenPx = 220;

  const pathParts: string[] = [];
  for (let x = startX; x <= width - 30; x += 4) {
    const k = (2 * Math.PI) / waveLenPx;
    const y = midY - amp * Math.sin(k * (x - startX) - phase);
    pathParts.push(`${x === startX ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
  }

  // Static marker positions on current phase? Keep labels anchored cleanly when paused or relative to equilibrium
  const crestX = startX + waveLenPx * 0.25 + (phase / (2 * Math.PI)) * waveLenPx;
  const wrappedCrestX = crestX > width - 60 ? crestX - waveLenPx : crestX;
  const troughX = wrappedCrestX + waveLenPx * 0.5 > width - 40 ? wrappedCrestX - waveLenPx * 0.5 : wrappedCrestX + waveLenPx * 0.5;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Animasi Gelombang Transversal pada Tali
          </h4>
          <p className="text-xs text-slate-500">
            Partikel bergetar naik-turun (tegak lurus) sementara gelombang merambat ke kanan
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? 'Jeda' : 'Putar'}
        </button>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full rounded-xl border border-slate-100 bg-slate-50">
        {/* Garis keseimbangan */}
        <line x1={startX} y1={midY} x2={width - 24} y2={midY} stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 5" />
        <text x={width - 28} y={midY - 6} textAnchor="end" fontSize="10" fill="#64748B" fontWeight="600">
          Garis Keseimbangan
        </text>

        {/* Gelombang */}
        <path d={pathParts.join(' ')} fill="none" stroke="#0066FF" strokeWidth="3.5" strokeLinecap="round" />

        {/* Contoh partikel tali bergerak vertikal di tempat */}
        <circle
          cx={startX + 110}
          cy={midY - amp * Math.sin(((2 * Math.PI) / waveLenPx) * 110 - phase)}
          r="6"
          fill="#06B6D4"
          stroke="#FFFFFF"
          strokeWidth="2"
        />

        {showFullLabels && (
          <>
            {/* Puncak */}
            <circle cx={wrappedCrestX} cy={midY - amp} r="4.5" fill="#DC2626" />
            <text x={wrappedCrestX} y={midY - amp - 10} textAnchor="middle" fontSize="11" fontWeight="700" fill="#DC2626">
              Puncak
            </text>

            {/* Amplitudo line */}
            <line x1={wrappedCrestX} y1={midY} x2={wrappedCrestX} y2={midY - amp} stroke="#059669" strokeWidth="2" />
            <text x={wrappedCrestX + 6} y={midY - amp / 2 + 4} fontSize="10" fontWeight="700" fill="#059669">
              Amplitudo (A)
            </text>

            {/* Lembah */}
            <circle cx={troughX} cy={midY + amp} r="4.5" fill="#D97706" />
            <text x={troughX} y={midY + amp + 16} textAnchor="middle" fontSize="11" fontWeight="700" fill="#D97706">
              Lembah
            </text>

            {/* Panjang gelombang 1 lambda bar */}
            <line x1={startX} y1={height - 22} x2={startX + waveLenPx} y2={height - 22} stroke="#0F172A" strokeWidth="2" />
            <line x1={startX} y1={height - 28} x2={startX} y2={height - 16} stroke="#0F172A" strokeWidth="2" />
            <line x1={startX + waveLenPx} y1={height - 28} x2={startX + waveLenPx} y2={height - 16} stroke="#0F172A" strokeWidth="2" />
            <text x={startX + waveLenPx / 2} y={height - 28} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">
              1 Panjang Gelombang (λ)
            </text>
          </>
        )}

        {/* Arah rambat arrow */}
        <line x1={width - 135} y1={24} x2={width - 42} y2={24} stroke="#0284C7" strokeWidth="2.5" />
        <polygon points={`${width - 42},19 ${width - 32},24 ${width - 42},29`} fill="#0284C7" />
        <text x={width - 88} y={15} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284C7">
          Arah Rambat →
        </text>
      </svg>
    </div>
  );
}

function LongitudinalConceptCanvas() {
  const [running, setRunning] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let phase = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (running) phase += dt * 3.0;

      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, w, h);

      const coils = 44;
      const startX = 36;
      const span = w - 72;
      const centerY = h / 2 + 6;
      const coilRadiusY = 34;
      const amp = 14;
      const waveLen = span / 2;
      const k = (2 * Math.PI) / waveLen;

      // Compute coil x positions
      const xs: number[] = [];
      for (let i = 0; i <= coils; i++) {
        const baseX = startX + (i / coils) * span;
        const disp = amp * Math.sin(k * (baseX - startX) - phase);
        xs.push(baseX + disp);
      }

      // Draw slinky loops with color indicating compression vs rarefaction
      for (let i = 0; i < coils; i++) {
        const spacing = xs[i + 1] - xs[i];
        const baseSpacing = span / coils;
        const isCompressed = spacing < baseSpacing * 0.85;
        ctx.strokeStyle = isCompressed ? '#0066FF' : '#64748B';
        ctx.lineWidth = isCompressed ? 2.6 : 1.8;

        ctx.beginPath();
        const midX = (xs[i] + xs[i + 1]) / 2;
        ctx.ellipse(midX, centerY, Math.max(4, spacing * 0.65), coilRadiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Direction annotations
      ctx.fillStyle = '#0284C7';
      ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('Arah Getar ↔ (Sejajar Arah Rambat →)', 24, 24);

      ctx.fillStyle = '#0066FF';
      ctx.fillText('Bagian Biru Pekat = Rapatan', 24, h - 14);
      ctx.fillStyle = '#475569';
      ctx.fillText('Bagian Abu Longgar = Renggangan', 235, h - 14);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [running]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-slate-900">
            Simulasi Gelombang Longitudinal pada Pegas Slinky
          </h4>
          <p className="text-xs text-slate-500">
            Amati daerah lilitan rapat (rapatan) dan longgar (renggangan) merambat ke kanan
          </p>
        </div>
        <button
          type="button"
          onClick={() => setRunning((r) => !r)}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          {running ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          {running ? 'Jeda' : 'Putar'}
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={520}
        height={175}
        data-testid="concept-longitudinal-canvas"
        className="w-full rounded-xl border border-slate-100 bg-slate-50"
      />
    </div>
  );
}
