import React from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import Figure from "../Figure/Figure";

const Chessboard = ({
  boardSize,
  board,
  selectedFigure,
  moves,
  onSelect,
  onMove,
  turn,
  selectable
}) => {
  const dark = require("../../../../assets/darktexture.jpg");
  const light = require("../../../../assets/lighttexture.png");
  const size = boardSize / 8;
  let fieldColorSwitch = true;
  let selected = false;
  const isCorrectMove = (x, y) => {
    let value = false;
    moves.forEach(e => {
      if (e.x === x && e.y === y) {
        value = true;
      }
    });
    return value;
  };
  const callback = (e, column) => {
    fieldColorSwitch = !fieldColorSwitch;
    let color = fieldColorSwitch ? dark : light;
    return (
      <ImageBackground source={color} style={{ height: size, width: size }}>
        <View
          style={{
            flex: 1,
            backgroundColor:
              (selected === selectedFigure.y && column === selectedFigure.x) ||
              isCorrectMove(column, selected)
                ? "rgba(0, 100, 0, 0.6)"
                : "rgba(0, 100, 0, 0.0)"
          }}
        >
          <Figure size={size} figure={e} />
        </View>
      </ImageBackground>
    );
  };
  return (
    <View
      style={{
        width: this.size,
        height: this.size,
        backgroundColor: "green",
        borderWidth: 1,
        borderColor: "#e7cfa1",
        borderRadius: 6,
        overflow: "hidden"
      }}
    >
      {board.map((e, row) => {
        fieldColorSwitch = !fieldColorSwitch;
        selected = row;
        return (
          <View
            key={"y" + row}
            style={{ display: "flex", flexDirection: "row" }}
          >
            {e.map((element, column) => {
              if (element.side === turn) {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      selectable &&
                      (selectedFigure.x === column && selectedFigure.y === row
                        ? onSelect(null, null)
                        : onSelect(column, row))
                    }
                    key={"x" + column}
                  >
                    {callback(element, column)}
                  </TouchableOpacity>
                );
              } else if (isCorrectMove(column, row)) {
                return (
                  <TouchableOpacity
                    key={"x" + column}
                    onPress={() => {
                      onMove(column, row);
                    }}
                  >
                    {callback(element, column)}
                  </TouchableOpacity>
                );
              } else {
                return (
                  <View key={"x" + column}>{callback(element, column)}</View>
                );
              }
            })}
          </View>
        );
      })}
    </View>
  );
};

export default Chessboard;
