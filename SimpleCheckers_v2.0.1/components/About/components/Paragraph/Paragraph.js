import React from "react";
import { Text } from "react-native";

const Paragraph = ({ text }) => (
  <Text
    style={{
      color: "#e7cfa1",
      textAlign: "center",
      fontFamily: "atomic-age",
    //   fontSize: 25
    }}
  >
    {text}
  </Text>
);

export default Paragraph;