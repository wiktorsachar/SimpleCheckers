import React from "react";
import { Text } from "react-native";

const SmallHeader = ({ text }) => (
  <Text
    style={{
      color: "#e7cfa1",
      textAlign: "center",
      fontFamily: "atomic-age",
      fontSize: 25,
      margin: 15
    }}
  >
    {text}
  </Text>
);

export default SmallHeader;
