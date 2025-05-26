// components/TabSelector.tsx
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

type Tab = { key: string; label: string }

type TabSelectorProps = {
  tabs: Tab[]
  selectedKey: string
  onSelect: (key: string) => void
}

export function TabSelector({ tabs, selectedKey, onSelect }: TabSelectorProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isSelected = tab.key === selectedKey
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onSelect(tab.key)}
            activeOpacity={0.7}
          >
            <Text style={[styles.label, isSelected && styles.labelActive]}>
              {tab.label}
            </Text>
            {isSelected && <View style={styles.indicator} />}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: '#CCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
    color: '#AAA',
  },
  labelActive: {
    color: '#000',
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '100%',
    backgroundColor: '#000',
  },
})
