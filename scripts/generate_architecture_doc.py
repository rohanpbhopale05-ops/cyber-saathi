import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

project_dir = r"C:\Users\Rohan Bhopale\Downloads\Cyber Saathi"
img_path = os.path.join(project_dir, "cyber_saathi_architecture.png")
docx_path = os.path.join(project_dir, "Cyber_Saathi_Architecture_Diagram.docx")

# 1. Generate High-Res Architecture Diagram Image using Matplotlib
fig, ax = plt.subplots(figsize=(14, 10), dpi=300)
ax.set_xlim(0, 14)
ax.set_ylim(0, 10)
ax.axis('off')

# Background
fig.patch.set_facecolor('#FFFFFF')
ax.set_facecolor('#FFFFFF')

# Color Palette (Deep Red, Red, Orange, Light Orange, Off-white)
c_deep_red = '#B91C1C'
c_red = '#DC2626'
c_orange = '#F97316'
c_light_orange = '#FFF7ED'
c_soft_red = '#FEF2F2'
c_card_border = '#E5E7EB'
c_text_dark = '#1F2937'

# Title Header
ax.text(7, 9.6, "CYBER SAATHI – SYSTEM ARCHITECTURE DIAGRAM", 
        ha='center', va='center', fontsize=18, fontweight='bold', color=c_deep_red)
ax.text(7, 9.25, "Senior Citizen Cyber Safety & Scam Reporting Portal | PVGCOE Nashik (SPPU)", 
        ha='center', va='center', fontsize=11, color='#4B5563', style='italic')

def draw_box(x, y, w, h, bg_color, border_color, title, items, title_color=c_deep_red):
    # Rounded rectangle box
    rect = patches.FancyBboxPatch((x, y), w, h,
                                  boxstyle="round,pad=0.1,rounding_size=0.15",
                                  linewidth=1.8, edgecolor=border_color, facecolor=bg_color)
    ax.add_patch(rect)
    # Title
    ax.text(x + w/2, y + h - 0.28, title, ha='center', va='center', 
            fontsize=11.5, fontweight='bold', color=title_color)
    
    # Items
    y_text = y + h - 0.65
    for item in items:
        ax.text(x + 0.25, y_text, f"• {item}", ha='left', va='center', 
                fontsize=9.2, color=c_text_dark)
        y_text -= 0.32

# TIER 1: USER / CLIENT TIER (y: 7.4 - 8.9)
tier1_rect = patches.FancyBboxPatch((0.5, 7.3), 13, 1.6,
                                  boxstyle="round,pad=0.08,rounding_size=0.15",
                                  linewidth=1.2, edgecolor=c_orange, facecolor=c_light_orange)
ax.add_patch(tier1_rect)
ax.text(0.7, 8.65, "1. CLIENT & ACCESSIBILITY TIER", fontsize=11, fontweight='bold', color=c_orange)

draw_box(0.8, 7.45, 3.8, 1.05, '#FFFFFF', '#FDBA74', "Target Users & Devices", 
         ["Senior Citizens & Citizens", "Admin Officers", "Responsive (Mobile, Tablet, Desktop)"])

draw_box(4.9, 7.45, 4.2, 1.05, '#FFFFFF', '#FDBA74', "Senior Accessibility Suite", 
         ["Text Sizing (Normal / Large / XL)", "High-Contrast Display Mode", "Web Speech Audio (Read Aloud)"])

draw_box(9.4, 7.45, 3.8, 1.05, '#FFFFFF', '#FDBA74', "Multilingual Engine", 
         ["English", "Marathi & Hindi Support", "Centralized Translation Dict"])

# DOWN ARROW 1
ax.annotate("", xy=(7, 6.75), xytext=(7, 7.3),
            arrowprops=dict(facecolor=c_deep_red, edgecolor=c_deep_red, width=2.5, headwidth=9))

# TIER 2: FRONTEND PRESENTATION TIER (y: 4.6 - 6.7)
tier2_rect = patches.FancyBboxPatch((0.5, 4.4), 13, 2.3,
                                  boxstyle="round,pad=0.08,rounding_size=0.15",
                                  linewidth=1.2, edgecolor=c_deep_red, facecolor=c_soft_red)
ax.add_patch(tier2_rect)
ax.text(0.7, 6.45, "2. FRONTEND PRESENTATION TIER (React 18 + Vite)", fontsize=11, fontweight='bold', color=c_deep_red)

draw_box(0.8, 4.55, 3.8, 1.65, '#FFFFFF', '#FCA5A5', "Public Safety Modules", 
         ["Home.jsx (Action Cards & Scams)", "CheckScam.jsx (3 Checkers)", "CyberSafety.jsx (10 Topics)", "EmergencyHelp.jsx (1930 / 112)"])

draw_box(4.9, 4.55, 4.2, 1.65, '#FFFFFF', '#FCA5A5', "Scam Reporting Wizard", 
         ["4-Step Progressive Wizard", "Interactive Scam Types Grid", "Screenshot & Evidence Preview", "Unique Report ID Generator"])

draw_box(9.4, 4.55, 3.8, 1.65, '#FFFFFF', '#FCA5A5', "Dashboard & Admin Modules", 
         ["MyReports.jsx (Status Tracking)", "AdminDashboard.jsx (Triage)", "Role Guard (Admin Check)", "Login.jsx (Auth & Demo Switch)"])

# DOWN ARROW 2
ax.annotate("", xy=(7, 3.85), xytext=(7, 4.4),
            arrowprops=dict(facecolor=c_deep_red, edgecolor=c_deep_red, width=2.5, headwidth=9))

# TIER 3: BUSINESS LOGIC & CONTEXT TIER (y: 2.2 - 3.8)
tier3_rect = patches.FancyBboxPatch((0.5, 2.2), 13, 1.6,
                                  boxstyle="round,pad=0.08,rounding_size=0.15",
                                  linewidth=1.2, edgecolor=c_orange, facecolor=c_light_orange)
ax.add_patch(tier3_rect)
ax.text(0.7, 3.55, "3. APPLICATION LOGIC & STATE MANAGEMENT", fontsize=11, fontweight='bold', color=c_orange)

draw_box(0.8, 2.35, 3.8, 1.05, '#FFFFFF', '#FDBA74', "State & Context Layer", 
         ["AuthContext (JWT & Role Sync)", "LanguageContext (Global t())", "HTML5 File & Preview API"])

draw_box(4.9, 2.35, 4.2, 1.05, '#FFFFFF', '#FDBA74', "Rule-Based Scam Detector", 
         ["Phone Prefix & Format Check", "Suspicious URL Regex Parser", "Keyword Urgency/OTP Analysis"])

draw_box(9.4, 2.35, 3.8, 1.05, '#FFFFFF', '#FDBA74', "Dual-Mode Adapter", 
         ["Offline localStorage Fallback", "Live Supabase Cloud Client", "Automatic Failover Support"])

# DOWN ARROW 3
ax.annotate("", xy=(7, 1.65), xytext=(7, 2.2),
            arrowprops=dict(facecolor=c_deep_red, edgecolor=c_deep_red, width=2.5, headwidth=9))

# TIER 4: DATABASE & CLOUD BACKEND TIER (y: 0.2 - 1.6)
tier4_rect = patches.FancyBboxPatch((0.5, 0.2), 13, 1.4,
                                  boxstyle="round,pad=0.08,rounding_size=0.15",
                                  linewidth=1.2, edgecolor=c_deep_red, facecolor=c_soft_red)
ax.add_patch(tier4_rect)
ax.text(0.7, 1.35, "4. BACKEND & DATABASE TIER (Supabase / PostgreSQL)", fontsize=11, fontweight='bold', color=c_deep_red)

draw_box(0.8, 0.3, 3.8, 0.95, '#FFFFFF', '#FCA5A5', "Supabase Authentication", 
         ["User Signup & Session Token", "Encrypted Password Vault", "Role Trigger (profiles table)"])

draw_box(4.9, 0.3, 4.2, 0.95, '#FFFFFF', '#FCA5A5', "PostgreSQL Tables & Schema", 
         ["profiles | reports | suspicious_urls", "suspicious_numbers | safety_articles", "Audit Timestamps & Foreign Keys"])

draw_box(9.4, 0.3, 3.8, 0.95, '#FFFFFF', '#FCA5A5', "Security & Access Control", 
         ["Row Level Security (RLS)", "Users only view own reports", "Admin-only Triage Privileges"])

plt.tight_layout()
plt.savefig(img_path, format='png', bbox_inches='tight', dpi=300)
plt.close()
print("Generated high-res architecture diagram image successfully.")

# 2. Build the Word Document (.docx)
doc = Document()

# Page Margins
sections = doc.sections
for s in sections:
    s.top_margin = Inches(0.8)
    s.bottom_margin = Inches(0.8)
    s.left_margin = Inches(0.8)
    s.right_margin = Inches(0.8)

def set_cell_background(cell, hex_color):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{hex_color}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'''
        <w:tcMar {nsdecls("w")}>
            <w:top w:w="{top}" w:type="dxa"/>
            <w:bottom w:w="{bottom}" w:type="dxa"/>
            <w:left w:w="{left}" w:type="dxa"/>
            <w:right w:w="{right}" w:type="dxa"/>
        </w:tcMar>
    ''')
    tcPr.append(tcMar)

# Title Header
p_title = doc.add_paragraph()
p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
run_title = p_title.add_run("CYBER SAATHI")
run_title.font.name = "Arial"
run_title.font.size = Pt(24)
run_title.font.bold = True
run_title.font.color.rgb = RGBColor(185, 28, 28) # Deep Red

p_sub = doc.add_paragraph()
p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
run_sub = p_sub.add_run("Senior Citizen Cyber Safety & Scam Reporting Portal\nSystem Architecture & Technical Design Document")
run_sub.font.name = "Arial"
run_sub.font.size = Pt(13)
run_sub.font.bold = True
run_sub.font.color.rgb = RGBColor(249, 115, 22) # Orange

# Meta Info Box
tbl_meta = doc.add_table(rows=1, cols=1)
tbl_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
c_meta = tbl_meta.cell(0, 0)
set_cell_background(c_meta, "FFF7ED")
set_cell_margins(c_meta, 120, 120, 180, 180)
p_meta = c_meta.paragraphs[0]
p_meta.add_run("College: ").bold = True
p_meta.add_run("PVG's College of Engineering and Technology, Nashik\n")
p_meta.add_run("Department: ").bold = True
p_meta.add_run("Department of Information Technology | Savitribai Phule Pune University (SPPU)\n")
p_meta.add_run("Project Team: ").bold = True
p_meta.add_run("Rohan Bhopale (Team Leader), Swayam Adik, Sakshi Badgujar, Yash Bhamare\n")
p_meta.add_run("Repository: ").bold = True
p_meta.add_run("https://github.com/rohanpbhopale05-ops/cyber-saathi")

doc.add_paragraph() # Spacing

# SECTION 1: Embedded Architecture Diagram
h1 = doc.add_heading("1. High-Resolution System Architecture Diagram", level=1)
h1.runs[0].font.color.rgb = RGBColor(185, 28, 28)

p_img = doc.add_paragraph()
p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
doc.add_picture(img_path, width=Inches(6.8))

p_caption = doc.add_paragraph()
p_caption.alignment = WD_ALIGN_PARAGRAPH.CENTER
run_cap = p_caption.add_run("Figure 1.1: End-to-End 4-Tier Architecture Diagram for Cyber Saathi Portal")
run_cap.font.size = Pt(10)
run_cap.font.italic = True
run_cap.font.color.rgb = RGBColor(100, 116, 139)

doc.add_page_break()

# SECTION 2: Native Word-Drawn Architecture (Boxes & Tables editable in Word)
h2 = doc.add_heading("2. Native Word Architecture Diagram (Editable Layout)", level=1)
h2.runs[0].font.color.rgb = RGBColor(185, 28, 28)

p_intro = doc.add_paragraph()
p_intro.add_run("This diagram is constructed directly using native Microsoft Word table blocks so that you can easily edit text, resize blocks, or copy them into your final project seminar report.")

# Tier 1 Table
t1 = doc.add_table(rows=2, cols=3)
t1.alignment = WD_TABLE_ALIGNMENT.CENTER
t1_header = t1.cell(0, 0)
t1_header.merge(t1.cell(0, 2))
set_cell_background(t1_header, "B91C1C")
set_cell_margins(t1_header, 100, 100, 150, 150)
p_t1h = t1_header.paragraphs[0]
r = p_t1h.add_run("TIER 1: USER & ACCESSIBILITY LAYER (Clients & Inputs)")
r.font.bold = True
r.font.color.rgb = RGBColor(255, 255, 255)

cells_t1 = [
    ("Target Users & Devices", ["• Senior Citizens & General Public", "• Cyber Safety Admins / Police", "• Responsive Web (Mobile, Tablet, PC)"]),
    ("Senior Accessibility Suite", ["• Normal / Large / Extra-Large Text", "• High Contrast Display Mode", "• Web Speech API (Read Aloud)"]),
    ("Multilingual Localization", ["• English Interface", "• मराठी (Marathi Localization)", "• हिंदी (Hindi Localization)"])
]
for idx, (title, items) in enumerate(cells_t1):
    c = t1.cell(1, idx)
    set_cell_background(c, "FFF7ED")
    set_cell_margins(c, 120, 120, 150, 150)
    p = c.paragraphs[0]
    r_t = p.add_run(f"{title}\n")
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(185, 28, 28)
    for it in items:
        p.add_run(f"{it}\n")

# Connector Arrow
p_arr1 = doc.add_paragraph()
p_arr1.alignment = WD_ALIGN_PARAGRAPH.CENTER
r_arr1 = p_arr1.add_run("▼  HTTP(S) / User Actions / Voice Output  ▼")
r_arr1.font.bold = True
r_arr1.font.color.rgb = RGBColor(249, 115, 22)

# Tier 2 Table
t2 = doc.add_table(rows=2, cols=3)
t2.alignment = WD_TABLE_ALIGNMENT.CENTER
t2_header = t2.cell(0, 0)
t2_header.merge(t2.cell(0, 2))
set_cell_background(t2_header, "DC2626")
set_cell_margins(t2_header, 100, 100, 150, 150)
p_t2h = t2_header.paragraphs[0]
r2 = p_t2h.add_run("TIER 2: FRONTEND PRESENTATION LAYER (React 18 + Vite)")
r2.font.bold = True
r2.font.color.rgb = RGBColor(255, 255, 255)

cells_t2 = [
    ("Public Information Modules", ["• Home.jsx (Action Cards & Scams)", "• CheckScam.jsx (Phone/URL/Msg)", "• CyberSafety.jsx (10 Safety Tips)", "• EmergencyHelp.jsx (1930 / 112)"]),
    ("Scam Reporting Wizard", ["• Step 1: Select Scam Category", "• Step 2: Specific Incident Data", "• Step 3: Evidence/Screenshot Upload", "• Step 4: Submission & CS-ID Generation"]),
    ("Dashboard & Authentication", ["• MyReports.jsx (Report Tracking)", "• AdminDashboard.jsx (Triage Console)", "• Login.jsx (Auth & Signup)", "• Role-Based Access Control"])
]
for idx, (title, items) in enumerate(cells_t2):
    c = t2.cell(1, idx)
    set_cell_background(c, "FEF2F2")
    set_cell_margins(c, 120, 120, 150, 150)
    p = c.paragraphs[0]
    r_t = p.add_run(f"{title}\n")
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(185, 28, 28)
    for it in items:
        p.add_run(f"{it}\n")

# Connector Arrow
p_arr2 = doc.add_paragraph()
p_arr2.alignment = WD_ALIGN_PARAGRAPH.CENTER
r_arr2 = p_arr2.add_run("▼  React Context State / Client Engine  ▼")
r_arr2.font.bold = True
r_arr2.font.color.rgb = RGBColor(249, 115, 22)

# Tier 3 Table
t3 = doc.add_table(rows=2, cols=3)
t3.alignment = WD_TABLE_ALIGNMENT.CENTER
t3_header = t3.cell(0, 0)
t3_header.merge(t3.cell(0, 2))
set_cell_background(t3_header, "EA580C")
set_cell_margins(t3_header, 100, 100, 150, 150)
p_t3h = t3_header.paragraphs[0]
r3 = p_t3h.add_run("TIER 3: CLIENT APPLICATION LOGIC & UTILITIES")
r3.font.bold = True
r3.font.color.rgb = RGBColor(255, 255, 255)

cells_t3 = [
    ("Context Providers", ["• AuthContext.jsx (Session & Roles)", "• LanguageContext.jsx (i18n)", "• SpeechSynthesis Web Audio API"]),
    ("Rule-Based Detector", ["• Regex pattern parser for URLs", "• Suspicious phone prefix detector", "• Message urgency & OTP analyzer"]),
    ("Failover Storage Adapter", ["• Supabase Cloud API Client", "• LocalStorage Offline Buffer", "• Real File API & Image Previewer"])
]
for idx, (title, items) in enumerate(cells_t3):
    c = t3.cell(1, idx)
    set_cell_background(c, "FFF7ED")
    set_cell_margins(c, 120, 120, 150, 150)
    p = c.paragraphs[0]
    r_t = p.add_run(f"{title}\n")
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(185, 28, 28)
    for it in items:
        p.add_run(f"{it}\n")

# Connector Arrow
p_arr3 = doc.add_paragraph()
p_arr3.alignment = WD_ALIGN_PARAGRAPH.CENTER
r_arr3 = p_arr3.add_run("▼  Secure HTTPS API / JWT Authentication / PostgreSQL  ▼")
r_arr3.font.bold = True
r_arr3.font.color.rgb = RGBColor(249, 115, 22)

# Tier 4 Table
t4 = doc.add_table(rows=2, cols=3)
t4.alignment = WD_TABLE_ALIGNMENT.CENTER
t4_header = t4.cell(0, 0)
t4_header.merge(t4.cell(0, 2))
set_cell_background(t4_header, "991B1B")
set_cell_margins(t4_header, 100, 100, 150, 150)
p_t4h = t4_header.paragraphs[0]
r4 = p_t4h.add_run("TIER 4: BACKEND & DATABASE STORAGE (Supabase Cloud Tier)")
r4.font.bold = True
r4.font.color.rgb = RGBColor(255, 255, 255)

cells_t4 = [
    ("Supabase Auth & Roles", ["• Email/Password Signup & Login", "• Role Assignment ('user' / 'admin')", "• Trigger: on_auth_user_created"]),
    ("PostgreSQL Database", ["• profiles (user profile & role)", "• reports (complaints & evidence)", "• suspicious_numbers & urls"]),
    ("Security & Row-Level Rules", ["• RLS Policy: Users view own reports", "• Admin-only status modification", "• Immutable Audit timestamps"])
]
for idx, (title, items) in enumerate(cells_t4):
    c = t4.cell(1, idx)
    set_cell_background(c, "FEF2F2")
    set_cell_margins(c, 120, 120, 150, 150)
    p = c.paragraphs[0]
    r_t = p.add_run(f"{title}\n")
    r_t.font.bold = True
    r_t.font.color.rgb = RGBColor(185, 28, 28)
    for it in items:
        p.add_run(f"{it}\n")

doc.add_page_break()

# SECTION 3: Detailed Technical Description for Academic Submission
h3 = doc.add_heading("3. Detailed Tier Breakdown for Project Report", level=1)
h3.runs[0].font.color.rgb = RGBColor(185, 28, 28)

tiers_data = [
    ("Tier 1: Client & Accessibility Layer", [
        ("Accessibility Controls", "Provides font scaling ('Normal', 'Large', 'Extra Large') and a high-contrast mode specifically tailored for elderly users with impaired vision."),
        ("Web Speech Synthesis", "Features an interactive 'READ ALOUD' audio button allowing senior citizens to listen to safety guidelines spoken aloud."),
        ("Multilingual Dictionary", "Implements centralized localization dictionary supporting English, Marathi, and Hindi dynamically.")
    ]),
    ("Tier 2: Frontend Presentation Layer (React 18 & Vite)", [
        ("Scam Reporting Wizard", "Breaks down crime reporting into 4 gentle steps: Scam Selection, Specific Details, Real Evidence/Screenshot Attachment with thumbnail preview, and Confirmation."),
        ("Real-Time Scam Checker", "Provides an intuitive 3-tab scanner for Phone numbers, URLs, and Message text."),
        ("Emergency Hotline Hub", "Features prominent, high-contrast one-tap dial buttons for National Cyber Crime Helpline (1930) and Police Emergency (112)."),
        ("Role-Guarded Dashboards", "Provides regular users with a personal 'My Reports' tracking timeline, and administrators with an authorized triage portal.")
    ]),
    ("Tier 3: Application Logic & State Adapter", [
        ("Rule-Based Detection Engine", "Employs rule-based regex patterns for detecting OTP urgency, KYC suspension threats, and suspicious domain patterns."),
        ("Failover Dual-Mode Architecture", "Allows the application to run smoothly in offline/demo mode via localStorage while automatically syncing with Supabase when configured.")
    ]),
    ("Tier 4: Backend Database & Security Layer (Supabase PostgreSQL)", [
        ("Authentication & Security", "Secured via Supabase Auth (JWT tokens) with automated trigger profiles."),
        ("Row Level Security (RLS)", "Strict database-level policies prevent unauthorized cross-tenant data access, ensuring senior citizens' private reports are strictly private.")
    ])
]

for tier_title, subsections in tiers_data:
    h_sub = doc.add_heading(tier_title, level=2)
    h_sub.runs[0].font.color.rgb = RGBColor(249, 115, 22)
    for sub_name, sub_desc in subsections:
        p = doc.add_paragraph()
        p.add_run(f"• {sub_name}: ").bold = True
        p.add_run(sub_desc)

doc.save(docx_path)
print(f"Generated Word Document (.docx) successfully at {docx_path}")
