/**
 * Audio Synthesizer & Web Audio Engine for Cloud Music
 * Provides realistic musical playback for local songs and simulated cloud audio.
 */

class MusicSynthEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentFreqIndex = 0;
  private timerId: any = null;
  private masterGain: GainNode | null = null;
  private activeElement: HTMLAudioElement | null = null;
  private customAudioUrl: string | null = null;

  // Pentatonic scales for smooth musical synthesis
  private scaleFreqs = [
    261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00,
    1046.50, 1174.66, 1318.51
  ];

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.3;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, vol));
    }
    if (this.activeElement) {
      this.activeElement.volume = vol;
    }
  }

  public playTrack(audioUrl?: string) {
    this.stop();
    this.initCtx();

    if (audioUrl && audioUrl.length > 0) {
      try {
        this.activeElement = new Audio(audioUrl);
        this.activeElement.volume = this.masterGain?.gain.value || 0.3;
        this.activeElement.play().catch(() => {
          // Fallback to synth if external audio fails
          this.startSynth();
        });
        this.isPlaying = true;
        return;
      } catch (e) {
        // Fallback to synth
      }
    }

    this.startSynth();
  }

  private startSynth() {
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;

    const playNote = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;

      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      const freq = this.scaleFreqs[Math.floor(Math.random() * this.scaleFreqs.length)];
      osc.type = Math.random() > 0.5 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0, this.ctx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
      noteGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.6);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.65);

      const nextInterval = 250 + Math.random() * 200;
      this.timerId = setTimeout(playNote, nextInterval);
    };

    playNote();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.activeElement) {
      this.activeElement.pause();
    }
  }

  public resume() {
    if (this.activeElement) {
      this.activeElement.play().catch(() => {});
      this.isPlaying = true;
    } else {
      this.initCtx();
      this.startSynth();
    }
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.activeElement) {
      this.activeElement.pause();
      this.activeElement = null;
    }
  }
}

export const musicSynth = new MusicSynthEngine();
