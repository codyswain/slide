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
  TouchableOpacity,
  Text,
  Image
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
    header: null,
  };

  render() {
    return (
    	<View style={styles.backgroundContainer}> 
    		<View style={styles.titleContainer}>
    			<Text style={styles.titleText}>LooseRoots</Text>
    		</View>
    		<View style={styles.subtitleContainer}>
    			<Text style={styles.subtitleText}>Make Meaningful Memories.</Text>
    		</View>

    		<View style={styles.imageContainer}>
    		  <Image 
    		  	style={styles.imageStyling}
    		  	source={require('../assets/images/login_tree_photo.jpg')}
    		  />
    		</View>

	    	<TouchableOpacity onPress={this._logIn}>
	        <View style={styles.loginButton}>
	          <Text style={styles.loginButtonText}>Sign in with Facebook</Text>
	        </View>
	      </TouchableOpacity>

	      <TouchableOpacity onPress={this._logIn}>
	        <View style={styles.signupButton}>
	          <Text style={styles.signupButtonText}>Sign up</Text>
	        </View>
	      </TouchableOpacity>
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


const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1, 
		backgroundColor: "white",
	},
	titleContainer: {
		marginTop: 48, 
		height: 60,
		// backgroundColor: 'blue',
		justifyContent: 'center',
		alignItems: 'center', 
	},
	titleText: {
		color: 'black',
    fontSize: 41,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: "#3b5998",
    // color: '#e91e63',
	},
	subtitleContainer: {
		height: 20,
		// backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'center', 
	},
	subtitleText: {
		// color: "#3b5998",
		color: 'black',
		fontSize: 14,
		fontWeight: 'bold',
		fontFamily: 'System',
	},
	imageContainer: {
		height: 360,
		alignItems: 'center',
		justifyContent: 'center', 
	},
	imageStyling: {
		flex: 1, 
		resizeMode: 'contain',
	},
  loginButton: {
    marginRight: 19,
    marginLeft: 19,
    height: 58,
    borderRadius: 30,
    backgroundColor: "#3b5998",
    justifyContent: 'center',
    alignItems: 'center',

    shadowOffset:{  width: .1 ,  height: .5,  },
    shadowColor: 'rgb(230, 230, 230)',
    shadowOpacity: .8,
  },
  loginButtonText: {
    // color: 'rgb(68, 73, 84)',
    color: 'white',
    fontSize: 17,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  signupButton: {
    marginRight: 19,
    marginLeft: 19,
    marginTop: 12,
    height: 58,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#3b5998",
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',

    shadowOffset:{  width: .1 ,  height: .5,  },
    shadowColor: 'rgb(230, 230, 230)',
    shadowOpacity: .8,
  },
  signupButtonText: {
    // color: 'rgb(68, 73, 84)',
    color: '#3b5998',
    fontSize: 17,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
})