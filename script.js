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
