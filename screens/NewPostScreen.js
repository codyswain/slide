import React from 'react';
import {
  TouchableOpacity,
  TextInput, 
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import AddRemovePlan from '../components/newplan/AddRemovePlan';
import MapView from 'react-native-maps';

export default class NewPostScreen extends React.Component {
  /* Screen for creating a new plan
     This component is composed of the following: 
     1. Google Maps: displays all locked in events in order
     2. AddRemovePlan Section: Where user can add locations,
     
  */
  static navigationOptions =  ({ navigation }) => ({
    title: 'New Plan',
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
  });

  constructor(props){
    super(props);
    this.state = {
      nameText: '',
      addressText: '',
    };
  }

  _handleSelectedEvent = (id) => {
    console.log(id);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentOffset={{x:0, y:1}}
        >
          <View style={styles.mapContainer}>
            <MapView
              style={{height: '100%', width: '100%',}}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            />
          </View>
          
          <AddRemovePlan
            navigation={this.props.navigation}
            style={styles.eventContainer}
          />
          
          <View style={styles.datetimeContainer}>
            <View style={styles.nameInput}>

              <TextInput
                style={{
                  height: 40,
                  width: '90%',
                  borderColor: 'black',
                  borderWidth: 2,
                  borderRadius: 2,
                  padding: 8, }}
                placeholder="Enter the time information here"
                onChangeText={(nameText) => this.setState({nameText})}
                value={this.state.text}
              />
              
          </View>
            <View style={styles.addressInput}>
              <TextInput
                style={{
                  height: 40,
                  width: '90%',
                  borderColor: 'black',
                  borderWidth: 2,
                  borderRadius: 2, 
                  padding: 8,
                }}
                placeholder="Enter place information here"
                onChangeText={(addressText) => this.setState({addressText})}
                value={this.state.text}
            />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={{color: 'white'}}>Submit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottom}></View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  mapContainer: {
    height: 300,
    width: '100%',
    backgroundColor: 'black',
  },
  eventContainer: {
    flex: .6,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  datetimeContainer: {
    flex: 2,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    flex: .1,
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  nameInput: {
    flex: .1,
    width: '100%',
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  addressInput: {
    flex: .1,
    width: '100%',
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: .2,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    height: '100%',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'black',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'black',
  },
  bottom: {
    flex: 0,
  }
  
  
});
