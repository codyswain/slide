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
import { db, fire } from '../src/config.js';

export default class EventPane extends React.Component {
  constructor(props){
    super(props);
    this.event_id = props.event_data['id'];
    this.event_name = props.event_data['name'];
    this.event_type = props.event_data['type'];
    this.event_subtitle = props.event_data['subtitle'];
    this.event_address = props.event_data['address'];
    this.event_photoURL = props.event_data['photoURL'];
  }
  
  _onPress = () => {  
    // color_theme = this.props.action_data['color']
    // this.props.navigation('Contact', {color: color_theme})
  };

  render(){
    event_id = this.event_id;
    event_name = this.event_name;
    event_type = this.event_type;
    event_subtitle = this.event_subtitle;
    event_address = this.event_address;
    event_photoURL = this.event_photoURL; 

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
    console.log(this.event_id);
    console.log(this.event_type);

    // Save the event in the users collection on firestore
    base = db.collection('users').doc(user.uid).collection('events-saved-by-user');
    base.doc(this.event_id).set({});

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
    height: 210,
    borderRadius: 2,
    backgroundColor: "white",
    overflow: 'hidden',
  },

  /* Header */
  headerContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    height: '50%',
    width: '100%',
    paddingTop: '2%',
    paddingLeft: '3%',
    paddingRight: '3%',
  },
  headerTextName: {
    fontSize: 24,
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
    flex: 1, 
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
