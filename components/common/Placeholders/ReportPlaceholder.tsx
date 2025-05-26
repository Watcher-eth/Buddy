import { View, Text } from 'react-native'
import React from 'react'
import { AnimatedPressable } from '../AnimatedPressable'
import { SymbolView } from 'expo-symbols'
import { useRouter } from 'expo-router'

const ReportPlaceholder = () => {
    const router = useRouter()
  return (
    <View style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
    }}>
        <SymbolView name="book.pages" size={50} tintColor="gray" />
      <Text style={{ fontSize: 20, fontWeight: '600', color: '#252525', marginTop: 13 }}>No Reports Yet</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginTop: 6, fontWeight: '400' }}>Start a session to get your first report</Text>
      <AnimatedPressable onPress={() => router.push('/')} style={{ paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20, backgroundColor: '#ededed', marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
        <Text style={{ fontSize: 16, color: '#252525', fontWeight: '700', marginLeft: 4 }}>Start a session</Text>
      </AnimatedPressable>
    </View>
  )
}

export default ReportPlaceholder