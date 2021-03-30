import React, {useState, useContext, useEffect} from 'react';
import {
  Button,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DiseaseDetails from './SinglepatientData';
import App from './App';
import DataViewDoc from './screens/view';
import PhoneInput from './screens/verificationEntry';
import UserContext from './screens/useContextStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './components/context';
import {DrawerContent} from './screens/DrawerSignOut';
import RootStackScreen from './screens/RootStackScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  Chart,
  Line,
  Area,
  HorizontalAxis,
  VerticalAxis,
} from 'react-native-responsive-linechart';

import {Provider as PaperProvider} from 'react-native-paper';

import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper';

import {DarkTheme as PaperDarkTheme} from 'react-native-paper';

function DetailsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Chart
        style={{height: 200, width: 400}}
        data={[
          {x: -2, y: 15},
          {x: -1, y: 10},
          {x: 0, y: 12},
          {x: 1, y: 7},
          {x: 2, y: 6},
          {x: 3, y: 8},
          {x: 4, y: 10},
          {x: 5, y: 8},
          {x: 6, y: 12},
          {x: 7, y: 14},
          {x: 8, y: 12},
          {x: 9, y: 13.5},
          {x: 10, y: 18},
        ]}
        padding={{left: 40, bottom: 20, right: 20, top: 20}}
        xDomain={{min: -2, max: 10}}
        yDomain={{min: 0, max: 20}}>
        <VerticalAxis
          tickCount={11}
          theme={{labels: {formatter: (v) => v.toFixed(2)}}}
        />
        <HorizontalAxis tickCount={5} />
        <Area
          theme={{
            gradient: {
              from: {color: '#ffa502'},
              to: {color: '#ffa502', opacity: 0.4},
            },
          }}
        />
        <Line
          theme={{
            stroke: {color: '#ffa502', width: 5},
            scatter: {default: {width: 4, height: 4, rx: 2}},
          }}
        />
      </Chart>
    </View>
  );
}

function DetailsScree() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Chart
          style={{height: 400, width: 400}}
          data={[
            {x: -2, y: 15},
            {x: -1, y: 10},
            {x: 0, y: 12},
            {x: 1, y: 7},
            {x: 2, y: 6},
            {x: 3, y: 8},
            {x: 4, y: 10},
            {x: 5, y: 8},
            {x: 6, y: 12},
            {x: 7, y: 14},
            {x: 8, y: 12},
            {x: 9, y: 13.5},
            {x: 10, y: 18},
          ]}
          padding={{left: 40, bottom: 20, right: 20, top: 20}}
          xDomain={{min: -2, max: 10}}
          yDomain={{min: 0, max: 20}}>
          <VerticalAxis
            tickCount={11}
            theme={{labels: {formatter: (v) => v.toFixed(2)}}}
          />
          <HorizontalAxis tickCount={5} />
          <Area
            theme={{
              gradient: {
                from: {color: '#ffa502'},
                to: {color: '#ffa502', opacity: 0.4},
              },
            }}
          />
          <Line
            // tooltipComponent={<Tooltip />}
            theme={{
              stroke: {color: '#ffa502', width: 5},
              scatter: {default: {width: 4, height: 4, rx: 2}},
            }}
          />
        </Chart>
      </View>
    </View>
  );
}

function INPUT({navigation}) {
  return <App />;
}

// function SettingsScreen({navigation}) {
//   return <DataViewDoc />;
// }

const HomeStack = createStackNavigator();

function HomeStackScreen({navigation}) {
  // const {screenvalue, setChangeValue} = useContext(UserContext);
  const [value, loadedVal] = useState(true);
  const {colors} = useTheme();
  // console.log(colors);
  return (
    <HomeStack.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}>
      <HomeStack.Screen
        name="Home"
        component={App}
        options={{
          title: 'Patient DATA',
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-search"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
                onPress={() => {}}
              />
              <TouchableOpacity
                style={{paddingHorizontal: 10, marginTop: 5}}
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Avatar.Image
                  source={{
                    uri:
                      'https://pbs.twimg.com/profile_images/1002579460087013376/Wz2HRAUo_400x400.jpg',
                  }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="PatientData"
        component={PhoneInput}
        options={{tabBarLabel: 'PatientData'}}
      />

      <HomeStack.Screen
        name="DiseaseReg"
        component={DataViewDoc}
        options={{tabBarLabel: 'DiseaseReg'}}
      />

      <HomeStack.Screen
        name="DiseaseDetails"
        component={DiseaseDetails}
        options={{tabBarLabel: 'DiseaseDetails'}}
      />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Patient Details" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function Loaded() {
  const [screenvalue, setChangeValue] = useState(false);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        component={HomeStackScreen}
      />
      {/* <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Update',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
        component={App}database-sync
      /> */}
      <HomeStack.Screen
        name="PatientData"
        component={PhoneInput}
        options={{
          tabBarLabel: 'PatientData',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="database-sync"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen name="click" component={DetailsScreen} />
      <Tab.Screen
        name="Profile"
        component={DetailsScree}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const DrawerTabs = createDrawerNavigator();
export default function MyDrawer() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'rgb(255, 45, 85)',
    },
  };

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        // setUserToken('fgkj');
        // setIsLoading(false);
        const userToken = String(foundUser[0].userToken);
        const userName = foundUser[0].username;
        console.log(userName);
        console.log(userToken);

        try {
          await AsyncStorage.setItem('userToken', userToken);
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({type: 'LOGIN', id: userName, token: userToken});
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          {loginState.userToken !== null ? (
            <DrawerTabs.Navigator
              drawerContent={(props) => <DrawerContent {...props} />}>
              <DrawerTabs.Screen name="Home" component={Loaded} />
              <DrawerTabs.Screen name="click" component={DetailsScree} />
            </DrawerTabs.Navigator>
          ) : (
            <RootStackScreen />
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
