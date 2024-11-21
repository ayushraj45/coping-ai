import React, { useState } from 'react';
import { SearchBar } from '@rneui/themed';
import { View, StyleSheet, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const SearchBarComponent = ({value, onChangeText}) => {
const [search, setSearch] = useState("");

const updateSearch = (search) => {
  setSearch(search);
};

const handleCancel = () => {
    Keyboard.dismiss();
  };

return (
  <View style={styles.view}>
    <SearchBar
      placeholder="Search by title..."
      onChangeText={onChangeText}
      value={value}
      showCancel='true'
      onCancel={handleCancel}
      round='true'
      containerStyle={{
        backgroundColor:'transparent',
        borderBlockColor:'transparent',
      }}
      inputContainerStyle={{
        backgroundColor:'#D7D7D7',
      }}
      platform='"ios" | "android"'
      searchIcon={
        <Ionicons name="search-outline" size={24} color="grey" />
      }
      cancelIcon={
        <Ionicons name="close-outline" size={24} color="grey" />      }
      
    />
  </View>
);
};

const styles = StyleSheet.create({
view: {

  marginLeft:20,
  marginHorizontal:20,
}
});

export default SearchBarComponent;
