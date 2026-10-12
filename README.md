# Cyber Saathi – Senior Citizen Cyber Safety & Scam Reporting Portal

A simple, accessible cyber-safety and scam reporting web portal designed especially for senior citizens.

---

## 🏛️ Academic Details
- **Institution:** PVG's College of Engineering and Technology, Nashik
- **Department:** Department of Information Technology
- **Course:** Second Year Engineering (SE IT) - Project Based Learning / CEP
- **Affiliation:** Savitribai Phule Pune University (SPPU)

### 👥 Project Team
- **Rohan Bhopale** – Team Leader
- **Swayam Adik** – Team Member
- **Sakshi Badgujar** – Team Member
- **Yash Bhamare** – Team Member

---

## 🛡️ Key Features

- **🌐 Futuristic Cybersecurity Motion & Visual Design:**
  - **Cinematic Animated Background Engine:** Canvas-powered circuit board traces with traveling photon pulses (warm red/orange on left, electric blue/cyan on right), slow camera parallax movement, floating glowing binary digits (`0`/`1`), breathing digital padlock aura, concentric ripples, and periodic light sweeps.
  - **Ultra-Translucent Glassmorphism (~90% Transparency):** High-definition backdrop blur (`20px`), specular top-border refraction highlights, and uniform `.glass-icon-box` containers allowing the cybersecurity background to shine vividly through all cards, tables, and forms.
  - **Intelligent Auto-Hide Header on Scroll:** Automatically slides out on downward scroll (`translateY(-125%)`) and slides in smoothly on upward scroll with zero layout shifts or click blocking.

- **👵 Senior-Citizen-Centric Accessibility:**
  - **Root Text Size Scaling:** Dynamic font sizing (`Normal` → `Large 118%` → `Extra Large 138%`) with root synchronization that scales all `rem` units across every page, persistent across sessions via `localStorage`.
  - **High-Contrast Display Mode:** Pure high-contrast black mode with high-legibility neon borders.
  - **Read-Aloud Voice Assistant:** Web Speech API integration that speaks safety guidelines aloud.
  - **Multilingual Support:** Instant toggling between English, मराठी (Marathi), and हिंदी (Hindi).
  - Large click areas, simple step-by-step reporting, and zero confusing technical jargon.

- **🔍 Scam Detection & Incident Reporting:**
  - **Check Scam:** Real-time threat scanner with rule-based heuristics for phone numbers, suspicious links/URLs, and message texts with threat scores and actionable guidance.
  - **Report a Scam:** Guided 4-step wizard with 8 categorized cyber scam tiles (UPI fraud, KYC trap, fake calls, etc.), incident timeline, evidence uploads, and encrypted Report ID generation.
  - **Emergency Help:** Direct one-tap helplines for National Cyber Crime Helpline (**1930**) and National Police Emergency (**112**).
  - **My Reports Dashboard:** Citizen portal to track investigation status (Submitted, Under Review, Investigating, Resolved).
  - **Threat Intelligence Admin Console:** Admin dashboard with threat blocklists, report auditing, status updates, and metric cards.

- **🔒 Backend & Security Architecture:**
  - Powered by Supabase (PostgreSQL, Supabase Auth, Row Level Security policies).
  - Graceful fallback with offline `localStorage` demo mode when Supabase credentials are not configured.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rohanpbhopale05-ops/cyber-saathi.git
   cd cyber-saathi
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Database Setup (Optional for Full Backend Mode):**
   Run the SQL statements in `supabase_schema.sql` inside your Supabase SQL Editor.

5. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

6. **Automatic GitHub Push (Optional):**
   To automatically commit and push any changes you make to GitHub on save:
   ```bash
   npm run auto-push
   ```
   *(Or simply double-click `auto-push.bat` on Windows)*

---

## 🛠️ Technology Stack
- **Frontend:** React 18, Vite
- **Icons:** Lucide React
- **Routing:** React Router v6
- **Database & Auth:** Supabase (PostgreSQL, Supabase Auth, Row Level Security)
- **Styling:** Modern CSS with subtle glassmorphism and accessibility variables
