# Konamme Wellness Valley — React Website

A production-grade React + Vite website for **Konamme Wellness Valley**, Kasaragod, Kerala.

---

## 🚀 Running Locally (3 steps)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# → http://localhost:3000
```

That's it! The site opens automatically.

---

## 📁 Project Structure

```
konamme-wellness-react/
├── index.html                  ← Root HTML
├── vite.config.js              ← Vite config (port 3000)
├── package.json
└── src/
    ├── main.jsx                ← React entry point
    ├── App.jsx                 ← All sections + Footer
    ├── index.css               ← Global styles & CSS variables
    ├── data.js                 ← ✏️  ALL CONTENT LIVES HERE
    ├── components/
    │   ├── Navbar.jsx          ← Sticky nav + mobile menu
    │   ├── Navbar.module.css
    │   └── useReveal.js        ← Scroll reveal hook
    └── sections/
        ├── Hero.jsx            ← Full-screen hero
        └── Hero.module.css
```

---

## ✏️ How to Edit Content

**Everything is in `src/data.js`** — open it and edit:

| What to change | Where in data.js |
|---------------|-----------------|
| Hero title, subtitle, buttons | `hero` object |
| About text & images | `about` object |
| Services list | `services` array |
| Wellness programs | `programs` array |
| Conditions treated | `conditions` array |
| Retreat package details | `retreat` object |
| Nearby places | `nearby` array |
| Phone, email, address | `siteConfig` object |

After saving, the browser **hot-reloads automatically** — no refresh needed.

---

## 🖼️ Adding Your Own Images

Replace placeholder Unsplash URLs in `src/data.js`:

```js
// In hero object:
bgImage: '/images/your-hero-photo.jpg',

// In about object:
image1: '/images/retreat-exterior.jpg',
image2: '/images/ayurveda-treatment.jpg',
```

Put your images in the `public/images/` folder (create it) and reference as `/images/filename.jpg`.

---

## 📧 Setting Up the Contact Form

The form currently shows a simulated success. To send real emails, pick one:

### Option A — Formspree (easiest, free)
1. Go to [formspree.io](https://formspree.io) → create a free form
2. Get your form endpoint (e.g. `https://formspree.io/f/xyzabc`)
3. In `App.jsx`, find the `handleSubmit` function and replace with:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault()
  setStatus('sending')
  const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  setStatus(res.ok ? 'success' : 'error')
  if (res.ok) setForm({ name: '', email: '', phone: '', interest: '', message: '' })
}
```

### Option B — EmailJS (no backend needed)
1. Sign up at [emailjs.com](https://emailjs.com) (free tier: 200 emails/month)
2. `npm install @emailjs/browser`
3. Follow their React docs

---

## 🏗️ Building for Production

```bash
npm run build
```

This creates a `dist/` folder — upload its contents to any web host.

---

## 🌐 Deployment Options

| Host | Steps | Cost |
|------|-------|------|
| **Netlify** | Drag & drop `dist/` folder at netlify.com | Free |
| **Vercel** | `npm i -g vercel` → `vercel` | Free |
| **GitHub Pages** | Push to GitHub → enable Pages | Free |
| **Shared hosting** | Upload `dist/` via cPanel File Manager | Paid |

### Netlify (Recommended — fastest)
1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist` folder onto the deploy area
4. Done — live in 30 seconds!

---

## 🎨 Changing Colors

Open `src/index.css` and edit the `:root` variables:

```css
:root {
  --forest:      #2d4a2d;  /* Primary green */
  --gold:        #c9a84c;  /* Accent gold */
  --cream-light: #faf7f2;  /* Background */
  --earth-light: #c4a882;  /* Warm accent */
}
```

---

## 🔧 Tech Stack

- **React 18** — UI components
- **Vite 5** — Dev server & build tool (super fast)
- **CSS Modules** — Scoped styles (no class conflicts)
- **CSS Custom Properties** — Easy theming
- **IntersectionObserver** — Scroll animations (no library needed)
- **Google Fonts** — Cormorant Garamond + Jost

No Redux, no React Router, no heavy dependencies — stays fast and simple.

---

*Konamme Wellness Valley · Narayanamangala, Koipady, Kumble – 671321, Kasaragod, Kerala*
