import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import SmallLogo from '../assets/icons/SmallLogo';
import { Ionicons } from '@expo/vector-icons';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useRouter } from 'expo-router';
import { useGlobalContext } from '../app/context/GlobalProvider';

const JournalEntryPane = ({title, content, id, del, type}) => {
  //console.log(id)
  const router = useRouter();
//  const { deleteEntry , refreshUserData} = useGlobalContext();
  const { deleteEntry } = useGlobalContext();


  const handlePress = () => {
    if(type === 'assessment'){
      console.log('Pressed entry with ID:', id);
      router.push({
        pathname: `/assessment/[id]`,
        params: { id: id }
      });
    }
    else if (type === 'plan'){
      console.log('Pressed entry with ID:', id);
      router.push({
        pathname: `/plan/[id]`,
        params: { id: id }
      });
    }
    else {
      console.log('Pressed entry with ID:', id);
      router.push({
        pathname: `/entry/[id]`,
        params: { id: id }
      });
    };
  }

  const handleDeletePress = async () => {
    console.log('delete clicked')
    await deleteEntry(id);
    await refreshUserData();
  };

  return (
  <TouchableOpacity onPress={handlePress}>
    <View style={styles.titleRectangle} >
      <View style={styles.titleText}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize: RFPercentage(3), fontFamily: 'bSemi'}}>{title} </Text>
      </View>
      <View style={styles.contentText}>
        <Text numberOfLines={3} ellipsizeMode="tail" style={{fontSize: RFPercentage(2), fontFamily: 'cLight'}}>{content}</Text>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.logoContainer}>
            <SmallLogo/>
        </View>
        {(del) ?         <View style={styles.actionIconContainer}>
        <TouchableOpacity onPress={() => handleDeletePress()}>
          <Ionicons name="trash-outline" size={24} color="grey" />
        </TouchableOpacity>
      </View> :
      <></>
        }

      </View>
    </View>
  </TouchableOpacity>
  )
}

 const { width, height } = Dimensions.get('window');


const styles = StyleSheet.create({
  
  titleRectangle: {
    flexDirection:'column',
    marginVertical:10,
    marginHorizontal:14,
    paddingTop:8,
    padding:10,
    alignSelf:'center',
    borderRadius:14,
    backgroundColor: '#E2E9E2',
    flexDirection: 'column',
    width: (0.88*width),
    minheight: (0.17*height),
        shadowOffset: {
            width:5,
            height: 7,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
  },

  titleText: {
    flexDirection:'row',
    alignContent: 'left',
  },

  contentText: {
    flexDirection:'row',
    alignContent: 'left',
    paddingBottom: RFPercentage(5),
  },

  logoContainer:{
       flexDirection:'row',
  },

  iconContainer:{
    justifyContent: 'space-between',
    flexDirection:'row',
  },

  actionIconContainer:{
    flexDirection:'row',
    alignContent: 'right',
    justifyContent: 'flex-end',
  }

});

export default JournalEntryPane