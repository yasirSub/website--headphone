'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import CanvasSequence from '@/components/CanvasSequence';
import DriverSequence from '@/components/DriverSequence';

export default function Home() {
  const container1Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: progress1 } = useScroll({
    target: container1Ref,
    offset: ['start start', 'end end']
  });

  const container2Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: progress2 } = useScroll({
    target: container2Ref,
    offset: ['start start', 'end end']
  });

  // Section 1: Hero (0% - 15%)
  const heroOpacity = useTransform(progress1, [0, 0.1, 0.15], [1, 1, 0]);
  const heroY = useTransform(progress1, [0, 0.15], [0, -100]);

  // Section 2: Engineering (15% - 40%)
  const engOpacity = useTransform(progress1, [0.15, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const engX = useTransform(progress1, [0.15, 0.25, 0.35, 0.4], [-50, 0, 0, -50]);

  // Section 3: Noise Cancelling (40% - 65%)
  const ancOpacity = useTransform(progress1, [0.4, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const ancX = useTransform(progress1, [0.4, 0.5, 0.6, 0.65], [50, 0, 0, 50]);

  // Section 4: Sound (65% - 85%)
  const soundOpacity = useTransform(progress1, [0.65, 0.75, 0.8, 0.85], [0, 1, 1, 0]);
  const soundY = useTransform(progress1, [0.65, 0.75, 0.8, 0.85], [50, 0, 0, -50]);

  // --------- DRIVER SECTION (Progress 2) ---------

  // Intro to driver
  const driverIntroOp = useTransform(progress2, [0, 0.15, 0.3, 0.4], [0, 1, 1, 0]);
  const driverIntroY = useTransform(progress2, [0, 0.15], [50, 0]);

  // Deep dive driver tech
  const driverTechOp = useTransform(progress2, [0.4, 0.55, 0.7, 0.8], [0, 1, 1, 0]);
  const driverTechY = useTransform(progress2, [0.4, 0.55], [50, 0]);

  // Reassembly & CTA (85% - 100%) - Moved to end of the whole page
  const ctaOpacity = useTransform(progress2, [0.85, 0.95, 1], [0, 1, 1]);
  const ctaY = useTransform(progress2, [0.85, 0.95, 1], [50, 0, 0]);


  return (
    <div className="bg-[#050505] min-h-screen text-white/90 selection:bg-[#00D6FF]/30">
      <Navbar />

      {/* ----------------- FIRST CANVAS SEQUENCE ----------------- */}
      <section ref={container1Ref} className="relative h-[1000vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
          <CanvasSequence progress={progress1} />

          <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {/* Section 1: Hero */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
              style={{ opacity: heroOpacity, y: heroY }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 text-gradient glow-subtle block">
                Sony WH-1000XM6
              </h1>
              <p className="text-xl md:text-3xl font-medium tracking-tight text-white/90 mb-6 drop-shadow-lg">
                Silence, perfected.
              </p>
              <p className="max-w-xl text-base md:text-xl text-white/60 font-light mx-auto leading-relaxed">
                Flagship wireless noise cancelling, re-engineered for a world that never stops.
              </p>

              <motion.div
                className="absolute bottom-12 md:bottom-20 text-white/50 flex flex-col items-center"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xs md:text-sm font-medium tracking-widest uppercase mb-2">Scroll</span>
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Section 2: Engineering Reveal */}
            <motion.div
              className="absolute inset-y-0 left-0 w-full md:w-1/2 flex flex-col justify-end md:justify-center items-center md:items-start text-center md:text-left px-6 md:px-24 pb-20 md:pb-0"
              style={{ opacity: engOpacity, x: engX }}
            >
              <div className="max-w-md bg-black/40 md:bg-transparent p-6 md:p-0 rounded-3xl backdrop-blur-xl md:backdrop-blur-none border md:border-none border-white/5">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 leading-tight text-white/90">
                  Precision-engineered<br />for silence.
                </h2>
                <p className="text-base md:text-xl text-white/60 font-light mb-4 leading-relaxed">
                  Custom drivers, sealed acoustic chambers, and optimized airflow deliver studio-grade clarity.
                </p>
                <p className="text-base md:text-xl text-white/60 font-light leading-relaxed">
                  Every component is tuned for balance, power, and comfort—hour after hour.
                </p>
              </div>
            </motion.div>

            {/* Section 3: Noise Cancelling */}
            <motion.div
              className="absolute inset-y-0 right-0 w-full md:w-1/2 flex flex-col justify-end md:justify-center items-center md:items-end text-center md:text-right px-6 md:px-24 pb-20 md:pb-0"
              style={{ opacity: ancOpacity, x: ancX }}
            >
              <div className="max-w-md bg-black/40 md:bg-transparent p-6 md:p-0 rounded-3xl backdrop-blur-xl md:backdrop-blur-none border md:border-none border-white/5">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 md:mb-8 leading-tight text-white/90">
                  Adaptive noise<br className="hidden md:block" />cancelling, <span className="text-[#00D6FF]">redefined.</span>
                </h2>
                <ul className="space-y-4 md:space-y-6 text-base md:text-xl text-white/60 font-light">
                  <li className="flex flex-col md:flex-row items-center md:justify-end gap-2 md:gap-4">
                    <span>Multi-microphone array listens in every direction.</span>
                  </li>
                  <li className="flex flex-col md:flex-row items-center md:justify-end gap-2 md:gap-4">
                    <span>Real-time noise analysis adjusts to your environment.</span>
                  </li>
                  <li className="flex flex-col md:flex-row items-center md:justify-end gap-2 md:gap-4">
                    <span className="text-white/80 font-medium">Your music stays pure—planes, trains, and crowds fade away.</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Section 4: Sound & Upscaling */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center items-center text-center px-4"
              style={{ opacity: soundOpacity, y: soundY }}
            >
              <div className="max-w-3xl bg-glass p-8 md:p-12 rounded-3xl glow-subtle mx-4">
                <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6 leading-tight text-white/90">
                  Immersive, lifelike sound.
                </h2>
                <p className="text-lg md:text-2xl text-white/60 font-light mb-4 leading-relaxed">
                  High-performance drivers unlock detail, depth, and texture in every track.
                </p>
                <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed">
                  AI-enhanced upscaling restores clarity to compressed audio, <br className="hidden md:block" />so every note feels alive.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* ----------------- SECOND CANVAS SEQUENCE (DRIVER) ----------------- */}
      <section ref={container2Ref} className="relative h-[1000vh] bg-[#050505]">
        <div className="sticky top-0 h-screen w-full overflow-hidden z-0">
          <DriverSequence progress={progress2} />

          <div className="absolute inset-0 w-full h-full pointer-events-none z-10">

            {/* Driver Narrative 1 */}
            <motion.div
              className="absolute inset-y-0 left-0 w-full flex flex-col justify-end md:justify-center items-center md:items-start text-center md:text-left px-6 md:px-24 pb-20 md:pb-0 md:w-1/2"
              style={{ opacity: driverIntroOp, y: driverIntroY }}
            >
              <div className="max-w-lg bg-black/60 md:bg-black/40 p-6 md:p-8 rounded-3xl backdrop-blur-xl border border-white/10 md:border-white/5">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 md:mb-6 leading-tight text-gradient">
                  The heart of the<br />acoustic engine.
                </h2>
                <p className="text-base md:text-xl text-white/60 font-light leading-relaxed">
                  A totally re-designed custom dynamic driver. Lightweight, extremely rigid, and perfectly tuned to reproduce frequencies with breathtaking precision.
                </p>
              </div>
            </motion.div>

            {/* Driver Narrative 2 */}
            <motion.div
              className="absolute inset-y-0 right-0 w-full md:w-1/2 flex flex-col justify-end md:justify-center items-center md:items-end text-center md:text-right px-6 md:px-24 pb-20 md:pb-0"
              style={{ opacity: driverTechOp, y: driverTechY }}
            >
              <div className="max-w-md bg-black/60 md:bg-black/40 p-6 md:p-8 rounded-3xl backdrop-blur-xl border border-white/10 md:border-white/5">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight text-white/90">
                  Uncompromising <br /><span className="text-[#0050FF]">Clarity.</span>
                </h2>
                <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
                  High-compliance edge materials and neodymium magnets ensure every pulse of air translates faithfully into profound bass and sparkling highs.
                </p>
              </div>
            </motion.div>

            {/* Section 5: Reassembly & CTA - MOVED HERE */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end items-center text-center px-4 pb-20 md:pb-32 w-full"
              style={{ opacity: ctaOpacity, y: ctaY }}
            >
              <div className="relative z-20 pointer-events-auto bg-black/60 backdrop-blur-3xl p-8 md:p-12 rounded-3xl md:rounded-[3rem] border border-white/10 glow-subtle max-w-4xl mx-auto w-full">
                <h2 className="text-4xl md:text-7xl font-bold tracking-tight mb-4 text-gradient">
                  Hear everything.
                  <br />
                  Feel nothing else.
                </h2>
                <p className="text-lg md:text-2xl text-white/70 font-medium tracking-tight mb-8 md:mb-12">
                  WH-1000XM6. Designed for focus, crafted for comfort.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                  <button className="w-full md:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
                    Experience WH-1000XM6
                  </button>
                  <button className="w-full md:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/10 transition-colors backdrop-blur-md">
                    See full specs
                  </button>
                </div>
                <p className="mt-8 text-xs md:text-sm text-white/40 tracking-wide uppercase font-medium">
                  Engineered for airports, offices, and everything in between.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
