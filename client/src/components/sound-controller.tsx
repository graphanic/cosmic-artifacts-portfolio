import { createContext, useContext, useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface SoundControllerContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playClickSound: () => void;
  playHoverSound: () => void;
  playWhoosh: () => void;
}

const SoundControllerContext = createContext<SoundControllerContextType | undefined>(undefined);

export function useSoundController() {
  const context = useContext(SoundControllerContext);
  if (!context) {
    throw new Error("useSoundController must be used within a SoundProvider");
  }
  return context;
}

interface SoundProviderProps {
  children: ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sound-muted");
      return stored === null ? true : stored === "true";
    }
    return true;
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const droneOscillatorsRef = useRef<OscillatorNode[]>([]);
  const droneGainRef = useRef<GainNode | null>(null);
  const isInitializedRef = useRef(false);

  const initAudioContext = useCallback(() => {
    if (isInitializedRef.current || typeof window === "undefined") return;

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContextClass();
      
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.gain.value = isMuted ? 0 : 1;
      masterGainRef.current.connect(audioContextRef.current.destination);

      isInitializedRef.current = true;
    } catch (e) {
      console.warn("Web Audio API not supported");
    }
  }, [isMuted]);

  const startAmbientDrone = useCallback(() => {
    if (!audioContextRef.current || !masterGainRef.current) return;
    if (droneOscillatorsRef.current.length > 0) return;

    const ctx = audioContextRef.current;
    
    droneGainRef.current = ctx.createGain();
    droneGainRef.current.gain.value = 0.08;
    droneGainRef.current.connect(masterGainRef.current);

    const reverbNode = ctx.createConvolver();
    const reverbLength = 3;
    const sampleRate = ctx.sampleRate;
    const impulseBuffer = ctx.createBuffer(2, sampleRate * reverbLength, sampleRate);
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulseBuffer.getChannelData(channel);
      for (let i = 0; i < channelData.length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / channelData.length, 2);
      }
    }
    reverbNode.buffer = impulseBuffer;

    const reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.3;
    reverbNode.connect(reverbGain);
    reverbGain.connect(droneGainRef.current);

    const dryGain = ctx.createGain();
    dryGain.gain.value = 0.7;
    dryGain.connect(droneGainRef.current);

    const frequencies = [55, 82.5, 110, 165];
    
    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.1 + index * 0.05;
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = freq * 0.02;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.15 / (index + 1);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400 + index * 100;
      filter.Q.value = 0.5;

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(dryGain);
      oscGain.connect(reverbNode);

      osc.start();
      lfo.start();

      droneOscillatorsRef.current.push(osc, lfo);
    });

    const noiseBuffer = ctx.createBuffer(1, sampleRate * 2, sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 200;
    noiseFilter.Q.value = 0.3;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.02;

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(dryGain);
    noiseGain.connect(reverbNode);
    noiseSource.start();

  }, []);

  const stopAmbientDrone = useCallback(() => {
    droneOscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {}
    });
    droneOscillatorsRef.current = [];
  }, []);

  const playClickSound = useCallback(() => {
    if (!audioContextRef.current || !masterGainRef.current || isMuted) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.15, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    clickGain.connect(masterGainRef.current);

    const osc1 = ctx.createOscillator();
    osc1.type = "square";
    osc1.frequency.setValueAtTime(800, now);
    osc1.frequency.exponentialRampToValueAtTime(200, now + 0.05);
    
    const osc2 = ctx.createOscillator();
    osc2.type = "sawtooth";
    osc2.frequency.setValueAtTime(1200, now);
    osc2.frequency.exponentialRampToValueAtTime(100, now + 0.08);

    const filter = ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 500;

    const distortion = ctx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; i++) {
      const x = (i / 128) - 1;
      curve[i] = Math.tanh(x * 3);
    }
    distortion.curve = curve;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(distortion);
    distortion.connect(clickGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.1);
    osc2.stop(now + 0.1);

    for (let i = 0; i < 3; i++) {
      const glitchOsc = ctx.createOscillator();
      glitchOsc.type = "square";
      glitchOsc.frequency.value = 100 + Math.random() * 2000;
      
      const glitchGain = ctx.createGain();
      const startTime = now + Math.random() * 0.05;
      glitchGain.gain.setValueAtTime(0, startTime);
      glitchGain.gain.linearRampToValueAtTime(0.05, startTime + 0.01);
      glitchGain.gain.linearRampToValueAtTime(0, startTime + 0.02);
      
      glitchOsc.connect(glitchGain);
      glitchGain.connect(masterGainRef.current);
      
      glitchOsc.start(startTime);
      glitchOsc.stop(startTime + 0.03);
    }
  }, [isMuted]);

  const playHoverSound = useCallback(() => {
    if (!audioContextRef.current || !masterGainRef.current || isMuted) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;

    const hoverGain = ctx.createGain();
    hoverGain.gain.setValueAtTime(0, now);
    hoverGain.gain.linearRampToValueAtTime(0.03, now + 0.02);
    hoverGain.gain.linearRampToValueAtTime(0, now + 0.15);
    hoverGain.connect(masterGainRef.current);

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(3000 + Math.random() * 1000, now);
    osc.frequency.linearRampToValueAtTime(2000 + Math.random() * 500, now + 0.15);

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 4000;
    filter.Q.value = 5;

    osc.connect(filter);
    filter.connect(hoverGain);

    osc.start(now);
    osc.stop(now + 0.15);
  }, [isMuted]);

  const playWhoosh = useCallback(() => {
    if (!audioContextRef.current || !masterGainRef.current || isMuted) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    const duration = 0.6;

    const whooshGain = ctx.createGain();
    whooshGain.gain.setValueAtTime(0, now);
    whooshGain.gain.linearRampToValueAtTime(0.12, now + 0.1);
    whooshGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    whooshGain.connect(masterGainRef.current);

    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(100, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + duration * 0.3);
    filter.frequency.exponentialRampToValueAtTime(200, now + duration);
    filter.Q.value = 2;

    const lowOsc = ctx.createOscillator();
    lowOsc.type = "sine";
    lowOsc.frequency.setValueAtTime(60, now);
    lowOsc.frequency.linearRampToValueAtTime(40, now + duration);

    const lowGain = ctx.createGain();
    lowGain.gain.setValueAtTime(0, now);
    lowGain.gain.linearRampToValueAtTime(0.1, now + 0.15);
    lowGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noiseSource.connect(filter);
    filter.connect(whooshGain);
    
    lowOsc.connect(lowGain);
    lowGain.connect(whooshGain);

    noiseSource.start(now);
    noiseSource.stop(now + duration);
    lowOsc.start(now);
    lowOsc.stop(now + duration);
  }, [isMuted]);

  useEffect(() => {
    localStorage.setItem("sound-muted", String(isMuted));
    
    if (masterGainRef.current) {
      masterGainRef.current.gain.setTargetAtTime(
        isMuted ? 0 : 1,
        audioContextRef.current?.currentTime || 0,
        0.1
      );
    }

    if (!isMuted && isInitializedRef.current) {
      startAmbientDrone();
    } else if (isMuted) {
      stopAmbientDrone();
    }
  }, [isMuted, startAmbientDrone, stopAmbientDrone]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      initAudioContext();
      if (!isMuted) {
        startAmbientDrone();
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("keydown", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      stopAmbientDrone();
    };
  }, [initAudioContext, isMuted, startAmbientDrone, stopAmbientDrone]);

  const toggleMute = useCallback(() => {
    initAudioContext();
    setIsMuted(prev => !prev);
  }, [initAudioContext]);

  return (
    <SoundControllerContext.Provider value={{ isMuted, toggleMute, playClickSound, playHoverSound, playWhoosh }}>
      {children}
    </SoundControllerContext.Provider>
  );
}

export function SoundToggle() {
  const { isMuted, toggleMute, playClickSound } = useSoundController();

  const handleClick = () => {
    if (isMuted) {
      toggleMute();
    } else {
      playClickSound();
      toggleMute();
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 left-24 z-50 group"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isMuted ? "Enable sound" : "Mute sound"}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full blur-xl opacity-60"
          animate={{
            background: !isMuted
              ? [
                  "radial-gradient(circle, hsl(185, 100%, 55%) 0%, transparent 70%)",
                  "radial-gradient(circle, hsl(280, 100%, 50%) 0%, transparent 70%)",
                  "radial-gradient(circle, hsl(185, 100%, 55%) 0%, transparent 70%)",
                ]
              : "radial-gradient(circle, hsl(235, 40%, 30%) 0%, transparent 70%)",
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ width: "120%", height: "120%", left: "-10%", top: "-10%" }}
        />

        <motion.div
          className={`
            relative w-12 h-12 rounded-full flex items-center justify-center
            border-2 transition-colors duration-500
            ${!isMuted 
              ? "bg-gradient-to-br from-[hsl(185,100%,55%,0.2)] via-[hsl(280,100%,50%,0.2)] to-[hsl(320,100%,60%,0.2)] border-[hsl(185,100%,55%,0.6)]" 
              : "bg-[hsl(235,40%,12%)] border-[hsl(235,40%,30%,0.5)]"
            }
          `}
          animate={{
            boxShadow: !isMuted
              ? [
                  "0 0 15px hsl(185, 100%, 55%, 0.4), 0 0 30px hsl(280, 100%, 50%, 0.2), inset 0 0 15px hsl(320, 100%, 60%, 0.1)",
                  "0 0 25px hsl(280, 100%, 50%, 0.5), 0 0 50px hsl(185, 100%, 55%, 0.3), inset 0 0 25px hsl(280, 100%, 50%, 0.15)",
                  "0 0 15px hsl(185, 100%, 55%, 0.4), 0 0 30px hsl(280, 100%, 50%, 0.2), inset 0 0 15px hsl(320, 100%, 60%, 0.1)",
                ]
              : "0 0 5px hsl(235, 40%, 30%, 0.2), inset 0 0 5px hsl(235, 40%, 30%, 0.05)",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <AnimatePresence mode="wait">
            {!isMuted ? (
              <motion.div
                key="unmuted"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Volume2 className="w-5 h-5 text-[hsl(185,100%,55%)]" />
              </motion.div>
            ) : (
              <motion.div
                key="muted"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <VolumeX className="w-5 h-5 text-[hsl(235,60%,50%)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          <span
            className={`
              text-[9px] font-mono uppercase tracking-widest
              ${!isMuted ? "text-[hsl(185,100%,55%)]" : "text-[hsl(235,50%,50%)]"}
            `}
          >
            {isMuted ? "muted" : "sound"}
          </span>
        </motion.div>
      </div>

      {!isMuted && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{
            boxShadow: [
              "0 0 0 0px hsl(185, 100%, 55%, 0.3)",
              "0 0 0 8px hsl(185, 100%, 55%, 0)",
            ],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}
    </motion.button>
  );
}
