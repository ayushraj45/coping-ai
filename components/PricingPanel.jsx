import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PricingOption = ({ title, description, isSelected, onSelect, isBestValue }) => (
    <TouchableOpacity 
      style={[styles.pricingOption, isSelected && styles.selectedOption]}
      onPress={onSelect}
    >
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionDescription}>{description}</Text>
      {isBestValue && <Text style={styles.bestValue}>Best Value</Text>}
    </TouchableOpacity>
  );

const PricingPanel = () => {
  const [selectedPlan, setSelectedPlan] = useState('annual');

  return (
    <View style={styles.container}>
      <PricingOption
        title="Annual"
        description="First 30 days free - Then $999/Year"
        isSelected={selectedPlan === 'annual'}
        onSelect={() => setSelectedPlan('annual')}
        isBestValue={true} 
      />
      <PricingOption
        title="Monthly"
        description="First 7 days free - Then $99/Month"
        isSelected={selectedPlan === 'monthly'}
        onSelect={() => setSelectedPlan('monthly')}
      />
      <TouchableOpacity style={styles.trialButton}>
        <Text style={styles.trialButtonText}>Start 30-day free trial</Text>
      </TouchableOpacity>
      <Text style={styles.termsText}>
        By placing this order, you agree to the Terms of Service and Privacy Policy. Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
   
  },
  pricingOption: {
    backgroundColor: 'rgba(9, 39, 101, 0.05)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#0D368C',
    backgroundColor: 'rgba(9, 39, 101, 0.05)',
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  bestValue: {
     position: 'absolute',
     top: 5,
     right: 5,
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
  },
  trialButton: {
    backgroundColor: '#0D368C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  trialButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    marginTop: 10,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default PricingPanel;