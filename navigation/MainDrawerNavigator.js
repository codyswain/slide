import React from 'react';
import {
  createDrawerNavigator,
  createAppContainer,
} from 'react-navigation';
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerNavigator from "../components/CustomDrawerNavigator";
import MainTabNavigator from './MainTabNavigator';
import BookmarkScreen from '../screens/BookmarkScreen.js';

const MainDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-home" style={{ color: tintColor }} />
        ),
        drawerLabel: "Home"
      },
      screen: MainTabNavigator,
    },
    Settings: {
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="md-settings" style={{ color: tintColor }} />
        ),
        drawerLabel: "Bookmarks"
      },
      screen: BookmarkScreen
    },
  },
  {
    contentComponent: CustomDrawerNavigator, 
  }
);

const MainApp = createAppContainer(MainDrawerNavigator);
export default MainApp; 
