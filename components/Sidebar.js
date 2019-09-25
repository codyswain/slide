import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Dimensions from 'Dimensions';
import { MaterialIcons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

export default class Sidebar extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={styles.container}>
      </View>
    ); 
  }
}

styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    left:0,
    top:0,
    height: height,
    width: '50%',
    backgroundColor: 'black',
  },
});
