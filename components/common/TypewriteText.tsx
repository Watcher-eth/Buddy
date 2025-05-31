// TypewriterTextReanimated.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  interpolate,
  Extrapolation,
  Easing,
  useAnimatedReaction,
} from 'react-native-reanimated';

const DEFAULT_STRINGS = [
  "Welcome to Buddy—your AI therapy companion.",
  "You’re doing great. Take a deep breath.",
  "Remember: every step forward counts.",
] as [string, string, string];
const DEFAULT_TYPING_INTERVAL = 100;
const DEFAULT_PAUSE_AFTER_FULL = 4000;
const DEFAULT_PULSE_DURATION = 1000;
const DEFAULT_MIN_OPACITY = 0.8;
const DEFAULT_MAX_OPACITY = 1.0;

interface TypewriterTextReanimatedProps {
  strings?: [string, string, string];
  typingInterval?: number;
  pauseAfterFull?: number;
  minOpacity?: number;
  maxOpacity?: number;
  pulseDuration?: number;
}

export default function TypewriterTextReanimated({
  strings = DEFAULT_STRINGS,
  typingInterval = DEFAULT_TYPING_INTERVAL,
  pauseAfterFull = DEFAULT_PAUSE_AFTER_FULL,
  minOpacity = DEFAULT_MIN_OPACITY,
  maxOpacity = DEFAULT_MAX_OPACITY,
  pulseDuration = DEFAULT_PULSE_DURATION,
}: TypewriterTextReanimatedProps) {
  const [str0, str1, str2] = strings;
  const len0 = str0.length;
  const len1 = str1.length;
  const len2 = str2.length;

  const stringIndex = useSharedValue(0);
  const letterCount = useSharedValue(0);
  const pulse = useSharedValue(minOpacity);

  useAnimatedReaction(
    () => true,
    () => {
      const duration0 = len0 * typingInterval + pauseAfterFull;
      const duration1 = len1 * typingInterval + pauseAfterFull;
      const duration2 = len2 * typingInterval + pauseAfterFull;
      const seqIndex = withSequence(
        withTiming(0 as number, { duration: 0 }),
        withDelay(duration0, withTiming(0 as number, { duration: 0 })),
        withTiming(1 as number, { duration: 0 }),
        withDelay(duration1, withTiming(1 as number, { duration: 0 })),
        withTiming(2 as number, { duration: 0 }),
        withDelay(duration2, withTiming(2 as number, { duration: 0 }))
      );
      stringIndex.value = withRepeat(seqIndex, -1, false);

      const rampTime0 = len0 * typingInterval;
      const rampTime1 = len1 * typingInterval;
      const rampTime2 = len2 * typingInterval;
      const seqCount = withSequence(
        withTiming(len0, { duration: rampTime0, easing: Easing.linear }),
        withTiming(0 as number, { duration: 0 }),
        withDelay(pauseAfterFull, withTiming(0 as number, { duration: 0 })),
        withTiming(len1, { duration: rampTime1, easing: Easing.linear }),
        withTiming(0 as number, { duration: 0 }),
        withDelay(pauseAfterFull, withTiming(0 as number, { duration: 0 })),
        withTiming(len2, { duration: rampTime2, easing: Easing.linear }),
        withTiming(0 as number, { duration: 0 }),
        withDelay(pauseAfterFull, withTiming(0 as number, { duration: 0 }))
      );
      letterCount.value = withRepeat(seqCount, -1, false);

      pulse.value = withRepeat(
        withTiming(maxOpacity, { duration: pulseDuration, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    },
    []
  );

  const animatedProps = useAnimatedProps(() => {
    const idx = Math.floor(stringIndex.value) % 3;
    const count = Math.floor(letterCount.value);
    let base = "";
    if (idx === 0) base = str0;
    else if (idx === 1) base = str1;
    else base = str2;
    const clamped = Math.min(Math.max(count, 0), base.length);
    const sub = base.substring(0, clamped);
    // @ts-ignore
    return { text: sub };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return { opacity: pulse.value };
  });

  return (
    <Animated.Text
      // @ts-ignore
      animatedProps={animatedProps}
      style={[styles.text, animatedStyle]}
    />
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
});
