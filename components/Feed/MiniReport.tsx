// components/Feed/MiniReport.tsx
import React from 'react'
import {
  Pressable,
  View,
  Text,
  StyleSheet,
} from 'react-native'
import {AnimatedPressable} from '../common/AnimatedPressable'
import LinearGradient from 'react-native-linear-gradient'

export type MiniReportType = {
  id: string
  title: string
  date: string    // ISO date string
  snippet: string // the first few sentences of your report
}

type MiniReportProps = {
  report: MiniReportType
  onPress: (id: string) => void
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function MiniReport({ report, onPress }: MiniReportProps) {
  return (
    <AnimatedPressable
      onPress={() => onPress(report.id)}
      style={styles.wrapper}
      android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{formatDate(report.date)}</Text>
        <Text style={styles.date}>{report.title}</Text>
        <Text style={styles.context}>Summary</Text>
        <Text style={styles.snippet} numberOfLines={3}>
          {report.snippet}
        </Text>

        <LinearGradient
          colors={['rgba(255, 255, 255, 0)', '#ffffff']}
          style={styles.fade}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </View>
    </AnimatedPressable>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    paddingBottom: 4,
    height: 200,
    position: 'relative',   // <— allow absolute children

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 8,

    // Android shadow
    elevation: 4,
  },
  title: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: '600',
    color: '#111',
  },
  date: {
    fontSize: 13,
    fontWeight: '400',
    color: '#666',
    marginBottom: 12,
    marginTop: 4,
  },
  context: {
    fontSize: 11,
    fontWeight: '600',
    color: '#121212',
    opacity: 0.8,
  },
  snippet: {
    fontSize: 10,
    fontWeight: '400',
    color: '#333',
    lineHeight: 13,
    opacity: 0.8,
  },
  fade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -2,
    height: 32,           // tweak to taste
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,

  },

})
