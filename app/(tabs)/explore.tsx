import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch } from 'react-native';

type Language = 'en' | 'ar' | 'fr';
type ButtonSize = 'normal' | 'large' | 'extra-large';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const [language, setLanguage] = useState<Language>('en');
  const [buttonSize, setButtonSize] = useState<ButtonSize>('large');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [confirmBeforeSend, setConfirmBeforeSend] = useState(false);

  const languages: { id: Language; label: string; flag: string }[] = [
    { id: 'en', label: 'English', flag: '🇬🇧' },
    { id: 'ar', label: 'العربية', flag: '🇲🇦' },
    { id: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  const sizes: { id: ButtonSize; label: string; description: string }[] = [
    { id: 'normal', label: 'Normal', description: 'Standard button size' },
    { id: 'large', label: 'Large', description: 'Easy to press (Recommended)' },
    { id: 'extra-large', label: 'Extra Large', description: 'Maximum accessibility' },
  ];

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            ⚙️ Settings
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Customize your Salamanka experience
          </ThemedText>
        </ThemedView>

        {/* Language Selection */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🌍 Language / اللغة
          </ThemedText>
          <ThemedView style={styles.optionsContainer}>
            {languages.map((lang) => (
              <Pressable
                key={lang.id}
                style={[
                  styles.optionButton,
                  language === lang.id && styles.selectedOption,
                ]}
                onPress={() => setLanguage(lang.id)}>
                <ThemedText style={styles.optionEmoji}>{lang.flag}</ThemedText>
                <ThemedText
                  style={[
                    styles.optionLabel,
                    language === lang.id && styles.selectedLabel,
                  ]}>
                  {lang.label}
                </ThemedText>
                {language === lang.id && (
                  <IconSymbol
                    size={20}
                    name="checkmark.circle.fill"
                    color="#4CAF50"
                  />
                )}
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Button Size */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📏 Button Size
          </ThemedText>
          <ThemedView style={styles.optionsContainer}>
            {sizes.map((size) => (
              <Pressable
                key={size.id}
                style={[
                  styles.optionButton,
                  buttonSize === size.id && styles.selectedOption,
                ]}
                onPress={() => setButtonSize(size.id)}>
                <ThemedView style={{ backgroundColor: 'transparent', flex: 1 }}>
                  <ThemedText
                    style={[
                      styles.optionLabel,
                      buttonSize === size.id && styles.selectedLabel,
                    ]}>
                    {size.label}
                  </ThemedText>
                  <ThemedText style={styles.optionDescription}>
                    {size.description}
                  </ThemedText>
                </ThemedView>
                {buttonSize === size.id && (
                  <IconSymbol
                    size={20}
                    name="checkmark.circle.fill"
                    color="#4CAF50"
                  />
                )}
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>

        {/* Feedback Preferences */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🔔 Feedback
          </ThemedText>

          <ThemedView style={styles.settingRow}>
            <ThemedView style={{ backgroundColor: 'transparent', flex: 1 }}>
              <ThemedText style={styles.settingLabel}>Sound Effects</ThemedText>
              <ThemedText style={styles.settingDescription}>
                Play sound when buttons are pressed
              </ThemedText>
            </ThemedView>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={soundEnabled ? '#fff' : '#f4f3f4'}
            />
          </ThemedView>

          <ThemedView style={styles.settingRow}>
            <ThemedView style={{ backgroundColor: 'transparent', flex: 1 }}>
              <ThemedText style={styles.settingLabel}>Vibration (Haptic)</ThemedText>
              <ThemedText style={styles.settingDescription}>
                Vibrate when buttons are pressed
              </ThemedText>
            </ThemedView>
            <Switch
              value={hapticEnabled}
              onValueChange={setHapticEnabled}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={hapticEnabled ? '#fff' : '#f4f3f4'}
            />
          </ThemedView>

          <ThemedView style={styles.settingRow}>
            <ThemedView style={{ backgroundColor: 'transparent', flex: 1 }}>
              <ThemedText style={styles.settingLabel}>
                Confirmation Before Sending
              </ThemedText>
              <ThemedText style={styles.settingDescription}>
                Ask before sending alerts (prevents accidents)
              </ThemedText>
            </ThemedView>
            <Switch
              value={confirmBeforeSend}
              onValueChange={setConfirmBeforeSend}
              trackColor={{ false: '#767577', true: '#4CAF50' }}
              thumbColor={confirmBeforeSend ? '#fff' : '#f4f3f4'}
            />
          </ThemedView>
        </ThemedView>

        {/* Connection Status */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            📡 Connection Status
          </ThemedText>
          <ThemedView style={styles.statusCard}>
            <ThemedView style={styles.statusRow}>
              <IconSymbol size={24} name="wifi" color="#4CAF50" />
              <ThemedView style={{ backgroundColor: 'transparent', flex: 1 }}>
                <ThemedText style={styles.statusLabel}>Online</ThemedText>
                <ThemedText style={styles.statusDescription}>
                  Connected to caregiver app
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.statusDot} />
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* About */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            ℹ️ About Salamanka
          </ThemedText>
          <ThemedView style={styles.aboutCard}>
            <ThemedText style={styles.aboutText}>
              🛎️ Salamanka helps bedridden patients communicate their needs
              easily and keeps caregivers informed.
            </ThemedText>
            <ThemedText style={styles.aboutText}>
              Version 1.0.0 (MVP)
            </ThemedText>
            <ThemedText style={styles.aboutText}>
              Made with 💚 for families in Morocco and beyond
            </ThemedText>
          </ThemedView>
        </ThemedView>

        {/* Emergency Contact */}
        <ThemedView style={styles.section}>
          <Pressable
            style={styles.emergencyButton}
            onPress={() => alert('Emergency contact feature coming soon!')}>
            <IconSymbol size={24} name="phone.fill" color="#fff" />
            <ThemedText
              style={styles.emergencyText}
              lightColor="#fff"
              darkColor="#fff">
              Emergency Contact Settings
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(128, 128, 128, 0.2)',
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
  },
  selectedOption: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  selectedLabel: {
    color: '#4CAF50',
  },
  optionDescription: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    opacity: 0.6,
  },
  statusCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  statusDescription: {
    fontSize: 12,
    opacity: 0.7,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  aboutCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(128, 128, 128, 0.05)',
    gap: 8,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#D32F2F',
    gap: 12,
  },
  emergencyText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
