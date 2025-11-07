import { database } from '@/config/firebase';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { onValue, push, ref, set } from 'firebase/database';
import { Platform } from 'react-native';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface Alert {
  id?: string;
  patientId: string;
  patientName: string;
  type: 'water' | 'bathroom' | 'pain' | 'position' | 'urgent';
  message: string;
  timestamp: any;
  acknowledged: boolean;
  acknowledgedAt?: any;
  acknowledgedBy?: string;
}

/**
 * Send an alert from patient to caregivers
 */
export const sendAlert = async (
  patientId: string,
  patientName: string,
  alertType: 'water' | 'bathroom' | 'pain' | 'position' | 'urgent',
  message: string
): Promise<string> => {
  try {
    console.log('Sending alert to Firebase...', { patientId, alertType });
    
    // Create alert object
    const alert: Alert = {
      patientId,
      patientName,
      type: alertType,
      message,
      timestamp: Date.now(), // Use timestamp instead of serverTimestamp for now
      acknowledged: false,
    };

    // Push to Firebase Realtime Database
    const alertsRef = ref(database, `alerts/${patientId}`);
    const newAlertRef = push(alertsRef);
    
    console.log('Writing to path:', `alerts/${patientId}/${newAlertRef.key}`);
    await set(newAlertRef, alert);

    console.log('Alert sent successfully:', newAlertRef.key);
    return newAlertRef.key!;
  } catch (error) {
    console.error('Error sending alert:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw error;
  }
};

/**
 * Listen for alerts for a specific patient
 * Used by caregiver app to receive real-time alerts
 */
export const subscribeToAlerts = (
  patientId: string,
  callback: (alerts: Alert[]) => void
) => {
  const alertsRef = ref(database, `alerts/${patientId}`);
  
  return onValue(alertsRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      const alertsArray: Alert[] = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      
      // Sort by timestamp (newest first)
      alertsArray.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      
      callback(alertsArray);
    } else {
      callback([]);
    }
  });
};

/**
 * Register device for push notifications
 */
export const registerForPushNotifications = async (): Promise<string | null> => {
  if (!Device.isDevice) {
    console.log('Must use physical device for push notifications');
    return null;
  }

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return null;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push notification token:', token);

    // Configure for Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  } catch (error) {
    console.error('Error getting push token:', error);
    return null;
  }
};

/**
 * Send local notification (for testing)
 */
export const sendLocalNotification = async (
  title: string,
  body: string,
  data?: any
) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data,
      sound: true,
    },
    trigger: null, // Send immediately
  });
};
