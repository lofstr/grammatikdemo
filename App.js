import React, {useState} from 'react';
import 'react-native-gesture-handler';
import HomeScreen from './Components/HomeScreen';
import InfoScreen from './Components/InfoScreen';
import GameScreen from './Components/GameScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from 'react-native-splash-screen';
import StackNavIcon from './Components/StackNavIcon';
import {StatusBar, View, SafeAreaView} from 'react-native';
import {loadDBData} from './Components/getDBInfo';
import firestore from '@react-native-firebase/firestore';
import {withSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function App() {
  React.useEffect(() => {
    console.log('Lets go!');
    loadDBData();
    //Kolla så denna körs en gång bara.
    SplashScreen.hide();
  });

  console.log('-------');

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 0, backgroundColor: '#866CCF'}} />

      <SafeAreaView style={{flex: 1, backgroundColor: '#866CCF'}}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            activeTintColor: '#FFFFFF',
            inactiveTintColor: 'black',
            activeBackgroundColor: '#866CCF',
            inactiveBackgroundColor: '#866CCF',
            showLabel: false,
            style: {height: 56},
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;
              let type = 'material';
              size = 40;

              if (route.name === 'Home') {
                iconName = 'search';
              } else if (route.name === 'Info') {
                iconName = 'info-outline';
              } else if (route.name === 'Game') {
                iconName = 'gamepad-square-outline';
                type = 'material-community';
              }

              // You can return any component that you like here!
              return (
                <StackNavIcon
                  name={iconName}
                  iconSize={size}
                  focused={focused}
                  color={'blue'}
                  type={type}
                />
              );
            },
          })}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',

              transitionSpec: {
                open: config,
                close: config,
              },
            }}></Tab.Screen>
          <Tab.Screen
            name="Info"
            component={InfoScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',

              transitionSpec: {
                open: config,
                close: config,
              },
            }}
          />
          <Tab.Screen
            name="Game"
            component={GameScreen}
            options={{
              gestureEnabled: true,
              gestureDirection: 'horizontal',

              transitionSpec: {
                open: config,
                close: config,
              },
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default App;
