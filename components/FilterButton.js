import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default class FilterButton extends React.Component {
  constructor(props){
    super(props);
  }

  _selectedLine = () => {
    if (this.props.selected){
      return (
        <View style={styles.bottomBorder}></View>
      );
    } else {
      return (null);
    }
  }

  render (){
    return (
      <View style={styles.container}>
        {this.props.icon}
        <Text style={styles.text}>{this.props.text}</Text>
        {this._selectedLine()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 28,
    marginLeft: 6,
    borderRadius: 4,
    
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',

  },

  text: {
    color: 'black',
    fontSize: 14,
    fontFamily: 'System',
//    fontWeight: '500',
  },

  bottomBorder: {
    position: 'absolute',
    left: '14%',
    width: '76%',
    bottom: 0,
    borderBottomColor: 'rgb(255, 89, 40)',
    borderBottomWidth: 1.4,
  },
});
