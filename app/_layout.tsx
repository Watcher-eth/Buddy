// app/_layout.tsx
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider }   from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as SplashScreen      from 'expo-splash-screen';
import { useFonts }          from 'expo-font';
import { useAuthStore } from '../lib/stores/AuthStore'


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // 1) Load custom fonts
  const [fontsLoaded, fontError] = useFonts({
    SFPro:          require('../assets/fonts/SFProRounded-Regular.ttf'),
    'SFPro-Medium': require('../assets/fonts/SFProRounded-Medium.ttf'),
    'SFPro-Bold':   require('../assets/fonts/SFProRounded-Bold.ttf'),
  });

  // 2) Pull primitives from your Zustand store
  const token     = useAuthStore((s) => s.token);

  console.log("token", token, !token, !!token);
  // 3) Hide the splash only once fonts & auth are ready
  useEffect(() => {
    if (fontError) throw fontError;
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);


  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <RootSiblingParent>
            <Stack
              screenOptions={{
                headerShown:      false,
              }}
            >
              {/** 
        1) If token exists, render the entire `(app)` group 
        which lives in `app/(app)/_layout.tsx`. 
      **/}
      <Stack.Protected guard={!!token}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      {/** 
        2) If no token, render the onboarding screen 
        which lives at `app/onboarding.tsx`.
      **/}
      <Stack.Protected guard={!token}>
        <Stack.Screen 
          name="onboarding" 
          options={{ presentation: 'modal' }} 
        />
      </Stack.Protected>
            </Stack>
          </RootSiblingParent>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
