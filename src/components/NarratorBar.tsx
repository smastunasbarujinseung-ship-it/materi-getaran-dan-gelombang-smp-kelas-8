import { useEffect, useRef, useState } from 'react';
import { Volume2, Play, Pause, Square, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import {
  isWebSpeechSupported,
  preparePedagogicalSpeechText,
  selectBestIndonesianVoice,
} from '../utils/ttsNarrator';

interface NarratorBarProps {
  title?: string;
  segments: string[];
  compact?: boolean;
}

type NarratorStatus = 'idle' | 'playing' | 'paused';

export function NarratorBar({
  title = 'Penjelasan Guru Fisika',
  segments,
  compact = false,
}: NarratorBarProps) {
  const [status, setStatus] = useState<NarratorStatus>('idle');
  const [currentSegment, setCurrentSegment] = useState<number>(0);
  const [rate, setRate] = useState<number>(1.0);
  const [showTranscript, setShowTranscript] = useState<boolean>(!compact);
  const [voicesChecked, setVoicesChecked] = useState<boolean>(false);
  const [voiceCount, setVoiceCount] = useState<number>(0);
  const [voiceLabel, setVoiceLabel] = useState<string>('Bahasa Indonesia (id-ID)');

  const activeRunIdRef = useRef<number>(0);
  const segmentsRef = useRef<string[]>(segments);
  segmentsRef.current = segments;

  const speechSupported = isWebSpeechSupported();

  useEffect(() => {
    if (!speechSupported) {
      setVoicesChecked(true);
      setVoiceCount(0);
      return;
    }

    const refreshVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setVoiceCount(voices.length);
      const info = selectBestIndonesianVoice();
      setVoiceLabel(info.voiceLabel);
      setVoicesChecked(true);
    };

    refreshVoices();
    window.speechSynthesis.addEventListener?.('voiceschanged', refreshVoices);

    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', refreshVoices);
    };
  }, [speechSupported]);

  // Stop speech when segments change or unmount
  useEffect(() => {
    activeRunIdRef.current += 1;
    if (speechSupported) {
      window.speechSynthesis.cancel();
    }
    setStatus('idle');
    setCurrentSegment(0);

    return () => {
      activeRunIdRef.current += 1;
      if (speechSupported) {
        window.speechSynthesis.cancel();
      }
    };
  }, [segments, speechSupported]);

  const hasUsableVoices = speechSupported && (!voicesChecked || voiceCount > 0);

  const speakFromIndex = (startIndex: number, playbackRate: number) => {
    if (!hasUsableVoices) return;
    const runId = activeRunIdRef.current + 1;
    activeRunIdRef.current = runId;
    window.speechSynthesis.cancel();

    const speakNext = (idx: number) => {
      if (activeRunIdRef.current !== runId) return;
      if (idx >= segmentsRef.current.length) {
        setStatus('idle');
        setCurrentSegment(0);
        return;
      }

      setCurrentSegment(idx);
      const utterance = new SpeechSynthesisUtterance(
        preparePedagogicalSpeechText(segmentsRef.current[idx])
      );
      const info = selectBestIndonesianVoice();
      if (info.voice) {
        utterance.voice = info.voice;
      }
      utterance.lang = 'id-ID';
      utterance.rate = playbackRate;
      utterance.pitch = 1.03;

      utterance.onend = () => {
        if (activeRunIdRef.current !== runId) return;
        speakNext(idx + 1);
      };
      utterance.onerror = () => {
        if (activeRunIdRef.current !== runId) return;
        setStatus('idle');
      };

      window.speechSynthesis.speak(utterance);
    };

    setStatus('playing');
    speakNext(startIndex);
  };

  const handlePlay = () => {
    if (status === 'paused' && speechSupported) {
      window.speechSynthesis.resume();
      setStatus('playing');
      return;
    }
    speakFromIndex(currentSegment, rate);
  };

  const handlePause = () => {
    if (!speechSupported) return;
    window.speechSynthesis.pause();
    setStatus('paused');
  };

  const handleStop = () => {
    activeRunIdRef.current += 1;
    if (speechSupported) {
      window.speechSynthesis.cancel();
    }
    setStatus('idle');
    setCurrentSegment(0);
  };

  const handleReplay = () => {
    speakFromIndex(0, rate);
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (status === 'playing') {
      speakFromIndex(currentSegment, newRate);
    }
  };

  return (
    <section
      aria-label={title}
      className="rounded-2xl border border-blue-200/80 bg-gradient-to-br from-blue-50/90 via-white to-cyan-50/70 p-4 sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <Volume2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 sm:text-base">{title}</h3>
            <p className="text-xs text-slate-600">
              {hasUsableVoices
                ? `Narator Suara · ${voiceLabel}`
                : 'Mode Teks Panduan (Suara TTS tidak tersedia di perangkat ini)'}
            </p>
          </div>
        </div>

        {hasUsableVoices && (
          <div className="flex flex-wrap items-center gap-2">
            {status !== 'playing' ? (
              <button
                type="button"
                onClick={handlePlay}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 whitespace-nowrap shrink-0"
              >
                <Play className="h-4 w-4" aria-hidden="true" />
                {status === 'paused' ? 'Lanjutkan' : 'Putar Narasi'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePause}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 whitespace-nowrap shrink-0"
              >
                <Pause className="h-4 w-4" aria-hidden="true" />
                Jeda
              </button>
            )}

            <button
              type="button"
              onClick={handleStop}
              disabled={status === 'idle'}
              aria-label="Hentikan narasi"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-45 whitespace-nowrap shrink-0"
            >
              <Square className="h-3.5 w-3.5" aria-hidden="true" />
              Hentikan
            </button>

            <button
              type="button"
              onClick={handleReplay}
              aria-label="Ulangi penjelasan"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Ulangi
            </button>

            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
              <span className="px-2 text-[11px] font-medium text-slate-500">Kecepatan</span>
              {[0.8, 1.0, 1.2].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRateChange(r)}
                  className={`min-h-[34px] rounded-lg px-2.5 text-xs font-semibold transition-colors font-mono-num whitespace-nowrap ${
                    rate === r
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {r === 1 ? '1x' : `${r}x`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 border-t border-blue-100 pt-3">
        <button
          type="button"
          onClick={() => setShowTranscript((prev) => !prev)}
          aria-expanded={showTranscript}
          className="inline-flex min-h-[36px] items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900"
        >
          {showTranscript ? (
            <>
              <ChevronUp className="h-4 w-4" aria-hidden="true" />
              Sembunyikan Teks Penjelasan Guru
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
              Tampilkan Teks Penjelasan Guru ({segments.length} bagian)
            </>
          )}
        </button>

        {(showTranscript || !hasUsableVoices) && (
          <div className="mt-2.5 space-y-2">
            {segments.map((text, idx) => {
              const isActive = status !== 'idle' && idx === currentSegment;
              return (
                <p
                  key={`${idx}-${text.slice(0, 16)}`}
                  className={`rounded-xl px-3.5 py-2.5 text-sm leading-relaxed transition-colors ${
                    isActive
                      ? 'bg-blue-600/10 font-medium text-slate-900 ring-1 ring-blue-400/50'
                      : 'bg-white/80 text-slate-700'
                  }`}
                >
                  {text}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
