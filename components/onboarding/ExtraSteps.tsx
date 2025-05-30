// src/components/StepFourCustom.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { StepLayout } from './StepLayout';
import { RocketLaunchAnimation, SessionCard } from './ExtraItems'
import { Checkbox } from '../common/Checkbox'
import { ActivityRings } from '../reports/MoodScore'
import TypewriterTextReanimated from '../common/TypewriteText'

interface StepFourProps {
  step: number;
  totalSteps: number;
  onContinue: () => void;
  continueColor?: string
}

export const StepFourCustom: React.FC<StepFourProps> = ({
  step,
  totalSteps,
  onContinue,
  continueColor,
}) => {
  return (
    <StepLayout
      continueColor={continueColor}
      title="Buddy is completely personalized to YOU"
      subtitle="All your Data is military grade encrypted 100% confidential. "
      step={step}
      totalSteps={totalSteps}
      gradientColors={['#0088FF', '#8DCBFF']}
      onContinue={onContinue}
      continueLabel="Next"
    >
      {/* Middle content: a single TextInput in this case */}
      <View style={styles.inputContainer}>
      <Image
        source={require('../../assets/BuddyBlue.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>100% Private</Text>
      <Text style={styles.subtitle}>With each session Buddy learns more about you and tailors your therapy based on all previous sessions and memories.</Text>
      </View>
    </StepLayout>
  );
};



const styles = StyleSheet.create({
  inputContainer: {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  },
  image: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'SFPro-Bold',

  },
  subtitle: {
    fontSize: 15,
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
    fontWeight: '500',
    fontFamily: 'SFPro-Medium',
  },
});



export const CustomStepEight: React.FC<{
  step: number;
  totalSteps: number;
  continueColor?: string
  onContinue: () => void;
}> = ({ step, totalSteps, onContinue, continueColor }) => {
  const goals = [
    'Letting Go with Kindness',
    'Try setting one tiny goal for the week',
    "Jot down one thing you’re proud of each day",
  ];

  return (
    <StepLayout
      continueColor={continueColor}
      title="Buddy creates custom Reports and Objectives after each Session"
      subtitle=""
      step={step}
      totalSteps={totalSteps}
      gradientColors={['#171717', '#273723']}
      onContinue={onContinue}
      continueLabel="Continue"
    >
      <View style={styles.inputContainer}>

<Image source={require('../../assets/ReportsPreview.png')} style={styles2.image} />

        <View style={styles2.goalsContainer}>
          {goals.map((g, i) => (
            <View style={styles2.goalRow} key={i}>
              <Checkbox
                checked={i === 1} // mark the second one as checked
                onPress={() => {}}
                size={24}
                colorChecked="#A4FFAF"
                colorUnchecked="#fff"
              />
              <Text style={styles2.goalLabel}>{g}</Text>
            </View>
          ))}
        </View>
      </View>
    </StepLayout>
  );
};

const styles2 = StyleSheet.create({

 image: {
  width: 380,
  height: 330,
  marginBottom: 22,
  marginLeft: 10,
 },

 title: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#fff',
  marginTop: 27,
  textAlign: "center",
  marginBottom: 10,
  fontFamily: 'SFPro-Bold',
 },

  goalsContainer: {
    width: '90%',
  },

  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  goalLabel: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 12,
    flexShrink: 1,
    fontWeight: '600',
  },
});



export const CustomStep13: React.FC<{
  step: number;
  totalSteps: number;
  continueColor?: string
  onContinue: () => void;
}> = ({ step, totalSteps, onContinue, continueColor }) => {

  return (
    <StepLayout
      continueColor={continueColor}
      title="Buddy helps you be happier & more secure"
      subtitle=""
      step={step}
      totalSteps={totalSteps}
      gradientColors={['#141414', '#202224']}
      onContinue={onContinue}
      continueLabel="Continue"
    >
      <View style={styles.inputContainer}>
<ActivityRings values={[0.45, 0.6, 0.78]} />
<Text style={styles2.title}>78% of Users report being happier with themselves 30 days after starting Buddy</Text>
<Text style={styles.subtitle}>60% report feeling more secure & confident and 45% less anxious in their day to day</Text>
      </View>
    </StepLayout>
  );
};


export const CustomStep14: React.FC<{
  step: number;
  totalSteps: number;
  continueColor?: string
  onContinue: () => void;
}> = ({ step, totalSteps, onContinue, continueColor }) => {

  return (
    <StepLayout
      continueColor={continueColor}
      title="Buddy is now creating a personal Therapy Plan"
      subtitle="It will evolve and and adapt over time based on your sessions and memories"
      step={step}
      totalSteps={totalSteps}
      gradientColors={['#FFB301', '#EE5623']}
      onContinue={onContinue}
      continueLabel="Continue"
    >
      <View style={styles.inputContainer}>
<RocketLaunchAnimation />
<TypewriterTextReanimated strings={["Personalizing your experience", "Calibrating your Buddy", "Creating a safe space"]} /></View>    </StepLayout>
  );
};
