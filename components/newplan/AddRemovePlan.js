import React from 'react';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class AddRemovePlan extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <View style={[styles.container, this.props.style]}>
        <View style={styles.addEventButton}>
          <TouchableOpacity onPress={this._createEvent}>
            <View style={styles.createEventButton}>
              <Text style={styles.createText}>Create Event</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={this._selectBookmark}>
            <View style={styles.useBookmarkedEventButton}>
              <Text style={styles.selectText}>Add from bookmarks</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _createEvent = () => {
    this.props.navigation.navigate('CreateEvent');
  }

  _selectBookmark = () => {
    this.props.navigation.navigate('SelectEvent');
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  addEventButton: {
    height: 60,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,

    overflow: 'hidden',
  },
  createEventButton: {
    flex: 1,
    width: 150,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  useBookmarkedEventButton: {
    flex: 1,
    width: 150,
    backgroundColor: 'grey',
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
