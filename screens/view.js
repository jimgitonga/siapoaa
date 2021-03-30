import React, {useState, useEffect, useCallback} from 'react';
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
  TouchableOpacity,
  FlatList,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Geolocation from '@react-native-community/geolocation';
import * as Progress from 'react-native-progress';
import {BubblesLoader} from 'react-native-indicator';

const DataViewDoc = ({navigation}) => {
  const [health, sethealth] = useState([]);
  const [load, loading] = useState(false);

  const healthM = async () => {
    loading(true);

    await NetInfo.fetch().then(async (state) => {
      if (state.isConnected) {
        await fetch('https://siapoaserver.herokuapp.com/posting/All', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((dat) => {
            sethealth(dat);
            // console.log(health);
          })
          .then(() => {
            loading(false);
          })

          .catch((err) => console.error(err));
      }
    });
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => {
            navigation.navigate('DiseaseDetails', {itemData: item});
            // Alert.alert('pressed');
          }}>
          <Text style={{color: 'white', fontSize: 25}}>{item.Testing}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // useEffect(() => {
  //   // renderItem();
  //   // healthM();
  // }, [health]);

  return (
    <View>
      <View style={{width: 70, alignSelf: 'center'}}>
        <Button
          title="health"
          onPress={() => {
            healthM();
          }}
          color="gray"
          style={styles.buttonContainer}
        />
      </View>
      <Text style={{color: 'black', fontSize: 25, alignSelf: 'center'}}>
        Press Disease to Review
      </Text>
      {load ? (
        <View style={styles.circleLoader}>
          <Text>Loading</Text>
          <BubblesLoader dotRadius={20} size={80} color="red" />
        </View>
      ) : (
        <FlatList
          data={health}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,

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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    margin: 10,
  },
  circleLoader: {
    width: 375,
    height: 500,

    alignItems: 'center',
    justifyContent: 'center',
  },
  touchable: {
    flex: 1,
    // border: 1,
    backgroundColor: '#243447',
    // #243447 ,#836953
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderRadius: 20,
    margin: 10,
  },
});

export default DataViewDoc;
