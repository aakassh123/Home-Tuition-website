/* ================================================================
   GURUJI ADVANCED AI CHATBOT — Era of Education (Gorakhpur)
   - Intelligent Knowledge Base & Intent Scoring Engine
   - Gorakhpur Localities Expertise (Taramandal, Betiahata, Golghar, etc.)
   - Teacher Onboarding & Official WhatsApp Teachers Group Channel Integration
   - Voice/Audio Text-to-Speech support
   - Rich interactive Action Cards with 1-click WhatsApp buttons
   - Safety Layer for student well-being
   ================================================================ */

(function () {
  const WA_NUMBER = "917289053560";
  const TEACHER_CHANNEL_URL = "https://whatsapp.com/channel/0029Vb8QLVbL7UVYXiKoW03V";
  const AVATAR_SRC = "images/guruji-avatar.jpg";

  /* ---------------- 1. SAFETY & CRISIS LAYER ---------------- */
  const CRISIS_PATTERNS = [
    "suicide", "kill myself", "end my life", "end it all", "want to die",
    "no reason to live", "hurt myself", "self harm", "self-harm",
    "cutting myself", "i want to disappear", "better off dead", "mar jana chahta"
  ];

  const HARMFUL_PATTERNS = [
    "bomb", "explosive", "weapon", "gun", "kill someone", "murder",
    "hack", "hacking", "malware", "virus code", "crack password",
    "leak paper", "cheat in exam", "cheating", "buy drugs", "porn", "rape"
  ];

  function matchesAny(text, patterns) {
    return patterns.some((p) => text.includes(p));
  }

  /* ---------------- 2. GORAKHPUR LOCALITIES DATABASE ---------------- */
  const GORAKHPUR_AREAS = [
    { name: "Taramandal", keywords: ["taramandal", "taramandal road", "buddha gate", "nandan nagar"], tutors: "45+ Verified Tutors", avgMatch: "Within 4 Hours" },
    { name: "Betiahata", keywords: ["betiahata", "betyahata", "alankar"], tutors: "38+ Verified Tutors", avgMatch: "Within 6 Hours" },
    { name: "Golghar", keywords: ["golghar", "baldev plaza", "cinema road", "town hall"], tutors: "50+ Verified Tutors", avgMatch: "Instant Matching" },
    { name: "Medical College Road", keywords: ["medical college", "medical road", "brd medical", "b.r.d.", "asuran"], tutors: "42+ Verified Tutors", avgMatch: "Within 6 Hours" },
    { name: "Rapti Nagar", keywords: ["rapti nagar", "raptinagar", "phase 1", "phase 4"], tutors: "35+ Verified Tutors", avgMatch: "Within 12 Hours" },
    { name: "Rustampur", keywords: ["rustampur", "rustampur dhala", "daudpur"], tutors: "30+ Verified Tutors", avgMatch: "Within 12 Hours" },
    { name: "Mohaddipur", keywords: ["mohaddipur", "mohadipur", "charfatak"], tutors: "34+ Verified Tutors", avgMatch: "Within 8 Hours" },
    { name: "Shahpur", keywords: ["shahpur", "gita vatika", "geeta vatika"], tutors: "40+ Verified Tutors", avgMatch: "Within 6 Hours" },
    { name: "Civil Lines", keywords: ["civil lines", "cantt", "railway colony", "park road"], tutors: "28+ Verified Tutors", avgMatch: "Within 8 Hours" },
    { name: "Basharatpur", keywords: ["basharatpur", "medical mor"], tutors: "25+ Verified Tutors", avgMatch: "Within 12 Hours" },
    { name: "Gorakhnath", keywords: ["gorakhnath", "temple road", "subhash nagar"], tutors: "32+ Verified Tutors", avgMatch: "Within 12 Hours" },
    { name: "Padri Bazar", keywords: ["padri bazar", "padribazar", "jail road"], tutors: "22+ Verified Tutors", avgMatch: "Within 16 Hours" },
    { name: "Bargadwa", keywords: ["bargadwa", "industrial area"], tutors: "20+ Verified Tutors", avgMatch: "Within 24 Hours" },
    { name: "Kunraghat", keywords: ["kunraghat", "mmmut", "air force"], tutors: "26+ Verified Tutors", avgMatch: "Within 12 Hours" }
  ];

  /* ---------------- 3. RICH INTENT & KNOWLEDGE ENGINE ---------------- */
  const INTENTS = [
    {
      id: "teacher_join",
      patterns: ["join as teacher", "become a tutor", "teacher registration", "teach with you", "teacher job", "tutor vacancy", "tutor group", "teacher whatsapp", "join whatsapp channel", "teacher group link", "teachers group", "channel link"],
      reply: "👨‍🏫 Welcome to Era of Education Teachers Network!\n\nWe invite dedicated educators in Gorakhpur to teach on their own terms with guaranteed monthly payouts & high student lead volume.\n\n🔔 **Official WhatsApp Teachers Channel:**\nJoin our official channel for daily new home tuition assignment alerts in your preferred Gorakhpur locality!",
      actions: [
        { label: "📲 Join Teachers WhatsApp Channel", url: TEACHER_CHANNEL_URL, class: "g-card-btn-teacher-group" },
        { label: "📝 Fill Teacher Application Form", url: "teacher.html", class: "g-card-btn-action" },
        { label: "💬 Chat with Teacher Coordinator", url: `https://wa.me/${WA_NUMBER}?text=Hi,%20I%20want%20to%20join%20Era%20of%20Education%20as%20a%20Teacher.`, class: "g-card-btn-wa" }
      ]
    },
    {
      id: "fees",
      patterns: ["fee", "fees", "pricing", "cost", "charge", "charges", "kitni fees", "kitna lagega", "rate", "packages"],
      reply: "💰 Our Home Tuition Fees in Gorakhpur are completely transparent and affordable:\n\n• **Class 1 to 5:** ₹1,800 – ₹3,000 / month\n• **Class 6 to 8:** ₹2,500 – ₹4,000 / month\n• **Class 9 to 10:** ₹3,500 – ₹5,500 / month\n• **Class 11 to 12:** ₹4,500 – ₹8,000 / month (Subject specialist)\n• **Spoken English Mastery:** Dedicated customized modules\n\n🎁 *Every student gets a 100% FREE Demo Session before paying anything!*",
      actions: [
        { label: "🎁 Book 100% Free Demo Class", url: "demo.html", class: "g-card-btn-action" },
        { label: "💬 Get Custom Fee Quote on WhatsApp", url: `https://wa.me/${WA_NUMBER}?text=Hi,%20please%20share%20the%20exact%20home%20tuition%20fees%20for%20my%20child.`, class: "g-card-btn-wa" }
      ]
    },
    {
      id: "demo",
      patterns: ["demo", "free class", "trial class", "trial", "free demo", "demo session", "demo kaise", "trial lena hai"],
      reply: "🎁 **100% Free Demo Class at Your Doorstep in Gorakhpur!**\n\n1. Book trial with your child's class and subject.\n2. We assign a verified top subject teacher to your home.\n3. Experience 1 full trial session for free.\n4. Continue only if you are 100% satisfied with the teacher's teaching style!",
      actions: [
        { label: "⚡ Book Free Demo Now", url: "demo.html", class: "g-card-btn-action" },
        { label: "📲 Instant Booking via WhatsApp", url: `https://wa.me/${WA_NUMBER}?text=Hi,%20I%20want%20to%20book%20a%20Free%20Demo%20Class%20in%20Gorakhpur.`, class: "g-card-btn-wa" }
      ]
    },
    {
      id: "female_tutor",
      patterns: ["female tutor", "lady tutor", "female teacher", "lady teacher", "girl tutor", "women tutor", "madam tutor", "lady sir"],
      reply: "👩‍🏫 **Yes! Verified Female Home Tutors Available in Gorakhpur.**\n\nMany parents in Gorakhpur prefer lady tutors for female students or primary children (Class 1–8). We have 120+ background-verified, highly educated female tutors available across all localities including Taramandal, Betiahata, Golghar, Shahpur, and Medical Road.",
      actions: [
        { label: "👩‍🏫 Request Female Tutor via WhatsApp", url: `https://wa.me/${WA_NUMBER}?text=Hi,%20I%20am%20looking%20for%20a%20verified%20Female%20Home%20Tutor%20in%20Gorakhpur.`, class: "g-card-btn-wa" },
        { label: "📝 Fill Student Request Form", url: "student.html", class: "g-card-btn-action" }
      ]
    },
    {
      id: "subjects",
      patterns: ["subject", "subjects", "maths", "science", "physics", "chemistry", "biology", "commerce", "accounts", "spoken english", "cbse", "icse", "up board"],
      reply: "📚 **We Cover All Classes & Boards in Gorakhpur:**\n\n• **Boards:** CBSE, ICSE, ISC, and UP State Board (English & Hindi Medium)\n• **Classes:** Nursery to Class 12th\n• **Core Subjects:** Mathematics, Science, Physics, Chemistry, Biology, Accounts, Economics, English Grammar & Spoken Fluency\n• **Competitive Foundations:** JEE Foundation & NEET Foundation basics",
      actions: [
        { label: "🎯 Find Tutor for My Subject", url: "student.html", class: "g-card-btn-action" }
      ]
    },
    {
      id: "spoken_english",
      patterns: ["spoken english", "english speaking", "fluent english", "communication skill", "english class"],
      reply: "🗣️ **Gorakhpur's #1 Spoken English & Communication Program:**\n\n• 1-on-1 personalized daily speaking practice\n• Accent neutralization & hesitation removal\n• Grammar foundations + vocabulary building\n• Group discussions & interview preparation\n• Doorstep or online personal trainer available!",
      actions: [
        { label: "💬 Inquire About Spoken English", url: `https://wa.me/${WA_NUMBER}?text=Hi,%20I%20am%20interested%20in%20Spoken%20English%20classes%20in%20Gorakhpur.`, class: "g-card-btn-wa" }
      ]
    },
    {
      id: "contact",
      patterns: ["contact", "phone", "number", "whatsapp", "call", "office", "address", "location office", "contact details"],
      reply: "📞 **Contact Era of Education (Gorakhpur Head Office):**\n\n• **Call / WhatsApp:** +91 72890 53560\n• **Email:** eraofedu@gmail.com\n• **Office Address:** Taramandal Road, Near Buddha Gate, Gorakhpur, UP 273016\n• **Working Hours:** Mon – Sun: 8:00 AM – 9:00 PM",
      actions: [
        { label: "📲 Open WhatsApp Helpline", url: `https://wa.me/${WA_NUMBER}?text=Hi,%20I%20need%20assistance%20regarding%20home%20tuition.`, class: "g-card-btn-wa" }
      ]
    },
    {
      id: "verification",
      patterns: ["verified", "safety", "trust", "background check", "police verification", "reliable teacher", "safe for girls"],
      reply: "🛡️ **100% Verified Tutors & Student Safety Guarantee:**\n\n• Aadhaar & identity verification of every tutor\n• Academic degree & qualification cross-checking\n• Mandatory teaching demo test with our senior mentors\n• Parent review & progress monitoring system\n• Instant replacement if you are not 100% happy with teaching quality!",
      actions: [
        { label: "✨ Book Safe Verified Tutor", url: "student.html", class: "g-card-btn-action" }
      ]
    }
  ];

  /* ---------------- 4. NLP INTENT MATCHER ---------------- */
  function findBestResponse(rawText) {
    const text = rawText.toLowerCase().trim();

    // 1) Safety first
    if (matchesAny(text, CRISIS_PATTERNS)) {
      return {
        text: "I care about your wellbeing, and you deserve immediate support right now. 💛 Please contact these 24/7 free helplines:\n\n📞 KIRAN (Govt. Helpline): 1800-599-0019\n📞 AASRA: 9820466726\n📞 Vandrevala Foundation: 1860-2662-345\n\nYou are not alone. Please reach out to someone you trust."
      };
    }

    if (matchesAny(text, HARMFUL_PATTERNS)) {
      return {
        text: "I am designed to assist with positive learning and education in Gorakhpur. How may I help you with home tuition, school studies, or study tips?"
      };
    }

    // 2) Check if user asks about a specific Gorakhpur locality
    for (const area of GORAKHPUR_AREAS) {
      if (matchesAny(text, area.keywords)) {
        return {
          text: `📍 **Home Tuition Available in ${area.name}, Gorakhpur!**\n\n• **Active Tutors:** ${area.tutors}\n• **Speed:** ${area.avgMatch}\n• **Boards:** CBSE, ICSE & UP Board (Classes 1–12)\n\nWe have experienced home tutors living right near ${area.name} ready for doorstep classes. Would you like a free demo?`,
          actions: [
            { label: `🎁 Book Demo in ${area.name}`, url: `demo.html?area=${encodeURIComponent(area.name)}`, class: "g-card-btn-action" },
            { label: `💬 Inquire for ${area.name} on WhatsApp`, url: `https://wa.me/${WA_NUMBER}?text=Hi,%20I%20am%20looking%20for%20a%20home%20tutor%20in%20${encodeURIComponent(area.name)},%20Gorakhpur.`, class: "g-card-btn-wa" }
          ]
        };
      }
    }

    // 3) Match intents by pattern score
    let bestMatch = null;
    let highestScore = 0;

    for (const intent of INTENTS) {
      let score = 0;
      for (const p of intent.patterns) {
        if (text === p) score += 10;
        else if (text.includes(p)) score += 5;
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = intent;
      }
    }

    if (bestMatch && highestScore > 0) {
      return { text: bestMatch.reply, actions: bestMatch.actions };
    }

    // 4) Greetings
    if (/\b(hi|hello|hey|namaste|namaskar|good morning|good evening|pranam)\b/.test(text)) {
      return {
        text: "Namaste! 🙏 I'm Guruji, your AI Education Assistant for Gorakhpur.\n\nI can help you find verified home tutors, check fee structures, book a 100% Free Demo, or help teachers join our network. How can I assist you today?",
        actions: [
          { label: "🎯 Find a Tutor in Gorakhpur", url: "student.html", class: "g-card-btn-action" },
          { label: "💰 View Fees", url: "#", clickAction: "What are your fees?", class: "g-card-btn-action" },
          { label: "👩‍🏫 Join as a Teacher", url: "teacher.html", class: "g-card-btn-teacher-group" }
        ]
      };
    }

    // 5) Smart Fallback
    return {
      text: "Thank you for asking! I'm constantly learning. For direct assistance, you can talk to our Gorakhpur tuition coordinator right now on WhatsApp or book a free trial demo below:",
      actions: [
        { label: "💬 Chat Directly on WhatsApp", url: `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hi Era of Education, I need help with: ' + rawText)}`, class: "g-card-btn-wa" },
        { label: "🎁 Book 100% Free Demo", url: "demo.html", class: "g-card-btn-action" }
      ]
    };
  }

  /* ---------------- 5. TEXT-TO-SPEECH (VOICE ENGINE) ---------------- */
  let speechEnabled = true;
  function speakText(text) {
    if (!speechEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#•]/g, " ").substring(0, 200);
      const utter = new SpeechSynthesisUtterance(cleanText);
      utter.lang = "en-IN";
      utter.rate = 1.0;
      window.speechSynthesis.speak(utter);
    } catch (e) {
      // SpeechSynthesis may fail or be blocked by browser policy
    }
  }

  /* ---------------- 6. UI CONSTRUCTION ---------------- */
  function buildWidget() {
    if (document.getElementById("gurujiWidgetWrap")) return;

    const wrap = document.createElement("div");
    wrap.id = "gurujiWidgetWrap";
    wrap.innerHTML = `
      <div class="guruji-tooltip" id="gurujiTooltip">
        <span>✨ <strong>Guruji AI</strong> • Gorakhpur's Smart Tutor Bot</span>
      </div>

      <button class="guruji-launcher" id="gurujiLauncher" aria-label="Open Guruji AI Assistant">
        <img src="${AVATAR_SRC}" alt="Guruji AI Tutor" class="guruji-launcher-avatar">
        <span class="ping-dot" title="Online"></span>
      </button>

      <div class="guruji-panel" id="gurujiPanel" role="dialog" aria-label="Guruji AI Tutor Chat">
        <div class="guruji-head">
          <div class="avatar-wrap">
            <img src="${AVATAR_SRC}" alt="Guruji Avatar">
          </div>
          <div class="info">
            <h4>Guruji AI <span class="badge-ai">Tutor Bot</span></h4>
            <span>Online • Instant Answers Gorakhpur</span>
          </div>
          <div class="guruji-head-actions">
            <button class="guruji-btn-icon" id="gurujiSoundToggle" title="Toggle Voice / Sound">
              <i class="fa-solid fa-volume-high"></i>
            </button>
            <button class="guruji-btn-icon" id="gurujiReset" title="Reset Conversation">
              <i class="fa-solid fa-rotate-right"></i>
            </button>
            <button class="guruji-btn-icon" id="gurujiClose" title="Minimize Chat">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        <div class="guruji-body" id="gurujiBody"></div>

        <div class="g-quick" id="gurujiQuick">
          <button data-q="What are your home tuition fees in Gorakhpur?">💰 Fees & Plans</button>
          <button data-q="Book a free demo class">🎁 Free Demo</button>
          <button data-q="I want to join as a teacher">👩‍🏫 Join as Teacher</button>
          <button data-q="Do you have tutors in Taramandal Gorakhpur?">📍 Taramandal</button>
          <button data-q="Do you have verified female tutors in Gorakhpur?">👩‍🏫 Female Tutors</button>
          <button data-q="Tutors in Medical College Road Gorakhpur">📍 Medical Road</button>
        </div>

        <div class="guruji-input-row">
          <input type="text" id="gurujiInput" placeholder="Ask about fees, teachers, areas in Gorakhpur..." autocomplete="off">
          <button class="btn-send" id="gurujiSend" aria-label="Send message">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);
  }

  function appendMessage(body, text, who, actions = []) {
    const wrap = document.createElement("div");
    wrap.className = "g-msg-wrap " + who;

    const bubble = document.createElement("div");
    bubble.className = "g-msg " + who;
    bubble.textContent = text;
    wrap.appendChild(bubble);

    if (who === "bot") {
      // Action buttons
      if (actions && actions.length > 0) {
        const actionWrap = document.createElement("div");
        actionWrap.className = "g-card-actions";
        actions.forEach((act) => {
          const a = document.createElement("a");
          a.className = "g-card-btn " + (act.class || "g-card-btn-action");
          a.innerHTML = act.label;
          if (act.url && act.url !== "#") {
            a.href = act.url;
            if (act.url.startsWith("http")) {
              a.target = "_blank";
              a.rel = "noopener noreferrer";
            }
          }
          if (act.clickAction) {
            a.addEventListener("click", (e) => {
              e.preventDefault();
              sendMessage(act.clickAction);
            });
          }
          actionWrap.appendChild(a);
        });
        wrap.appendChild(actionWrap);
      }

      // Meta bar with listen button
      const meta = document.createElement("div");
      meta.className = "g-msg-actions";
      const speakBtn = document.createElement("button");
      speakBtn.className = "g-tts-btn";
      speakBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i> Listen';
      speakBtn.addEventListener("click", () => speakText(text));
      meta.appendChild(speakBtn);
      wrap.appendChild(meta);
    }

    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function showTyping(body) {
    const el = document.createElement("div");
    el.className = "guruji-typing";
    el.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
    return el;
  }

  let sendMessage = () => {};

  function initGuruji() {
    buildWidget();

    const launcher = document.getElementById("gurujiLauncher");
    const tooltip = document.getElementById("gurujiTooltip");
    const panel = document.getElementById("gurujiPanel");
    const closeBtn = document.getElementById("gurujiClose");
    const soundToggle = document.getElementById("gurujiSoundToggle");
    const resetBtn = document.getElementById("gurujiReset");
    const body = document.getElementById("gurujiBody");
    const input = document.getElementById("gurujiInput");
    const sendBtn = document.getElementById("gurujiSend");
    const quick = document.getElementById("gurujiQuick");

    let greeted = false;

    // Show tooltip tease
    setTimeout(() => tooltip && tooltip.classList.add("show"), 1500);
    setTimeout(() => tooltip && tooltip.classList.remove("show"), 7000);

    function openPanel() {
      panel.classList.add("open");
      if (tooltip) tooltip.classList.remove("show");
      if (!greeted) {
        greeted = true;
        const initialText = "Namaste! 🙏 I'm Guruji, your smart AI Education Assistant at Era of Education.\n\nLooking for the best home tutor in Gorakhpur or want to join our verified teaching network? Ask me anything or select a quick option below!";
        appendMessage(body, initialText, "bot", [
          { label: "🎯 Find Home Tutor in Gorakhpur", url: "student.html", class: "g-card-btn-action" },
          { label: "📲 Join Teachers WhatsApp Channel", url: TEACHER_CHANNEL_URL, class: "g-card-btn-teacher-group" },
          { label: "🎁 Book 100% Free Demo", url: "demo.html", class: "g-card-btn-action" }
        ]);
      }
    }

    launcher.addEventListener("click", () => {
      panel.classList.contains("open") ? panel.classList.remove("open") : openPanel();
    });

    closeBtn.addEventListener("click", () => panel.classList.remove("open"));

    // Sound toggle
    soundToggle.addEventListener("click", () => {
      speechEnabled = !speechEnabled;
      soundToggle.innerHTML = speechEnabled
        ? '<i class="fa-solid fa-volume-high"></i>'
        : '<i class="fa-solid fa-volume-xmark"></i>';
    });

    // Reset conversation
    resetBtn.addEventListener("click", () => {
      body.innerHTML = "";
      greeted = false;
      openPanel();
    });

    sendMessage = function(text) {
      const q = (text || input.value).trim();
      if (!q) return;

      appendMessage(body, q, "user");
      input.value = "";

      const typing = showTyping(body);
      const delay = Math.min(1000, 400 + q.length * 15);

      setTimeout(() => {
        typing.remove();
        const res = findBestResponse(q);
        appendMessage(body, res.text, "bot", res.actions);
        if (speechEnabled) {
          speakText(res.text);
        }
      }, delay);
    };

    sendBtn.addEventListener("click", () => sendMessage());
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });

    quick.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-q]");
      if (btn) sendMessage(btn.getAttribute("data-q"));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGuruji);
  } else {
    initGuruji();
  }
})();
