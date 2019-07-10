import React, {Component} from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Image
} from 'react-native';

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
    event_photoURL = this.props.event_data['photoURL'];

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.main}>
          <View style={styles.paneHeaderContainer}>
            <Text style={styles.headerTextName}>{event_name}</Text>
            <Text style={styles.headerTextType}>{event_type}</Text>
            <Text style={styles.headerTextAddress}>{event_address}</Text>
          </View> 

          <View style={styles.paneImageContainer}>
            <Image resizeMode="cover" style={styles.paneImage} source={{ uri: event_photoURL }}/>
          </View> 
        </View>
      </TouchableOpacity>
    );
	}
}

const styles = StyleSheet.create({
    main: {
      marginRight: 14,
      marginLeft: 14,
      marginTop: 14,
      height: 400,
      borderRadius: 13,
      backgroundColor: "white",
      shadowOffset:{  width: .1 ,  height: .5,  },
      shadowColor: 'rgb(230, 230, 230)',
      shadowOpacity: .8,

      overflow: 'hidden', 
    },
    paneHeaderContainer: {
      position: 'absolute',
      backgroundColor: 'white',
      opacity: .7, 
      height: '20%',
      width: '100%',
      zIndex: 1, 

      padding: '3%',
    },
    paneImageContainer: {
      flex: 1,
      width: '100%', 
    },
    paneImage: {
      flex: 1,
      alignSelf: 'stretch',
      height: undefined,
      width: undefined,
    },
    headerTextName: {
      // color: 'rgb(68, 73, 84)',
      color: 'black',
      fontSize: 16,
      fontFamily: 'System',
      fontWeight: 'bold',
    },
    headerTextType: {
      color: '#e91e63',
      fontSize: 14,
      fontFamily: 'System',
      fontWeight: 'bold',
    },
    headerTextAddress: {
      color: 'black',
      fontSize: 14,
      fontFamily: 'System',
      fontWeight: 'bold',
    },
})
