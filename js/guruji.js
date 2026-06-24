/* ================================================================
   GURUJI — Era of Education's friendly learning assistant.
   Static, rule-based assistant (no backend/API calls — this is a
   100% static site). Answers home-tuition questions, gives basic
   study help and light emotional support, and safely declines
   anything dangerous or harmful.
   ================================================================ */

(function () {
  const WA_NUMBER = "917289053560";

  /* ---------------- 1. SAFETY LAYER (checked first, always) ---------------- */

  // Crisis / self-harm — respond with care + real helplines, never refuse silently.
  const CRISIS_PATTERNS = [
    "suicide", "kill myself", "end my life", "end it all", "want to die",
    "no reason to live", "hurt myself", "self harm", "self-harm",
    "cutting myself", "i want to disappear", "better off dead"
  ];

  // Harmful / dangerous — politely decline, redirect to something positive.
  const HARMFUL_PATTERNS = [
    "bomb", "explosive", "make a weapon", "gun", "kill someone", "murder",
    "hack", "hacking", "ddos", "malware", "virus code", "crack password",
    "leaked question paper", "leak paper", "cheat in exam", "cheating in exam",
    "exam cheat", "buy drugs", "make drugs", "self harm someone", "hurt someone",
    "beat someone", "bully", "porn", "nude", "sex video", "rape", "terrorist",
    "how to steal", "fake marksheet", "fake certificate", "fake degree"
  ];

  function matchesAny(text, patterns) {
    return patterns.some((p) => text.includes(p));
  }

  /* ---------------- 2. KNOWLEDGE BASE ---------------- */
  // Each entry: keywords (any match triggers it) + a reply.
  const KB = [
    {
      keywords: ["fee", "fees", "price", "pricing", "cost", "charge", "charges"],
      reply:
        "Our pricing is simple and transparent, Beta 😊\n\n📘 Essential Plan — Tutor fees only\n🚀 Standard Plan — Tutor fees + ₹499 (replacement, doubt-solving, parent meetings)\n👑 Premium Plan — Tutor fees + ₹999 (career guidance, spoken English, flexible scheduling)\n\nWant the exact tutor fee for your class & subject? I'll connect you on WhatsApp.",
    },
    {
      keywords: ["register", "registration", "admission", "apply", "sign up", "enroll", "enrol"],
      reply:
        "Registering is super quick!\n\n👨‍🎓 Students: go to the Students page and fill the short form.\n👩‍🏫 Teachers: go to the Teachers page and fill the short form.\n\nBoth forms send your details straight to our WhatsApp so our team can reach out fast.",
    },
    {
      keywords: ["demo", "free class", "trial class", "trial"],
      reply:
        "Yes! Every student gets a 100% FREE demo class before committing to anything. You can book it on our 'Book Free Demo' page — no charges, no pressure. 🎁",
    },
    {
      keywords: ["teacher", "tutor", "verified", "background check"],
      reply:
        "All our teachers are verified and subject-tested before they're matched with a student — so you can trust the person teaching at your home. 🛡️",
    },
    {
      keywords: ["subject", "subjects", "class 1", "class 10", "class 12", "jee", "neet", "english speaking", "spoken english"],
      reply:
        "We cover Classes 1–12 (CBSE/ICSE/State boards), all major subjects, JEE/NEET foundation, and Spoken English. Tell me your class & subject and I can guide you further!",
    },
    {
      keywords: ["location", "city", "where", "area", "gorakhpur", "available in"],
      reply:
        "We're based in Gorakhpur and currently serve 10+ cities. Tell me your city and I'll let you know if home tuition is available there — or just ask on WhatsApp for the fastest answer.",
      reply_hi:
        "हम गोरखपुर में स्थित हैं और वर्तमान में कई शहरों में सेवाएँ देते हैं। कृपया अपना शहर बताइए — मैं आपको बताऊंगा कि क्या होम ट्यूशन उपलब्ध है।",
    },
    {
      keywords: ["online", "home tuition", "offline", "in person", "at home"],
      reply:
        "We mainly focus on home tuition — a teacher comes to your home for personalized, 1-on-1 attention. Some teachers also offer online classes if that's more convenient for you.",
    },
    {
      keywords: ["contact", "phone", "number", "whatsapp", "call", "email"],
      reply:
        "You can reach our team here:\n📞 +91 72890 53560\n✉ eraofedu@gmail.com\n\nOr just tap the WhatsApp button on this page!",
    },
    {
      keywords: ["timing", "schedule", "time", "flexible"],
      reply:
        "Class timing is fully flexible — you decide what works for your routine, and we match you with a teacher who can fit that schedule.",
    },
    {
      keywords: ["refund", "cancel", "cancellation", "commitment"],
      reply:
        "There's zero commitment until you're happy. The demo class is free, and you only continue if you and your child are satisfied with the teacher.",
    },
    {
      keywords: ["who are you", "what are you", "your name", "guruji"],
      reply:
        "I'm Guruji 🪔 — Era of Education's learning buddy! I can help with questions about home tuition, study tips, and a bit of friendly support when school feels stressful. How can I help today?",
      reply_hi:
        "मैं गुरुजी 🪔 हूँ — Era of Education का आपका पढ़ाई साथी! मैं होम ट्यूशन, पढ़ाई के सुझाव और सहायक समर्थन में मदद कर सकता हूँ। मैं कैसे मदद करूँ?",
    },
  ];

  /* ---------------- GORAKHPUR SPECIFIC INFO ---------------- */
  const GKP = {
    schools: [
      "St. Joseph Inter College",
      "Jeevan Jyoti School",
      "Central Hindu School",
      "DAV Public School",
    ],
    colleges: [
      "Deen Dayal Upadhyaya Gorakhpur University",
      "Shri Ramswaroop Memorial College",
      "MKP P.G. College",
    ],
    coaching_centers: ["Aakash Coaching, Gorakhpur", "Allen Institute (local branch)", "Local Maths & Science Tutors"],
    info:
      "Gorakhpur is an educational hub in eastern Uttar Pradesh with many schools, colleges and coaching centres. For exact locations or distances, tell me the place name and I can help estimate or open a Google search.",
    info_hi:
      "गोरखपुर पूर्वी उत्तर प्रदेश का एक शैक्षिक केंद्र है, जहाँ कई स्कूल, कॉलेज और कोचिंग सेंटर हैं। सटीक जानकारी के लिए स्थान बताइए — मैं दूरी का अनुमान लगा कर या गूगल खोज खोल कर मदद कर सकता हूँ।",
  };

  /* ---------------- 3. STUDY HELP (light technical support) ---------------- */
  const STUDY_HELP = [
    {
      keywords: ["quadratic", "quadratic equation"],
      reply:
        "A quadratic equation looks like ax² + bx + c = 0. You can solve it using the quadratic formula:\nx = (-b ± √(b²-4ac)) / 2a\n\nFor a deeper walk-through with examples, our subject teachers cover this in detail during a free demo class!",
    },
    {
      keywords: ["photosynthesis"],
      reply:
        "Photosynthesis is how plants make food using sunlight: \n6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂\nIn short — plants absorb carbon dioxide and water, use sunlight energy (captured by chlorophyll) to convert them into glucose (food) and release oxygen.",
    },
    {
      keywords: ["newton", "laws of motion"],
      reply:
        "Newton's 3 Laws of Motion, in short:\n1️⃣ An object stays at rest or in motion unless a force acts on it.\n2️⃣ Force = mass × acceleration (F=ma).\n3️⃣ Every action has an equal and opposite reaction.",
    },
    {
      keywords: ["study tips", "how to study", "concentration", "focus", "time management", "exam preparation", "how to prepare"],
      reply:
        "A few tips that really help:\n📅 Make a simple daily timetable — small consistent sessions beat long cram sessions.\n🎯 Study the hardest subject when your mind is freshest.\n📵 Keep your phone away during study blocks (try 25-min focus sprints).\n📝 Teach the topic out loud to yourself — it reveals what you don't fully understand yet.\n\nWant subject-specific tips? Tell me which subject!",
    },
  ];

  /* ---------------- 4. EMOTIONAL SUPPORT (general, non-diagnostic) ---------------- */
  const EMOTIONAL = [
    {
      keywords: ["stressed", "stress", "anxious", "anxiety", "exam fear", "scared of exam", "exam pressure"],
      reply:
        "It's completely normal to feel this way before exams — most students do. 💛 Try breaking your syllabus into small daily goals instead of looking at the whole thing at once, and take short breaks to breathe. You're more prepared than you feel right now. If the pressure feels too heavy, talking to a parent, teacher, or counsellor can really help too.",
    },
    {
      keywords: ["sad", "demotivated", "feel like giving up", "not able to study", "low marks", "failed", "i failed"],
      reply:
        "One result or one bad day doesn't define you — truly. 💪 Every student has setbacks; what matters is the next step you take. If you'd like, tell me the subject you're struggling with and I'll share a few tips. And if things feel heavy in general, it always helps to talk to someone you trust — a parent, teacher, or friend.",
    },
    {
      keywords: ["motivate me", "motivation", "no confidence", "lack confidence"],
      reply:
        "Here's something worth remembering: confidence isn't something you wait for — it's something you build, one small win at a time. Pick one small topic today, master it, and let that be your proof that you can do this. You've got this! 🌟",
    },
  ];

  /* ---------------- 5. GREETINGS / SMALL TALK ---------------- */
  const GREETINGS = ["hi", "hello", "hey", "namaste", "good morning", "good evening", "good afternoon"];

  /* ---------------- 6. SESSION / LEAD FLOW STATE ---------------- */
  let leadState = null; // { step: number, data: {} , lang: 'hi'|'en' }

  /* ---------------- Helpers: language, math, date ---------------- */
  function isHindi(text) {
    return /[\u0900-\u097F]/.test(text) || /namaste|namaskar|dhanyavaad|धन्यवाद|नमस्ते/i.test(text);
  }

  function numericListFromText(text) {
    const parts = text.replace(/[^0-9.,\- ]+/g, " ").split(/[ ,]+/).map((s) => s.trim()).filter(Boolean);
    return parts.map((p) => Number(p)).filter((n) => !Number.isNaN(n));
  }

  function safeEval(expr) {
    // allow only numbers, spaces and +-*/().% characters
    if (!/^[0-9+\-*/(). %]+$/.test(expr)) return null;
    try {
      // eslint-disable-next-line no-new-func
      return Function('return (' + expr + ')')();
    } catch (e) {
      return null;
    }
  }

  function formatNumber(n) {
    if (Number.isInteger(n)) return String(n);
    return String(Number(n.toFixed(6)).toString());
  }

  /* ---------------- CORE: generate a reply ---------------- */
  function getReply(rawText) {
    const text = rawText.toLowerCase().trim();
    const lang = isHindi(rawText) ? 'hi' : 'en';

    // 1) Crisis check — always first, always answered with care.
    if (matchesAny(text, CRISIS_PATTERNS)) {
      return (
        "I'm really sorry you're feeling this way, and I'm glad you told me. 💛 You deserve support from someone who can really help right now — please reach out to:\n\n" +
        "📞 KIRAN (Govt. of India, 24/7): 1800-599-0019\n" +
        "📞 AASRA: 9820466726\n" +
        "📞 Vandrevala Foundation: 1860-2662-345\n\n" +
        "If you're in immediate danger, please call 112 or go to the nearest hospital right away. You don't have to face this alone."
      );
    }

    // 2) Harmful/dangerous content — decline, redirect.
    if (matchesAny(text, HARMFUL_PATTERNS)) {
      return "I'm not able to help with that, sorry. I'm here to support your learning and wellbeing — would you like study tips, info about our tuition plans, or just a chat about how your day's going?";
    }

    // 3) Greetings
    if (GREETINGS.some((g) => text === g || text.startsWith(g + " ") || text.startsWith(g + "!"))) {
      return lang === 'hi'
        ? "नमस्ते! 🙏 मैं गुरुजी हूँ — Era of Education का आपका पढ़ाई साथी। फीस, रजिस्ट्रेशन, विषय या पढ़ाई के सुझाव पूछिए।"
        : "Namaste! 🙏 I'm Guruji, your learning buddy at Era of Education. Ask me about fees, registration, subjects, study tips — or just say what's on your mind.";
    }

    // Thanks / Bye
    if (/\b(thank|thanks|thank you|dhanyavaad|धन्यवाद)\b/.test(text)) {
      return lang === 'hi' ? 'आपका धन्यवाद! 😊 क्या मैं और कुछ मदद कर सकता/सकती हूँ?' : "You're welcome! 😊 Can I help with anything else?";
    }
    if (/\b(bye|goodbye|see you|namaste bye|अलविदा|बाय)\b/.test(text)) {
      return lang === 'hi' ? 'अलविदा! शुभकामनाएँ — अगर कुछ चाहिए तो वापस आइए।' : "Goodbye! Best wishes — come back anytime.";
    }

    // If currently inside lead collection flow, handle steps
    if (leadState) {
      const step = leadState.step;
      const v = rawText.trim();
      if (step === 0) {
        leadState.data.name = v;
        leadState.step = 1;
        return leadState.lang === 'hi' ? 'कक्षा बताइए (उदा. Class 10)' : 'Please tell the Class (e.g. Class 10)';
      }
      if (step === 1) {
        leadState.data.class = v;
        leadState.step = 2;
        return leadState.lang === 'hi' ? 'किस विषय के लिए ट्यूटर चाहिए?' : 'Which Subject do you need the tutor for?';
      }
      if (step === 2) {
        leadState.data.subject = v;
        leadState.step = 3;
        return leadState.lang === 'hi' ? 'आपका स्थान/एरिया बताइए (उदा. Gorakhpur)' : 'Please share your Location (area/city)';
      }
      if (step === 3) {
        leadState.data.location = v;
        leadState.step = 4;
        return leadState.lang === 'hi' ? 'अपना पसंदीदा समय बताइए (सुबह/शाम/शाम 6-8)' : 'Preferred Timing (morning/evening or e.g. 6-8pm)';
      }
      if (step === 4) {
        leadState.data.timing = v;
        leadState.step = 5;
        return leadState.lang === 'hi' ? 'कृपया संपर्क नंबर भेजें' : 'Please provide a Contact Number';
      }
      if (step === 5) {
        leadState.data.contact = v;
        const saved = Object.assign({}, leadState.data);
        leadState = null;
        // TODO: could send to server or WhatsApp; for now, open WhatsApp prefilled message optionally
        return (
          (lang === 'hi'
            ? 'धन्यवाद। आपकी जानकारी प्राप्त हो गई है। हमारी टीम शीघ्र ही आपसे संपर्क करेगी।'
            : 'Thank you. Your request has been received successfully. Our team will contact you shortly.') +
          '\n\n' +
          (lang === 'hi' ? 'हम आपकी जानकारी सुरक्षित रखेंगे।' : "We'll keep your details secure.")
        );
      }
    }

    // 3.5) Math and conversions: detect math expressions
    // percentage: "what is 20% of 200"
    const percMatch = text.match(/(\d+(?:\.\d+)?)\s*%\s*of\s*(\d+(?:\.\d+)?)/i);
    if (percMatch) {
      const p = Number(percMatch[1]);
      const of = Number(percMatch[2]);
      const res = (p / 100) * of;
      return lang === 'hi' ? `परिणाम: ${formatNumber(res)}` : `Result: ${formatNumber(res)}`;
    }

    // average: "average of 2,3,4"
    if (/average of/i.test(text) || /mean of/i.test(text)) {
      const nums = numericListFromText(text);
      if (nums.length) {
        const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
        return lang === 'hi' ? `औसत: ${formatNumber(avg)}` : `Average: ${formatNumber(avg)}`;
      }
    }

    // simple expression e.g. "calculate 2+3*5" or "what is 2 * (3+4)"
    const exprMatch = text.match(/(?:calculate|what is|solve|=)?\s*([0-9+\-*/(). %]+)$/i);
    if (exprMatch) {
      const expr = exprMatch[1].replace(/×/g, '*').replace(/÷/g, '/');
      const val = safeEval(expr);
      if (val !== null) return lang === 'hi' ? `परिणाम: ${formatNumber(val)}` : `Result: ${formatNumber(val)}`;
    }

    // simple interest: "simple interest on 1000 rate 5 time 2" or "si 1000 5 2"
    const siMatch = text.match(/simple interest(?: on)?\s*(\d+(?:\.\d+)?)\s*(?:rate\s*)?(\d+(?:\.\d+)?)\s*(?:time|years?)\s*(\d+(?:\.\d+)?)/i);
    if (siMatch) {
      const p = Number(siMatch[1]), r = Number(siMatch[2]), t = Number(siMatch[3]);
      const si = (p * r * t) / 100;
      return lang === 'hi' ? `सरल ब्याज: ${formatNumber(si)}` : `Simple Interest: ${formatNumber(si)}`;
    }

    // compound interest: "compound interest principal 1000 rate 5 time 2" => A = P(1+r/100)^t
    const ciMatch = text.match(/compound interest(?: on| for)?\s*(?:principal\s*)?(\d+(?:\.\d+)?)\s*(?:rate\s*)?(\d+(?:\.\d+)?)\s*(?:time|years?)\s*(\d+(?:\.\d+)?)/i);
    if (ciMatch) {
      const p = Number(ciMatch[1]), r = Number(ciMatch[2]), t = Number(ciMatch[3]);
      const a = p * Math.pow(1 + r / 100, t);
      const ci = a - p;
      return lang === 'hi' ? `चक्रवृद्धि ब्याज कुल: ${formatNumber(a)}, ब्याज: ${formatNumber(ci)}` : `Amount: ${formatNumber(a)}, Interest: ${formatNumber(ci)}`;
    }

    // age calculation: "age of someone born on 2005-05-12" or "i was born on 12/05/2005"
    const dobMatch = text.match(/(born|birth|born on)\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}[\-]\d{2}[\-]\d{2}|\d{4})/i);
    if (dobMatch) {
      const d = dobMatch[2];
      let dt;
      if (/^\d{4}$/.test(d)) dt = new Date(Number(d), 0, 1);
      else dt = new Date(d.replace(/\/(\d+)\/(\d+)/, '$2/$1'));
      if (!isNaN(dt)) {
        const diff = Date.now() - dt.getTime();
        const age = Math.floor(diff / 31557600000);
        return lang === 'hi' ? `आयु: ${age} वर्ष` : `Age: ${age} years`;
      }
    }

    // unit conversions (simple)
    const kmToMiles = text.match(/(\d+(?:\.\d+)?)\s*(km|kilometer|kilometre)s?\s*(to|in?)\s*(miles|mile)/i);
    if (kmToMiles) {
      const v = Number(kmToMiles[1]);
      const res = v * 0.621371;
      return lang === 'hi' ? `${v} किलोमीटर ≈ ${formatNumber(res)} मील` : `${v} km ≈ ${formatNumber(res)} miles`;
    }

    // Gorakhpur-specific queries
    if (/gorakhpur/.test(text) || /गोरखपुर/.test(rawText)) {
      if (/school|college|coaching|कोचिंग|स्कूल|कॉलेज/.test(text) || /school|college|coaching/.test(text)) {
        const list = (GKP.schools.concat(GKP.colleges, GKP.coaching_centers)).join('\n- ');
        return lang === 'hi' ? `${GKP.info_hi}\n\nकुछ संस्थाएँ:\n- ${list}` : `${GKP.info}\n\nSome institutions:\n- ${list}`;
      }
      return lang === 'hi' ? GKP.info_hi : GKP.info;
    }

    // Lead generation intent: user wants a tutor
    if (/need a tutor|want a tutor|looking for tutor|hire tutor|tutor for|tutor required|ट्यूटर|ट्यूटोर/i.test(text)) {
      leadState = { step: 0, data: {}, lang };
      return lang === 'hi' ? 'ज़रूर — कृपया विद्यार्थी का नाम बताइए।' : 'Sure — please tell the Student Name.';
    }

    // 4) Knowledge base (home tuition FAQs)
    for (const item of KB) {
      if (matchesAny(text, item.keywords)) return lang === 'hi' && item.reply_hi ? item.reply_hi : item.reply;
    }

    // 5) Study help
    for (const item of STUDY_HELP) {
      if (matchesAny(text, item.keywords)) return item.reply;
    }

    // 6) Emotional support
    for (const item of EMOTIONAL) {
      if (matchesAny(text, item.keywords)) return item.reply;
    }

    // 7) Fallback
    return "I don't have an exact answer for that yet, but our team can help directly! Tap below to continue on WhatsApp, or try asking me about fees, subjects, registration, or study tips. 😊";
  }

  /* ---------------- UI INJECTION ---------------- */
  function buildWidget() {
    const wrap = document.createElement("div");
    wrap.innerHTML = `
      <div class="guruji-tooltip" id="gurujiTooltip">Ask Guruji 🪔 — your learning buddy</div>
      <button class="guruji-launcher" id="gurujiLauncher" aria-label="Open Guruji chat">
        🪔<span class="ping-dot"></span>
      </button>
      <div class="guruji-panel" id="gurujiPanel">
        <div class="guruji-head">
          <div class="avatar">🪔</div>
          <div class="info">
            <h4>Guruji</h4>
            <span>Online now</span>
          </div>
          <button class="guruji-close" id="gurujiClose" aria-label="Close chat">✕</button>
        </div>
        <div class="guruji-body" id="gurujiBody"></div>
        <div class="g-quick" id="gurujiQuick">
          <button data-q="What are your fees?">💰 Fees</button>
          <button data-q="How do I register?">📝 Register</button>
          <button data-q="Tell me about the free demo class">🎁 Free Demo</button>
          <button data-q="Give me study tips">📚 Study Tips</button>
        </div>
        <div class="guruji-cta" style="padding:12px;text-align:center;">
          <button id="gurujiWhatsApp" style="background:#25D366;border:none;color:#fff;padding:10px 14px;border-radius:8px;cursor:pointer;font-weight:600;">Continue on WhatsApp</button>
        </div>
        <div class="guruji-input-row">
          <input type="text" id="gurujiInput" placeholder="Ask Guruji anything...">
          <button id="gurujiSend" aria-label="Send">➤</button>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);
  }

  function addMessage(body, text, who) {
    const div = document.createElement("div");
    div.className = "g-msg " + who;
    div.textContent = text;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function showTyping(body) {
    const t = document.createElement("div");
    t.className = "guruji-typing";
    t.id = "gurujiTypingIndicator";
    t.innerHTML = "<span></span><span></span><span></span>";
    body.appendChild(t);
    body.scrollTop = body.scrollHeight;
    return t;
  }

  function initGuruji() {
    buildWidget();

    const launcher = document.getElementById("gurujiLauncher");
    const tooltip = document.getElementById("gurujiTooltip");
    const panel = document.getElementById("gurujiPanel");
    const closeBtn = document.getElementById("gurujiClose");
    const body = document.getElementById("gurujiBody");
    const input = document.getElementById("gurujiInput");
    const sendBtn = document.getElementById("gurujiSend");
    const quick = document.getElementById("gurujiQuick");
    const waBtn = document.getElementById("gurujiWhatsApp");

    let greeted = false;

    setTimeout(() => tooltip.classList.add("show"), 1200);
    setTimeout(() => tooltip.classList.remove("show"), 6000);

    function openPanel() {
      panel.classList.add("open");
      tooltip.classList.remove("show");
      if (!greeted) {
        greeted = true;
        addMessage(
          body,
          "Namaste! 🙏 I'm Guruji, your learning buddy at Era of Education. Ask me about fees, registration, subjects, study tips — or just say what's on your mind.",
          "bot"
        );
      }
    }

    launcher.addEventListener("click", () => {
      panel.classList.contains("open") ? panel.classList.remove("open") : openPanel();
    });
    closeBtn.addEventListener("click", () => panel.classList.remove("open"));

    function handleSend(text) {
      const value = (text || input.value).trim();
      if (!value) return;
      addMessage(body, value, "user");
      input.value = "";

      const typingEl = showTyping(body);
      const delay = 500 + Math.random() * 500;
      setTimeout(() => {
        typingEl.remove();
        const reply = getReply(value);
        addMessage(body, reply, "bot");
      }, delay);
    }

    sendBtn.addEventListener("click", () => handleSend());
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleSend();
    });
    quick.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-q]");
      if (btn) handleSend(btn.getAttribute("data-q"));
    });

    if (waBtn) {
      waBtn.addEventListener("click", () => {
        const msg = "Hi — I'd like help from Era of Education. Please connect me.";
        const encoded = encodeURIComponent(msg);
        window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank");
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initGuruji);
  } else {
    initGuruji();
  }
})();
