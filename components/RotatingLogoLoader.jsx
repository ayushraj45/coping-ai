import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, Easing, Modal, StyleSheet } from 'react-native';
import SmallLogo from '../assets/icons/SmallLogo';
import IndexLogo from '../assets/icons/IndexLogo';

const RotatingLogoLoader = ({ isLoading }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      rotateAnim.setValue(0);
    }
  }, [isLoading]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isLoading}
      onRequestClose={() => {}}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <Animated.View style={{ transform: [{ rotate: spin }] }}>
           <IndexLogo width={185} height={185}/>
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    // backgroundColor: '#FFFFFF',
    // height: 150,
    // width: 150,
    // borderRadius: 10,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-around'
  }
});

export default RotatingLogoLoader;