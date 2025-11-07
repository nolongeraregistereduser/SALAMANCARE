// ========== FIREBASE NOTIFICATION INTEGRATION ==========
// Add this script AFTER the main script in your index.html
// Place this right before </body>:
// <script type="module" src="firebase-notifications.js"></script>

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js';

// Firebase Configuration (SAME AS YOUR REACT NATIVE APP)
const firebaseConfig = {
    apiKey: "AIzaSyAH9lTSqN7SFWL3c1Fgdfx6PTCZBL4ZfJQ",
    authDomain: "salamanka-325ea.firebaseapp.com",
    databaseURL: "https://salamanka-325ea-default-rtdb.firebaseio.com",
    projectId: "salamanka-325ea",
    storageBucket: "salamanka-325ea.firebasestorage.app",
    messagingSenderId: "106470044567",
    appId: "1:106470044567:web:dee513af6399cb5bc18ad2",
    measurementId: "G-LY8662JGKH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Expose database and ref to global scope for caregiver response function
window.firebaseDatabase = database;
window.firebaseRef = ref;

// Track which alerts we've already shown
let shownAlerts = new Set();

// Connect to patient and listen for alerts
window.connectToPatient = function(patientId) {
    console.log('🔌 Connecting to patient:', patientId);
    
    const alertsRef = ref(database, `alerts/${patientId}`);
    
    // Listen for real-time changes
    onValue(alertsRef, (snapshot) => {
        const data = snapshot.val();
        console.log('📊 Firebase data received:', data);
        
        if (data) {
            Object.keys(data).forEach(alertId => {
                const alert = data[alertId];
                
                // Only show new, unacknowledged alerts that we haven't shown before
                if (!alert.acknowledged && !shownAlerts.has(alertId)) {
                    console.log('🔔 New alert:', alertId, alert);
                    
                    // Mark as shown
                    shownAlerts.add(alertId);
                    
                    // Add to notification system
                    if (typeof window.addNotification === 'function') {
                        window.addNotification({
                            id: alertId,
                            type: alert.type,
                            message: alert.message,
                            patientName: alert.patientName,
                            timestamp: alert.timestamp
                        });
                    }
                }
            });
        }
    }, (error) => {
        console.error('❌ Firebase error:', error);
    });
    
    // Save connection
    localStorage.setItem('connected_patient_id', patientId);
};

// Auto-connect on page load
window.addEventListener('load', () => {
    // Hardcoded connection for Patient 1762505870313
    const patientId = 'patient-1762505870313';
    console.log('📱 Auto-connecting to patient:', patientId);
    window.connectToPatient(patientId);
    
    // Save to localStorage for persistence
    localStorage.setItem('connected_patient_id', patientId);
});

// Connection UI removed - auto-connects to patient-1762505870313 on page load

console.log('🚀 Firebase Notification System Ready!');
