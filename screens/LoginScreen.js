import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	Async,
	Alert, 
	Image, 
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
      <View style={styles.backgroundContainer}> 
    	<View style={styles.titleContainer}>
    	  <Text style={styles.titleText}>Slide</Text>
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

	<TouchableOpacity onPress={this._checkUser}>
	  <View style={styles.signupButton}>
	    <Text style={styles.signupButtonText}>Sign up</Text>
	  </View>
	</TouchableOpacity>
      </View> 
    );
  }

  _checkUser = async () => {
    var user = fire.auth().currentUser;
    console.log(user);
  };

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
        // Query facebook information via the graph api 
	// const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

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
    backgroundColor: "white",
  },
  titleContainer: {
    marginTop: 48, 
    height: 60,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  titleText: {
    color: 'black',
    fontSize: 41,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: "#3b5998",
  },
  subtitleContainer: {
    height: 20,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  subtitleText: {
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
    shadowOffset: { width: .1 , height: .5, },
    shadowColor: 'rgb(230, 230, 230)',
    shadowOpacity: .8,
  },
  loginButtonText: {
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
    color: '#3b5998',
    fontSize: 17,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
})
