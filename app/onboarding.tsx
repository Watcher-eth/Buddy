// src/components/Onboarding.tsx
import React, { JSX, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft, Layout } from 'react-native-reanimated';

// Public “Sign In” screen (step 1)

// The generic multiple‐choice step layout
import { StepScreen } from '../components/onboarding/OnboardingStep';
import { CustomStepEight, StepFourCustom } from '../components/onboarding/ExtraSteps'
import SignIn from '../components/onboarding/SignIn'

// Your two custom steps:

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);

  // NOTE: adjust this if you end up with more or fewer than 13 steps.
  const totalSteps = 13;

  //
  // 1) Build a “screens” array of functions, one for each step (1‐based).
  //    screens[0] is step 1, screens[1] is step 2, etc.
  //
  const screens: Array<() => JSX.Element> = [
    // STEP 1 (index 0): Sign-In
    () => <SignIn step={step} setStep={setStep} />,

    // STEP 2 (index 1): Choose your Gender
    () => (
      <StepScreen
        title="Choose your Gender"
        subtitle="This will personalize your therapy sessions"
        options={['Male', 'Female', 'Other']}
        selected={selected}
        onSelect={setSelected}
        onContinue={() => setStep(3)}
        gradientColors={['#FD7BEF', '#F9452C']}
        step={2}
        totalSteps={totalSteps}
      />
    ),

    // STEP 3 (index 2): Select your Age
    () => (
      <StepScreen
        title="Select your Age"
        subtitle="This will personalize tone and language"
        options={['<18', '18-25', '25-35', '35-45', '45+']}
        selected={selected}
        onSelect={setSelected}
        onContinue={() => setStep(4)}
        gradientColors={['#FFB301', '#EE5623']}
        step={3}
        totalSteps={totalSteps}
      />
    ),

    // STEP 4 (index 3): Relationship Status
    // (Your generic StepScreen)
    () => (
      <StepScreen
        title="Relationship Status"
        subtitle="Customize your session context"
        options={['Single', 'In a relationship', 'Engaged', 'Married', "It's complicated"]}
        selected={selected}
        onSelect={setSelected}
        onContinue={() => setStep(5)}
        gradientColors={['#00E13E', '#003E75']}
        step={4}
        totalSteps={totalSteps}
      />
    ),

    // STEP 5 (index 4): Your extra custom step (StepFourCustom)
    () => (
      <StepFourCustom
        step={5}
        totalSteps={totalSteps}
        onContinue={() => setStep(6)}
      />
    ),

    // STEP 6 (index 5): “How was your Childhood”
    () => (
      <StepScreen
        title="How was your Childhood"
        subtitle="This will be used to personalize your therapy"
        options={['Amazing', 'Mid', 'Traumatic', 'Other']}
        selected={selected}
        onSelect={setSelected}
        onContinue={() => setStep(7)}
        gradientColors={['#FB5D83', '#FF7700']}
        step={6}
        totalSteps={totalSteps}
      />
    ),

    // STEP 7 (index 6): “How were your Parents”
    () => (
      <StepScreen
        title="How were your Parents"
        subtitle="This will be used to personalize your therapy style"
        options={['Liberal', 'Balanced', 'Conservative', 'Strict', 'Other']}
        selected={selected}
        onSelect={setSelected}
        onContinue={() => setStep(8)}
        gradientColors={['#8273BF', '#003E75']}
        step={7}
        totalSteps={totalSteps}
      />
    ),

    // STEP 8 (index 7): “Have you ever done Therapy”
    () => (
      <StepScreen
        title="Have you ever done Therapy"
        subtitle="This will be used to personalize your therapy"
        options={['Yes', 'No']}
        selected={selected}
        onSelect={setSelected}
        onContinue={() => setStep(9)}
        gradientColors={['#FB5D83', '#0188FF']}
        step={8}
        totalSteps={totalSteps}
      />
    ),

    // STEP 9 (index 8): Your second custom step (CustomStepEight)
    () => (
      <CustomStepEight
        step={9}
        totalSteps={totalSteps}
        onContinue={() => setStep(10)}
      />
    ),

    // STEP 10 (index 9): “Mental Health”
    () => (
      <StepScreen
        title="Mental Health"
        subtitle="Do you have any diagnosed mental health conditions?"
        options={['Depression', 'Anxiety', 'OCD', 'PTSD', 'Bipolar', 'Other']}
        selected={selected}
        onSelect={setSelected}
        onContinue={() => setStep(11)}
        gradientColors={['#E81B00', '#FF9D9D']}
        step={10}
        totalSteps={totalSteps}
      />
    ),

    // STEP 11 (index 10): “Pressing Issues”
    () => (
      <StepScreen
        title="Pressing Issues"
        subtitle="Do you have any pressing issues, problems, or worries to work on?"
        options={['Stress', 'Relationship', 'School / Work', 'Friends', 'Trauma', 'Other']}
        selected={selected}
        onSelect={setSelected}
        onContinue={() => setStep(12)}
        gradientColors={['#C925D1', '#C9FFD8']}
        step={11}
        totalSteps={totalSteps}
      />
    ),

    // STEP 12 (index 11): “What is your Goal”
    () => (
      <StepScreen
        title="What is your Goal"
        subtitle="Buddy will tailor your therapy to your personal goals"
        options={['Be Happier', 'Work through Trauma', 'Get over Breakup', 'Have someone to listen', 'Learn about yourself', 'Other']}
        selected={selected}
        onSelect={setSelected}
        onContinue={() => setStep(13)}
        gradientColors={['#8DCBFF', '#0088FF']}
        step={12}
        totalSteps={totalSteps}
      />
    ),

    // STEP 13 (index 12): (placeholder for any final step)
    () => (
      <StepScreen
        title="All done!"
        subtitle="Thank you for providing your information."
        options={[]}
        selected={selected}
        onSelect={setSelected}
        onContinue={() => {/* final action here */}}
        gradientColors={['#00C8FF', '#00FF99']}
        step={13}
        totalSteps={totalSteps}
      />
    ),
  ];

  //
  // 2) Safely pick which screen to render. If `step` is out of range, fall back to the last screen.
  //
  const ScreenToRender = screens[step - 1] ?? screens[screens.length - 1];

  return (
    <View style={styles.wrapper}>
      <Animated.View
        key={`onboarding-step-${step}`}
        style={styles.container}
        layout={Layout.springify()}
        entering={SlideInRight.duration(300)}
        exiting={SlideOutLeft.duration(300)}
      >
        {ScreenToRender()}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'black',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
  },
});
