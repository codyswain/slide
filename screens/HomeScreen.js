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
import CreatePlanButton from '../components/CreatePlanButton';
import { Contacts } from 'expo';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { db, fire } from '../src/config.js';

export default class HomeScreen extends React.Component {
  // Note: To bind a function into the navigation options
  // I put _this=this into the componentDidMount method

  static navigationOptions =  ({ navigation }) => ({
    title: 'Slide',
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'System',
      fontStyle: 'italic',
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
      <TouchableOpacity onPress={() => _this._signOut()}>
        <View style={{marginLeft: 10}}>  
          <FontAwesome
            name="user-circle-o"
            size={24}
            color="rgb(68, 73, 84)"
          />
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={() => _this._signOut()}> 
        <View style={{marginRight: 10}}>
          <MaterialIcons
            name="settings"
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
      isLoading: true,
      events: [],
    };
  };

  componentDidMount(){
    _this = this; // For binding functions to navigation components in header
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
            <TouchableOpacity onPress={this._updateEventContainers}>
              <View style={[styles.filterButton, styles.f1]}>
                <Text style={styles.filterButtonText}>Food</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._updateEventContainers}>
              <View style={[styles.filterButton, styles.f2]}>
                <Text style={styles.filterButtonText}>Drink</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._updateEventContainers}>
              <View style={[styles.filterButton, styles.f3]}>
                <Text style={styles.filterButtonText}>Active</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._updateEventContainers}>
              <View style={[styles.filterButton, styles.f4]}>
                <Text style={styles.filterButtonText}>Movie</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._updateEventContainers}>
              <View style={[styles.filterButton, styles.f5]}>
                <Text style={styles.filterButtonText}>Park</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._updateEventContainers}>
              <View style={[styles.filterButton, styles.f6]}>
                <Text style={styles.filterButtonText}>More</Text>
              </View>
            </TouchableOpacity>
            </ScrollView>
        </View>
        <ScrollView style={styles.scrollSwipeContainer}>
          <FlatList
            data={this.state.events}
            keyExtractor={(item, index) => index.toString()}
            renderItem={ ({item}) => <EventPane event_data={item} navigation={navigate}/>}      
          />
        </ScrollView>
        <CreatePlanButton navigation={this.props.navigation}/>
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

  // Removes a users token, and navigates them to authentication screen.
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
    flex: .12,
    alignItems: 'center', 
    shadowOffset:{  width: 0 ,  height: .2,  },
    shadowColor: 'rgb(68, 73, 84)',
    shadowOpacity: .1,
  },
  horizontalFilterScroll: {
    width: Dimensions.get('window').width,
  },
  horizontalFilterScrollContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterButton: {
    // width: 58,
    // height: 58, 
    // borderRadius: 50, 
    width: 75,
    height: 50, 
    borderRadius: 6, 
    marginLeft: 6,
    shadowOffset: { width: 0, height: .1 },
    shadowColor: 'rgb(68, 73, 84)',
    shadowOpacity: .1,

    alignItems: 'center',
    justifyContent: 'center',
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
