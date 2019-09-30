import React from 'react';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class CreateEventScreen extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    return(
      <View style={styles.container}>
        <Text>Screen where you create an event</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
