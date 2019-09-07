import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Animated,
  Easing,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export default class CreateButton extends React.Component {
  constructor(props){
    super(props);
    this.spinValue = new Animated.Value(0);
    this.halfwaySpinFlag = false; 
  }

  // On button press
  _spinIcon = () => {
    if (this.halfwaySpinFlag){
      this.spinValue.setValue(1);
      Animated.timing(
        this.spinValue,
        {
          toValue: 0,
          duration: 300,
          easing: Easing.linear
        }
      ).start();
    } else {
      this.spinValue.setValue(0);
      Animated.timing(
        this.spinValue,
        {
          toValue: 1,
          duration: 300,
          easing: Easing.linear
        }
      ).start();
    }
    this.halfwaySpinFlag = !this.halfwaySpinFlag;
  }
  
  _onPress = () => {
    this.props.onPress();
    this._spinIcon();
  }

  
  render(){
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    }); 
    
    return (
      <View style={[styles.container, this.props.positionStyle]}>
        <TouchableWithoutFeedback
          style={styles.imageContainer}
          onPress={this._onPress}>
          <Animated.Image 
            style={{transform: [{rotate: spin}], height: '100%', width: '100%',}}
    	    source={require('../assets/images/gdrive-icon.png')}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 64,
    height: 64, 
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, .05)',
    //borderColor: 'rgba(254, 90, 69, .5)',
    borderWidth: 3,
    borderRadius: 32,
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  
});
