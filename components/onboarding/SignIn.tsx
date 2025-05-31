import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { AnimatedPressable } from '../common/AnimatedPressable'

const { width } = Dimensions.get('window');
const BUTTON_WIDTH = width * 0.9;

interface SignInProps {
  step: number;
  setStep: (step: number) => void;
}

export default function SignIn({ step, setStep }: SignInProps) {
  const onPress = () => {
    setStep(step + 1);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Homescreen.png')}
        style={styles.background}
        resizeMode="cover"
      />

<AnimatedPressable
        containerStyle={styles.outer}
        contentStyle={styles.inner}
        onPress={onPress}
      >
        <Text style={styles.text}>Get Started</Text>
      </AnimatedPressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    width:  '100%',
    height: '100%',
    position: 'absolute',
    top:    0,
    left:   0,
    },
    
  // The AnimatedPressable’s Animated.View—dash + gap + pill—lives here
  outer: {
    position:     'absolute',
    bottom:       50,
    alignSelf:    'center',
    width:        BUTTON_WIDTH,
    borderWidth:  2,
    borderColor:  '#fff',
    borderStyle:  'dashed',
    borderRadius: BUTTON_WIDTH / 2,
    padding:      4,
  },

  // Your white “inner” pill
  inner: {
    backgroundColor: '#fff',
    borderRadius:    (BUTTON_WIDTH - 8) / 2, // subtract padding*2
    paddingVertical: 14,
    alignItems:      'center',
  },
  text: {
    fontSize:   19,
    fontWeight: '600',
    color:      '#62BFF8',                 // match your light-blue text
  },
});
