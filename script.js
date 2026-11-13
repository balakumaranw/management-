/**
 * BUSINESS GRAPH — FUTURISTIC INTERACTIVE ENGINE
 * Features:
 * - Interactive Neural Graph Canvas with traveling data packets & mouse magnetism
 * - 3D Holographic Gyroscope & Card Tilt Physics
 * - Ambient Cursor Spotlight Tracker
 * - Telemetry Metric Counting Animations
 * - Interactive Autonomous AI Chat Assistant with typing state
 * - Navigation Scrollspy & Smooth Responsive Menu
 */

function init() {
  try { initAssetVerification(); } catch(e) { console.warn(e); }
  try { initNav(); } catch(e) { console.warn(e); }
  try { init3DTilt(); } catch(e) { console.warn(e); }
  try { initCounters(); } catch(e) { console.warn(e); }
  try { initAIChat(); } catch(e) { console.warn(e); }
  try { initContactForm(); } catch(e) { console.warn(e); }
  try { initScrollReveal(); } catch(e) { console.warn(e); }
  try { initHeroVideo(); } catch(e) { console.warn(e); }
  try { initLiveTicker(); } catch(e) { console.warn(e); }
  try { initHeroInteractions(); } catch(e) { console.warn(e); }
  try { initHeroCardsTilt(); } catch(e) { console.warn(e); }
  try { initRealisticAmbientWave(); } catch(e) { console.warn(e); }
  try { init3DMilkyWayGalaxy(); } catch(e) { console.warn(e); }
}

function initAssetVerification() {
  if (typeof window !== 'undefined' && window.BUSINESS_GRAPH_ASSETS) {
    document.querySelectorAll('img').forEach(function(img) {
      const src = img.getAttribute('src');
      if (src && window.BUSINESS_GRAPH_ASSETS[src]) {
        img.addEventListener('error', function() {
          this.src = window.BUSINESS_GRAPH_ASSETS[src];
        });
        if (img.complete && (img.naturalWidth === 0 || img.naturalHeight === 0)) {
          img.src = window.BUSINESS_GRAPH_ASSETS[src];
        }
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

/* ==========================================================================
   1. NAVIGATION & SCROLLSPY
   ========================================================================== */

function initNav() {
  const menuBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile Menu Toggle
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scrollspy: highlight active section
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   4. 3D PERSPECTIVE TILT PHYSICS
   ========================================================================== */

function init3DTilt() {
  const tiltCards = document.querySelectorAll('.team-card-3d, .service-card, [data-tilt]');
  const dashCard = document.getElementById('dashCard');

  // Realistic 3D Perspective Tilt on Mouse Movement
  tiltCards.forEach(card => {
    const glare = card.querySelector('.card-3d-glare') || card.querySelector('.card-glare');
    const photoStage = card.querySelector('.team-photo-stage');
    const statusTag = card.querySelector('.team-status-tag');
    let isHovered = false;

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      card.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';
    });

    card.addEventListener('mousemove', e => {
      if (!isHovered) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Limit tilt angle between -12 and +12 degrees for realistic physics
      const rotX = ((y - cy) / cy) * -11;
      const rotY = ((x - cx) / cx) * 11;

      card.style.transform = `perspective(1200px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-8px)`;
      card.style.boxShadow = `${(-rotY * 1.5).toFixed(1)}px ${(rotX * 1.5 + 20).toFixed(1)}px 42px -10px rgba(37, 99, 235, 0.22), 0 10px 20px -5px rgba(15, 23, 42, 0.08)`;

      if (glare) {
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)`;
      }
      if (photoStage) {
        photoStage.style.transform = `translateZ(28px)`;
      }
      if (statusTag) {
        statusTag.style.transform = `translateZ(50px) translate(${(rotY * 0.4).toFixed(1)}px, ${(-rotX * 0.4).toFixed(1)}px)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease-out';
      card.style.transform = '';
      card.style.boxShadow = '';
      if (glare) glare.style.opacity = '0';
      if (photoStage) photoStage.style.transform = '';
      if (statusTag) statusTag.style.transform = '';
    });
  });

  // Hero Dashboard Card 3D Tilt
  const heroVisual = document.getElementById('heroVisual');
  if (heroVisual && dashCard) {
    heroVisual.addEventListener('mousemove', e => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      dashCard.style.transform = `perspective(1200px) rotateY(${(x * 12).toFixed(1)}deg) rotateX(${(-y * 12).toFixed(1)}deg)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      dashCard.style.transform = '';
    });
  }

  // Device Orientation 3D Gyroscope for Mobile / Tablets
  if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    window.addEventListener('deviceorientation', e => {
      if (e.beta === null || e.gamma === null) return;
      const gamma = Math.min(20, Math.max(-20, e.gamma)); // Left to right
      const beta = Math.min(20, Math.max(-20, e.beta - 45)); // Front to back
      const executiveCards = document.querySelectorAll('.team-card-executive');
      executiveCards.forEach(c => {
        c.style.transform = `perspective(1000px) rotateX(${(-beta * 0.4).toFixed(1)}deg) rotateY(${(gamma * 0.4).toFixed(1)}deg)`;
      });
    }, { passive: true });
  }
}

/* ==========================================================================
   5. TELEMETRY COUNTER ANIMATIONS
   ========================================================================== */

function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target') || '0');
          const prefix = counter.getAttribute('data-prefix') || '';
          const suffix = counter.getAttribute('data-suffix') || '';
          const isDecimal = String(target).includes('.');
          const duration = 1600;
          const startTime = performance.now();

          function updateCount(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = target * ease;

            counter.textContent = `${prefix}${isDecimal ? current.toFixed(1) : Math.floor(current)}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              counter.textContent = `${prefix}${target}${suffix}`;
            }
          }

          requestAnimationFrame(updateCount);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.25 });

  const dashCard = document.getElementById('dashCard');
  if (dashCard) observer.observe(dashCard);
}

/* ==========================================================================
   6. INTERACTIVE AUTONOMOUS AI CHATBOT PREVIEW
   ========================================================================== */

function initAIChat() {
  const chatBody = document.getElementById('chatBody');
  const chatChoices = document.getElementById('chatChoices');
  const resetBtn = document.getElementById('chatResetBtn');
  const inputMock = document.getElementById('chatInputMock');
  const sendMock = document.getElementById('chatSendMock');

  if (!chatBody) return;

  const responses = {
    website: {
      text: "⚡ <b>High-Speed Web Architecture:</b> We build custom, ultra-fast websites designed with DM Sans & Space Grotesk typography, conversion architecture, and sub-second load speeds. Typical delivery is 2–3 weeks with full SEO foundation.",
      nextChoices: ["What's the process?", "Can you integrate AI chat?", "Request proposal"]
    },
    automate: {
      text: "✳ <b>Autonomous AI Integration:</b> Our custom agents answer customer questions in &lt;0.3s, qualify warm leads, capture phone/emails, and sync seamlessly into your CRM or WhatsApp. Active 24/7 with zero downtime.",
      nextChoices: ["See live CRM demo", "How much does it cost?", "Book a discovery call"]
    },
    ads: {
      text: "📈 <b>Meta Ads Growth Engine:</b> We develop multi-angle creative funnels on Facebook & Instagram with rapid A/B testing and pixel attribution tracking, consistently yielding 3.2x–5.4x return on ad spend.",
      nextChoices: ["What budget is needed?", "Do you handle creatives?", "Start scaling"]
    },
    pricing: {
      text: "💎 <b>Custom Tailored Scopes:</b> Because every enterprise has distinct goals, we tailor scopes based on your immediate deliverables, scale targets, and timeline. No rigid tiers — just measurable ROI.",
      nextChoices: ["Talk to founders", "Build a custom plan"]
    },
    default: {
      text: "✦ Thank you for reaching out! Our leadership team can tailor a bespoke growth blueprint for your business. Click below to connect directly with Balakumaran & Nagaraj.",
      nextChoices: ["Book Consultation ↗", "Explore our system"]
    }
  };

  function appendMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${isUser ? 'user' : 'bot'}`;

    const content = document.createElement('div');
    content.className = 'msg-content';
    content.innerHTML = text;

    const time = document.createElement('span');
    time.className = 'msg-time';
    time.textContent = 'Just now';

    msg.appendChild(content);
    msg.appendChild(time);
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.id = 'botTyping';
    typing.innerHTML = `
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
      <span class="typing-dot"></span>
    `;
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById('botTyping');
    if (el) el.remove();
  }

  function handleUserReply(replyText) {
    appendMessage(replyText, true);

    // If choices exist, remove them temporarily
    const existingChoices = document.querySelector('.chat-choices');
    if (existingChoices) existingChoices.remove();

    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();

      const lower = replyText.toLowerCase();
      let match = responses.default;

      if (lower.includes('website') || lower.includes('build')) match = responses.website;
      else if (lower.includes('automat') || lower.includes('ai')) match = responses.automate;
      else if (lower.includes('ad') || lower.includes('meta') || lower.includes('growth')) match = responses.ads;
      else if (lower.includes('price') || lower.includes('cost') || lower.includes('plan')) match = responses.pricing;
      else if (lower.includes('consultation') || lower.includes('talk') || lower.includes('proposal') || lower.includes('call')) {
        appendMessage("Redirecting you to our proposal form below...", false);
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 600);
        return;
      }

      appendMessage(match.text, false);

      // Render new choices
      const choicesWrap = document.createElement('div');
      choicesWrap.className = 'chat-choices';
      match.nextChoices.forEach(choiceText => {
        const btn = document.createElement('button');
        btn.textContent = choiceText;
        btn.dataset.reply = choiceText;
        choicesWrap.appendChild(btn);
      });
      chatBody.appendChild(choicesWrap);
      chatBody.scrollTop = chatBody.scrollHeight;
    }, 650);
  }

  // Click delegation for buttons inside chat
  chatBody.addEventListener('click', e => {
    const btn = e.target.closest('button[data-reply]');
    if (!btn) return;
    handleUserReply(btn.dataset.reply);
  });

  // Handle mock input field
  function handleInputSubmit() {
    const val = inputMock.value.trim();
    if (!val) return;
    inputMock.value = '';
    handleUserReply(val);
  }

  if (sendMock && inputMock) {
    sendMock.addEventListener('click', handleInputSubmit);
    inputMock.addEventListener('keypress', e => {
      if (e.key === 'Enter') handleInputSubmit();
    });
  }

  // Reset conversation
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      chatBody.innerHTML = `
        <div class="chat-message bot">
          <div class="msg-content">
            Hello! 👋 Welcome to Business Graph. I am your autonomous growth assistant. What can I help you build today?
          </div>
          <span class="msg-time">Just now</span>
        </div>
        <div class="chat-choices" id="chatChoices">
          <button data-reply="I need a modern website for my business.">🌐 Build a Website</button>
          <button data-reply="I want 24/7 AI automation for customer enquiries.">⚡ Automate with AI</button>
          <button data-reply="I need to scale with targeted Meta Ads.">📈 Meta Ads Growth</button>
          <button data-reply="Can you explain your end-to-end pricing?">💰 Custom Pricing</button>
        </div>
      `;
    });
  }
}

/* ==========================================================================
   7. CONTACT FORM SUBMISSION
   ========================================================================== */

function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const services = data.getAll('services');
    const name = data.get('name') || 'Partner';
    const business = data.get('business') || 'Not specified';
    const email = data.get('email') || '';
    const phone = data.get('phone') || 'Not specified';
    const message = data.get('message') || 'No additional note provided.';

    const subject = encodeURIComponent(`Business Graph Enquiry from ${name} [${business}]`);
    const body = encodeURIComponent(
`Business Graph Project Enquiry:
--------------------------------
Client Name: ${name}
Company / Business: ${business}
Email: ${email}
Phone: ${phone}
Capabilities Selected: ${services.join(', ') || 'General Consultation'}

Project Scope & Goals:
${message}

--------------------------------
Submitted via Business Graph Interactive Web Portal.`
    );

    const recipient = 'balaoldmaster@gmail.com';
    if (status) {
      status.textContent = 'Preparing email dispatch to balaoldmaster@gmail.com... Launching your email client with full project parameters.';
      status.style.color = '#00f0ff';
    }

    setTimeout(() => {
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    }, 400);
  });
}

/* ==========================================================================
   8. SCROLL REVEAL OBSERVER
   ========================================================================== */

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const showAll = () => reveals.forEach(el => el.classList.add('visible'));

  if (!('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.02, rootMargin: '80px' });

  reveals.forEach(el => observer.observe(el));

  // Immediate check for elements currently visible in window
  setTimeout(() => {
    reveals.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 120) {
        el.classList.add('visible');
      }
    });
  }, 80);

  // Safety fallback: ensure nothing stays hidden after 600ms
  setTimeout(showAll, 600);
}

/* ==========================================================================
   9. FRONT NEURAL STREAM 3D VIDEO CANVAS ENGINE
   ========================================================================== */

function initHeroVideo() {
  const vid = document.querySelector('.hero-bg-video');
  if (!vid) return;

  vid.muted = true;
  vid.defaultMuted = true;
  vid.playsInline = true;

  const tryPlay = () => {
    const p = vid.play();
    if (p !== undefined) {
      p.catch(() => {
        // Fallback for strict browser autoplay policies
        const trigger = () => {
          vid.play();
          window.removeEventListener('click', trigger);
          window.removeEventListener('touchstart', trigger);
          window.removeEventListener('scroll', trigger);
        };
        window.addEventListener('click', trigger, { passive: true });
        window.addEventListener('touchstart', trigger, { passive: true });
        window.addEventListener('scroll', trigger, { passive: true, once: true });
      });
    }
  };

  tryPlay();
}

/* ==========================================================================
   10. LIVE BUSINESS ENGINE TICKER
   ========================================================================== */

function initLiveTicker() {
  const tickerItems = document.querySelectorAll('.live-client-ticker .ticker-item');
  if (tickerItems.length < 2) return;
  let activeIdx = 0;
  tickerItems[0].classList.add('active');
  setInterval(() => {
    tickerItems[activeIdx].classList.remove('active');
    activeIdx = (activeIdx + 1) % tickerItems.length;
    tickerItems[activeIdx].classList.add('active');
  }, 3200);
}


/* ==========================================================================
   11. HERO VIDEO CONTROLLER & DASHBOARD MODE SWITCHER
   ========================================================================== */

function initHeroInteractions() {
  const vid = document.getElementById('heroBgVideo');
  const switchBtn = document.getElementById('switchReelBtn');
  const playPauseBtn = document.getElementById('playPauseVideoBtn');
  const playPauseText = document.getElementById('playPauseText');
  const activeReelName = document.getElementById('activeReelName');

  const reels = [
    {
      name: 'Metropolis & Skyscraper Aerial',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-daytime-city-traffic-aerial-view-56-large.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Global Enterprise Orbit',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-spinning-around-the-earth-29351-large.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Autonomous Circuit Engine',
      src: 'https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-futuristic-circuit-board-42956-large.mp4',
      type: 'video/mp4'
    },
    {
      name: 'Tokyo High-Rise Tower',
      src: 'assets/hero-luxury.webm',
      type: 'video/webm'
    }
  ];

  let currentReelIdx = 0;

  if (vid && switchBtn) {
    switchBtn.addEventListener('click', () => {
      currentReelIdx = (currentReelIdx + 1) % reels.length;
      const target = reels[currentReelIdx];
      if (activeReelName) activeReelName.textContent = target.name;
      
      vid.style.opacity = '0.35';
      setTimeout(() => {
        vid.innerHTML = '<source src="' + target.src + '" type="' + target.type + '">';
        vid.load();
        vid.play().catch(() => {});
        vid.style.opacity = '1';
      }, 250);
    });
  }

  if (vid && playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
      if (vid.paused) {
        vid.play();
        if (playPauseText) playPauseText.textContent = '⏸ Pause';
      } else {
        vid.pause();
        if (playPauseText) playPauseText.textContent = '▶ Play';
      }
    });
  }

  // Dashboard Tab Switcher: Growth Telemetry vs BG Bot Live Sim
  const tabTelemetry = document.getElementById('tabTelemetry');
  const tabBotSim = document.getElementById('tabBotSim');
  const viewTelemetry = document.getElementById('viewTelemetry');
  const viewBotSim = document.getElementById('viewBotSim');

  if (tabTelemetry && tabBotSim && viewTelemetry && viewBotSim) {
    tabTelemetry.addEventListener('click', () => {
      tabTelemetry.classList.add('active');
      tabTelemetry.setAttribute('aria-selected', 'true');
      tabBotSim.classList.remove('active');
      tabBotSim.setAttribute('aria-selected', 'false');

      viewTelemetry.style.display = 'block';
      viewBotSim.style.display = 'none';
    });

    tabBotSim.addEventListener('click', () => {
      tabBotSim.classList.add('active');
      tabBotSim.setAttribute('aria-selected', 'true');
      tabTelemetry.classList.remove('active');
      tabTelemetry.setAttribute('aria-selected', 'false');

      viewTelemetry.style.display = 'none';
      viewBotSim.style.display = 'block';

      // Elegant staggered message reveal animation for BG Bot simulation
      const bubbles = viewBotSim.querySelectorAll('.sim-bubble');
      bubbles.forEach((b, idx) => {
        b.style.opacity = '0';
        b.style.transform = 'translateY(12px)';
        b.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
          b.style.opacity = '1';
          b.style.transform = 'translateY(0)';
        }, idx * 220);
      });
    });
  }
}

/* ==========================================================================
   12. HERO CARDS INTERACTIVE 3D PERSPECTIVE TILT
   ========================================================================== */

function initHeroCardsTilt() {
  if (window.innerWidth < 1024 || ('ontouchstart' in window)) return;
  const cards = document.querySelectorAll('.hero-copy, .dashboard-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width - 0.5) * 2;
      const yPercent = (y / rect.height - 0.5) * 2;
      
      const rotX = -yPercent * 4;
      const rotY = xPercent * 4;
      
      card.style.transform = 'perspective(1200px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-2px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}


/* ==========================================================================
   13. REALISTIC AMBIENT FLUID WAVE CANVAS (Pure White Theme)
   ========================================================================== */

function initRealisticAmbientWave() {
  const canvas = document.getElementById('ambientMeshCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let time = 0;
  let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
  let animId;

  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const rect = parent.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (width === 0 || height === 0) return;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  window.addEventListener('mousemove', e => {
    mouse.targetX = e.clientX / window.innerWidth;
    mouse.targetY = e.clientY / window.innerHeight;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (e.touches && e.touches.length > 0) {
      mouse.targetX = e.touches[0].clientX / window.innerWidth;
      mouse.targetY = e.touches[0].clientY / window.innerHeight;
    }
  }, { passive: true });

  function drawWave(baseY, amp, freq, speed, color1, color2) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(0, height);
    ctx.lineTo(0, baseY);

    const steps = 16;
    const stepSize = width / steps;

    for (let i = 0; i <= steps; i++) {
      const x = i * stepSize;
      const angle = (x * freq) + (time * speed) + (mouse.x * 2);
      const angle2 = (x * freq * 1.5) - (time * speed * 0.7) + (mouse.y * 1.5);
      const y = baseY + Math.sin(angle) * amp + Math.cos(angle2) * (amp * 0.45);
      ctx.lineTo(x, y);
    }

    ctx.lineTo(width, height);
    ctx.closePath();

    const grad = ctx.createLinearGradient(0, baseY - amp, width, height);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function loop() {
    time += 0.014;
    mouse.x += (mouse.targetX - mouse.x) * 0.04;
    mouse.y += (mouse.targetY - mouse.y) * 0.04;

    ctx.clearRect(0, 0, width, height);

    // Layer 1: Subtle Sky Sapphire Light Wave
    drawWave(
      height * 0.55,
      height * 0.11,
      0.0022,
      1.1,
      'rgba(37, 99, 235, 0.06)',
      'rgba(37, 99, 235, 0.01)'
    );

    // Layer 2: Soft Champagne Gold Ambient Sheen
    drawWave(
      height * 0.65,
      height * 0.13,
      0.0018,
      0.85,
      'rgba(217, 119, 6, 0.045)',
      'rgba(245, 158, 11, 0.01)'
    );

    // Layer 3: Caustic Pearl White Ambient Refraction
    drawWave(
      height * 0.75,
      height * 0.15,
      0.0014,
      0.6,
      'rgba(255, 255, 255, 0.22)',
      'rgba(255, 255, 255, 0.65)'
    );

    animId = requestAnimationFrame(loop);
  }

  loop();
}


/* ==========================================================================
   14. 3D MILKY WAY GALAXY MOTION GRAPHICS ENGINE (Scroll-Driven & Interactive)
   ========================================================================== */

function init3DMilkyWayGalaxy() {
  const canvas = document.getElementById('galaxyCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let animId;

  // Customizer Controls
  const ghAngleBtn = document.getElementById('ghAngleBtn');
  const ghAngleName = document.getElementById('ghAngleName');
  const ghSpeedBtn = document.getElementById('ghSpeedBtn');
  const ghSpeedName = document.getElementById('ghSpeedName');
  const ghColorBtn = document.getElementById('ghColorBtn');
  const ghPaletteName = document.getElementById('ghPaletteName');
  const ghMeteorBtn = document.getElementById('ghMeteorBtn');

  // Camera & 3D Projection Settings
  const fov = 700;
  const cameraZ = 950;
  let rotX = 0.65; // ~37 degrees default tilt
  let rotY = 0;
  let rotZ = 0;
  let targetRotX = 0.65;
  let targetRotY = 0;

  // Speed Settings
  let baseSpeed = 0.0018;
  let speedMultiplier = 1;
  const speedModes = [
    { name: 'Cosmic 1x', mult: 1 },
    { name: 'Fast 2.5x', mult: 2.5 },
    { name: 'Hyper-Warp 6x', mult: 6 }
  ];
  let speedIdx = 0;

  // Camera Presets
  const cameraAngles = [
    { name: 'Oblique 3D', rotX: 0.65 },
    { name: 'Top-Down', rotX: 1.45 },
    { name: 'Edge-On Disc', rotX: 0.18 },
    { name: 'Deep Flight', rotX: 0.95 }
  ];
  let angleIdx = 0;

  // Color Palettes
  const palettes = [
    {
      name: 'Solar Cyan',
      core: ['#ffffff', '#ffebba', '#f59e0b'],
      arms: ['#38bdf8', '#60a5fa', '#818cf8', '#a855f7'],
      dust: 'rgba(56, 189, 248, 0.06)'
    },
    {
      name: 'Cosmic Gold',
      core: ['#ffffff', '#fffbeb', '#fde68a'],
      arms: ['#f59e0b', '#fbbf24', '#fcd34d', '#fed7aa'],
      dust: 'rgba(245, 158, 11, 0.06)'
    },
    {
      name: 'Deep Nebula',
      core: ['#ffffff', '#fdf4ff', '#f0abfc'],
      arms: ['#ec4899', '#a855f7', '#6366f1', '#38bdf8'],
      dust: 'rgba(168, 85, 247, 0.06)'
    }
  ];
  let paletteIdx = 0;

  // Scroll Dynamics
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  let scrollProgress = 0;

  // Mouse / Touch Parallax
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  // Scroll Listener — directly injects 3D momentum and changes camera pitch
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const maxScroll = Math.max(document.body.scrollHeight - window.innerHeight, 1);
    scrollProgress = currentScrollY / maxScroll;

    const delta = currentScrollY - lastScrollY;
    scrollVelocity += delta * 0.0035;
    lastScrollY = currentScrollY;

    // Scroll-driven camera pitch transition across page sections
    // Hero: 0.65 -> Services: 0.9 -> Our Work: 0.35 -> Team: 0.7
    targetRotX = 0.65 + Math.sin(scrollProgress * Math.PI) * 0.45;
  }, { passive: true });

  // Mouse Parallax
  window.addEventListener('mousemove', e => {
    mouse.targetX = (e.clientX / width - 0.5) * 0.5;
    mouse.targetY = (e.clientY / height - 0.5) * 0.4;
  }, { passive: true });

  // Touch Swipe on Mobile
  let touchStartY = 0;
  window.addEventListener('touchstart', e => {
    if (e.touches.length > 0) touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
      const deltaY = e.touches[0].clientY - touchStartY;
      scrollVelocity += -deltaY * 0.002;
      touchStartY = e.touches[0].clientY;
      mouse.targetX = (e.touches[0].clientX / width - 0.5) * 0.4;
    }
  }, { passive: true });

  // Galaxy Particle Architecture
  const NUM_STARS = width < 768 ? 2200 : 3800;
  const NUM_ARMS = 4;
  const GALAXY_RADIUS = 780;
  const stars = [];

  for (let i = 0; i < NUM_STARS; i++) {
    const isCore = Math.random() < 0.28;
    let x, y, z, colorClass, size, alpha, twinkleSpeed, twinklePhase;

    if (isCore) {
      // Dense spherical central galactic core
      const r = Math.pow(Math.random(), 2.4) * (GALAXY_RADIUS * 0.24);
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      x = r * Math.cos(theta) * Math.cos(phi);
      y = (r * Math.sin(phi)) * 0.5; // Flattened core
      z = r * Math.sin(theta) * Math.cos(phi);
      colorClass = 'core';
      size = Math.random() * 2.2 + 0.8;
      alpha = Math.random() * 0.5 + 0.5;
    } else {
      // Logarithmic spiral arms
      const armIdx = i % NUM_ARMS;
      const armBaseAngle = (armIdx / NUM_ARMS) * (Math.PI * 2);
      const dist = Math.pow(Math.random(), 0.9) * GALAXY_RADIUS + (GALAXY_RADIUS * 0.06);

      // Logarithmic spiral math: theta = a * ln(r) + offset
      const spiralAngle = Math.log(dist / 40) * 2.6 + armBaseAngle;

      // Stellar dispersion perpendicular to arm
      const spread = (Math.random() - 0.5) * (dist * 0.38);
      const spreadAngle = Math.random() * Math.PI * 2;

      x = Math.cos(spiralAngle) * dist + Math.cos(spreadAngle) * spread;
      z = Math.sin(spiralAngle) * dist + Math.sin(spreadAngle) * spread;

      // Disc thickness tapers towards rim
      const maxThick = (1 - dist / GALAXY_RADIUS) * 75 + 14;
      y = (Math.random() - 0.5) * maxThick;

      colorClass = 'arm';
      size = Math.random() * 1.8 + 0.5;
      alpha = Math.random() * 0.6 + 0.4;
    }

    twinkleSpeed = Math.random() * 0.03 + 0.01;
    twinklePhase = Math.random() * Math.PI * 2;

    stars.push({
      x, y, z,
      colorClass,
      size,
      alpha,
      baseAlpha: alpha,
      twinkleSpeed,
      twinklePhase,
      distFromCenter: Math.sqrt(x * x + z * z)
    });
  }

  // Shooting Stars / Meteors Engine
  const meteors = [];
  function spawnMeteor() {
    if (meteors.length > 5) return;
    const startX = (Math.random() - 0.5) * width * 1.5;
    const startY = (Math.random() - 0.5) * height * 1.5;
    const startZ = Math.random() * 400 - 200;
    const angle = Math.random() * Math.PI * 0.4 + 0.6; // downward streak
    const speed = Math.random() * 22 + 18;

    meteors.push({
      x: startX,
      y: startY,
      z: startZ,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      vz: (Math.random() - 0.5) * 5,
      length: Math.random() * 120 + 80,
      life: 1,
      decay: Math.random() * 0.02 + 0.015,
      color: Math.random() > 0.4 ? '#38bdf8' : '#f59e0b'
    });
  }

  // Auto-spawn shooting stars periodically
  let meteorTimer = 0;

  // Customizer Event Handlers
  if (ghAngleBtn) {
    ghAngleBtn.addEventListener('click', () => {
      angleIdx = (angleIdx + 1) % cameraAngles.length;
      const angle = cameraAngles[angleIdx];
      targetRotX = angle.rotX;
      if (ghAngleName) ghAngleName.textContent = angle.name;
    });
  }

  if (ghSpeedBtn) {
    ghSpeedBtn.addEventListener('click', () => {
      speedIdx = (speedIdx + 1) % speedModes.length;
      const spd = speedModes[speedIdx];
      speedMultiplier = spd.mult;
      if (ghSpeedName) ghSpeedName.textContent = spd.name;
    });
  }

  if (ghColorBtn) {
    ghColorBtn.addEventListener('click', () => {
      paletteIdx = (paletteIdx + 1) % palettes.length;
      const pal = palettes[paletteIdx];
      if (ghPaletteName) ghPaletteName.textContent = pal.name;
    });
  }

  if (ghMeteorBtn) {
    ghMeteorBtn.addEventListener('click', () => {
      for (let m = 0; m < 3; m++) spawnMeteor();
    });
  }

  // 3D Render Loop
  let frameCount = 0;

  function render() {
    frameCount++;
    const pal = palettes[paletteIdx];

    // Smooth physics interpolation
    rotY += baseSpeed * speedMultiplier + scrollVelocity;
    scrollVelocity *= 0.94; // friction decay

    // Mouse parallax lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    rotX += (targetRotX - rotX) * 0.05;

    // Effective 3D camera angles
    const effRotX = rotX + mouse.y;
    const effRotY = rotY + mouse.x;

    const cosY = Math.cos(effRotY);
    const sinY = Math.sin(effRotY);
    const cosX = Math.cos(effRotX);
    const sinX = Math.sin(effRotX);

    ctx.clearRect(0, 0, width, height);

    const centerX = width * 0.5;
    const centerY = height * 0.5;

    // Draw Core Accretion Glow with additive blending
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    const coreScale = fov / cameraZ;
    const coreScreenX = centerX;
    const coreScreenY = centerY;
    const coreRadius = Math.max(60 * coreScale, 30);

    const coreGrad = ctx.createRadialGradient(
      coreScreenX, coreScreenY, 0,
      coreScreenX, coreScreenY, coreRadius * 2.8
    );
    coreGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    coreGrad.addColorStop(0.2, pal.core[1] || 'rgba(254, 240, 138, 0.8)');
    coreGrad.addColorStop(0.5, pal.core[2] || 'rgba(245, 158, 11, 0.35)');
    coreGrad.addColorStop(0.8, pal.dust);
    coreGrad.addColorStop(1, 'transparent');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(coreScreenX, coreScreenY, coreRadius * 2.8, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Render 3D Stars with true perspective projection
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    const numStars = stars.length;
    for (let i = 0; i < numStars; i++) {
      const s = stars[i];

      // 1. Rotate around Y axis (galactic spin)
      const x1 = s.x * cosY - s.z * sinY;
      const z1 = s.x * sinY + s.z * cosY;

      // 2. Rotate around X axis (camera inclination pitch)
      const y2 = s.y * cosX - z1 * sinX;
      const z2 = s.y * sinX + z1 * cosX;

      // Depth culling
      const depth = cameraZ + z2;
      if (depth <= 20) continue;

      const scale = fov / depth;
      const screenX = centerX + x1 * scale;
      const screenY = centerY + y2 * scale;

      // Viewport frustum culling
      if (screenX < -20 || screenX > width + 20 || screenY < -20 || screenY > height + 20) {
        continue;
      }

      // Star twinkle modulation
      s.twinklePhase += s.twinkleSpeed;
      const twinkle = Math.sin(s.twinklePhase) * 0.35 + 0.65;
      const alpha = Math.min(s.baseAlpha * twinkle * (scale * 1.2), 1);
      const starR = Math.max(s.size * scale, 0.4);

      // Color selection from active palette
      let colorStr;
      if (s.colorClass === 'core') {
        colorStr = pal.core[i % pal.core.length];
      } else {
        const colorIdx = Math.floor((s.distFromCenter / GALAXY_RADIUS) * pal.arms.length);
        colorStr = pal.arms[Math.min(colorIdx, pal.arms.length - 1)];
      }

      ctx.fillStyle = colorStr;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(screenX, screenY, starR, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Render Shooting Stars / Meteors
    meteorTimer++;
    if (meteorTimer > 280) {
      spawnMeteor();
      meteorTimer = 0;
    }

    if (meteors.length > 0) {
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      for (let m = meteors.length - 1; m >= 0; m--) {
        const met = meteors[m];
        met.x += met.vx;
        met.y += met.vy;
        met.z += met.vz;
        met.life -= met.decay;

        if (met.life <= 0) {
          meteors.splice(m, 1);
          continue;
        }

        const tailX = met.x - (met.vx / 18) * met.length;
        const tailY = met.y - (met.vy / 18) * met.length;

        const metScale = fov / (cameraZ + met.z);
        const scrX1 = centerX + met.x * metScale;
        const scrY1 = centerY + met.y * metScale;
        const scrX2 = centerX + tailX * metScale;
        const scrY2 = centerY + tailY * metScale;

        const mGrad = ctx.createLinearGradient(scrX1, scrY1, scrX2, scrY2);
        mGrad.addColorStop(0, 'rgba(255, 255, 255, ' + met.life + ')');
        mGrad.addColorStop(0.3, met.color);
        mGrad.addColorStop(1, 'transparent');

        ctx.strokeStyle = mGrad;
        ctx.lineWidth = Math.max(2.5 * metScale, 1.2);
        ctx.beginPath();
        ctx.moveTo(scrX1, scrY1);
        ctx.lineTo(scrX2, scrY2);
        ctx.stroke();

        // Glowing meteor head
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(scrX1, scrY1, Math.max(3 * metScale, 1.5), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    animId = requestAnimationFrame(render);
  }

  render();
}
