import React, {useState, useEffect, useContext} from 'react';
import UserContext from './useContextStore';
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import DataViewDoc from './view';

const PhoneInput = ({navigation}) => {
  const [number, setNumber] = useState({number: ''});
  const [value, loadedVal] = useState({value: true});
  const [screenDaetail, setScreenDaetail] = useState(true);

  const [waiting, setwaiting] = useState(false);
  const [code, setCode] = useState({code: '', number: ''});

  const [confirm, setConfirm] = useState(null);

  const [codee, setCodee] = useState('');
  // let num;

  const getNumber = (val) => {
    setNumber({number: val});
  };

  const getCode = (val) => {
    setCode({code: val, number: number.number});
  };
  //firebase**************************************************************************
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation code is ', confirmation);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(codee).then(() => {
        console.log('logged in');
        // setScreenDaetail(!screenDaetail);
        navigation.navigate('codeForma');
      });
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return (
    <View styles={style.container}>
      {confirm ? (
        <>
          <View styles={style.content}>
            <Text style={style.TextStyle1}>Enter Valid Code </Text>
          </View>
          <View style={style.viewForText}>
            <TextInput
              style={style.textinput}
              onChangeText={(text) => setCodee(text)}
              secureTextEntry={true}
              maxLength={13}
              value={codee}
            />
          </View>
          <View style={style.viewForSend}>
            <TouchableOpacity
              style={style.SubmitButtonStyle}
              activeOpacity={0.1}
              onPress={() => {
                // sendPhoneCodeTwillio();

                confirmCode();
              }}>
              <Text style={style.TextStyle}> SEND</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={style.SubmitButtonStyle2}
              activeOpacity={0.1}
              onPress={() => {
                // sendPhoneTwilio();
                setConfirm(null);
              }}>
              <Text style={style.TextStyle}> Back </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View styles={style.content}>
            <Text style={style.TextStyle1}>Enter Phone number </Text>
          </View>

          <View style={style.viewForText}>
            <TextInput
              style={style.textinput}
              onChangeText={(text) => {
                getNumber(text);
              }}
              maxLength={13}
              value={number.number}
            />
          </View>
          <View style={style.viewForSend}>
            <TouchableOpacity
              style={style.SubmitButtonStyle}
              activeOpacity={0.1}
              onPress={() => {
                signInWithPhoneNumber(number.number);
              }}>
              <Text style={style.TextStyle}> SEND </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={style.SubmitButtonStyle2}
              activeOpacity={0.1}
              onPress={() => {
                signInWithPhoneNumber(number.number);
              }}>
              <Text style={style.TextStyle}> RESEND </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: Platform.OS === 'android' ? 50 : 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput: {
    margin: 25,
    borderColor: '#7a42f4',
    borderWidth: 5,
    borderRadius: 35,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
  },
  viewForText: {width: 250, alignSelf: 'center'},
  viewForSend: {
    width: 400,
    // alignSelf: 'baseline',
    borderRadius: 20,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  content: {
    // justifyContent: 'center',
    // // alignItems: 'flex-start',
    flex: 2,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },

  topTierblack: {
    backgroundColor: 'black',
    borderRadius: 100,
    width: 300,
    marginLeft: 40,
    opacity: 0.5,
  },
  topTierRed: {
    backgroundColor: 'red',
    borderRadius: 100,
    width: 300,
    marginLeft: 40,
  },
  topTierGreen: {
    backgroundColor: 'green',
    borderRadius: 100,
    width: 300,
    marginLeft: 40,
    opacity: 0.5,
  },
  viewForSend2: {
    width: 200,
    alignSelf: 'flex-end',
    borderRadius: 20,
    // margin: 10,
  },
  buttonContainer: {
    width: '40%',
    alignSelf: 'center',
    marginVertical: 30,
    color: 'red',
    borderRadius: 10,
  },
  SubmitButtonStyle: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    // marginLeft: 30,
    // marginRight: 30,
    backgroundColor: '#00BCD4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    shadowOpacity: 0.5,
    shadowColor: 'blue',
    height: 50,
    width: 100,
  },

  SubmitButtonStyle2: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    // marginLeft: 30,
    // marginRight: 30,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    shadowOpacity: 0.5,
    shadowColor: 'blue',
    height: 50,
    width: 100,
  },
  TextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  TextStyle1: {
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Cochin',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PhoneInput;
