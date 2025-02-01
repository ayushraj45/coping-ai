import { StyleSheet, Text, View , Dimensions, TouchableOpacity} from 'react-native'
import React, { useCallback, useRef } from 'react'
import HomepageTop from '../assets/icons/HomepageTop.svg';
import HomepageBot from '../assets/icons/HomepageBot.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import EntryChoice from '../components/EntryChoice';


const { width , height } = Dimensions.get('window');

const homepage2 = () => {

    const bottomSheetRef = useRef(null);
    const snapPoints = ['25%', '50%', '90%'];
    const handleSheetOpen = useCallback(() => {
        bottomSheetRef.current?.expand();
      }, []);

    return (
        <View style={styles.main}>
          <View style={styles.topGraphic}>
            <HomepageTop width={width} height={height * 0.20} />
          </View>
          <View style={styles.midSection}>
            <View style={{alignSelf:'center'}}>
                <Text style={{fontSize: RFPercentage(3.3), fontFamily:'bSemi'}}>Hello, Ayush </Text>
            </View>
            <TouchableOpacity onPress={handleSheetOpen}>
                <View style={styles.promptBtn}> 
                    <Text style={{fontSize: RFPercentage(2.7), fontFamily:'bSemi', color:'#FEF8EC'}}>Get a prompt</Text>
                </View>
            </TouchableOpacity>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
            >
                <ScrollView>
                    <EntryChoice number={1} title={'Mood'} content={'Start with how you are feeling'} color={'#FFD788'}/>
                </ScrollView>
                
            </BottomSheet>
            <View style={styles.btnContainers}> 
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Ionicons name="book-outline" size={30} color="#011C2D" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.button}>
                        <Ionicons name="settings-outline" size={30} color="#011C2D" />
                    </View>
                </TouchableOpacity>  
                <TouchableOpacity>  
                    <View style={styles.button}>
                        <Ionicons name="help-circle-outline" size={30} color="#011C2D" />
                    </View>
                </TouchableOpacity>    
            </View>
          </View>
          <View style={styles.botGraphic}>
            <HomepageBot width={width} height={height*0.705} />
          </View>
        </View>
      );
    };
    


export default homepage2;

const styles = StyleSheet.create({

    main: {
       flex: 1,
       height: height,
       backgroundColor: "#FEF8EC",
       justifyContent: 'space-between',
       alignItems:'center',
      },
      topGraphic: {
       flex: 1,
       alignSelf: 'flex-start'
      },
      botGraphic: {
        flex: 1,
        alignSelf: 'flex-end',
      },
      promptBtn:{
        backgroundColor:'#011C2D',
        padding:9,
        paddingHorizontal:30,
        borderRadius: 14,
        margin:6,
        marginBottom:15,
      },
      btnContainers:{
        flexDirection:'row',
        justifyContent:'space-around'
      },
      button:{
        backgroundColor:'#FFEECD',
        borderWidth:2,
        borderRadius:10,
        padding:5,

      }
})