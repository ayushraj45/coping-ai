import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import InstaPromptButton from './InstaPromptButton';

const InstaPromptList = ({onPromptPress, selectedEmotion, isDisabled }) => {
    const emotions = [
        { id: '1', text: 'Gratitude', color: '#FFD88D', prompt: 'Gratitude' },
        { id: '2', text: 'Relationships', color: '#BCCBFF' , prompt: 'Relationships'},
        { id: '3', text: 'Goals', color: '#FFFA8A', prompt: 'Goals' },
        { id: '4', text: 'Fear', color: '#FFB0B0' ,prompt: 'Fear' },

      ];
    
      return (
        <View style={styles.maincontainer}>
        <View style={styles.container}>
    
        <FlatList
          data={emotions.slice(0,2)}
          renderItem={({ item }) => (
            <InstaPromptButton 
              text={item.text} 
              color={item.color} 
              onPress={() => onPromptPress(item)}
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
          data={emotions.slice(2,4)}
          renderItem={({ item }) => (
            <InstaPromptButton 
              text={item.text} 
              color={item.color} 
              onPress={() => onPromptPress(item)}
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
    }
    });

export default InstaPromptList