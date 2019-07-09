import React from 'react';
import { View, ScrollView, StyleSheet, FlatList, Button, Alert, AsyncStorage } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import ActionButton from '../components/ActionButton'
import { Contacts } from 'expo';
import * as Icon from '@expo/vector-icons'

export default class ActionScreen extends React.Component {
  // Note: To bind a function into the navigation options
  // I put _this=this into the componentDidMount method

  static navigationOptions =  ({ navigation }) => ({
    title: 'LooseRoots',
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'System',
      color: 'rgb(68, 73, 84)',
    },
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      shadowOffset:{  width: 0 ,  height: .2,  },
      shadowColor: 'rgb(68, 73, 84)',
      shadowOpacity: .1,
    },
    headerLeft: (
      <Button
        onPress={() => _this._signOut()}
        title="Profile"
      />
    ),
    headerRight: (
      <Button
        onPress={() => _this._signOut()}
        title="Sign Out"
      />
    ),
  });

  constructor(props){
    super(props);
    this.state = {actions: []}
  }

  componentDidMount(){
    _this = this; 

    action_list = [
      {"text": "This will be a swipeable event", "color": "#ff4081"},
      {"text": "This will also be a swipeable event", "color": "#40c4ff"},
      {"text": "Surfing in Pacifica", "color": "white"},
      {"text": "Hiking in the Alps", "color": "white"}, 
      {"text": "Riding bikes at the marina", "color": "white"},
      {"text": "Chowing at Pong's", "color": "white"},]

      // {"text": "Interested", "color": "#fff"},
      // {"text": "Smoke Sesh", "color": "#fff"},
      // {"text": "Hangout", "color": "#fff"},
      // {"text": "Go Somewhere", "color": "#fff"}, 
      // {"text": "Chill", "color": "#fff"},
      // {"text": "Chow Down", "color": "#fff"},]
    this.setState({
      actions: action_list,
    })
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          
        </View>
        <ScrollView style={styles.scrollSwipeContainer}>
          <FlatList
            data={this.state.actions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ ({item}) => <ActionButton action_data={item} navigation={navigate}/>}      
          />
        </ScrollView>
      </View>
    );
  }

  _signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  filterContainer: {
    flex: .15,
  },
  scrollSwipeContainer: {
    flex: .85,
    backgroundColor: 'rgb(248, 248, 249)',
    // backgroundColor: 'black',
  },
});
