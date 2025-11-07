# 🔔 Salamanka Notification System

## ✨ Features Implemented

### 1. **Notification Bell Icon**
- ✅ Added next to settings icon in the dashboard header
- ✅ Shows red badge with unread count
- ✅ Badge animates with pop effect when new notifications arrive
- ✅ Click to open notification panel

### 2. **Push Notification Popup**
- ✅ Appears at top of screen for 5-6 seconds
- ✅ Shows emoji, alert type, message, and timestamp
- ✅ Urgent alerts (🆘) get special red styling and shake animation
- ✅ Urgent alerts stay for 6 seconds, normal alerts for 5 seconds
- ✅ Auto-dismisses after timeout
- ✅ Plays notification sound

### 3. **Notification Panel**
- ✅ Slides in from right when bell is clicked
- ✅ Shows all notifications in chronological order
- ✅ Color-coded by alert type
- ✅ Shows read/unread status
- ✅ "Mark All as Read" button
- ✅ "Clear All" button with confirmation
- ✅ Close button to dismiss panel

### 4. **Notification Features**
- ✅ Real-time badge counter updates
- ✅ Persistent storage (stays after refresh)
- ✅ Time ago display (Just now, 5m ago, 2h ago, etc.)
- ✅ Click notification to mark as read
- ✅ Visual indicators for urgent alerts
- ✅ Empty state when no notifications

---

## 🎨 Visual Design

### Alert Types & Colors
| Type | Emoji | Color | Label |
|------|-------|-------|-------|
| Water | 💧 | Blue (#2196F3) | Water Request |
| Bathroom | 🚽 | Purple (#9C27B0) | Bathroom Assistance |
| Pain | 💊 | Red (#F44336) | Pain Alert |
| Position | 🔄 | Orange (#FF9800) | Position Adjustment |
| Urgent | 🆘 | Dark Red (#D32F2F) | URGENT ALERT |

### States
- **Unread**: Light blue background, bold border
- **Read**: Gray, semi-transparent
- **Urgent**: Red background, pulsing animation

---

## 🚀 How to Use

### Testing Without Firebase (Demo Mode)

1. **Open Dashboard**
   ```
   Open index.html in your browser
   ```

2. **Simulate Alerts**
   You can test notifications using the browser console:
   ```javascript
   // Test water alert
   simulateAlert('water');
   
   // Test urgent alert
   simulateAlert('urgent');
   
   // Test bathroom alert
   simulateAlert('bathroom');
   ```

3. **Or Use Test Page**
   ```
   Open test-notifications.html
   Click the buttons to send alerts
   ```

### Auto-Test Mode (Development)
Uncomment this code in index.html (line ~3470) to auto-generate alerts every 10 seconds:
```javascript
setTimeout(() => {
    const types = ['water', 'bathroom', 'pain', 'position', 'urgent'];
    let index = 0;
    setInterval(() => {
        simulateAlert(types[index % types.length]);
        index++;
    }, 10000); // Every 10 seconds
}, 3000); // Start after 3 seconds
```

---

## 🔥 Firebase Integration

### Step 1: Add Firebase Script to index.html

Add this **BEFORE** the closing `</body>` tag:

```html
<!-- Firebase Notification Integration -->
<script type="module" src="firebase-notifications.js"></script>
</body>
</html>
```

### Step 2: Connect to Patient

The Firebase script adds a connection UI automatically. Or you can connect manually:

```javascript
// Connect to a patient
connectToPatient('patient-1730918392847');
```

### Step 3: Receive Real-Time Alerts

Once connected, alerts from the React Native patient app will:
1. ✅ Appear as push notifications (5-6 seconds)
2. ✅ Play notification sound
3. ✅ Update the badge counter
4. ✅ Be stored in the notification panel
5. ✅ Auto-mark as shown (won't appear twice)

---

## 📱 Integration with React Native Patient App

Your React Native app is already sending alerts to Firebase. The notification system will automatically receive them when connected to the same patient ID.

### Patient App sends:
```javascript
await sendAlert(
  patientId,        // e.g., "patient-1730918392847"
  patientName,      // e.g., "John Doe"
  'water',          // alert type
  'Water alert sent' // message
);
```

### Caregiver Dashboard receives:
```javascript
{
  id: "-NxxxXxxx",
  type: "water",
  message: "Water alert sent",
  patientName: "John Doe",
  timestamp: 1730918392847
}
```

---

## 🎯 User Flow

### When Patient Presses Button:
1. Patient presses "Water" button in mobile app
2. Alert sent to Firebase Realtime Database
3. **Caregiver dashboard receives alert**
4. **Push notification appears at top (5 seconds)**
5. **Sound plays** 🔊
6. **Badge counter increases** (e.g., 1 → 2)
7. Push notification auto-dismisses
8. Alert appears in notification panel

### When Caregiver Opens Notifications:
1. Click bell icon
2. Panel slides in from right
3. See all alerts (newest first)
4. Unread alerts highlighted
5. Click "Mark All as Read"
6. Badge clears
7. Close panel

---

## 🛠️ Customization

### Change Notification Duration
In `showPushNotification()` function:
```javascript
// Currently: 5s normal, 6s urgent
setTimeout(() => {
    pushNotif.classList.remove('show');
}, isUrgent ? 6000 : 5000);

// Change to: 8s normal, 10s urgent
setTimeout(() => {
    pushNotif.classList.remove('show');
}, isUrgent ? 10000 : 8000);
```

### Change Notification Sound
In `playNotificationSound()` function:
```javascript
// Change frequency (higher = higher pitch)
oscillator.frequency.value = 1200; // Default: 800

// Change volume (0.0 to 1.0)
gainNode.gain.setValueAtTime(0.5, audioContext.currentTime); // Default: 0.3
```

### Add Custom Alert Type
```javascript
const alertConfig = {
    // ... existing types
    food: { 
        emoji: '🍽️', 
        color: '#4CAF50', 
        label: 'Food Request' 
    }
};
```

---

## 📊 API Reference

### Main Functions

#### `addNotification(alert)`
Add a new notification manually
```javascript
addNotification({
    id: 'unique-id',
    type: 'water',
    message: 'Patient needs water',
    patientName: 'John Doe',
    timestamp: Date.now()
});
```

#### `toggleNotificationPanel()`
Open/close the notification panel
```javascript
toggleNotificationPanel();
```

#### `markAllAsRead()`
Mark all notifications as read
```javascript
markAllAsRead();
```

#### `clearAllNotifications()`
Clear all notifications (with confirmation)
```javascript
clearAllNotifications();
```

#### `simulateAlert(type)`
Simulate an alert for testing (development only)
```javascript
simulateAlert('urgent'); // Test urgent alert
```

---

## 🐛 Troubleshooting

### Notifications Not Appearing?
1. Check browser console for errors
2. Verify Firebase connection (see firebase-notifications.js)
3. Ensure patient ID is correct
4. Check Firebase Database rules (must allow read/write)

### Badge Not Updating?
1. Check `updateNotificationBadge()` is being called
2. Verify `unreadCount` variable
3. Check if `.show` class is applied

### Sound Not Playing?
1. Check browser audio permissions
2. User must interact with page first (browser security)
3. Try clicking anywhere on page first

### Push Notification Stuck?
1. Check timeout values (should auto-dismiss)
2. Manually remove `.show` class if stuck
3. Refresh page

---

## 📝 Code Structure

### New CSS Classes (Lines 441-721)
- `.notification-bell-button` - Bell icon styling
- `.notification-badge` - Red badge counter
- `.push-notification` - Popup at top
- `.notification-panel` - Slide-in panel
- `.notification-item` - Individual notification card

### New HTML Elements (Lines 2576-2627)
- `#pushNotification` - Popup component
- `#notificationPanel` - Full-screen panel
- `#notificationBadge` - Badge counter
- `#notificationList` - Notification list container

### New JavaScript (Lines 3474-3680)
- Notification store and state management
- Push notification display logic
- Panel rendering and interactions
- Firebase integration hooks
- Time formatting utilities

---

## ✅ Testing Checklist

- [ ] Bell icon appears next to settings
- [ ] Badge shows/hides correctly
- [ ] Push notification appears at top
- [ ] Notification auto-dismisses after 5-6 seconds
- [ ] Sound plays when notification arrives
- [ ] Urgent alerts are red and shake
- [ ] Panel opens when clicking bell
- [ ] All notifications display in panel
- [ ] Read/unread states work
- [ ] "Mark All as Read" clears badge
- [ ] "Clear All" removes notifications
- [ ] Time ago displays correctly
- [ ] Firebase integration receives real alerts

---

## 🎉 What's New

### Added to Your Dashboard:
1. ✅ Notification bell icon with badge
2. ✅ Push notification popup system
3. ✅ Full notification panel
4. ✅ Sound effects
5. ✅ Firebase integration ready
6. ✅ Test utilities

### Files Created:
1. `firebase-notifications.js` - Firebase integration
2. `test-notifications.html` - Testing interface
3. `NOTIFICATION_SYSTEM.md` - This documentation

### Files Modified:
1. `index.html` - Added notification UI and logic (NO old code touched!)

---

## 🚀 Next Steps

1. **Test the System**
   - Open index.html
   - Use browser console: `simulateAlert('water')`
   - Verify notifications appear

2. **Connect Firebase**
   - Add firebase-notifications.js script
   - Connect with patient ID
   - Test with real React Native app

3. **Customize**
   - Adjust colors, sounds, timing
   - Add more alert types
   - Enhance UI/UX

4. **Production**
   - Remove test/simulation code
   - Add error handling
   - Implement analytics

---

## 📞 Support

If you need help:
1. Check browser console for errors
2. Review this documentation
3. Test with `test-notifications.html`
4. Verify Firebase configuration

---

**🎊 Your notification system is ready! Test it now by opening index.html and running `simulateAlert('urgent')` in the console!**
