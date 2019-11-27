import React from "react";
import { View, Image } from "react-native";

const Figure = ({ size, figure }) => {
  const scale = 0.9;
  return (
    figure !== 0 && (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: size,
          width: size
        }}
      >
        <View
          style={{
            height: size * scale,
            width: size * scale,
            backgroundColor:
              figure.side === "w" ? "white" : figure.side === "b" && "black",
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {figure.queen && (
            <Image
              style={{
                width: size * (scale - 0.2),
                height: size * (scale - 0.2)
              }}
              source={require("../../../../assets/crown.png")}
            />
          )}
        </View>
      </View>
    )
  );
};

export default Figure;
