# 🌌 Interactive Developer Portfolio

A state-of-the-art, premium, and highly responsive interactive developer portfolio built with **React**, **Vite**, and **Vanilla CSS**. Designed for maximum visual impact, it combines sleek dark-mode aesthetics, custom micro-animations, mathematical branching graphics, and intuitive navigation timelines.

---

## 🎨 Immersive & Interactive Features

### 1. 🔀 Symmetrical Scroll-Synced Journey Line
- Multi-threaded scrolling journey lines fall down from the header along **both the left (3–12%) and right (88–97%) margins** of the screen.
- As the user scrolls, the lines dynamically reveal themselves to map the user's progress through the portfolio.
- **Organic Branching Physics**: Features mathematical momentum projection, generating dimmer, fading deviation branches that split off in random directions and gracefully fade away over time.
- **Marginal Band Constraints**: Capped within 20% of the viewport margins, preventing any text or content overlap to maintain optimal readability.

### 2. 🎛️ Navigation Timeline Menu
- The standard text menu has been replaced with a stylized, custom navigation timeline.
- Interactive SVG timeline nodes correspond to page sections: `MD.`, `Career`, `Projects`, and `Hobbies`.
- **Node Animations**: Clicking a node smoothly animates a node burst indicator and navigates directly to the corresponding section.
- **Consistent Branding**: The core `MD.` identity is pinned in bright, glowing white (`#ffffff`).

### 3. 🌀 White Rotating Mandala & Starfield
- An eye-catching, responsive particle **Starfield** floats smoothly in the background, interacting gently with mouse movements.
- Behind the hero information, a rotating mathematical **Mandala Iris SVG** is drawn in premium white monochrome, rendering a sleek futuristic vibe.

### 4. 🗂️ Interactive 3D Card Tilt
- Projects are presented as premium glassmorphic cards.
- Moving the mouse over a card triggers a **3D perspective tilt animation** using dynamic mathematical transforms (`perspective(800px) rotateX(...) rotateY(...) translateY(...)`).

### 5. 📄 Expandable Accordion Resume
- Integrates a responsive, smooth accordion resume directly underneath the career timeline.
- Includes formatted bullet points for professional roles (such as internships at **State Street** and **Tech Mahindra**), education, publications, and skills, with a direct PDF download link.

---

## 🚀 Technical Stack

- **Core**: React 18, JavaScript (ES6+), HTML5
- **Build Tool**: Vite (Lightning fast bundling and HMR)
- **Styling**: Vanilla CSS (CSS Variables, keyframe animations, glassmorphism filters, grid & flex layouts)
- **Mathematical Effects**: Canvas-based particle rendering and dynamic inline SVG path generation

---

## 📂 Directory Structure

```text
Portfolio/
├── public/                 # Static assets (PDF resumes, public icons)
├── src/
│   ├── assets/             # Project assets
│   ├── components/         # Core interactive UI components
│   │   ├── NavBar.jsx          # Header navigation bar wrapper
│   │   ├── NavTimeline.jsx     # Active navigation timeline nodes
│   │   ├── HorizontalTimeline.jsx # Symmetrical scroll-synced journey lines
│   │   ├── HeroSection.jsx     # Landing hero with social links and rotating iris
│   │   ├── CareerSection.jsx   # Timeline of roles & technologies
│   │   ├── ProjectsSection.jsx # 3D tilt project grid
│   │   ├── HobbiesSection.jsx  # Hobbies & MUN sections with transition badges
│   │   ├── ResumeExpand.jsx    # Smooth accordion resume view
│   │   └── StarField.jsx       # Floating background particle canvas
│   ├── context/            # Global context (active section & window metrics)
│   │   └── AppContext.jsx
│   ├── data/               # Unified data exports
│   │   ├── cvData.js           # Professional career & project content
│   │   └── timelineData.js     # Colors, paths & ordering keys
│   ├── styles/             # Shared styling sheets
│   ├── App.jsx             # Root layout shell
│   ├── index.css           # Global typography and design system variables
│   └── main.jsx            # React mounting entry point
├── package.json            # NPM dependencies and scripts
└── vite.config.js          # Vite configuration
```

---

## 💻 Setup & Local Development

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application with hot module replacement (HMR).

### 3. Build for Production
To bundle the application in optimized static assets under the `dist/` directory:
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
