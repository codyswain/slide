import React from "react";
import {
  View,
  StyleSheet, 
} from "react-native";
import { DrawerItems } from "react-navigation";

const CustomDrawerNavigator = props => (
  <View style={[styles.container]}>
    <DrawerItems
      activeBackgroundColor={"black"}
      activeTintColor={"white"}
      iconContainerStyle={styles.icons}
      {...props}
    />
  </View>
);

export default CustomDrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },

  icons: {
    width: 30, 
  }
});
