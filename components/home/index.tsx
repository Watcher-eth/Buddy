import React, { useMemo } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native'
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated'
import { NotepadText } from 'lucide-react-native'
import { SymbolView } from 'expo-symbols'
import { useRouter } from 'expo-router'

import AnimatedSmileyFace from './smiley'
import ChatScreen, { ChatMsg } from './Chat'
import SettingsDropdown from '../common/SessionSettings'
import { AnimatedPressable } from '../common/AnimatedPressable'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
// how far to shift up when captions are shown
const SMILEY_SHIFT = -40

export default function HomeScreen() {
  const router = useRouter()
  const chatVisible    = useSharedValue(0)
  const captionVisible = useSharedValue(1)
  const shiftFactor    = useSharedValue(4)   

  const toggleChat = () => {
    chatVisible.value = withTiming(chatVisible.value ? 0 : 1, { duration: 400 })
  }
  const toggleCaptions = () => {
    if (captionVisible.value === 1) {
      captionVisible.value = withTiming(0, { duration: 300 })
      shiftFactor.value    = withTiming(0, { duration: 300 })
    } else {
      captionVisible.value = withTiming(1, { duration: 300 })
      shiftFactor.value    = withTiming(1, { duration: 300 })
    }
  }

  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [{
      translateY: interpolate(
        shiftFactor.value,
        [0, 1],
        [0, SMILEY_SHIFT]
      )
    }]
  }))

  const promptStyle = useAnimatedStyle(() => ({
    opacity: captionVisible.value,
  }))

  const data = useMemo<ChatMsg[]>(
    () => [
      { id: '1', from: 'bot',  text: 'Have you thought about trying to talk with Jason about how you feel about the vacatio..' },
      { id: '2', from: 'user', text: "Not really to be honest, mh it’s been kind of difficult even bringing it up", avatar: 'https://i2.seadn.io/zora/0x12e4527e2807978a49469f8d757abf5e07b32b8f/fafc512ba16da54267e11a35825b6e/0afafc512ba16da54267e11a35825b6e.png?w=1000' },
      // …etc
    ],
    []
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* top bar */}
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

      {/* center block: smiley + prompt */}
      <Animated.View style={[styles.content, wrapperStyle]}>
        <AnimatedSmileyFace />
        <Animated.Text style={[styles.prompt, promptStyle]}>
          Hey how are you{'\n'}feeling today?
        </Animated.Text>
      </Animated.View>

      {/* bottom bar */}
      <View style={styles.bottomBar}>
        <AnimatedPressable onPress={toggleCaptions} style={styles.circleButton} haptics="light">
          <SymbolView name="captions.bubble" size={28} tintColor="#fff" />
        </AnimatedPressable>
        <AnimatedPressable style={styles.micButton} haptics="medium">
          <SymbolView name="microphone" size={32} tintColor="#fff" />
        </AnimatedPressable>
        <AnimatedPressable style={styles.circleButton} haptics="light" onPress={toggleChat}>
          <SymbolView name="ellipsis.message" size={28} tintColor="#fff" />
        </AnimatedPressable>
      </View>

      {/* chat overlay */}
      <ChatScreen visible={chatVisible} data={data} onClose={toggleChat} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topBar: {
    flexDirection: 'row', justifyContent: 'space-between', padding: 16,
  },
  topIconWrapper: {
    width: 32, height: 32, alignItems: 'center', justifyContent: 'center',
  },
  dot: {
    position: 'absolute', bottom: 3.5, right: 3.5,
    width: 10, height: 10, borderRadius: 5, backgroundColor: '#F90',
  },
  content: {
    flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20,
  },
  prompt: {
    marginTop: 24, textAlign: 'center', fontSize: 34, fontWeight: '600',     fontFamily: 'SFPro-Bold',
  },
  bottomBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 24,
  },
  circleButton: {
    backgroundColor: '#181818', width: 56, height: 56, borderRadius: 28,
    alignItems: 'center', justifyContent: 'center',
  },
  micButton: {
    backgroundColor: '#181818', width: 72, height: 72, borderRadius: 36,
    alignItems: 'center', justifyContent: 'center',
  },
})

