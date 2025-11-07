import { Tabs } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

function LogoTitle() {
  const colorScheme = useColorScheme();
  
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.logo}
        source={require('@/assets/images/logo.png')}
        resizeMode="contain"
      />
      <Text style={[
        styles.appName,
        { color: Colors[colorScheme ?? 'light'].text }
      ]}>
        Salamanka
      </Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Patient',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="heart.text.square.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
