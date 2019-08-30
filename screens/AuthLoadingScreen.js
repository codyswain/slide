import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  StatusBar,
  ActivityIndicator,  
} from 'react-native';
import { fire } from '../src/config.js';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount(){
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    fire.auth().onAuthStateChanged(function(user){
      if(user){
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    }.bind(this));   
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',}}>
        <Text>App is loading!</Text>
        <Text>Add some sick loading animation here!</Text>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
