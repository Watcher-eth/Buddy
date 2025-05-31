// src/components/StepLayout.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useDerivedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedPressable } from '../common/AnimatedPressable'

const { width } = Dimensions.get('window');

// Constants for the progress ring
const OUTER_RADIUS = 15;
const STROKE_WIDTH = 6;
const SIZE = OUTER_RADIUS * 2 + STROKE_WIDTH * 2;
const CIRCUMFERENCE = 2 * Math.PI * OUTER_RADIUS;

interface StepLayoutProps {
  title: string;
  subtitle?: string;
  step: number;            // current step index (1-based)
  totalSteps: number;      // total number of steps
  gradientColors: readonly [string, string, ...string[]];
  continueColor?: string
  onContinue: () => void;  // called when “Continue” is pressed
  continueLabel?: string;  // optional override for button text (default: “Continue”)
  children: React.ReactNode; // the “middle” content (FlatList of options, a form, etc.)
}

export const StepLayout: React.FC<StepLayoutProps> = ({
  title,
  subtitle,
  step,
  totalSteps,
  gradientColors,
  onContinue,
  continueColor,
  continueLabel = 'Continue',
  children,
}) => {
  //
  // 1) Derive a shared value from `step`. Whenever `step` changes,
  //    useTiming will animate the shared value from its previous number
  //    to the new computed length along the circumference.
  //
  const progress = useDerivedValue(() => {
    // Compute how many pixels of arc we want (0 → full circle)
    const target = (step / totalSteps) * CIRCUMFERENCE;
    // withTiming will animate from the old progress.value → target
    return withTiming(target, { duration: 300 });
  }, [step, totalSteps]);

  //
  // 2) Hook up animated props to the Circle’s strokeDashoffset
  //
  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: CIRCUMFERENCE - progress.value,
    };
  });

  //
  // 3) Create an animated Circle
  //
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={gradientColors}
      style={styles.container}
    >
      {/* Progress Ring */}
      <View style={styles.indicatorContainer}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={OUTER_RADIUS}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth={STROKE_WIDTH}
            fill="none"
          />
          <AnimatedCircle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={OUTER_RADIUS}
            stroke="white"
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${CIRCUMFERENCE}, ${CIRCUMFERENCE}`}
            strokeLinecap="round"
            animatedProps={animatedProps}
            fill="none"
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
          />
        </Svg>
      </View>

      {/* Title / Subtitle */}
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {/* “Middle” content (FlatList of options, or any child you pass) */}
      <View style={styles.contentContainer}>{children}</View>

      {/* Footer “Continue” button */}
      <View style={styles.footer}>
        <AnimatedPressable style={styles.continueButton} onPress={onContinue}>
          <Text style={[styles.continueText, { color: continueColor }]}>{continueLabel}</Text>
        </AnimatedPressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 25,
  },
  indicatorContainer: {
    position: 'absolute',
    top: 70,
    left: (width - SIZE) / 2,
    width: SIZE,
    height: SIZE,
  },
  header: {
    paddingTop: 130,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
    fontFamily: 'SFPro-Bold',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    fontFamily: 'SFPro-Medium',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  footer: {
    padding: 20,
  },
  continueButton: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    fontFamily: 'SFPro-Bold',

  },
  continueText: {
    fontSize: 19,
    fontWeight: '700',
  },
});
