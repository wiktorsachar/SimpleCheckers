import React from "react";
import { View, Text, Image } from "react-native";
import Button from "../Button/Button";

const VictoryPanel = ({ winner, playerColor, handler }) => {
  const transform = [
    {
      rotate: `-${playerColor === "b" ? 180 : 0}deg`
    }
  ];
  let elements = [
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        transform
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            color: winner === "White" ? "white" : "black",
            fontSize: 20,
            fontFamily: "atomic-age"
          }}
        >
          {winner + " "}
        </Text>
        <Text
          style={{
            color: "#e7cfa1",
            fontSize: 20,
            fontFamily: "atomic-age"
          }}
        >
          wins!!!
        </Text>
      </View>
      <Image
        style={{ width: 70, height: 70 }}
        source={require("../../../../assets/crown.png")}
      />
    </View>,
    <Button
      handler={() => {
        handler("menu");
        
      }}
      text="Back to Menu"
      transform={transform}
    />
  ];
  if (playerColor === "b") {
    elements.reverse();
  }
  return elements.map((e, i) => (
    <View style={{}} key={i}>
      {e}
    </View>
  ));
};

export default VictoryPanel;
