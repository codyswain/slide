import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export default class CreateMenu extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={[styles.container, this.props.positionStyle]}>
        <View style={styles.wrapper}>
          <View style={{flex:.2}}></View>
          
          <View style={styles.planButton}>
            <Text style={styles.buttonText}>New Plan</Text>
          </View>

          <View style={{flex:.2}}></View>
          
          <View style={styles.postButton}>
            <Text style={styles.buttonText}>Create Post</Text>
          </View>

          <View style={{flex:.2}}></View>
        </View>
      </View>
    ); 
  }
}

styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 90,
    height: 120,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  wrapper: {
    width: '100%',
    height: '100%',
  },
  
  planButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderColor: 'rgba(68, 73, 84, .1)',
    borderWidth: 1.6,
    borderBottomWidth: .8,
    backgroundColor: 'white',
  },

  postButton:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    borderColor: 'rgba(68, 73, 84, .1)',
    borderWidth: 1.6,
    borderTopWidth: .8,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '400',
    color: 'rgb(68, 73, 84)',
  }
});
