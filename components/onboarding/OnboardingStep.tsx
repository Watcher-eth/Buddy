// src/components/StepScreen.tsx
import React from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { StepLayout } from './StepLayout';
import { AnimatedPressable } from '../common/AnimatedPressable';

interface StepScreenProps {
  title: string;
  subtitle?: string;
  options: string[];
  selected: string | null;
  continueColor?: string;
  onSelect: (option: string) => void;
  onContinue: () => void;
  gradientColors: readonly [string, string, ...string[]];
  step: number;
  totalSteps: number;
}

export const StepScreen: React.FC<StepScreenProps> = ({
  title,
  subtitle,
  options,
  selected,
  continueColor,
  onSelect,
  onContinue,
  gradientColors,
  step,
  totalSteps,
}) => {
  return (
    <StepLayout
      title={title}
      subtitle={subtitle}
      step={step}
      totalSteps={totalSteps}
      gradientColors={gradientColors}
      onContinue={onContinue}
      continueColor={continueColor}
    >
      {/* FlatList of selectable options */}
      <FlatList
        data={options}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const isSelected = item === selected;
          return (
            <BlurView intensity={50} tint="light" style={styles.blurWrapper}>
              <AnimatedPressable
                onPress={() => onSelect(item)}
                style={[styles.option, isSelected && styles.optionSelected]}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {item}
                </Text>
              </AnimatedPressable>
            </BlurView>
          );
        }}
      />
    </StepLayout>
  );
};

const styles = StyleSheet.create({
  blurWrapper: {
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  option: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  optionSelected: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  optionText: {
    color: 'white',
    fontSize: 23,
    fontWeight: '600',
  },
  optionTextSelected: {
    fontWeight: 'bold',
  },
  listContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
});
