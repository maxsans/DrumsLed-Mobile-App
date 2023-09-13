import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import { COLOR, STORAGEKEY } from "../utils/constants";
import LoadGif from "../components/GifLoad";

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLOR.BACKGROUND_LOAD,
      }}
    >
      <LoadGif />
    </View>
  );
};

export default LoadingScreen;
