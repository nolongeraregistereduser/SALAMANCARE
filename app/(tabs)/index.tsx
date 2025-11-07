import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { sendAlert } from '@/services/alertService';
import { subscribeToCaregiverResponses, type CaregiverResponse } from '@/services/caregiverResponseService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';
import * as Speech from 'expo-speech';
import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Pressable, StyleSheet, Vibration, View } from 'react-native';

const { width } = Dimensions.get('window');

type AlertType = 'water' | 'bathroom' | 'pain' | 'position' | 'urgent';

interface AlertButton {
  id: AlertType;
  emoji: string;
  label: string;
  labelAr: string;
  voiceMessage: string;
  color: string;
  darkColor: string;
  urgent?: boolean;
}

const ALERT_BUTTONS: AlertButton[] = [
  {
    id: 'water',
    emoji: '💧',
    label: 'Water',
    labelAr: 'ماء',
    voiceMessage: 'Water alert sent',
    color: '#2196F3',
    darkColor: '#42A5F5',
  },
  {
    id: 'bathroom',
    emoji: '🚽',
    label: 'Bathroom',
    labelAr: 'حمام',
    voiceMessage: 'Bathroom alert sent',
    color: '#9C27B0',
    darkColor: '#AB47BC',
  },
  {
    id: 'pain',
    emoji: '💊',
    label: 'Pain',
    labelAr: 'ألم',
    voiceMessage: 'Pain alert sent',
    color: '#F44336',
    darkColor: '#EF5350',
  },
  {
    id: 'position',
    emoji: '🔄',
    label: 'Adjust Position',
    labelAr: 'تغيير الوضعية',
    voiceMessage: 'Position alert sent',
    color: '#FF9800',
    darkColor: '#FFA726',
  },
  {
    id: 'urgent',
    emoji: '🆘',
    label: 'URGENT',
    labelAr: 'طارئ',
    voiceMessage: 'Urgent alert sent',
    color: '#D32F2F',
    darkColor: '#E53935',
    urgent: true,
  },
];

export default function PatientDashboard() {
  const colorScheme = useColorScheme();
  const [sending, setSending] = useState<AlertType | null>(null);
  const [patientId, setPatientId] = useState<string>('');
  const [patientName, setPatientName] = useState<string>('Patient');
  const [caregiverResponded, setCaregiverResponded] = useState<boolean>(false);

  useEffect(() => {
    // Load patient info from storage
    loadPatientInfo();
  }, []);

  useEffect(() => {
    // Start listening for caregiver responses when we have a patient ID
    if (patientId) {
      console.log('🎧 Setting up caregiver response listener for:', patientId);
      
      const unsubscribe = subscribeToCaregiverResponses(
        patientId,
        (alertId: string, response: CaregiverResponse) => {
          console.log('✅ Caregiver responded to alert:', alertId, response);
          
          // Show visual feedback
          setCaregiverResponded(true);
          
          // Haptic feedback
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Vibration.vibrate([0, 200, 100, 200, 100, 200]); // Success pattern
          
          // Reset visual feedback after 5 seconds
          setTimeout(() => {
            setCaregiverResponded(false);
          }, 5000);
        }
      );
      
      // Cleanup listener on unmount
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }
  }, [patientId]);

  const loadPatientInfo = async () => {
    try {
      // HARDCODED PATIENT ID - MUST MATCH CAREGIVER DASHBOARD
      const PATIENT_ID = 'patient-1762505870313';
      
      const savedId = await AsyncStorage.getItem('patientId');
      const savedName = await AsyncStorage.getItem('patientName');
      
      // Always use the hardcoded patient ID for testing/demo
      // In production, this would be assigned during patient registration
      setPatientId(PATIENT_ID);
      await AsyncStorage.setItem('patientId', PATIENT_ID);
      
      if (savedName) {
        setPatientName(savedName);
      }
    } catch (error) {
      console.error('Error loading patient info:', error);
    }
  };

  const speakMessage = (message: string) => {
    Speech.speak(message, {
      language: 'en-US',
      pitch: 1.0,
      rate: 0.9,
    });
  };

  const sendPatientAlert = async (button: AlertButton) => {
    // Haptic feedback - strong for urgent, medium for others
    if (button.urgent) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Vibration.vibrate([0, 200, 100, 200]); // Pattern for urgent
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      Vibration.vibrate(100);
    }

    setSending(button.id);

    try {
      // Send alert to Firebase
      const alertId = await sendAlert(
        patientId,
        patientName,
        button.id,
        button.voiceMessage
      );

      console.log('Alert sent with ID:', alertId);

      setSending(null);

      // Success feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Voice confirmation in English
      speakMessage(button.voiceMessage);
    } catch (error) {
      setSending(null);
      console.error('Failed to send alert:', error);
      
      // Show error alert
      Alert.alert(
        'Error',
        'Failed to send alert. Please check your internet connection.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleButtonPress = (button: AlertButton) => {
    sendPatientAlert(button);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Caregiver Response Indicator - Only show when responded */}
      {caregiverResponded && (
        <View style={styles.responseIndicator}>
          <ThemedText style={styles.responseText}>
            ✅ Your caregiver is coming to help you!
          </ThemedText>
          <ThemedText style={styles.responseTextAr}>
            مقدم الرعاية قادم لمساعدتك
          </ThemedText>
        </View>
      )}

      {/* Alert Buttons Grid - 2 per row */}
      <View style={styles.gridContainer}>
        {ALERT_BUTTONS.map((button) => {
          const isActive = sending === button.id;
          const buttonColor =
            colorScheme === 'dark' ? button.darkColor : button.color;

          return (
            <Pressable
              key={button.id}
              style={({ pressed }) => [
                styles.alertButton,
                {
                  backgroundColor: buttonColor,
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: isActive ? 0.95 : 1 }],
                },
                button.urgent && styles.urgentButton,
              ]}
              onPress={() => handleButtonPress(button)}
              disabled={sending !== null}>
              <View style={styles.buttonContent}>
                {/* Emoji/Icon at the top */}
                <View style={styles.iconContainer}>
                  <ThemedText style={styles.buttonEmoji}>{button.emoji}</ThemedText>
                </View>

                {/* Spacer to push text to bottom */}
                <View style={{ flex: 1 }} />

                {/* Labels at the bottom */}
                <View style={styles.textContainer}>
                  <ThemedText
                    style={[
                      styles.buttonLabel,
                      button.urgent && styles.urgentLabel,
                    ]}
                    lightColor="#FFFFFF"
                    darkColor="#FFFFFF">
                    {button.label}
                  </ThemedText>
                  <ThemedText
                    style={styles.buttonLabelAr}
                    lightColor="#FFFFFF"
                    darkColor="#FFFFFF">
                    {button.labelAr}
                  </ThemedText>

                  {/* Sending indicator */}
                  {isActive && (
                    <ThemedText
                      style={styles.sendingText}
                      lightColor="#FFFFFF"
                      darkColor="#FFFFFF">
                      Sending...
                    </ThemedText>
                  )}
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  alertButton: {
    width: (width - 48) / 2, // 2 buttons per row with gap
    aspectRatio: 1, // Make it square
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  urgentButton: {
    borderWidth: 4,
    borderColor: '#FFEB3B',
    elevation: 10,
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  buttonContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  iconContainer: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  buttonEmoji: {
    fontSize: 64,
  },
  buttonLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonLabelAr: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '600',
  },
  urgentLabel: {
    fontSize: 24,
    letterSpacing: 2,
  },
  sendingText: {
    fontSize: 13,
    marginTop: 6,
    fontStyle: 'italic',
  },
  responseIndicator: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#10B981',
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  responseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  responseTextAr: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '600',
  },
});
