import React, {Component} from 'react';
import { 
  Text,
  Alert, 
  AsyncStorage,
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { fire } from '../src/config.js';

export default class EventPane extends React.Component {
  constructor(props){
    super(props);
  }
  
  _onPress = () => {  
    // color_theme = this.props.action_data['color']
    // this.props.navigation('Contact', {color: color_theme})
  };

  render(){
    
    event_name = this.props.event_data['name'];
    event_type = this.props.event_data['type'];
    event_subtitle = this.props.event_data['subtitle'];
    event_address = this.props.event_data['address'];
    event_photoURL = this.props.event_data['photoURL'];

    return (
        <View style={styles.container}>
          <TouchableOpacity style={{flex: 5}}> 
            <LinearGradient
              colors={['rgba(0,0,0,.8)', 'rgba(0,0,0,0)']}
              style={styles.headerContainer}>
              <Text style={styles.headerTextName}>{event_name}</Text>
              <Text style={styles.headerTextAddress}>{event_address}</Text>
            </LinearGradient>

            <View style={styles.imageContainer}>
              <Image resizeMode="cover" style={styles.image}
                     source={{ uri: event_photoURL }}/>
            </View>
          </TouchableOpacity>

          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={this._saveItem} style={{flex: 1}}>
              <View style={styles.footerButton}>
                <Text style={styles.footerTextSave}>Save</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1}}>
              <View style={styles.footerButton}>
                <Text style={styles.footerTextMore}>More</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
  
  _saveItem = async () => {
    var user = fire.auth().currentUser;
    console.log(user);
    var token = await AsyncStorage.getItem('userToken');
    console.log(token);
    

    //user_info = await AsyncStorage.getItem('userInfo');
    //Alert.alert(user_info);
  };
}

const styles = StyleSheet.create({
  /* Event Container */ 
  container: {
    marginRight: 10,
    marginLeft: 10,
    marginTop: 12,
    height: 260,
    borderRadius: 2,
    backgroundColor: "white",
    overflow: 'hidden',
  },

  /* Header */
  headerContainer: {
    flex: .4,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: '2%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  headerTextName: {
    fontSize: 26,
    fontFamily: 'System',
    fontWeight: '400',
    color: 'white',
  },
  headerTextType: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: '#e91e63',
  },
  headerTextAddress: {
    fontSize: 10,
    fontFamily: 'System',
    color: 'white',
  },
  
  /* Image */ 
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    height: undefined,
    width: undefined,
  },
  
  /* Footer */
  footerContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1.1, 
    backgroundColor: 'white', 
    flexDirection: 'row',
  },
  footerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
 },
  footerTextSave: {
    color: 'green',
    fontFamily: 'System',
    fontSize: 16, 
    fontWeight: '300',
  },
  footerTextMore: {
    color: 'grey',
    fontSize: 16, 
    fontFamily: 'System',
    fontWeight: '400',
  },
});
