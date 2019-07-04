import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class ActionButton extends React.Component {
  constructor(props){
    super(props);
  }

  _onPress = () => {
    color_theme = this.props.action_data['color']
    this.props.navigation('Contact', {color: color_theme})
  };

	render(){
    action_name = this.props.action_data['text'];
    style_color = {"backgroundColor": this.props.action_data['color']};

    return (
      <TouchableOpacity onPress={this._onPress}>
        <View style={[styles.main, style_color]}>
          <Text style={styles.title}>{action_name}</Text>
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
      height: 70,
      borderRadius: 13,
      backgroundColor: "#16D8C0",
      justifyContent: 'center',
      alignItems: 'center',

      shadowOffset:{  width: .1 ,  height: .5,  },
      shadowColor: 'rgb(230, 230, 230)',
      shadowOpacity: .8,
    },
    title: {
      // color: 'rgb(68, 73, 84)',
      color: 'white',
      fontSize: 20,
      fontFamily: 'System',
      fontWeight: 'bold',
    },
})
