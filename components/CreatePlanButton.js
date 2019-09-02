import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
export default class CreatePlanButton extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <TouchableOpacity
        onPress={() => {this.props.navigation.navigate('CreatePlan');}}
      >
        <View style={styles.buttonContainer}>
          <Image 
    	    style={{width: '100%', height:'100%',}}
    	    source={require('../assets/images/gdrive-icon.png')}
    	  />
          {/* <MaterialIcons
            name="group-add"
            size={28}
            color="white"
            /> */}

        </View>
      </TouchableOpacity>
    );
  }
}

styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 64,
    height: 64,
    borderRadius: 35,
   
    zIndex: 1,
    //backgroundColor: '#5677fc',

    justifyContent: 'center',
    alignItems: 'center',

    
    borderColor: 'rgba(0, 0, 0, .05)',
    borderWidth: 3,
        
  }
})
