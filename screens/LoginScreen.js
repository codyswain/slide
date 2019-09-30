import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Async,
  Alert, 
  Image,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import * as Facebook from 'expo-facebook'; 
import { fire } from '../src/config.js';

/* ---- About ----
The screen a new or logged out user views upon opening the application. 

---- To-do ----
1. Add the option to login with Google. 
2. Pick an original color scheme.
3. Design a photo for the cover. */


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ImageBackground
        source={require('../assets/images/login/background.png')}
        style={styles.backgroundContainer}
      >
        <View style={styles.spacing1}></View>
        <View style={styles.mainTitleContainer}>
          <Image
            source={require('../assets/images/login/slide-text.png')}
            style={styles.mainText}
          />
        </View>

        <View style={styles.mainIconContainer}>
          <Image
            source={require('../assets/images/login/martini-icon.png')}
            style={styles.mainIcon}
          />
        </View>
        
        <View style={styles.spacing2}></View>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity onPress={this._login}>
            <Image
              source={require('../assets/images/login/login-button.png')}
              style={styles.loginButton}
            />
	  </TouchableOpacity>
        </View>
        
        <View style={styles.signupButtonContainer}>
	  <TouchableOpacity onPress={this._checkUser}>
            <Image source={require('../assets/images/login/signup-button.png')}
                   style={styles.signupButton}
            />
	  </TouchableOpacity>
        </View>
        <View style={styles.spacing3}></View>
    	
      </ImageBackground>      
    );
  }

  _checkUser = async () => {
    var user = fire.auth().currentUser;
    console.log(user);
  };

  _login = async () => {
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
        // Store token in persistent storage for future logins
        await AsyncStorage.setItem('userToken', token);

        // Build firebase credentials with Facebook auth token
        const credential = fire.auth.FacebookAuthProvider.credential(token);

        // Sign in to firebase with credentials from Facebook user
        fire.auth().signInWithCredential(credential).then(function(){
          // Navigate to home page
    	  this.props.navigation.navigate('App');
        }).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });

      } else {
	// type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  } 
}

/* ---- Styling ---- */ 
const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  spacing1: {
    flex: 0,
  },
  mainTitleContainer: {
    flex: .25,
    justifyContent: 'center',
  },
  mainIconContainer: {
    flex: .3,
    justifyContent: 'center',
  },
  spacing2: {
    flex: .18,
  },
  loginButtonContainer: {
    flex: .10,
    justifyContent: 'center',
  },
  signupButtonContainer: {
    flex: .10,
    justifyContent: 'center',
  },
  spacing3: {
    flex: .07
  },
  
  mainText: {
    width: 100,
    height: 38,
  },
  mainIcon: {
    width: 80,
    height: 80,
  },
  loginButton: {
    width: 300,
    height: 55,
  },
  signupButton: {
    width: 300,
    height: 55,
  },
  spacing3: {
  },
})
