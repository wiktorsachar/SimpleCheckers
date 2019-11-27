import React from "react";
import { View, Text } from "react-native";
import Button from "../Button/Button";
import AvailableFiguresCounter from "../AvailableFiguresCounter/AvailableFiguresCounter";

const PlayerPanel = ({
  figureAmount,
  width,
  height,
  playerColor,
  turn,
  selectable,
  handler
}) => {
  const transform = [
    {
      rotate: `-${playerColor === "b" ? 180 : 0}deg`
    }
  ];
  let panelElements = [
    <Text
      style={{
        color: "#e7cfa1",
        textAlign: "center",
        margin: 10,
        fontFamily: "atomic-age",
        transform,
        backgroundColor: `rgba(${
          playerColor === turn ? "0, 100, 0" : "150, 91, 59"
        }, 0.4)`,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#e7cfa1",
        padding: 3
      }}
    >
      {playerColor === turn ? "Your move!" : "Opponent's move!"}
    </Text>,
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        transform
      }}
    >
      <Text style={{ color: "white", fontFamily: "atomic-age" }}>
        White: {figureAmount.w}
      </Text>
      <AvailableFiguresCounter amount={figureAmount.w} color="white" />
    </View>,
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        transform
      }}
    >
      <Text style={{ color: "black", fontFamily: "atomic-age" }}>
        Black: {figureAmount.b}
      </Text>
      <AvailableFiguresCounter amount={figureAmount.b} color="black" />
    </View>,
    (() =>
      !selectable &&
      playerColor === turn && (
        <Button
          handler={handler}
          text="Finish your move"
          transform={transform}
        />
      ))()
  ];
  if (playerColor === "b") {
    panelElements.reverse();
  }
  return (
    <View
      style={{
        width,
        height,
        justifyContent: playerColor === "b" ? "flex-end" : "flex-start"
      }}
    >
      {panelElements.map((e, i) => (
        <View key={i}>{e}</View>
      ))}
    </View>
  );
};

export default PlayerPanel;
