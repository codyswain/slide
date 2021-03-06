import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image, 
} from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  Ionicons
} from '@expo/vector-icons';

export default class ProfileScreen extends React.Component {

  static navigationOptions =  ({ navigation }) => ({
    title: 'Profile',
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
      <TouchableOpacity onPress={navigation.openDrawer}>
        <View style={{marginLeft: 10}}>
          <Ionicons
            name='ios-menu'
            size={26}
            color="rgb(68, 73, 84)"
          />
        </View>
      </TouchableOpacity>
    ),
  });

  
  constructor(props){
    super(props);
    this.state = {
      name: '',
    };
  }

  componentDidMount(){
    this._loadProfile();
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}></View>
        
        {this._renderProfile()}
        
        <View style={styles.main}>
          <Text>{this.state.name}</Text>
        </View>
      </View>
    );
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
      const token = await AsyncStorage.getItem('userToken');
      if (token){
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        if (response){
          let responseJson = await response.json();
          console.log(responseJson);
          let userID = responseJson.id;
          let userName = responseJson.name;
          let responsePhoto =
              await fetch(`https://graph.facebook.com/${userID}/picture?type=large&access_token=${token}`);

          this.uri = responsePhoto.url;
          this.setState({
            name: userName
          });
          
        } else {
          console.log("No facebook data");
        }
      }
    } catch (error) {
      // Error retrieving data
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
