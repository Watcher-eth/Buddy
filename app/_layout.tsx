// app/_layout.tsx
import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { Slot, Stack } from 'expo-router'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { RootSiblingParent } from 'react-native-root-siblings'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'SFPro': require('../assets/fonts/SFProRounded-Regular.ttf'),
    'SFPro-Medium': require('../assets/fonts/SFProRounded-Medium.ttf'),
    'SFPro-Bold': require('../assets/fonts/SFProRounded-Bold.ttf'),
  })

  useEffect(() => {
    if (fontError) {
      throw fontError
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  if (!fontsLoaded) {
    // keep the splash screen up until fonts load
    return null
  }

  return (
    <SafeAreaProvider style={{ }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <RootSiblingParent>
            <Stack
            
            screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              gestureDirection: 'horizontal',
            }}
            >
              {/* index → HomeScreen */}
              <Stack.Screen name="index" />

              {/* /reports → Reports list */}
              <Stack.Screen name="reports" options={{
                headerShown: false,
                animation: 'slide_from_left',    // force any push to come from left
                gestureEnabled: true,
                gestureDirection: 'horizontal',
              }}/>

              {/* /reports/[id] → Report detail */}
              <Stack.Screen
                name="[id]"
                options={{
                  // optionally override header for detail
                  headerShown: false,
                  headerTitle: 'Report Detail',
                }}
              />
            </Stack>
          </RootSiblingParent>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}
