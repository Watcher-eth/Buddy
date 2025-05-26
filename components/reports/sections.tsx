// components/Section.tsx
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export type RegularSectionProps = {
  icon: React.ReactElement
  title: string
  content: string
}

export function RegularSection({
  icon,
  title,
  content,
}: RegularSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.paragraph}>{content}</Text>
    </View>
  )
}

export type BulletSectionProps = {
  icon: React.ReactElement
  title: string
  items: string[]
}

export function BulletSection({
  icon,
  title,
  items,
}: BulletSectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        {icon}
        <Text style={styles.title}>{title}</Text>
      </View>
      {items.map((line, i) => (
        <View key={i} style={styles.bulletRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{line}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: '#fefefe',
    fontSize: 21,
    fontWeight: '600',
    marginLeft: 8,
  },
  paragraph: {
    color: '#fefefe',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bullet: {
    color: '#fefefe',
    fontSize: 18,
    lineHeight: 26,
    marginRight: 6,
  },
  bulletText: {
    flex: 1,
    color: '#fefefe',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
  },
})
