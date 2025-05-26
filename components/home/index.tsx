// App.tsx
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native'
import AnimatedSmileyFace from './smiley'
import {
  NotepadText,
  Keyboard,
  Mic2,
  MessageCircle,
} from 'lucide-react-native'
import { AnimatedPressable } from '../common/AnimatedPressable'
import { useRouter } from 'expo-router'
import SettingsDropdown from '../common/SessionSettings'
import { SymbolView } from 'expo-symbols'


export default function HomeScreen() {
    const router = useRouter()
  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <AnimatedPressable
          onPress={() => router.push('/reports')}
          style={styles.topIconWrapper}
          haptics="light"
        >
          <NotepadText color="#181818" size={24} />
          <View style={styles.dot} />
        </AnimatedPressable>

          <SettingsDropdown />
      </View>


      {/* Content */}
      <View style={styles.content}>
        <AnimatedSmileyFace />
        <Text style={styles.prompt}>
          Hey how are you{'\n'}feeling today?
        </Text>
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <AnimatedPressable
          style={styles.circleButton}
          haptics="light"
          onPress={() => console.log('Keyboard tapped')}
        >
         <SymbolView name="captions.bubble" size={28} tintColor="#fff" />
        </AnimatedPressable>

        <AnimatedPressable
          style={styles.micButton}
          haptics="medium"
          onPress={() => console.log('Mic tapped')}
        >
         <SymbolView name="microphone" size={32} tintColor="#fff" />
        </AnimatedPressable>

        <AnimatedPressable
          style={styles.circleButton}
          haptics="light"
          onPress={() => console.log('Message tapped')}
        >
         <SymbolView name="ellipsis.message" size={28} tintColor="#fff" />
        </AnimatedPressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    fontFamily: 'SFPro',
  },
  topIconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    bottom: 3.5,
    right: 3.5,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#F90',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  prompt: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: 34,
    fontWeight: '600',
    lineHeight: 32,
    zIndex: 3,
    top: -130,
  },

  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 24,
  },
  circleButton: {
    backgroundColor: '#181818',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButton: {
    backgroundColor: '#181818',
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
