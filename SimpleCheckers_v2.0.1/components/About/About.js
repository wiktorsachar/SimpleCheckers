import React from "react";
import { View, ScrollView, Text, StyleSheet, BackHandler } from "react-native";
import Button from "../Game/components/Button/Button";
import Header from "../Menu/components/MainHeader/MainHeader";
import SmallHeader from "./components/SmallHeader/SmallHeader";
import Paragraph from "./components/Paragraph/Paragraph";
import license from "./components/atomicAgeLicense/atomicAgeLicense";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroller: {
    flex: 1,
    margin: 20,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#e7cfa1"
  },
  textWrap: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 7,
    margin: 10,
    borderColor: "#e7cfa1",
    color: "#e7cfa1",
    backgroundColor: "rgba(150, 91, 59, 0.4)"
  },
  text: { color: "#e7cfa1", textAlign: "center" },
  button: { marginBottom: 20 }
});

class About extends React.Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.handler("menu");
      return true;
    });
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 20 }}>
          <Header whiteText="AB" blackText="OUT" />
        </View>
        <ScrollView style={styles.scroller}>
          <SmallHeader text="App:" />
          <Paragraph text="Checkers v2.0.1" />
          <SmallHeader text="Author:" />
          <Paragraph text="Wiktor Sacharczuk" />
          <View style={styles.textWrap}>
            <Text style={styles.text}>https://github.com/wiktorsachar</Text>
            <Text style={styles.text}>
              https://play.google.com/store/apps/developer?id=Wiktor+Sacharczuk
            </Text>
          </View>
          <SmallHeader text="Credits:" />
          <Paragraph text="AtomicAge Font" />
          <Text style={styles.textWrap}>{license}</Text>
        </ScrollView>
        <View style={styles.button}>
          <Button text={"Back to Menu"} handler={() => this.props.handler("menu")} />
        </View>
      </View>
    );
  }
}

export default About;
