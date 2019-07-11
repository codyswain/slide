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
    event_subtitle = this.props.event_data['subtitle'];
    event_address = this.props.event_data['address'];
    event_photoURL = this.props.event_data['photoURL'];

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={styles.main}>
          <View style={styles.paneHeaderContainer}>
            <Text style={styles.headerTextName}>{event_name}</Text>
            <Text style={styles.headerTextType}>{event_subtitle}</Text>
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
      marginTop: 12,
      height: 320,
      borderRadius: 13,
      backgroundColor: "white",
      shadowOffset:{  width: .1 ,  height: .5,  },
      shadowColor: 'rgb(230, 230, 230)',
      shadowOpacity: .8,

      overflow: 'hidden', 
    },
    paneHeaderContainer: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, .75)',
      height: '20%',
      width: '100%',
      zIndex: 1, 

      paddingTop: '2%',
      paddingLeft: '3%',
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
      color: 'white',
      fontSize: 17,
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
      color: 'white',
      fontSize: 10,
      fontFamily: 'System',
      // fontWeight: 'bold',
    },
})
