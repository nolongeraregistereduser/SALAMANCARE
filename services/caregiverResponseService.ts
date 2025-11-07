// ========== CAREGIVER RESPONSE SERVICE ==========
// Listen for caregiver responses (like "I'm Coming") and provide audio feedback

import { database } from '@/config/firebase';
import * as Speech from 'expo-speech';
import { onValue, ref } from 'firebase/database';

export interface CaregiverResponse {
  message: string;
  timestamp: number;
  acknowledged: boolean;
  caregiverAction: 'coming' | 'acknowledged';
}

/**
 * Listen for caregiver responses to patient alerts
 * Provides audio feedback when caregiver responds
 */
export const subscribeToCaregiverResponses = (
  patientId: string,
  onResponse: (alertId: string, response: CaregiverResponse) => void
) => {
  console.log('👂 Listening for caregiver responses for patient:', patientId);
  
  const alertsRef = ref(database, `alerts/${patientId}`);
  
  // Track which responses we've already announced
  const announcedResponses = new Set<string>();
  
  return onValue(alertsRef, (snapshot) => {
    const data = snapshot.val();
    
    if (data) {
      Object.keys(data).forEach((alertId) => {
        const alert = data[alertId];
        
        // Check if there's a caregiver response
        if (alert.caregiverResponse) {
          const responseKey = `${alertId}-${alert.caregiverResponse.timestamp}`;
          
          // Only announce new responses
          if (!announcedResponses.has(responseKey)) {
            announcedResponses.add(responseKey);
            
            console.log('📢 New caregiver response:', {
              alertId,
              response: alert.caregiverResponse,
            });
            
            // Play audio feedback based on response type
            playResponseFeedback(alert.caregiverResponse);
            
            // Call the callback
            onResponse(alertId, alert.caregiverResponse);
          }
        }
      });
    }
  });
};

/**
 * Play audio feedback for caregiver response
 */
const playResponseFeedback = (response: CaregiverResponse) => {
  let message = '';
  
  switch (response.caregiverAction) {
    case 'coming':
      message = 'Your caregiver is coming to help you soon. Please wait.';
      break;
    case 'acknowledged':
      message = 'Your caregiver has acknowledged your request.';
      break;
    default:
      message = response.message || 'Your caregiver has responded.';
  }
  
  console.log('🔊 Speaking message:', message);
  
  // Speak in English with clear, slow pronunciation
  Speech.speak(message, {
    language: 'en-US',
    pitch: 1.0,
    rate: 0.85, // Slightly slower for elderly patients
    volume: 1.0,
  });
  
  // Also speak in Arabic if needed (optional - you can enable this)
  // setTimeout(() => {
  //   const arabicMessage = 'مقدم الرعاية قادم لمساعدتك قريبا';
  //   Speech.speak(arabicMessage, {
  //     language: 'ar-SA',
  //     pitch: 1.0,
  //     rate: 0.85,
  //   });
  // }, 3000); // Wait 3 seconds after English message
};

/**
 * Test function to manually trigger feedback
 */
export const testCaregiverResponseFeedback = () => {
  const testResponse: CaregiverResponse = {
    message: "I'm coming!",
    timestamp: Date.now(),
    acknowledged: true,
    caregiverAction: 'coming',
  };
  
  playResponseFeedback(testResponse);
};
