export interface QuizQuestion {
  id: number;
  category: 'getaran' | 'gelombang';
  topicTag: string;
  question: string;
  stimulusType?:
    | 'none'
    | 'pendulum-abc'
    | 'transverse-wave-6m'
    | 'transverse-wave-2s'
    | 'longitudinal-slinky-60cm'
    | 'water-ripple-boat';
  stimulusCaption?: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  formula?: string;
  calculationSteps: string[];
  explanation: string;
  finalAnswerWithUnit: string;
  narratorFeedback: string;
}

export interface QuizQuestionReview {
  questionId: number;
  selectedIndex: number | null;
  correctIndex: number;
  isCorrect: boolean;
  topicTag: string;
}

export interface QuizResult {
  score: number;
  maxScore: number;
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  percentage: number;
  motivation: string;
  recommendations: string[];
  reviews: QuizQuestionReview[];
}

export interface ProgressState {
  completedTopics: string[];
  completedLabs: string[];
  getaranQuizScore: number | null;
  gelombangQuizScore: number | null;
  gameBestScore: number;
}

export const TOTAL_MATERI_TOPICS = 12; // 6 Getaran + 6 Gelombang
export const TOTAL_LAB_EXPERIMENTS = 6; // 3 Getaran + 3 Gelombang
export const GRAVITY_STANDARD = 9.8; // m/s^2

/**
 * Periode bandul matematis sederhana: T = 2 * pi * sqrt(L / g)
 */
export function calculatePendulumPeriod(
  lengthMeters: number,
  gravity: number = GRAVITY_STANDARD
): number {
  if (lengthMeters <= 0 || gravity <= 0) {
    throw new Error('Panjang tali dan gravitasi harus lebih besar dari nol.');
  }
  return 2 * Math.PI * Math.sqrt(lengthMeters / gravity);
}

/**
 * Periode getaran pegas dan beban: T = 2 * pi * sqrt(m / k)
 */
export function calculateSpringPeriod(
  massKg: number,
  springConstantNPerM: number
): number {
  if (massKg <= 0 || springConstantNPerM <= 0) {
    throw new Error('Massa dan konstanta pegas harus lebih besar dari nol.');
  }
  return 2 * Math.PI * Math.sqrt(massKg / springConstantNPerM);
}

/**
 * Periode dari waktu total dan jumlah getaran: T = t / n
 */
export function calculatePeriodFromCount(
  timeSeconds: number,
  oscillations: number
): number {
  if (timeSeconds < 0 || oscillations <= 0) {
    throw new Error('Jumlah getaran harus lebih dari nol dan waktu tidak negatif.');
  }
  return timeSeconds / oscillations;
}

/**
 * Frekuensi dari jumlah getaran dan waktu total: f = n / t
 */
export function calculateFrequencyFromCount(
  oscillations: number,
  timeSeconds: number
): number {
  if (oscillations < 0 || timeSeconds <= 0) {
    throw new Error('Waktu total harus lebih dari nol dan jumlah getaran tidak negatif.');
  }
  return oscillations / timeSeconds;
}

/**
 * Hubungan frekuensi dan periode: f = 1 / T
 */
export function calculateFrequencyFromPeriod(periodSeconds: number): number {
  if (periodSeconds <= 0) {
    throw new Error('Periode harus lebih besar dari nol.');
  }
  return 1 / periodSeconds;
}

/**
 * Hubungan periode dan frekuensi: T = 1 / f
 */
export function calculatePeriodFromFrequency(frequencyHz: number): number {
  if (frequencyHz <= 0) {
    throw new Error('Frekuensi harus lebih besar dari nol.');
  }
  return 1 / frequencyHz;
}

/**
 * Cepat rambat gelombang: v = lambda * f
 */
export function calculateWaveSpeed(
  wavelengthMeters: number,
  frequencyHz: number
): number {
  if (wavelengthMeters <= 0 || frequencyHz <= 0) {
    throw new Error('Panjang gelombang dan frekuensi harus lebih besar dari nol.');
  }
  return wavelengthMeters * frequencyHz;
}

/**
 * Cepat rambat gelombang dari panjang gelombang dan periode: v = lambda / T
 */
export function calculateWaveSpeedFromPeriod(
  wavelengthMeters: number,
  periodSeconds: number
): number {
  if (wavelengthMeters <= 0 || periodSeconds <= 0) {
    throw new Error('Panjang gelombang dan periode harus lebih besar dari nol.');
  }
  return wavelengthMeters / periodSeconds;
}

/**
 * Panjang gelombang dari cepat rambat dan frekuensi: lambda = v / f
 */
export function calculateWavelength(
  waveSpeedMetersPerSec: number,
  frequencyHz: number
): number {
  if (waveSpeedMetersPerSec <= 0 || frequencyHz <= 0) {
    throw new Error('Cepat rambat dan frekuensi harus lebih besar dari nol.');
  }
  return waveSpeedMetersPerSec / frequencyHz;
}

/**
 * Evaluasi jawaban latihan soal (10 poin per soal, maksimal 100 untuk 10 soal)
 */
export function evaluateQuiz(
  answers: Record<number, number>,
  questions: QuizQuestion[]
): QuizResult {
  const reviews: QuizQuestionReview[] = [];
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  const missedTopicsSet = new Set<string>();

  for (const q of questions) {
    const selected = answers[q.id];
    const hasSelected = typeof selected === 'number';
    const isCorrect = hasSelected && selected === q.correctIndex;

    if (!hasSelected) {
      unansweredCount += 1;
      wrongCount += 1;
      missedTopicsSet.add(q.topicTag);
    } else if (isCorrect) {
      correctCount += 1;
    } else {
      wrongCount += 1;
      missedTopicsSet.add(q.topicTag);
    }

    reviews.push({
      questionId: q.id,
      selectedIndex: hasSelected ? selected : null,
      correctIndex: q.correctIndex,
      isCorrect,
      topicTag: q.topicTag,
    });
  }

  const maxScore = questions.length * 10;
  const score = correctCount * 10;
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  let motivation = 'Ayo pelajari kembali bagian yang belum kamu kuasai.';
  if (percentage >= 90) {
    motivation = 'Hebat! Kamu semakin memahami konsep getaran dan gelombang dengan sangat baik!';
  } else if (percentage >= 70) {
    motivation = 'Bagus! Terus tingkatkan kemampuanmu agar makin mahir.';
  } else if (percentage >= 50) {
    motivation = 'Usaha yang baik! Mari ulangi sebentar materi yang masih keliru.';
  }

  return {
    score,
    maxScore,
    correctCount,
    wrongCount,
    unansweredCount,
    percentage,
    motivation,
    recommendations: Array.from(missedTopicsSet),
    reviews,
  };
}

/**
 * Hitung total persentase progres belajar keseluruhan (0 - 100%)
 * Bobot:
 * - Materi (12 topik): 40%
 * - Lab Virtual (6 eksperimen): 30%
 * - Latihan Getaran (lulus/dikerjakan): 15%
 * - Latihan Gelombang (lulus/dikerjakan): 15%
 */
export function computeLearningProgress(state: ProgressState): number {
  const topicRatio = Math.min(1, state.completedTopics.length / TOTAL_MATERI_TOPICS);
  const labRatio = Math.min(1, state.completedLabs.length / TOTAL_LAB_EXPERIMENTS);
  const getaranRatio =
    state.getaranQuizScore !== null ? Math.max(0.4, state.getaranQuizScore / 100) : 0;
  const gelombangRatio =
    state.gelombangQuizScore !== null ? Math.max(0.4, state.gelombangQuizScore / 100) : 0;

  const total =
    topicRatio * 40 + labRatio * 30 + getaranRatio * 15 + gelombangRatio * 15;
  return Math.round(total);
}

export function formatIndonesianDecimal(value: number, decimals: number = 2): string {
  return value.toFixed(decimals).replace('.', ',');
}
