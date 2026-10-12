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

- **Senior-Citizen-Centric Accessibility:**
  - High-contrast Red/Orange/White palette with clear readability
  - Text size toggle: Normal, Large, and Extra Large font modes
  - High-contrast display mode
  - Large click areas, simple forms, and no confusing technical jargon
  - 100% SVG icon-based visual layout (zero stock photos/images)

- **Scam Detection & Reporting:**
  - **Check Scam:** Rule-based instant checker for suspicious phone numbers, links/URLs, and message texts with risk scores and warning signs.
  - **Report Scam:** Guided step-by-step reporting form with scam type selection, incident details, and evidence attachment.
  - **Emergency Help:** Direct one-tap buttons for National Cyber Crime Helpline (**1930**) and Police Emergency (**112**).
  - **My Reports:** User dashboard to track status updates on submitted incident reports.

- **Multilingual Support:**
  - Built-in centralized translation dictionary supporting:
    - English
    - मराठी (Marathi)
    - हिंदी (Hindi)

- **Backend & Security:**
  - Powered by Supabase Auth and PostgreSQL
  - Row Level Security (RLS) guaranteeing users only view their own reports
  - Role-based Admin Dashboard for reviewing reports and maintaining threat indicators
  - Graceful offline/demo mode support with `localStorage`

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
