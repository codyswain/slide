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
      <View style={styles.container}>
        <View style={styles.addEventButton}>
          <View><Text>Create Event</Text></View>
          <View><Text>Add from bookmarks</Text></View>
        </View>
        <Text>yaaaaa</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addEventButton: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
  },
});
