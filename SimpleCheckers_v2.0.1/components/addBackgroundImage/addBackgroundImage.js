import React from "react";
import { ImageBackground } from "react-native";

const addBackgroundImage = Component => {
  return props => (
    <ImageBackground
      source={require("../../assets/table.jpg")}
      style={{ height: "100%", width: "100%" }}
    >
      <Component {...props} />
    </ImageBackground>
  );
};

export default addBackgroundImage;
