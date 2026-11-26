export interface WorkedExample {
  title: string;
  problem: string;
  known: string[];
  asked: string;
  formula: string;
  steps: string[];
  answer: string;
}

export interface MateriTopic {
  id: string;
  chapter: 'getaran' | 'gelombang';
  code: string;
  title: string;
  shortTitle: string;
  summary: string;
  analogy: string;
  keyPoints: string[];
  comparisonRows?: { aspect: string; left: string; right: string }[];
  comparisonHeaders?: [string, string, string];
  formulas?: {
    expression: string;
    description: string;
    variables: string[];
  }[];
  workedExample?: WorkedExample;
  visualType:
    | 'getaran-intro'
    | 'amplitudo-bandul'
    | 'periode-demo'
    | 'frekuensi-demo'
    | 'hubungan-t-f'
    | 'penerapan-getaran'
    | 'gelombang-intro'
    | 'gelombang-transversal'
    | 'gelombang-longitudinal'
    | 'besaran-gelombang'
    | 'tabel-perbedaan'
    | 'penerapan-gelombang';
  imageUrl?: string;
  imageAlt?: string;
  narratorScript: string[];
}

export const GETARAN_TOPICS: MateriTopic[] = [
  {
    id: 'getaran-pengertian',
    chapter: 'getaran',
    code: 'A',
    title: 'Pengertian Getaran',
    shortTitle: 'Pengertian Getaran',
    summary:
      'Getaran adalah gerak bolak-balik suatu benda secara teratur (periodik) melalui titik keseimbangannya.',
    analogy:
      'Bayangkan kamu bermain ayunan di taman. Saat diam di tengah, itulah titik keseimbangan. Ketika didorong, ayunan bergerak ke depan, kembali ke tengah, lalu ke belakang secara berulang-ulang dan teratur. Itulah getaran!',
    keyPoints: [
      'Titik keseimbangan adalah posisi diam benda saat tidak ada gaya yang mengganggu (misalnya posisi tengah pada bandul).',
      'Simpangan adalah jarak benda dari titik keseimbangan pada waktu tertentu.',
      'Simpangan maksimum adalah posisi terjauh yang dicapai benda saat bergetar.',
      'Perbedaan gerak biasa dan gerak getaran: mobil melaju di jalan lurus berpindah tempat terus-menerus (gerak translasi), sedangkan benda bergetar selalu bolak-balik melewati titik keseimbangan yang sama.',
      'Contoh nyata getaran: ayunan bandul jam, pegas yang diberi beban, senar gitar yang dipetik, dan penggaris plastik/logam yang dijepit di ujung meja lalu disentil.',
    ],
    visualType: 'getaran-intro',
    imageUrl: '/src/assets/images/ilustrasi_getaran_harian_1795686255068.jpg',
    imageAlt: 'Contoh getaran sehari-hari: ayunan bandul, senar gitar dipetik, dan penggaris di ujung meja',
    narratorScript: [
      'Halo sahabat Fisika! Selamat datang di petualangan materi Getaran dan Gelombang. Santai saja, kita akan belajar pelan-pelan seperti ngobrol bersama guru privatmu.',
      'Pernahkah kamu memetik senar gitar atau bermain ayunan di taman? Saat senar gitar dipetik, senar itu tampak bergerak bolak-balik dengan cepat melewati posisi diamnya.',
      'Dalam fisika, gerak bolak-balik suatu benda secara teratur melalui titik keseimbangan disebut getaran.',
      'Ingat dua syarat pentingnya ya! Pertama, geraknya harus bolak-balik dan teratur. Kedua, harus melewati titik keseimbangan, yaitu posisi saat benda diam tenang.',
      'Ini berbeda dengan mobil yang melaju lurus di jalan raya. Mobil terus menjauh dan tidak bolak-balik melewati titik yang sama, jadi gerak mobil bukan getaran.',
    ],
  },
  {
    id: 'getaran-amplitudo',
    chapter: 'getaran',
    code: 'B',
    title: 'Amplitudo Getaran',
    shortTitle: 'Amplitudo',
    summary:
      'Amplitudo (A) adalah simpangan maksimum atau jarak terjauh benda yang bergetar diukur dari titik keseimbangannya.',
    analogy:
      'Saat kamu mendorong ayunan lebih kuat, ayunan melambung lebih tinggi dari titik tengahnya. Jarak dari titik tengah ke titik tertinggi di sebelah kiri atau kanan itulah yang disebut amplitudo.',
    keyPoints: [
      'Pada bandul A - B - C: posisi B adalah titik keseimbangan, posisi A adalah simpangan maksimum kiri, dan posisi C adalah simpangan maksimum kanan.',
      'Amplitudo diukur dari titik B menuju titik A, atau dari titik B menuju titik C (bukan dari A langsung ke C!).',
      'Satuan amplitudo dalam SI adalah meter (m), namun dalam percobaan kelas sering dinyatakan dalam sentimeter (cm).',
      'Perbedaan amplitudo dan jarak lintasan satu getaran penuh: satu getaran penuh menempuh lintasan A - B - C - B - A, yaitu empat kali jarak amplitudo (4 x A).',
    ],
    visualType: 'amplitudo-bandul',
    narratorScript: [
      'Sekarang kita bahas Amplitudo. Jangan bingung dengan istilahnya ya, amplitudo itu sebenarnya sangat sederhana!',
      'Perhatikan ilustrasi bandul A, B, dan C di layar. Titik B di tengah adalah titik keseimbangan. Titik A di kiri dan titik C di kanan adalah simpangan maksimum.',
      'Nah... amplitudo adalah jarak terjauh dari titik keseimbangan B ke titik A, atau dari B ke C.',
      'Hati-hati! Banyak teman-teman yang keliru mengira amplitudo itu dari ujung kiri A ke ujung kanan C. Padahal dari A ke C itu dua kali amplitudo!',
      'Dan satu getaran penuh berjalan dari A ke B ke C kembali ke B lalu ke A lagi. Jadi jarak total satu getaran adalah empat kali amplitudonya.',
    ],
  },
  {
    id: 'getaran-periode',
    chapter: 'getaran',
    code: 'C',
    title: 'Periode Getaran (T)',
    shortTitle: 'Periode (T)',
    summary:
      'Periode adalah waktu yang dibutuhkan suatu benda untuk melakukan tepat satu kali getaran penuh.',
    analogy:
      'Bayangkan stopwatch di tanganmu. Kamu mulai menekan tombol saat bandul dilepas dari titik A, lalu menghentikannya tepat ketika bandul kembali lagi ke titik A setelah melewati B dan C. Waktu yang tercatat itu adalah periode.',
    keyPoints: [
      'Simbol periode adalah huruf kapital T (dari kata Time), dan satuannya dalam SI adalah sekon (s).',
      'Untuk memperkecil kesalahan pengukuran dengan stopwatch, biasanya kita mengukur waktu t untuk banyak getaran n (misalnya 10 atau 20 getaran), lalu membagi waktu total dengan jumlah getarannya.',
      'Satu getaran penuh selalu bernilai 1, misalnya lintasan A - B - C - B - A, sedangkan setengah getaran adalah A - B - C.',
    ],
    formulas: [
      {
        expression: 'T = t / n',
        description: 'Menghitung periode dari waktu pengamatan dan jumlah getaran',
        variables: [
          'T = periode getaran (sekon, s)',
          't = waktu total pengamatan (sekon, s)',
          'n = jumlah getaran penuh',
        ],
      },
    ],
    workedExample: {
      title: 'Contoh Soal Periode Bandul',
      problem:
        'Sebuah bandul sederhana berayun sebanyak 30 kali getaran penuh dalam waktu 15 sekon. Berapakah periode getaran bandul tersebut?',
      known: ['Jumlah getaran (n) = 30 getaran', 'Waktu total (t) = 15 sekon'],
      asked: 'Periode getaran (T)?',
      formula: 'T = t / n',
      steps: [
        'Masukkan nilai yang diketahui ke dalam rumus: T = 15 sekon / 30',
        'Sederhanakan pembagian: T = 0,5 sekon',
      ],
      answer: 'T = 0,5 s',
    },
    visualType: 'periode-demo',
    narratorScript: [
      'Mari kita berkenalan dengan besaran penting berikutnya, yaitu Periode yang disimbolkan dengan huruf T besar.',
      'Periode artinya waktu yang dibutuhkan untuk menempuh tepat satu getaran penuh. Satuannya adalah sekon atau detik.',
      'Bagaimana cara menghitungnya? Mudah sekali! Gunakan rumus... T sama dengan t dibagi n.',
      'Huruf t kecil adalah waktu total dalam sekon, dan huruf n kecil adalah jumlah getaran yang terjadi.',
      'Misalnya, bandul berayun 30 kali dalam 15 sekon. Maka periodenya adalah 15 dibagi 30, yaitu 0,5 sekon. Artinya, setiap satu ayunan penuh hanya butuh setengah detik.',
    ],
  },
  {
    id: 'getaran-frekuensi',
    chapter: 'getaran',
    code: 'D',
    title: 'Frekuensi Getaran (f)',
    shortTitle: 'Frekuensi (f)',
    summary:
      'Frekuensi adalah banyaknya getaran penuh yang terjadi dalam waktu satu sekon.',
    analogy:
      'Jika penggaris di ujung meja bergetar sangat cepat hingga terdengar dengungan, artinya dalam satu detik ia melakukan banyak sekali getaran. Itulah frekuensi tinggi!',
    keyPoints: [
      'Simbol frekuensi adalah huruf kecil f, dengan satuan internasional Hertz (Hz).',
      '1 Hertz berarti terjadi 1 getaran penuh dalam setiap 1 sekon.',
      'Frekuensi adalah kebalikan dari periode: semakin banyak getaran per detik, semakin singkat waktu tiap satu getarannya.',
    ],
    formulas: [
      {
        expression: 'f = n / t',
        description: 'Menghitung frekuensi dari jumlah getaran dalam waktu tertentu',
        variables: [
          'f = frekuensi getaran (Hertz, Hz)',
          'n = jumlah getaran penuh',
          't = waktu total pengamatan (sekon, s)',
        ],
      },
      {
        expression: 'f = 1 / T   atau   T = 1 / f',
        description: 'Hubungan kebalikan antara frekuensi dan periode',
        variables: ['f = frekuensi (Hz)', 'T = periode (s)'],
      },
    ],
    workedExample: {
      title: 'Contoh Soal Frekuensi Pegas',
      problem:
        'Sebuah pegas bergetar naik-turun sebanyak 60 kali dalam waktu 12 sekon. Tentukan frekuensi dan periode getaran pegas tersebut!',
      known: ['Jumlah getaran (n) = 60', 'Waktu total (t) = 12 s'],
      asked: 'Frekuensi (f) dan Periode (T)?',
      formula: 'f = n / t  dan  T = 1 / f',
      steps: [
        'Hitung frekuensi: f = n / t = 60 / 12 = 5 Hz',
        'Hitung periode: T = 1 / f = 1 / 5 = 0,2 s',
      ],
      answer: 'f = 5 Hz dan T = 0,2 s',
    },
    visualType: 'frekuensi-demo',
    narratorScript: [
      'Kalau tadi periode menanyakan berapa lama waktu untuk satu getaran, sekarang Frekuensi menanyakan kebalikannya: ada berapa banyak getaran dalam satu sekon?',
      'Frekuensi dilambangkan dengan huruf f kecil, dan satuannya adalah Hertz, disingkat Hz.',
      'Rumusnya adalah... f sama dengan n dibagi t. Ingat ya, jangan tertukar dengan periode! Periode itu t per n, sedangkan frekuensi itu n per t.',
      'Contohnya, jika pegas bergetar 60 kali dalam 12 sekon, maka frekuensinya adalah 60 dibagi 12, hasilnya 5 Hertz. Berarti setiap satu detik, pegas naik-turun 5 kali!',
    ],
  },
  {
    id: 'getaran-hubungan',
    chapter: 'getaran',
    code: 'E',
    title: 'Hubungan Periode dan Frekuensi',
    shortTitle: 'Hubungan T & f',
    summary:
      'Periode (T) dan frekuensi (f) berbanding terbalik: jika frekuensi semakin besar, periode semakin kecil, dan sebaliknya.',
    analogy:
      'Bayangkan kamu bertepuk tangan. Jika kamu bertepuk tangan makin cepat (frekuensi besar), jeda waktu di antara dua tepukan pasti makin singkat (periode kecil).',
    keyPoints: [
      'Secara matematis berlaku T × f = 1, sehingga T = 1 / f dan f = 1 / T.',
      'Contoh numerik 1: Jika f = 2 Hz, maka T = 1/2 = 0,5 s.',
      'Contoh numerik 2: Jika f diperbesar menjadi 4 Hz, maka T mengecil menjadi 1/4 = 0,25 s.',
      'Contoh numerik 3: Jika f diperkecil menjadi 0,5 Hz, maka T membesar menjadi 1/0,5 = 2 s.',
    ],
    formulas: [
      {
        expression: 'T = 1 / f   |   f = 1 / T',
        description: 'Hubungan berbanding terbalik antara periode dan frekuensi',
        variables: ['T = periode (s)', 'f = frekuensi (Hz)'],
      },
    ],
    visualType: 'hubungan-t-f',
    narratorScript: [
      'Yuk kita amati grafik interaktif hubungan Periode dan Frekuensi! Coba kamu geser pengatur frekuensinya dan perhatikan apa yang terjadi pada kurva.',
      'Ketika frekuensi diperbesar, misalnya dari 1 Hertz menjadi 5 Hertz, nilai periode justru turun dari 1 sekon menjadi 0,2 sekon.',
      'Artinya, periode dan frekuensi selalu berbanding terbalik! Hasil perkalian T dikali f akan selalu sama dengan 1.',
      'Mudah diingat dengan analogi tepuk tangan: makin cepat kamu bertepuk tangan dalam satu detik, makin sempit waktu untuk satu kali tepukan.',
    ],
  },
  {
    id: 'getaran-penerapan',
    chapter: 'getaran',
    code: 'F',
    title: 'Penerapan Getaran dalam Kehidupan',
    shortTitle: 'Penerapan Getaran',
    summary:
      'Konsep getaran dimanfaatkan di berbagai teknologi mulai dari penunjuk waktu, musik, hingga kenyamanan kendaraan.',
    analogy:
      'Dari jam dinding antik di rumah nenek sampai peredam kejut motor yang membuat jalan berlubang terasa empuk, semuanya bekerja karena prinsip getaran!',
    keyPoints: [
      'Jam Bandul: Memanfaatkan periode bandul yang tetap (isokron) untuk menjaga ketepatan detak detik.',
      'Alat Musik (Gitar, Biola, Piano): Getaran senar menghasilkan bunyi dengan tinggi nada tertentu sesuai frekuensinya.',
      'Suspensi Kendaraan (Shockbreaker & Pegas): Menyerap getaran akibat jalan tidak rata agar penumpang tetap nyaman.',
      'Garpu Tala: Bergetar dengan frekuensi tetap (misalnya 440 Hz untuk nada A) guna menyetem alat musik.',
      'Getaran Mesin & Pegas Industri: Mesin pengayak pasir atau vibrator ponsel memanfaatkan motor eksentrik bergetar, sementara teknisi memantau getaran mesin agar tidak rusak karena resonansi.',
    ],
    visualType: 'penerapan-getaran',
    imageUrl: '/src/assets/images/penerapan_getaran_gelombang_1795686255186.jpg',
    imageAlt: 'Penerapan getaran: garpu tala, suspensi pegas kendaraan, jam bandul, dan speaker',
    narratorScript: [
      'Fisika itu tidak cuma ada di buku tulis, lho! Di sekeliling kita banyak sekali alat canggih yang bekerja memakai konsep getaran.',
      'Pertama, jam bandul mekanik memakai ayunan bandul dengan panjang tali tertentu supaya periodenya tepat satu atau dua detik.',
      'Kedua, pada alat musik seperti gitar dan garpu tala, getaran yang cepat menghasilkan nada tinggi, sedangkan getaran yang lebih lambat menghasilkan nada rendah.',
      'Ketiga, suspensi pegas pada motor dan mobil membantu meredam guncangan jalan agar getaran tidak langsung terasa keras ke tubuh kita.',
    ],
  },
];

export const GELOMBANG_TOPICS: MateriTopic[] = [
  {
    id: 'gelombang-pengertian',
    chapter: 'gelombang',
    code: 'A',
    title: 'Pengertian Gelombang',
    shortTitle: 'Pengertian Gelombang',
    summary:
      'Gelombang adalah getaran yang merambat dari satu tempat ke tempat lain dengan membawa energi, tanpa memindahkan mediumnya secara permanen.',
    analogy:
      'Bayangkan ombak di stadion sepak bola (Mexican wave). Penonton hanya berdiri dan duduk di kursinya masing-masing (bergetar di tempat), tetapi gerakan "ombak" terlihat berjalan mengelilingi seluruh stadion!',
    keyPoints: [
      'Gelombang memindahkan energi, bukan memindahkan partikel mediumnya secara permanen.',
      'Bukti nyata: saat gabus mengapung di kolam yang dilempar batu, riak air berjalan ke tepi kolam, sedangkan gabus hanya bergerak naik-turun di tempatnya.',
      'Berdasarkan medium perambatannya: Gelombang Mekanik memerlukan medium (gelombang tali, air, bunyi), sedangkan Gelombang Elektromagnetik dapat merambat di ruang hampa (gelombang cahaya, radio).',
    ],
    visualType: 'gelombang-intro',
    imageUrl: '/src/assets/images/ilustrasi_gelombang_alam_1795686255177.jpg',
    imageAlt: 'Contoh gelombang: riak air, pegas slinky, dan gelombang pada tali',
    narratorScript: [
      'Sekarang kita masuk ke bagian kedua yang tak kalah seru: Gelombang!',
      'Apa sih bedanya getaran dengan gelombang? Jika kamu menggerakkan ujung tali ke atas dan ke bawah, tanganmu bergetar. Lalu lekukan tali itu berjalan menuju ujung yang lain. Nah, getaran yang merambat itulah yang disebut gelombang!',
      'Prinsip terpenting gelombang adalah: gelombang membawa energi dari satu tempat ke tempat lain, tetapi zat perantaranya tidak ikut berpindah jauh.',
      'Contohnya saat batu jatuh ke kolam. Riak gelombang menyebar sampai ke pinggir, namun daun atau gabus di atas air hanya naik-turun di tempat yang sama.',
    ],
  },
  {
    id: 'gelombang-transversal',
    chapter: 'gelombang',
    code: 'B',
    title: 'Gelombang Transversal',
    shortTitle: 'Transversal',
    summary:
      'Gelombang transversal adalah gelombang yang arah getaran partikelnya tegak lurus terhadap arah rambat gelombangnya.',
    analogy:
      'Saat kamu menggoyangkan tali jemuran ke atas dan ke bawah, gelombang merambat mendatar ke depan. Arah naik-turun dan arah maju membentuk sudut siku-siku (90 derajat).',
    keyPoints: [
      'Terdiri atas Puncak gelombang (titik tertinggi) dan Lembah gelombang (titik terendah).',
      'Garis keseimbangan adalah garis mendatar di tengah saat tali belum digetarkan.',
      'Amplitudo (A) adalah jarak dari garis keseimbangan ke puncak atau ke lembah.',
      'Satu panjang gelombang (1 λ) pada gelombang transversal terdiri dari 1 puncak dan 1 lembah penuh, atau jarak antara dua puncak yang berdekatan.',
      'Contoh: gelombang pada tali, riak permukaan air, dan gelombang cahaya.',
    ],
    visualType: 'gelombang-transversal',
    narratorScript: [
      'Jenis gelombang pertama adalah Gelombang Transversal. Kata kunci yang wajib kamu hafal: arah getarnya tegak lurus terhadap arah rambatnya.',
      'Perhatikan animasi tali di layar! Partikel tali hanya bergerak naik dan turun secara vertikal, sementara bentuk gelombangnya meluncur ke kanan secara horizontal.',
      'Bagian yang melengkung ke atas disebut puncak gelombang, sedangkan bagian yang melengkung ke bawah disebut lembah gelombang.',
      'Satu panjang gelombang, yang dilambangkan dengan huruf Yunani lambda, sama dengan gabungan satu puncak dan satu lembah secara penuh.',
    ],
  },
  {
    id: 'gelombang-longitudinal',
    chapter: 'gelombang',
    code: 'C',
    title: 'Gelombang Longitudinal',
    shortTitle: 'Longitudinal',
    summary:
      'Gelombang longitudinal adalah gelombang yang arah getaran partikelnya sejajar (berimpit) dengan arah rambat gelombangnya.',
    analogy:
      'Bayangkan mainan pegas slinky yang diletakkan di lantai lalu didorong-tarik maju mundur searah panjangnya. Akan terlihat bagian lilitan yang merapat dan merenggang berjalan ke depan.',
    keyPoints: [
      'Tidak memiliki puncak dan lembah, melainkan Rapatan (bagian lilitan pegas atau partikel medium yang berdekatan) dan Renggangan (bagian yang berjauhan).',
      'Satu panjang gelombang (1 λ) pada gelombang longitudinal terdiri atas 1 rapatan penuh dan 1 renggangan penuh, atau jarak antara dua pusat rapatan yang berdekatan.',
      'Contoh paling terkenal: gelombang bunyi di udara dan gelombang pada pegas slinky yang didorong sejajar sumbunya.',
    ],
    visualType: 'gelombang-longitudinal',
    narratorScript: [
      'Sekarang lihat simulasi pegas slinky ini! Kalau ujung pegas kita dorong dan tarik maju-mundur, apa yang terjadi?',
      'Arah getarannya sejajar dengan arah rambat gelombangnya! Inilah yang disebut Gelombang Longitudinal.',
      'Pada gelombang longitudinal kita tidak melihat puncak dan lembah, melainkan daerah yang berdesakan rapat disebut Rapatan, dan daerah yang longgar disebut Renggangan.',
      'Satu panjang gelombang lambda pada slinky adalah jarak satu rapatan penuh ditambah satu renggangan penuh. Gelombang bunyi yang kamu dengar sekarang merambat di udara sebagai gelombang longitudinal lho!',
    ],
  },
  {
    id: 'gelombang-besaran',
    chapter: 'gelombang',
    code: 'D',
    title: 'Besaran-Besaran Gelombang',
    shortTitle: 'Besaran & Rumus',
    summary:
      'Cepat rambat gelombang (v) bergantung pada panjang gelombang (λ) dan frekuensi (f) atau periode (T).',
    analogy:
      'Jika setiap langkah kakimu panjangnya λ (meter), dan dalam 1 detik kamu melangkah sebanyak f kali, maka jarak yang kamu tempuh tiap detik (kecepatan v) adalah panjang langkah dikali jumlah langkah per detik!',
    keyPoints: [
      'Panjang gelombang (λ): jarak yang ditempuh oleh satu gelombang penuh dalam satuan meter (m).',
      'Periode (T): waktu untuk menempuh satu gelombang penuh (sekon, s).',
      'Frekuensi (f): banyaknya gelombang penuh yang terbentuk tiap sekon (Hz).',
      'Cepat rambat gelombang (v): jarak yang ditempuh gelombang tiap satuan waktu (m/s).',
    ],
    formulas: [
      {
        expression: 'v = λ × f',
        description: 'Menghitung cepat rambat gelombang dari panjang gelombang dan frekuensi',
        variables: [
          'v = cepat rambat gelombang (m/s)',
          'λ = panjang gelombang (m)',
          'f = frekuensi gelombang (Hz)',
        ],
      },
      {
        expression: 'v = λ / T',
        description: 'Menghitung cepat rambat gelombang menggunakan periode',
        variables: [
          'v = cepat rambat gelombang (m/s)',
          'λ = panjang gelombang (m)',
          'T = periode gelombang (s)',
        ],
      },
    ],
    workedExample: {
      title: 'Contoh Soal Cepat Rambat Gelombang',
      problem:
        'Sebuah gelombang pada tali memiliki panjang gelombang 2,5 m dan frekuensi 4 Hz. Berapakah cepat rambat gelombang tali tersebut?',
      known: ['Panjang gelombang (λ) = 2,5 m', 'Frekuensi (f) = 4 Hz'],
      asked: 'Cepat rambat gelombang (v)?',
      formula: 'v = λ × f',
      steps: [
        'Substitusi nilai ke rumus: v = 2,5 m × 4 Hz',
        'Hitung hasil perkalian: v = 10 m/s',
      ],
      answer: 'v = 10 m/s',
    },
    visualType: 'besaran-gelombang',
    narratorScript: [
      'Sekarang mari kita gabungkan semua besaran gelombang ke dalam satu rumus utama yang super berguna!',
      'Untuk mencari seberapa cepat gelombang merambat, atau simbolnya v kecil dalam satuan meter per sekon, kita gunakan rumus... v sama dengan lambda dikali f.',
      'Atau karena f itu sama dengan 1 per T, rumusnya juga bisa ditulis... v sama dengan lambda dibagi T.',
      'Cara mudah mengingatnya seperti langkah kaki: kalau satu panjang gelombang lambda adalah 2,5 meter, dan setiap detik muncul 4 gelombang, berarti dalam satu detik gelombang sudah berjalan sejauh 2,5 dikali 4, yaitu 10 meter per sekon!',
    ],
  },
  {
    id: 'gelombang-perbedaan',
    chapter: 'gelombang',
    code: 'E',
    title: 'Perbedaan Transversal dan Longitudinal',
    shortTitle: 'Perbandingan',
    summary:
      'Perbedaan utama kedua jenis gelombang terletak pada arah getarnya relatif terhadap arah rambat serta bentuk karakteristiknya.',
    analogy:
      'Transversal ibarat kibaran bendera naik-turun saat angin bertiup mendatar, sedangkan longitudinal ibarat gerbong kereta yang saling dorong-mendorong maju mundur di atas rel lurus.',
    keyPoints: [
      'Keduanya sama-sama memindahkan energi tanpa memindahkan medium secara permanen.',
      'Keduanya memenuhi rumus cepat rambat yang sama: v = λ × f.',
      'Perbedaan paling jelas tampak pada arah getar partikel dan cara menentukan 1 panjang gelombang (λ).',
    ],
    comparisonHeaders: ['Aspek Pembanding', 'Gelombang Transversal', 'Gelombang Longitudinal'],
    comparisonRows: [
      {
        aspect: 'Arah getaran',
        left: 'Tegak lurus arah rambat',
        right: 'Sejajar arah rambat',
      },
      {
        aspect: 'Ciri utama bentuk',
        left: 'Puncak dan lembah',
        right: 'Rapatan dan renggangan',
      },
      {
        aspect: 'Definisi 1 λ',
        left: '1 puncak + 1 lembah penuh',
        right: '1 rapatan + 1 renggangan penuh',
      },
      {
        aspect: 'Contoh nyata',
        left: 'Gelombang pada tali, riak air, cahaya',
        right: 'Gelombang bunyi di udara, pegas slinky',
      },
    ],
    visualType: 'tabel-perbedaan',
    narratorScript: [
      'Supaya kamu tidak tertukar saat ujian nanti, yuk kita bandingkan langsung Gelombang Transversal dan Longitudinal!',
      'Ingat tiga pasangan pembeda utamanya. Pertama, arah getaran: transversal tegak lurus, longitudinal sejajar.',
      'Kedua, ciri bentuknya: transversal membentuk puncak dan lembah, sedangkan longitudinal membentuk rapatan dan renggangan.',
      'Ketiga, contohnya: tali dan cahaya adalah transversal, sedangkan suara yang kita dengar sehari-hari adalah gelombang longitudinal.',
    ],
  },
  {
    id: 'gelombang-penerapan',
    chapter: 'gelombang',
    code: 'F',
    title: 'Penerapan Gelombang dalam Alam dan Teknologi',
    shortTitle: 'Penerapan Gelombang',
    summary:
      'Gelombang hadir dalam fenomena alam seperti air laut dan gempa bumi hingga teknologi komunikasi, medis, dan suara.',
    analogy:
      'Setiap kali kamu mendengarkan musik dari speaker, melihat cahaya matahari, atau menerima pesan di ponsel, semuanya diantar oleh gelombang!',
    keyPoints: [
      'Gelombang Air: Riak dan ombak laut membawa energi angin di permukaan laut.',
      'Gelombang Bunyi: Getaran speaker menekan dan merenggangkan udara menuju gendang telinga kita; juga dimanfaatkan pada USG medis dan sonar kapal.',
      'Gelombang pada Tali: Membantu memahami transfer energi mekanik dan gelombang berdiri pada alat musik.',
      'Gelombang Gempa (Seismik): Pergeseran lempeng bumi merambatkan gelombang P (longitudinal) dan gelombang S (transversal) yang dicatat seismograf.',
      'Gelombang Cahaya: Gelombang elektromagnetik transversal yang memungkinkan kita melihat warna dan benda di sekitar.',
    ],
    visualType: 'penerapan-gelombang',
    imageUrl: '/src/assets/images/hero_fisika_waves_1795686255068.jpg',
    imageAlt: 'Ilustrasi konsep getaran dan gelombang fisika di laboratorium modern',
    narratorScript: [
      'Luar biasa ya! Ternyata seluruh alam semesta dipenuhi gelombang, dari gelombang air laut sampai cahaya bintang.',
      'Pada alat pengeras suara atau speaker, membran bergetar sehingga memicu rapatan dan renggangan udara sebagai gelombang bunyi menuju telingamu.',
      'Para ahli geologi juga mempelajari gelombang gempa bumi yang merambat di dalam kerak bumi untuk mendeteksi pusat gempa lebih dini.',
      'Selamat! Kamu sudah menuntaskan seluruh materi inti Getaran dan Gelombang. Jangan lupa tandai topik selesai dan coba simulasinya di Laboratorium Virtual!',
    ],
  },
];

export const ALL_MATERI_TOPICS = [...GETARAN_TOPICS, ...GELOMBANG_TOPICS];
