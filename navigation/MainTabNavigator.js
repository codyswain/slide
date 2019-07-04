import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ContactScreen from '../screens/ContactScreen';
import ActionScreen from '../screens/ActionScreen';
import NotificationScreen from '../screens/NotificationScreen';

import { Icon } from 'react-native-elements'; // Icons for tab navigator

const HomeStack = createStackNavigator({
  Action: ActionScreen,
  Contact: ContactScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-home'}
    />
  ),
};

const NotificationStack = createStackNavigator({
  Notifications: NotificationScreen,
});

NotificationStack.navigationOptions = {
  tabBarLabel: 'Notifications',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-chatbubbles'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  NotificationStack,
}, 
{
  tabBarOptions: {
    style: {
      borderTopColor: "transparent",
      shadowOffset:{  width: 0 ,  height: .2,  },
      shadowColor: 'rgb(68, 73, 84)',
      shadowOpacity: .1,
    }
  }
});
