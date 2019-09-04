import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export default class CreateButton extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={[styles.container, this.props.positionStyle]}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={this.props.onPress}>
          <Image 
    	    style={{height: '100%', width: '100%',}}
    	    source={require('../assets/images/gdrive-icon.png')}
          />
        </TouchableOpacity>
      </View>

      /* <View style={{width: 64,
                    height: 64,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    right: 20,
                    bottom: 20,
                    borderColor: 'rgba(0, 0, 0, .05)',
                    borderWidth: 3,
                    borderRadius: 32, 
                   }}>
        <Image 
    	  style={{height: '100%', width: '100%',}}
    	  source={require('../assets/images/gdrive-icon.png')}
        />
          </View>

       */
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
