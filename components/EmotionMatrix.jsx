import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import EmotionButton from "../components/EmotionButton";

const EmotionMatrix = ({onEmotionPress, selectedEmotion, isDisabled }) => {

  const emotions = [
    { id: '1', text: 'Happy', color: '#FFD88D', prompt: 'I feel happy' },
    { id: '2', text: 'Sad', color: '#BCCBFF' , prompt: 'I feel sad'},
    { id: '3', text: 'Excited', color: '#FFFA8A', prompt: 'I feel excited' },
    { id: '4', text: 'Angry', color: '#FFB0B0' ,prompt: 'I am angry' },
    { id: '5', text: 'Worry', color: '#AEA7A7', prompt: 'I am worried' },
    { id: '6', text: 'Anxious', color: '#D8B1FF' , prompt: 'I feel anxious'},
    { id: '7', text: 'Insecure', color: '#849457' , prompt: 'I feel insecure'},
    { id: '8', text: 'Triggered', color: '#8CA5FF' , prompt: 'I feel triggered'},
    { id: '9', text: 'Panic', color: '#FFFFFF' , prompt: 'I feel panicked'},

  ];

  return (
    <View style={styles.maincontainer}>
    <View style={styles.container}>

    <FlatList
      data={emotions.slice(0,5)}
      renderItem={({ item }) => (
        <EmotionButton 
          text={item.text} 
          color={item.color} 
          onPress={() => onEmotionPress(item)}
          isSelected={selectedEmotion && selectedEmotion.id === item.id}
          isDisabled={isDisabled || (selectedEmotion && selectedEmotion.id !== item.id)}
        />
      )}
      pagingEnabled={false}
      keyExtractor={item => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContent}
    />
  </View>
  <View style={styles.container}>

        <FlatList
      data={emotions.slice(5,9)}
      renderItem={({ item }) => (
        <EmotionButton 
          text={item.text} 
          color={item.color} 
          onPress={() => onEmotionPress(item)}
          isSelected={selectedEmotion && selectedEmotion.id === item.id}
          isDisabled={isDisabled || (selectedEmotion && selectedEmotion.id !== item.id)}
        />
      )}
      pagingEnabled={false}
      keyExtractor={item => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContent}
    />
  </View>

  </View>
);
};

const styles = StyleSheet.create({
container: {
  marginVertical: 7,
  justifyContent: 'space-between',
},
flatListContent: {
},
});

export default EmotionMatrix