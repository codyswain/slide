import React, {Component} from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class ContactButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      expanded: false,
    }
  }

  // Toggle window expansion on or off
  buttonPress = () => {
    this.setState({expanded: !this.state.expanded})
  }

	render(){

    // Conditional Styling
    if (this.state.expanded){
      btn_size = {"height": 120};
    } else {
      btn_size = {"height": 60};
    }
    btn_style_background = {"backgroundColor": this.props.color};

    fname = this.props.data.first_name;
    lname = this.props.data.last_name;
    number = this.props.data.number;

    return (
      <TouchableOpacity onPress={this.buttonPress}>
        <View style={[styles.main, btn_style_background, btn_size]}>
          <View style={styles.unextended}>
            <View style={styles.nameContainer}>
              <Text style={styles.names}>{fname} {lname}  </Text>
            </View>
            <View style={styles.numberContainer}>
              <Text style={styles.numbers}>{number}</Text>
            </View>
          </View>
          { this.state.expanded && 
            <View style={styles.extended}>
                <Text style={styles.extendedText}>Send Anonymously</Text>
            </View>
          }
        </View>
      </TouchableOpacity>
    );
	}
}

const styles = StyleSheet.create({
    main: {
      backgroundColor: 'white',
      borderColor: "black",
      borderRadius: 13,
      padding: 10,
      marginRight: 8,
      marginLeft: 8,
      marginTop: 10,
      backgroundColor: "#16D8C0",

      display: "flex",
      flexDirection: "column"
    },
    unextended: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    extended: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "black",

      marginLeft: 15,
      marginRight: 15,
      borderRadius: 30,
    },
    extendedText: {
      color: "white",
      fontSize: 20,
      fontFamily: "System",
    },
    nameContainer: {
      flex:1.5,
      alignItems: "flex-start",
      paddingLeft: "2%",
    },
    names: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      fontFamily: "System",
    },

    numberContainer: {
      flex: .5,
      alignItems: "flex-end",
      paddingRight: "2%",
    },
    numbers: {
      color: "white",
      fontSize: 14,
      fontFamily: "System",
      textAlign: "right",
    }
})
