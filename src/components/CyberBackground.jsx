import { useEffect, useRef, useState } from 'react';
import './CyberBackground.css';

/**
 * CyberBackground - Cinematic Animated Cybersecurity Background
 * Features:
 * - Slow cinematic camera movement (zoom & parallax)
 * - Animated circuit-board traces with red-orange (left) & cyan-blue (right) photon pulses
 * - Ambient dual-energy light flow fields
 * - Floating binary data (0 & 1) with glowing depth
 * - Subtle particle field with gentle sparkles
 * - Subdued mode for secondary pages
 * - Complete non-blocking pointer events & accessibility respect
 */
const CyberBackground = ({ isSubdued = false, isHighContrast = false }) => {
  const canvasRef = useRef(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion media query
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Canvas animation for circuit traces, traveling pulses, binary data, and glowing particles
  useEffect(() => {
    if (isHighContrast || prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initCircuitsAndParticles();
    };

    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;

    // --- 1. Circuit Paths & Traveling Photon Pulses ---
    // Circuit tracks will span horizontally across the top (ceiling perspective)
    // and bottom (floor perspective), as well as lateral data buses.
    let circuitTracks = [];
    let circuitPulses = [];

    // --- 2. Floating Binary Characters (0 & 1) ---
    let binaryDigits = [];

    // --- 3. Subtle Cyber Ambient Particles ---
    let particles = [];

    const initCircuitsAndParticles = () => {
      const isMob = width < 768;
      circuitTracks = [];
      circuitPulses = [];
      binaryDigits = [];
      particles = [];

      // Generate circuit pathways
      const trackCount = isMob ? 8 : 16;
      for (let i = 0; i < trackCount; i++) {
        const isLeft = i % 2 === 0;
        const isTop = i < trackCount / 2;
        
        // Base coordinate anchors
        const startX = isLeft 
          ? Math.random() * (width * 0.35) 
          : width * 0.65 + Math.random() * (width * 0.35);
        const startY = isTop 
          ? Math.random() * (height * 0.3) 
          : height * 0.7 + Math.random() * (height * 0.3);

        // Path segments (horizontal/vertical/45-deg angles typical of motherboards)
        const path = [{ x: startX, y: startY }];
        let currX = startX;
        let currY = startY;

        const segments = 3 + Math.floor(Math.random() * 3);
        for (let s = 0; s < segments; s++) {
          const dir = Math.random();
          const dist = 40 + Math.random() * (isMob ? 70 : 120);

          if (dir < 0.45) {
            // Horizontal step toward center or outwards
            currX += (isLeft ? 1 : -1) * dist;
          } else if (dir < 0.75) {
            // Vertical step
            currY += (isTop ? 1 : -1) * (dist * 0.6);
          } else {
            // 45-degree diagonal step
            const diagDist = dist * 0.7;
            currX += (isLeft ? 1 : -1) * diagDist;
            currY += (isTop ? 1 : -1) * diagDist;
          }
          path.push({ x: currX, y: currY });
        }

        // Color theme: warm red/orange on left, cyan/blue on right
        const theme = isLeft ? 'warm' : 'cool';
        const strokeColor = theme === 'warm' 
          ? 'rgba(255, 122, 24, 0.18)' 
          : 'rgba(34, 211, 238, 0.18)';
        const pulseColor = theme === 'warm' 
          ? '#FF7A18' 
          : '#22D3EE';
        const glowColor = theme === 'warm' 
          ? 'rgba(255, 59, 48, 0.8)' 
          : 'rgba(22, 119, 255, 0.8)';

        circuitTracks.push({
          path,
          theme,
          strokeColor,
          pulseColor,
          glowColor,
          nodes: path
        });

        // Add 1 or 2 traveling pulses per track
        const pulseCount = isMob ? 1 : (Math.random() > 0.4 ? 2 : 1);
        for (let p = 0; p < pulseCount; p++) {
          circuitPulses.push({
            trackIndex: circuitTracks.length - 1,
            progress: Math.random(), // 0 to 1 along the path
            speed: (0.0015 + Math.random() * 0.0025) * (isSubdued ? 0.6 : 1), // 4-8s duration
            length: 0.12 + Math.random() * 0.08,
            headRadius: 2.2 + Math.random() * 1.5,
            theme,
            pulseColor,
            glowColor
          });
        }
      }

      // Generate floating binary digits (0 and 1)
      const binaryCount = isMob ? 14 : 28;
      const chars = ['0', '1'];
      for (let i = 0; i < binaryCount; i++) {
        const x = Math.random() * width;
        const isWarmSide = x < width * 0.48;
        const isCoolSide = x > width * 0.52;

        let color = 'rgba(248, 250, 252, 0.25)';
        let shadow = 'rgba(34, 211, 238, 0.4)';
        if (isWarmSide) {
          color = 'rgba(255, 122, 24, 0.35)';
          shadow = 'rgba(255, 59, 48, 0.6)';
        } else if (isCoolSide) {
          color = 'rgba(34, 211, 238, 0.35)';
          shadow = 'rgba(22, 119, 255, 0.6)';
        }

        binaryDigits.push({
          x,
          y: Math.random() * height,
          char: chars[Math.floor(Math.random() * chars.length)],
          size: 11 + Math.floor(Math.random() * 6),
          speedY: (0.15 + Math.random() * 0.35) * (isSubdued ? 0.5 : 1),
          speedX: (Math.random() - 0.5) * 0.1,
          opacity: 0.15 + Math.random() * 0.35,
          color,
          shadow,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }

      // Generate subtle glowing ambient particles
      const particleCount = isMob ? 18 : 38;
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const isWarm = x < width * 0.5;
        particles.push({
          x,
          y: Math.random() * height,
          radius: 0.8 + Math.random() * 1.8,
          speedY: -(0.1 + Math.random() * 0.25) * (isSubdued ? 0.5 : 1),
          speedX: (Math.random() - 0.5) * 0.2,
          opacity: 0.2 + Math.random() * 0.5,
          color: isWarm 
            ? (Math.random() > 0.5 ? '#FF7A18' : '#FF3B30')
            : (Math.random() > 0.5 ? '#22D3EE' : '#1677FF'),
          sparkleRate: 0.02 + Math.random() * 0.03,
          sparklePhase: Math.random() * Math.PI * 2
        });
      }
    };

    initCircuitsAndParticles();

    // Helper: compute point along multi-segment polyline at progress [0, 1]
    const getPointAtProgress = (path, progress) => {
      if (!path || path.length === 0) return { x: 0, y: 0 };
      if (path.length === 1) return path[0];

      // Calculate total length and segment lengths
      let totalLength = 0;
      const segLengths = [];
      for (let i = 0; i < path.length - 1; i++) {
        const dx = path[i + 1].x - path[i].x;
        const dy = path[i + 1].y - path[i].y;
        const len = Math.sqrt(dx * dx + dy * dy);
        segLengths.push(len);
        totalLength += len;
      }

      if (totalLength === 0) return path[0];

      let targetDist = progress * totalLength;
      for (let i = 0; i < segLengths.length; i++) {
        if (targetDist <= segLengths[i] || i === segLengths.length - 1) {
          const segProgress = segLengths[i] === 0 ? 0 : targetDist / segLengths[i];
          const x = path[i].x + (path[i + 1].x - path[i].x) * segProgress;
          const y = path[i].y + (path[i + 1].y - path[i].y) * segProgress;
          return { x, y };
        }
        targetDist -= segLengths[i];
      }
      return path[path.length - 1];
    };

    // Render loop
    let lastTime = performance.now();

    const render = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // A. Draw Circuit Traces & Connection Nodes
      ctx.lineWidth = 1;
      for (let i = 0; i < circuitTracks.length; i++) {
        const track = circuitTracks[i];
        const path = track.path;
        if (path.length < 2) continue;

        ctx.strokeStyle = track.strokeColor;
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let j = 1; j < path.length; j++) {
          ctx.lineTo(path[j].x, path[j].y);
        }
        ctx.stroke();

        // Circuit intersection solder nodes
        ctx.fillStyle = track.strokeColor;
        for (let k = 0; k < track.nodes.length; k++) {
          ctx.beginPath();
          ctx.arc(track.nodes[k].x, track.nodes[k].y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // B. Draw Traveling Photon Pulses along Circuits
      for (let i = 0; i < circuitPulses.length; i++) {
        const pulse = circuitPulses[i];
        const track = circuitTracks[pulse.trackIndex];
        if (!track) continue;

        pulse.progress += pulse.speed;
        if (pulse.progress > 1) {
          pulse.progress = 0;
        }

        const headPoint = getPointAtProgress(track.path, pulse.progress);
        const tailProgress = Math.max(0, pulse.progress - pulse.length);
        const tailPoint = getPointAtProgress(track.path, tailProgress);

        // Draw glowing light streak
        const grad = ctx.createLinearGradient(tailPoint.x, tailPoint.y, headPoint.x, headPoint.y);
        grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(0.6, pulse.glowColor);
        grad.addColorStop(1, pulse.pulseColor);

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.4;
        ctx.beginPath();
        ctx.moveTo(tailPoint.x, tailPoint.y);
        ctx.lineTo(headPoint.x, headPoint.y);
        ctx.stroke();

        // Glowing pulse head
        ctx.save();
        ctx.shadowColor = pulse.pulseColor;
        ctx.shadowBlur = 12;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(headPoint.x, headPoint.y, pulse.headRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // C. Draw Floating Binary Characters
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let i = 0; i < binaryDigits.length; i++) {
        const b = binaryDigits[i];
        b.y -= b.speedY;
        b.x += b.speedX;
        b.pulsePhase += 0.02;

        // Wrap around screen
        if (b.y < -20) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        const currentOpacity = b.opacity * (0.8 + 0.2 * Math.sin(b.pulsePhase));
        ctx.save();
        ctx.font = `600 ${b.size}px "Courier New", Courier, monospace`;
        ctx.fillStyle = b.color.replace(/[\d\.]+\)$/, `${currentOpacity})`);
        ctx.shadowColor = b.shadow;
        ctx.shadowBlur = 8;
        ctx.fillText(b.char, b.x, b.y);
        ctx.restore();
      }

      // D. Draw Ambient Floating Particles with Soft Sparkle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.sparklePhase += p.sparkleRate;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        const sparkleAlpha = p.opacity * (0.6 + 0.4 * Math.sin(p.sparklePhase));
        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = sparkleAlpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHighContrast, prefersReducedMotion, isSubdued]);

  if (isHighContrast) {
    return null;
  }

  return (
    <div 
      className={`cyber-background-container ${isSubdued ? 'subdued-mode' : 'hero-mode'}`}
      aria-hidden="true"
    >
      {/* 1. Base Wallpaper Layer with Cinematic Zoom & Parallax Movement */}
      <div className="cyber-bg-layer-base"></div>

      {/* 2. Fiery Red-Orange Ambient Light Field (Left Flow) */}
      <div className="cyber-ambient-orb cyber-orb-left"></div>

      {/* 3. Electric Blue-Cyan Ambient Light Field (Right Flow) */}
      <div className="cyber-ambient-orb cyber-orb-right"></div>

      {/* 4. Canvas for Circuit Board Traces, Pulses, Binary Digits, & Dust Particles */}
      <canvas ref={canvasRef} className="cyber-bg-canvas" />

      {/* 5. Central Digital Lock Luminous Energy Atmosphere (Hero mode only) */}
      {!isSubdued && (
        <div className="cyber-lock-center-glow">
          <div className="cyber-lock-ripple cyber-ripple-1"></div>
          <div className="cyber-lock-ripple cyber-ripple-2"></div>
          <div className="cyber-lock-light-sweep"></div>
        </div>
      )}

      {/* 6. Dark Tech Vignette & Color Balance Overlay */}
      <div className="cyber-vignette-overlay"></div>
    </div>
  );
};

export default CyberBackground;
