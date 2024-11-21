import React from 'react';
import { View, StyleSheet } from 'react-native';

const DotIndicator = ({ totalDots, currentIndex }) => {
  return (
    <View style={styles.container}>
      {[...Array(totalDots)].map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === currentIndex ? styles.activeDot : styles.inactiveDot
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#D9D9D9', // Change color as needed
    borderColor: '#D9D9D9'
  },
  inactiveDot: {
    backgroundColor: '#0B243C', // Change color as needed
    borderColor: '#D9D9D9',
    borderRadius: 5,
  },
});

export default DotIndicator;