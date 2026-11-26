import { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  ClipboardCheck,
  RotateCcw,
  Award,
} from 'lucide-react';
import { GETARAN_QUIZ, GELOMBANG_QUIZ } from '../data/quizData';
import { evaluateQuiz, type QuizQuestion, type QuizResult } from '../physics/formulas';
import { QuizStimulus } from './diagrams/QuizStimulus';
import { NarratorBar } from './NarratorBar';

interface LatihanViewProps {
  getaranScore: number | null;
  gelombangScore: number | null;
  onSaveScore: (category: 'getaran' | 'gelombang', score: number) => void;
  onGoToMateri: () => void;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export function LatihanView({
  getaranScore,
  gelombangScore,
  onSaveScore,
  onGoToMateri,
}: LatihanViewProps) {
  const [activePackage, setActivePackage] = useState<'getaran' | 'gelombang' | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submittedResult, setSubmittedResult] = useState<QuizResult | null>(null);

  const questions: QuizQuestion[] =
    activePackage === 'getaran' ? GETARAN_QUIZ : activePackage === 'gelombang' ? GELOMBANG_QUIZ : [];

  const startQuiz = (pkg: 'getaran' | 'gelombang') => {
    setActivePackage(pkg);
    setCurrentIdx(0);
    setAnswers({});
    setSubmittedResult(null);
  };

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (!activePackage) return;
    const result = evaluateQuiz(answers, questions);
    setSubmittedResult(result);
    onSaveScore(activePackage, result.score);
  };

  // Menu Selection View
  if (!activePackage) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Evaluasi & Latihan Soal</h1>
          <p className="text-sm text-slate-600">
            Pilih paket evaluasi di bawah ini. Setiap paket berisi tepat 10 soal pilihan ganda (10 poin per soal, nilai maksimal 100).
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
            <div>
              <p className="text-xs font-bold text-blue-600">Paket Evaluasi A · 10 Soal Pilihan Ganda</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                LATIHAN GETARAN – 10 SOAL
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Menguji pemahaman pengertian getaran, satu getaran penuh pada bandul, amplitudo, periode, frekuensi, hubungan T dan f, perhitungan waktu, serta analisis percobaan.
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700">
                Nilai Terakhir:{' '}
                <span className="font-mono-num font-bold text-blue-700">
                  {getaranScore !== null ? `${getaranScore} / 100` : 'Belum dikerjakan'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => startQuiz('getaran')}
              className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              Mulai Latihan Getaran
            </button>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6">
            <div>
              <p className="text-xs font-bold text-cyan-700">Paket Evaluasi B · 10 Soal Pilihan Ganda</p>
              <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                LATIHAN GELOMBANG – 10 SOAL
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Menguji konsep energi gelombang, gelombang transversal & longitudinal, puncak-lembah, rapatan-renggangan, membaca grafik λ, frekuensi, periode, dan cepat rambat v = λ × f.
              </p>
              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700">
                Nilai Terakhir:{' '}
                <span className="font-mono-num font-bold text-cyan-700">
                  {gelombangScore !== null ? `${gelombangScore} / 100` : 'Belum dikerjakan'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => startQuiz('gelombang')}
              className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              Mulai Latihan Gelombang
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results & Detailed Pembahasan View
  if (submittedResult) {
    const resultNarratorSegments = [
      `Evaluasi selesai! Nilai kamu untuk materi ${
        activePackage === 'getaran' ? 'Getaran' : 'Gelombang'
      } adalah ${submittedResult.score} dari ${submittedResult.maxScore}, dengan ${
        submittedResult.correctCount
      } jawaban benar dan ${submittedResult.wrongCount} jawaban salah.`,
      submittedResult.motivation,
      submittedResult.recommendations.length > 0
        ? `Saran guru: coba tinjau ulang bagian ${submittedResult.recommendations.join(', ')}. Kamu pasti bisa!`
        : 'Semua topik sudah kamu kuasai dengan sangat mantap! Pertahankan prestasimu ya!',
    ];

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setActivePackage(null)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Menu Latihan
          </button>

          <button
            type="button"
            onClick={() => startQuiz(activePackage)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            <RotateCcw className="h-4 w-4" />
            Ulangi Paket Soal Ini
          </button>
        </div>

        {/* Score Summary Card */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                <Award className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Hasil Evaluasi: Latihan {activePackage === 'getaran' ? 'Getaran' : 'Gelombang'}
                </h2>
                <p className="mt-0.5 text-sm font-medium text-blue-700">{submittedResult.motivation}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-center">
              <div className="text-xs font-semibold text-slate-600">Nilai Akhir</div>
              <div className="font-mono-num text-3xl font-extrabold text-blue-700">
                {submittedResult.score}
                <span className="text-base font-semibold text-slate-500"> / 100</span>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
              <div className="text-xs text-emerald-800">Jawaban Benar</div>
              <div className="font-mono-num text-xl font-bold text-emerald-700">
                {submittedResult.correctCount}
              </div>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3">
              <div className="text-xs text-rose-800">Jawaban Salah</div>
              <div className="font-mono-num text-xl font-bold text-rose-700">
                {submittedResult.wrongCount}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="text-xs text-slate-600">Penguasaan</div>
              <div className="font-mono-num text-xl font-bold text-slate-900">
                {submittedResult.percentage}%
              </div>
            </div>
          </div>

          {submittedResult.recommendations.length > 0 && (
            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
              <div className="text-xs font-bold text-amber-900">
                Rekomendasi Materi yang Perlu Dipelajari Kembali:
              </div>
              <p className="mt-1 text-sm text-amber-900">
                {submittedResult.recommendations.join(' · ')}
              </p>
              <button
                type="button"
                onClick={onGoToMateri}
                className="mt-2.5 inline-flex min-h-[38px] items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-amber-700"
              >
                Buka Kembali Materi Belajar
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </section>

        <NarratorBar title="Ulasan Guru Atas Hasil Latihanmu" segments={resultNarratorSegments} compact />

        {/* Pembahasan Lengkap Semua 10 Nomor */}
        <section className="space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900">Pembahasan Lengkap Tiap Nomor</h3>
          {questions.map((q, idx) => {
            const review = submittedResult.reviews[idx];
            const selectedIdx = review?.selectedIndex;
            const isCorrect = review?.isCorrect;

            return (
              <div key={q.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-500">
                    Soal {idx + 1} · {q.topicTag}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                      isCorrect ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Benar (+10 poin)
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" aria-hidden="true" />
                        Salah (0 poin)
                      </>
                    )}
                  </span>
                </div>

                <p className="mt-2 text-sm font-semibold text-slate-900">{q.question}</p>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                    <span className="text-slate-500">Jawaban Kamu: </span>
                    <span className="font-bold text-slate-900">
                      {selectedIdx !== null && selectedIdx !== undefined
                        ? `${OPTION_LETTERS[selectedIdx]}. ${q.options[selectedIdx]}`
                        : 'Tidak dijawab'}
                    </span>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3">
                    <span className="text-emerald-800">Kunci Jawaban Benar: </span>
                    <span className="font-bold text-emerald-900">
                      {OPTION_LETTERS[q.correctIndex]}. {q.options[q.correctIndex]}
                    </span>
                  </div>
                </div>

                <div className="mt-3 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm">
                  {q.formula && (
                    <div className="mb-1.5 font-mono-num text-xs font-bold text-blue-700">
                      Rumus: {q.formula}
                    </div>
                  )}
                  <ol className="list-decimal space-y-1 pl-4 text-xs sm:text-sm text-slate-700">
                    {q.calculationSteps.map((step, sIdx) => (
                      <li key={sIdx}>{step}</li>
                    ))}
                  </ol>
                  <p className="mt-2 text-xs sm:text-sm text-slate-700">{q.explanation}</p>
                  <p className="mt-1.5 font-mono-num text-xs font-extrabold text-slate-900">
                    Kesimpulan Jawaban: {q.finalAnswerWithUnit}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    );
  }

  // Active Quiz Runner View (No Answer Spoilers!)
  const currentQuestion = questions[currentIdx];
  const answeredCount = Object.keys(answers).length;
  const selectedOption = answers[currentQuestion.id];

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setActivePackage(null)}
          className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Batal & Kembali
        </button>

        <div className="text-xs font-bold text-slate-700">
          LATIHAN {activePackage === 'getaran' ? 'GETARAN' : 'GELOMBANG'} · Terjawab{' '}
          <span className="font-mono-num text-blue-600">{answeredCount} / 10</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-[width] duration-200"
          style={{ width: `${(answeredCount / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Number Navigator */}
      <div className="flex flex-wrap gap-2" aria-label="Navigasi Nomor Soal">
        {questions.map((q, idx) => {
          const isAnswered = typeof answers[q.id] === 'number';
          const isActive = idx === currentIdx;
          return (
            <button
              key={q.id}
              type="button"
              onClick={() => setCurrentIdx(idx)}
              aria-label={`Soal nomor ${idx + 1}`}
              aria-current={isActive ? 'step' : undefined}
              className={`flex h-11 w-11 items-center justify-center rounded-xl text-xs font-bold font-mono-num transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                  : isAnswered
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Question Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-7">
        <div className="text-xs font-semibold text-blue-600">
          Soal {currentIdx + 1} dari {questions.length} · {currentQuestion.topicTag}
        </div>

        <div className="mt-3">
          <QuizStimulus
            type={currentQuestion.stimulusType}
            caption={currentQuestion.stimulusCaption}
          />
        </div>

        <h2 className="text-base font-bold leading-relaxed text-slate-900 sm:text-lg">
          {currentQuestion.question}
        </h2>

        <div className="mt-5 space-y-3">
          {currentQuestion.options.map((optText, optIdx) => {
            const isSelected = selectedOption === optIdx;
            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                className={`flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50 font-semibold text-blue-950 ring-1 ring-blue-600'
                    : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {OPTION_LETTERS[optIdx]}
                </span>
                <span className="leading-snug">{optText}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Sebelumnya
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {currentIdx < questions.length - 1 && (
              <button
                type="button"
                onClick={() => setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))}
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100"
              >
                Berikutnya
                <ArrowRight className="h-4 w-4" />
              </button>
            )}

            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white hover:bg-blue-700"
            >
              SELESAI MENGERJAKAN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
