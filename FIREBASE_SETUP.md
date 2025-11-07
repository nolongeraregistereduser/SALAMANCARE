# 🔥 Firebase Real-Time Notification Setup Guide

## 📋 Overview
This guide will help you set up Firebase to enable real-time notifications between the Patient app and Caregiver app.

---

## Step 1: Create Firebase Project

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Click "Add project"**
3. **Enter project name**: `salamanka` or your preferred name
4. **Disable Google Analytics** (optional for MVP)
5. **Click "Create project"**

---

## Step 2: Register Your App

1. In Firebase Console, click the **Web icon** (</>)
2. **App nickname**: `salamanka-patient`
3. **Don't check** "Also set up Firebase Hosting"
4. **Click "Register app"**
5. **Copy the firebaseConfig object** - you'll need this!

It looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "salamanka-12345.firebaseapp.com",
  databaseURL: "https://salamanka-12345-default-rtdb.firebaseio.com",
  projectId: "salamanka-12345",
  storageBucket: "salamanka-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};
```

---

## Step 3: Enable Realtime Database

1. In Firebase Console, go to **Build > Realtime Database**
2. Click **"Create Database"**
3. **Select location**: Choose closest to Morocco (e.g., `europe-west1`)
4. **Start in test mode** (for development)
   - Click "Next"
   - Click "Enable"

### Important: Set Security Rules

In the "Rules" tab, use these rules for development:

```json
{
  "rules": {
    "alerts": {
      "$patientId": {
        ".read": true,
        ".write": true
      }
    },
    "patients": {
      "$patientId": {
        ".read": true,
        ".write": true
      }
    },
    "caregivers": {
      "$caregiverId": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

**⚠️ For production**, tighten these rules with authentication!

---

## Step 4: Configure Your App

1. **Open**: `config/firebase.ts`
2. **Replace** the `firebaseConfig` object with your values from Step 2
3. **Save the file**

Example:
```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY_FROM_FIREBASE",
  authDomain: "salamanka-xxxxx.firebaseapp.com",
  databaseURL: "https://salamanka-xxxxx-default-rtdb.firebaseio.com",
  projectId: "salamanka-xxxxx",
  storageBucket: "salamanka-xxxxx.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## Step 5: Install Dependencies

Run this command in your terminal:

```bash
npm install
```

This will install:
- `firebase` - Firebase SDK
- `expo-notifications` - Push notifications
- `expo-device` - Device info
- `@react-native-async-storage/async-storage` - Local storage

---

## Step 6: Test the Integration

### Test on Patient App:

1. Run: `npm start`
2. Open on your device with Expo Go
3. Press any alert button (e.g., Water)
4. Check the console for: `"Alert sent with ID: ..."`

### Check Firebase Console:

1. Go to **Realtime Database** in Firebase Console
2. You should see data appear like:

```
alerts/
  └── patient-xxxxxxxxx/
      └── -NxxxxXXXXXxx/
          ├── patientId: "patient-xxxxxxxxx"
          ├── patientName: "Patient"
          ├── type: "water"
          ├── message: "Water alert sent"
          ├── timestamp: 1699294800000
          └── acknowledged: false
```

---

## Step 7: Enable Push Notifications (Optional)

### For Android:
1. In Firebase Console: **Project Settings > Cloud Messaging**
2. No additional setup needed for Expo Go!

### For iOS:
1. You need Apple Developer Account ($99/year)
2. Follow Expo's guide: https://docs.expo.dev/push-notifications/push-notifications-setup/

### For Development (Easy Way):
- Use **Expo Push Notification Tool**: https://expo.dev/notifications
- Get push token from app console
- Send test notifications manually

---

## 📱 Database Structure

Your Firebase Realtime Database will look like this:

```
salamanka-db/
├── alerts/
│   └── patient-001/
│       ├── alert-id-1/
│       │   ├── type: "water"
│       │   ├── message: "Water alert sent"
│       │   ├── timestamp: 1699294800
│       │   ├── acknowledged: false
│       │   └── patientName: "Ahmed"
│       └── alert-id-2/
│           └── ...
├── patients/
│   └── patient-001/
│       ├── name: "Ahmed"
│       ├── caregiverIds: ["caregiver-001", "caregiver-002"]
│       └── settings: {...}
└── caregivers/
    └── caregiver-001/
        ├── name: "Fatima"
        ├── patientIds: ["patient-001"]
        └── pushToken: "ExponentPushToken[xxx]"
```

---

## 🔍 How It Works

### Patient App (Current):
1. User presses button (e.g., 💧 Water)
2. `sendAlert()` function is called
3. Alert is pushed to Firebase Realtime Database
4. Voice feedback plays
5. Haptic vibration

### Caregiver App (To Build):
1. Subscribes to Firebase using `subscribeToAlerts(patientId)`
2. Receives real-time updates when alerts are created
3. Shows notification
4. Displays alert in list
5. Can acknowledge alerts

---

## 🧪 Testing Without Caregiver App

You can test by watching Firebase Console:

1. Open Firebase Console > Realtime Database
2. Keep it open on your computer
3. Press buttons in Patient app
4. Watch alerts appear in real-time! ✨

---

## 🚀 Next Steps

Once Firebase is working:

1. ✅ **Patient app sends alerts** (Done!)
2. 🔲 **Build Caregiver app** to receive alerts
3. 🔲 **Add authentication** (phone/email login)
4. 🔲 **Add patient-caregiver pairing**
5. 🔲 **Add medication tracking**
6. 🔲 **Add OCR scanner**

---

## ⚠️ Common Issues

### "Permission denied" error:
- Check Firebase Rules (must allow read/write)
- Make sure Database URL is correct in config

### "Network request failed":
- Check internet connection
- Verify firebaseConfig values are correct
- Check if Realtime Database is enabled

### No alerts appearing in Firebase:
- Check console for errors
- Verify `patientId` is being set
- Check Firebase Console > Realtime Database URL

---

## 💡 Pro Tips

1. **Use Firebase Emulator** for local testing (free, no internet needed)
2. **Set up indexes** for better performance with many alerts
3. **Implement pagination** when displaying alert history
4. **Add offline persistence** with Firebase's built-in support

---

## 📞 Need Help?

**Firebase Docs**: https://firebase.google.com/docs/database
**Expo Notifications**: https://docs.expo.dev/versions/latest/sdk/notifications/
**Firebase Console**: https://console.firebase.google.com/

---

**Once you complete these steps, your Patient app will send real-time alerts to Firebase! 🎉**

The Caregiver app can then listen to these alerts and show them instantly.
