// components/Checkbox.tsx
import React from 'react'
import { View, StyleProp, ViewStyle } from 'react-native'
import { AnimatedPressable } from './AnimatedPressable'

export type CheckboxProps = {
  /** whether it’s checked */
  checked: boolean
  /** toggle handler */
  onPress: () => void
  /** outer box size in px */
  size?: number
  /** color when checked */
  colorChecked?: string
  /** border color when unchecked */
  colorUnchecked?: string
  /** extra style on container */
  style?: StyleProp<ViewStyle>
}

/**
 * Simple checkbox square.  
 * When checked, fills with colorChecked; otherwise shows an empty border.
 */
export function Checkbox({
  checked,
  onPress,
  size = 24,
  colorChecked = '#A4FFAF',
  colorUnchecked = '#FFF',
  style,
}: CheckboxProps) {
  const borderColor = checked ? colorChecked : colorUnchecked
  const innerSize = size * 0.6

  return (
    <AnimatedPressable
      onPress={onPress}
      haptics="light"
      style={[
        {
          width: size,
          height: size,
          borderRadius: 6,
          borderWidth: 3,
          borderColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {checked && (
        <View
          style={{
            width: innerSize,
            height: innerSize,
            backgroundColor: colorChecked,
            borderRadius: 2,
          }}
        />
      )}
    </AnimatedPressable>
  )
}
