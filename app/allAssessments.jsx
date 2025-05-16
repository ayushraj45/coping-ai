import { Text, FlatList, RefreshControl, Dimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import JournalEntryPane from '../components/JournalEntryPane'
import SearchBarComponent from '../components/Searchbar'
import { useGlobalContext } from './context/GlobalProvider'
import { router, useFocusEffect, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import RotatingLogoLoader from '../components/RotatingLogoLoader'


const allAssessments = () => {
    const { getAllAssessments , user} = useGlobalContext();
    const [searchText, setSearchText] = useState('');
    const [assessments, setAssessments] = useState([]); // Initialize as empty array
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true); // Initial loading state is TRUE
    const [filteredEntries, setFilteredEntries] = useState([]); // Initialize filteredEntries as an empty array

    const { width, height } = Dimensions.get('screen');

  
    const fetchData = async () => {
     
        if (!loading) { 
           setRefreshing(true);
        }

        try {
            if (!user?.id) {
              
                console.warn('User ID not available, cannot fetch assessments.');
                 setAssessments([]); 
                 setLoading(false);
                 setRefreshing(false);
                return;
            }

            console.log('Fetching assessments for user ID:', user.id);
            const assessmentData = await getAllAssessments(user.id);
            console.log('Fetch successful');
            setAssessments(assessmentData);

        } catch (error) {
            console.error('Error fetching entries:', error);
             setAssessments([]); 
        } finally {
            setRefreshing(false); 
            setLoading(false); 
        }
    };

    
    useFocusEffect(
        useCallback(() => {
            console.log('Screen focused, attempting to fetch data...');
            fetchData();
        }, [user?.id]) // Dependency array includes user.id to refetch if user changes
    );

    // useEffect(() => {
    //      if (!Array.isArray(assessments)) {
    //          setFilteredEntries([]);
    //          return;
    //      }
    //     const filtered = assessments.filter((item) =>
    //         item && item.averageScore.includes(searchText.toLowerCase())
    //     )
    //     .reverse();

    //     setFilteredEntries(filtered);

    // }, [searchText, assessments]); 


    const renderItem = useCallback(({ item }) => {
        const timeTakenString = item?.timeTaken ?
                                new Date(item.timeTaken).toLocaleString() 
                                : 'N/A'; 

        return (
            item?.id ? (
                <JournalEntryPane
                    title={`Total Score: ${item.averageScore ?? 'N/A'}`} 
                    content={`Time Taken: ${timeTakenString}`}
                    id={item.id}
                    del={false}
                    type={'assessment'}
                />
            ) : null 
        );
    }, []);


     const renderListEmptyComponent = useCallback(() => {
        if (!loading && assessments.length === 0) {
            return (
                <Text style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    fontFamily: 'bSemi',
                    marginTop: height * 0.35
                }}>
                    No assessments found.
                </Text>
            );
        }
        return null;
    }, [loading, assessments.length, height]); 


    return (
        <SafeAreaView style={{
            width: width, height: height, 
            backgroundColor:"#FEF8EC",
        }}>
          
             <RotatingLogoLoader isLoading={loading} />

         
            <> 
                <TouchableOpacity onPress={()=> { router.back() }}>
                    <Ionicons name="chevron-back" size={30} color="black" />
                </TouchableOpacity>



                <FlatList
                    data={assessments} 
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item?.id ? item.id.toString() : index.toString()}
                    ListEmptyComponent={renderListEmptyComponent}
                    contentContainerStyle={{
                        paddingBottom: 130,
                       
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={fetchData}
                        />
                    }
                />
            </>
          
        </SafeAreaView>
    );
}

export default allAssessments;