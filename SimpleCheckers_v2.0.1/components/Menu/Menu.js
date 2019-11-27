import React from "react";
import { View, Image, Dimensions, BackHandler } from "react-native";
import MenuButton from "./components/MenuButton/MenuButton";
import MainHeader from "./components/MainHeader/MainHeader";

const Menu = ({ handler, resumeButton }) => {
  const size = Dimensions.get("window").width * 0.4;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{ width: size, height: size, resizeMode: "center" }}
        source={require("../../assets/crown.png")}
      />
      <MainHeader whiteText="CHECK" blackText="ERS" />
      {resumeButton && (
        <MenuButton handler={() => handler("resume")} text="RESUME GAME" />
      )}
      <MenuButton handler={() => handler("game")} text="START NEW GAME" />
      {/* <MenuButton handler={() => console.log("works")} text="OPTIONS" /> */}
      <MenuButton handler={() => handler("about")} text="ABOUT" />
      <MenuButton handler={() => BackHandler.exitApp()} text="EXIT" />
    </View>
  );
};

export default Menu;
