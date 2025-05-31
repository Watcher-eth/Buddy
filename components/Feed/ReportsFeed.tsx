// app/reports/index.tsx
import React, { useMemo, useState } from 'react'
import {
  View,
  Text,
  SectionList,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from 'react-native'
import { ChevronRight, Search, Settings } from 'lucide-react-native'
import { useRouter } from 'expo-router'
import { MiniReport, MiniReportType } from './MiniReport'
import ReportPlaceholder from '../common/Placeholders/ReportPlaceholder'
import HistoryPlaceholder from '../common/Placeholders/HistoryPlaceholder'
import { AnimatedPressable } from '../common/AnimatedPressable'

type SectionData = {
  title: string
  data: MiniReportType[][]
}

// demo data
const reports: MiniReportType[] = [
  {
    id: '1',
    title: 'Report 1',
    date: '2023-01-01',
    snippet:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.',
  },
  {
    id: '2',
    title: 'Report 2',
    date: '2023-01-02',
    snippet: 'Short snippet.',
  },
  {
    id: '3',
    title: 'Report 3',
    date: '2023-01-03',
    snippet:
      'Another longer snippet to show two items per row even when odd count.',
  },
  {
    id: '4',
    title: 'Report 4',
    date: '2023-01-04',
    snippet:
      'And yet another. It will wrap nicely.',
  },
]

export default function ReportsScreen() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'Reports' | 'History'>('Reports')

  // chunk into rows of 2
  const chunk = <T,>(arr: T[], size: number): T[][] => {
    const out: T[][] = []
    for (let i = 0; i < arr.length; i += size) {
      out.push(arr.slice(i, i + size))
    }
    return out
  }

  const sections = useMemo<SectionData[]>(() => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    const groups: Record<string, MiniReportType[]> = {
      Today: [],
      Yesterday: [],
      Older: [],
    }

    reports.forEach((r) => {
      const d = new Date(r.date)
      if (
        d.getFullYear() === today.getFullYear() &&
        d.getMonth() === today.getMonth() &&
        d.getDate() === today.getDate()
      ) {
        groups.Today.push(r)
      } else if (
        d.getFullYear() === yesterday.getFullYear() &&
        d.getMonth() === yesterday.getMonth() &&
        d.getDate() === yesterday.getDate()
      ) {
        groups.Yesterday.push(r)
      } else {
        groups.Older.push(r)
      }
    })

    return (Object.entries(groups) as [string, MiniReportType[]][])
      .filter(([, arr]) => arr.length > 0)
      .map(([title, arr]) => ({
        title,
        data: chunk(arr, 2),
      }))
  }, [])

  const onPressReport = (id: string) => {
    router.push(`/[id]`)
  }

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.header}>
        <Settings color="#111" width={24} height={24} strokeWidth={3} />
        <Text style={styles.headerTitle}>Reports</Text>
        <AnimatedPressable onPress={() => router.push('/')}><ChevronRight color="#111" width={28} height={28} strokeWidth={3} /></AnimatedPressable>
      </View>
      <View style={styles.placeholder} />
      <View style={styles.tabs}>
        {(['Reports', 'History'] as const).map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab && styles.tabActive,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      {activeTab === 'Reports' ? (
        <>
          {sections.length >  0? <SectionList
            sections={sections}
            keyExtractor={(row, i) =>
              row.map((r) => r.id).join('_') + i
            }
        
            renderItem={({ item: row }) => (
              <View style={styles.row}>
                {row.map((rep, idx) => (
                  <View
                    key={rep.id}
                    style={[
                      styles.halfCard,
                      idx < row.length - 1 && styles.gapRight,
                    ]}
                  >
                    <MiniReport
                      report={rep}
                      onPress={onPressReport}
                    />
                  </View>
                ))}
                {row.length === 1 && <View style={styles.halfCard} />}
              </View>
            )}
            contentContainerStyle={styles.listContent}
            stickySectionHeadersEnabled
          /> : <View style={styles.other}>
<ReportPlaceholder/></View>}
        </>
      ) : (
        <View style={styles.other}>
          <HistoryPlaceholder/>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 22,
    backgroundColor: '#fefefe',
    elevation: 2,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    fontFamily: 'SFPro-Bold',
  },

  // --- tabs ---
  tabs: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#111',
  },
  tabText: {
    color: '#888',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SFPro-Bold',
  },
  tabTextActive: {
    color: '#111',
  },

  placeholder: {
    backgroundColor: 'green',
    height: 120,
    margin: 16,
    borderRadius: 20,
  },

  sectionHeader: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '700',
    color: '#555',
    fontFamily: 'SFPro-Bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    marginTop: 16,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  halfCard: {
    flex: 1,
  },
  gapRight: {
    marginRight: 10,
  },

  other: {
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
