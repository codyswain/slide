import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
  Button
} from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  Ionicons
} from '@expo/vector-icons';
import { db, fire } from '../src/config.js';

export default class EditProfileScreen extends React.Component {

  static navigationOptions =  ({ navigation }) => ({
    title: 'Edit Profile',
    headerTitleStyle: {
      fontSize: 23,
      fontFamily: 'System',
      fontWeight: "300",
      color: 'rgb(68, 73, 84)',
    },
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      shadowOffset:{  width: 0 ,  height: .1,  },
      shadowColor: 'rgb(68, 73, 84)',
      shadowOpacity: .1,
    },
    headerLeft: (
      <TouchableOpacity onPress={navigation.getParam('goBack')}>
        <View style={{marginLeft: 10}}>
          <Ionicons
            name='ios-arrow-back'
            size={26}
            color="rgb(68, 73, 84)"
          />
        </View>
      </TouchableOpacity>
    ),
  });

  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this._loadProfile();
    this.props.navigation.setParams({ goBack: this._goBackHandler });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}></View>

        {this._renderProfile()}

        <View style={styles.main}>
          <Text>{this.state.prevName}</Text>
          <Text>{this.state.prevPhoneNumber}</Text>

          <TextInput
            style={{
              height: 40,
              width: '90%',
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 2,
              padding: 8,
            }}
            placeholder={this.state.prevName}
            onChangeText={(text) => this.setState({name: text})}
          />
          <TextInput
            style={{
              height: 40,
              width: '90%',
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 2,
              padding: 8,
            }}
            placeholder={this.state.prevPhoneNumber}
            onChangeText={(text) => this.setState({phoneNumber: text})}
          />
        </View>
        <Button
          title='Submit Changes'
          onPress = {() => this._updateProfile()}
        />
      </View>
    );
  }

  _goBackHandler = () => {
    this.props.navigation.goBack();
  }

  _updateProfile = async () => {
    try {
      let user = await fire.auth().currentUser;
      await db.collection('users').doc(user.uid).update({
        name: this.state.name,
        phoneNumber: this.state.phoneNumber
      });
      this.setState({
        prevName: this.state.name,
        prevPhoneNumber: this.state.phoneNumber
      });
    } catch (error) {
      console.log(error);
    }
  }

  _renderProfile = () => {
    if (this.uri){
      return (
        <View style={{flex: 4, justifyContent: 'center', alignItems: 'center', }}>
          <Image
            style={{flex: 1, width: 200,}}
            source={{uri: this.uri}}
          />
        </View>
      );
    } else {
      return (
        null
      );
    }
  }

  _loadProfile = async () => {
    try {
      let user = await fire.auth().currentUser;
      let userData = await db.collection('users').doc(user.uid);
      userData = await userData.get();

      this.setState({
        prevName: userData.get('name'),
        prevPhoneNumber: userData.get('phoneNumber')
      });
    } catch (error) {
      console.log(error);
   }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(238, 238, 238)',
  },
  header: {

    width: '100%',
    backgroundColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  main: {
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center', 
  }
}); 
