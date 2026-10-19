import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, Compass, Play, Pause } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const frameNumber = String(Math.min(TOTAL_FRAMES, Math.max(1, index))).padStart(3, '0');
  return `/images/hero-section/frame-${frameNumber}.webp`;
};

export interface RoomMilestone {
  id: string;
  roomNumber: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  palette: string[];
  materials: string[];
  frameRange: [number, number]; // [startFrame, endFrame]
  progressRange: [number, number]; // [startFraction, endFraction]
}

const ROOM_MILESTONES: RoomMilestone[] = [
  {
    id: 'facade',
    roomNumber: '01',
    title: 'Exterior Architectural Facade',
    category: 'Contemporary Villa Architecture',
    subtitle: 'Contemporary Villa Geometry & Linear Illumination',
    description: 'Monolithic limestone massing paired with double-height structural glazing and dramatic evening facade wash grazing.',
    palette: ['Limestone Taupe', 'Charcoal Steel', 'Warm Amber LED'],
    materials: ['Honed Natural Stone', 'Thermally Broken Black Aluminum', 'Low-E Acoustic Glass'],
    frameRange: [1, 48],
    progressRange: [0.00, 0.20],
  },
  {
    id: 'foyer',
    roomNumber: '02',
    title: 'Threshold & Entry Foyer',
    category: 'Architectural Entrance',
    subtitle: 'Floating Portico & Glass Pivot Transition',
    description: 'A 3-meter oversized frameless glass pivot portal bridging the exterior travertine walkway into the private interior.',
    palette: ['Smoked Bronze', 'Natural Travertine', 'Deep Graphite'],
    materials: ['Frameless Glass Pivot', 'Micro-textured Concrete Portico', 'Recessed Floor Washers'],
    frameRange: [49, 96],
    progressRange: [0.20, 0.40],
  },
  {
    id: 'great-hall',
    roomNumber: '03',
    title: 'Grand Living Pavilion',
    category: 'Formal Living & Great Room',
    subtitle: 'Monolithic Columns, Marble Accents & Fluid Sightlines',
    description: 'Expansive open-plan living volume framed by architectural fluted columns, book-matched marble features, and tailored low-profile seating.',
    palette: ['Warm Taupe', 'Calacatta Vein', 'Muted Brass'],
    materials: ['Book-matched Marble Wall', 'Curved Bouclé Upholstery', 'Brushed Brass Pendants'],
    frameRange: [97, 156],
    progressRange: [0.40, 0.65],
  },
  {
    id: 'dining',
    roomNumber: '04',
    title: 'Culinary Axis & Dining Corridor',
    category: 'Kitchen & Dining Integration',
    subtitle: 'Concealed Joinery & Architectural Island',
    description: 'Precision flat-panel cabinetry concealing prep zones, flanked by vertical acoustic timber fluting and warm atmospheric coves.',
    palette: ['Smoked Walnut', 'Matte Sandstone', 'Charcoal Slate'],
    materials: ['Natural Walnut Veneer', 'Zero-Grout Sintered Stone', 'Integrated LED Grazers'],
    frameRange: [157, 204],
    progressRange: [0.65, 0.85],
  },
  {
    id: 'lounge',
    roomNumber: '05',
    title: 'Private Lounge Suite',
    category: 'Family Living & Fireside',
    subtitle: 'Curated Seating, Textured Walls & Layered Warm Light',
    description: 'An intimate sanctuary featuring custom camel-leather modular seating, flush bioethanol linear hearth, and layered ambient lighting.',
    palette: ['Camel Leather', 'Earthy Ochre', 'Warm Espresso'],
    materials: ['Top-Grain Aniline Leather', 'Limewash Mineral Plaster', 'Fluted Teak Louvers'],
    frameRange: [205, 240],
    progressRange: [0.85, 1.00],
  },
];

export const CinematicWalkthrough: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Direct DOM references for silky 60-120fps HUD updates without React re-render lag
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);
  const headerOverlayRef = useRef<HTMLDivElement>(null);
  const milestoneCardRef = useRef<HTMLDivElement>(null);
  const spaceBadgeRef = useRef<HTMLSpanElement>(null);

  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [isManualReducedMotion, setIsManualReducedMotion] = useState(false);
  const [isAutoTouring, setIsAutoTouring] = useState(false);

  // Fast direct array lookup for all 240 pre-decoded Image objects
  const frameCacheRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const inFlightRef = useRef<Set<number>>(new Set());

  const currentFrameFloatRef = useRef<number>(1);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const autoTourIdRef = useRef<number | null>(null);

  // Check reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsManualReducedMotion(true);
    }
  }, []);

  // Async frame loader with off-main-thread decode
  const triggerLoad = useCallback((index: number) => {
    if (index < 1 || index > TOTAL_FRAMES) return;
    if (frameCacheRef.current[index] || inFlightRef.current.has(index)) return;

    inFlightRef.current.add(index);
    const img = new Image();
    img.src = getFramePath(index);

    img.onload = () => {
      if (typeof img.decode === 'function') {
        img
          .decode()
          .then(() => {
            frameCacheRef.current[index] = img;
            inFlightRef.current.delete(index);
          })
          .catch(() => {
            frameCacheRef.current[index] = img;
            inFlightRef.current.delete(index);
          });
      } else {
        frameCacheRef.current[index] = img;
        inFlightRef.current.delete(index);
      }
    };
    img.onerror = () => {
      inFlightRef.current.delete(index);
    };
  }, []);

  // Fast loaded frame getter with tight outward fallback
  const getLoadedFrame = useCallback((targetFrame: number): HTMLImageElement | null => {
    const cache = frameCacheRef.current;
    if (cache[targetFrame]) return cache[targetFrame];

    // Priority load target and adjacent
    triggerLoad(targetFrame);
    triggerLoad(targetFrame + 1);
    triggerLoad(targetFrame - 1);

    for (let offset = 1; offset <= 30; offset++) {
      if (targetFrame - offset >= 1 && cache[targetFrame - offset]) {
        return cache[targetFrame - offset];
      }
      if (targetFrame + offset <= TOTAL_FRAMES && cache[targetFrame + offset]) {
        return cache[targetFrame + offset];
      }
    }

    return cache[1] || null;
  }, [triggerLoad]);

  // High-performance canvas render with sub-frame crossfade interpolation
  const renderFrame = useCallback((frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Sub-frame breakdown for liquid crossfade
    const clampedFrame = Math.min(TOTAL_FRAMES, Math.max(1, frameFloat));
    const baseFrame = Math.floor(clampedFrame);
    const nextFrame = Math.min(TOTAL_FRAMES, baseFrame + 1);
    const blendFraction = clampedFrame - baseFrame;

    const img1 = getLoadedFrame(baseFrame);
    const img2 = blendFraction > 0.04 ? getLoadedFrame(nextFrame) : null;

    if (!img1 || !img1.complete || img1.naturalWidth === 0) return;

    const imgRatio = img1.naturalWidth / img1.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
    }

    // Subtle, continuous perspective camera depth momentum (1.00 -> 1.042)
    const overallProgress = (clampedFrame - 1) / (TOTAL_FRAMES - 1);
    const cameraZoom = 1.0 + overallProgress * 0.042;

    drawWidth *= cameraZoom;
    drawHeight *= cameraZoom;

    const x = Math.round((width - drawWidth) / 2);
    const y = Math.round((height - drawHeight) / 2);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw primary base frame
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img1, x, y, Math.round(drawWidth), Math.round(drawHeight));

    // Smoothly blend in next frame for continuous 120fps motion-picture fluidity
    if (img2 && img2.complete && img2.naturalWidth > 0 && blendFraction > 0.04) {
      ctx.globalAlpha = blendFraction;
      ctx.drawImage(img2, x, y, Math.round(drawWidth), Math.round(drawHeight));
      ctx.globalAlpha = 1.0;
    }

    currentFrameFloatRef.current = clampedFrame;
  }, [getLoadedFrame]);

  // Comprehensive parallel preloader for all 240 frames
  useEffect(() => {
    let isCancelled = false;

    // Load frame 1 immediately
    const imgFirst = new Image();
    imgFirst.src = getFramePath(1);
    imgFirst.onload = () => {
      if (isCancelled) return;
      frameCacheRef.current[1] = imgFirst;
      renderFrame(1);
    };

    // Preload all 240 frames in parallel batches of 20
    const loadAll = async () => {
      const batchSize = 20;
      for (let i = 1; i <= TOTAL_FRAMES; i += batchSize) {
        if (isCancelled) return;
        const currentBatch: Promise<void>[] = [];

        for (let j = i; j < i + batchSize && j <= TOTAL_FRAMES; j++) {
          const frameNum = j;
          const p = new Promise<void>((resolve) => {
            const img = new Image();
            img.src = getFramePath(frameNum);
            const done = () => {
              if (!isCancelled) {
                frameCacheRef.current[frameNum] = img;
              }
              resolve();
            };

            if (typeof img.decode === 'function') {
              img.decode().then(done).catch(done);
            } else {
              img.onload = done;
              img.onerror = done;
            }
          });
          currentBatch.push(p);
        }

        await Promise.all(currentBatch);
        // Micro-yield to keep UI responsive
        await new Promise((r) => setTimeout(r, 15));
      }
    };

    loadAll();

    return () => {
      isCancelled = true;
    };
  }, [renderFrame]);

  // Handle canvas sizing with DPR clamping for high fill-rate
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);

      renderFrame(currentFrameFloatRef.current || 1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  // Direct DOM updater for HUD & milestones (zero layout thrashing or React re-render lag)
  const updateHUD = useCallback((progress: number) => {
    // 1. Scrubber line
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
    }

    // 2. Percentage text
    if (progressTextRef.current) {
      progressTextRef.current.textContent = `${Math.round(progress * 100)}% Walkthrough`;
    }

    // 3. Editorial intro headline fade-out
    if (headerOverlayRef.current) {
      const op = Math.max(0, 1 - progress * 8.5);
      headerOverlayRef.current.style.opacity = String(op);
      headerOverlayRef.current.style.transform = `translateY(-${progress * 80}px)`;
      headerOverlayRef.current.style.pointerEvents = op < 0.08 ? 'none' : 'auto';
    }

    // 4. Milestone overlay card visibility
    if (milestoneCardRef.current) {
      const cardOp = Math.min(1, Math.max(0, (progress - 0.12) * 7));
      milestoneCardRef.current.style.opacity = String(cardOp);
    }

    // 5. Update active milestone tab index (throttled)
    const currentFrame = Math.round(1 + progress * (TOTAL_FRAMES - 1));
    const mIdx = ROOM_MILESTONES.findIndex(
      (m) => currentFrame >= m.frameRange[0] && currentFrame <= m.frameRange[1]
    );
    if (mIdx !== -1) {
      setActiveMilestoneIndex(mIdx);
      if (spaceBadgeRef.current) {
        spaceBadgeRef.current.textContent = `SPACE ${ROOM_MILESTONES[mIdx].roomNumber} • ${ROOM_MILESTONES[mIdx].title}`;
      }
    }
  }, []);

  // GSAP Tween with ScrollTrigger: Deeply extended scroll distance (+=950%) & silky 1.5s scrub
  useEffect(() => {
    if (!containerRef.current || !viewportRef.current) return;

    renderFrame(1);

    const frameObject = { frame: 1, progress: 0 };

    // GSAP tween smoothly scrubbing frame from 1 to 240 across 9.5 viewport heights (~10,000px)
    const tween = gsap.to(frameObject, {
      frame: TOTAL_FRAMES,
      progress: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=950%', // Deeply extended, lengthy scroll distance
        pin: viewportRef.current,
        pinSpacing: true,
        scrub: isManualReducedMotion ? 0.1 : 1.5, // 1.5s damped inertia for buttery liquid smoothing
        anticipatePin: 1,
        onUpdate: (self) => {
          updateHUD(self.progress);
        },
      },
      onUpdate: () => {
        // Called by GSAP's internal 60-120 FPS ticker with floating-point frame value
        renderFrame(frameObject.frame);
      },
    });

    tweenRef.current = tween;
    scrollTriggerRef.current = tween.scrollTrigger || null;

    return () => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    };
  }, [renderFrame, isManualReducedMotion, updateHUD]);

  // Auto-tour continuous smooth scroll
  useEffect(() => {
    if (!isAutoTouring) {
      if (autoTourIdRef.current) {
        cancelAnimationFrame(autoTourIdRef.current);
        autoTourIdRef.current = null;
      }
      return;
    }

    const stepTour = () => {
      const st = scrollTriggerRef.current;
      if (!st) {
        setIsAutoTouring(false);
        return;
      }

      if (st.progress >= 0.999) {
        setIsAutoTouring(false);
        return;
      }

      window.scrollBy({ top: 3.5, behavior: 'instant' as ScrollBehavior });
      autoTourIdRef.current = requestAnimationFrame(stepTour);
    };

    autoTourIdRef.current = requestAnimationFrame(stepTour);

    return () => {
      if (autoTourIdRef.current) {
        cancelAnimationFrame(autoTourIdRef.current);
      }
    };
  }, [isAutoTouring]);

  // Jump smoothly to a specific room milestone
  const jumpToMilestone = (index: number) => {
    const st = scrollTriggerRef.current;
    if (!st) return;

    setIsAutoTouring(false);

    const milestone = ROOM_MILESTONES[index];
    const targetFraction = (milestone.frameRange[0] - 1) / (TOTAL_FRAMES - 1);
    const scrollTarget = st.start + targetFraction * (st.end - st.start);

    window.scrollTo({
      top: scrollTarget,
      behavior: 'smooth',
    });
  };

  const currentMilestone = ROOM_MILESTONES[activeMilestoneIndex];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full bg-[#161514]"
      aria-label="3D Scroll-Controlled Interior Walkthrough"
    >
      {/* Sticky / Pinned Fullscreen Walkthrough Viewport */}
      <div
        ref={viewportRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between relative"
      >
        {/* HTML5 Canvas Render Layer */}
        <div className="absolute inset-0 z-0 select-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />

          {/* Luxury Architectural Scrims for text legibility while preserving 3D depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/95 via-[#161514]/25 to-[#161514]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161514]/75 via-transparent to-[#161514]/35 pointer-events-none" />
        </div>

        {/* Top Architectural HUD / Milestone Tracker */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 flex justify-between items-start text-white">
          
          {/* Active Space Identifier Badge */}
          <div className="flex items-center space-x-3 bg-[#161514]/75 backdrop-blur-md px-4 py-2 border border-white/10 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#C2A676] animate-pulse" />
            <span
              ref={spaceBadgeRef}
              className="text-[11px] sm:text-xs tracking-[0.24em] uppercase font-mono text-white/90"
            >
              SPACE {currentMilestone.roomNumber} <span className="text-[#C2A676]">&bull;</span> {currentMilestone.title}
            </span>
          </div>

          {/* Location & Controls HUD */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            {/* Auto-Tour Toggle */}
            <button
              onClick={() => setIsAutoTouring(!isAutoTouring)}
              className={`flex items-center space-x-2 px-3.5 py-1.5 backdrop-blur-md border transition-all duration-300 text-xs ${
                isAutoTouring
                  ? 'bg-[#C2A676] text-black border-[#C2A676] font-medium shadow-[0_0_15px_rgba(194,166,118,0.5)]'
                  : 'bg-[#161514]/70 text-white/80 border-white/15 hover:border-[#C2A676] hover:text-white'
              }`}
              aria-label={isAutoTouring ? 'Pause cinematic tour' : 'Play cinematic tour'}
            >
              {isAutoTouring ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-black" />
                  <span className="tracking-widest uppercase font-mono text-[11px]">Touring</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#C2A676]" />
                  <span className="tracking-widest uppercase font-mono text-[11px]">Auto Tour</span>
                </>
              )}
            </button>

            {/* Progress HUD */}
            <div className="hidden sm:flex items-center space-x-2 tracking-widest text-white/80 bg-[#161514]/70 backdrop-blur-md px-4 py-1.5 border border-white/10 font-mono">
              <Compass className="w-3.5 h-3.5 text-[#C2A676]" />
              <span className="text-white/60">Kasaragod &bull;</span>
              <span ref={progressTextRef} className="text-[#C2A676] font-medium">
                0% Walkthrough
              </span>
            </div>
          </div>
        </div>

        {/* Center Editorial Text: Gently fades out as user explores deeper */}
        <div
          ref={headerOverlayRef}
          className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 text-white transition-transform duration-100 ease-out"
        >
          <div className="max-w-3xl space-y-4">
            <p className="text-xs sm:text-sm tracking-[0.28em] uppercase text-[#C2A676] font-sans font-medium">
              Spaces Designed Around You
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#FAF8F5]">
              Where Architecture Meets Everyday Living.
            </h1>
            <p className="font-sans text-base sm:text-lg text-white/85 max-w-2xl font-light leading-relaxed">
              Thoughtfully designed interiors that bring beauty, functionality, and comfort into every corner of your home.
            </p>
          </div>
        </div>

        {/* Milestone Indicator Overlay when deeply inside walkthrough (hidden on mobile) */}
        <div
          ref={milestoneCardRef}
          className="hidden md:block relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 text-white opacity-0 transition-opacity duration-300 pointer-events-none"
        >
          <div className="max-w-xl bg-[#161514]/85 backdrop-blur-xl p-5 sm:p-6 border border-white/15 space-y-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <span className="text-[10px] tracking-[0.28em] uppercase text-[#C2A676] font-mono block">
              CURRENT SPACE &bull; {currentMilestone.roomNumber} &bull; {currentMilestone.category}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
              {currentMilestone.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
              {currentMilestone.description}
            </p>
            {/* Material Palette Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2">
              {currentMilestone.palette.map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 text-[10px] sm:text-[11px] font-mono tracking-wider bg-white/10 text-white/90 border border-white/15"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Interactive Scroll Tracker & Milestone Badges */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pb-8 sm:pb-10 pr-20 md:pr-44 xl:pr-48 text-white flex flex-col justify-end space-y-4">
          
          {/* Progress Timeline Scrubber Bar with Gold Glow */}
          <div className="relative w-full h-[4px] bg-white/20 rounded-full overflow-hidden shadow-inner">
            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-[#A88B58] via-[#C2A676] to-[#E5D7B7] shadow-[0_0_10px_rgba(194,166,118,0.7)]"
              style={{ width: '0%' }}
            />
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            {/* Scroll Indicator */}
            <div className="flex items-center space-x-3 text-xs tracking-[0.22em] uppercase text-white/80 font-sans">
              <span className="inline-block w-6 h-[1px] bg-[#C2A676]" />
              <span>Scroll to Walk Through ({activeMilestoneIndex + 1} of {ROOM_MILESTONES.length} Spaces)</span>
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center animate-bounce ml-1">
                <ChevronDown className="w-3.5 h-3.5 text-[#C2A676]" />
              </div>
            </div>

            {/* Interactive Room Milestones */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 max-w-full scrollbar-none">
              {ROOM_MILESTONES.map((milestone, idx) => {
                const isActive = activeMilestoneIndex === idx;
                return (
                  <button
                    key={milestone.id}
                    onClick={() => jumpToMilestone(idx)}
                    className={`px-3 py-1.5 text-[11px] sm:text-xs tracking-wider transition-all duration-300 border text-left whitespace-nowrap flex items-center space-x-1.5 ${
                      isActive
                        ? 'border-[#C2A676] bg-[#C2A676]/25 text-white font-medium shadow-[0_0_15px_rgba(194,166,118,0.35)]'
                        : 'border-white/15 bg-black/45 text-white/60 hover:text-white hover:border-white/40'
                    }`}
                    aria-label={`Jump to Space ${milestone.roomNumber}: ${milestone.title}`}
                  >
                    <span className="opacity-60 font-mono text-[10px]">{milestone.roomNumber}</span>
                    <span>{milestone.title.split(' ')[0]} {milestone.title.split(' ')[1] || ''}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CinematicWalkthrough;
