import type { QuizQuestion } from '../physics/formulas';

export const GETARAN_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    category: 'getaran',
    topicTag: 'Pengertian Getaran',
    question:
      'Perhatikan peristiwa gerak benda berikut ini. Manakah peristiwa yang merupakan contoh gerak getaran yang tepat?',
    options: [
      'Mobil yang melaju lurus dengan kecepatan tetap di jalan tol',
      'Penggaris plastik yang dijepit salah satu ujungnya di meja lalu disentil hingga bergerak bolak-balik',
      'Buah mangga yang jatuh bebas dari pohonnya ke tanah',
      'Jarum jam dinding yang terus berputar searah jarum jam',
    ],
    correctIndex: 1,
    calculationSteps: [
      'Syarat getaran adalah gerak bolak-balik secara teratur melalui titik keseimbangan.',
      'Penggaris yang dijepit dan disentil bergerak bolak-balik melewati posisi diamnya (titik keseimbangan).',
    ],
    explanation:
      'Mobil melaju lurus dan buah mangga jatuh merupakan gerak lurus (translasi), bukan bolak-balik. Jarum jam adalah gerak melingkar beraturan satu arah. Hanya penggaris yang disentil yang bergetar bolak-balik melalui titik keseimbangan.',
    finalAnswerWithUnit: 'B. Penggaris plastik yang dijepit lalu disentil',
    narratorFeedback:
      'Ingat ya, kunci getaran selalu gerak bolak-balik secara teratur melewati titik keseimbangan!',
  },
  {
    id: 2,
    category: 'getaran',
    topicTag: 'Satu Getaran Penuh Bandul',
    stimulusType: 'pendulum-abc',
    stimulusCaption:
      'Bandul berayun antara titik A (kiri), titik B (tengah/keseimbangan), dan titik C (kanan).',
    question:
      'Sebuah bandul sederhana dilepaskan dari titik A melewati titik B dan titik C seperti pada gambar. Urutan lintasan yang menyatakan tepat 1 getaran penuh adalah...',
    options: [
      'A - B - C',
      'B - C - B',
      'A - B - C - B - A',
      'A - B - C - B',
    ],
    correctIndex: 2,
    calculationSteps: [
      'Satu getaran penuh berarti benda berangkat dari satu titik dan kembali ke titik awal tersebut dalam arah gerak yang sama setelah melewati seluruh lintasan.',
      'Jika dimulai dari titik A: A -> B (1/4) -> C (2/4) -> B (3/4) -> A (4/4 = 1 getaran penuh).',
    ],
    explanation:
      'Lintasan A - B - C baru menempuh setengah (0,5) getaran. Lintasan A - B - C - B menempuh 3/4 getaran. Satu getaran penuh dimulai dari A dan kembali ke A melalui B dan C, yaitu A - B - C - B - A.',
    finalAnswerWithUnit: 'C. A - B - C - B - A',
    narratorFeedback:
      'Bagus! Satu getaran penuh dari ujung A harus kembali lagi ke ujung A setelah melewati B dan C.',
  },
  {
    id: 3,
    category: 'getaran',
    topicTag: 'Amplitudo Getaran',
    stimulusType: 'pendulum-abc',
    stimulusCaption:
      'Diketahui jarak lengkungan dari ujung kiri A ke ujung kanan C adalah 16 cm.',
    question:
      'Pada sebuah ayunan bandul, jarak antara titik simpangan terjauh kiri (A) dan titik simpangan terjauh kanan (C) adalah 16 cm. Berapakah besar amplitudo getaran bandul tersebut?',
    options: ['4 cm', '8 cm', '16 cm', '32 cm'],
    correctIndex: 1,
    formula: 'A = (jarak A ke C) / 2',
    calculationSteps: [
      'Jarak dari titik A ke titik C melewati titik keseimbangan B sama dengan 2 kali amplitudo.',
      'Amplitudo (A) = jarak dari titik B ke A atau B ke C.',
      'A = 16 cm / 2 = 8 cm.',
    ],
    explanation:
      'Amplitudo adalah simpangan terjauh yang diukur dari titik keseimbangan (B), bukan dari ujung ke ujung. Karena B tepat di tengah antara A dan C, maka amplitudonya separuh dari 16 cm, yaitu 8 cm.',
    finalAnswerWithUnit: '8 cm',
    narratorFeedback:
      'Hati-hati membedakan jarak ujung-ke-ujung dengan amplitudo! Amplitudo selalu diukur dari titik keseimbangan di tengah.',
  },
  {
    id: 4,
    category: 'getaran',
    topicTag: 'Periode Getaran',
    question:
      'Dina mengamati sebuah ayunan taman yang bergerak bolak-balik sebanyak 15 getaran penuh dalam waktu 30 sekon. Berapakah periode ayunan tersebut?',
    options: ['0,5 s', '2 s', '15 s', '45 s'],
    correctIndex: 1,
    formula: 'T = t / n',
    calculationSteps: [
      'Diketahui: n = 15 getaran, t = 30 sekon.',
      'Gunakan rumus periode: T = t / n',
      'T = 30 s / 15 = 2 s.',
    ],
    explanation:
      'Periode (T) adalah waktu untuk 1 getaran penuh. Karena 15 getaran membutuhkan 30 sekon, maka 1 getaran membutuhkan waktu 30 / 15 = 2 sekon.',
    finalAnswerWithUnit: '2 s',
    narratorFeedback:
      'Tepat sekali! Periode sama dengan waktu dibagi jumlah getaran, sehingga satuannya sekon.',
  },
  {
    id: 5,
    category: 'getaran',
    topicTag: 'Frekuensi Getaran',
    question:
      'Sebuah senar gitar bergetar sebanyak 400 kali dalam waktu 2 sekon. Berapakah frekuensi getaran senar gitar tersebut?',
    options: ['0,005 Hz', '200 Hz', '400 Hz', '800 Hz'],
    correctIndex: 1,
    formula: 'f = n / t',
    calculationSteps: [
      'Diketahui: n = 400 getaran, t = 2 sekon.',
      'Gunakan rumus frekuensi: f = n / t',
      'f = 400 / 2 = 200 Hz.',
    ],
    explanation:
      'Frekuensi adalah banyaknya getaran dalam 1 sekon. Dalam 2 sekon terjadi 400 getaran, berarti dalam 1 sekon terjadi 400 / 2 = 200 getaran (200 Hz).',
    finalAnswerWithUnit: '200 Hz',
    narratorFeedback:
      'Mantap! Frekuensi menunjukkan banyaknya getaran setiap detik dalam satuan Hertz.',
  },
  {
    id: 6,
    category: 'getaran',
    topicTag: 'Hubungan Periode dan Frekuensi',
    question:
      'Sebuah garpu tala bergetar dengan frekuensi 250 Hz. Berapakah periode getaran garpu tala tersebut?',
    options: ['0,004 s', '0,04 s', '0,25 s', '2,5 s'],
    correctIndex: 0,
    formula: 'T = 1 / f',
    calculationSteps: [
      'Diketahui: f = 250 Hz.',
      'Gunakan hubungan periode dan frekuensi: T = 1 / f',
      'T = 1 / 250 = 4 / 1000 = 0,004 s.',
    ],
    explanation:
      'Periode berbanding terbalik dengan frekuensi (T = 1 / f). Nilai 1 dibagi 250 sama dengan 0,004 sekon.',
    finalAnswerWithUnit: '0,004 s',
    narratorFeedback:
      'Keren! Semakin tinggi frekuensi garpu tala, semakin kecil nilai periodenya.',
  },
  {
    id: 7,
    category: 'getaran',
    topicTag: 'Menghitung Jumlah Getaran',
    question:
      'Sebuah pegas bergetar dengan frekuensi 5 Hz selama 12 sekon. Berapakah jumlah getaran yang dilakukan pegas tersebut?',
    options: ['2,4 getaran', '17 getaran', '60 getaran', '120 getaran'],
    correctIndex: 2,
    formula: 'n = f × t',
    calculationSteps: [
      'Diketahui: f = 5 Hz, t = 12 sekon.',
      'Dari rumus f = n / t, diperoleh n = f × t.',
      'n = 5 × 12 = 60 getaran.',
    ],
    explanation:
      'Frekuensi 5 Hz artinya terjadi 5 getaran tiap 1 sekon. Selama 12 sekon, total getaran adalah 5 × 12 = 60 getaran.',
    finalAnswerWithUnit: '60 getaran',
    narratorFeedback:
      'Benar! Kalau dalam 1 detik ada 5 getaran, maka dalam 12 detik tentu ada 60 getaran.',
  },
  {
    id: 8,
    category: 'getaran',
    topicTag: 'Menghitung Waktu Getaran',
    question:
      'Suatu bandul memiliki periode 0,4 s. Berapakah waktu yang diperlukan bandul untuk melakukan 25 kali getaran penuh?',
    options: ['6,25 s', '10 s', '25,4 s', '62,5 s'],
    correctIndex: 1,
    formula: 't = n × T',
    calculationSteps: [
      'Diketahui: T = 0,4 s, n = 25 getaran.',
      'Dari rumus T = t / n, diperoleh t = n × T.',
      't = 25 × 0,4 s = 10 s.',
    ],
    explanation:
      'Satu getaran membutuhkan waktu 0,4 sekon. Jadi 25 getaran membutuhkan waktu 25 × 0,4 = 10 sekon.',
    finalAnswerWithUnit: '10 s',
    narratorFeedback:
      'Hebat! Kamu sudah lancar membalik rumus T = t/n untuk mencari waktu t.',
  },
  {
    id: 9,
    category: 'getaran',
    topicTag: 'Analisis Hasil Percobaan Bandul',
    question:
      'Raka melakukan dua percobaan bandul sederhana dengan massa beban dan sudut simpangan sama (10 derajat). Pada percobaan I panjang tali 25 cm menghasilkan periode 1,0 s. Pada percobaan II panjang tali diubah menjadi 100 cm. Kesimpulan yang paling tepat adalah...',
    options: [
      'Periode pada percobaan II tetap 1,0 s karena massa beban tidak berubah',
      'Periode pada percobaan II lebih kecil dari 1,0 s karena tali lebih panjang',
      'Periode pada percobaan II menjadi lebih besar dari 1,0 s (sekitar 2,0 s)',
      'Frekuensi percobaan II menjadi dua kali lebih besar daripada percobaan I',
    ],
    correctIndex: 2,
    formula: 'T = 2π √(L / g)',
    calculationSteps: [
      'Periode bandul sederhana bergantung pada panjang tali (L) dan percepatan gravitasi (g), bukan massa beban.',
      'Semakin panjang tali, semakin besar periodenya (sebanding dengan akar panjang tali).',
      'Ketika panjang tali menjadi 4 kali lipat (25 cm -> 100 cm), periode menjadi √4 = 2 kali lipat, yaitu 2,0 s.',
    ],
    explanation:
      'Dalam percobaan bandul sederhana, memperpanjang tali membuat ayunan berjalan lebih lambat sehingga waktunya (periode T) bertambah besar. Ketika panjang tali naik 4 kali, periode naik 2 kali lipat.',
    finalAnswerWithUnit: 'C. Periode percobaan II lebih besar (sekitar 2,0 s)',
    narratorFeedback:
      'Analisis percobaanmu sangat bagus! Kamu bisa membuktikannya langsung di Laboratorium Virtual Bandul!',
  },
  {
    id: 10,
    category: 'getaran',
    topicTag: 'Penalaran Kontekstual Getaran',
    question:
      'Jam bandul tua di ruang tamu berdetak sedikit lebih lambat dari jam sebenarnya (terlambat beberapa menit setiap hari). Agar periode ayunan bandul menjadi sedikit lebih cepat (periode mengecil), tindakan tepat yang harus dilakukan adalah...',
    options: [
      'Menggeser beban bandul ke atas sehingga panjang tali efektif lebih pendek',
      'Menggeser beban bandul ke bawah sehingga panjang tali efektif lebih panjang',
      'Mengganti beban bandul dengan logam yang dua kali lebih berat',
      'Memperbesar sudut dorongan awal bandul agar ayunan lebih lebar',
    ],
    correctIndex: 0,
    calculationSteps: [
      'Jam terlambat berarti satu ayunan memakan waktu terlalu lama (periode T terlalu besar).',
      'Untuk memperkecil periode T, panjang tali efektif bandul harus diperpendek.',
      'Mengganti massa beban atau sedikit mengubah sudut tidak mengubah periode bandul sederhana secara berarti.',
    ],
    explanation:
      'Karena periode bandul berbanding lurus dengan akar panjang tali, menggeser beban ke atas memperpendek jarak dari titik tumpu ke pusat beban. Akibatnya periode mengecil dan jam berdetak lebih cepat mengejar ketertinggalan.',
    finalAnswerWithUnit: 'A. Menggeser beban bandul ke atas (memperpendek tali)',
    narratorFeedback:
      'Penalaran fisika kelas atas! Itulah cara pembuat jam mekanik menyetel ketepatan waktu jam bandul.',
  },
];

export const GELOMBANG_QUIZ: QuizQuestion[] = [
  {
    id: 1,
    category: 'gelombang',
    topicTag: 'Pengertian Gelombang',
    stimulusType: 'water-ripple-boat',
    stimulusCaption:
      'Sebuah perahu kertas mengapung di kolam tenang saat batu dijatuhkan di dekatnya.',
    question:
      'Ketika batu dijatuhkan ke kolam, terbentuk riak gelombang air yang menyebar ke tepi kolam. Perahu kertas kecil yang mengapung di permukaan air tampak hanya bergerak naik-turun di tempat. Peristiwa ini membuktikan bahwa...',
    options: [
      'Gelombang memindahkan seluruh massa air dari tengah ke tepi kolam',
      'Gelombang adalah getaran yang merambat dan hanya memindahkan energi tanpa memindahkan medium secara permanen',
      'Gelombang air tidak memiliki energi saat menjauhi sumber getaran',
      'Air kolam tidak dapat menghantarkan getaran mekanik',
    ],
    correctIndex: 1,
    calculationSteps: [
      'Riak gelombang bergerak maju menuju tepi kolam membawa energi dari batu yang jatuh.',
      'Partikel air (dan perahu kertas di atasnya) hanya bergetar naik-turun di sekitar posisi keseimbangannya.',
    ],
    explanation:
      'Gelombang merambatkan energi getaran melewati medium. Partikel medium hanya bergetar di tempatnya tanpa ikut berpindah mengikuti arah rambat gelombang.',
    finalAnswerWithUnit: 'B. Gelombang merambatkan energi tanpa memindahkan medium',
    narratorFeedback:
      'Benar! Gelombang membawa energi, sedangkan perahu kertas cukup menjadi saksi bahwa airnya tidak ikut pindah ke tepi.',
  },
  {
    id: 2,
    category: 'gelombang',
    topicTag: 'Identifikasi Gelombang Transversal',
    question:
      'Seutas tali digerakkan naik-turun secara beraturan sehingga terbentuk gelombang yang merambat ke arah depan. Gelombang pada tali tersebut termasuk gelombang transversal karena...',
    options: [
      'Merambat hanya melalui ruang hampa udara',
      'Memiliki bagian rapatan dan renggangan yang berjalan sejajar',
      'Arah getaran partikel tali tegak lurus dengan arah rambat gelombangnya',
      'Kecepatan rambatnya tidak dipengaruhi panjang gelombang',
    ],
    correctIndex: 2,
    calculationSteps: [
      'Gerakan tangan: naik-turun (vertikal).',
      'Arah rambat gelombang: ke depan (horizontal).',
      'Vertikal dan horizontal membentuk sudut 90 derajat (tegak lurus), yang merupakan ciri khas gelombang transversal.',
    ],
    explanation:
      'Definisi gelombang transversal adalah gelombang yang arah getaran partikelnya tegak lurus terhadap arah rambatnya.',
    finalAnswerWithUnit: 'C. Arah getar tegak lurus arah rambat',
    narratorFeedback:
      'Tepat! Vertikal naik-turun dan horizontal ke depan selalu membentuk sudut tegak lurus.',
  },
  {
    id: 3,
    category: 'gelombang',
    topicTag: 'Identifikasi Gelombang Longitudinal',
    question:
      'Manakah kelompok gelombang berikut yang seluruhnya termasuk gelombang longitudinal?',
    options: [
      'Gelombang tali dan gelombang cahaya',
      'Gelombang bunyi di udara dan gelombang dorongan pada pegas slinky',
      'Gelombang permukaan air dan gelombang radio',
      'Gelombang sinar matahari dan gelombang tali gitar',
    ],
    correctIndex: 1,
    calculationSteps: [
      'Gelombang cahaya dan radio adalah gelombang elektromagnetik transversal.',
      'Gelombang tali dan riak air adalah gelombang transversal.',
      'Gelombang bunyi di udara dan slinky yang didorong-tarik searah sumbunya merambat lewat rapatan dan renggangan (longitudinal).',
    ],
    explanation:
      'Gelombang bunyi di udara dan gelombang pada pegas slinky yang digetarkan maju-mundur memiliki arah getar sejajar arah rambat, sehingga keduanya adalah gelombang longitudinal.',
    finalAnswerWithUnit: 'B. Gelombang bunyi di udara dan gelombang pegas slinky',
    narratorFeedback:
      'Hebat! Ingat pasangan andalan gelombang longitudinal: bunyi di udara dan slinky yang didorong sejajar.',
  },
  {
    id: 4,
    category: 'gelombang',
    topicTag: 'Puncak dan Lembah Gelombang',
    question:
      'Pada sebuah tali terbentuk 2 puncak gelombang dan 2 lembah gelombang secara berturut-turut. Berapa banyak jumlah gelombang penuh yang terbentuk pada tali tersebut?',
    options: ['1 gelombang', '2 gelombang', '3 gelombang', '4 gelombang'],
    correctIndex: 1,
    formula: '1 gelombang = 1 puncak + 1 lembah',
    calculationSteps: [
      'Setiap 1 gelombang transversal penuh terdiri atas 1 puncak dan 1 lembah.',
      'Jika terdapat 2 puncak dan 2 lembah, maka jumlah gelombangnya = 2 gelombang penuh.',
    ],
    explanation:
      'Satu gelombang transversal didefinisikan sebagai gabungan satu puncak dan satu lembah. Maka 2 puncak + 2 lembah sama dengan 2 gelombang.',
    finalAnswerWithUnit: '2 gelombang',
    narratorFeedback:
      'Mudah bukan? Satu puncak ditambah satu lembah selalu dihitung satu gelombang utuh.',
  },
  {
    id: 5,
    category: 'gelombang',
    topicTag: 'Rapatan dan Renggangan',
    stimulusType: 'longitudinal-slinky-60cm',
    stimulusCaption:
      'Sebuah pegas slinky sepanjang 60 cm digetarkan sejajar sumbunya sehingga tampak pola rapatan dan renggangan.',
    question:
      'Pada pegas slinky sepanjang 60 cm terbentuk 3 rapatan dan 3 renggangan secara berurutan. Berapakah panjang satu gelombang (λ) pada slinky tersebut?',
    options: ['10 cm', '20 cm', '30 cm', '60 cm'],
    correctIndex: 1,
    formula: 'λ = panjang total / jumlah gelombang (n)',
    calculationSteps: [
      '1 gelombang longitudinal = 1 rapatan + 1 renggangan.',
      'Karena terdapat 3 rapatan dan 3 renggangan, jumlah gelombang n = 3.',
      'Panjang 1 gelombang: λ = 60 cm / 3 = 20 cm.',
    ],
    explanation:
      'Tiga rapatan dan tiga renggangan membentuk 3 gelombang penuh. Dengan panjang total 60 cm, setiap 1 gelombang panjangnya 60 / 3 = 20 cm.',
    finalAnswerWithUnit: '20 cm',
    narratorFeedback:
      'Cermat sekali! Satu rapatan plus satu renggangan sama dengan satu panjang gelombang longitudinal.',
  },
  {
    id: 6,
    category: 'gelombang',
    topicTag: 'Menentukan Panjang Gelombang dari Ilustrasi',
    stimulusType: 'transverse-wave-6m',
    stimulusCaption:
      'Perhatikan ilustrasi gelombang transversal pada tali dengan jarak total ujung ke ujung 6 meter.',
    question:
      'Berdasarkan ilustrasi gelombang transversal sepanjang 6 m di atas, berapakah panjang gelombang (λ) tali tersebut?',
    options: ['1,5 m', '2 m', '3 m', '4 m'],
    correctIndex: 2,
    formula: 'λ = jarak total / jumlah gelombang (n)',
    calculationSteps: [
      'Hitung jumlah gelombang pada gambar: terdapat 2 puncak dan 2 lembah penuh (n = 2 gelombang).',
      'Jarak total untuk 2 gelombang = 6 m.',
      'λ = 6 m / 2 = 3 m.',
    ],
    explanation:
      'Dari ilustrasi terlihat dua gelombang penuh (2 puncak dan 2 lembah) menempati jarak 6 m. Jadi panjang 1 gelombang adalah 6 m dibagi 2, yaitu 3 m.',
    finalAnswerWithUnit: '3 m',
    narratorFeedback:
      'Mantap! Cara terbaik membaca gambar gelombang adalah menghitung dulu berapa puncak dan lembah yang terbentuk.',
  },
  {
    id: 7,
    category: 'gelombang',
    topicTag: 'Frekuensi dan Periode Gelombang',
    stimulusType: 'transverse-wave-2s',
    stimulusCaption:
      'Gelombang transversal di atas terbentuk dalam waktu tempuh total 2 sekon.',
    question:
      'Jika rangkaian gelombang pada gambar di atas terbentuk dalam waktu 2 sekon, berapakah frekuensi (f) dan periode (T) gelombang tersebut secara berurutan?',
    options: [
      'f = 0,5 Hz dan T = 2 s',
      'f = 1,5 Hz dan T = 0,67 s',
      'f = 2 Hz dan T = 0,5 s',
      'f = 3 Hz dan T = 0,33 s',
    ],
    correctIndex: 1,
    formula: 'f = n / t  dan  T = t / n',
    calculationSteps: [
      'Amati gambar gelombang: terbentuk 3 puncak dan 3 lembah penuh, sehingga jumlah gelombang n = 3.',
      'Waktu tempuh total t = 2 sekon.',
      'Frekuensi: f = n / t = 3 / 2 = 1,5 Hz.',
      'Periode: T = t / n = 2 / 3 ≈ 0,67 s.',
    ],
    explanation:
      'Pada stimulus terdapat 3 gelombang penuh (3 puncak dan 3 lembah) dalam waktu 2 sekon. Maka f = 3 / 2 = 1,5 Hz dan periode T = 2 / 3 ≈ 0,67 s.',
    finalAnswerWithUnit: 'f = 1,5 Hz dan T = 0,67 s',
    narratorFeedback:
      'Ketelitian membaca jumlah gelombang pada grafik adalah kunci keberhasilan soal seperti ini!',
  },
  {
    id: 8,
    category: 'gelombang',
    topicTag: 'Menghitung Cepat Rambat Gelombang',
    question:
      'Sebuah gelombang air laut memiliki panjang gelombang 4 m dan frekuensi 2,5 Hz. Berapakah cepat rambat gelombang air laut tersebut?',
    options: ['1,6 m/s', '6,5 m/s', '10 m/s', '16 m/s'],
    correctIndex: 2,
    formula: 'v = λ × f',
    calculationSteps: [
      'Diketahui: λ = 4 m, f = 2,5 Hz.',
      'Gunakan rumus cepat rambat gelombang: v = λ × f',
      'v = 4 m × 2,5 Hz = 10 m/s.',
    ],
    explanation:
      'Cepat rambat gelombang adalah hasil perkalian panjang gelombang dengan frekuensinya: 4 × 2,5 = 10 m/s.',
    finalAnswerWithUnit: '10 m/s',
    narratorFeedback:
      'Sempurna! Rumus v = lambda dikali f berhasil kamu gunakan dengan tepat.',
  },
  {
    id: 9,
    category: 'gelombang',
    topicTag: 'Hubungan Panjang Gelombang dan Frekuensi',
    question:
      'Seutas tali yang tegangannya tetap digetarkan sehingga cepat rambat gelombang pada tali selalu 12 m/s. Jika frekuensi getaran tangan diperbesar dari 2 Hz menjadi 4 Hz, bagaimana perubahan panjang gelombangnya?',
    options: [
      'Panjang gelombang tetap 6 m',
      'Panjang gelombang bertambah menjadi 12 m',
      'Panjang gelombang berkurang dari 6 m menjadi 3 m',
      'Panjang gelombang berkurang menjadi 1,5 m',
    ],
    correctIndex: 2,
    formula: 'λ = v / f',
    calculationSteps: [
      'Saat f1 = 2 Hz dengan v = 12 m/s: λ1 = 12 / 2 = 6 m.',
      'Saat f2 = 4 Hz dengan v tetap 12 m/s: λ2 = 12 / 4 = 3 m.',
      'Jadi ketika frekuensi digandakan pada medium yang sama (v tetap), panjang gelombang mengecil menjadi setengahnya.',
    ],
    explanation:
      'Pada medium yang sama (cepat rambat v tetap), frekuensi berbanding terbalik dengan panjang gelombang. Jika f naik 2 kali (2 Hz -> 4 Hz), maka λ turun menjadi setengahnya (6 m -> 3 m).',
    finalAnswerWithUnit: 'C. Berkurang dari 6 m menjadi 3 m',
    narratorFeedback:
      'Hebat! Ketika v tetap, makin tinggi frekuensi getarannya, jarak antar puncak gelombangnya makin rapat (λ mengecil).',
  },
  {
    id: 10,
    category: 'gelombang',
    topicTag: 'Penalaran Kontekstual Gelombang',
    question:
      'Dua perahu nelayan berjarak 12 meter satu sama lain di laut. Saat gelombang laut melintas, terlihat ada 2 lembah dan 3 puncak gelombang tepat di antara kedua perahu (perahu pertama berada di puncak ke-1 dan perahu kedua di puncak ke-3). Jika waktu yang dibutuhkan satu gelombang untuk melintas adalah 2 sekon, berapakah cepat rambat gelombang laut tersebut?',
    options: ['3 m/s', '4 m/s', '6 m/s', '12 m/s'],
    correctIndex: 0,
    formula: 'λ = jarak / n  dan  v = λ / T',
    calculationSteps: [
      'Perahu 1 di puncak ke-1 dan Perahu 2 di puncak ke-3, di antaranya ada 2 lembah.',
      'Dari puncak ke-1 ke puncak ke-3 terdapat n = 2 gelombang penuh.',
      'Hitung panjang gelombang: λ = 12 m / 2 = 6 m.',
      'Diketahui periode T = 2 s, maka cepat rambat v = λ / T = 6 m / 2 s = 3 m/s.',
    ],
    explanation:
      'Jarak antara puncak ke-1 sampai puncak ke-3 selalu sama dengan 2 panjang gelombang (2λ = 12 m, sehingga λ = 6 m). Dengan periode 2 sekon, cepat rambatnya adalah 6 / 2 = 3 m/s.',
    finalAnswerWithUnit: '3 m/s',
    narratorFeedback:
      'Luar biasa! Soal cerita perahu nelayan ini sering keluar di ujian, dan kamu bisa memecahkannya langkah demi langkah.',
  },
];
