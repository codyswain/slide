import React from 'react';
import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator, 
} from 'react-navigation';
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import CustomDrawerNavigator from "../components/CustomDrawerNavigator";
import MainTabNavigator from './MainTabNavigator';
import LogoutScreen from '../screens/LogoutScreen';
import ProfileScreen from '../screens/ProfileScreen.js';
import EditProfileScreen from '../screens/EditProfileScreen.js';

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  EditProfile: EditProfileScreen,
});

ProfileStack.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <FontAwesome
      name="user-circle-o"
      size={25}
      color="rgb(68, 73, 84)"
    />
  ),
  drawerLabel: "Profile"
};


MainTabNavigator.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Ionicons
      name="md-home"
      style={{ color: tintColor }}
      size={25}
    />
  ),
  drawerLabel: "Home"
};

LogoutScreen.navigationOptions = {
  drawerIcon: ({ tintColor }) => (
    <Ionicons
      name="ios-exit"
      style={{ color: tintColor }}
      size={25}
    />          
  ),
  drawerLabel: "Sign out"
};
LogoutScreen.screen = LogoutScreen; 



const MainDrawerNavigator = createDrawerNavigator(
  {
    MainTabNavigator,
    ProfileStack,
    LogoutScreen,
  },
  {
    contentComponent: CustomDrawerNavigator,
    drawerWidth: 200,
  }
);

const MainApp = createAppContainer(MainDrawerNavigator);
export default MainApp; 
