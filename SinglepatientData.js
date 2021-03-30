import React from 'react';

// import {Text, ScrollView, View, StyleSheet} from 'react-native';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const DiseaseDetails = ({route}) => {
  const PatientData = route.params.itemData;
  // console.log(PatientData);

  return (
    <SafeAreaView style={style.container}>
      <View style={{alignItems: 'center'}}>
        <>
          <Animatable.View
            style={style.card}
            animation="slideInDown"
            iterationCount={5}
            direction="alternate">
            <ScrollView>
              <Text style={style.whiteText2}> Date </Text>
              <Text style={style.whiteText}> {PatientData.date}</Text>
              <Text style={style.whiteText2}>Symptoms</Text>
              <Text style={style.whiteText}>
                Symptoms {PatientData.Symptoms}
              </Text>
              <Text style={style.whiteText2}> Testing</Text>
              <Text style={style.whiteText}>{PatientData.Testing}</Text>
              <Text style={style.whiteText2}> Results</Text>
              <Text style={style.whiteText}>{PatientData.Results}</Text>
              <Text style={style.whiteText2}> Report</Text>
              <Text style={style.whiteText}>{PatientData.Report}</Text>
              <Text style={style.whiteText2}> Refferal</Text>
              <Text style={style.whiteText}>{PatientData.Refferal}</Text>
            </ScrollView>
          </Animatable.View>
        </>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  whiteText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'normal',
    fontFamily: 'monospace',
  },
  whiteText2: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    margin: 5,
  },
  // bolder
  card: {
    height: 450,
    width: 350,
    margin: 5,
    borderRadius: 12,
    backgroundColor: '#243447',
    justifyContent: 'center',
  },

  textBtn: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 6,
    width: '80%',
    margin: 5,
    alignSelf: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  separator: {
    backgroundColor: '#fff',
    top: 0,
    bottom: 0,
    position: 'absolute',
    width: 2,
  },
});
export default DiseaseDetails;
