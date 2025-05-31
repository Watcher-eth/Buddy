// RocketLaunchAnimation.tsx
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  interpolate,
  Extrapolation
} from 'react-native-reanimated';

// Make sure to install expo-symbols: `expo install expo-symbols`
import { SymbolView } from 'expo-symbols';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const RIPPLE_COUNT = 3;     // how many concentric ripples
const BLOB_COUNT = 5;       // how many floating blobs
const RIPPLE_INTERVAL = 1000; // ms between ripple starts
const BLOB_FLOAT_HEIGHT = 30; // px up/down
const BLOB_FLOAT_DURATION = 3000; // ms per float cycle

export function RocketLaunchAnimation() {
  //
  // 1) Create shared values for ripples: each one will loop scale 0→1 and opacity 0.5→0
  //
  const rippleScales = Array.from({ length: RIPPLE_COUNT }, (_, i) => useSharedValue(0));
  const rippleOpacities = Array.from({ length: RIPPLE_COUNT }, (_, i) => useSharedValue(0.5));

  //
  // 2) Create shared values for floating “blobs”: each blob will bob up/down in a sine‐like loop
  //
  const blobOffsets = Array.from({ length: BLOB_COUNT }, () => useSharedValue(0));

  //
  // 3) When component mounts, start the looping animations
  //
  useEffect(() => {
    // Staggered ripples
    rippleScales.forEach((scale, index) => {
      // Delay each ripple by index * RIPPLE_INTERVAL
      const delay = index * RIPPLE_INTERVAL;

      // Step 1: initially keep at 0
      scale.value = 0;
      rippleOpacities[index].value = 0.5;

      // Loop: after `delay`, begin repeating scale+fade
      setTimeout(() => {
        scale.value = withRepeat(
          withTiming(1, {
            duration: 1000,
            easing: Easing.out(Easing.quad),
          }),
          /* iterations = */ -1,
          /* reverse= */ false
        );
        rippleOpacities[index].value = withRepeat(
          withTiming(0, {
            duration: 1000,
            easing: Easing.out(Easing.quad),
          }),
          /* iterations = */ -1,
          /* reverse= */ false
        );
      }, delay);
    });

    // Start blob float loops
    blobOffsets.forEach((offset, index) => {
      // give each blob a random phase delay so they’re out of sync
      const randomDelay = Math.random() * 1000;
      setTimeout(() => {
        offset.value = withRepeat(
          withTiming(1, {
            duration: BLOB_FLOAT_DURATION,
            easing: Easing.inOut(Easing.sin),
          }),
          -1,
          true // alternate up/down
        );
      }, randomDelay);
    });
  }, []);

  //
  // 4) Build animated styles for ripples & blobs
  //
  const rippleStyles = rippleScales.map((scale, i) =>
    useAnimatedStyle(() => {
      // scale goes 0→1, opacity goes 0.5→0
      const s = scale.value;
      const opacity = rippleOpacities[i].value;
      return {
        transform: [
          { scale: interpolate(s, [0, 1], [0, 1.8]) }, // expand up to ~1.8× size
        ],
        opacity,
      };
    })
  );

  const blobStyles = blobOffsets.map((offset) =>
    useAnimatedStyle(() => {
      // offset.value goes 0→1→0. We'll use sine interpolation to get a smooth up/down
      const t = offset.value;
      // map 0→1→0 into -H → +H → -H
      const dy = interpolate(t, [0, 1], [0, 2 * Math.PI], {
        extrapolateRight: Extrapolation.CLAMP,
        extrapolateLeft: Extrapolation.CLAMP,
      });
      const y = Math.sin(dy) * BLOB_FLOAT_HEIGHT; 
      return {
        transform: [{ translateY: -y }], // negative so that positive y value lifts upwards
      };
    })
  );

  //
  // 5) Render the entire view:
  //
  return (
    <View style={styles.container}>
      {/* 5a) Ripples: a stack of concentric circles */}
      {rippleScales.map((_, i) => (
        <Animated.View
          key={`ripple-${i}`}
          style={[
            styles.ripple,
            rippleStyles[i],
          ]}
        />
      ))}

      {/* 5b) Central Rocket using SF Symbol */}
      <View style={styles.rocketWrapper}>
        <SymbolView
          name={'gear'}
          size={64}
          tintColor="#FFFFFF"
          // SF Symbols on iOS may animate automatically if you set `animated={true}`
          animationSpec={{effect:{type: 'bounce'}, repeating: true}}
          style={styles.rocket}
        />
      </View>

  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // black background so ripples + blobs show
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Each ripple is a transparent circle with white border
  ripple: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },

  // Wrapper for the rocket icon
  rocketWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rocket: {
    // Optionally, you could pulse/scale the rocket itself. 
    // For simplicity, we just size it.
  },

  // Base style for each floating blob
  blobBase: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    opacity: 0.6,
  },
});
