import { SymbolView } from 'expo-symbols'
import React, { useState } from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  TextInput,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';

const { height } = Dimensions.get('window');

export type ChatMsg = {
  id: string;
  from: 'bot' | 'user';
  text: string;
  avatar?: string;
};

type Props = {
  visible: Animated.SharedValue<number>;
  data: ChatMsg[];
  onClose: () => void;
};

export default function ChatScreen({ visible, data, onClose }: Props) {
  const [input, setInput] = useState('');

  const slideStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(visible.value, [0, 1], [height, 0]),
      },
    ],
  }));

  return (
    <Animated.View style={[StyleSheet.absoluteFillObject, styles.container, slideStyle]}>
      <FlatList
        data={data}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View
            style={[
              styles.row,
              item.from === 'user' ? styles.rowUser : styles.rowBot,
            ]}
          >
            {item.from === 'bot' && (
              <Image source={require('../../assets/BuddyLogo.png')} style={styles.avatar} />
            )}
            <Text style={[styles.bubble, item.from === 'user' && styles.bubbleUser]}>
              {item.text}
            </Text>
            {item.from === 'user' && item.avatar && (
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            )}
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* input + send */}
      <View style={styles.inputWrapper}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Whats on your mind today.."
          style={styles.textInput}
        />
        <Pressable onPress={() => {/* TODO: send message */}} style={styles.sendButton}>
            <SymbolView name="arrow.up" size={19} weight='bold' tintColor="#fff" />
        </Pressable>
      </View>

      {/* switch back to voice */}
      <Pressable onPress={onClose} style={styles.switchWrapper}>
        <Text style={styles.switchText}>Wanna talk instead?</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 10,
  },
  list: {
    paddingBottom: 160, // make room for input + link
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  rowBot: {
    justifyContent: 'flex-start',
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  bubble: {
    maxWidth: '75%',
    fontSize: 17,
    fontWeight: '700',
    color: '#181818',
  },
  bubbleUser: {
    textAlign: 'right',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginHorizontal: 12,
  },

  inputWrapper: {
    position: 'absolute',
    left: 13,
    right: 13,
    bottom: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    // elevation for Android
    elevation: 2,

  },
  textInput: {
    flex: 1,
    height: 40,
    borderRadius: 24,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
    // shadow for iOS
  },
  sendButton: {
    marginLeft: 5,
marginRight: 5,
    backgroundColor: "#181818",
    padding: 6,
    borderRadius: 24,
  },
  sendIcon: {
    width: 24,
    height: 24,
  },

  switchWrapper: {
    position: 'absolute',
    bottom: 25,
    alignSelf: 'center',
  },
  switchText: {
    fontSize: 14,
    color: '#cecece',
  },
});
