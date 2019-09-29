import React from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  FlatList, 
  Button, 
  Alert, 
  AsyncStorage,
  TouchableOpacity,
  Text,
  Image,
  Dimensions, 
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import CreateButton from '../components/CreateButton';
import CreateMenu from '../components/CreateMenu';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Header } from 'react-navigation';
import ExploreScreen from '../screens/ExploreScreen';
import Swiper from 'react-native-swiper';
import FeedExploreButton from '../components/FeedExploreButton';

export default class HomeScreen extends React.Component {
  // Note: To bind a function into the navigation options
  // I put _this=this into the componentDidMount method

  static navigationOptions =  ({ navigation }) => ({
    title: 'Slide',
    headerTitleStyle: {
      fontSize: 23,
      fontFamily: 'System',
      fontWeight: "300",
      fontStyle: 'italic',
      //color: 'rgb(251, 80, 70)',
      color: 'rgb(68, 73, 84)',
    },
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: 0,
      height: 38,
      //shadowOffset:{  width: 0 ,  height: .1,  },
      //shadowColor: 'rgb(68, 73, 84)',
      //shadowOpacity: .1,
    },
    headerLeft: (
      <TouchableOpacity onPress={navigation.openDrawer}>
        <View style={{marginLeft: 10}}>
          <Ionicons
            name='ios-menu'
            size={26}
            color="rgb(68, 73, 84)"
          />
        </View>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity onPress={navigation.openDrawer}>
        <View style={{marginRight: 10}}>
          <MaterialIcons
            name="filter-list"
            size={26}
            color="rgb(68, 73, 84)"
          />
        </View>
      </TouchableOpacity>
    ),
  });

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      events: [],
      toggleCreateMenu: false,
      exploreSelected: true,
    };
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.feedExploreContainer}>
          {this._switchFeedExploreButton()}
        </View>
        
        <View style={{flex: 18}}>
          <Swiper
            loop={false}
            showsPagination={false}
            index={1}
            onIndexChanged={(index) => {
              this.setState({exploreSelected: !this.state.exploreSelected});
            }}
          >
            <View style={{flex: 1}}/>
            <ExploreScreen navigation={this.props.navigation}/>
          </Swiper>
        </View>

        {this._toggleCreateMenu()}

        <CreateButton
          positionStyle={{right: 20, bottom: 20}}
          onPress={this._createButtonHandler}      
        />
      </View>
    );
  };

  _switchFeedExploreButton = () => {
    if (this.state.exploreSelected){
      return (
        <FeedExploreButton
          feedBackgroundColor="white"
          feedTextColor="black"
          exploreBackgroundColor="black"
          exploreTextColor="white"
        />
      );
    } else {
      return (
        <FeedExploreButton
          feedBackgroundColor="black"
          feedTextColor="white"
          exploreBackgroundColor="white"
          exploreTextColor="black"
        />
      );
    }
  }

  // Logic conditional rendering of menu for creating posts of plans
  _toggleCreateMenu = () => {
    if (this.state.toggleCreateMenu){
      return (
        <CreateMenu
          navigation={this.props.navigation}
          positionStyle={{right: 20, bottom: 85}}/>
      );
    } else {
      return (null); 
    }
  }

  // Hide or show the menu for creating new post or plan
  _createButtonHandler = () => {
    this.setState(prevState => ({
      toggleCreateMenu: !prevState.toggleCreateMenu,
    }));
  }

  // Removes a users token, and navigates them to authentication screen.
  _signOut = () => {
    this.props.navigation.toggleDrawer();
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  feedExploreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',


  },
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
    backgroundColor: 'black',
  }
});
