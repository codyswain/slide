import React from 'react';
import { Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { 
  createStackNavigator, 
  createBottomTabNavigator 
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import NewPostScreen from '../screens/NewPostScreen';
import NewPlanScreen from '../screens/NewPlanScreen';
import SocialScreen from '../screens/NotificationScreen';
import BookmarkScreen from '../screens/BookmarkScreen'; 

/* ---- About ----
There are three screens accessible via the tab navigator (Home, Social,
Bookmarks). Each of the tabs is a stack navigator. Below is the code for the tab
navigator and the individual stack navigators. All additional screens must be
imported into this file, and managed from here. 
*/ 

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  NewPost: NewPostScreen,
  NewPlan: NewPlanScreen,
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

const SocialStack = createStackNavigator({
  Social: SocialScreen,
});

SocialStack.navigationOptions = {
  tabBarLabel: 'Social',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-chatbubbles'}
    />
  ),
};

const BookmarkStack = createStackNavigator({
  Bookmark: BookmarkScreen,
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
  SocialStack,
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
