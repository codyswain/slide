import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ContactScreen from '../screens/ContactScreen';
import ActionScreen from '../screens/ActionScreen';
import NotificationScreen from '../screens/NotificationScreen';
import BookmarkScreen from '../screens/BookmarkScreen'; 

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
  tabBarLabel: 'Social',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-chatbubbles'}
    />
  ),
};

const BookmarkStack = createStackNavigator({
  Bookmarks: BookmarkScreen,
});

BookmarkStack.navigationOptions = {
  tabBarLabel: 'Bookmarks',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-bookmark'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  NotificationStack,
  BookmarkStack, 
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
