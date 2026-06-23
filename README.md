# Era of Education — Static Site (Deployment Ready)

100% static. No Node.js, no Express, no database, no APIs, no login/auth.
Every lead form redirects to WhatsApp with a pre-filled message.
Modern, colorful, Vedantu-inspired design with a built-in "Guruji" assistant.

## 1. WhatsApp Number
Set in ONE place: `script.js` → `const WHATSAPP_NUMBER = "917289053560";`
Change this single line to update WhatsApp on the entire site.
(Guruji's own contact-info reply in `guruji.js` uses the same number — update both if it changes.)

## 2. New Design System (theme.css)
One shared file controls the whole look:
- **Colors**: indigo/purple primary, orange CTA, teal "verified" accents, yellow highlight — defined as CSS variables at the top of `theme.css`.
- **Header**: identical sticky, blurred, gradient-CTA navbar on every page, with a mobile hamburger menu and auto-highlighted current page (handled in `script.js`, no per-page edits needed).
- **Animations**: scroll-reveal (`.reveal`), animated counters (`[data-count]`), floating hero art, hover-lift cards — all in `theme.css` + `script.js`, no extra libraries.
- **Components reused everywhere**: `.pill-badge` (colorful highlight chips), `.icon-card` (feature cards), `.stat-card`, `.step-card` (numbered process), `.tcard` (testimonials), `.btn-gradient` / `.btn-outline`.

## 3. Student & Teacher Pages — Fully Rebuilt
Both are now full landing pages (not just a bare form):
Hero (with trust badges) → Stats strip → "Why Choose Us" icon-cards → "How It Works" (4 numbered steps) → Subjects/Opportunities pills → Testimonials → Registration form (card-styled, WhatsApp-connected) → CTA banner → Footer.
Teacher page uses a distinct teal/indigo palette so it doesn't feel like a copy of the Student page.

## 4. Guruji — The Site Assistant 🪔
A floating chat bubble (bottom-left, every page) called **Guruji**. One include — `guruji.css` + `guruji.js` — on every page, so it's fully shared/centralized.

**Important — please read:** since this is a 100% static site with no backend, Guruji is a **rule-based assistant**, not a live AI model call (a real AI model needs a server-side API call, which would reintroduce a "backend"). It works great for FAQs, basic study tips, and supportive responses, but it won't understand truly novel phrasing the way ChatGPT/Claude would. If you ever want a real AI-powered Guruji, that would need one small serverless function (still no full backend) — happy to help with that separately if you want it later.

What Guruji currently handles:
- **Home tuition Q&A**: fees, registration, demo classes, subjects, locations, teacher verification, timing, contact info.
- **Basic study help**: a few common concept explanations (quadratic equations, photosynthesis, Newton's laws) plus general study/focus/exam-prep tips.
- **Light emotional support**: stress, low motivation, fear of failure — responds with empathy and encourages talking to a parent/teacher/counsellor for anything serious. This is supportive conversation, not therapy or diagnosis.
- **Safety built in**:
  - If someone mentions self-harm or suicide, Guruji always responds with care and real Indian helpline numbers (KIRAN, AASRA, Vandrevala Foundation) instead of refusing or ignoring it.
  - Dangerous/harmful requests (weapons, hacking, exam cheating, harassment, explicit content, etc.) are politely declined and redirected toward something constructive.
- Anything it doesn't recognize → it offers to hand the conversation off to your WhatsApp.

To edit what Guruji knows: open `guruji.js` and look at the `KB`, `STUDY_HELP`, and `EMOTIONAL` arrays — each is just a list of `{ keywords, reply }` objects you can add to.

## 5. Folder Structure (reorganized for clarity)
```
era-of-education/
├── index.html          → Home page
├── about.html           → About page
├── team.html            → Team page
├── contact.html         → Contact page
├── student.html         → Student registration (WhatsApp lead form)
├── teacher.html         → Teacher registration (WhatsApp lead form)
├── demo.html            → Free demo booking (WhatsApp lead form)
├── README.md
├── css/
│   ├── theme.css         → Shared design system (colors, header, animations) — used on EVERY page
│   ├── style.css         → index.html only
│   ├── about.css         → about.html only
│   ├── team.css          → team.html only
│   ├── contact.css       → contact.html only
│   ├── student.css       → student.html only
│   ├── teacher.css       → teacher.html only
│   └── guruji.css        → Chatbot widget styling — used on EVERY page
├── js/
│   ├── script.js         → Shared: WhatsApp helper, nav menu, scroll-reveal, counters, sliders — used on EVERY page
│   └── guruji.js         → Chatbot widget logic — used on EVERY page
└── images/
    └── Logo.PNG          → Site logo (only image file actually referenced anywhere)
```
**Rule of thumb to explain to others:** every page links its OWN css file from `css/` (e.g. `about.html` → `css/about.css`) plus the two SHARED files `css/theme.css` and `css/guruji.css`. Every page also loads the two shared scripts `js/script.js` and `js/guruji.js`. Nothing else changed — design, colors, and animations are identical to before, only the folder layout is cleaner.

(`logo.jpg` and the 9.8MB `bck.jpg` were unused dead weight and have been removed in an earlier pass.)

## 5a. Bug Fix (this update)
`index.html` had a malformed tag on line 7 from the very original file:
`<!<link href="...fonts.googleapis.com...">`. Browsers treat `<!` not followed
by `--` or `DOCTYPE` as a "bogus comment" that swallows everything up to the
next `>` — so this entire line was being silently discarded by every browser.
Fixed it to a proper `<link>` tag.

Also removed two unused image files that were just sitting in the project
unreferenced by any page: `logo.jpg` (57KB) and `bck.jpg` (a 9.8MB background
image nothing pointed to) — these were just adding dead weight to the folder
and slowing down opening/syncing the project.

## 6. Files/Folders Deleted (unchanged from previous build)
backend/, database/, root node_modules/, package.json, package-lock.json, login/register/admin/payment pages and their CSS/JS, all dashboard files, the unused duplicate "book demo.html", index.js (backend login fetch), about.js (unused popup), empty js/ and assets/ folders, the placeholder images/akash.jpg.

## 7. Deploy
Upload the whole folder as-is to Netlify, Vercel, GitHub Pages, or Hostinger. `index.html` is the entry point. No build step required.

## 7a. Security Review
Checked the code for common vulnerabilities. Summary:
- **No SQL injection / server hacking risk** — there's no database or backend at all, so that entire attack surface doesn't exist.
- **No XSS risk in the Guruji chatbot** — user-typed chat messages are inserted with `textContent`, not `innerHTML`, so typed text can never be executed as code.
- **No login or payment data anywhere** — nothing sensitive is stored, so there's nothing for an attacker to steal from the site itself.
- **All external resources (fonts, icons, photos) load over HTTPS** from Google Fonts, cdnjs, and Pexels — no risk from those.

What this site **can't** protect against (because it's a static site, not a flaw in your code):
- **Anyone can view your HTML/CSS/JS source** via "View Page Source" in any browser — this is true of every website on earth, not a bug. Don't put secrets (API keys, passwords) in any client-side file, ever.
- **The real protection against someone "changing your files" is account security, not code** — secure the login of wherever you deploy (Netlify/Vercel/GitHub/Hostinger) with a strong, unique password + two-factor authentication (2FA). That account is the only way anyone could alter the live site.
- Once deployed, turn on **HTTPS** (automatic on Netlify/Vercel/GitHub Pages) so visitors' connections can't be intercepted.
- Optional hardening: add a `_headers` file (Netlify) or `vercel.json` headers config setting `X-Frame-Options: DENY` and a basic Content-Security-Policy, to block click-jacking attempts. Not required for a brochure/lead-gen site like this, but easy to add later if you want belt-and-braces protection.

## 7b. WhatsApp Lead Flow — How It Actually Works
Confirmed this is wired up on all 3 lead forms (`student.html`, `teacher.html`, `demo.html`):
1. Visitor fills the form and hits submit.
2. JavaScript builds a message with their details and opens `https://wa.me/917289053560?text=...` in a new tab — this opens **the visitor's own WhatsApp** (app or web) with the message already typed into the chat box, addressed to your number.
3. **Important: the visitor still has to tap Send themselves.** Since this site has no backend/server, there is no way for a static site to silently send a message on its own — that's a browser security restriction (and a privacy protection for the visitor) that no website can bypass.

So it's "pre-filled and one tap away," not fully automatic. If a visitor closes the tab without tapping Send, you won't get that lead. If you want true zero-click delivery (data lands in your WhatsApp/inbox the moment someone hits submit, no second tap needed), that requires a small backend (e.g. one serverless function calling the WhatsApp Business API) — happy to help build that separately if you want it.

`contact.html`'s email field is decorative only (see point 8 below) and is **not** connected to WhatsApp or anywhere else yet.

## 8. Still worth a decision
- The footer's "Subscribe" box has no functionality (decorative only, same as before) — let me know if you want it wired up or removed.
-- The site now uses a single WhatsApp/phone number `7289053560` everywhere.

