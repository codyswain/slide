import React from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  FlatList, 
  Button, 
  Alert, 
  AsyncStorage 
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import EventPane from '../components/EventPane'
import { Contacts } from 'expo';
import * as Icon from '@expo/vector-icons';
import { db } from '../src/config.js';

// Retrieve all events in firebase
let get_all = async () => {
  let snapshot = await db.collection("events").get();
  events = [];
  snapshot.forEach(doc => {
    db_event = doc.data()
    event = {
      'name': db_event['name'],
      'type': db_event['type'],
      'address': db_event['address'],
      'photoId': db_event['photoId'],
    }
    events.push(event);
  });
  return events;
}

export default class ActionScreen extends React.Component {
  // Note: To bind a function into the navigation options
  // I put _this=this into the componentDidMount method

  static navigationOptions =  ({ navigation }) => ({
    title: 'Slide',
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
  };

  componentDidMount(){
    _this = this; 

    events_list = [
      {"text": "This will be a swipeable event", "color": "#ff4081"},
      {"text": "This will also be a swipeable event", "color": "#40c4ff"},
      {"text": "Surfing in Pacifica", "color": "white"},
      {"text": "Hiking in the Alps", "color": "white"}, 
      {"text": "Riding bikes at the marina", "color": "white"},
      {"text": "Chowing at Pong's", "color": "white"},];

    this.setState({
      events: events_list,
    });
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Button title="test retrieve" onPress={this._updateEventContainers} />
        </View>
        <ScrollView style={styles.scrollSwipeContainer}>
          <FlatList
            data={this.state.events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ ({item}) => <EventPane event_data={item} navigation={navigate}/>}      
          />
        </ScrollView>
      </View>
    );
  };

  _updateEventContainers = async () => {
    let all_events = await get_all();
    this.setState({
      events: all_events,
    })
  };

  _signOut = async () => {
    await AsyncStorage.removeItem('userToken');
    this.props.navigation.navigate('Auth');
  };
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
