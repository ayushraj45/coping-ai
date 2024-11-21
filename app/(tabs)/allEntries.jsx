import { Text, FlatList, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import JournalEntryPane from '../../components/JournalEntryPane'
import SearchBarComponent from '../../components/Searchbar'
//import { useGlobalContext } from '../context/GlobalProvider'
import { useFocusEffect, useRouter } from 'expo-router'
import { useWindowDimensions } from 'react-native'


const allEntries = () => {
  //const { entries, fetchAllEntries, user } = useGlobalContext();
  //const { height } = useWindowDimensions();
//   const router = useRouter();
//   const [searchText, setSearchText] = useState('');
//   const [filteredEntries, setFilteredEntries] = useState(entries);
//   const [refreshing, setRefreshing] = useState(false);

//   const fetchEntries = async () => {
//     setRefreshing(true);
//     try {
//       await fetchAllEntries(user);
//       console.log('refresh happen')
//       setRefreshing(false);
//     } catch (error) {
//       console.error('Error fetching entries:', error);
//       setRefreshing(false); 
//     }
//   };

//   useEffect(() => {
//    fetchEntries(user) 
//   }, []);

//   useFocusEffect(
//     useCallback(() => {
//       fetchEntries(user);
//     }, [])
//   );

//   useEffect(() => {
//     const filtered = entries.filter((item) =>
//       item.title.toLowerCase().includes(searchText.toLowerCase())
//     )
//     .reverse();
//     setFilteredEntries(filtered);
//   }, [searchText, entries]);

  const renderItem = ({ item }) => (
        <JournalEntryPane title={item.title} content={item.content} id={item.id}/>
  );

  const filteredEntries  = [
    { id: '1', title: 'Gratitude', content: 'yoyo'},
    { id: '2', title: 'Gratitude non ', content: ' non yoyo'},
  ]

  return (
      <SafeAreaView style={{
        flex:1,
        backgroundColor:"#FEF8EC",
    }}>
        {/* <SearchBarComponent
         value={searchText}
         onChangeText={(text) => setSearchText(text)}
         /> */}
        <FlatList
          data={filteredEntries}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => (
            <Text>No entries found.</Text>
          )}
          contentContainerStyle={{
            paddingBottom: 130,
          }}
        //   refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={fetchEntries} />
        //   }
        />
      </SafeAreaView>
  )
}


export default allEntries;