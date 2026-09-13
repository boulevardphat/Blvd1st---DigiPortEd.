/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';



import { IntroClock } from './components/IntroClock';
import { VespertineBackground } from './components/VespertineBackground';
import { ModeSelector } from './components/ModeSelector';
import { AppLanguage, PortfolioMode, SceneState } from './types';

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
  const [language, setLanguage] = useState<AppLanguage>(() => {
    try {
      const saved = localStorage.getItem('blvd_language');
      if (saved === 'vi' || saved === 'en') return saved;
    } catch (e) {}
    return 'vi';
  });
  const [isModeExiting, setIsModeExiting] = useState(false);
  const [isBasicInfoOpen, setIsBasicInfoOpen] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const bgAudioRef = React.useRef<HTMLAudioElement>(null);

  const handlePhoneClick = () => {
    try {
      navigator.clipboard.writeText('0833939468');
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    } catch (err) {}
  };

  const handleEmailClick = () => {
    try {
      navigator.clipboard.writeText('thuanphat26092008@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
      window.location.href = 'mailto:thuanphat26092008@gmail.com';
    } catch (err) {}
  };

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

  const handleBlvdClick = () => {
    setScene('blvd-play');
  };

  useEffect(() => {
    const imageUrls = [
      "https://i.ibb.co/tP3rK5bg/ultrayoung.jpg",
      "https://i.ibb.co/Nd6BpwZ2/young.jpg",
      "https://i.ibb.co/vy4ykmw/vespertine.png",
      "https://i.ibb.co/JFvk9wzr/vespertine-bg.png",
      "https://i.ibb.co/jPHPJSG7/vespertine-sj.png"
    ];

    let loadedCount = 0;
    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount >= imageUrls.length) {
        setImagesLoaded(true);
      }
    };

    imageUrls.forEach(url => {
      const img = new Image();
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
      img.src = url;
    });

    // Fallback safety timeout so experience never stalls
    const safetyTimer = setTimeout(() => {
      setImagesLoaded(true);
    }, 3500);

    return () => clearTimeout(safetyTimer);
  }, []);

  // Preload secondary tool icons & avatar ONLY after arriving in main-app, freeing all bandwidth for intro & main backgrounds
  useEffect(() => {
    if (scene === 'main-app') {
      const timer = setTimeout(() => {
        const secondaryIcons = [
          "https://i.ibb.co/RTw2phXD/canva.jpg",
          "https://i.ibb.co/pBXrq6cf/affinity.jpg",
          "https://i.ibb.co/Pv9VfwzX/edits.webp",
          "https://i.ibb.co/N66hJX5h/ibispaint.png",
          "https://i.ibb.co/7JyGd3tX/google-AIstudio.png",
          "https://i.ibb.co/v4h21FLG/filmora.png",
          "https://i.ibb.co/TD9mb1pB/avatar.jpg"
        ];
        secondaryIcons.forEach(url => {
          const img = new Image();
          img.src = url;
        });
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [scene]);

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
      if (imagesLoaded) {
        const t = setTimeout(() => {
          setScene('intro-image-1');
        }, 600); // KC6: Multiple clocks
        return () => clearTimeout(t);
      } else {
        // Continue ticking clocks until critical visual assets finish caching, with max fallback
        const t = setTimeout(() => {
          setScene('intro-image-1');
        }, 3000);
        return () => clearTimeout(t);
      }
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

    // --- Isolated BLVD Sequence Transitions ---
    if (scene === 'blvd-play') {
      const t = setTimeout(() => {
        setScene('blvd-text');
      }, 500); // 0.5s for "phát"
      return () => clearTimeout(t);
    }
    if (scene === 'blvd-text') {
      const t = setTimeout(() => {
        setScene('blvd-clock-normal');
      }, 500); // 0.5s for "BLVD"
      return () => clearTimeout(t);
    }
    if (scene === 'blvd-clock-normal') {
      const t = setTimeout(() => {
        setScene('blvd-clock-reverse-mirrored');
      }, 600); // 0.6s
      return () => clearTimeout(t);
    }
    if (scene === 'blvd-clock-reverse-mirrored') {
      const t = setTimeout(() => {
        setScene('blvd-title-1');
      }, 600); // 0.6s
      return () => clearTimeout(t);
    }
    if (scene === 'blvd-title-1') {
      const t = setTimeout(() => {
        setScene('blvd-title-2');
      }, 600); // 0.6s for scene 1 (#BLVD)
      return () => clearTimeout(t);
    }
    if (scene === 'blvd-title-2') {
      const t = setTimeout(() => {
        setScene('blvd-color-1');
      }, 600); // 0.6s for scene 2 (#BLVD + CHANGE IN MIND)
      return () => clearTimeout(t);
    }
    if (scene === 'blvd-color-1') {
      const t = setTimeout(() => {
        setScene('blvd-color-2');
      }, 500); // 0.5s for #474c5a
      return () => clearTimeout(t);
    }
    if (scene === 'blvd-color-2') {
      const t = setTimeout(() => {
        setScene('blvd-color-3');
      }, 500); // 0.5s for #89CC04
      return () => clearTimeout(t);
    }
    if (scene === 'blvd-color-3') {
      const t = setTimeout(() => {
        setScene('blvd-black');
      }, 500); // 0.5s for #FF3BF1
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
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover portrait:object-[49%_center] z-0 opacity-0 pointer-events-none"
      />
      <img
        id="preload-young"
        src="https://i.ibb.co/Nd6BpwZ2/young.jpg"
        alt="Boulevard1st Young Background"
        referrerPolicy="no-referrer"
        loading="eager"
        fetchPriority="high"
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
            loading="eager"
            fetchPriority="high"
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
            loading="eager"
            fetchPriority="high"
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

      {/* --- SEPARATE #BLVD SEQUENCE --- */}
      {scene === 'blvd-play' && (
        <div 
          id="scene-blvd-play"
          className="absolute inset-0 flex items-center justify-center bg-black z-50 select-none"
        >
          <div
            id="blvd-phat-text"
            className="font-sans text-[clamp(2.5rem,8vw,5rem)] text-white/90 select-none tracking-normal font-normal"
          >
            phát
          </div>
        </div>
      )}

      {scene === 'blvd-text' && (
        <div 
          id="scene-blvd-outline-text"
          className="absolute inset-0 flex items-center justify-center bg-black z-50 overflow-hidden select-none w-full h-full"
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

      {scene === 'blvd-clock-normal' && <IntroClock mode="normal" />}
      {scene === 'blvd-clock-reverse-mirrored' && <IntroClock mode="reverse-mirrored" />}

      {/* BLVD Title Scenes (Scene 1: #BLVD, Scene 2: #BLVD + CHANGE IN MIND stacked like reference) */}
      {(scene === 'blvd-title-1' || scene === 'blvd-title-2') && (
        <div 
          id="scene-blvd-title"
          className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50 select-none px-4"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="font-archivo font-normal not-italic text-white text-[clamp(2.2rem,6.5vw,5.2rem)] tracking-wide leading-[1.15]">
              #BLVD
            </div>
            <div className={`font-archivo font-normal not-italic text-white text-[clamp(2.2rem,6.5vw,5.2rem)] tracking-wide leading-[1.15] ${scene === 'blvd-title-2' ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
              CHANGE IN MIND
            </div>
          </div>
        </div>
      )}

      {/* BLVD 3 Solid Color Scenes: #474c5a, #89CC04, #FF3BF1 */}
      {scene === 'blvd-color-1' && (
        <div 
          id="scene-blvd-color-1"
          className="absolute inset-0 bg-[#474c5a] z-50 select-none"
        />
      )}

      {scene === 'blvd-color-2' && (
        <div 
          id="scene-blvd-color-2"
          className="absolute inset-0 bg-[#89CC04] z-50 select-none"
        />
      )}

      {scene === 'blvd-color-3' && (
        <div 
          id="scene-blvd-color-3"
          className="absolute inset-0 bg-[#FF3BF1] z-50 select-none"
        />
      )}

      {/* BLVD Complete: Màn hình đen xì, không có gì cả */}
      {scene === 'blvd-black' && (
        <div 
          id="scene-blvd-black"
          className="absolute inset-0 bg-black z-50 select-none"
        />
      )}

      {/* Main App Screen (Background Image & Interactive Interface Layouts) */}
      {scene === 'main-app' && (
        <div className="absolute inset-0 z-10 overflow-x-hidden overflow-y-auto no-scrollbar scroll-smooth snap-y snap-mandatory overscroll-none">
          <div className="w-full flex flex-col overflow-x-hidden">
            {/* The 100vh Main Screen View */}
            <div className="relative w-full h-[calc(var(--vh,1vh)*100)] shrink-0 flex items-center justify-center overflow-hidden snap-start snap-always">
              {/* Background Image */}
              <VespertineBackground shiftLeft={false} />

              {/* Minimal Mode Indicator / Switcher in Main App (Top Left) */}
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
                  className="group bg-transparent border-0 p-0 text-white/70 hover:text-white transition-all cursor-pointer flex items-center select-none focus:outline-none"
                  title={`Current mode: ${portfolioMode === 'individual' ? 'individual' : 'employer / club'}. Click to switch.`}
                >
                  <span className="font-archivo text-xs tracking-wider lowercase transition-all group-hover:italic">
                    {language === 'vi'
                      ? (portfolioMode === 'individual' ? 'cá nhân' : 'nhà tuyển dụng / clb')
                      : (portfolioMode === 'individual' ? 'individual' : 'employer / club')
                    }
                  </span>
                </button>
              </div>

              {/* Minimal Language Indicator / Switcher in Main App (Top Right - Symmetrical) */}
              <div 
                id="main-app-lang-bar"
                className="absolute landscape:top-[6.5%] landscape:right-[6.5%] portrait:top-6 portrait:right-6 z-30 pointer-events-auto flex items-center"
              >
                <button
                  type="button"
                  id="lang-toggle-button"
                  onClick={() => {
                    const next = language === 'vi' ? 'en' : 'vi';
                    setLanguage(next);
                    try {
                      localStorage.setItem('blvd_language', next);
                    } catch (e) {}
                  }}
                  className="group bg-transparent border-0 p-0 text-white/70 hover:text-white transition-all cursor-pointer flex items-center select-none focus:outline-none"
                  title={`Current language: ${language === 'vi' ? 'Tiếng Việt' : 'English'}. Click to switch.`}
                >
                  <span className="font-archivo text-xs tracking-wider lowercase transition-all group-hover:italic">
                    {language === 'vi' ? 'tiếng việt' : 'english'}
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

            {/* Page 2: Table of Contents */}
            <div 
              id="page-black-blank"
              className="relative w-full h-[calc(var(--vh,1vh)*100)] max-h-[calc(var(--vh,1vh)*100)] bg-black shrink-0 z-20 flex items-center justify-between overflow-hidden snap-start snap-always select-none px-4 sm:px-8 md:px-12 lg:px-16"
            >
              {/* TABLE OF CONTENTS / MỤC LỤC Sublogo: Fixed aspect ratio vector so overlap & proportions are 100% mathematically locked */}
              <div className="relative h-[82%] sm:h-[88%] md:h-[92%] w-auto aspect-[160/720] shrink-0 flex items-center justify-center select-none pointer-events-none">
                <svg
                  viewBox="0 0 160 720"
                  className="h-full w-full overflow-visible"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <style>{`
                      .toc-sublogo-text {
                        font-family: Archivo, "Be Vietnam Pro", sans-serif;
                        font-weight: 900;
                        font-style: italic;
                        text-transform: uppercase;
                        letter-spacing: -0.04em;
                      }
                    `}</style>
                  </defs>

                  {/* Group rotated -90 deg so it reads vertically bottom-to-top */}
                  <g transform="rotate(-90) translate(-720, 0)">
                    {language === 'vi' ? (
                      <>
                        {/* Vietnamese mode: MỤC LỤC duplicated in 2 overlapping layers like English */}
                        {/* Layer 1: MỤC LỤC (Background/lower layer) */}
                        <text
                          x="0"
                          y="78"
                          className="toc-sublogo-text"
                          fontSize="115"
                          fill="#262626"
                          textLength="720"
                          lengthAdjust="spacingAndGlyphs"
                        >
                          MỤC LỤC
                        </text>

                        {/* Layer 2: MỤC LỤC (Foreground/overlapping layer) */}
                        <text
                          x="0"
                          y="142"
                          className="toc-sublogo-text"
                          fontSize="115"
                          fill="#3c3c3c"
                          textLength="720"
                          lengthAdjust="spacingAndGlyphs"
                        >
                          MỤC LỤC
                        </text>
                      </>
                    ) : (
                      <>
                        {/* English mode: TABLE OF CONTENTS */}
                        {/* Layer 1: TABLE OF */}
                        <text
                          x="0"
                          y="78"
                          className="toc-sublogo-text"
                          fontSize="108"
                          fill="#262626"
                          textLength="720"
                          lengthAdjust="spacingAndGlyphs"
                        >
                          TABLE OF
                        </text>

                        {/* Layer 2: CONTENTS */}
                        <text
                          x="0"
                          y="142"
                          className="toc-sublogo-text"
                          fontSize="108"
                          fill="#3c3c3c"
                          textLength="720"
                          lengthAdjust="spacingAndGlyphs"
                        >
                          CONTENTS
                        </text>
                      </>
                    )}
                  </g>
                </svg>
              </div>

              {/* Right Side: Project List - Centered and nicely spaced */}
              <div className="flex-1 flex flex-col justify-center pl-6 sm:pl-10 md:pl-16 lg:pl-24 max-w-4xl">
                <div className="flex flex-col justify-center space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 text-[clamp(1rem,2.6vw,2.35rem)] text-white/95 font-archivo font-medium tracking-tight leading-snug select-none">
                  {/* Item 01: Thông tin cơ bản / Basic Info */}
                  <div 
                    onClick={() => setIsBasicInfoOpen(true)}
                    className="w-fit flex flex-col portrait:flex-col portrait:items-start portrait:gap-0.5 landscape:flex-row landscape:items-baseline landscape:gap-3.5 lg:landscape:gap-4.5 cursor-pointer group"
                  >
                    <span className="font-archivo font-normal not-italic text-[#89CC04] text-[0.62em] sm:text-[0.68em] landscape:text-[1em] shrink-0 select-none">
                      01
                    </span>
                    <span className="hover-force-italic hover:text-white cursor-pointer">
                      {language === 'vi' ? 'Thông tin cơ bản' : 'Basic Information'}
                    </span>
                  </div>

                  {/* Item 02: TNTN */}
                  <div className="w-fit flex flex-col portrait:flex-col portrait:items-start portrait:gap-0.5 landscape:flex-row landscape:items-baseline landscape:gap-3.5 lg:landscape:gap-4.5">
                    <span className="font-archivo font-normal not-italic text-[#89CC04] text-[0.62em] sm:text-[0.68em] landscape:text-[1em] shrink-0 select-none">
                      02
                    </span>
                    <span className="hover-force-italic hover:text-white cursor-pointer">
                      {language === 'vi' ? 'Đội Thanh niên Tình nguyện - Trường THPT Chuyên Hùng Vương' : 'TNTN Team - Hung Vuong for the gifted'}
                    </span>
                  </div>

                  {/* Item 03: Olympia */}
                  <div className="w-fit flex flex-col portrait:flex-col portrait:items-start portrait:gap-0.5 landscape:flex-row landscape:items-baseline landscape:gap-3.5 lg:landscape:gap-4.5">
                    <span className="font-archivo font-normal not-italic text-[#89CC04] text-[0.62em] sm:text-[0.68em] landscape:text-[1em] shrink-0 select-none">
                      03
                    </span>
                    <span className="hover-force-italic hover:text-white cursor-pointer">
                      {language === 'vi' ? 'Câu lạc bộ Olympia - Trường THPT Chuyên Hùng Vương' : 'Hung Vuong Olympia Club - Hung Vuong for the gifted'}
                    </span>
                  </div>

                  {/* Item 04: #BLVD */}
                  <div 
                    onClick={handleBlvdClick}
                    className="w-fit flex flex-col portrait:flex-col portrait:items-start portrait:gap-0.5 landscape:flex-row landscape:items-baseline landscape:gap-3.5 lg:landscape:gap-4.5 cursor-pointer group"
                  >
                    <span className="font-archivo font-normal not-italic text-[#89CC04] text-[0.62em] sm:text-[0.68em] landscape:text-[1em] shrink-0 select-none">
                      04
                    </span>
                    <span className="hover-force-italic hover:text-white cursor-pointer">
                      #BLVD
                    </span>
                  </div>

                  {/* Item 05: [Reimagined] */}
                  <div className="w-fit flex flex-col portrait:flex-col portrait:items-start portrait:gap-0.5 landscape:flex-row landscape:items-baseline landscape:gap-3.5 lg:landscape:gap-4.5">
                    <span className="font-archivo font-normal not-italic text-[#89CC04] text-[0.62em] sm:text-[0.68em] landscape:text-[1em] shrink-0 select-none">
                      05
                    </span>
                    <span className="hover-force-italic hover:text-white cursor-pointer">
                      [Reimagined]
                    </span>
                  </div>

                  {/* Item: Khác / Others (không đánh số) - Reactively changes according to portfolioMode */}
                  <div 
                    className="w-fit flex flex-col items-start portrait:mt-2.5 portrait:pt-1.5"
                    title={portfolioMode === 'individual' 
                      ? (language === 'vi' ? 'Khả dụng ở chế độ Cá nhân' : 'Available in Individual Mode') 
                      : (language === 'vi' ? 'Chỉ có ở chế độ Cá nhân. Bấm để chuyển mode.' : 'Only in Individual mode. Click to switch.')
                    }
                  >
                    <span className={portfolioMode === 'individual' ? 'hover-force-italic text-white/95 hover:text-white cursor-pointer' : 'text-[#555555]'}>
                      {language === 'vi' ? 'Khác' : 'Others'}
                    </span>
                    <span className="text-[13px] sm:text-xs md:text-[0.52em] font-normal text-neutral-300/90 tracking-normal mt-1 flex items-center gap-1 flex-wrap">
                      {portfolioMode === 'individual' ? (
                        <span>{language === 'vi' ? '(Đang hiển thị)' : '(Active)'}</span>
                      ) : (
                        <span>
                          {language === 'vi' ? '(Chỉ có ở chế độ cá nhân, ' : '(Only in individual mode, '}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setPortfolioMode('individual');
                              try {
                                localStorage.setItem('blvd_portfolio_mode', 'individual');
                              } catch (err) {}
                            }}
                            className="text-neutral-300 hover:text-white no-underline hover-force-italic cursor-pointer transition-colors p-0 bg-transparent border-0 font-medium"
                          >
                            {language === 'vi' ? 'chuyển?' : 'switch?'}
                          </button>
                          {')'}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Window for "Thông tin cơ bản / Basic Information" */}
      {isBasicInfoOpen && (
        <div 
          id="basic-info-modal-backdrop"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-8 animate-fade-in"
          onClick={() => setIsBasicInfoOpen(false)}
        >
          {/* Outer Window Frame: Sharp Brutalist border, snug proportional fit without excess vertical space */}
          <div 
            id="basic-info-modal-window"
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-neutral-800 shadow-2xl flex flex-col justify-between overflow-hidden rounded-none select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button: Positioned directly in the corner without any fake tab bar / header row */}
            <button
              type="button"
              id="close-basic-info-btn"
              onClick={() => setIsBasicInfoOpen(false)}
              className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 text-neutral-400 hover:text-white transition-colors cursor-pointer select-none bg-transparent border-0 p-1 flex items-center justify-center group z-30"
              title={language === 'vi' ? 'Đóng' : 'Close'}
            >
              <span className="text-xl sm:text-2xl font-light transform transition-transform duration-300 ease-out group-hover:rotate-90 inline-block leading-none">
                ✕
              </span>
            </button>

            {/* Sunken Bold Italic Typography: Reduced opacity, subtly sunken into dark background */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-50">
              <div className="flex flex-col items-center justify-center font-archivo font-black italic tracking-tighter uppercase leading-[0.82] text-center w-full pb-6 sm:pb-8">
                {language === 'vi' ? (
                  <>
                    <span className="text-[clamp(2.8rem,9.5vw,5.6rem)] text-[#161616] whitespace-nowrap block">
                      THÔNG TIN
                    </span>
                    <span className="text-[clamp(2.8rem,9.5vw,5.6rem)] text-[#1a1a1a] whitespace-nowrap block">
                      CƠ BẢN
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[clamp(2.4rem,8.5vw,4.8rem)] text-[#161616] whitespace-nowrap block">
                      BASIC
                    </span>
                    <span className="text-[clamp(2.4rem,8.5vw,4.8rem)] text-[#1a1a1a] whitespace-nowrap block">
                      INFORMATION
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Modal Upper Content: Stacked top-to-bottom on mobile/portrait, side-by-side on sm+ */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-5 md:gap-6 w-full p-4 sm:p-5 md:p-6 pb-3 sm:pb-4 my-auto">
              {/* Square Image Frame: Centered and sized comfortably on mobile, side-by-side on sm+ */}
              <div 
                id="info-avatar-frame"
                className="shrink-0 w-28 xs:w-32 sm:w-[36%] md:w-[38%] max-w-[220px] aspect-square border border-neutral-700 bg-neutral-900 rounded-none overflow-hidden shadow-2xl mx-auto sm:mx-0"
              >
                <img
                  src="https://i.ibb.co/TD9mb1pB/avatar.jpg"
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-none select-none block"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content: Centered on mobile, left-aligned on sm+ */}
              <div className="flex-1 w-full flex flex-col items-center sm:items-start justify-center text-center sm:text-left py-0.5 select-text min-w-0">
                {/* Row 1: Name */}
                <h3 className="font-archivo font-black text-lg sm:text-2xl md:text-[1.65rem] text-white tracking-tight uppercase leading-tight mb-0.5 sm:mb-1 text-center sm:text-left truncate max-w-full">
                  {language === 'vi' ? 'Nguyễn Thuận Phát' : 'Phat Nguyen Thuan'}
                </h3>

                {/* Row 2: Major */}
                <p className="font-sans font-medium text-xs sm:text-sm md:text-base text-neutral-300 leading-snug mb-1 sm:mb-1.5 text-center sm:text-left">
                  {language === 'vi' ? 'Ngành Báo chí/Nguyện vọng định hướng thiết kế' : 'Journalism/Design Track Preference'}
                </p>

                {/* Row 3: University / School (No underline, clickable with subtle hover feedback) */}
                <a
                  href="https://hcmussh.edu.vn/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[11px] sm:text-xs md:text-sm text-neutral-400 hover:text-white no-underline transition-colors duration-200 cursor-pointer text-center sm:text-left leading-normal inline-block mb-2 sm:mb-3"
                  title={language === 'vi' ? 'Trường ĐH KHXH&NV, ĐHQG-HCM' : 'VNUHCM-USSH'}
                >
                  {language === 'vi' ? 'Trường ĐH KHXH&NV, ĐHQG-HCM' : 'VNUHCM-USSH'}
                </a>

                {/* Row 4: Tools / Công cụ sử dụng */}
                <div className="w-full flex flex-col items-center sm:items-start text-center sm:text-left pt-2 border-t border-neutral-800/90">
                  <span className="font-archivo font-semibold text-[10px] sm:text-xs text-neutral-400 tracking-wider uppercase mb-1.5 text-center sm:text-left">
                    {language === 'vi' ? 'Công cụ sử dụng:' : 'Tools:'}
                  </span>
                  {/* Tool Icons List: Canva, Affinity, Edits, ibisPaint, Google AI Studio, Filmora */}
                  <div className="flex items-center justify-center sm:justify-start flex-wrap gap-1.5 sm:gap-2">
                    {/* Canva */}
                    <div 
                      className="w-6 h-6 sm:w-7 sm:h-7 bg-neutral-900 flex items-center justify-center shrink-0 rounded-none border border-neutral-700 hover:scale-105 transition-transform overflow-hidden" 
                      title="Canva"
                    >
                      <img 
                        src="https://i.ibb.co/RTw2phXD/canva.jpg" 
                        alt="Canva" 
                        className="w-full h-full object-cover rounded-none select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Affinity */}
                    <div 
                      className="w-6 h-6 sm:w-7 sm:h-7 bg-neutral-900 flex items-center justify-center shrink-0 rounded-none border border-neutral-700 hover:scale-105 transition-transform overflow-hidden" 
                      title="Affinity"
                    >
                      <img 
                        src="https://i.ibb.co/pBXrq6cf/affinity.jpg" 
                        alt="Affinity" 
                        className="w-full h-full object-cover rounded-none select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Edits */}
                    <div 
                      className="w-6 h-6 sm:w-7 sm:h-7 bg-neutral-900 flex items-center justify-center shrink-0 rounded-none border border-neutral-700 hover:scale-105 transition-transform overflow-hidden" 
                      title="Edits"
                    >
                      <img 
                        src="https://i.ibb.co/Pv9VfwzX/edits.webp" 
                        alt="Edits" 
                        className="w-full h-full object-cover rounded-none select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* ibisPaint */}
                    <div 
                      className="w-6 h-6 sm:w-7 sm:h-7 bg-neutral-900 flex items-center justify-center shrink-0 rounded-none border border-neutral-700 hover:scale-105 transition-transform overflow-hidden" 
                      title="ibisPaint"
                    >
                      <img 
                        src="https://i.ibb.co/N66hJX5h/ibispaint.png" 
                        alt="ibisPaint" 
                        className="w-full h-full object-cover rounded-none select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Google AI Studio */}
                    <div 
                      className="w-6 h-6 sm:w-7 sm:h-7 bg-neutral-900 flex items-center justify-center shrink-0 rounded-none border border-neutral-700 hover:scale-105 transition-transform overflow-hidden" 
                      title="Google AI Studio"
                    >
                      <img 
                        src="https://i.ibb.co/7JyGd3tX/google-AIstudio.png" 
                        alt="Google AI Studio" 
                        className="w-full h-full object-cover rounded-none select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Filmora */}
                    <div 
                      className="w-6 h-6 sm:w-7 sm:h-7 bg-neutral-900 flex items-center justify-center shrink-0 rounded-none border border-neutral-700 hover:scale-105 transition-transform overflow-hidden" 
                      title="Filmora"
                    >
                      <img 
                        src="https://i.ibb.co/v4h21FLG/filmora.png" 
                        alt="Filmora" 
                        className="w-full h-full object-cover rounded-none select-none pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Contact Buttons Bar (Spec-inspired from Boulevard1st, flush along bottom edge) */}
            <div 
              id="basic-info-contact-bar" 
              className="relative z-20 w-full grid grid-cols-5 gap-0 border-t border-neutral-800 bg-black/60 select-none"
            >
              {/* Button 1: Facebook */}
              <a
                href="https://www.facebook.com/hellothisisBLVD17/"
                target="_blank"
                rel="noopener noreferrer"
                id="info-btn-fb"
                className="py-2.5 sm:py-3 min-h-[44px] px-1 flex items-center justify-center font-archivo font-semibold text-[11px] xs:text-xs sm:text-sm text-white/90 lowercase border-r border-neutral-800 hover:bg-[#1877F2] hover:text-white active:bg-[#0c59be] active:text-white transition-colors cursor-pointer rounded-none no-underline text-center whitespace-nowrap"
                title="facebook"
              >
                facebook
              </a>

              {/* Button 2: Instagram */}
              <a
                href="https://www.instagram.com/endenogatai_dah"
                target="_blank"
                rel="noopener noreferrer"
                id="info-btn-insta"
                className="py-2.5 sm:py-3 min-h-[44px] px-1 flex items-center justify-center font-archivo font-semibold text-[11px] xs:text-xs sm:text-sm text-white/90 lowercase border-r border-neutral-800 hover:bg-gradient-to-r hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white active:bg-gradient-to-r active:from-[#d87c1e] active:via-[#b81b34] active:to-[#910d68] active:text-white transition-all cursor-pointer rounded-none no-underline text-center whitespace-nowrap"
                title="instagram"
              >
                instagram
              </a>

              {/* Button 3: TikTok */}
              <a
                href="https://www.tiktok.com/@becamextokyubus?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                id="info-btn-tiktok"
                className="py-2.5 sm:py-3 min-h-[44px] px-1 flex items-center justify-center font-archivo font-semibold text-[11px] xs:text-xs sm:text-sm text-white/90 lowercase border-r border-neutral-800 hover:bg-gradient-to-r hover:from-[#25F4EE] hover:to-[#FE2C55] hover:text-black active:bg-gradient-to-r active:from-[#1ed7d2] active:to-[#d91e44] active:text-white transition-all cursor-pointer rounded-none no-underline text-center whitespace-nowrap"
                title="tiktok"
              >
                tiktok
              </a>

              {/* Button 4: Phone / Zalo */}
              <button
                type="button"
                id="info-btn-phone"
                onClick={handlePhoneClick}
                className={`py-2.5 sm:py-3 min-h-[44px] px-1 flex items-center justify-center font-archivo font-semibold text-[11px] xs:text-xs sm:text-sm lowercase border-r border-neutral-800 transition-colors cursor-pointer rounded-none border-t-0 border-b-0 border-l-0 text-center whitespace-nowrap ${
                  phoneCopied 
                    ? '!bg-[#10B981] !text-black font-bold' 
                    : 'bg-transparent text-white/90 hover:bg-[#10B981] hover:text-black active:bg-[#047857] active:text-white'
                }`}
                title="0833939468"
              >
                {phoneCopied ? 'copied' : 'phone'}
              </button>

              {/* Button 5: Work Email */}
              <button
                type="button"
                id="info-btn-email"
                onClick={handleEmailClick}
                className={`py-2.5 sm:py-3 min-h-[44px] px-1 flex items-center justify-center font-archivo font-semibold text-[11px] xs:text-xs sm:text-sm lowercase transition-colors cursor-pointer rounded-none border-0 text-center whitespace-nowrap ${
                  emailCopied 
                    ? '!bg-[#EA4335] !text-white font-bold' 
                    : 'bg-transparent text-white/90 hover:bg-[#EA4335] hover:text-white active:bg-[#b31412] active:text-white'
                }`}
                title="thuanphat26092008@gmail.com"
              >
                {emailCopied ? 'copied' : 'email'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
