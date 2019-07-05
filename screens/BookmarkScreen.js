import React from 'react';
import { View, Text } from 'react-native';

export default class BookmarksScreen extends React.Component {
  static navigationOptions =  ({ navigation }) => ({
    title: 'Voilá',
    headerTitleStyle: {
      fontSize: 24,
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

  render() {
  	return (
	    <View>
	    	<Text>
	    		This is the bookmarks screen
	    	</Text> 
	    </View>
	  );
  }
}
