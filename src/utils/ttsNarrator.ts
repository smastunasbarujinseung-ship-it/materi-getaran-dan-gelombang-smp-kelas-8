export interface IndonesianVoiceInfo {
  supported: boolean;
  voice: SpeechSynthesisVoice | null;
  voiceLabel: string;
}

export function isWebSpeechSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined'
  );
}

/**
 * Memilih suara Bahasa Indonesia (id-ID) paling natural yang tersedia di perangkat.
 */
export function selectBestIndonesianVoice(): IndonesianVoiceInfo {
  if (!isWebSpeechSupported()) {
    return {
      supported: false,
      voice: null,
      voiceLabel: 'Tidak tersedia',
    };
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    return {
      supported: true, // API ada, daftar suara mungkin baru dimuat async atau kosong di headless
      voice: null,
      voiceLabel: 'Suara Sistem Default (id-ID)',
    };
  }

  const idVoices = voices.filter((v) => {
    const lang = v.lang.toLowerCase();
    return lang === 'id-id' || lang.startsWith('id-') || lang === 'id';
  });

  if (idVoices.length > 0) {
    const scored = [...idVoices].sort((a, b) => {
      const scoreVoice = (v: SpeechSynthesisVoice) => {
        const name = v.name.toLowerCase();
        let s = 0;
        if (name.includes('google')) s += 40;
        if (name.includes('natural') || name.includes('online')) s += 30;
        if (name.includes('gadis') || name.includes('ardi')) s += 25;
        if (!v.localService) s += 10;
        return s;
      };
      return scoreVoice(b) - scoreVoice(a);
    });
    return {
      supported: true,
      voice: scored[0],
      voiceLabel: scored[0].name,
    };
  }

  return {
    supported: true,
    voice: null,
    voiceLabel: 'Default Perangkat (id-ID)',
  };
}

/**
 * Memperhalus teks rumus agar dibaca alami oleh mesin TTS Bahasa Indonesia.
 */
export function preparePedagogicalSpeechText(raw: string): string {
  return raw
    .replace(/λ/g, 'lambda')
    .replace(/×/g, 'dikali')
    .replace(/\//g, ' dibagi ')
    .replace(/=/g, ' sama dengan ')
    .replace(/\s+/g, ' ')
    .trim();
}
