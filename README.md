# 🛎️ SALAMANCARE — Caregiver ↔ Patient MVP

[![Status: Prototype](https://img.shields.io/badge/status-prototype-yellow)](https://github.com/nolongeraregistereduser/SALAMANCARE)
[![Expo](https://img.shields.io/badge/Framework-Expo-blue)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/lang-TypeScript-blueviolet)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/license-MIT-lightgrey)](LICENSE)

A lightweight MVP that connects caregivers with patients (especially immobile/bedridden patients) through a simple, accessible mobile-first experience. SALAMANCARE focuses on quick alerts, medication coordination, and a caregiver hub for managing patient needs.

Why this exists
- Provide a single-tap, low-friction way for patients with limited mobility to request help or notify caregivers.
- Give caregivers a compact dashboard to receive alerts, manage medications, and track adherence.
- Build an MVP that is bilingual-ready, accessible, and offline-friendly.

---

Table of contents
- Project overview
- Key features (Patient + Caregiver)
- Tech stack & MVP architecture
- App workflow & user roles
- Installation & setup
- Roadmap / future improvements
- Contributing & license
- Contact

---

Project overview & value proposition
- SALAMANCARE reduces friction between patients and caregivers: one-tap alerts, medication reminders, and quick patient status access.
- The MVP prioritizes core interactions: send alert, receive alert, manage medications.
- Built for contexts with intermittent connectivity — designed to queue alerts and sync when online.

Key features

- For Patients (mobile-focused)
  - One-tap bell for help (configurable quick actions)
  - Pre-filled quick messages and customizable buttons
  - Bilingual UI support (Arabic / English)
  - Offline-first queueing of alerts
  - Large, accessible UI for limited mobility

- For Caregivers (mobile / web optimized)
  - Real-time alert stream (MVP via Firebase Realtime DB)
  - Medication manager and schedules
  - Alert acknowledgement and history
  - OCR prescription scanner (planned — MVP notes included)
  - Multi-caregiver support (assign & accept tasks)

Tech stack & MVP architecture

- Frontend
  - React Native (Expo) — file-based routing (Expo Router)
  - TypeScript (strict mode)
  - React Native Reanimated, Expo Haptics for UX polish
- Backend (MVP)
  - Firebase Realtime Database for real-time alerts
  - (Optional) Firebase Authentication for user accounts
  - Push notifications via Firebase Cloud Messaging or Expo Push
- Local/Dev tooling
  - ESLint + Prettier, npm, Node.js
  - Scripts to reset starter content (scripts/reset-project.js)
- Data flow (MVP)
  - Patient app → writes alert to Realtime DB → caregiver app listens & receives alert
  - Offline alerts stored locally and synced to DB when connected

App workflow & user roles

- Roles
  - Patient (primary): limited-config UI, sends alerts, views confirmation.
  - Caregiver (secondary): receives alerts, acknowledges, manages medications.
  - Admin (future): invite managers, view analytics, patient assignments.

- MVP flow
  1. Patient taps bell button (or quick action).
  2. Client writes an alert entry to Firebase RTDB with patient id, timestamp, alert type.
  3. Caregiver clients listening to the patient channel receive the alert instantly.
  4. Caregiver acknowledges the alert; optional actions (call, message, mark resolved).
  5. Medication events are authored on caregiver side and shown to patient (reminders).

Installation & local setup (developer-friendly)

Prereqs
- Node 18+ (or LTS), npm or yarn
- Expo CLI (global optional)
- A Firebase project (Realtime Database + optional Auth)

Quickstart
1. Clone
   ```bash
   git clone https://github.com/nolongeraregistereduser/SALAMANCARE.git
   cd SALAMANCARE
   ```

2. Install deps
   ```bash
   npm install
   # or
   yarn
   ```

3. Configure Firebase
   - Create a Firebase project at https://console.firebase.google.com/
   - Add a Web app and copy the firebaseConfig values.
   - Do NOT commit secrets. Use environment variables or a .env file.
   - Update config/firebase.ts or load from env (recommended).

   Example (local .env) — do NOT commit:
   ```
   FIREBASE_API_KEY=...
   FIREBASE_PROJECT_ID=...
   FIREBASE_DATABASE_URL=https://<your-db>.firebaseio.com
   ```

4. Start the app
   ```bash
   npx expo start
   ```
   - Open in Expo Go, simulator, or a development build.

Developer notes
- Project uses file-based routing under the app/ directory (Expo Router).
- Reset starter content:
  ```bash
  npm run reset-project
  ```
  This script moves starter code to app-example and creates a fresh app/ scaffold.

Security & secrets
- Remove committed API secrets from git history (rotate keys if needed).
- Use environment variables with a safe store (Expo secrets, .env + react-native-dotenv, or CI secrets) for production.


Roadmap & future improvements

Short-term (to complete MVP)
- [ ] Auth & secure patient-caregiver pairing
- [ ] Push notifications (FCM / Expo Push)
- [ ] Offline sync queue & conflict resolution
- [ ] Caregiver web view optimized for mobile

Mid-term
- [ ] OCR prescription scanner (Google Vision / Tesseract)
- [ ] Medication adherence analytics & history
- [ ] Multi-language expansion beyond Arabic/English
- [ ] Audit trail & delivery confirmation for alerts

Long-term / Vision
- [ ] Marketplace for verified caregivers
- [ ] Telehealth integrations (video calls)
- [ ] Machine-assisted triage and recommendation engine

Contributing
- Create a branch: git checkout -b feature/<name>
- Commit with clear messages: feat|fix|chore: short description
- Open PR against main and include screenshots or short demo video
- Keep tasks small and focused for faster reviews

Notes & acknowledgements
- The repository contains SALAMANKA_README.md with additional technical notes and implementation ideas — keep that as developer documentation if you want to retain deeper technical decisions.
- Be mindful of privacy & data laws for health-related data (GDPR-like protections, local regulations).

License
- MIT — see LICENSE file.

Contact
- Project owner: nolongeraregistereduser && Team (Dedicace l drraari lwa3rin @A77MED @L7CSSEN @BADR @NABIL
- EMAIL ME FOR HELP!

Thank you for building a product with a clear user-first mission — accessibility and simplicity for vulnerable users matter. If you want, I can:
- open a PR replacing README.md with this file,
- add screenshot placeholders to the repo,
- or generate a short project demo GIF to include in the README.
