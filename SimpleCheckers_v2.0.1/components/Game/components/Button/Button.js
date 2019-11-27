import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";

const Button = ({ handler, text, transform }) => (
  <View style={{ alignItems: "center", justifyContent: "center" }}>
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: Dimensions.get("window").width * 0.5
      }}
      onPress={handler}
    >
      <View
        style={{
          transform,
          borderWidth: 1,
          borderRadius: 6,
          padding: 7,
          margin: 10,
          borderColor: "#e7cfa1",
          backgroundColor: "rgba(150, 91, 59, 0.4)"
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
  </View>
);

export default Button;
