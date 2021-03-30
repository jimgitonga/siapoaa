/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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
} from 'react-native';

const App = () => {
  // const [value, onChangeText] = useState('Useless Placeholder');
  const [data, SetPatientData] = useState({
    date: null,
    symptoms: null,
    test: null,
    results: null,
    DoctorReport: null,
    refferal: null,
  });

  useEffect(() => {
    SetPatientData({date: new Date().toLocaleString().replace(',', '')});
  }, []);

  const [height, setHeight] = useState(42);

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView>
        <View>
          <Text>Date: {data.date}</Text>
        </View>
        <View>
          <Text>TESTING</Text>
          <TextInput
            style={{
              height: height,
              margin: 15,
              // height: 40,
              borderColor: '#7a42f4',
              borderWidth: 1,
            }}
            multiline
            onContentSizeChange={(e) =>
              setHeight(e.nativeEvent.contentSize.height)
            }
          />
        </View>

        <View>
          <Text>Symptoms</Text>
          <TextInput
            style={{
              margin: 15,
              // height: 40,
              borderColor: '#7a42f4',
              borderWidth: 1,
            }}
            multiline
            onChangeText={(text) => SetPatientData({symptoms: text})}
            // value={data.symptoms}
          />
        </View>

        <Text>Test type</Text>
        <TextInput
          style={{
            margin: 15,
            // height: 40,
            borderColor: '#7a42f4',
            borderWidth: 1,
          }}
          multiline
          underlineColorAndroid="transparent"
          // placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={(text) => SetPatientData({test: text})}
          // value={data.test}
          // placeholder="Test type"
        />

        <Text>Result</Text>
        <TextInput
          style={{
            margin: 15,
            // height: 40,
            borderColor: '#7a42f4',
            borderWidth: 1,
          }}
          multiline
          underlineColorAndroid="transparent"
          // placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={(text) => SetPatientData({results: text})}
          // value={data.results}

          // placeholder="Result"
        />

        <Text>Report</Text>
        <TextInput
          style={{
            margin: 15,
            // height: 40,
            borderColor: '#7a42f4',
            borderWidth: 1,
          }}
          multiline
          underlineColorAndroid="transparent"
          // placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={(text) => SetPatientData({DoctorReport: text})}
          // value={data.DoctorReport}
          // placeholder="Report"
        />

        <Text>Refferal</Text>
        <TextInput
          style={{
            margin: 15,
            // height: 40,
            borderColor: '#7a42f4',
            borderWidth: 1,
          }}
          multiline
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          onChangeText={(text) => SetPatientData({refferal: text})}
          // value={data.refferal}
        />

        <View style={{width: 200, alignSelf: 'center'}}>
          <Button
            title="Save"
            onPress={() => {
              storeData();
              Alert.alert('data saved');
              console.log(data.DoctorReport);
            }}
            color="gray"
            style={styles.buttonContainer}
          />
        </View>

        <View style={{width: 200, alignSelf: 'center'}}>
          <Button
            title="getData"
            onPress={() => {
              retrieveData();
              Alert.alert('data shown pressed');
            }}
            color="indigo"
            style={styles.buttonContainer}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    // height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
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
});

export default App;
