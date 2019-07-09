import React from 'react';
import { 
	createSwitchNavigator,
	createStackNavigator, 
	createAppContainer 
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator({ Login: LoginScreen });
const SwitchStack = createSwitchNavigator(
	{
  	AuthLoading: AuthLoadingScreen,
  	App: MainTabNavigator,
  	Auth: AuthStack, 
	},
	{
		initialRouteName: 'AuthLoading',
	}
);
const App = createAppContainer(SwitchStack);
export default App; 