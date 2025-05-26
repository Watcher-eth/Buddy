// AnimatePressable.tsx
import React, { JSX, ReactNode } from 'react'
import {
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'

type HapticLevel = 'none' | 'light' | 'medium'

type AnimatePressableProps = Omit<
  PressableProps,
  'style' | 'onPressIn' | 'onPressOut'
> & {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  activeScale?: number
  duration?: number
  haptics?: HapticLevel
  onPressIn?: (e: GestureResponderEvent) => void
  onPressOut?: (e: GestureResponderEvent) => void
}

export function AnimatedPressable({
  children,
  style,
  activeScale = 0.95,
  duration = 100,
  haptics = 'light',
  onPressIn,
  onPressOut,
  ...rest
}: AnimatePressableProps): JSX.Element {
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const triggerHaptic = () => {
    if (haptics === 'light') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    } else if (haptics === 'medium') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    }
  }

  function handlePressIn(e: GestureResponderEvent) {
    triggerHaptic()
    scale.value = withTiming(activeScale, { duration })
    onPressIn?.(e)
  }

  function handlePressOut(e: GestureResponderEvent) {
    scale.value = withTiming(1, { duration })
    onPressOut?.(e)
  }

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...rest}
    >
      <Animated.View style={[style, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  )
}
