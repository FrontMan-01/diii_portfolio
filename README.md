# Akrati Portfolio & Media Kit 🌟

A world-class editorial portfolio and digital media kit website for fashion, beauty, and lifestyle creator **Akrati** (`@akrati.creates`).

---

## 🎨 Design & Aesthetic Architecture

* **Theme:** Dark Mineral Graphite (`#18191B`) with Radiant Sunlit Gold (`#E7C456`) and Sunset Orange (`#E27D26`) ambient glowing pools.
* **Ambient Lighting & Canvas:** Dynamic multi-layered radial ambient gradient pools with subtle rising sunlit bokeh motes.
* **iPhone Liquid Glass Navigation:** Centered Dynamic Island floating capsule header with double specular rim highlights, segmented pill navigation, live activity status indicator (`OPEN FOR 2026 DEALS`), and responsive mobile drawer.
* **Typography:** Editorial Serif (*Playfair Display* / *Instrument Serif*) paired with modern geometric sans (*Plus Jakarta Sans* / *SF Pro Display*) and monospaced telemetry tokens (*Space Mono*).

---

## 📂 Project Structure

```
akrati-portfolio/
├── public/
│   └── assets/
│       ├── photos/              # High-res editorial photoshoot stills & magazine cover
│       ├── posters/             # Video reel thumbnail posters
│       └── videos/              # 9:16 short-form video reels
├── src/
│   ├── components/
│   │   ├── AmbientSunlitBackground.tsx  # Ambient mesh & golden motes canvas
│   │   ├── BrandContactModal.tsx        # Instant WhatsApp & Email brief submission
│   │   ├── CompCardAbout.tsx            # 4-look comp card + spec sheet & philosophy
│   │   ├── Footer.tsx                   # Editorial imprint & channel links
│   │   ├── Hero.tsx                     # Magazine cover hero banner & metrics
│   │   ├── LightboxModal.tsx            # Fullscreen image viewer
│   │   ├── LookbookGallery.tsx          # Filterable editorial archives
│   │   ├── MediaKitStats.tsx            # Demographics & collaboration formats
│   │   ├── Navbar.tsx                   # iPhone Dynamic Island glassy navigation
│   │   ├── ReelModal.tsx                # Interactive 9:16 video reel player
│   │   └── ReelsShowcase.tsx            # Video feed grid with category filters
│   ├── config.ts                # Creator config (handles, email, WhatsApp)
│   ├── types.ts                 # TypeScript data contracts
│   ├── App.tsx                  # Root application shell
│   ├── main.tsx                 # React entry point
│   └── index.css                # Tailwind base, Apple glass tokens, and scrollbars
├── vercel.json                  # Vercel deployment config & HTTP security headers
├── tailwind.config.js           # Design tokens & color system
├── package.json                 # Dependencies & build scripts
└── tsconfig.json                # TypeScript compiler configuration
```

---

## 🚀 Quick Start & Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates optimized production assets in `dist/`.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 🌐 Deployment to Vercel

### Option 1: Instant CLI Deploy
```bash
npx vercel
# For production:
npx vercel --prod
```

### Option 2: Continuous Deployment via GitHub
```bash
git push origin main
```
Connected to GitHub repository: [`FrontMan-01/diii_portfolio`](https://github.com/FrontMan-01/diii_portfolio).

---

## 🔒 Security & Headers

Configured in `vercel.json` with enterprise HTTP security headers:
* `X-Frame-Options: DENY` (Anti-clickjacking)
* `X-Content-Type-Options: nosniff` (Anti-MIME sniffing)
* `Referrer-Policy: strict-origin-when-cross-origin`
* `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 📱 Creator Configuration

To update creator handles, contact email, or WhatsApp dispatch number, edit `src/config.ts`:

```typescript
export const CREATOR_CONFIG = {
  name: 'Akrati',
  handle: '@akrati.creates',
  instagramUrl: 'https://instagram.com/akrati.creates',
  email: 'collaborate@akraticreates.com',
  whatsappNumber: '919876543210', // Format: CountryCode + PhoneNumber
  location: 'India / Available Worldwide',
};
```
