import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity, 
} from 'react-native';


export default class FeedExploreButton extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const feedBackgroundColor = this.props.feedBackgroundColor;
    const exploreBackgroundColor = this.props.exploreBackgroundColor;
    const feedTextColor = this.props.feedTextColor;
    const exploreTextColor = this.props.exploreTextColor; 
    return (
      <View style={styles.feedExploreButton}>
        <View style={[
          styles.feedExploreLeft,
          {backgroundColor: feedBackgroundColor}
        ]}>
          <Text style={{color: feedTextColor}}>Feed</Text>
        </View>
        <View style={[
          styles.feedExploreRight,
          {backgroundColor: exploreBackgroundColor},
        ]}>
          <Text style={{color: exploreTextColor}}>Explore</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  feedExploreButton: {
    width: '40%',
    height: '80%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  feedExploreLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  feedExploreRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
