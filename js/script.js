let currentLanguage = 'en';
let currentPage = 'home';

const navLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('.page-section');
const langToggle = document.getElementById('langToggle');
const langText = langToggle ? langToggle.querySelector('.lang-text') : null;
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const titleNode = document.querySelector('title[data-zh][data-en]');
const musicToggle = document.getElementById('musicToggle');
const siteAudio = document.getElementById('siteAudio');
const siteAudioCandidates = [
  'assets/audio/forrest-gump-suite.mp3',
  'assets/audio/forrest-gump-suite.m4a',
  'assets/audio/forrest-gump-suite.ogg',
  'assets/audio/forrest-gump-suite.wav'
];

document.addEventListener('DOMContentLoaded', function () {
  initializeNavigation();
  initializeLanguageToggle();
  initializeMobileMenu();
  initializeScrollEffects();
  initializeSiteAudio();
  initializeResearchWaveAnimation();
  updateLanguage();
  syncLanguageToggleLabel();
  showPage('home');
});

function initializeNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetPage = this.getAttribute('data-page');

      navLinks.forEach((item) => item.classList.remove('active'));
      this.classList.add('active');
      showPage(targetPage);
      closeMobileMenu();
    });
  });
}

function showPage(pageId) {
  pageSections.forEach((section) => {
    section.classList.remove('active');
  });

  const targetSection = document.getElementById(pageId);
  if (!targetSection) {
    return;
  }

  targetSection.classList.add('active');
  currentPage = pageId;
  revealPageSection(targetSection);

  if (pageId === 'research') {
    window.requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function revealPageSection(section) {
  section.querySelectorAll('.section-block, .education-section, .publication-item, .hobby-card, .about-ending-poster')
    .forEach((target) => {
      target.style.opacity = '1';
      target.style.transform = 'translateY(0)';
    });
}

function initializeLanguageToggle() {
  if (!langToggle) {
    return;
  }

  langToggle.addEventListener('click', function () {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    updateLanguage();
    syncLanguageToggleLabel();

    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
      this.style.transform = 'scale(1)';
    }, 150);
  });
}

function syncLanguageToggleLabel() {
  if (!langText) {
    return;
  }

  langText.textContent = currentLanguage === 'zh' ? '中 / EN' : 'EN / 中';
}

function getMusicLabel(isAvailable, isPlaying) {
  if (!isAvailable) {
    return currentLanguage === 'zh' ? '音乐暂不可用' : 'Music unavailable';
  }

  if (isPlaying) {
    return currentLanguage === 'zh' ? '暂停音乐' : 'Pause music';
  }

  return currentLanguage === 'zh' ? '播放音乐' : 'Play music';
}

function updateMusicToggleLabel(isAvailable, isPlaying = false) {
  if (!musicToggle) {
    return;
  }

  const label = getMusicLabel(isAvailable, isPlaying);
  musicToggle.setAttribute('aria-label', label);
  musicToggle.setAttribute('title', label);
}

function updateLanguage() {
  const elements = document.querySelectorAll('[data-zh][data-en]');

  elements.forEach((element) => {
    const text = element.getAttribute(`data-${currentLanguage}`) || '';

    if (element.tagName === 'TITLE') {
      element.textContent = text;
      return;
    }

    if (text.includes('<') && text.includes('>')) {
      element.innerHTML = text;
    } else {
      element.textContent = text;
    }
  });

  if (titleNode) {
    document.title = titleNode.getAttribute(`data-${currentLanguage}`) || document.title;
  }

  document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
  updateMusicToggleLabel(Boolean(siteAudio && siteAudio.dataset.available === 'true'), Boolean(siteAudio && !siteAudio.paused));
}

function initializeMobileMenu() {
  if (!hamburger || !navMenu) {
    return;
  }

  hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });

  document.addEventListener('click', function (event) {
    if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  if (!hamburger || !navMenu) {
    return;
  }

  hamburger.classList.remove('active');
  navMenu.classList.remove('active');
  document.body.style.overflow = '';
}

function initializeScrollEffects() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) {
    return;
  }

  let lastScrollTop = 0;

  window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    navbar.style.transform = scrollTop > lastScrollTop && scrollTop > 100
      ? 'translateY(-100%)'
      : 'translateY(0)';
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  const revealTargets = document.querySelectorAll(
    '#research .section-block, #research .publication-item, #about .section-block, #about .hobby-card'
  );

  if (!revealTargets.length || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => {
      target.style.opacity = '1';
      target.style.transform = 'translateY(0)';
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealTargets.forEach((target) => {
    target.style.opacity = '0';
    target.style.transform = 'translateY(30px)';
    target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(target);
  });
}

async function findPlayableAudioSource() {
  for (const candidate of siteAudioCandidates) {
    try {
      const response = await fetch(candidate, { method: 'HEAD', cache: 'no-store' });
      if (response.ok) {
        return candidate;
      }
    } catch (error) {
      // Ignore missing candidate files and keep checking the next supported format.
    }
  }

  return null;
}

function setMusicIcon(isPlaying) {
  const icon = musicToggle ? musicToggle.querySelector('i') : null;
  if (!icon) {
    return;
  }

  icon.classList.toggle('fa-music', !isPlaying);
  icon.classList.toggle('fa-pause', isPlaying);
}

async function initializeSiteAudio() {
  if (!musicToggle || !siteAudio) {
    return;
  }

  updateMusicToggleLabel(false);
  const source = await findPlayableAudioSource();
  if (!source) {
    siteAudio.dataset.available = 'false';
    musicToggle.disabled = true;
    updateMusicToggleLabel(false);
    return;
  }

  siteAudio.src = source;
  siteAudio.loop = true;
  siteAudio.dataset.available = 'true';
  musicToggle.disabled = false;
  updateMusicToggleLabel(true);

  musicToggle.addEventListener('click', async () => {
    if (siteAudio.paused) {
      try {
        await siteAudio.play();
      } catch (error) {
        updateMusicToggleLabel(false);
        musicToggle.disabled = true;
      }
      return;
    }

    siteAudio.pause();
  });

  siteAudio.addEventListener('play', () => {
    musicToggle.classList.add('is-playing');
    setMusicIcon(true);
    updateMusicToggleLabel(true, true);
  });

  siteAudio.addEventListener('pause', () => {
    musicToggle.classList.remove('is-playing');
    setMusicIcon(false);
    updateMusicToggleLabel(true, false);
  });
}

function initializeResearchWaveAnimation() {
  initializeResearchWaveCanvas();
}

function initializeResearchWaveCanvas() {
  const canvas = document.getElementById('researchWaveCanvas')
    || document.querySelector('.research-wave-canvas');

  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let animationFrameId = null;
  let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  let viewWidth = 0;
  let viewHeight = 0;
  let tick = 0;
  const traces = [
    { baseYFactor: 0.21, ampFactor: 0.094, phaseSeed: -0.28, sweepSpeed: 0.00395, sweepOffset: 0.0, glowAlpha: 0.13, lineAlpha: 0.62, fillAlpha: 0.024, lineWidth: 2.65, glowWidth: 12, isMain: false },
    { baseYFactor: 0.5, ampFactor: 0.152, phaseSeed: 0.0, sweepSpeed: 0.00418, sweepOffset: 0.08, glowAlpha: 0.28, lineAlpha: 0.99, fillAlpha: 0.09, lineWidth: 3.15, glowWidth: 14, isMain: true },
    { baseYFactor: 0.79, ampFactor: 0.108, phaseSeed: 0.36, sweepSpeed: 0.00438, sweepOffset: 0.16, glowAlpha: 0.15, lineAlpha: 0.68, fillAlpha: 0.034, lineWidth: 2.75, glowWidth: 12, isMain: false }
  ];

  function resizeCanvas() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    viewWidth = canvas.clientWidth;
    viewHeight = canvas.clientHeight;

    canvas.width = Math.max(1, Math.round(viewWidth * pixelRatio));
    canvas.height = Math.max(1, Math.round(viewHeight * pixelRatio));
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function smoothstep(edge0, edge1, value) {
    const normalized = Math.max(0, Math.min(1, (value - edge0) / (edge1 - edge0)));
    return normalized * normalized * (3 - 2 * normalized);
  }

  function ricker(value) {
    return (1 - 2 * value * value) * Math.exp(-value * value);
  }

  function pulse(tau, center, width, amplitude) {
    return amplitude * ricker((tau - center) / width);
  }

  function dampedRing(tau, start, amplitude, decay, frequency, phase = 0) {
    const delta = tau - start;

    if (delta <= 0) {
      return 0;
    }

    return amplitude * Math.exp(-delta / decay) * Math.sin(2 * Math.PI * frequency * delta + phase);
  }

  function reveal(front, center, lead = 0.018, lag = 0.03) {
    return smoothstep(center - lead, center + lag, front);
  }

  function sceneAt(phaseSeed, timeValue) {
    return {
      c0: 0.155 + 0.01 * Math.sin(phaseSeed * 1.35 + timeValue * 0.0032),
      c1: 0.33 + 0.02 * Math.sin(phaseSeed * 0.9 + timeValue * 0.0022 + 0.6),
      c2: 0.55 + 0.028 * Math.cos(phaseSeed * 0.7 + timeValue * 0.0017 + 0.25),
      a0: 1.12 + 0.06 * Math.sin(phaseSeed * 1.3 + timeValue * 0.0015),
      a1: 0.54 + 0.09 * Math.cos(phaseSeed * 1.1 + timeValue * 0.0012 + 0.35),
      a2: 0.38 + 0.07 * Math.sin(phaseSeed * 0.86 + timeValue * 0.001 + 1.05),
      tail: 0.092 + 0.02 * Math.sin(phaseSeed * 1.34 + timeValue * 0.001 + 0.18)
    };
  }

  function propagationFront(timeValue, trace) {
    const cycle = 1.12;
    return (timeValue * trace.sweepSpeed + trace.sweepOffset) % cycle - 0.06;
  }

  function signalModel(tau, phaseSeed, timeValue, front, revealMode = true) {
    const scene = sceneAt(phaseSeed, timeValue);
    const phase = phaseSeed * 2.4;
    const gate0 = revealMode ? reveal(front, scene.c0, 0.022, 0.03) : 1;
    const gate1 = revealMode ? reveal(front, scene.c1, 0.02, 0.038) : 1;
    const gate2 = revealMode ? reveal(front, scene.c2, 0.02, 0.044) : 1;
    const tailStart = scene.c2 + 0.07;
    const tailGate = revealMode ? reveal(front, tailStart, 0.02, 0.06) : 1;
    let signal = 0;

    signal += gate0 * pulse(tau, scene.c0, 0.018, 1.18 * scene.a0);
    signal += gate0 * dampedRing(tau, scene.c0 + 0.012, 0.22, 0.056, 15.6, phase);

    signal += gate1 * pulse(tau, scene.c1, 0.028, -0.48 * scene.a1);
    signal += gate1 * dampedRing(tau, scene.c1 + 0.016, 0.094 * scene.a1, 0.074, 11.4, phase * 0.82);

    signal += gate2 * pulse(tau, scene.c2, 0.038, 0.32 * scene.a2);
    signal += gate2 * dampedRing(tau, scene.c2 + 0.02, 0.074 * scene.a2, 0.096, 8.4, phase * 1.16);

    const irregularA = Math.exp(-Math.pow((tau - (scene.c0 + 0.052)) / 0.048, 2));
    const irregularB = Math.exp(-Math.pow((tau - (scene.c1 + 0.038)) / 0.074, 2));
    const irregularC = Math.exp(-Math.pow((tau - (scene.c2 + 0.028)) / 0.064, 2));
    signal += gate0 * irregularA * (
      0.058 * Math.sin(2 * Math.PI * (18.5 * tau - timeValue * 0.00155) + phase * 0.92) +
      0.026 * Math.sin(2 * Math.PI * (31 * tau + timeValue * 0.0011) + phase * 0.45)
    );
    signal += gate1 * irregularB * (
      0.042 * Math.sin(2 * Math.PI * (12.8 * tau + timeValue * 0.00125) + phase * 0.54) +
      0.017 * Math.sin(2 * Math.PI * (26.4 * tau - timeValue * 0.00095) + phase * 1.2)
    );
    signal += gate2 * irregularC * (
      0.025 * Math.sin(2 * Math.PI * (10.4 * tau + timeValue * 0.00092) + phase * 0.68) +
      0.012 * Math.sin(2 * Math.PI * (23 * tau - timeValue * 0.0007) + phase * 1.3)
    );

    if (tau > tailStart) {
      const tailEnvelope = smoothstep(tailStart, tailStart + 0.08, tau) * (1 - smoothstep(0.95, 1, tau));
      signal += tailGate * tailEnvelope * scene.tail * Math.sin(2 * Math.PI * (6.4 * tau - timeValue * 0.0011) + phase * 0.6);
    }

    signal *= 1 - 0.12 * tau;
    return signal;
  }

  function drawFieldBloom(left, right, top, bottom) {
    const leftBloom = ctx.createRadialGradient(viewWidth * 0.24, viewHeight * 0.48, 0, viewWidth * 0.24, viewHeight * 0.48, viewWidth * 0.28);
    leftBloom.addColorStop(0, 'rgba(126, 165, 255, 0.22)');
    leftBloom.addColorStop(0.46, 'rgba(126, 165, 255, 0.09)');
    leftBloom.addColorStop(1, 'rgba(126, 165, 255, 0)');
    ctx.fillStyle = leftBloom;
    ctx.fillRect(left, top, right - left, bottom - top);

    const centerBloom = ctx.createRadialGradient(viewWidth * 0.5, viewHeight * 0.52, 0, viewWidth * 0.5, viewHeight * 0.52, viewWidth * 0.34);
    centerBloom.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
    centerBloom.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
    centerBloom.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = centerBloom;
    ctx.fillRect(left, top, right - left, bottom - top);

    const scanVeil = ctx.createLinearGradient(left, 0, right, 0);
    scanVeil.addColorStop(0, 'rgba(255, 255, 255, 0)');
    scanVeil.addColorStop(0.18, 'rgba(138, 176, 255, 0.05)');
    scanVeil.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
    scanVeil.addColorStop(0.82, 'rgba(92, 208, 216, 0.04)');
    scanVeil.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = scanVeil;
    ctx.fillRect(left, top, right - left, bottom - top);
  }

  function drawTimeWindow(left, right, top, bottom) {
    const horizontal = ctx.createLinearGradient(left, 0, right, 0);
    horizontal.addColorStop(0, 'rgba(95, 137, 226, 0)');
    horizontal.addColorStop(0.14, 'rgba(95, 137, 226, 0.035)');
    horizontal.addColorStop(0.55, 'rgba(95, 137, 226, 0.01)');
    horizontal.addColorStop(0.92, 'rgba(82, 200, 214, 0.02)');
    horizontal.addColorStop(1, 'rgba(82, 200, 214, 0)');
    ctx.fillStyle = horizontal;
    ctx.fillRect(left, top, right - left, bottom - top);

    const vertical = ctx.createLinearGradient(0, top, 0, bottom);
    vertical.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
    vertical.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    vertical.addColorStop(1, 'rgba(160, 184, 220, 0.06)');
    ctx.fillStyle = vertical;
    ctx.fillRect(left, top, right - left, bottom - top);
  }

  function drawBaseline(y, left, right, opacity = 0.12) {
    const gradient = ctx.createLinearGradient(left, 0, right, 0);
    gradient.addColorStop(0, 'rgba(95, 135, 218, 0)');
    gradient.addColorStop(0.14, `rgba(95, 135, 218, ${opacity})`);
    gradient.addColorStop(0.86, `rgba(95, 135, 218, ${opacity})`);
    gradient.addColorStop(1, 'rgba(95, 135, 218, 0)');
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(left, y);
    ctx.lineTo(right, y);
    ctx.stroke();
  }

  function drawSignalBand(y, left, right, amplitude, alpha) {
    const band = ctx.createLinearGradient(left, 0, right, 0);
    band.addColorStop(0, 'rgba(255, 255, 255, 0)');
    band.addColorStop(0.16, `rgba(158, 190, 255, ${alpha})`);
    band.addColorStop(0.84, `rgba(158, 190, 255, ${alpha * 0.78})`);
    band.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = band;
    ctx.fillRect(left, y - amplitude * 1.55, right - left, amplitude * 3.1);
  }

  function drawSweepGlow(left, right, front, y, amplitude, strength) {
    if (front < 0 || front > 1.02) {
      return;
    }

    const sweepX = left + (right - left) * front;
    const gradient = ctx.createLinearGradient(sweepX - 42, 0, sweepX + 42, 0);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, `rgba(90, 155, 230, ${strength})`);
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(sweepX - 42, y - amplitude * 2.1, 84, amplitude * 4.2);
  }

  function drawWaveTrace(trace) {
    const width = trace.right - trace.left;
    const points = [];

    for (let x = trace.left; x <= trace.right; x += 2) {
      const tau = (x - trace.left) / width;
      const signal = signalModel(tau, trace.phaseSeed, tick, trace.front, true);
      const y = trace.baseY + trace.amplitude * signal;
      points.push([x, y]);
    }

    if (trace.fillAlpha > 0) {
      const fillGradient = ctx.createLinearGradient(trace.left, trace.baseY - trace.amplitude * 1.5, trace.left, trace.baseY + trace.amplitude * 1.5);
      fillGradient.addColorStop(0, `rgba(100, 145, 230, ${trace.fillAlpha * 0.24})`);
      fillGradient.addColorStop(0.52, `rgba(100, 145, 230, ${trace.fillAlpha * 0.05})`);
      fillGradient.addColorStop(1, `rgba(72, 206, 214, ${trace.fillAlpha * 0.14})`);

      ctx.beginPath();
      ctx.moveTo(points[0][0], trace.baseY);
      points.forEach(([pointX, pointY]) => ctx.lineTo(pointX, pointY));
      ctx.lineTo(points[points.length - 1][0], trace.baseY);
      ctx.closePath();
      ctx.fillStyle = fillGradient;
      ctx.fill();
    }

    drawSweepGlow(trace.left, trace.right, trace.front, trace.baseY, trace.amplitude, trace.isMain ? 0.11 : 0.05);

    ctx.beginPath();
    points.forEach(([pointX, pointY], index) => {
      if (index === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    });
    ctx.save();
    ctx.strokeStyle = `rgba(118, 165, 240, ${trace.glowAlpha})`;
    ctx.lineWidth = trace.glowWidth;
    ctx.shadowBlur = trace.isMain ? 26 : 20;
    ctx.shadowColor = `rgba(105, 165, 240, ${trace.glowAlpha * 0.9})`;
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    points.forEach(([pointX, pointY], index) => {
      if (index === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    });
    ctx.save();
    ctx.strokeStyle = `rgba(70, 120, 214, ${trace.lineAlpha})`;
    ctx.lineWidth = trace.lineWidth;
    ctx.shadowBlur = trace.isMain ? 10 : 7;
    ctx.shadowColor = 'rgba(78, 198, 214, 0.12)';
    ctx.stroke();
    ctx.restore();
  }

  function drawDust() {
    const count = Math.floor((viewWidth * viewHeight) / 62000);

    for (let index = 0; index < count; index += 1) {
      const x = (Math.sin(index * 13.8 + tick * 0.00065) * 0.5 + 0.5) * viewWidth;
      const y = (Math.cos(index * 9.7 + tick * 0.00045) * 0.5 + 0.5) * viewHeight;
      const radius = 0.45 + (index % 3) * 0.16;
      const alpha = 0.008 + (index % 4) * 0.002;
      ctx.fillStyle = `rgba(92, 130, 205, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function renderFrame() {
    ctx.clearRect(0, 0, viewWidth, viewHeight);

    const left = 0;
    const right = viewWidth * 0.972;
    const top = viewHeight * 0.06;
    const bottom = viewHeight * 0.93;

    drawTimeWindow(left, right, top, bottom);
    drawFieldBloom(left, right, top, bottom);

    traces.forEach((trace) => {
      const baseY = viewHeight * trace.baseYFactor;
      const amplitude = viewHeight * trace.ampFactor;
      const front = propagationFront(tick, trace);

      drawSignalBand(baseY, left, right, amplitude, trace.isMain ? 0.06 : 0.035);
      drawBaseline(baseY, left, right, trace.isMain ? 0.16 : 0.1);
      drawWaveTrace({
        baseY,
        amplitude,
        left,
        right,
        phaseSeed: trace.phaseSeed,
        front,
        glowAlpha: trace.glowAlpha,
        lineAlpha: trace.lineAlpha,
        fillAlpha: trace.fillAlpha,
        lineWidth: trace.lineWidth,
        glowWidth: trace.glowWidth,
        isMain: trace.isMain
      });
    });

    drawDust();

    tick += 1;

    if (!prefersReducedMotion.matches) {
      animationFrameId = window.requestAnimationFrame(renderFrame);
    }
  }

  function restartAnimation() {
    if (animationFrameId !== null) {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    resizeCanvas();
    renderFrame();
  }

  window.addEventListener('resize', restartAnimation);

  if (typeof prefersReducedMotion.addEventListener === 'function') {
    prefersReducedMotion.addEventListener('change', restartAnimation);
  } else if (typeof prefersReducedMotion.addListener === 'function') {
    prefersReducedMotion.addListener(restartAnimation);
  }

  restartAnimation();
}
