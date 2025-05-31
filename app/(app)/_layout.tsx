// app/(app)/_layout.tsx
import React from 'react';
import { Slot, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export const unstable_settings = {
  // Make 'index' the first screen in this group
  initialRouteName: 'index',
};

export default function AppNestedLaryout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown:      false,
          gestureEnabled:   true,
          gestureDirection: 'horizontal',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="reports" options={{
                headerShown: false,
                animation: 'slide_from_left',
                gestureEnabled: true,
                gestureDirection: 'horizontal',
              }}/>

              <Stack.Screen
                name="[id]"
                options={{
                  headerShown: false,
                  headerTitle: 'Report Detail',
                }}
              />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
