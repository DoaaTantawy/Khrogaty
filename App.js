/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */


import React, { Component } from 'react';
import { createStackNavigator,  createBottomTabNavigator, createAppContainer} from "react-navigation";
import { Platform, View, Image } from 'react-native';
import {Icon} from 'native-base';
import FindPlaces from './FindPlaces';
import Splash from './Splash';
import RestaurantsTaps from './RestaurantsTaps';
import ThingsToDo from './ThingsToDo';
import SearchPlaces from './SearchPlaces'
import HomeTabs from './HomeTabs'
import PlaceDetailsWithMaps from "./PlaceDetailsWithMaps";
import WelcomeScreen from './WelcomeScreen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
});



const tabNavigator =createBottomTabNavigator({
      Home:HomeTabs,
      Search: SearchPlaces,
      'Find Places': FindPlaces,
      'Restaurants': RestaurantsTaps,
      'Things To Do': ThingsToDo,
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Home') {
            iconName = focused ? require('./Icons/ghome.png') : require('./Icons/home.png');
          } else if (routeName === 'Search') {
            iconName = focused ? require('./Icons/gfilter.png') : require('./Icons/filter.png');
          }
          else if (routeName === 'Find Places') {
            iconName = focused ? require('./Icons/gfind-places.png') : require('./Icons/find-places.png');
          }
          else if (routeName === 'Restaurants') {
            iconName = focused ? require('./Icons/grestaurants.png') : require('./Icons/restaurants.png');
          }
          else if (routeName === 'Things To Do') {
            iconName = focused ? require('./Icons/gtodo.png') : require('./Icons/todo.png');
          }
          return <Image source={iconName} style={{
            width: 23, height: 23,
            justifyContent: 'center', alignItems: 'center'
          }} />
        },
      }),
      tabBarOptions: {
        activeTintColor: '#45ca36',
        inactiveTintColor: 'gray',
      },
    }
);

tabNavigator.navigationOptions = {
  // Hide the header from AppNavigator stack
  header: null,
const appStackNavigator =createStackNavigator({
      tabs:{screen: tabNavigator},
      'PlaceDetailsWithMaps': PlaceDetailsWithMaps,
    }
);
appStackNavigator.navigationOptions = {
    // Hide the header from AppNavigator stack
    header: null,
};

const appSwitchNavigator = createSwitchNavigator(
    {
        Splash:Splash,
        WelcomeScreen: WelcomeScreen,
        'appStackNavigator':{screen: appStackNavigator},
    }
)

export default createAppContainer(appSwitchNavigator);
