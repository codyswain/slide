import React from 'react';
import {
  View,
  Text,
  StyleSheet, 
} from 'react-native';

export default class BookmarksScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => ({
    title: 'Slide',
    headerTitleStyle: {
      fontSize: 24,
      fontFamily: 'System',
      color: 'rgb(68, 73, 84)',
      fontStyle: 'italic', 
    },
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      shadowOffset:{  width: 0 ,  height: .2,  },
      shadowColor: 'rgb(68, 73, 84)',
      shadowOpacity: .1,
    },
  });

  render() {
    return (
      <View style={styles.container}>
	<Text>
	  This is where events will be saved
	</Text> 
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
});
