import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronDown, Compass } from 'lucide-react';

const TOTAL_FRAMES = 240;

const getFramePath = (index: number) => {
  const frameNumber = String(Math.min(TOTAL_FRAMES, Math.max(1, index))).padStart(3, '0');
  return `/images/hero-section/ezgif-frame-${frameNumber}.png`;
};

const ROOM_MILESTONES = [
  { range: [1, 45], id: '01', title: 'Exterior Architectural Facade', subtitle: 'Contemporary Villa Geometry & Linear Illumination' },
  { range: [46, 100], id: '02', title: 'Threshold & Entry Foyer', subtitle: 'Floating Portico & Glass Pivot Transition' },
  { range: [101, 180], id: '03', title: 'Grand Living Pavilion', subtitle: 'Monolithic Columns, Marble Accents & Fluid Sightlines' },
  { range: [181, 240], id: '04', title: 'Private Lounge Suite', subtitle: 'Curated Seating, Textured Walls & Layered Warm Light' },
];

export const CinematicWalkthrough: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(0);
  const [isManualReducedMotion, setIsManualReducedMotion] = useState(false);

  // Cache of loaded image elements
  const imagesCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  // In-flight loading promises to prevent redundant fetches
  const inFlightRef = useRef<Set<number>>(new Set());

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameIdRef = useRef<number | null>(null);

  // Check reduced-motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsManualReducedMotion(true);
    }
  }, []);

  // On-demand loader function
  const triggerLoad = useCallback((index: number) => {
    if (index < 1 || index > TOTAL_FRAMES) return;
    if (imagesCacheRef.current.has(index) || inFlightRef.current.has(index)) return;

    inFlightRef.current.add(index);
    const img = new Image();
    img.src = getFramePath(index);
    img.onload = () => {
      imagesCacheRef.current.set(index, img);
      inFlightRef.current.delete(index);
    };
    img.onerror = () => {
      inFlightRef.current.delete(index);
    };
  }, []);

  // Initial prioritized keyframe preloading
  useEffect(() => {
    let isCancelled = false;

    // Load Frame 1 immediately
    triggerLoad(1);

    // Load 24 primary milestone anchor frames (1, 10, 20, 30... 240) in sequence
    const primaryAnchors: number[] = [];
    for (let i = 1; i <= TOTAL_FRAMES; i += 10) {
      primaryAnchors.push(i);
    }
    if (!primaryAnchors.includes(TOTAL_FRAMES)) primaryAnchors.push(TOTAL_FRAMES);

    let anchorIdx = 0;
    const loadNextAnchor = () => {
      if (isCancelled || anchorIdx >= primaryAnchors.length) return;
      const f = primaryAnchors[anchorIdx++];
      triggerLoad(f);
      setTimeout(loadNextAnchor, 25);
    };

    loadNextAnchor();

    // After primary anchors, progressively load intermediate frames in small batches
    const timer = setTimeout(() => {
      if (isCancelled) return;
      let cur = 1;
      const loadNextBatch = () => {
        if (isCancelled || cur > TOTAL_FRAMES) return;
        for (let b = 0; b < 6 && cur <= TOTAL_FRAMES; b++, cur++) {
          triggerLoad(cur);
        }
        setTimeout(loadNextBatch, 80);
      };
      loadNextBatch();
    }, 800);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [triggerLoad]);

  // Update scroll progress based on pinned section scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

      targetProgressRef.current = progress;
      setScrollProgress(progress);

      // Determine active milestone
      const frameNum = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
      const milestoneIdx = ROOM_MILESTONES.findIndex(
        (m) => frameNum >= m.range[0] && frameNum <= m.range[1]
      );
      if (milestoneIdx !== -1) {
        setActiveMilestoneIndex(milestoneIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Find the closest loaded frame to targetFrame across entire cache
  const getNearestLoadedFrame = useCallback((targetFrame: number): HTMLImageElement | null => {
    const cache = imagesCacheRef.current;
    
    // Priority fetch on-demand for target and neighbors
    triggerLoad(targetFrame);
    triggerLoad(targetFrame + 1);
    triggerLoad(targetFrame + 2);
    triggerLoad(targetFrame - 1);
    triggerLoad(targetFrame - 2);

    if (cache.has(targetFrame)) {
      return cache.get(targetFrame)!;
    }

    // Find the closest available frame currently in memory
    let closestKey = 1;
    let minDiff = Infinity;
    for (const key of cache.keys()) {
      const diff = Math.abs(key - targetFrame);
      if (diff < minDiff) {
        minDiff = diff;
        closestKey = key;
      }
    }

    return cache.get(closestKey) || null;
  }, [triggerLoad]);

  // Render frame to canvas with smooth lerp interpolation and subtle 3D forward zoom
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Smooth lerp factor for fluid camera inertia (instant when reduced motion preferred)
    const lerpFactor = isManualReducedMotion ? 1.0 : 0.16;
    currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * lerpFactor;
    
    // Prevent tiny floating oscillations
    if (Math.abs(targetProgressRef.current - currentProgressRef.current) < 0.0001) {
      currentProgressRef.current = targetProgressRef.current;
    }

    const progress = currentProgressRef.current;
    const exactFrame = 1 + progress * (TOTAL_FRAMES - 1);
    const frameIndex = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(exactFrame)));

    const img = getNearestLoadedFrame(frameIndex);

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    if (img && img.complete && img.naturalWidth > 0) {
      const imgRatio = img.naturalWidth / img.naturalHeight;
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

      // Subtle 3D camera forward momentum (1.00 -> 1.03 micro-depth)
      const fractionalMomentum = (exactFrame % 1);
      const microZoom = 1.0 + fractionalMomentum * 0.015;

      drawWidth *= microZoom;
      drawHeight *= microZoom;

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.save();
      ctx.drawImage(img, x, y, drawWidth, drawHeight);
      ctx.restore();
    }

    // Keep animation frame loop alive
    animationFrameIdRef.current = requestAnimationFrame(renderCanvas);
  }, [getNearestLoadedFrame, isManualReducedMotion]);

  // Setup canvas size and requestAnimationFrame loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    animationFrameIdRef.current = requestAnimationFrame(renderCanvas);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [renderCanvas]);

  // Jump to specific milestone when clicking timeline badges
  const jumpToMilestone = (index: number) => {
    if (!containerRef.current) return;
    const milestone = ROOM_MILESTONES[index];
    const targetFrame = milestone.range[0];
    const targetFraction = (targetFrame - 1) / (TOTAL_FRAMES - 1);

    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollTop = containerRef.current.offsetTop + targetFraction * totalScrollable;

    window.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    });
  };

  const currentMilestone = ROOM_MILESTONES[activeMilestoneIndex];

  // Opacity for initial editorial headline (fades gently as you journey deeper into the architecture)
  const overlayOpacity = Math.max(0, 1 - scrollProgress * 3.2);
  const overlayTranslateY = scrollProgress * 70;

  // Active progress percentage
  const displayPercentage = Math.round(scrollProgress * 100);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#161514]"
      aria-label="3D Scroll-Controlled Interior Walkthrough"
    >
      {/* Sticky Fullscreen 3D Walkthrough Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* HTML5 Canvas Walkthrough Render Layer */}
        <div className="absolute inset-0 z-0 select-none">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover"
          />

          {/* Luxury Architectural Scrims for text legibility while preserving 3D depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#161514]/90 via-[#161514]/20 to-[#161514]/50 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#161514]/70 via-transparent to-[#161514]/30 pointer-events-none" />
        </div>

        {/* Top Architectural HUD / Milestone Tracker */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pt-28 sm:pt-32 flex justify-end items-start text-white">
          <div className="flex items-center space-x-3 text-xs tracking-widest text-white/80 bg-[#161514]/60 backdrop-blur-md px-4 py-1.5 border border-white/10">
            <Compass className="w-3.5 h-3.5 text-[#C2A676]" />
            <span className="hidden sm:inline">Kasaragod, Kerala &bull; </span>
            <span className="font-mono text-[#C2A676]">{displayPercentage}% Walkthrough</span>
          </div>
        </div>

        {/* Center Editorial Text: Gently fades out as user explores deeper */}
        <div
          className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 text-white transition-opacity duration-300"
          style={{
            opacity: overlayOpacity,
            transform: `translateY(-${overlayTranslateY}px)`,
            pointerEvents: overlayOpacity < 0.1 ? 'none' : 'auto',
          }}
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

        {/* Milestone Indicator Overlay when deeply inside walkthrough */}
        {scrollProgress > 0.22 && (
          <div
            className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 text-white animate-fadeIn pointer-events-none"
            style={{
              opacity: Math.min(1, (scrollProgress - 0.22) * 4),
            }}
          >
            <div className="max-w-xl bg-[#161514]/75 backdrop-blur-md p-5 border border-white/15 space-y-1">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#C2A676] font-mono block">
                CURRENT SPACE &bull; {currentMilestone.id}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5]">
                {currentMilestone.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/70 font-light">
                {currentMilestone.subtitle}
              </p>
            </div>
          </div>
        )}

        {/* Bottom Bar: Interactive Scroll Tracker & Milestone Badges */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-8 lg:px-12 pb-10 sm:pb-12 text-white flex flex-col justify-end space-y-5">
          
          {/* Progress Timeline Scrubber Bar */}
          <div className="relative w-full h-[3px] bg-white/20 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 bottom-0 bg-[#C2A676] transition-all duration-75"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Scroll Indicator */}
            <div className="flex items-center space-x-3 text-xs tracking-[0.22em] uppercase text-white/80 font-sans">
              <span className="inline-block w-6 h-[1px] bg-[#C2A676]" />
              <span>Scroll to Walk Through</span>
              <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center animate-bounce ml-2">
                <ChevronDown className="w-3.5 h-3.5 text-[#C2A676]" />
              </div>
            </div>

            {/* Interactive Room Milestones */}
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto pb-1 max-w-full">
              {ROOM_MILESTONES.map((milestone, idx) => {
                const isActive = activeMilestoneIndex === idx;
                return (
                  <button
                    key={milestone.id}
                    onClick={() => jumpToMilestone(idx)}
                    className={`px-3 py-1.5 text-[11px] sm:text-xs tracking-wider transition-all duration-300 border text-left whitespace-nowrap ${
                      isActive
                        ? 'border-[#C2A676] bg-[#C2A676]/20 text-white font-medium shadow-[0_0_12px_rgba(194,166,118,0.25)]'
                        : 'border-white/15 bg-black/40 text-white/60 hover:text-white hover:border-white/40'
                    }`}
                    aria-label={`Jump to ${milestone.title}`}
                  >
                    <span className="opacity-60 mr-1.5 font-mono">{milestone.id}</span>
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
