import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Purchases, { PurchasesOffering } from 'react-native-purchases';
import { useGlobalContext } from '../app/context/GlobalProvider';
import RotatingLogoLoader from './RotatingLogoLoader';
import { getAnalytics, logEvent } from '@react-native-firebase/analytics';

const PricingOption = ({ identifier, title, description, isSelected, onSelect, isBestValue,perweek, price, packageType }) => (
    <TouchableOpacity 
      style={[styles.pricingOption, isSelected && styles.selectedOption]}
      onPress={onSelect}
    >
      {title === 'Coping Pro Annual' ? <Text style={styles.optionTitle}>{price} / Per Year </Text> : <Text style={styles.optionTitle}>{price} / Per Month </Text>} 
      <Text style={styles.perweek}>{perweek} / Per Week </Text>
      <Text style={styles.optionDescription}>{title}</Text>
      <Text style={styles.optionDescription}>{description}</Text>

      {isBestValue && <Text style={styles.bestValue}>Best Value</Text>}
    </TouchableOpacity>
  );

const PricingPanel = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [products, setProducts] = useState([]);
  const { updateUserSubscriptionStatus } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const analytics = getAnalytics();


  useEffect(() => {
    console.log('Current products:', products);
    
  }, [products]);


  useEffect(() => {

    const productSetup = async () => {
    await logEvent(analytics,'init_SubscriptionPage');
      try {
        const result = await fetchProducts();
        if (result) {  // Only set isLoading false if we successfully got products
          setIsLoading(false);
          console.log('current offering log ' + products) 

        }
      } catch (error) {
        console.error('Error in product setup:', error);
      }
    };
    
    if (products.length === 0) {
      productSetup();
    }
  }, []); 
  
  const fetchProducts = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      const currentOffering = offerings.current;
      if (currentOffering && currentOffering.availablePackages.length > 0) {
        setProducts(currentOffering.availablePackages);

        return true;
      }
      setTimeout(() => fetchProducts(), 1000);
      return false;
    } catch (error) {
      console.error('Error fetching products:', error);
      setTimeout(() => fetchProducts(), 1000);
      return false;
    }
  };

  const handlePurchase = async (selectedPlan) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(selectedPlan);
      
      // Check if user has access to your entitlement
      const entitlementId = 'pro';
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
  
  const onPurchasePress = async (selectedPlan) => {
    console.log('on purchase press: ' + (selectedPlan));
    await Purchases.purchasePackage(selectedPlan);
    // const result = await handlePurchase(selectedPlan);
    
    // if (result.success && result.subscriptionActive) {
    //   // Update your backend/database here
    //   // Example API call:
    //   try {
    //     await fetch('YOUR_API_ENDPOINT', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         userId: 'CURRENT_USER_ID',
    //         subscriptionStatus: 'active',
    //         expirationDate: result.expirationDate,
    //         originalPurchaseDate: result.originalPurchaseDate
    //       })
    //     });
    //   } catch (error) {
    //     console.error('Error updating backend:', error);
    //   }
      
    //   // Navigate to premium content or update UI
    //   Alert.alert('Success', 'Thank you for subscribing!');
    //}
  };

  const onPurchase = async (pack) => {
		// Purchase the package
    setIsLoading(true)
    await logEvent(analytics, 'click_purchasePlan');
    try{
      await Purchases.purchasePackage(pack).then(()=>{setIsLoading(false)});

      if(pack.product.identifier === 'pro_month'){
        //console.log('monthly log works; ', pack.product.identifier)
        updateUserSubscriptionStatus('Pro Monthly')
      }
      else if(pack.product.identifier === 'pro_annual'){
        updateUserSubscriptionStatus('Pro Annual')
      }else{}
    }catch (e){
        console.log(e)
        setIsLoading(false);

    }
	};

  return (
    <View style={styles.container}>
      <RotatingLogoLoader isLoading={isLoading}/>
      <Text style={{fontFamily:'bSemi', fontSize:15, color:'red'}}> INTRODUCTORY OFFER: ALL PRICES ARE 50% OFF!</Text>

				{products.map((pack) => (
          <PricingOption
          key={pack.identifier}
         // onPress={() => onPurchase(pack)}
          title={pack.product.title}
          description={pack.product.description}
          price={pack.product.priceString}
          perweek={pack.product.pricePerWeekString}
          isSelected={selectedPlan?.identifier === '$rc_annual'}
          onSelect={() => { onPurchase(pack) }}        
          />
				))}
		
      {/* <TouchableOpacity style={styles.trialButton} onPress={onPurchasePress}>
        <Text style={styles.trialButtonText}>Remove All Limits</Text>
      </TouchableOpacity> */}
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
    backgroundColor: '#011C2D',
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