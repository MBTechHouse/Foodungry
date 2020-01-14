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
import Profile from './Profile'
import OrderItems from './OrderItems'
import ViewCart from './ViewCart'
import HomeScreen from './HomeScreen.js'
import Login from './Login.js'
import Signup from './Signup.js'

import AddButton from '../components/BottomNavHelper/AddButton'

const OrderIcon = (style) => (
  <Icon {...style} name='pie-chart-2'/>
);

const SearchIcon = (style) => (
  <Icon {...style} name='search'/>
);

const ProfileIcon = (style) => (
  <Icon {...style} name='person'/>
);


export const BottomNavigationShowcase = (props) => {

  const onTabSelect = (selectedIndex) => {
    const { [selectedIndex]: selectedRoute } = props.navigation.state.routes;
    props.navigation.navigate(selectedRoute.routeName);
  };

  return (
    <BottomNavigation
        appearance="noIndicator"
        selectedIndex={props.navigation.state.index}
        onSelect={onTabSelect}>
        <BottomNavigationTab
          title='ORDERS'
          icon={OrderIcon}
        />
        <BottomNavigationTab
          title='SEARCH'
          icon={SearchIcon}
        />
        <BottomNavigationTab
          title='PROFILE'
          icon={ProfileIcon}
        />
      </BottomNavigation>
   );
 }

const OrderNavigator = createStackNavigator(
  {
    Orders: Orders,
    OrderItemList: OrderItems,
    ViewCart: ViewCart
  },
  {
    initialRouteName: 'Orders',
  }
);

const BottomNavigator = createBottomTabNavigator({
  Orders: {
    screen: OrderNavigator,
    navigationOptions: ({navigation}) =>( {
      tabBarIcon:({ focused, horizontal, tintColor }) => {
        console.log(navigation.state.index, tintColor)
        if (navigation.state.routeName === "Orders") {
          return <Icon name='pie-chart-2' width={25} height={25} fill={tintColor} />
        }

    }

    })
  },
  Search: {
    screen: Search,
    navigationOptions: ({navigation}) =>({
      tabBarIcon:({ focused, horizontal, tintColor }) => {
        if (navigation.state.routeName === "Search") {
          return <Icon name='pie-chart-2' width={25} height={25} fill={tintColor} />
        }
    }

    })
  },
  Add:{
    screen: ()=>null,
    navigationOptions: {
      tabBarIcon: <AddButton />
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: ({navigation}) =>({
      tabBarIcon:({ focused, horizontal, tintColor }) => {
        if (navigation.state.routeName === "Profile") {
          return <Icon name='pie-chart-2' width={25} height={25} fill={tintColor} />
        }
    }

    })
  },
  Schedule: {
    screen: Profile,
    navigationOptions: ({navigation}) =>({
      tabBarIcon:({ focused, horizontal, tintColor }) => {
        console.log(navigation.state.index)
        if (navigation.state.routeName === "Schedule") {
          return <Icon name='pie-chart-2' width={25} height={25} fill={tintColor} />
        }
    }

    })
  }
}, {
  initialRouteName: 'Orders',
  tabBarOptions:{  showLabel:false,

    activeTintColor: '#55c2ff',
    inactiveTintColor: '#272727'},
});

const MainNav = createStackNavigator({
  Login: Login,
  Signup: Signup,
  HomeScreen: HomeScreen,
  MainFlow: BottomNavigator},
  {
    initialRouteName: 'Login',
    header: null,
  headerMode: 'none'
  }
)

export const BottomNav = createAppContainer(MainNav);
