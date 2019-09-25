import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  AsyncStorage,
} from 'react-native';

import { fire } from '../src/config.js';

export default class LogoutScreen extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this._signOut();
  }

  render() {
    return (
      <View>
        <Text>blah blah blah</Text>
      </View>
    );
  }
  
  _signOut = () => {
    AsyncStorage.removeItem('userToken');
    var user = fire.auth().currentUser;
    if (user){
      fire.auth().signOut().then(function(){
        console.log("Successful logout");
        this.props.navigation.navigate('Auth');
      }).catch(function(error) {
        console.log("Not properly signed out");
        console.log(error);
      });
    };
  }
}
