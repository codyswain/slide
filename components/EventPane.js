import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class EventPane extends React.Component {
  constructor(props){
    super(props);
  }

  _onPress = () => {
    // color_theme = this.props.action_data['color']
    // this.props.navigation('Contact', {color: color_theme})
  };

	render(){
    event_name = this.props.event_data['name'];
    event_type = this.props.event_data['type'];
    event_address = this.props.event_data['address'];
    event_photoId = this.props.event_data['photoId'];

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.main}>
          <Text style={styles.title}>Name: {event_name}</Text>
          <Text style={styles.title}>Type: {event_type}</Text>
          <Text style={styles.title}>Address: {event_address}</Text>
          <Text style={styles.title}>photoId: {event_photoId}</Text>
        </View>
      </TouchableOpacity>
    );
	}
}

const styles = StyleSheet.create({
    main: {
      marginRight: 18,
      marginLeft: 18,
      marginTop: 18,
      height: 400,
      borderRadius: 13,
      backgroundColor: "white",
      justifyContent: 'center',
      alignItems: 'center',

      shadowOffset:{  width: .1 ,  height: .5,  },
      shadowColor: 'rgb(230, 230, 230)',
      shadowOpacity: .8,
    },
    title: {
      // color: 'rgb(68, 73, 84)',
      color: 'black',
      fontSize: 20,
      fontFamily: 'System',
      fontWeight: 'bold',
    },
})
