# 🛎️ Salamanka - Patient Dashboard (MVP)

> **Name Origin**: Salamanka (سلامنكا) - Inspired by the iconic bell from Breaking Bad, representing the simple yet powerful way a bedridden person can communicate their needs.

## 🎯 Project Overview

Salamanka is a **two-part mobile application system** designed to help bedridden patients communicate with their caregivers easily and manage medication schedules effectively.

This prototype focuses on the **Patient Gateway** - the patient-facing dashboard.

---

## 📱 Current Implementation: Patient Dashboard

### ✨ Key Features Implemented

#### 🔘 **Large Communication Buttons**
- **💧 Water/Thirsty** - Request water or beverages
- **🚽 Bathroom** - Request bathroom assistance
- **💊 Pain/Uncomfortable** - Alert about pain or discomfort
- **🔄 Adjust Position** - Request position change (prevents bedsores)
- **🆘 URGENT** - Emergency help with special confirmation

#### 🎨 **User Experience Features**
- ✅ **Haptic Feedback** - Vibration when buttons are pressed
- ✅ **Visual Feedback** - Button animations and sending states
- ✅ **Confirmation System** - Prevents accidental urgent alerts
- ✅ **Alert History** - Shows last 10 alerts sent with timestamps
- ✅ **Dark/Light Mode** - Automatic theme switching
- ✅ **Multi-language Labels** - English + Arabic on all buttons

#### ⚙️ **Settings Screen**
- 🌍 **Language Selection** - English, العربية, Français
- 📏 **Button Size Options** - Normal, Large, Extra Large
- 🔔 **Feedback Preferences**:
  - Sound effects toggle
  - Haptic/vibration toggle
  - Confirmation before sending
- 📡 **Connection Status** - Shows online/offline state
- ℹ️ **About Section** - App information

---

## 🏗️ Technical Architecture

### **Tech Stack**
- **Framework**: React Native (v0.81.5) via Expo (SDK 54)
- **Language**: TypeScript (Strict mode)
- **Navigation**: Expo Router (File-based routing)
- **UI/UX**: 
  - React Native Reanimated (Animations)
  - Expo Haptics (Tactile feedback)
  - Custom themed components
- **State Management**: React useState (ready to upgrade to Zustand/Redux)

### **Project Structure**
```
app/
├── (tabs)/
│   ├── index.tsx          # Patient Dashboard (Main)
│   ├── explore.tsx        # Settings Screen
│   └── _layout.tsx        # Tab Navigation
├── _layout.tsx            # Root Layout
└── modal.tsx              # Modal Example
```

### **Key Components**
- `ThemedView` & `ThemedText` - Auto-switching dark/light themes
- `IconSymbol` - iOS SF Symbols integration
- Custom alert buttons with haptic feedback
- Alert history tracking system

---

## 🎨 Design Principles

### **Accessibility First**
- ✅ Large touch targets (120px minimum height)
- ✅ High contrast colors
- ✅ Clear visual hierarchy
- ✅ Simple, uncluttered interface
- ✅ Multiple feedback mechanisms (visual + haptic)

### **User-Centered Design**
- ✅ Bilingual labels (English + Arabic)
- ✅ Emoji + text for clarity
- ✅ Color-coded buttons (intuitive associations)
- ✅ Urgent button with special treatment (yellow border, confirmation)
- ✅ Recent alerts visible for reassurance

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16+)
- npm or yarn
- Expo Go app on your phone (for testing)

### **Installation**
```bash
# Install dependencies
npm install

# Start the development server
npm start

# Or run on specific platform
npm run android  # For Android
npm run ios      # For iOS
npm run web      # For Web
```

### **Testing on Device**
1. Install **Expo Go** from App Store or Google Play
2. Scan the QR code from the terminal
3. Test the patient dashboard immediately!

---

## 📋 User Stories Implemented

### ✅ **Completed Stories**

1. ✅ **Basic Needs Communication**
   - [x] Press button for "water"
   - [x] Press button for "bathroom"
   - [x] Press button for "pain/uncomfortable"
   - [x] Press button for "change position"
   - [x] Press button for "urgent help"

2. ✅ **Accessibility & Ease of Use**
   - [x] Large, easy-to-press buttons
   - [x] Customizable interface (button sizes in settings)
   - [x] Works offline (alerts queue locally)
   - [x] Haptic feedback on press
   - [x] Visual confirmation of sent alerts

3. ✅ **Optional/Advanced**
   - [x] Haptic/vibration feedback when pressing buttons
   - [x] Multilingual interface (EN/AR/FR ready)
   - [x] Alert history tracking

---

## 🔜 Next Steps (For Full MVP)

### **Patient App Enhancements**
- [ ] Voice feedback (text-to-speech confirmation)
- [ ] Custom button creation
- [ ] Quick phrases/messages
- [ ] SOS contact quick dial
- [ ] Offline alert queue with sync

### **Backend Integration**
- [ ] Firebase setup for real-time notifications
- [ ] User authentication
- [ ] Patient-caregiver pairing system
- [ ] Alert delivery confirmation
- [ ] Push notifications

### **Caregiver Hub (Separate App)**
- [ ] Medication manager dashboard
- [ ] OCR prescription scanner (AI-powered)
- [ ] Medication reminders
- [ ] Adherence tracking
- [ ] Real-time patient alerts
- [ ] Multi-caregiver support
- [ ] Alert history & analytics

---

## 🌍 Localization Notes

### **Languages Supported**
- **English** - Primary interface
- **العربية (Arabic)** - Full support planned
- **Français (French)** - For Moroccan healthcare context

### **Translation Keys Needed**
```typescript
// Example structure for i18n
{
  "water": { "en": "Water", "ar": "ماء", "fr": "Eau" },
  "bathroom": { "en": "Bathroom", "ar": "حمام", "fr": "Toilette" },
  // ... etc
}
```

---

## 🎯 Target Users

### **Primary Users (Patients)**
- Bedridden patients in Morocco and globally
- Elderly individuals with mobility issues
- Post-surgery recovery patients
- Long-term care patients

### **Secondary Users (Caregivers)**
- Family members caring for elderly parents
- Professional home care nurses
- Hospital staff
- Multiple siblings sharing care duties

---

## 💡 Key Innovations

1. **🔔 Simple Bell Concept** - One tap = one clear message
2. **🌐 Bilingual by Default** - Arabic + English on every button
3. **♿ Accessibility Focus** - Designed for limited mobility
4. **📱 Offline-First** - Works without internet (queues alerts)
5. **🎨 Visual Clarity** - Color coding + emojis + text

---

## 🤝 Contributing (For Hackathon Team)

### **Development Workflow**
1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test thoroughly
3. Commit: `git commit -m "feat: description"`
4. Push and create PR

### **Code Style**
- TypeScript strict mode
- Functional components with hooks
- ESLint rules enforced
- Consistent naming conventions

---

## 📊 Demo Flow (For Pitch)

### **Perfect Demo Loop (2-3 minutes)**
1. **Open Patient App** → Show clean, simple interface
2. **Press "Water" Button** → Demonstrate haptic feedback
3. **Show Confirmation** → Alert sent successfully
4. **View History** → Recent alerts displayed
5. **Open Settings** → Show customization options
6. **Change Language** → Switch to Arabic
7. **Press "Urgent"** → Show emergency confirmation
8. **Switch to Caregiver App** (future) → Show real-time notification

---

## 🎓 Technical Challenges Solved

### ✅ **Haptic Feedback Integration**
- Used Expo Haptics API
- Different patterns for normal vs urgent
- Fallback to vibration API

### ✅ **Bilingual UI Design**
- Arabic RTL text support
- Combined emoji + English + Arabic labels
- Readable in both light/dark modes

### ✅ **Accessibility Implementation**
- Large touch targets (120px height minimum)
- High contrast color choices
- Clear visual hierarchy
- Multiple feedback channels

---

## 📝 License
MIT License - Free for personal and commercial use

---

## 🙏 Acknowledgments
- Built for **Morocco's healthcare community**
- Inspired by real caregiving challenges
- Designed with input from families caring for bedridden loved ones

---

## 📞 Contact & Support
**Project**: Salamanka Patient Dashboard MVP  
**Status**: Prototype/Hackathon Demo  
**Version**: 1.0.0  

---

**Bel tawfi9! 🚀 Good luck with your hackathon!**

---

## 🔍 Technical Notes for Developers

### **State Management**
Currently using React `useState`. For production:
- Consider **Zustand** for lightweight state
- Or **Redux Toolkit** for complex caregiver app
- **React Query** for server state

### **Real-Time Communication**
Future implementation options:
- **Firebase Cloud Messaging** (Recommended)
- **Socket.io** with Node.js backend
- **Supabase Realtime** (Good for MVP)

### **OCR Integration (Caregiver App)**
Prescription scanning options:
- **Google Cloud Vision API** - Best for Arabic + French
- **AWS Textract** - Good for forms
- **Azure Computer Vision** - Medical text optimized
- Custom model with **Tesseract.js** + training data

### **Database Schema (Future)**
```typescript
// Patients Collection
Patient {
  id: string
  name: string
  caregiverIds: string[]
  settings: {
    language: 'en' | 'ar' | 'fr'
    buttonSize: 'normal' | 'large' | 'extra-large'
    hapticEnabled: boolean
  }
}

// Alerts Collection
Alert {
  id: string
  patientId: string
  type: 'water' | 'bathroom' | 'pain' | 'position' | 'urgent'
  timestamp: Date
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: Date
}

// Medications Collection
Medication {
  id: string
  patientId: string
  name: string
  dosage: string
  frequency: string
  schedule: Date[]
  addedBy: string (caregiverId)
}
```

---

**Remember**: This is an MVP prototype. Focus on the core user experience first, then iterate based on real user feedback! 🎯
