gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
    alpha: Math.random() * 0.6 + 0.2
  }));

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 180, ${p.alpha})`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(drawParticles);
  }
  drawParticles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

const revealSections = document.querySelectorAll('.section');
revealSections.forEach((section, i) => {
  const colors = ['#0a0a0f', '#050d1a', '#080a0f', '#0d0510', '#050f0a'];
  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    onEnter: () => {
      document.body.style.background = colors[i % colors.length];
    }
  });

  gsap.fromTo(section,
    { opacity: 0, y: 80, scale: 0.97 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );
});

gsap.utils.toArray('.card').forEach((card, i) => {
  gsap.fromTo(card,
    { opacity: 0, y: 60, rotateX: 15 },
    {
      opacity: 1, y: 0, rotateX: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 15,
      rotateX: -y * 15,
      scale: 1.04,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 800
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotateY: 0, rotateX: 0, scale: 1,
      duration: 0.5, ease: 'elastic.out(1, 0.5)'
    });
  });
});

const heroTitle = document.getElementById('hero-title');
if (heroTitle) {
  const text = heroTitle.dataset.text || heroTitle.innerText;
  heroTitle.innerHTML = '';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      heroTitle.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 60);
    } else {
      setInterval(() => {
        heroTitle.style.textShadow = `
          ${Math.random()*6-3}px 0 #00ffb4,
          ${Math.random()*6-3}px 0 #ff00aa
        `;
        setTimeout(() => {
          heroTitle.style.textShadow = '0 0 30px rgba(0,255,180,0.5)';
        }, 100);
      }, 3000);
    }
  };
  type();
}

document.querySelectorAll('.counter').forEach(el => {
  const target = parseInt(el.dataset.target || el.innerText);
  const obj = { val: 0 };
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          el.innerText = Math.floor(obj.val).toLocaleString();
        }
      });
    }
  });
});

const navbar = document.getElementById('navbar');
if (navbar) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > lastScroll && current > 100) {
      gsap.to(navbar, { y: -80, duration: 0.4, ease: 'power2.in' });
    } else {
      gsap.to(navbar, { y: 0, duration: 0.4, ease: 'power2.out' });
    }
    navbar.style.backdropFilter = current > 50 ? 'blur(20px)' : 'blur(0px)';
    navbar.style.background = current > 50 ? 'rgba(5,5,15,0.85)' : 'transparent';
    lastScroll = current;
  });
}

const ticker = document.getElementById('ticker');
if (ticker) {
  const items = [
    '🚀 BTC +4.2%', '📈 ETH trending', '🔥 Pakistan Crypto Update',
    '⚡ Google Trends: AI Tools', '💰 Top Deals Live', '📊 Binance Volume High'
  ];
  let idx = 0;
  setInterval(() => {
    gsap.to(ticker, {
      opacity: 0, y: -10, duration: 0.3,
      onComplete: () => {
        ticker.innerText = items[idx % items.length];
        idx++;
        gsap.to(ticker, { opacity: 1, y: 0, duration: 0.3 });
      }
    });
  }, 2500);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 60 },
        duration: 1.2,
        ease: 'power3.inOut'
      });
    }
  });
});

const cursor = document.createElement('div');
cursor.id = 'glow-cursor';
cursor.style.cssText = `
  position: fixed; width: 20px; height: 20px;
  border-radius: 50%; pointer-events: none;
  background: radial-gradient(circle, rgba(0,255,180,0.8), transparent);
  z-index: 9999; transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s;
  mix-blend-mode: screen;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  gsap.to(cursor, {
    x: e.clientX, y: e.clientY,
    duration: 0.15, ease: 'power2.out'
  });
});

document.querySelectorAll('a, button, .card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '40px';
    cursor.style.height = '40px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  });
});