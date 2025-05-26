// components/Report.tsx
import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native'
import {Checkbox} from '../common/Checkbox'
import { AnimatedPressable } from '../common/AnimatedPressable'
import { BulletSection, RegularSection } from './sections'
import { SymbolView } from 'expo-symbols'
import { useRouter } from 'expo-router'
import { ActivityRings } from './MoodScore'

type ReportProps = {
  reportId: string
  onRate?: () => void
}

function useGetReport(reportId: string) {
  return {
    data: {
      avatarEmoji: '😊',
      checkInNumber: 1,
      date: '2023-01-01',
      summary: 'Hey Martha it was so great to sit down with you today. I know it’s been a whirlwind, and I’m really glad you felt comfortable opening up about what’s been weighing on your heart.',
      struggles: ['Hey Martha it was so great to sit down with ', 'you today. I know it’s been a whirlwind, and ', 'I’m really glad you felt comfortable opening', 'up about what’s been weighing on your '],
      moodScore: 10,
      moodBreakdown: [
        { label: 'Happy', value: 1, color: '#FF006E' },
        { label: 'Sad', value: 1, color: '#FFD11A' },
        { label: 'Neutral', value: 1, color: '#00C8FF' },
      ],
      observations: ['Hey Martha it was so great to sit down with you today. I know it’s been a whirlwind, and I’m really glad you felt comfortable opening up about what’s been weighing on your heart.', 'Hey Martha it was so great to sit down with you today. I know it’s been a whirlwind, and I’m really glad you felt comfortable opening up about what’s been weighing on your heart. ', 'I am feeling well today.'],
      goals: ['Letting Go with Kindness', 'Try setting one tiny goal for the week', 'Jot down one thing you’re proud of each day'],
      footerNote: 'I am feeling well today.',
    },
    isLoading: false,
    error: null,
  }
}

export default function Report({ reportId, onRate }: ReportProps) {
  const { data, isLoading, error } = useGetReport(reportId)
  const [goalsState, setGoalsState] = useState<Record<string, boolean>>({})
const router = useRouter()
  const toggleGoal = useCallback((label: string) => {
    setGoalsState(prev => ({ ...prev, [label]: !prev[label] }))
  }, [])

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }
  if (error || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load report.</Text>
      </View>
    )
  }

  const {
    avatarEmoji,
    checkInNumber,
    date,
    summary,
    struggles,
    moodScore,
    moodBreakdown, 
    observations,
    goals,
    footerNote,
  } = data

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"}}><Text style={styles.avatar}>{avatarEmoji}</Text>
        <AnimatedPressable onPress={() => router.back()}><SymbolView name="xmark" weight="heavy"  size={20} tintColor="#fff" style={{marginRight: 10}} /></AnimatedPressable></View>
        <Text style={styles.title}>Check-In #{checkInNumber}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <RegularSection
        icon={<SymbolView name="text.quote" size={22} tintColor="#fff" />}
        title="Summary"
        content={summary}
      />

      <BulletSection
        icon={<SymbolView name="bolt.heart.fill" size={22} tintColor="#fff" />}
        title="Struggles"
        items={struggles}
      />

      <RegularSection
        icon={<SymbolView name="gauge.with.dots.needle.67percent" size={22} tintColor="#fff" />}
        title="Mood Score"
        content={''} 
      />
<ActivityRings values={[0.85, 0.7, 0.34]} />

      <View style={styles.legend}>
        {moodBreakdown.map((b, i) => (
          <View style={styles.legendItem} key={i}>
            <View style={[styles.legendColor, { backgroundColor: b.color }]} />
            <Text style={styles.legendLabel}>{b.label}</Text>
          </View>
        ))}
      </View>

      <RegularSection
        icon={<SymbolView name="book.pages.fill" size={22} tintColor="#fff" />}
        title="Observations"
        content={observations.join('\n\n')}
      />

      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dividerLabel}>Goals</Text>
        <View style={styles.divider} />
      </View>

      {goals.map((g, i) => (
        <View style={styles.goalRow} key={i}>
          <Checkbox
            checked={!!goalsState[g]}
            onPress={() => toggleGoal(g)}
            size={24}
            colorChecked="#A4FFAF"
            colorUnchecked="#fff"
          />
          <Text style={styles.goalLabel}>{g}</Text>
        </View>
      ))}

      <AnimatedPressable
        style={styles.rateButton}
        onPress={onRate}
        haptics="medium"
      >
        <SymbolView name="pencil.and.scribble" size={25} style={{ marginRight: 5 }} tintColor="#101010" />
        <Text style={styles.rateText}>Rate this session</Text>
      </AnimatedPressable>

      {footerNote ? (
        <Text style={styles.footer}>{footerNote}</Text>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 55,
    backgroundColor: '#1A1A1A',
  },
  center: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  error: {
    color: '#fff',
  },
  header: {
    marginBottom: 24,
  },
  avatar: {
    fontSize: 70,
    marginVertical: 8,
    
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  date: {
    color: '#aaa',
    fontSize: 16,
    marginTop: 4,
  },
  moodChart: {
    alignSelf: 'center',
    marginVertical: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    marginTop: 35,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendLabel: {
    color: '#fff',
    fontSize: 14,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#444',
  },
  dividerLabel: {
    marginHorizontal: 12,
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
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
  rateButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 32,
    alignItems: 'center',
    marginVertical: 24,
    marginBottom: 15,
  },
  rateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#101010',

  },
  footer: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 0,
    marginBottom: 10,
    fontWeight: '600',
  },
})
