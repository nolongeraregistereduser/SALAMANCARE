# 🔔 Real-Time Notification System - Quick Start

## ✅ What's Been Set Up

I've prepared your app for real-time notifications! Here's what's ready:

### 📁 Files Created:
1. **`config/firebase.ts`** - Firebase configuration
2. **`services/alertService.ts`** - Alert sending/receiving logic
3. **`FIREBASE_SETUP.md`** - Detailed setup instructions

### 📦 Dependencies Added to package.json:
- `firebase` - Firebase SDK
- `expo-notifications` - Push notifications
- `expo-device` - Device information
- `@react-native-async-storage/async-storage` - Local storage

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add project"
3. Name it "salamanka"
4. Disable Analytics (optional)
5. Click "Create"

### Step 3: Enable Realtime Database
1. In Firebase Console: **Build → Realtime Database**
2. Click **"Create Database"**
3. Choose location: **europe-west1** (closest to Morocco)
4. Start in **test mode**

### Step 4: Get Your Config
1. Click the **Web icon** (</>) in Project Overview
2. Register app name: "salamanka-patient"
3. **Copy the firebaseConfig object**
4. Open `config/firebase.ts`
5. **Replace** the placeholder values with your config

### Step 5: Update Patient Dashboard
Once Firebase is configured, uncomment this line in `app/(tabs)/index.tsx`:

```typescript
// Line ~8: Uncomment this
import { sendAlert } from '@/services/alertService';
```

And update the `sendPatientAlert` function to use Firebase (around line 112).

---

## 📱 How It Works

### Current Flow (After Setup):

```
Patient presses button
      ↓
Haptic vibration + Voice
      ↓
Send to Firebase Realtime Database
      ↓
Data stored in: alerts/patient-xxx/alert-xxx
      ↓
Caregiver app listens (real-time)
      ↓
Caregiver receives notification
```

---

## 🧪 Testing (Before Caregiver App)

### Method 1: Watch Firebase Console
1. Open Firebase Console → Realtime Database
2. Press buttons in Patient app
3. Watch data appear instantly!

### Method 2: Use Alert Service Directly

Create a test file `app/test-alerts.tsx`:

```typescript
import { useEffect } from 'react';
import { subscribeToAlerts } from '@/services/alertService';

export default function TestAlerts() {
  useEffect(() => {
    // Listen for alerts
    const unsubscribe = subscribeToAlerts('patient-001', (alerts) => {
      console.log('Received alerts:', alerts);
      // This is where caregiver app will show notifications
    });

    return () => unsubscribe();
  }, []);

  return <Text>Listening for alerts...</Text>;
}
```

---

## 🔒 Firebase Security Rules (Development)

Use these rules in Firebase Console → Database → Rules:

```json
{
  "rules": {
    "alerts": {
      ".read": true,
      ".write": true
    }
  }
}
```

⚠️ **For production**: Add authentication and proper rules!

---

## 🎯 What Happens When Button is Pressed

### With Firebase Connected:

```typescript
// User presses "Water" button
1. Haptic feedback (vibration)
2. Button shows "Sending..."
3. sendAlert() sends to Firebase:
   {
     patientId: "patient-001",
     patientName: "Patient",
     type: "water",
     message: "Water alert sent",
     timestamp: 1699294800,
     acknowledged: false
   }
4. Firebase stores in: alerts/patient-001/-NxXxXxXx
5. Voice says: "Water alert sent"
6. Success haptic
```

### Caregiver App (Future) Receives:
```typescript
// Automatic via subscribeToAlerts()
1. Firebase triggers onValue callback
2. New alert appears in list
3. Push notification sent
4. Sound plays
5. Badge count increments
```

---

## 📊 Database Structure

```
salamanka/
├── alerts/
│   └── patient-001/
│       ├── -NxXxXxXx/          // Auto-generated ID
│       │   ├── patientId: "patient-001"
│       │   ├── patientName: "Ahmed"
│       │   ├── type: "water"
│       │   ├── message: "Water alert sent"
│       │   ├── timestamp: 1699294800
│       │   └── acknowledged: false
│       └── -NyYyYyYy/
│           └── ...
├── patients/
│   └── patient-001/
│       ├── name: "Ahmed"
│       ├── caregiverIds: ["caregiver-001"]
│       └── settings: {...}
└── caregivers/
    └── caregiver-001/
        ├── name: "Fatima"
        ├── patientIds: ["patient-001"]
        └── pushToken: "ExponentPushToken[...]"
```

---

## 🛠️ Code You Need to Update

### File: `app/(tabs)/index.tsx`

**Currently (lines 112-145):**
```typescript
const sendPatientAlert = async (button: AlertButton) => {
  // ... haptic feedback ...
  
  setSending(button.id);

  try {
    // TODO: Send to Firebase
    const alertId = await sendAlert(
      patientId,
      patientName,
      button.id,
      button.voiceMessage
    );

    console.log('Alert sent with ID:', alertId);
    // ... rest of code ...
  } catch (error) {
    // Error handling
  }
};
```

**What it does:**
1. Gets `patientId` from AsyncStorage (auto-generated on first run)
2. Sends alert to Firebase
3. Returns alert ID
4. Shows success feedback

---

## 🎓 Next: Building Caregiver App

Once Patient app sends to Firebase, build Caregiver app:

### Caregiver Dashboard Structure:

```typescript
// app/caregiver-dashboard.tsx
import { subscribeToAlerts } from '@/services/alertService';

export default function CaregiverDashboard() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Subscribe to patient's alerts
    const unsubscribe = subscribeToAlerts('patient-001', (newAlerts) => {
      setAlerts(newAlerts);
      
      // Send push notification for new alerts
      if (newAlerts.length > 0 && !newAlerts[0].acknowledged) {
        sendLocalNotification(
          `${newAlerts[0].type} Alert`,
          `${newAlerts[0].patientName} needs ${newAlerts[0].type}`
        );
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <View>
      {alerts.map(alert => (
        <AlertCard key={alert.id} alert={alert} />
      ))}
    </View>
  );
}
```

---

## ⚡ Quick Test Checklist

After setup, verify:

- [ ] `npm install` completed successfully
- [ ] Firebase project created
- [ ] Realtime Database enabled
- [ ] Config updated in `config/firebase.ts`
- [ ] App runs without errors
- [ ] Press Water button
- [ ] Check console: "Alert sent with ID: ..."
- [ ] Check Firebase Console: Data appears
- [ ] Voice feedback works
- [ ] Haptic feedback works

---

## 🐛 Troubleshooting

### Error: "Cannot find module 'firebase/app'"
**Fix**: Run `npm install`

### Error: "Permission denied"
**Fix**: Check Firebase Rules - must allow `.write: true`

### Error: "Network request failed"
**Fix**: 
1. Check internet connection
2. Verify Firebase config is correct
3. Check Database URL

### No data in Firebase
**Fix**:
1. Check console for errors
2. Verify `patientId` is set
3. Make sure Database is enabled (not just Firestore)

---

## 📞 Support

- **Firebase Docs**: https://firebase.google.com/docs/database
- **Expo Notifications**: https://docs.expo.dev/push-notifications/
- **Firebase Console**: https://console.firebase.google.com/

---

## 🎉 You're Ready!

Once you complete the 5 steps above:

✅ Patient app will send real-time alerts to Firebase
✅ Data will be stored in cloud (accessible from anywhere)
✅ Ready to build Caregiver app
✅ Foundation for medication tracking
✅ Scalable for multiple patients/caregivers

**The hardest part is done - just configure Firebase and test! 🚀**
