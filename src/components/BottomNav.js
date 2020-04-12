import React from 'react';
import {
  Icon,
  BottomNavigation,
  BottomNavigationTab
} from 'react-native-ui-kitten';

import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Orders from './Orders'
import Search from './Search'
import Victor from './Victor'
import Profile from './Profile'
import OrderItems from './OrderItems'
import ViewCart from './ViewCart'
import HomeScreen from './HomeScreen.js'
import Login from './Login.js'
import Signup from './Signup.js'
import CustomerFeeback from './CustomerFeedback'

import AddButton from '../components/BottomNavHelper/AddButton'
import { create } from 'react-test-renderer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'


const BottomNavigator = createBottomTabNavigator({
  Orders: {
    screen: Orders,
    navigationOptions: ({navigation}) =>( {
      tabBarIcon:({ focused, horizontal, tintColor }) => {
        if (navigation.state.routeName === "Orders") {
          return <FontAwesome5 name='home' size={25} color={tintColor} />
        }

    }

    })
  },
  Search: {
    screen: Search,
    navigationOptions: ({navigation}) =>({
      tabBarIcon:({ focused, horizontal, tintColor }) => {
        if (navigation.state.routeName === "Search") {
          return <MaterialIcons name='schedule' size={25} color={tintColor} />
        }
    }

    })
  },
  Home:{
    screen: ()=>{},
    navigationOptions: {
      tabBarIcon: <AddButton />
    }
  },
  Cart: {
    screen: ViewCart,
    navigationOptions: ({navigation}) =>({
      tabBarIcon:({ focused, horizontal, tintColor }) => {
        if (navigation.state.routeName === "Cart") {
          return <Icon name='shopping-cart-outline' width={25} height={25} fill={tintColor} />
        }
    }

    })
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) =>({
      tabBarIcon:({ focused, horizontal, tintColor }) => {
        if (navigation.state.routeName === "Profile") {
          return <Icon name='person' width={25} height={25} fill={tintColor} />
        }
    }

    })
  }
}, {
  initialRouteName: 'Orders',
  tabBarOptions:{  showLabel: false,
    activeTintColor: '#55c2ff',
    inactiveTintColor: '#272727'},
});

const OrderNavigator = createStackNavigator(
  {
    BottomNav: BottomNavigator,
    OrderItemList: OrderItems,
    ViewCart: ViewCart,
    CustomerFeeback: CustomerFeeback
  },
  {
    initialRouteName: 'BottomNav',
    headerMode: 'none'
  }
);


const MainNav = createStackNavigator({
  Login: Login,
  Signup: Signup,
  MainFlow: OrderNavigator},
  {
    initialRouteName: 'Login',
    header: null,
  headerMode: 'none'
  }
)

export const BottomNav = createAppContainer(MainNav);
