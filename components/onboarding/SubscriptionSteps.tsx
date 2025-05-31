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
import { AnimatedPressable } from '../common/AnimatedPressable'
import Animated, { Easing, useAnimatedReaction, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

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
        <AnimatedPressable style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueText}>{continueLabel}</Text>
        </AnimatedPressable>
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
    fontFamily: 'SFPro-Bold',
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
    color: '#01A8FF',
    fontSize: 19,
    fontWeight: '700',
    fontFamily: 'SFPro-Bold',
  },
  disclaimer: {
    marginTop: -12,
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.7,
    textAlign: "center",
    fontFamily: 'SFPro-Bold',
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
        <Text style={{ fontSize: 23, color: 'white', fontWeight: '700', marginLeft: 4, fontFamily: 'SFPro-Bold', }}> No Payment due now</Text>
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
        <Text style={{ fontSize: 23, color: 'white', fontWeight: '700', marginLeft: 4, fontFamily: 'SFPro-Bold', }}> No Payment due now</Text>
        </View>
      </StepLayout>
    )
  }
  
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
  const BUTTON_WIDTH = SCREEN_WIDTH * 0.85;
  const BUTTON_HEIGHT = 50;
  
  export const SignUp: React.FC = () => {
    const pulse = useSharedValue(0);
  
    useAnimatedReaction(
      () => pulse.value,
      (val) => {
        if (val === 0) {
          pulse.value = withRepeat(
            withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
          );
        }
      },
      [pulse]
    );
  
    const pulseStyle = useAnimatedStyle(() => ({
      opacity: 0.5 + 0.5 * pulse.value,
    }));
  
    const onAppleSignIn = () => {};
    const onGoogleSignIn = () => {};
  
    return (
      <View style={styles2.container}>
        <Text style={{position: 'absolute', top: 90, alignSelf:"center", fontWeight: '600', color: 'black', fontFamily: 'SFPro-Bold', fontSize: 30}}>Create your Account</Text>
        <Text style={{position: 'absolute', top: 130, alignSelf:"center", fontWeight: '600', color: 'gray', fontFamily: 'SFPro-Bold', fontSize: 16}}>After this you are done. Promise!</Text>

        <AnimatedPressable containerStyle={styles2.appleButton} contentStyle={styles2.appleButton} onPress={onAppleSignIn}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNw7QG9ltH125HUWoX0GoIi5_d3zGvmJc2zg&s' }}
            style={styles2.icon}
            resizeMode="contain"
          />
          <Text style={styles2.appleButtonText}>Sign in with Apple</Text>
        </AnimatedPressable>
  
        <Text style={{marginVertical: 14, alignSelf:"center", fontWeight: '600', color: 'gray', fontFamily: 'SFPro-Bold', fontSize: 16}}>or</Text>
  
          <Animated.View style={[styles2.googleOuter, pulseStyle]}>
          <LinearGradient
            colors={[
              '#FF0000',
              '#FF8C00',
              '#FFD300',
              '#00C853',
              '#0091EA',
              '#D500F9',
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
  
          <View style={styles2.googleInner}>
            <AnimatedPressable contentStyle={styles2.googleContent} onPress={onGoogleSignIn}>
              <Image
                source={{ uri: 'https://crystalpng.com/wp-content/uploads/2025/05/google-logo.png' }}
                style={styles2.icon}
                resizeMode="contain"
              />
              <Text style={styles2.googleButtonText}>Sign in with Google</Text>
            </AnimatedPressable>
          </View>
        </Animated.View>
        <Text style={{position: 'absolute', bottom: 40, alignSelf:"center", fontWeight: '600', color: 'gray', fontFamily: 'SFPro-Bold', fontSize: 13}}>By signing up you agree to our Terms and Conditions.</Text>

      </View>
    );
  };
  
  const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    icon: {
      width: 24,
      height: 24,
      marginRight: 8,
    },
    appleButton: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      borderRadius: BUTTON_HEIGHT / 2,
      backgroundColor: '#000',
    },
    appleButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'SFPro-Bold',
    },
    googleOuter: {
      width: BUTTON_WIDTH + 4,
      height: BUTTON_HEIGHT + 4,
      borderRadius: (BUTTON_HEIGHT + 4) / 2,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    googleInner: {
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
      borderRadius: BUTTON_HEIGHT / 2,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
    },
    googleContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: BUTTON_WIDTH,
      height: BUTTON_HEIGHT,
    },
    googleButtonText: {
      color: '#000',
      fontSize: 16,
      fontWeight: '600',
      fontFamily: 'SFPro-Bold',
    },
  });
  
  
  
  
  
  
  
  
