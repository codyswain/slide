import React from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  FlatList, 
  Button, 
  Alert, 
  AsyncStorage,
  TouchableOpacity,
  Text,
  Image,
  Dimensions, 
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import EventPane from '../components/EventPane';
import CreateButton from '../components/CreateButton';
import CreateMenu from '../components/CreateMenu';
import FilterButton from '../components/FilterButton';
import { Contacts } from 'expo';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { db, fire } from '../src/config.js';
import { Header } from 'react-navigation';

export default class ExploreScreen extends React.Component {
  // Note: To bind a function into the navigation options
  // I put _this=this into the componentDidMount method
  
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      events: [],
      toggleCreateMenu: false,
    };
  };

  componentDidMount(){
    this.getEvents();
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <ScrollView 
            contentContainerStyle={styles.horizontalFilterScrollContent} 
            style={styles.horizontalFilterScroll} 
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <FilterButton
              text={"Food"}
              icon={<MaterialIcons name="local-pizza" size={20} color="white"/>}
              selected={true}
              color={styles.f1}
            />
            <FilterButton
              text={"Drink"}
              icon={<MaterialIcons name="local-bar" size={20} color="white"/>}
              color={styles.f2}
            />
            <FilterButton
              text={"Cafe"}
              icon={<MaterialIcons name="local-cafe" size={20} color="white"/>}
              color={styles.f3}
            />
            <FilterButton
              text={"Dining"}
              icon={<MaterialIcons name="local-dining" size={20} color="white"/>}
              color={styles.f4}
            />
            <FilterButton
              text={"Movie"}
              icon={<MaterialIcons name="local-movies" size={20} color="white"/>}
              color={styles.f5}
            />
          </ScrollView>
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

  // Retrieves firestore events recommended for user
  getEvents = async () => {
    let user = await fire.auth().currentUser;
    let snapshot =
        await db.collection("users").doc(user.uid).collection('events-to-recommend').get();

    ids = []; 
    snapshot.forEach(doc => {
      ids.push(doc.id);    
    });

    all_events = [];
    ids.forEach( async (item, index) => {
      doc = await db.collection("events").doc(item).get();
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
        this.setState(state => {
          const events = state.events.concat(event);
          return {
            events
          };
        });
     } else {
        console.log("Undefined event");
      };
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  filterContainer: {
    flex: .06,
    alignItems: 'center',
    shadowOffset:{  width: 0 ,  height: .2,  },
    shadowColor: 'rgb(68, 73, 84)',
    shadowOpacity: .1,
    zIndex: 1,
    backgroundColor: 'white',
  },
  horizontalFilterScroll: {
    width: Dimensions.get('window').width,
  },
  horizontalFilterScrollContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    width: 75,
    height: 28, 
    borderRadius: 1, 
    marginLeft: 6,
    shadowOffset: { width: 0, height: .1 },
    shadowColor: 'rgb(68, 73, 84)',
    shadowOpacity: .1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollSwipeContainer: {
    position: 'absolute',
    marginTop: '12%',
    width: '100%',
    flex: .94,
    backgroundColor: 'rgb(238, 238, 238)',
    zIndex: 0,
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
    fontWeight: '500',
    color: 'white',
  },
});
