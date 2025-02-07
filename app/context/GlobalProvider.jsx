import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import * as Notifications from "expo-notifications";
//import { Subscription } from "expo-modules-core";
import { registerForPushNotificationsAsync } from "@/utils/registerForPushNotificationsAsync";
import RegisterForPushNotifications from "@/utils/registerForPushNotificationsAsync";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
import Purchases, { LOG_LEVEL, PurchasesOffering } from 'react-native-purchases';
import { Platform } from "react-native";

const GlobalProvider = ({ children }) => {
const API_URL ='https://4idii2equest.coping-ai.com/';
const [entries, setEntries] = useState([]);
const [entriesLength, setEntriesLength] = useState(0);
const [isLoading, setIsLoading] = useState(true);
const [user, setUser] = useState(null);
const [isSubscribed, setIsSubscribed] = useState(false);
const [ isLoggedIn, setIsLoggedIn] = useState(false);
const [initializing, setInitializing] = useState(true);
const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(null);
const [error, setError] = useState(null);

const notificationListener = useRef();
const responseListener = useRef();


// useEffect(() => {
//   console.log('user in USEeffect on GC', user)
// },[user])

useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async (authUser) => {
        if(authUser){
           try {
               setIsLoading(true);
               const idToken = await authUser.getIdToken();
               //console.log(idToken);
               const sqlUser = await getUserByProvider (idToken);
               login(sqlUser);
            } catch (error) {
                console.error("Error syncing user with backend:", error);
              } finally {
                setIsLoading(false);
              }
            } else {
              // No user is signed in
              setUser(null);
              setIsLoading(false);
            }
      if (initializing) setInitializing(false);
    });
    return subscriber;
  }, [initializing]);

  const getNotificationToken = () => {
    registerForPushNotificationsAsync().then(
      (token) => setExpoPushToken(token)
    );
  
    notificationListener.current = 
      Notifications.addNotificationReceivedListener((notification) => {
        //console.log("🔔 Notification Received: ", notification);
        setNotification(notification);     
      })
  
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          // console.log(
          //   "🔔 Notification Response: ",
          //   JSON.stringify(response, null, 2),
          //   JSON.stringify(response.notification.request.content.data, null, 2)
          // );
          // Handle the notification response here
        });
  
        return () => {
          if (notificationListener.current) {
            Notifications.removeNotificationSubscription(
              notificationListener.current
            );
          }
          if (responseListener.current) {
            Notifications.removeNotificationSubscription(responseListener.current);
          }
        };
  }

useEffect(() => {
  getNotificationToken();
    }, []);

  const getUserByProvider = async (providerID) => {
    try {
        const response = await fetch(API_URL + "firebase/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${providerID}`, // Send token in Authorization header
          }
        });
            if (response.ok) {
          const data = await response.json();
          //console.log("user registered from backend:", data);
          return data;
        } else {
          const errorMessage = await response.text();
          //console.error("Error from backend:", errorMessage);
        }
      } catch (error) {
        //console.error("Error sending token to backend:", error);
      }
}

//Init Revenue Cat
useEffect(() => {
  const setup = async () => {
    
  
    try{
    if (Platform.OS == "android") {      
      await Purchases.configure({ apiKey: 'googleAPIhere' });
    } else {
      await Purchases.configure({ apiKey:'appl_bKjBvIBLemkBPibcJuXbCyMAzvi'});
    }
    Purchases.setLogLevel(LOG_LEVEL.DEBUG);

    if(user && user.id) { 
      //console.log('the user id before logging in: ' + user.id)
      await Purchases.logIn(user.id.toString());
      const cusInfo  =  await Purchases.getCustomerInfo();
      checkSubscriptionStatus(cusInfo);
      //console.log('customer now: ', cusInfo);
      
    }
      else {//console.log('no user exists yet')
        }      
    }catch (error) {
    //console.error('Error initializing RevenueCat:', error);
}}
    setup();
},[user])

const checkSubscriptionStatus = (customerInfo) => {
  // Check multiple indicators of an active subscription
  const hasActiveSubscription = 
    customerInfo?.activeSubscriptions?.length > 0 || // Check active subscriptions array
    Object.keys(customerInfo?.entitlements?.active || {}).length > 0 // Check active entitlements
  
  if (!hasActiveSubscription) {
    //console.log('No active subscription found')
    setIsSubscribed(false)
      if(user.subscriptionStatus !== "free") {
        updateUser({...user, subscriptionStatus: "free"})
      }
  } else {
    setIsSubscribed(true)
  }
}

const login = async (userData) => {
    
  setIsLoading(true)
      try {
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        await AsyncStorage.setItem('isLoggedIn', 'true');
        setUser(userData);
        //console.log('user at GC login function ' + JSON.stringify(user))
        setIsLoggedIn(true);
        getNotificationToken();
        //console.log(expoPushToken);
        fetchAllEntries(user)
      } catch (error) {
        console.error('Error saving login data', error);
      }
      finally{
        setIsLoading(false);
        settingTheUser(userData)
      }
    };

    const logout = async () => {
        try {
          setIsLoggedIn(false);
          await AsyncStorage.removeItem('user');
          await AsyncStorage.removeItem('isLoggedIn');
          await auth().signOut();
          setIsLoading(true)
          setUser(null);  
        } catch (error) {
          console.error('Error removing login data', error);
        }finally{
          if(user){
           // console.log('user exists after logging off ', user)
          }
          (setIsLoading(false));
        }
      };

    const settingTheUser = (user) => {
        setUser(user)
        setIsLoading(false)
      }

      useEffect(() => {
        const loadStoredData = async () => {
          try {
            const storedUser = await AsyncStorage.getItem('user');
            const storedIsLoggedIn = await AsyncStorage.getItem('isLoggedIn');
            
            if (storedUser && storedIsLoggedIn) {
              setUser(JSON.parse(storedUser));
              setIsLoggedIn(true);
              setEntriesLength(entries.length);
            }
          } catch (error) {
            console.error('Error loading data', error);
          }
        };
    
        loadStoredData();
      }, []);  


const updateUserSubscriptionStatus = async (subscriptionPlan) => {
 // console.log('we came here at update sub status! ')
  await updateUser({...user, "subscriptionStatus": subscriptionPlan});
    
}

const refreshAll = useCallback(async () => {
    await Promise.all([refreshUserData(), refreshEntries()]);
  }, [refreshUserData, refreshEntries]);

  const refreshUserData = useCallback(async () => {
    //console.log('before calling by id', user.id)
      const updatedUserData =  await getUserById((user.id));
      //console.log('user data in refresh : ', updatedUserData)
      return updatedUserData;
    
  }, []);

  const refreshEntries = useCallback(async () => {
  
      fetchAllEntries(user);
    
  }, [user]);

const fetchAllEntries = async () => {

   // console.log('fetch will happened for '+ JSON.stringify(user))
   if(user){
    //console.log('user at fetch all: ', user)
    await getAll((user.id))
    .then(async data => {
        // console.log("Fetched data:", data); // Add this line
       
        setEntries(data);
        setEntriesLength(data.length);
        //console.log(entries.length);

        // console.log(data)
    })
    .catch(error => { console.log(error); })
   }
    
}

const getAll = async (userid) => {
    //console.log('get all happened')
    return fetch(API_URL + 'users/entries/' + userid)
    .then(async response => {
        if (response.status === 200) {
            //console.log(response.json)

            return response.json();
        } else {
            // console.error(`Response error in getAll${type}: ${response.status}`);
            throw new Error(`Response error in getAll in GC: `, error);
        }
    })
    .catch(error => {
        console.error('Error fetching in :', error);
        throw error; 
    });
}

const addEntry = async (entry) => {
    //console.log('entry to be added ', entry)
    try {
          const response = await fetch(API_URL + 'entry', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(entry),
          });
          const data = await response.json();
         // console.log('added entry data in GC ', data);
          //console.log(entries.length); //remove

        
          //setEntries([...prev, data]);
          //onsole.log('Successfully added entry with ID at ADD Entry ' + data.id);
          return data.id;
      } catch (error) {
          return console.error('Error in add all: ' + error);
      }
  };

  const deleteEntry = async (entryId) => {
    return fetch(API_URL + 'entry/user/' + user.id + '/' + entryId + '/', {method: 'DELETE'})
        .then(async () => {
          //console.log(entryId + " deleted");
          await refreshAll();
          return true;})
        .catch(error => console.error('Error deleting ' + entryId + ': ', error));
  };

  const updateEntry = async (entry) => {
    try {
        const response = await fetch(API_URL + 'entry', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
        });
        const data = await response.json();
        //console.log('Successfully updated ' + data.id);
        return data;
    } catch (error) {
        return console.error('Error updating: ' + error);
    }
  };

  const getEntry = async (id) => {
        
    //console.log('ID received at fetched entry:' + id)
    //console.log('Type of ID:', typeof id);
    const numId = typeof id === 'string' ? parseInt(id, 10) : id;
    //console.log('did the new entry come here' + entries)
    await refreshEntries();
    const foundEntry = entries.find(entry => entry.id === numId);
    if(foundEntry){
   // console.log('Found entry without api:', foundEntry)
    return foundEntry;
    }
    else{
        const foundEntryFromApi = await getEntryById(id)
       // console.log('Found entry WITH api:', foundEntryFromApi)
        return foundEntryFromApi;
    }
}

    const getEntryById = async (id) =>{
        return fetch( API_URL + 'entry/' + id)
        .then(response => response.json())
        .then(data => {
        //   console.log(data);
        //console.log('Successfully received the entry from this api ' + data);
        const foundEntry = data
        return foundEntry;
    })
    .catch(error => console.error('Error fetching: ' + type, error));
    }

    const getUserById = async (id) =>{
      return fetch( API_URL + 'users/' + id)
      .then(response => response.json())
      .then(data => {
        setUser(data);
      const foundUser = data
      return foundUser;
  })
  .catch(error => console.error('Error fetching: ' + type, error));
  }  


  const getGPTResponse = (entryID, prompt) => {
    setIsLoading(true)
   // console.log('check out the link', API_URL + 'gptq/chat?prompt=' + prompt + '&entryId=' + entryID )
    return fetch(API_URL + 'gptq/chat?prompt=' + prompt + '&entryId=' + entryID )
    .then(response => response.json())
    .then(data => {
          //console.log('Successfully received ' + data.newQuestion);
          setIsLoading(false);
          return data
    })
    .catch(error => {
        //console.error('Error fetching:', error);
        throw error; 
    });
}

const getGPTInstaPrompt = async (entryID, prompt) => {
    setIsLoading(true)
    //console.log('this is the entry: ' + entryID + 'the prompt: ' + prompt)
    return fetch(API_URL + 'gptq/instaprompt?prompt=' + prompt + '&entryId=' + entryID )
    .then(response => response.json())
    .then(async data => {
          //console.log('Successfully received ' + data.newQuestion);
          setIsLoading(false);
          //await refreshAll();
          return data
    })
    .catch(error => {
       // console.error('Error fetching:', error);
        throw error; 
    });
}

const updateUser = async (updatedUser) =>{
    try {
      const response = await fetch(API_URL + 'users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
            });
            const data = await response.json();
            //console.log('Successfully updated ' + data.id);
            login(data);
            return data;
        } catch (error) {
            return console.error('Error updating: ' + error);
        }
    };

const canMakeEntry = async () => {
   console.log('is user subbed: ', isSubscribed);
    console.log('is user remaining free entry: ', user.remainingFreeEntries);

    if(isSubscribed || user.remainingFreeEntries > 0) {return true;}
    else return false;
  }

    const addFeedback = async (feedback) => {
      //console.log(feedback)
      try {
            const response = await fetch(API_URL + 'feedbacks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feedback),
            });
            const data = await response.json();
            //console.log(data);
            if (data) {return true;}
        } catch (error) {
            return console.error('Error adding Feedback: ' + error);
        }
    };

    return(
        <GlobalContext.Provider value={{ fetchAllEntries, entries, API_URL, expoPushToken, notification, error, addEntry,getEntryById, updateUserSubscriptionStatus,getUserById, getGPTResponse, getGPTInstaPrompt, getEntry, canMakeEntry, updateEntry, deleteEntry, login, logout, refreshUserData, refreshEntries, updateUser, addFeedback, initializing, user, isLoading}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;
