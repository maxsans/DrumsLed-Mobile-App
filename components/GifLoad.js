import React from "react";
import { View, Image } from "react-native";
import { COLOR } from "../utils/constants";

function LoadGif() {
  return (
    <View style={{}}>
      <Image
        source={require("../animations/loading.gif")}
        style={{ flex: 1 }}
        resizeMode="contain"
        repeatCount={-1}
      />
    </View>
  );
}

export default LoadGif;
