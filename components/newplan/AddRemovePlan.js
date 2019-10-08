import React from 'react';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

class EventShort extends React.Component {
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <View style={{
        marginTop: 8,
        marginBottom: 0,
        width: 356,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'rgba(253,189,3,1)',
        justifyContent: 'center',
        alignItems: 'center',
      }}><Text style={{color: 'white'}}>{this.props.data}</Text>
      </View>
    );
  }
}

export default class AddRemovePlan extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      event_id: '',
      events: [],
    };
  }
  
  render(){
    return(
      <View style={this.props.style}>
        <FlatList
          data={this.state.events}
          keyExtractor={(item, index) => index.toString()}
          renderItem={ ({item}) =>
                       <EventShort
                         navigation={this.props.navigation}
                         data={item}
                       />}
          scrollEnabled={false}
        />
        <TouchableOpacity
          onPress={this._selectBookmark}
          style={styles.addEventButton}
        >
          <Text style={{color: 'white'}}>+ Select an Event from Bookmarks</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _returnData = (event_id) => {
    if (!this.state.events.includes(event_id)){
      var joined = this.state.events.concat(event_id);
      this.setState({ events: joined });
    }
  }
  
  _createEvent = () => {
    this.props.navigation.navigate('CreateEvent');
  }
  
  _selectBookmark = () => {
    this.props.navigation.navigate(
      'SelectEvent', {returnData: this._returnData.bind(this)}
    );
  }
}

const styles = StyleSheet.create({
  addEventButton: {
    marginTop: 8,
    marginBottom: 8,
    width: 356,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center', 
    borderRadius: 10,
    backgroundColor: '#4c8bf5',
    shadowOffset:{  width: 0 ,  height: .2,  },
    shadowColor: 'rgb(68, 73, 84)',
    shadowOpacity: .7,
  },
  createEventButton: {
    backgroundColor: 'rgb(80,200,120)',
    justifyContent: 'center',
  },
  useBookmarkedEventButton: {
    flex: 1,
    backgroundColor: ' rgb(59, 89, 152)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createText: {
    color: 'white',
  },
  selectText: {
    color: 'white',
  },
  
});
