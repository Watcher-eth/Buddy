// src/components/Onboarding.tsx
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { SlideInRight, SlideOutLeft, Layout } from 'react-native-reanimated';

import SignIn from '../components/onboarding/SignIn';
import { StepScreen } from '../components/onboarding/OnboardingStep';
import { StepFourCustom, CustomStepEight, CustomStep13, CustomStep14 } from '../components/onboarding/ExtraSteps';
import { FreeTrial, FreeTrialNotif, SignUp } from '../components/onboarding/SubscriptionSteps';
import { useOnboardingStore } from '../lib/stores/OnboardingStore'


export default function Onboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 13;

  const gender = useOnboardingStore((s) => s.gender);
  const setGender = useOnboardingStore((s) => s.setGender);

  const age = useOnboardingStore((s) => s.age);
  const setAge = useOnboardingStore((s) => s.setAge);

  const relationshipStatus = useOnboardingStore((s) => s.relationshipStatus);
  const setRelationshipStatus = useOnboardingStore((s) => s.setRelationshipStatus);

  const childhood = useOnboardingStore((s) => s.childhood);
  const setChildhood = useOnboardingStore((s) => s.setChildhood);

  const parents = useOnboardingStore((s) => s.parents);
  const setParents = useOnboardingStore((s) => s.setParents);

  const everHadTherapy = useOnboardingStore((s) => s.everHadTherapy);
  const setEverHadTherapy = useOnboardingStore((s) => s.setEverHadTherapy);

  const mentalHealth = useOnboardingStore((s) => s.mentalHealth);
  const setMentalHealth = useOnboardingStore((s) => s.setMentalHealth);

  const pressingIssues = useOnboardingStore((s) => s.pressingIssues);
  const setPressingIssues = useOnboardingStore((s) => s.setPressingIssues);

  const goal = useOnboardingStore((s) => s.goal);
  const setGoal = useOnboardingStore((s) => s.setGoal);

  const screens: Array<() => JSX.Element> = [
    () => <SignIn step={step} setStep={setStep} />,

    () => (
      <StepScreen
        title="Choose your Gender"
        subtitle="This will personalize your therapy sessions"
        options={['Male', 'Female', 'Other']}
        selected={gender}
        onSelect={setGender}
        onContinue={() => setStep(3)}
        gradientColors={['#FD7BEF', '#F9452C']}
        continueColor="#FB5D83"
        step={2}
        totalSteps={totalSteps}
      />
    ),

    () => (
      <StepScreen
        title="Select your Age"
        subtitle="This will personalize tone and language"
        options={['<18', '18-25', '25-35', '35-45', '45+']}
        selected={age}
        onSelect={setAge}
        onContinue={() => setStep(4)}
        gradientColors={['#FFB301', '#EE5623']}
        continueColor="#F37019"
        step={3}
        totalSteps={totalSteps}
      />
    ),

    () => (
      <StepScreen
        title="Relationship Status"
        subtitle="Customize your session context"
        options={['Single', 'In a relationship', 'Engaged', 'Married', "It's complicated"]}
        selected={relationshipStatus}
        onSelect={setRelationshipStatus}
        onContinue={() => setStep(5)}
        gradientColors={['#00E13E', '#003E75']}
        continueColor="#01845E"
        step={4}
        totalSteps={totalSteps}
      />
    ),

    () => (
      <StepFourCustom
        step={5}
        totalSteps={totalSteps}
        onContinue={() => setStep(6)}
        continueColor="#4AABFF"
      />
    ),

    () => (
      <StepScreen
        title="How was your Childhood"
        subtitle="This will be used to personalize your therapy"
        options={['Amazing', 'Mid', 'Traumatic', 'Other']}
        selected={childhood}
        onSelect={setChildhood}
        onContinue={() => setStep(7)}
        gradientColors={['#FB5D83', '#FF7700']}
        continueColor="#47A9FF"
        step={6}
        totalSteps={totalSteps}
      />
    ),

    () => (
      <StepScreen
        title="How were your Parents"
        subtitle="This will be used to personalize your therapy style"
        options={['Liberal', 'Balanced', 'Conservative', 'Strict', 'Other']}
        selected={parents}
        onSelect={setParents}
        onContinue={() => setStep(8)}
        gradientColors={['#8273BF', '#003E75']}
        continueColor="#405899"
        step={7}
        totalSteps={totalSteps}
      />
    ),

    () => (
      <StepScreen
        title="Have you ever done Therapy"
        subtitle="This will be used to personalize your therapy"
        options={['Yes', 'No']}
        selected={everHadTherapy}
        onSelect={setEverHadTherapy}
        onContinue={() => setStep(9)}
        gradientColors={['#FB5D83', '#0188FF']}
        continueColor="#5F79D1"
        step={8}
        totalSteps={totalSteps}
      />
    ),

    () => (
      <CustomStepEight
        step={9}
        totalSteps={totalSteps}
        onContinue={() => setStep(10)}
        continueColor="#8273BF"
      />
    ),

    () => (
      <StepScreen
        title="Mental Health"
        subtitle="Do you have any diagnosed mental health conditions?"
        options={['Depression', 'Anxiety', 'OCD', 'PTSD', 'Bipolar', 'Other']}
        selected={mentalHealth}
        onSelect={setMentalHealth}
        onContinue={() => setStep(11)}
        gradientColors={['#E81B00', '#FF9D9D']}
        continueColor="#F56458"
        step={10}
        totalSteps={totalSteps}
      />
    ),

    () => (
      <StepScreen
        title="Pressing Issues"
        subtitle="Do you have any pressing issues, problems, or worries to work on?"
        options={['Stress', 'Relationship', 'School / Work', 'Friends', 'Trauma', 'Other']}
        selected={pressingIssues}
        onSelect={setPressingIssues}
        onContinue={() => setStep(12)}
        gradientColors={['#C925D1', '#C9FFD8']}
        continueColor="#C97FD4"
        step={11}
        totalSteps={totalSteps}
      />
    ),

    () => (
      <StepScreen
        title="What is your Goal"
        subtitle="Buddy will tailor your therapy to your personal goals"
        options={['Be Happier', 'Work through Trauma', 'Get over Breakup', 'Have someone to listen', 'Learn about yourself', 'Other']}
        selected={goal}
        onSelect={setGoal}
        onContinue={() => setStep(13)}
        gradientColors={['#80F061', '#00995C']}
        continueColor="#3AC15E"
        step={12}
        totalSteps={totalSteps}
      />
    ),

    () => (
      <CustomStep13
        step={13}
        totalSteps={totalSteps}
        onContinue={() => setStep(14)}
      />
    ),

    () => (
      <CustomStep14
        step={14}
        totalSteps={totalSteps}
        onContinue={() => setStep(15)}
      />
    ),

    () => (
      <FreeTrial onContinue={() => setStep(16)} />
    ),

    () => (
      <FreeTrialNotif onContinue={() => setStep(17)} />
    ),

    () => <SignUp />,
  ];

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
