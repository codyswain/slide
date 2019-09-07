import React from 'react';
import {
  TouchableOpacity,
  TextInput, 
  StyleSheet,
  Text,
  View,
  
} from 'react-native';

export default class NewPostScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nameText: '',
      addressText: '',
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={{fontSize: 30}}>Create a Post</Text>
        </View>
        
        <View style={styles.nameInput}>
          <TextInput
            style={{
              height: 40,
              width: '90%',
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 2,
              padding: 8,
            }}
            placeholder="Type the place name here"
            onChangeText={(nameText) => this.setState({nameText})}
            value={this.state.text}
          />
        </View>

        <View style={styles.addressInput}>
          <TextInput
            style={{
              height: 40,
              width: '90%',
              borderColor: 'black',
              borderWidth: 2,
              borderRadius: 2, 
              padding: 8,
            }}
            placeholder="Type the address in here"
            onChangeText={(addressText) => this.setState({addressText})}
            value={this.state.text}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottom}></View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  title: {
    flex: .1,
    width: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  nameInput: {
    flex: .1,
    width: '100%',
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  addressInput: {
    flex: .1,
    width: '100%',
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: .1,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    height: '100%',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'black',

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'black',
  },
  bottom: {
    flex: .6,
  }
  
  
});
