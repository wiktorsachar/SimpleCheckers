import React from "react";
import { Text } from "react-native";

const AvailableFiguresCounter = ({ amount, color, transform }) => {
  let figuresCounter = "";
  for (let i = 0; i < amount; i++) {
    figuresCounter = figuresCounter + "⬤";
  }
  return <Text style={{ color, transform }}>{figuresCounter}</Text>;
};

export default AvailableFiguresCounter;
