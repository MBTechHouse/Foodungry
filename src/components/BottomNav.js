import React from 'react';
import {
  Icon,
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';

import { createBottomTabNavigator,createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Restaurants from './Restaurants';
import Profile from './Profile';
import Received from './Orders/Received';
import Preparing from './Orders/Preparing';
import Ready from './Orders/Ready';
import Completed from './Orders/Completed';
import ManageItems from './ManageItems';
import Login from './Login.js';
import Signup from './Signup.js';
import RestHelp from './Help/RestHelp';
import UserHelp from './Help/UserHelp';

const OrdersNavigator = createMaterialTopTabNavigator ({
  Received: {
    screen: Received,
    navigationOptions:{
      tabBarIcon: ({ focused, tintcolor }) => (
        <Icon name='paper-plane' width={25} height={25} tintColor={focused?'#55C2FF':'#000'} />
      )
    }
  },
  Preparing: {
    screen: Preparing,
    navigationOptions:{
      tabBarIcon: ({ focused, tintcolor }) => (
        <Icon name='clock-outline' width={25} height={25} tintColor={focused?'#55C2FF':'#000'} />
      )
    }
  },
  Ready: {
    screen: Ready,
    navigationOptions:{
      tabBarIcon: ({ focused, tintcolor }) => (
        <Icon name='done-all' width={25} height={25} tintColor={focused?'#55C2FF':'#000'} />
      )
    }
  },
  Completed: {
    screen: Completed,
    navigationOptions:{
      tabBarIcon: ({ focused, tintcolor }) => (
        <Icon name='person-done-outline' width={25} height={25} tintColor={focused?'#55C2FF':'#000'} />
      )
    }
  }
}, {
  headerMode: 'none',
  tabBarOptions: {
    activeTintColor: '#55C2FF',  // Color of tab when pressed
    inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
    showIcon: 'true', // Shows an icon for both iOS and Android
    showLabel: true,
    labelStyle: {
      fontSize: 10
    },
    style: {
      backgroundColor: '#fdfdfd',
      height: '9%'
    }
  }
});


const RestOptsNavigator = createBottomTabNavigator(
  {
    Orders: {
      screen: OrdersNavigator,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          console.log(navigation.state.index);
          if (navigation.state.routeName === 'Orders') {
            return (
              <Icon name="clipboard" width={25} height={25} fill={tintColor} />
            );
          }
        },
      }),
    },
    ManageItems: {
      screen: ManageItems,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          console.log(navigation.state.index, tintColor);
          if (navigation.state.routeName === 'ManageItems') {
            return (
              <Icon
                name="book-open"
                width={25}
                height={25}
                fill={tintColor}
              />
            );
          }
        },
      }),
    },
  },
  {
    initialRouteName: 'Orders',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#55c2ff',
      inactiveTintColor: '#272727',
    },
  },
);

const HelpNavigator = createMaterialTopTabNavigator ({
  Restaurants: {
    screen: RestHelp,
    navigationOptions:{
      tabBarIcon: ({ focused, tintcolor }) => (
        <Icon name='car' width={25} height={25} tintColor={focused?'#55C2FF':'#000'} />
      )
    }
  },
  Users: {
    screen: UserHelp,
    navigationOptions:{
      tabBarIcon: ({ focused, tintcolor }) => (
        <Icon name='person-done' width={25} height={25} tintColor={focused?'#55C2FF':'#000'} />
      )
    }
  }
}, {
  headerMode: 'none',
  tabBarOptions: {
    activeTintColor: '#55C2FF',  // Color of tab when pressed
    inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
    showIcon: 'true', // Shows an icon for both iOS and Android
    showLabel: true,
    labelStyle: {
      fontSize: 10
    },
    style: {
      backgroundColor: '#fdfdfd',
      height: '9%'
    }
  }
});

const BottomNavigator = createBottomTabNavigator(
  {
    Help: {
      screen: HelpNavigator,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          console.log(navigation.state.index, tintColor);
          if (navigation.state.routeName === 'Help') {
            return (
              <Icon
                name="message-circle"
                width={25}
                height={25}
                fill={tintColor}
              />
            );
          }
        },
      }),
    },
    Restaurants: {
      screen: Restaurants,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          console.log(navigation.state.index);
          if (navigation.state.routeName === 'Restaurants') {
            return (
              <Icon name="home-outline" width={25} height={25} fill={tintColor} />
            );
          }
        },
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          console.log(navigation.state.index);
          if (navigation.state.routeName === 'Profile') {
            return (
              <Icon name="person" width={25} height={25} fill={tintColor} />
            );
          }
        },
      }),
    },
  },
  {
    initialRouteName: 'Restaurants',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#55c2ff',
      inactiveTintColor: '#272727',
    },
  },
);

const MainNav = createStackNavigator(
  {
    Login: Login,
    Signup: Signup,
    MainFlow: BottomNavigator,
    RestOptsNavigator: RestOptsNavigator,
  },
  {
    initialRouteName: 'Login',
    header: null,
    headerMode: 'none',
  },
);

export const BottomNav = createAppContainer(MainNav);
