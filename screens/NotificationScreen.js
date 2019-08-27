import React from 'react';
import {
  View,
  Text,
  StyleSheet, 
} from 'react-native';

export default class SettingsScreen extends React.Component {
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
      shadowOffset:{  width: 0 ,  height: .2,  },
      shadowColor: 'rgb(68, 73, 84)',
      shadowOpacity: .1,
    },
  });

  render() {
    return (
      <View style={styles.container}>
	<Text>
	  This is the social screen
	</Text> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
