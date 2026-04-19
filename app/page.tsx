// hooks/useAdvancedAnimations.ts
'use client';
import { useEffect } from 'react';

export const useAdvancedAnimations = (typewriterText?: string) => {
  useEffect(() => {
    const loadScript = (src: string) =>
      new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        document.body.appendChild(script);
      });

    const init = async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');

      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);

      // ----- CUSTOM CURSOR -----
      const cur = document.getElementById('cursor');
      const ring = document.getElementById('cursor-ring');
      let mx = 0,
        my = 0;
      const onMouseMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        gsap.to(cur, { x: mx, y: my, duration: 0.08, ease: 'power2.out' });
        gsap.to(ring, { x: mx, y: my, duration: 0.25, ease: 'power2.out' });
      };
      document.addEventListener('mousemove', onMouseMove);

      const addHoverEffects = () => {
        document.querySelectorAll('a, button, h1, h2, .report-card').forEach((el) => {
          el.addEventListener('mouseenter', () => {
            gsap.to(cur, { width: 6, height: 6, duration: 0.2 });
            gsap.to(ring, { width: 60, height: 60, borderColor: 'rgba(0,255,180,0.7)', duration: 0.3 });
          });
          el.addEventListener('mouseleave', () => {
            gsap.to(cur, { width: 12, height: 12, duration: 0.2 });
            gsap.to(ring, { width: 36, height: 36, borderColor: 'rgba(0,255,180,0.4)', duration: 0.3 });
          });
        });
      };
      addHoverEffects();

      // ----- BACKGROUND CANVAS (particles + orbs) -----
      const canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);
        window.addEventListener('resize', () => {
          w = canvas.width = window.innerWidth;
          h = canvas.height = window.innerHeight;
        });

        let scrollY = 0,
          targetScrollY = 0;
        window.addEventListener('scroll', () => (targetScrollY = window.scrollY));

        const pts = Array.from({ length: 80 }, () => ({
          x: Math.random(),
          y: Math.random(),
          r: Math.random() * 1.2 + 0.3,
          vx: (Math.random() - 0.5) * 0.0003,
          vy: (Math.random() - 0.5) * 0.0003,
          alpha: Math.random() * 0.4 + 0.05,
        }));

        const orbs = [
          { x: 0.5, y: 0.3, r: 0.4, color: [0, 255, 180], phase: 0 },
          { x: 0.15, y: 0.6, r: 0.35, color: [0, 170, 255], phase: 2 },
          { x: 0.85, y: 0.7, r: 0.38, color: [255, 0, 170], phase: 4 },
          { x: 0.5, y: 1.0, r: 0.4, color: [255, 200, 0], phase: 6 },
        ];

        let t = 0;
        const draw = () => {
          scrollY += (targetScrollY - scrollY) * 0.06;
          t += 0.008;
          ctx!.clearRect(0, 0, w, h);
          ctx!.fillStyle = '#04040c';
          ctx!.fillRect(0, 0, w, h);

          const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight || 1);
          orbs.forEach((orb, i) => {
            const ox = orb.x * w + Math.sin(t + orb.phase) * w * 0.08;
            const oy = (orb.y + scrollProgress * 0.3 * (i % 2 === 0 ? -1 : 1)) * h + Math.cos(t * 0.7 + orb.phase) * h * 0.05;
            const gr = ctx!.createRadialGradient(ox, oy, 0, ox, oy, orb.r * w);
            gr.addColorStop(0, `rgba(${orb.color.join(',')},0.08)`);
            gr.addColorStop(1, `rgba(${orb.color.join(',')},0)`);
            ctx!.fillStyle = gr;
            ctx!.fillRect(0, 0, w, h);
          });

          const gridOffset = (scrollY * 0.15) % 80;
          ctx!.strokeStyle = 'rgba(255,255,255,0.02)';
          ctx!.lineWidth = 1;
          for (let x = 0; x < w + 80; x += 80) {
            ctx!.beginPath();
            ctx!.moveTo(x, 0);
            ctx!.lineTo(x, h);
            ctx!.stroke();
          }
          for (let y = -80 + (gridOffset % 80); y < h + 80; y += 80) {
            ctx!.beginPath();
            ctx!.moveTo(0, y);
            ctx!.lineTo(w, y);
            ctx!.stroke();
          }

          pts.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = 1;
            if (p.x > 1) p.x = 0;
            if (p.y < 0) p.y = 1;
            if (p.y > 1) p.y = 0;
            ctx!.beginPath();
            ctx!.arc(p.x * w, p.y * h - scrollY * 0.02, p.r, 0, Math.PI * 2);
            ctx!.fillStyle = `rgba(0,255,180,${p.alpha})`;
            ctx!.fill();
          });
          requestAnimationFrame(draw);
        };
        draw();
      }

      // ----- TYPEWRITER (agar text diya ho) -----
      if (typewriterText) {
        const subEl = document.getElementById('typewriter-target');
        if (subEl) {
          subEl.textContent = '';
          let i = 0;
          const type = () => {
            if (i <= typewriterText.length) {
              subEl!.textContent = typewriterText.substring(0, i);
              i++;
              setTimeout(type, 28);
            }
          };
          setTimeout(type, 1200);
        }
      }

      // ----- REVEAL ANIMATIONS (scenes ke liye) -----
      const scenes = document.querySelectorAll('.scene');
      scenes.forEach((scene, idx) => {
        if (idx === 0) return;
        const heading = scene.querySelector('.scene-heading, .deals-tagline');
        const body = scene.querySelector('.scene-body');
        const label = scene.querySelector('.scene-label');
        const bigNum = scene.querySelector('.big-number');
        if (label) gsap.from(label, { opacity: 0, x: -30, duration: 1, scrollTrigger: { trigger: scene, start: 'top 75%' } });
        if (heading) gsap.from(heading, { opacity: 0, y: 80, duration: 1.2, scrollTrigger: { trigger: scene, start: 'top 70%' } });
        if (body) gsap.from(body, { opacity: 0, y: 40, duration: 1.2, delay: 0.2, scrollTrigger: { trigger: scene, start: 'top 68%' } });
        if (bigNum) gsap.from(bigNum, { opacity: 0, scale: 0.8, duration: 1.5, scrollTrigger: { trigger: scene, start: 'top 80%' } });
      });

      // ----- PARALLAX -----
      scenes.forEach((scene) => {
        const heading = scene.querySelector('.scene-heading, .deals-tagline, .welcome-title');
        if (heading) gsap.to(heading, { y: -60, ease: 'none', scrollTrigger: { trigger: scene, start: 'top bottom', end: 'bottom top', scrub: 1.5 } });
      });

      // background color change on scroll
      const bgColors = ['#04040c', '#02080f', '#0a0208', '#07060a', '#04040c', '#04040c'];
      scenes.forEach((scene, i) => {
        ScrollTrigger.create({
          trigger: scene,
          start: 'top 50%',
          onEnter: () => gsap.to('body', { backgroundColor: bgColors[i % bgColors.length], duration: 1.2 }),
          onLeaveBack: () => gsap.to('body', { backgroundColor: bgColors[Math.max(0, i - 1) % bgColors.length], duration: 1.2 }),
        });
      });
    };

    init();
    return () => {
      // Cleanup if needed (GSAP ScrollTriggers etc.)
    };
  }, [typewriterText]);
};