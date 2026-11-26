import type { QuizQuestion } from '../../physics/formulas';

interface QuizStimulusProps {
  type: QuizQuestion['stimulusType'];
  caption?: string;
}

export function QuizStimulus({ type, caption }: QuizStimulusProps) {
  if (!type || type === 'none') return null;

  return (
    <figure className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:p-4">
      {type === 'pendulum-abc' && (
        <svg viewBox="0 0 360 155" className="mx-auto w-full max-w-md" aria-label="Ilustrasi bandul A B C">
          <line x1="100" y1="16" x2="260" y2="16" stroke="#334155" strokeWidth="4" />
          <line x1="180" y1="16" x2="180" y2="128" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M 110 112 Q 180 142 250 112" fill="none" stroke="#BAE6FD" strokeWidth="3" />
          {/* Strings */}
          <line x1="180" y1="16" x2="110" y2="112" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="180" y1="16" x2="250" y2="112" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />
          <line x1="180" y1="16" x2="180" y2="124" stroke="#0F172A" strokeWidth="2.5" />
          {/* Bobs */}
          <circle cx="110" cy="112" r="12" fill="#93C5FD" stroke="#2563EB" strokeWidth="2" />
          <circle cx="180" cy="124" r="12" fill="#0066FF" />
          <circle cx="250" cy="112" r="12" fill="#93C5FD" stroke="#2563EB" strokeWidth="2" />
          {/* Neutral position labels ONLY (no answer hints) */}
          <text x="110" y="142" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A">A</text>
          <text x="180" y="150" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A">B</text>
          <text x="250" y="142" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0F172A">C</text>
        </svg>
      )}

      {type === 'transverse-wave-6m' && (
        <WaveSvg totalWaves={2} topLabel="Jarak total = 6 m" />
      )}

      {type === 'transverse-wave-2s' && (
        <WaveSvg totalWaves={3} topLabel="Waktu tempuh total = 2 sekon" />
      )}

      {type === 'longitudinal-slinky-60cm' && (
        <svg viewBox="0 0 420 110" className="mx-auto w-full max-w-lg" aria-label="Ilustrasi pegas slinky sepanjang 60 cm">
          <line x1="25" y1="18" x2="395" y2="18" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="25" y1="13" x2="25" y2="23" stroke="#0F172A" strokeWidth="1.5" />
          <line x1="395" y1="13" x2="395" y2="23" stroke="#0F172A" strokeWidth="1.5" />
          <text x="210" y="13" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">
            Panjang total slinky = 60 cm
          </text>
          {Array.from({ length: 36 }).map((_, i) => {
            const xBase = 28 + (i / 35) * 364;
            const k = (2 * Math.PI * 3) / 364;
            const x = xBase + 7.5 * Math.sin(k * (xBase - 28));
            return (
              <ellipse
                key={i}
                cx={x}
                cy={62}
                rx={4.5}
                ry={22}
                fill="none"
                stroke="#0066FF"
                strokeWidth="1.6"
              />
            );
          })}
        </svg>
      )}

      {type === 'water-ripple-boat' && (
        <svg viewBox="0 0 380 120" className="mx-auto w-full max-w-md" aria-label="Ilustrasi perahu kertas di atas riak air">
          <path
            d="M 20 75 Q 60 55 100 75 T 180 75 T 260 75 T 340 75 L 360 75 L 360 110 L 20 110 Z"
            fill="#E0F2FE"
            stroke="#0284C7"
            strokeWidth="2.5"
          />
          {/* Paper boat */}
          <polygon points="160,65 200,65 192,76 168,76" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <polygon points="172,65 180,48 188,65" fill="#F8FAFC" stroke="#0F172A" strokeWidth="2" />
          {/* Up-down arrows */}
          <line x1="214" y1="48" x2="214" y2="78" stroke="#0066FF" strokeWidth="2" />
          <polygon points="210,52 214,44 218,52" fill="#0066FF" />
          <polygon points="210,74 214,82 218,74" fill="#0066FF" />
          {/* Wave propagation arrow */}
          <line x1="255" y1="35" x2="335" y2="35" stroke="#0284C7" strokeWidth="2" />
          <polygon points="335,31 344,35 335,39" fill="#0284C7" />
          <text x="295" y="27" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0284C7">
            Arah rambat riak
          </text>
        </svg>
      )}

      {caption && (
        <figcaption className="mt-2 text-center text-xs text-slate-600">{caption}</figcaption>
      )}
    </figure>
  );
}

function WaveSvg({ totalWaves, topLabel }: { totalWaves: number; topLabel: string }) {
  const width = 420;
  const startX = 30;
  const span = width - 60;
  const midY = 72;
  const amp = 28;

  const pts: string[] = [];
  for (let x = 0; x <= span; x += 2) {
    const y = midY - amp * Math.sin((2 * Math.PI * totalWaves * x) / span);
    pts.push(`${x === 0 ? 'M' : 'L'}${(startX + x).toFixed(1)},${y.toFixed(1)}`);
  }

  return (
    <svg viewBox="0 0 420 122" className="mx-auto w-full max-w-lg" aria-label={topLabel}>
      <line x1={startX} y1={20} x2={startX + span} y2={20} stroke="#0F172A" strokeWidth="1.5" />
      <line x1={startX} y1={15} x2={startX} y2={25} stroke="#0F172A" strokeWidth="1.5" />
      <line x1={startX + span} y1={15} x2={startX + span} y2={25} stroke="#0F172A" strokeWidth="1.5" />
      <text x={width / 2} y={14} textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">
        {topLabel}
      </text>
      <line x1={startX} y1={midY} x2={startX + span} y2={midY} stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />
      <path d={pts.join(' ')} fill="none" stroke="#0066FF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
