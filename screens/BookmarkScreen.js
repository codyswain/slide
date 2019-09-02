import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
} from 'react-native';
import SavedEventPane from '../components/SavedEventPane';
import { db, fire } from '../src/config.js';

export default class BookmarksScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => ({
    title: 'Bookmarks',
    headerTitleStyle: {
      fontSize: 24,
      fontWeight: '300',
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
  });

  constructor(props){
    super(props);
    this.state = {
      isLoadingEvents: false, 
      events: [],
    };

    // Flag to prevent initial duplicate execution of updateEventCards()
    this.componentMounted = false;

    // Stores event ids in database associated with user
    this.savedEventIds = {};

    // Event ids which are loaded in cards, and displayed to user
    this.loadedEvents = {};
    this.loadedEventsList = [];

    // Adds subscription to when a user clicks on the bookmarks tab icon
    // Updates the event cards that are displayed
    this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
      if (this.componentMounted){
        this.updateEventCards();
      };
    });
  };
  
  // Retrieve event cards, and change bool flag so when a user clicks on the
  // bookmark tab icon, events will be reloaded.
  componentDidMount(){
    this.updateEventCards().then( () => {
      this.componentMounted = true;
    });
  };

  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollSwipeContainer}>
          <FlatList
            data={this.loadedEventsList}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ ({item}) => <SavedEventPane
                                       refreshHandler={this.updateEventCards}
                                       event_data={item}
                                       navigation={navigate}/>}   
          />
        </ScrollView>
      </View>
    );
  };

  // Wrapper to execute _getSavedEventIds, then _loadNewSavedEvents
  updateEventCards = async () => {
    this._getSavedEventIds().then( () => {
      this._loadNewSavedEvents().then( () => {
        this._updateEventCards();
      });
    });
  }

  // Retrieves events ids for a user from firestore
  _getSavedEventIds = async () => {
    this.savedEventIds = {}; 
    let user = await fire.auth().currentUser;
    let snapshot =
        await db.collection("users").doc(user.uid).collection('events-saved-by-user').get();
    snapshot.forEach(doc => {
      this.savedEventIds[doc.id] = true;    
    });
  }

  // Loads new unique events into state variable
  _loadNewSavedEvents = async () => {
    // Add events in firestore, that aren't in loadedEvents
    for (var id in this.savedEventIds){
      if (!(id in this.loadedEvents)){
        doc = await db.collection("events").doc(id).get();
        db_event = doc.data();
        if (db_event){
          event = {
            'id': doc.id,
            'name': db_event['name'], 
            'type': db_event['type'],
            'subtitle': db_event['subtitle'],
            'address': db_event['address'],
            'photoURL': db_event['photoURL'],
          };
          this.loadedEvents[doc.id] = event;
        } else {
          console.log("Undefined events");
        }
      }
    }

    // Delete events that have been removed from firestore
    id_list = []; 
    for (var id in this.loadedEvents){
      if (!(id in this.savedEventIds)){
        delete this.loadedEvents[id];
      }
    }
  }

  _updateEventCards = async () => {
    this.setState({
      isLoading: true, 
    });
    this.loadedEventsList = [];
    for (var key in this.loadedEvents){
      this.loadedEventsList.push(this.loadedEvents[key]);
    }
    this.setState({
      isLoading: false, 
    });
    
  }

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  scrollSwipeContainer: {
    flex: .88,
    backgroundColor: 'rgb(238, 238, 238)',
  },
  f1: {backgroundColor: "#e91e63"},
  f2: {backgroundColor: "#ff4081"},
  f3: {backgroundColor: "#5677fc"},
  f4: {backgroundColor: "#40c4ff"},
  f5: {backgroundColor: "#5af158"},
  f6: {backgroundColor: "#ffd740"},
  filterButtonText: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: 'white',
  },
});
