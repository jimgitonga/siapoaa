import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {TEST_KEY, TEST2, POSTDATAAPI} from '@env';
// import {ActivityIndicator} from 'rreact-native-paper/src/components/ActivityIndicator';
import ActivityIndicator from 'react-native-paper/src/components/ActivityIndicator';
import Geolocation from '@react-native-community/geolocation';
import {useTheme} from '@react-navigation/native';

const App = () => {
  // const [value, onChangeText] = useState('Useless Placeholder');
  const dataToberendered = [];
  const [screenHeight, setContentHeight] = useState({screenHeight: 300});
  const theme = useTheme();

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  const {height} = Dimensions.get('window');
  const onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    setContentHeight({screenHeight: contentHeight});
  };
  // const [data, SetPatientData] = useState({
  //   date: null,
  //   Symptoms: null,
  //   Testing: null,
  //   Results: null,
  //   Report: null,
  //   Refferal: null,
  // });

  const [data, SetPatientData] = useState({});
  const [isConnected, setIsConnected] = useState({msg: true});
  let neValue = false;

  // const isReachable = async (): Promise<Boolean> => {
  //   // const response = await fetch('https://1.1.1.1', {method: 'HEAD'});
  //   console.log('response is', response.ok);
  //   if (response.ok) {
  //     console.log('response is', response.ok);
  //     setIsConnected({msg: false});
  //     // return neValue;
  //   } else {
  //     setIsConnected({msg: true});
  //   }
  // };

  const PosTOApi = async () => {
    await NetInfo.fetch().then(async (state) => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected)
      // console.log('isconnected value is', isConnected);
      const response = await fetch('https://1.1.1.1', {method: 'HEAD'});
      console.log(response);
      if (response.status === 200) {
        await fetch(`${POSTDATAAPI}`, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
          .then((response) => response.json())
          .then((dat) => {
            // dataChecking(dat);
            // console.log('response data:', dat);
            if (dat.msg === 'succes') {
              Alert.alert('Alert message', dat.msg);
            }
          })
          .catch((err) => console.error(err));
      } else {
        Alert.alert('Network Status', 'POOR  NETWORK');
      }
    });
  };

  const clearFunc = () => {
    SetPatientData({
      Symptoms: '',
      Testing: '',
      Results: '',
      Report: '',
      Refferal: '',
    });
  };
  const saveSymptoms = (val) => {
    SetPatientData({...data, Symptoms: val});
  };

  const savetest = (val) => {
    SetPatientData({...data, Testing: val});
  };

  const saveResults = (val) => {
    SetPatientData({...data, Results: val});
  };
  const saveDoctorReport = (val) => {
    SetPatientData({...data, Report: val});
  };
  const saveReferral = (val) => {
    SetPatientData({...data, Refferal: val});
  };
  const [enableShift, setenableShift] = useState(false);

  const storeData = async () => {
    try {
      const healthData = JSON.stringify(data);
      await AsyncStorage.setItem('data', healthData);
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveData = async () => {
    try {
      const retrievedData = await AsyncStorage.getItem('data');

      console.log(JSON.parse(retrievedData));
    } catch (e) {
      console.log('the error is ', e);
    }
  };
  const testinAPP = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'ReactNativeCode Location Permission',
        message: 'ReactNativeCode App needs access to your location ',
      },
    );

    if (granted) {
      Geolocation.getCurrentPosition(
        (position) => {
          const value = ['hey'];
          const posValue = JSON.stringify(position);
          Alert.alert(
            `lattitude: ${Math.floor(
              position.coords.latitude,
            )} longitude: ${Math.floor(position.coords.longitude)},`,
          );
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000},
      );
    }
  };
  // useEffect(() => {
  //   isReachable();
  // }, [isConnected.msg]);
  const scrollEnabled = screenHeight > height;

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior="position"
      enabled={enableShift}>
      <ImageBackground
        source={require('./health2.jpg')}
        style={{height: 590, width: windowWidth}}
        resizeMode={'stretch'}>
        <ScrollView>
          <StatusBar barStyle={theme.dark ? 'light-content' : 'dark-content'} />
          <View>
            <View>
              <Text style={styles.text}>
                Date: {new Date().toLocaleString().replace(',', '')}
              </Text>
            </View>
            <View>
              <Text style={styles.text}>TESTING</Text>
              <TextInput
                style={styles.textinput}
                multiline
                onChangeText={(text) => savetest(text)}
                onFocus={() => setenableShift(false)}
              />
            </View>

            <View>
              <Text style={styles.text}>Symptoms</Text>
              <TextInput
                style={styles.textinput}
                multiline
                onChangeText={(text) => saveSymptoms(text)}
                onFocus={() => setenableShift(false)}
              />
            </View>
            <Text style={styles.text}>Results</Text>
            <TextInput
              style={styles.textinput}
              multiline
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={(text) => saveResults(text)}
              onFocus={() => setenableShift(true)}
            />

            <Text style={styles.text}>Report</Text>
            <TextInput
              style={styles.textinput}
              multiline
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={(text) => saveDoctorReport(text)}
              onFocus={() => setenableShift(true)}
            />

            <Text style={styles.text}>Refferal</Text>
            <TextInput
              style={styles.textinput}
              multiline
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              onChangeText={(text) => saveReferral(text)}
              onFocus={() => setenableShift(true)}
            />

            <View style={{width: 200, alignSelf: 'center', borderRadius: 10}}>
              <TouchableOpacity
                style={styles.SubmitButtonStyle2}
                activeOpacity={0.1}
                onPress={() => {
                  PosTOApi();
                }}>
                <Text style={styles.TextStyle}> Send </Text>
              </TouchableOpacity>
            </View>
            <View />
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,

    borderColor: 'black',
    borderWidth: 1,
  },
  textinput: {
    margin: 15,
    borderColor: 'green',
    borderWidth: 4,
    borderRadius: 20,
    fontFamily: 'notoserif',
    fontSize: 20,
    fontStyle: 'normal',
    color: 'white',
    writingDirection: 'rtl',

    fontWeight: 'bold',
  },
  text: {
    fontFamily: 'notoserif',
    fontSize: 20,
    fontStyle: 'normal',

    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },

  submitButton: {
    backgroundColor: 'gray',
    padding: 10,
    margin: 15,
    height: 40,
    width: 10,
  },
  submitButtonText: {
    color: 'white',
  },
  buttonContainer: {
    width: '40%',
    alignSelf: 'center',
    marginVertical: 30,
    color: 'red',
  },

  SubmitButtonStyle2: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    shadowOpacity: 0.7,
    shadowColor: 'gray',
    height: 50,
    width: 100,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default App;
