import { useEffect, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import FrameLoader from './FrameLoader';

const FRAME_COUNT = 240;
const FRAME_PATH = (i) => `/assets/hero-frames/frame-${String(i).padStart(4, '0')}.jpg`;
// How much extra scroll distance to give the sequence, in viewport heights.
const SCROLL_LENGTH_VH = 3.5;
// Text fades out over the first 35% of the scroll, then the imagery holds the frame.
const TEXT_FADE_END = 0.35;
// Canvas starts at this opacity (matches .hs-canvas.is-ready) and brightens to
// fully opaque in step with the text fade-out, so the imagery takes over as
// the copy disappears.
const CANVAS_BASE_OPACITY = 0.7;

export default function FrameSequenceHero() {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(-1);
  const dprRef = useRef(Math.min(window.devicePixelRatio || 1, 2));

  const [loadPct, setLoadPct] = useState(0);
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const [textOpacity, setTextOpacity] = useState(1);
  const [canvasOpacity, setCanvasOpacity] = useState(CANVAS_BASE_OPACITY);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  function drawFrame(index) {
    const canvas = canvasRef.current;
    const img = imagesRef.current[index];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;
    const ctx = canvas.getContext('2d');

    const cw = canvas.width, ch = canvas.height;
    const iw = img.naturalWidth, ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = (cw - dw) / 2, dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = index;
  }

  function sizeCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = dprRef.current;
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }

  // Preload all frames before any scroll-linked drawing begins.
  useEffect(() => {
    let cancelled = false;
    sizeCanvas();

    const promises = [];
    let loaded = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const p = new Promise((resolve, reject) => {
        img.onload = () => {
          loaded++;
          if (!cancelled) setLoadPct(Math.round((loaded / FRAME_COUNT) * 100));
          resolve(img);
        };
        img.onerror = () => {
          loaded++;
          reject(img);
        };
      });
      img.src = FRAME_PATH(i);
      imagesRef.current[i - 1] = img;
      promises.push(p);
    }

    Promise.allSettled(promises).then((results) => {
      if (cancelled) return;
      const successCount = results.filter((r) => r.status === 'fulfilled').length;
      if (successCount < FRAME_COUNT * 0.9) {
        setFallback(true);
        return;
      }
      sizeCanvas();
      drawFrame(0);
      setReady(true);
    });

    const onResize = () => {
      dprRef.current = Math.min(window.devicePixelRatio || 1, 2);
      sizeCanvas();
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (!ready || reduceMotion) return;
    const idx = Math.round(progress * (FRAME_COUNT - 1));
    if (idx !== currentFrameRef.current) drawFrame(idx);
    const fadeProgress = Math.min(1, progress / TEXT_FADE_END);
    setTextOpacity(1 - fadeProgress);
    setCanvasOpacity(CANVAS_BASE_OPACITY + (1 - CANVAS_BASE_OPACITY) * fadeProgress);
  });

  return (
    <section
      className="hs-hero"
      id="home"
      aria-label="Lumina Beans intro"
      ref={wrapperRef}
      style={{ height: fallback ? '100vh' : `${(1 + SCROLL_LENGTH_VH) * 100}vh` }}
    >
      <div className="hs-stage" style={{ position: fallback ? 'relative' : 'sticky' }}>
        {!fallback && (
          <canvas
            ref={canvasRef}
            className={`hs-canvas${ready ? ' is-ready' : ''}`}
            style={ready ? { opacity: canvasOpacity } : undefined}
            role="img"
            aria-label="Coffee beans roasting, frame by frame as you scroll"
          />
        )}

        {!ready && !fallback && <FrameLoader progress={loadPct} />}

        <div
          className="hs-content"
          style={{
            opacity: fallback ? 1 : textOpacity,
            position: fallback ? 'relative' : 'absolute',
          }}
        >
          <p className="hs-eyebrow">Our Craft</p>
          <h1 className="hs-headline">Depth in<br />Every Layer</h1>
          <p className="hs-sub">From soil to cup — watch the process unfold.</p>
          <div className="hs-scrollcue" aria-hidden="true">
            <span></span>
            <em>Scroll</em>
          </div>
        </div>
      </div>
    </section>
  );
}
