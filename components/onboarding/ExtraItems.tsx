// src/components/SessionCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SymbolView } from 'expo-symbols';

interface SessionCardProps {
  sessionNumber: number;
  dateString: string;
  struggles: string[];
  observations: string[];
  // (You can add more fields—goals, footerNote, etc.—as needed.)
}

export const SessionCard: React.FC<SessionCardProps> = ({
  sessionNumber,
  dateString,
  struggles,
  observations,
}) => {
  return (
    <View style={styles.cardContainer}>
      {/* Header: Session # and Date */}
      <View style={styles.headerContainer}>
        <Text style={styles.sessionTitle}>Session #{sessionNumber}</Text>
        <Text style={styles.sessionDate}>{dateString}</Text>
      </View>

      {/* Struggles Section */}
      <View style={styles.sectionContainer}>
        <SymbolView
          name="bolt.heart.fill"
          size={20}
          tintColor="#444"
          style={styles.sectionIcon}
        />
        <Text style={styles.sectionTitle}>Struggles</Text>
      </View>
      {struggles.map((line, idx) => (
        <View key={`struggle-${idx}`} style={styles.bulletRow}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.bulletText}>{line}</Text>
        </View>
      ))}

      {/* Observations Section */}
      <View style={[styles.sectionContainer, { marginTop: 16 }]}>
        <SymbolView
          name="book.pages.fill"
          size={20}
          tintColor="#444"
          style={styles.sectionIcon}
        />
        <Text style={styles.sectionTitle}>Observations</Text>
      </View>
      {observations.map((line, idx) => (
        <View key={`obs-${idx}`} style={styles.bulletRow}>
          <Text style={styles.bulletText}>{line}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 12,
    marginHorizontal: 16,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,

    // iOS drop shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,

    // Android drop shadow
    elevation: 4,
  },
  headerContainer: {
    marginBottom: 16,
  },
  sessionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
  },
  sessionDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bulletPoint: {
    fontSize: 14,
    lineHeight: 20,
    marginRight: 6,
    color: '#444',
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
});
