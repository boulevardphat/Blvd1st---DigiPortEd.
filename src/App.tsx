/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';



import { IntroClock } from './components/IntroClock';
import { VespertineBackground } from './components/VespertineBackground';
import { ModeSelector } from './components/ModeSelector';
import { PortfolioMode, SceneState } from './types';

export default function App() {

  const [scene, setScene] = useState<SceneState>('pre-intro');
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [portfolioMode, setPortfolioMode] = useState<PortfolioMode>(() => {
    try {
      const saved = localStorage.getItem('blvd_portfolio_mode');
      if (saved === 'employer-club' || saved === 'individual') return saved;
    } catch (e) {}
    return 'individual';
  });
  const [isModeExiting, setIsModeExiting] = useState(false);
  const bgAudioRef = React.useRef<HTMLAudioElement>(null);

  const handleSelectMode = (mode: PortfolioMode) => {
    setPortfolioMode(mode);
    setIsModeExiting(true);
    try {
      localStorage.setItem('blvd_portfolio_mode', mode);
    } catch (e) {}

    setTimeout(() => {
      setScene('intro-play');
    }, 800);
  };

  useEffect(() => {
    const imageUrls = [
      "https://i.ibb.co/JFvk9wzr/vespertine-bg.png",
      "https://i.ibb.co/jPHPJSG7/vespertine-sj.png",
      "https://i.ibb.co/vy4ykmw/vespertine.png",
      "https://i.ibb.co/Nd6BpwZ2/young.jpg",
      "https://i.ibb.co/tP3rK5bg/ultrayoung.jpg"
    ];

    let loadedCount = 0;
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === imageUrls.length) {
        setImagesLoaded(true);
      }
    };

    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      img.src = url;
    });
  }, []);

  useEffect(() => {
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    const setVh = () => {
      // Recalculate if width changes (rotation/resize) OR height changes significantly (split-screen/keyboard > 150px)
      // but ignore small height changes (URL bar hide/show)
      if (
        window.innerWidth !== lastWidth ||
        Math.abs(window.innerHeight - lastHeight) > 150 ||
        !document.documentElement.style.getPropertyValue('--vh')
      ) {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        lastWidth = window.innerWidth;
        lastHeight = window.innerHeight;
      }
    };
    setVh();
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', setVh);
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
    };
  }, []);

  useEffect(() => {
    if (scene === 'main-app' && bgAudioRef.current) {
      bgAudioRef.current.volume = 0.6;
      bgAudioRef.current.play().catch(() => {});
    } else if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      if (scene !== 'main-app') {
        bgAudioRef.current.currentTime = 0;
      }
    }
  }, [scene]);

  // Ensure audio plays upon user interaction in main-app
  useEffect(() => {
    const handleGlobalInteraction = () => {
      if (scene === 'main-app' && bgAudioRef.current) {
        bgAudioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener('click', handleGlobalInteraction, { passive: true });
    window.addEventListener('touchstart', handleGlobalInteraction, { passive: true });
    return () => {
      window.removeEventListener('click', handleGlobalInteraction);
      window.removeEventListener('touchstart', handleGlobalInteraction);
    };
  }, [scene]);

  const handleBgAudioEnded = () => {
    setTimeout(() => {
      if (bgAudioRef.current && scene === 'main-app') {
        bgAudioRef.current.play().catch(() => {});
      }
    }, 5000);
  };

  useEffect(() => {
    // Disable right-click context menu globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Disable text selection globally via JS events for full coverage
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('selectstart', handleSelectStart);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  // Handle automatic transitions between scenes (Custom sequence timing)
  useEffect(() => {
    if (scene === 'intro-play') {
      const t = setTimeout(() => {
        setScene('intro-blvd');
      }, 500); // 0.5s for KC1 ("phát")
      return () => clearTimeout(t);
    }
    if (scene === 'intro-blvd') {
      const t = setTimeout(() => {
        setScene('intro-clock-normal');
      }, 500); // 0.5s for KC2 ("BLVD")
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock-normal') {
      const t = setTimeout(() => {
        setScene('intro-clock-reverse-mirrored');
      }, 600); // KC3
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock-reverse-mirrored') {
      const t = setTimeout(() => {
        setScene('intro-clock-multiple');
      }, 600); // KC4
      return () => clearTimeout(t);
    }
    if (scene === 'intro-clock-multiple') {
      const t = setTimeout(() => {
        setScene('intro-image-1');
      }, 600); // KC6
      return () => clearTimeout(t);
    }
    if (scene === 'intro-image-1') {
      const t = setTimeout(() => {
        setScene('intro-image-2');
      }, 500); // 0.5s for KC4 (tinted background #89CC04)
      return () => clearTimeout(t);
    }
    if (scene === 'intro-image-2') {
      const t = setTimeout(() => {
        setScene('intro-image-3');
      }, 500); // 0.5s for KC5 (tinted background #C54EAA)
      return () => clearTimeout(t);
    }
    if (scene === 'intro-image-3') {
      const t = setTimeout(() => {
        setScene('main-app');
      }, 500); // 0.5s for KC6 (tinted background #8375B3)
      return () => clearTimeout(t);
    }
  }, [scene, imagesLoaded]);

  return (
    <main 
      className="relative w-screen h-[calc(var(--vh,1vh)*100)] overflow-hidden bg-black flex items-center justify-center select-none" 
      id="main-container"
    >
      <audio 
        ref={bgAudioRef}
        src="https://files.catbox.moe/op8yd3.mp3"
        onEnded={handleBgAudioEnded}
      />
      
      {/* Pre-intro overlay with Mode Selection */}
      {scene === 'pre-intro' && (
        <motion.div
          key="pre-intro"
          initial={{ backgroundColor: '#ffffff' }}
          animate={{ backgroundColor: isModeExiting ? '#000000' : '#ffffff' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <ModeSelector onSelect={handleSelectMode} isExiting={isModeExiting} />
        </motion.div>
      )}

      {/* Preloaded Background Images (Always active at z-0, hidden behind black scenes 1-3, visible in scenes 4-6 and main app) */}
      <img
        id="preload-ultrayoung"
        src="https://i.ibb.co/tP3rK5bg/ultrayoung.jpg"
        alt="Boulevard1st Ultrayoung Background"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] z-0 opacity-0 pointer-events-none"
      />
      <img
        id="preload-young"
        src="https://i.ibb.co/Nd6BpwZ2/young.jpg"
        alt="Boulevard1st Young Background"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] z-0 opacity-0 pointer-events-none"
      />
      <VespertineBackground />

      {/* KC1: Start Screen ("phát") */}
      {scene === 'intro-play' && (
        <div 
          id="scene-play"
          className="absolute inset-0 flex items-center justify-center bg-black z-50 select-none"
        >
          <div
            id="intro-phat-text"
            className="font-sans text-[clamp(2.5rem,8vw,5rem)] text-white/90 select-none tracking-normal font-normal"
          >
            phát
          </div>
        </div>
      )}

      {/* KC2: BLVD Hollow / Stretched Text Screen */}
      {scene === 'intro-blvd' && (
        <div 
          id="scene-blvd"
          className="absolute inset-0 flex items-center justify-center bg-black z-40 overflow-hidden select-none w-full h-full"
        >
          <svg 
            viewBox="0 0 400 100" 
            className="w-full h-full" 
            preserveAspectRatio="none"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              className="font-archivo font-black select-none pointer-events-none"
              fontSize="110"
              fill="none"
              stroke="rgba(255, 255, 255, 0.95)"
              strokeWidth="3.2"
            >
              BLVD
            </text>
          </svg>
        </div>
      )}

      {/* KC3: High-frequency live ticking clock */}
      {scene === 'intro-clock-normal' && <IntroClock mode="normal" />}
      {/* KC4: Reverse and mirrored clock */}
      {scene === 'intro-clock-reverse-mirrored' && <IntroClock mode="reverse-mirrored" />}
      {/* KC6: Multiple clocks */}
      {scene === 'intro-clock-multiple' && <IntroClock mode="multiple" />}

      {/* KC4: Background Image with #8375B3 tint */}
      {scene === 'intro-image-1' && (
        <div 
          id="scene-intro-image-1"
          className="absolute inset-0 z-20 select-none pointer-events-none"
        >
          {/* Sibling image to ensure perfect mix-blend-mode rendering */}
          <img
            src="https://i.ibb.co/tP3rK5bg/ultrayoung.jpg"
            alt="Intro Background Reference 1"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center]"
          />
          {/* #8375B3 Tint Overlays */}
          <div className="absolute inset-0 bg-[#8375B3] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#8375B3]/35 mix-blend-multiply pointer-events-none" />
        </div>
      )}

      {/* KC5: Background Image with #C54EAA tint */}
      {scene === 'intro-image-2' && (
        <div 
          id="scene-intro-image-2"
          className="absolute inset-0 z-15 select-none pointer-events-none"
        >
          {/* Sibling image to ensure perfect mix-blend-mode rendering */}
          <img
            src="https://i.ibb.co/Nd6BpwZ2/young.jpg"
            alt="Intro Background Reference 2"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center]"
          />
          {/* #C54EAA Tint Overlays */}
          <div className="absolute inset-0 bg-[#C54EAA] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#C54EAA]/35 mix-blend-multiply pointer-events-none" />
        </div>
      )}

      {/* KC6: Background Image with #89CC04 tint */}
      {scene === 'intro-image-3' && (
        <div 
          id="scene-intro-image-3"
          className="absolute inset-0 z-10 select-none pointer-events-none"
        >
          {/* Sibling image to ensure perfect mix-blend-mode rendering */}
          <VespertineBackground />
          {/* #89CC04 Tint Overlays */}
          <div className="absolute inset-0 bg-[#89CC04] mix-blend-color opacity-95 pointer-events-none" />
          <div className="absolute inset-0 bg-[#89CC04]/35 mix-blend-multiply pointer-events-none" />
        </div>
      )}

      {/* Main App Screen (Background Image & Interactive Interface Layouts) */}
      {scene === 'main-app' && (
        <div className="absolute inset-0 z-10 overflow-x-hidden overflow-y-auto no-scrollbar scroll-smooth">
          <div className="w-full flex flex-col overflow-x-hidden">
            {/* The 100vh Main Screen View */}
            <div className="relative w-full h-[calc(var(--vh,1vh)*100)] shrink-0 flex items-center justify-center overflow-hidden ">
              {/* Background Image */}
              <VespertineBackground shiftLeft={false} />

              {/* Minimal Mode Indicator / Switcher in Main App */}
              <div 
                id="main-app-mode-bar"
                className="absolute landscape:top-[6.5%] landscape:left-[6.5%] portrait:top-6 portrait:left-6 z-30 pointer-events-auto flex items-center"
              >
                <button
                  type="button"
                  id="mode-toggle-button"
                  onClick={() => {
                    const next = portfolioMode === 'individual' ? 'employer-club' : 'individual';
                    setPortfolioMode(next);
                    try {
                      localStorage.setItem('blvd_portfolio_mode', next);
                    } catch (e) {}
                  }}
                  className="bg-transparent border-0 p-0 text-white/70 hover:text-white transition-colors cursor-pointer flex items-center select-none focus:outline-none"
                  title={`Current mode: ${portfolioMode === 'individual' ? 'individual' : 'employer / club'}. Click to switch.`}
                >
                  {/* Single unified mode name in lowercase for both mobile and desktop */}
                  <span className="font-archivo text-xs tracking-wider lowercase">
                    {portfolioMode === 'individual' ? 'individual' : 'employer / club'}
                  </span>
                </button>
              </div>

              {/* Seamless Bottom Shadow (Rich, full-range smooth gradient transition, solid #000000 strictly in the final 1px) */}
              <div 
                id="hero-bottom-fade"
                className="absolute bottom-0 left-0 right-0 h-24 sm:h-28 md:h-32 pointer-events-none z-[5] bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.08)_20%,rgba(0,0,0,0.25)_40%,rgba(0,0,0,0.52)_60%,rgba(0,0,0,0.75)_75%,rgba(0,0,0,0.92)_88%,#000000_calc(100%-1px),#000000_100%)]" 
              />

              {/* Landscape Layout (Visible only in landscape / horizontal viewports) */}
              <div 
                id="safezone-overlay-landscape" 
                className="hidden landscape:flex absolute inset-0 flex-col justify-end p-[6.5%] pointer-events-none z-10"
              >
                {/* Bottom Row */}
                <div className="relative flex justify-center items-baseline w-full">
                  {/* Centered Logo aligned with bottom baseline */}
                  <div 
                    id="logo-container"
                    className="flex flex-col items-center justify-center pointer-events-auto w-fit"
                  >
                    <h1 
                      id="logo-text-landscape"
                      className="font-archivo text-white font-black text-[clamp(2rem,7.6vw,9.125rem)] leading-[0.85] tracking-tighter select-none whitespace-nowrap relative z-10"
                    >
                      Boulevard1st
                    </h1>
                    <div className="w-full flex justify-center -mt-[2%] relative z-0">
                      <svg 
                        width="100%" 
                        height="100%" 
                        viewBox="0 0 400 50" 
                        preserveAspectRatio="none" 
                        className="w-full h-[clamp(1.5rem,3.5vw,4.5rem)] overflow-visible"
                      >
                        <text 
                          x="3" 
                          y="45" 
                          textLength="398" 
                          lengthAdjust="spacingAndGlyphs" 
                          fontFamily="Archivo, sans-serif" 
                          fontWeight="300" 
                          fontSize="48" 
                          fill="rgba(255, 255, 255, 0.7)" 
                          style={{ textTransform: 'uppercase' }}
                        >
                          DIGITAL PORTFOLIO
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portrait Layout (Visible only in portrait / vertical viewports) */}
              <div 
                id="safezone-overlay-portrait" 
                className="hidden portrait:flex absolute inset-0 pointer-events-none z-10"
              >
                {/* Anchor point exactly at 66.5vh, centered horizontally */}
                <div className="absolute left-1/2 -translate-x-1/2 w-fit pointer-events-auto flex flex-col items-center" style={{ top: 'calc(var(--vh, 1vh) * 66.5)' }}>
                  {/* Logo and Bottom Row */}
                  <div className="flex flex-col w-full relative">
                    <h1 
                      id="logo-text-portrait"
                      className="font-archivo text-white font-black text-[clamp(2.5rem,11.5vw,6rem)] leading-none tracking-tighter select-none whitespace-nowrap relative z-10"
                    >
                      Boulevard1st
                    </h1>
                    
                    <div className="w-full flex justify-center mt-[-2%] relative z-0">
                      <svg 
                        width="100%" 
                        height="100%" 
                        viewBox="0 0 400 50" 
                        preserveAspectRatio="none" 
                        className="w-full h-[clamp(1.2rem,4vw,2.5rem)] overflow-visible"
                      >
                        <text 
                          x="3" 
                          y="45" 
                          textLength="398" 
                          lengthAdjust="spacingAndGlyphs" 
                          fontFamily="Archivo, sans-serif" 
                          fontWeight="300" 
                          fontSize="48" 
                          fill="rgba(255, 255, 255, 0.7)" 
                          style={{ textTransform: 'uppercase' }}
                        >
                          DIGITAL PORTFOLIO
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Blank Black Page (Scrollable content on both desktop and mobile) */}
            <div 
              id="page-black-blank"
              className="relative w-full h-[calc(var(--vh,1vh)*100)] bg-black shrink-0 z-20"
            />
          </div>
        </div>
      )}
    </main>
  );
}
