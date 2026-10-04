// Web Audio API Synthesizer for 3D Micro-Interactions & Luxury UI Sound Effects
// Zero external audio assets required — 100% synthesized in real-time.

type SoundListener = (muted: boolean) => void;

class SoundFxManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private muted: boolean = false;
  private listeners: Set<SoundListener> = new Set();
  private isUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const storedMuted = localStorage.getItem('akrati_sound_muted');
      this.muted = storedMuted === 'true';

      // Auto unlock audio context on first user gesture
      const unlock = () => {
        this.initContext();
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
        this.isUnlocked = true;
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };

      window.addEventListener('pointerdown', unlock, { once: true });
      window.addEventListener('keydown', unlock, { once: true });
      window.addEventListener('touchstart', unlock, { once: true });
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.muted ? 0 : 1, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    return this.ctx;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public setMuted(mute: boolean) {
    this.muted = mute;
    if (typeof window !== 'undefined') {
      localStorage.setItem('akrati_sound_muted', String(mute));
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(mute ? 0 : 1, this.ctx.currentTime);
    }
    this.listeners.forEach((listener) => listener(this.muted));
  }

  public toggleMute(): boolean {
    this.setMuted(!this.muted);
    return this.muted;
  }

  public subscribe(listener: SoundListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Luxury soft click sound (Subtle haptic click on button presses / dials)
   */
  public playClick(pitch: number = 1.0) {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    // High-precision transient oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'triangle';
    const baseFreq = 950 * pitch;
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(120 * pitch, now + 0.025);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400 * pitch, now);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.04);

    // Subtle tactile low-end body click
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(160 * pitch, now);
    subOsc.frequency.exponentialRampToValueAtTime(45 * pitch, now + 0.03);

    subGain.gain.setValueAtTime(0.18, now);
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    subOsc.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc.start(now);
    subOsc.stop(now + 0.035);
  }

  /**
   * Smooth whoosh / swoosh sound (for 3D card flips, carousel drags, filter switches)
   */
  public playWhoosh(speed: number = 1.0) {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const duration = 0.22 / Math.max(0.5, speed);

    // Synthesize filtered pink/white noise buffer
    const bufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise smoothing filter
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.setValueAtTime(1.8, now);
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(1800, now + duration * 0.45);
    filter.frequency.exponentialRampToValueAtTime(260, now + duration);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.18, now + duration * 0.35);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    noiseSource.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noiseSource.start(now);
    noiseSource.stop(now + duration);
  }

  /**
   * Shimmer / chime sound (for booking deal opened, verified badge hover, modal elevation)
   */
  public playShimmer() {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    // Harmonic celestial arpeggio (C6, E6, G6, B6, D7) with shimmer modulation
    const freqs = [1046.5, 1318.51, 1567.98, 1975.53, 2349.32];
    const delays = [0.0, 0.045, 0.09, 0.135, 0.18];

    freqs.forEach((freq, idx) => {
      const startTime = now + delays[idx];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      // Delicate frequency vibrato
      osc.frequency.linearRampToValueAtTime(freq * 1.012, startTime + 0.4);

      if (panner) {
        const panVal = (idx / (freqs.length - 1)) * 0.8 - 0.4;
        panner.pan.setValueAtTime(panVal, startTime);
      }

      const noteDuration = 0.55;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.12 / (idx * 0.25 + 1), startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + noteDuration);

      if (panner) {
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain!);
      } else {
        osc.connect(gain);
        gain.connect(this.masterGain!);
      }

      osc.start(startTime);
      osc.stop(startTime + noteDuration);
    });
  }

  /**
   * Clean bubble pop sound for closing modals or unchecking filters
   */
  public playPop() {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

    gain.gain.setValueAtTime(0.16, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.065);
  }

  /**
   * Harmonious success chime for booking brief submission
   */
  public playSuccess() {
    if (this.muted) return;
    const ctx = this.initContext();
    if (!ctx || !this.masterGain) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;
    // Major 9th chord cascade (F4, A4, C5, E5, G5)
    const notes = [349.23, 440.0, 523.25, 659.25, 783.99];

    notes.forEach((freq, i) => {
      const startTime = now + i * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.65);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(startTime);
      osc.stop(startTime + 0.7);
    });
  }
}

export const soundFx = new SoundFxManager();
export const ThreeDSoundFx = soundFx;
export default soundFx;
