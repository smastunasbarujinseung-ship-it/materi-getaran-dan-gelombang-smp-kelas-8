import { useEffect, useRef, useState } from 'react';
import { Gamepad2, Timer, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import {
  TEBAK_GETARAN_ITEMS,
  BENAR_SALAH_ITEMS,
  HITUNG_CEPAT_PROBLEMS,
  type TebakGetaranItem,
} from '../data/gameData';

interface GameViewProps {
  bestScore: number;
  onSaveBestScore: (score: number) => void;
}

type MiniGameId = 'tebak-getaran' | 'detektif-gelombang' | 'hitung-cepat' | 'benar-salah';

export function GameView({ bestScore, onSaveBestScore }: GameViewProps) {
  const [activeGame, setActiveGame] = useState<MiniGameId>('tebak-getaran');

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Tantangan & Permainan Fisika</h1>
          <p className="text-sm text-slate-600">
            Belajar sambil bermain! Uji ketepatan konsep dan kecepatan berhitungmu
          </p>
        </div>
        <div className="inline-flex items-center gap-2 self-start rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-800">
          <Gamepad2 className="h-4 w-4" aria-hidden="true" />
          Skor Terbaik: <span className="font-mono-num">{bestScore}</span>
        </div>
      </div>

      {/* Game Tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Pilih Mini Game Fisika">
        {[
          { id: 'tebak-getaran' as const, label: 'A. Tebak Jenis Getaran' },
          { id: 'detektif-gelombang' as const, label: 'B. Detektif Gelombang' },
          { id: 'hitung-cepat' as const, label: 'C. Tantangan Hitung Cepat' },
          { id: 'benar-salah' as const, label: 'D. Benar atau Salah' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeGame === tab.id}
            onClick={() => setActiveGame(tab.id)}
            className={`min-h-[44px] rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap ${
              activeGame === tab.id
                ? 'bg-blue-600 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeGame === 'tebak-getaran' && <TebakGetaranGame onScore={onSaveBestScore} />}
      {activeGame === 'detektif-gelombang' && <DetektifGelombangGame onScore={onSaveBestScore} />}
      {activeGame === 'hitung-cepat' && <HitungCepatGame onScore={onSaveBestScore} />}
      {activeGame === 'benar-salah' && <BenarSalahGame onScore={onSaveBestScore} />}
    </div>
  );
}

function TebakGetaranGame({ onScore }: { onScore: (s: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [finished, setFinished] = useState(false);

  const item = TEBAK_GETARAN_ITEMS[idx];

  const handleAnswer = (choice: boolean) => {
    if (picked !== null) return;
    setPicked(choice);
    if (choice === item.isVibration) {
      const nextScore = score + 20;
      setScore(nextScore);
      onScore(nextScore);
    }
  };

  const handleNext = () => {
    if (idx < TEBAK_GETARAN_ITEMS.length - 1) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      setFinished(true);
    }
  };

  const reset = () => {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <GameFinishCard
        title="Tebak Jenis Getaran Selesai!"
        score={score}
        maxScore={100}
        onReplay={reset}
      />
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Ronde {idx + 1} dari {TEBAK_GETARAN_ITEMS.length}</span>
        <span className="font-mono-num text-blue-600">Skor: {score}</span>
      </div>

      <h2 className="mt-2 text-lg font-extrabold text-slate-900">{item.title}</h2>
      <p className="text-sm text-slate-600">{item.description}</p>

      <div className="my-4">
        <MotionPreviewCanvas motionType={item.motionType} />
      </div>

      <p className="text-sm font-bold text-slate-900">
        Apakah gerakan animasi di atas termasuk GETARAN?
      </p>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={picked !== null}
          onClick={() => handleAnswer(true)}
          className="min-h-[48px] rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-800 hover:bg-blue-100 disabled:opacity-70"
        >
          Ya, Termasuk Getaran
        </button>
        <button
          type="button"
          disabled={picked !== null}
          onClick={() => handleAnswer(false)}
          className="min-h-[48px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800 hover:bg-slate-100 disabled:opacity-70"
        >
          Bukan Getaran
        </button>
      </div>

      {picked !== null && (
        <div
          className={`mt-4 rounded-xl border p-4 text-sm ${
            picked === item.isVibration
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-rose-200 bg-rose-50 text-rose-900'
          }`}
        >
          <div className="font-bold">
            {picked === item.isVibration ? 'Hebat! Jawabanmu Tepat (+20)' : 'Belum Tepat'}
          </div>
          <p className="mt-1">{item.reason}</p>
          <button
            type="button"
            onClick={handleNext}
            className="mt-3 min-h-[40px] rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            {idx < TEBAK_GETARAN_ITEMS.length - 1 ? 'Soal Berikutnya' : 'Lihat Skor Akhir'}
          </button>
        </div>
      )}
    </div>
  );
}

function MotionPreviewCanvas({ motionType }: { motionType: TebakGetaranItem['motionType'] }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt;

      const w = canvas.width;
      const h = canvas.height;
      ctx.fillStyle = '#F8FAFC';
      ctx.fillRect(0, 0, w, h);

      if (motionType === 'pendulum') {
        const px = w / 2;
        const py = 20;
        const theta = 0.45 * Math.cos(t * 3);
        const bx = px + 110 * Math.sin(theta);
        const by = py + 110 * Math.cos(theta);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.fillStyle = '#0066FF';
        ctx.beginPath();
        ctx.arc(bx, by, 14, 0, Math.PI * 2);
        ctx.fill();
      } else if (motionType === 'rolling-ball') {
        const x = ((t * 110) % (w - 60)) + 30;
        ctx.strokeStyle = '#94A3B8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(20, 130);
        ctx.lineTo(w - 20, 130);
        ctx.stroke();
        ctx.fillStyle = '#0284C7';
        ctx.beginPath();
        ctx.arc(x, 114, 15, 0, Math.PI * 2);
        ctx.fill();
      } else if (motionType === 'spring') {
        const y = 95 + 35 * Math.cos(t * 4);
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(w / 2, 16);
        for (let i = 1; i <= 8; i++) {
          ctx.lineTo(w / 2 + (i % 2 === 0 ? -14 : 14), 16 + (i / 9) * (y - 16));
        }
        ctx.lineTo(w / 2, y);
        ctx.stroke();
        ctx.fillStyle = '#0066FF';
        ctx.fillRect(w / 2 - 18, y, 36, 28);
      } else if (motionType === 'spinning-wheel') {
        const cx = w / 2;
        const cy = h / 2;
        const r = 48;
        ctx.strokeStyle = '#0F172A';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 4; i++) {
          const a = t * 3 + (i * Math.PI) / 2;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
          ctx.stroke();
        }
      } else {
        // guitar-string
        const amp = 22 * Math.sin(t * 14);
        ctx.strokeStyle = '#0066FF';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(40, h / 2);
        ctx.quadraticCurveTo(w / 2, h / 2 + amp, w - 40, h / 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [motionType]);

  return (
    <canvas
      ref={canvasRef}
      width={460}
      height={165}
      className="mx-auto w-full max-w-md rounded-xl border border-slate-200 bg-slate-50"
    />
  );
}

function DetektifGelombangGame({ onScore }: { onScore: (s: number) => void }) {
  const targets = [
    {
      id: 'puncak',
      prompt: 'Klik bagian gelombang yang menunjukkan PUNCAK GELOMBANG (titik tertinggi)!',
      hint: 'Puncak berada di lengkungan paling atas di atas garis keseimbangan.',
    },
    {
      id: 'lembah',
      prompt: 'Klik bagian gelombang yang menunjukkan LEMBAH GELOMBANG (titik terendah)!',
      hint: 'Lembah berada di dasar lengkungan di bawah garis keseimbangan.',
    },
    {
      id: 'amplitudo',
      prompt: 'Klik penanda yang menunjukkan AMPLITUDO (simpangan terjauh dari garis tengah)!',
      hint: 'Amplitudo adalah jarak vertikal dari garis keseimbangan ke puncak.',
    },
    {
      id: 'lambda',
      prompt: 'Klik penanda yang menunjukkan SATU PANJANG GELOMBANG (λ)!',
      hint: 'Satu λ mencakup 1 puncak dan 1 lembah penuh dari kiri ke kanan.',
    },
  ] as const;

  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [done, setDone] = useState(false);

  const current = targets[step];

  const handleSelectZone = (zoneId: string) => {
    if (feedback) return;
    const ok = zoneId === current.id;
    if (ok) {
      const next = score + 25;
      setScore(next);
      onScore(next);
      setFeedback({ ok: true, msg: `Tepat sekali! Itu memang ${current.id.toUpperCase()} (+25 poin).` });
    } else {
      setFeedback({ ok: false, msg: `Belum tepat. Petunjuk: ${current.hint}` });
    }
  };

  const handleNext = () => {
    if (step < targets.length - 1) {
      setStep(step + 1);
      setFeedback(null);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <GameFinishCard
        title="Detektif Gelombang Selesai!"
        score={score}
        maxScore={100}
        onReplay={() => {
          setStep(0);
          setScore(0);
          setFeedback(null);
          setDone(false);
        }}
      />
    );
  }

  // Generate 2 full sine waves across 440px (from x=40 to 440, lambda = 200px)
  const pts: string[] = [];
  for (let x = 0; x <= 400; x += 4) {
    const y = 100 - 48 * Math.sin((2 * Math.PI * x) / 200);
    pts.push(`${x === 0 ? 'M' : 'L'}${40 + x},${y.toFixed(1)}`);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Misi Detektif {step + 1} / {targets.length}</span>
        <span className="font-mono-num text-blue-600">Skor: {score}</span>
      </div>

      <h2 className="mt-2 text-base font-extrabold text-slate-900 sm:text-lg">{current.prompt}</h2>

      {/* Interactive SVG */}
      <svg viewBox="0 0 480 205" className="my-4 w-full rounded-2xl border border-slate-200 bg-slate-50">
        <line x1="30" y1="100" x2="450" y2="100" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d={pts.join(' ')} fill="none" stroke="#0066FF" strokeWidth="3.5" />

        {/* Zone 1: Puncak (x=90, y=52) */}
        <circle cx="90" cy="52" r="14" fill="#DC2626" opacity="0.2" />
        <circle cx="90" cy="52" r="6" fill="#DC2626" />
        <text x="90" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#DC2626">
          Titik 1
        </text>

        {/* Zone 2: Lembah (x=190, y=148) */}
        <circle cx="190" cy="148" r="14" fill="#D97706" opacity="0.2" />
        <circle cx="190" cy="148" r="6" fill="#D97706" />
        <text x="190" y="172" textAnchor="middle" fontSize="11" fontWeight="700" fill="#D97706">
          Titik 2
        </text>

        {/* Zone 3: Amplitudo vertical bar (x=290, y=52..100) */}
        <line x1="290" y1="100" x2="290" y2="52" stroke="#059669" strokeWidth="3" />
        <text x="302" y="78" fontSize="11" fontWeight="700" fill="#059669">
          Garis 3
        </text>

        {/* Zone 4: Panjang gelombang bar (x=40..240, y=188) */}
        <line x1="40" y1="188" x2="240" y2="188" stroke="#0F172A" strokeWidth="2.5" />
        <line x1="40" y1="182" x2="40" y2="194" stroke="#0F172A" strokeWidth="2.5" />
        <line x1="240" y1="182" x2="240" y2="194" stroke="#0F172A" strokeWidth="2.5" />
        <text x="140" y="182" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">
          Rentang 4
        </text>
      </svg>

      {/* Accessible touch buttons matching the 4 visual markers */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { id: 'puncak', label: 'Titik 1 (Merah Atas)' },
          { id: 'lembah', label: 'Titik 2 (Oranye Bawah)' },
          { id: 'amplitudo', label: 'Garis 3 (Vertikal)' },
          { id: 'lambda', label: 'Rentang 4 (Horizontal)' },
        ].map((btn) => (
          <button
            key={btn.id}
            type="button"
            disabled={feedback !== null}
            onClick={() => handleSelectZone(btn.id)}
            className="min-h-[46px] rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-70"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {feedback && (
        <div
          className={`mt-4 rounded-xl border p-4 text-sm ${
            feedback.ok
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-rose-200 bg-rose-50 text-rose-900'
          }`}
        >
          <p className="font-bold">{feedback.msg}</p>
          <button
            type="button"
            onClick={handleNext}
            className="mt-3 min-h-[40px] rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            {step < targets.length - 1 ? 'Misi Berikutnya' : 'Lihat Skor Akhir'}
          </button>
        </div>
      )}
    </div>
  );
}

function HitungCepatGame({ onScore }: { onScore: (s: number) => void }) {
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lastMsg, setLastMsg] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!started || done) return;
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setDone(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [started, done]);

  const problem = HITUNG_CEPAT_PROBLEMS[idx];

  const handlePick = (optIdx: number) => {
    const ok = optIdx === problem.correctIndex;
    const nextScore = ok ? score + 20 : score;
    if (ok) {
      setScore(nextScore);
      onScore(nextScore);
    }
    setLastMsg(ok ? `Benar! ${problem.explanation}` : `Kurang tepat. ${problem.explanation}`);

    if (idx < HITUNG_CEPAT_PROBLEMS.length - 1) {
      setIdx(idx + 1);
    } else {
      setDone(true);
    }
  };

  const restart = () => {
    setStarted(true);
    setTimeLeft(60);
    setIdx(0);
    setScore(0);
    setLastMsg(null);
    setDone(false);
  };

  if (!started) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center">
        <Timer className="mx-auto h-10 w-10 text-blue-600" aria-hidden="true" />
        <h2 className="mt-3 text-xl font-extrabold text-slate-900">Tantangan Hitung Cepat (60 Detik)</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-slate-600">
          Selesaikan 5 soal hitungan Periode (T), Frekuensi (f), dan Cepat Rambat (v) sebelum waktu habis!
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-5 min-h-[48px] rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
        >
          Mulai Hitung Cepat
        </button>
      </div>
    );
  }

  if (done) {
    return (
      <GameFinishCard
        title="Tantangan Hitung Cepat Selesai!"
        score={score}
        maxScore={100}
        onReplay={restart}
      />
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500">
          Soal {idx + 1} / {HITUNG_CEPAT_PROBLEMS.length}
        </span>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 font-mono-num text-xs font-bold text-amber-700">
            <Timer className="h-4 w-4" aria-hidden="true" /> {timeLeft}s
          </span>
          <span className="font-mono-num text-xs font-bold text-blue-600">Skor: {score}</span>
        </div>
      </div>

      <h2 className="mt-3 text-lg font-extrabold text-slate-900">{problem.prompt}</h2>
      <p className="mt-1 font-mono-num text-xs font-semibold text-cyan-700">
        Petunjuk rumus: {problem.formulaHint}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {problem.options.map((opt, oIdx) => (
          <button
            key={opt}
            type="button"
            onClick={() => handlePick(oIdx)}
            className="min-h-[48px] rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono-num text-sm font-bold text-slate-900 hover:bg-blue-50 hover:border-blue-300"
          >
            {opt}
          </button>
        ))}
      </div>

      {lastMsg && (
        <p className="mt-4 rounded-xl bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-700">
          {lastMsg}
        </p>
      )}
    </div>
  );
}

function BenarSalahGame({ onScore }: { onScore: (s: number) => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const item = BENAR_SALAH_ITEMS[idx];

  const handleChoose = (val: boolean) => {
    if (picked !== null) return;
    setPicked(val);
    if (val === item.isTrue) {
      const next = Math.min(100, score + Math.round(100 / BENAR_SALAH_ITEMS.length));
      setScore(next);
      onScore(next);
    }
  };

  const handleNext = () => {
    if (idx < BENAR_SALAH_ITEMS.length - 1) {
      setIdx(idx + 1);
      setPicked(null);
    } else {
      setDone(true);
    }
  };

  if (done) {
    return (
      <GameFinishCard
        title="Permainan Benar atau Salah Selesai!"
        score={score}
        maxScore={100}
        onReplay={() => {
          setIdx(0);
          setScore(0);
          setPicked(null);
          setDone(false);
        }}
      />
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
        <span>Pernyataan {idx + 1} / {BENAR_SALAH_ITEMS.length}</span>
        <span className="font-mono-num text-blue-600">Skor: {score}</span>
      </div>

      <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base font-bold leading-relaxed text-slate-900">
        "{item.statement}"
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          disabled={picked !== null}
          onClick={() => handleChoose(true)}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 hover:bg-emerald-100 disabled:opacity-70"
        >
          <CheckCircle2 className="h-4 w-4" />
          BENAR
        </button>
        <button
          type="button"
          disabled={picked !== null}
          onClick={() => handleChoose(false)}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-bold text-rose-800 hover:bg-rose-100 disabled:opacity-70"
        >
          <XCircle className="h-4 w-4" />
          SALAH
        </button>
      </div>

      {picked !== null && (
        <div
          className={`mt-4 rounded-xl border p-4 text-sm ${
            picked === item.isTrue
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-rose-200 bg-rose-50 text-rose-900'
          }`}
        >
          <p className="font-bold">{item.explanation}</p>
          <button
            type="button"
            onClick={handleNext}
            className="mt-3 min-h-[40px] rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            {idx < BENAR_SALAH_ITEMS.length - 1 ? 'Pernyataan Selanjutnya' : 'Lihat Skor Akhir'}
          </button>
        </div>
      )}
    </div>
  );
}

function GameFinishCard({
  title,
  score,
  maxScore,
  onReplay,
}: {
  title: string;
  score: number;
  maxScore: number;
  onReplay: () => void;
}) {
  return (
    <div className="rounded-3xl border border-blue-200 bg-white p-6 text-center">
      <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
      <div className="mt-3 font-mono-num text-4xl font-extrabold text-blue-600">
        {score} <span className="text-base font-semibold text-slate-500">/ {maxScore}</span>
      </div>
      <p className="mt-2 text-sm text-slate-600">
        {score >= 80
          ? 'Hebat! Pemahamanmu sangat cepat dan akurat.'
          : 'Bagus! Coba mainkan sekali lagi untuk meraih skor maksimal.'}
      </p>
      <button
        type="button"
        onClick={onReplay}
        className="mt-5 inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700"
      >
        <RotateCcw className="h-4 w-4" />
        Main Lagi
      </button>
    </div>
  );
}
