/**
 * Basic You.i RN app
 */
import React, { Component } from "react";
import { AppRegistry, Image, StyleSheet, Text, View } from "react-native";
import { FormFactor } from "@youi/react-native-youi";
import InlineKeyboard from './InlineKeyboard';

export default class YiReactApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    }
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View
            style={styles.imageContainer}
            focusable={true}
            accessible={true}
            accessibilityLabel="You i TV logo"
            accessibilityHint="Image in your first app"
            accessibilityRole="image"
          >
            <Image
              style={styles.image}
              source={{ uri: "res://drawable/default/youi_logo_red.png" }}
            />
          </View>
        </View>
        <View style={styles.bodyContainer}>
          <InlineKeyboard showInput value={this.state.value} onChange={(value) => {
            this.setState({ value });
          }
          }/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#e6e7e7",
    flex: 1
  },
  headerContainer: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    flex: 2
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2
  },
  image: {
    height: FormFactor.isTV ? 225 : 75,
    width: FormFactor.isTV ? 225 : 75,
    resizeMode: "contain"
  },
  bodyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  headlineText: {
    marginBottom: 10,
    color: "#333333",
    textAlign: "center"
  },
  bodyText: {
    color: "#333333",
    textAlign: "center"
  }
});

AppRegistry.registerComponent("YiReactApp", () => YiReactApp);
