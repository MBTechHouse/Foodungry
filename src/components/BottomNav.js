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
  Orders: OrderNavigator,
  Search: Search,
  Profile: Profile
}, {
  initialRouteName: 'Orders',
  tabBarComponent: BottomNavigationShowcase,
});

const MainNav = createStackNavigator({
  HomeScreen: HomeScreen,
  MainFlow: BottomNavigator},
  {
    initialRouteName: 'HomeScreen',
    header: null,
  headerMode: 'none'
  }
)

export const BottomNav = createAppContainer(MainNav);