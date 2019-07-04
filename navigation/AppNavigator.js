import React from 'react';
import { 
	createSwitchNavigator,
	createStackNavigator, 
	createAppContainer 
} from 'react-navigation';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Button,
  Alert,
} from 'react-native';

import MainTabNavigator from './MainTabNavigator';

import * as Facebook from 'expo-facebook';


class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}


class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View>
        <Button title="Sign in!" onPress={this._logIn} />
      </View>
    );
  }

  _logIn = async () => {
	  try {
	    const {
	      type,
	      token,
	      expires,
	      permissions,
	      declinedPermissions,
	    } = await Facebook.logInWithReadPermissionsAsync('430593930868332', {
	      permissions: ['public_profile'],
	    });
	    if (type === 'success') {
	      // Get the user's name using Facebook's Graph API
	      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
	      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
	      await AsyncStorage.setItem('userToken', token);
    		this.props.navigation.navigate('App');
	    } else {
	      // type === 'cancel'
	    }
	  } catch ({ message }) {
	    alert(`Facebook Login Error: ${message}`);
	  }
	} 

}

// class HomeScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Welcome to the app!',
//   };

//   render() {
//     return (
//       <View>
//         <Button title="Show me more of the app" onPress={this._showMoreApp} />
//         <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
//       </View>
//     );
//   }

//   _showMoreApp = () => {
//     this.props.navigation.navigate('Other');
//   };

//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
// }

const AuthStack = createStackNavigator({ SignIn: SignInScreen });


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