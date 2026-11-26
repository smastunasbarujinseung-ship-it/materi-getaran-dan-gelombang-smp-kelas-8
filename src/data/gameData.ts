export interface TebakGetaranItem {
  id: string;
  title: string;
  description: string;
  motionType: 'pendulum' | 'rolling-ball' | 'spring' | 'guitar-string' | 'falling-apple' | 'spinning-wheel';
  isVibration: boolean;
  reason: string;
}

export const TEBAK_GETARAN_ITEMS: TebakGetaranItem[] = [
  {
    id: 'tg-1',
    title: 'Ayunan Bandul Logam',
    description: 'Beban bandul bergerak dari kiri ke tengah lalu ke kanan secara berulang.',
    motionType: 'pendulum',
    isVibration: true,
    reason: 'Benar! Bandul bergerak bolak-balik secara teratur melewati titik keseimbangan di tengah.',
  },
  {
    id: 'tg-2',
    title: 'Bola Menggelinding Lurus',
    description: 'Bola menggelinding di lantai datar dari kiri terus ke kanan tanpa kembali.',
    motionType: 'rolling-ball',
    isVibration: false,
    reason: 'Bola hanya berpindah tempat satu arah (gerak lurus), tidak bolak-balik melewati titik keseimbangan.',
  },
  {
    id: 'tg-3',
    title: 'Pegas dengan Beban Naik-Turun',
    description: 'Beban di ujung pegas bergerak turun-naik melewati posisi diamnya.',
    motionType: 'spring',
    isVibration: true,
    reason: 'Tepat! Beban pada pegas bergetar naik-turun secara periodik melalui titik keseimbangan.',
  },
  {
    id: 'tg-4',
    title: 'Roda Sepeda Berputar',
    description: 'Roda berputar terus searah jarum jam pada porosnya.',
    motionType: 'spinning-wheel',
    isVibration: false,
    reason: 'Roda berputar melingkar satu arah, bukan gerak bolak-balik melalui titik keseimbangan.',
  },
  {
    id: 'tg-5',
    title: 'Senar Gitar yang Dipetik',
    description: 'Senar gitar bergerak cepat ke atas dan ke bawah melewati posisi lurusnya.',
    motionType: 'guitar-string',
    isVibration: true,
    reason: 'Betul! Senar gitar bergetar bolak-balik sangat cepat dan menghasilkan gelombang bunyi.',
  },
];

export interface BenarSalahItem {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
}

export const BENAR_SALAH_ITEMS: BenarSalahItem[] = [
  {
    id: 'bs-1',
    statement: 'Amplitudo bandul adalah jarak dari simpangan terjauh kiri langsung ke simpangan terjauh kanan.',
    isTrue: false,
    explanation: 'Salah! Amplitudo diukur dari titik keseimbangan di tengah menuju simpangan terjauh (setengah dari jarak ujung ke ujung).',
  },
  {
    id: 'bs-2',
    statement: 'Jika frekuensi suatu getaran diperbesar, maka periodenya akan semakin kecil.',
    isTrue: true,
    explanation: 'Benar! Hubungan T = 1/f bersifat berbanding terbalik: makin banyak getaran per detik, makin singkat waktu tiap 1 getaran.',
  },
  {
    id: 'bs-3',
    statement: 'Gelombang memindahkan energi sekaligus memindahkan air atau udara secara permanen ke tempat jauh.',
    isTrue: false,
    explanation: 'Salah! Gelombang hanya memindahkan energi; partikel medium hanya bergetar di tempatnya.',
  },
  {
    id: 'bs-4',
    statement: 'Gelombang bunyi di udara termasuk gelombang longitudinal yang terdiri atas rapatan dan renggangan.',
    isTrue: true,
    explanation: 'Benar! Partikel udara bergetar sejajar dengan arah rambat gelombang bunyi.',
  },
  {
    id: 'bs-5',
    statement: 'Satu panjang gelombang transversal (λ) terdiri atas satu puncak penuh dan satu lembah penuh.',
    isTrue: true,
    explanation: 'Benar! Gabungan 1 puncak dan 1 lembah membentuk 1 panjang gelombang utuh pada gelombang transversal.',
  },
  {
    id: 'bs-6',
    statement: 'Satuan internasional untuk frekuensi adalah sekon (s) sedangkan periode adalah Hertz (Hz).',
    isTrue: false,
    explanation: 'Salah! Terbalik ya: satuan periode adalah sekon (s) dan satuan frekuensi adalah Hertz (Hz).',
  },
];

export interface HitungCepatProblem {
  id: string;
  prompt: string;
  formulaHint: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
}

export const HITUNG_CEPAT_PROBLEMS: HitungCepatProblem[] = [
  {
    id: 'hc-1',
    prompt: 'Bandul bergetar 20 kali dalam 10 sekon. Berapa frekuensinya?',
    formulaHint: 'f = n / t',
    options: ['0,5 Hz', '2 Hz', '10 Hz', '200 Hz'],
    correctIndex: 1,
    explanation: 'f = 20 / 10 = 2 Hz.',
  },
  {
    id: 'hc-2',
    prompt: 'Frekuensi getaran adalah 4 Hz. Berapakah periodenya?',
    formulaHint: 'T = 1 / f',
    options: ['0,25 s', '0,5 s', '2 s', '4 s'],
    correctIndex: 0,
    explanation: 'T = 1 / 4 = 0,25 s.',
  },
  {
    id: 'hc-3',
    prompt: 'Gelombang memiliki λ = 3 m dan f = 5 Hz. Berapa cepat rambatnya?',
    formulaHint: 'v = λ × f',
    options: ['0,6 m/s', '1,67 m/s', '8 m/s', '15 m/s'],
    correctIndex: 3,
    explanation: 'v = 3 × 5 = 15 m/s.',
  },
  {
    id: 'hc-4',
    prompt: 'Pegas berayun 30 kali dengan periode 0,5 s. Berapa waktu totalnya?',
    formulaHint: 't = n × T',
    options: ['15 s', '30,5 s', '60 s', '7,5 s'],
    correctIndex: 0,
    explanation: 't = 30 × 0,5 = 15 s.',
  },
  {
    id: 'hc-5',
    prompt: 'Cepat rambat gelombang 20 m/s dan frekuensinya 4 Hz. Berapa λ-nya?',
    formulaHint: 'λ = v / f',
    options: ['4 m', '5 m', '16 m', '80 m'],
    correctIndex: 1,
    explanation: 'λ = 20 / 4 = 5 m.',
  },
];
