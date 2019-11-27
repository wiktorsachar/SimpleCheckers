import React from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";

const MenuButton = ({ text, handler }) => (
  <TouchableOpacity
    style={{ alignItems: "center", justifyContent: "center" }}
    onPress={handler}
  >
    <View
      style={{
        borderWidth: 1,
        borderRadius: 6,
        padding: 7,
        margin: 10,
        borderColor: "#e7cfa1",
        backgroundColor: "rgba(150, 91, 59, 0.4)",
        width: Dimensions.get("window").width * 0.8
      }}
    >
      <Text
        style={{
          color: "#e7cfa1",
          fontFamily: "atomic-age",
          textAlign: "center"
        }}
      >
        {text}
      </Text>
    </View>
  </TouchableOpacity>
);

export default MenuButton;
