import React, { useEffect, useState } from 'react';

// Handle high-speed clock ticking for Scene 3 (KC3)
class ClockAudio {
  private ctx: AudioContext | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    } catch (e) {
      console.error("Failed to initialize clock audio context", e);
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playHungUpTick(isTock: boolean) {
    if (!this.ctx) {
      this.init();
    }
    this.resume();
    if (!this.ctx || this.ctx.state === 'suspended') return;

    try {
      const t = this.ctx.currentTime;
      
      // 1. High-frequency crisp metallic bandpassed noise (the spring escapement action)
      const bufferSize = this.ctx.sampleRate * 0.02; // 20ms of noise
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(isTock ? 4200 : 5200, t);
      noiseFilter.Q.setValueAtTime(12, t); // High resonance for crisp metallic click
      
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18, t); // Audible gain level
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.008); // Sharp 8ms decay
      
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(t);
      
      // 2. High frequency micro ring/tinkle (escapement tooth impact)
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isTock ? 2400 : 3100, t);
      
      oscGain.gain.setValueAtTime(0.12, t); // Audible sine click
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.015); // Fast 15ms decay for bright, distinct tinkle
      
      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.02);

      // 3. Wooden escapement hollow body resonance click (adds body & fullness to the tick so it's not thin)
      const bodyOsc = this.ctx.createOscillator();
      const bodyGain = this.ctx.createGain();
      
      bodyOsc.type = 'triangle';
      bodyOsc.frequency.setValueAtTime(isTock ? 600 : 850, t);
      
      bodyGain.gain.setValueAtTime(0.15, t);
      bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.01); // 10ms body decay
      
      bodyOsc.connect(bodyGain);
      bodyGain.connect(this.ctx.destination);
      bodyOsc.start(t);
      bodyOsc.stop(t + 0.015);

    } catch (e) {
      // Catch blocks for initial gesture requirements
    }
  }
}

export interface IntroClockProps {
  mode?: 'normal' | 'reverse-mirrored' | 'multiple';
}

export const IntroClock: React.FC<IntroClockProps> = ({ mode = 'normal' }) => {
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const startTimeMs = Date.now();
    const clockAudio = new ClockAudio();
    clockAudio.init();

    // Setup interactive events to resume the context safely
    const handleInteraction = () => {
      clockAudio.init();
      clockAudio.resume();
    };
    window.addEventListener('click', handleInteraction, { passive: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    let lastTickStep = -1;

    const updateClock = () => {
      let nowMs = Date.now();
      if (mode === 'reverse-mirrored') {
        const diff = nowMs - startTimeMs;
        // Run backwards at normal speed
        nowMs = startTimeMs - diff; 
      }
      const now = new Date(nowMs);
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      const ms = String(now.getMilliseconds()).padStart(3, '0');
      setTimeStr(`${hrs} : ${mins} : ${secs} : ${ms}`);

      // Rapid mechanical stopwatch ticking: every 125ms (8 ticks per second) for a frantic, high-beat retro gear aesthetic
      const currentNowMs = now.getTime();
      const currentTickStep = Math.floor(currentNowMs / 125);

      if (currentTickStep !== lastTickStep) {
        lastTickStep = currentTickStep;
        const isTock = (currentTickStep % 2 === 1);
        // clockAudio.playHungUpTick(isTock); // Removed clock tick audio per user request
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 16); // ~60fps high speed update

    return () => {
      clearInterval(interval);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [mode]);

  const getTransform = () => {
    if (mode === 'reverse-mirrored') return 'scaleX(-1)';
    return 'none';
  };

  const ClockDisplay: React.FC<{ text?: string }> = ({ text }) => (
    <div 
      className="font-archivo font-normal text-[clamp(1.4rem,4.2vw,3.8rem)] text-white/95 tracking-[0.05em] select-none pointer-events-none tabular-nums"
      style={{ transform: getTransform() }}
    >
      {text || timeStr}
    </div>
  );

  return (
    <div 
      id="scene-clock"
      className="absolute inset-0 flex flex-col items-center justify-center bg-black z-30 select-none overflow-hidden gap-[calc(var(--vh,1vh)*0.5)] landscape:gap-[calc(var(--vh,1vh)*1.5)]"
    >
      {mode === 'multiple' ? (
        Array.from({ length: 25 }).map((_, i) => (
          <ClockDisplay key={i} text="DIGITAL PORTFOLIO ED." />
        ))
      ) : (
        <ClockDisplay />
      )}
    </div>
  );
};
