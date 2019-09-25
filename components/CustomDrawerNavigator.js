import React, {PureComponent} from "react";
import SafeAreaView from 'react-native-safe-area-view';
import {
  View,
  StyleSheet, 
} from "react-native";
import { DrawerView, DrawerItems } from "react-navigation";

const CustomDrawerNavigator = props => (
  <SafeAreaView style={[styles.container]}>
    <DrawerItems
      activeBackgroundColor={"black"}
      activeTintColor={"white"}
      iconContainerStyle={styles.icons}
      {...props}
    />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  icons: {
    width: 40, 
  }
});

export default CustomDrawerNavigator;
