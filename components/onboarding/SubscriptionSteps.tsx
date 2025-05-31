// src/components/StepLayout.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView } from 'expo-symbols'

interface StepLayoutProps {
  title: string;
  subtitle?: string;
  gradientColors: readonly [string, string, ...string[]];
  onContinue: () => void;  // called when “Continue” is pressed
  continueLabel?: string;  // optional override for button text (default: “Continue”)
  children: React.ReactNode; // the “middle” content (FlatList of options, a form, etc.)
}

const {height, width} = Dimensions.get('window');

export const StepLayout: React.FC<StepLayoutProps> = ({
  title,
  gradientColors,
  onContinue,
  continueLabel = 'Continue',
  children,
}) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={gradientColors}
      style={styles.container}
    >
      <Text style={styles.subtitle}>Restore</Text>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.contentContainer}>{children}</View>
      <View style={styles.footer}>
        <Pressable style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueText}>{continueLabel}</Text>
        </Pressable>
      </View>
      <Text style={styles.disclaimer}>Just $17.99/mo after free trial</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 30,
  },
  header: {
    paddingTop: 130,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    position: 'absolute',
    top: 80,
    right: 20,
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    opacity: 0.8,
    textAlign: 'center',
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
  },
  continueText: {
    color: '#01A8FF',
    fontSize: 19,
    fontWeight: '700',
  },
  disclaimer: {
    marginTop: -12,
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.7,
    textAlign: "center"
  }
});




export const FreeTrial = ({onContinue}: {onContinue: () => void}) => {
  return (
    <StepLayout
      title="We want you to try Buddy for free"
      gradientColors={["#0088FF", "#00D0FF"]}
      onContinue={onContinue}
      continueLabel='Try for $0.00'
    >
      <Image source={require("../../assets/Phone.png")} style={{ width: width * 0.64, height: height * 0.45, marginBottom: 40, alignSelf:"center" }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
       <SymbolView name="checkmark" size={23} tintColor="white" weight="bold" />
        <Text style={{ fontSize: 23, color: 'white', fontWeight: '700', marginLeft: 4 }}> No Payment due now</Text>
      </View>
    </StepLayout>
  )
}



export const FreeTrialNotif = ({onContinue}: {onContinue: () => void}) => {
    return (
      <StepLayout
        title="We’ll send you a reminder before your free trial ends"
        gradientColors={["#0095FF", "#00AAFF"]}
        continueLabel='I’m Ready'
        onContinue={onContinue}
      >
        <SymbolView name="bell.badge" size={220} tintColor="white" type='multicolor' animationSpec={{effect:{type: 'bounce'}, repeating: true}} style={{alignSelf:"center"}} />
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: 60 }}>
        <SymbolView name="checkmark" size={23} tintColor="white" weight="bold" />
        <Text style={{ fontSize: 23, color: 'white', fontWeight: '700', marginLeft: 4 }}> No Payment due now</Text>
        </View>
      </StepLayout>
    )
  }
  
  