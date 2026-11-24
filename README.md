# Online Loan Application Portal (ZeTheta)
> Production-grade 8-step enterprise loan onboarding and credit underwriting application built on the **ZeTheta** design system and **TrustCore** platform architecture.
> **Official Project Specification:** [specs/493560A_Front-End-Developer_Multi_Step_Loan_Application_Form.pdf](specs/493560A_Front-End-Developer_Multi_Step_Loan_Application_Form.pdf)

---

## 🛡️ Enterprise Design System & Typography

This platform implements the complete **ZeTheta** ([https://www.trustspheretechnologies.com/](https://www.trustspheretechnologies.com/)) frontend design language:

- **Typography**:
  - **Headings & Titles**: `'Lora', serif` (Weights: 500, 600, 700) — authoritative, board-ready, and editorial.
  - **Body, Inputs & Numbers**: `'Work Sans', sans-serif` (Weights: 400, 500, 600, 700) — crisp modern legibility.
- **Color Palette**:
  - **Obsidian Dark Surfaces**: `#090302` to `#0F0503` base charcoal, `#180806` card panels, `#201008` elevated surfaces.
  - **Gold Accents**: Core Gold `#B8860B`, Light Gold `#D4A020`, Borders `rgba(184, 134, 11, 0.22)`.
  - **Rust Red Primary**: Core Rust `#C0392B`, Button Gradient `linear-gradient(135deg, #B83A26 0%, #A3301F 50%, #7E2814 100%)`.
  - **Royal Blue**: `#2655C5` with `#5B8BF0` high-tech accent highlights.
  - **Text Colors**: Warm Cream `#F0E8DC` for primary text and headings, Muted Bronze `#B3A18A` for body text.
- **Components**:
  - ZeTheta navigation bar with metallic shield logo and wordmark.
  - Animated `.section-tag` badge with glowing amber pulse indicator: `• ENTERPRISE DIGITAL LENDING · VERIFIED KYC & RISK ENGINE`.
  - Pathway step numerical watermarks (`01`, `02`, `03`...).
  - Glassmorphic dark card panels with gold border glow and high-contrast form controls.

---

## 📋 Deliverables & Specification Compliance Matrix

Adhering strictly to the official ZeTheta specification document `493560A_Front-End-Developer_Multi_Step_Loan_Application_Form.pdf`:

| Deliverable Part | Status | Technical Implementation Details |
|---|:---:|---|
| **Step 1: Loan Type & Terms** | **Completed** | Dynamic selection across `PERSONAL`, `HOME`, and `BUSINESS` loan categories with live interest and limits. |
| **Step 2: Personal & Demographics** | **Completed** | Full legal name, DOB age-gate validation (>=18 yrs), gender, marital status, phone, and email. |
| **Step 3: Identity Verification (KYC)** | **Completed** | Real-time PAN (NSDL regex + checksum) and Aadhaar (12-digit Verhoeff algorithm simulation) with live status badges. |
| **Step 4: Smart Address Resolution** | **Completed** | Street address, residence ownership, and postal PIN code auto-lookup populating City and State. |
| **Step 5: Employment & Financial Profile** | **Completed** | Salaried vs. Self-Employed branching, employer name, net monthly income, existing EMIs, and business GSTIN audit. |
| **Step 6: Conditional Parameters** | **Completed** | Dynamic conditional field isolation: Personal loan purpose, Home loan property valuation & RERA ID, Business vintage & industry sector. |
| **Step 7: Document Upload & E-Signature** | **Completed** | Drag-and-drop file upload with client-side compression below 500KB + HTML5 canvas e-signature pad with legally compliant stroke capture. |
| **Step 8: Pre-Approval & Key Fact Statement** | **Completed** | Real-time Underwriting Engine calculating FOIR (Fixed Obligation to Income Ratio), Tier-1 CIBIL telemetry, exact monthly EMI, and instant sanction offer. |
| **State Persistence & Error Recovery** | **Completed** | Automatic encrypted draft persistence to `LocalStorage` every 30 seconds with seamless session restoration on browser refresh. |
| **Automated E2E Test Suite** | **Completed** | 14 comprehensive user journeys in `e2e_test.py` validated using Playwright with a **100% pass rate**. |

---

## 🏛️ System Architecture

```
[Borrower Input Stream] ────────► [Input Normalization & Masking Engine]
                                                │
                                                ▼
                                    [Step-Level Validation Machine]
                                                │
                     ┌──────────────────────────┼──────────────────────────┐
                     ▼                          ▼                          ▼
           [KYC Token Verification]    [Postal PIN Autocomplete]   [Canvas E-Signature]
           (NSDL PAN / UIDAI Aadhaar)  (City/State Boundary)       (Vector Stroke Capture)
                     │                          │                          │
                     └──────────────────────────┼──────────────────────────┘
                                                ▼
                                 [LocalStorage State Vault]
                                                │
                                                ▼
                                 [Financial Underwriting Engine]
                                                │
                                 ┌──────────────┴──────────────┐
                                 ▼                             ▼
                          [EMI Computation]           [FOIR & CIBIL Bureau]
                          (Compound Amortization)     (Debt-to-Income Tiering)
                                 │                             │
                                 └──────────────┬──────────────┘
                                                ▼
                                [Key Fact Statement (KFS) Offer]
                                 • Sanction Amount: ₹7.50L - ₹45.00L
                                 • Risk-Adjusted Interest: 8.35% - 12.00%
                                 • RBI Digital Lending Guidelines (2022)
```

---

## 🧪 Automated Verification & Testing

The repository includes a comprehensive 14-journey end-to-end automated testing suite written in Playwright (`e2e_test.py`):

```bash
# Run all 14 automated user journeys headlessly
python3 e2e_test.py
```

### Verified Test Journeys
- **Journey 1:** Initial portal layout & Step 1 category selection.
- **Journey 2:** Step 1 validation & progression to Step 2.
- **Journey 3:** Form validation boundary checks preventing empty field progression.
- **Journey 4:** Step 2 demographic submission & format validation.
- **Journey 5:** Real-time PAN (NSDL) & Aadhaar (UIDAI) verification.
- **Journey 6:** Postal PIN code autocomplete populating City and State.
- **Journey 7:** Financial income profile and FOIR calculation checks.
- **Journey 8:** Conditional field rendering isolating Personal Loan parameters.
- **Journey 9:** Document upload compression preview & digital signature canvas stroke verification.
- **Journey 10:** Underwriting engine calculation for Personal Loan (₹8,00,000 at ₹26,002/mo).
- **Journey 11:** Home Loan conditional journey, RERA validation & 8.35% underwriting.
- **Journey 12:** Business Loan conditional journey, vintage & commercial sector verification.
- **Journey 13:** LocalStorage draft persistence & seamless session restoration.
- **Journey 14:** Navigation state machine integrity, back/forward history, & final sanction generation.

---

## 📜 Regulatory & Legal Compliance

- **RBI Digital Lending Guidelines (September 2022)**: Key Fact Statement (KFS) generated before any loan agreement execution.
- **Digital Personal Data Protection (DPDP) Act 2023**: Purpose limitation, minimal data collection, explicit user consent checkboxes.
- **Information Technology Act, 2000 & Section 65B**: Digitally captured electronic signature format for evidential admissibility.
- **WCAG 2.1 AA Compliant**: Accessible color contrast, keyboard navigable form controls, and screen-reader accessible labels.

---

## 📄 Repository Structure

```
├── specs/
│   └── 493560A_Front-End-Developer_Multi_Step_Loan_Application_Form.pdf  # Official ZeTheta Requirement Document
├── index.html                  # ZeTheta 8-Step Loan Application Portal
├── styles.css                  # ZeTheta Design System CSS (Lora + Work Sans, Obsidian Theme)
├── app.js                      # 8-Step Form State Machine, Validation Engine & Underwriting Logic
├── e2e_test.py                 # Playwright 14-Journey Automated E2E Test Suite
├── project_1a_submission.tex   # Formal Executive Submission & Engineering Report
└── README.md                   # Project Documentation & Architecture
```

---
*Engineered by **Tejas H R** on the **ZeTheta** platform architecture.*
