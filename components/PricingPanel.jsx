import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Purchases, { PurchasesOffering } from 'react-native-purchases';


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

  const fetchProducts = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      if (offerings?.current?.availablePackages) {
        console.log(offerings.current.availablePackages);
        return offerings.current.availablePackages;
      }
      return [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };

  const handlePurchase = async (selectedPlan) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(selectedPlan);
      
      // Check if user has access to your entitlement
      const entitlementId = 'YOUR_ENTITLEMENT_ID';
      if (customerInfo.entitlements.active[entitlementId]) {
        // User has access to entitlement
        return {
          success: true,
          subscriptionActive: true,
          expirationDate: customerInfo.entitlements.active[entitlementId].expirationDate,
          originalPurchaseDate: customerInfo.entitlements.active[entitlementId].originalPurchaseDate
        };
      }
      return {
        success: true,
        subscriptionActive: false
      };
    } catch (error) {
      if (!error.userCancelled) {
        Alert.alert('Error', 'Purchase failed: ' + error.message);
      }
      return {
        success: false,
        error: error.message
      };
    }
  };
  
  const onPurchasePress = async () => {
    const result = await handlePurchase(selectedPlan);
    
    if (result.success && result.subscriptionActive) {
      // Update your backend/database here
      // Example API call:
      try {
        await fetch('YOUR_API_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 'CURRENT_USER_ID',
            subscriptionStatus: 'active',
            expirationDate: result.expirationDate,
            originalPurchaseDate: result.originalPurchaseDate
          })
        });
      } catch (error) {
        console.error('Error updating backend:', error);
      }
      
      // Navigate to premium content or update UI
      Alert.alert('Success', 'Thank you for subscribing!');
    }
  };

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
      <TouchableOpacity style={styles.trialButton} onPress={onPurchasePress}>
        <Text style={styles.trialButtonText}>Get Coping Pro</Text>
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