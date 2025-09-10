import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack } from 'expo-router';

export default function SustainabilityScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Sustainability Strategy' }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.lead}>
          As a responsible energy provider, we are committed to creating long-term value for our
          people, business and society.
        </Text>

        <Text style={styles.paragraph}>
          We have a long legacy as a responsible provider of energy to the world and a key catalyst for
          the UAE's economic growth and diversification. In this, we follow the vision established by the late
          Sheikh Zayed bin Sultan Al Nahyan, the UAE's Founding Father, to balance economic development with
          environmental responsibility.
        </Text>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=600&fit=crop' }}
          style={styles.hero}
          resizeMode="cover"
        />

        <Text style={styles.sectionTitle}>Our 2030 Sustainability Strategy</Text>
        <Text style={styles.paragraph}>
          Across our operations we aim to reach Net Zero by 2045 — and our 2030 Sustainability Strategy is a key
          roadmap to achieving this goal. We are continuously implementing sustainable practices to maintain our
          leading role in the energy transition and safeguard the communities and environments in which we operate.
        </Text>

        <Text style={styles.subsection}>Climate, Emissions and Energy</Text>
        <Text style={styles.listItem}>• Advance towards our Net Zero by 2045 ambition</Text>
        <Text style={styles.listItem}>• Achieve a 5% improvement in energy efficiency (2018 base)</Text>
        <Text style={styles.listItem}>• Maintain upstream methane intensity &lt;0.15% by 2025</Text>
        <Text style={styles.listItem}>• Produce 1 million tonnes of low‑carbon ammonia per annum by 2025</Text>
        <Text style={styles.listItem}>• Reduce operational emissions intensity by 25% by 2030</Text>
        <Text style={styles.listItem}>• Safely sequester 10 million tonnes of CO2 per year by 2030</Text>
        <Text style={styles.listItem}>• Capture 5% of the global low‑carbon hydrogen market by 2030</Text>
        <Text style={styles.listItem}>• Achieve near zero methane emissions in our operations by 2030</Text>
        <Text style={styles.listItem}>• Deploy 100 GW of renewables generation capacity through Masdar by 2030</Text>
        <Text style={styles.listItem}>• Achieve zero routine flaring by 2030</Text>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=600&fit=crop' }}
          style={styles.inlineImage}
          resizeMode="cover"
        />

        <Text style={styles.subsection}>Environment</Text>
        <Text style={styles.listItem}>• Minimize environmental impact through biodiversity, water, and waste management</Text>
        <Text style={styles.listItem}>• Keep freshwater consumption below 0.5% of total water use</Text>
        <Text style={styles.listItem}>• Plant 10 million mangroves by 2030</Text>

        <Text style={styles.subsection}>Economic and Social Contribution</Text>
        <Text style={styles.listItem}>• Maintain an In‑Country Value score of more than 50% across our value chain</Text>
        <Text style={styles.listItem}>• Localize $24.5 billion (AED 90 billion) products into procurement by 2030</Text>
        <Text style={styles.listItem}>• Create 25,000 new private‑sector jobs for UAE Nationals by 2028</Text>
        <Text style={styles.listItem}>• Return $5.4 billion (AED 20 billion) back into the UAE’s economy from 2025 to 2029</Text>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1496302662116-35cc4f36df92?w=1200&h=600&fit=crop' }}
          style={styles.inlineImage}
          resizeMode="cover"
        />

        <Text style={styles.subsection}>Workforce Diversity and Development</Text>
        <Text style={styles.listItem}>• Appoint a minimum of one woman to every board by 2025</Text>
        <Text style={styles.listItem}>• Achieve 60% Emiratization by 2025</Text>
        <Text style={styles.listItem}>• Achieve 30% women representation in middle and senior management by 2028</Text>

        <Text style={styles.subsection}>Health, Safety and Security</Text>
        <Text style={styles.listItem}>• Be the global benchmark for safety and security with 100% HSE</Text>

        <Text style={styles.subsection}>Business Sustainability</Text>
        <Text style={styles.listItem}>• Ensure fair, transparent, and risk‑conscious business operations and governance</Text>
        <Text style={styles.listItem}>• Integrate risk management across operations and planning</Text>

        <View style={{ height: 24 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  content: { padding: 20 },
  lead: { fontSize: 16, color: '#374151', lineHeight: 24, marginBottom: 12 },
  paragraph: { fontSize: 15, color: '#4b5563', lineHeight: 24, marginBottom: 12 },
  hero: { width: '100%', height: 160, borderRadius: 12, marginVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginTop: 8, marginBottom: 8 },
  subsection: { fontSize: 16, fontWeight: '600', color: '#1f2937', marginTop: 16, marginBottom: 8 },
  listItem: { fontSize: 14, color: '#374151', lineHeight: 22, marginBottom: 6 },
  inlineImage: { width: '100%', height: 140, borderRadius: 12, marginVertical: 12 },
});


