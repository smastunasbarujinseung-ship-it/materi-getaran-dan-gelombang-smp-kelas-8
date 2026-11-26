import type { ProgressState } from '../physics/formulas';

const STORAGE_KEY = 'fisika_explorer_progress_v1';

export const DEFAULT_PROGRESS: ProgressState = {
  completedTopics: [],
  completedLabs: [],
  getaranQuizScore: null,
  gelombangQuizScore: null,
  gameBestScore: 0,
};

export function loadProgress(): ProgressState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
      completedLabs: Array.isArray(parsed.completedLabs) ? parsed.completedLabs : [],
      getaranQuizScore:
        typeof parsed.getaranQuizScore === 'number' ? parsed.getaranQuizScore : null,
      gelombangQuizScore:
        typeof parsed.gelombangQuizScore === 'number' ? parsed.gelombangQuizScore : null,
      gameBestScore: typeof parsed.gameBestScore === 'number' ? parsed.gameBestScore : 0,
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(state: ProgressState): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Abaikan jika penyimpanan lokal dibatasi browser
  }
}

export function clearProgress(): ProgressState {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Abaikan jika penyimpanan lokal dibatasi browser
  }
  return { ...DEFAULT_PROGRESS };
}
