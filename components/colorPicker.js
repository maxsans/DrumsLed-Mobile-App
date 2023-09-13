import React, { Component, useRef } from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";
import { COLOR } from "../utils/constants";
import ColorPalette from "./colorPalette";

const ColorWheelPicker = (props) => {
  const pickerRef = useRef();
  const handleColorChange = (color) => {
    props.onColorChange(color); // call the parent's onColorChange prop with the selected color value
    // pickerRef.revert();
  };

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View
        style={{
          flex: 1,
          marginTop: 20,
          marginBottom: 10,
          marginHorizontal: 20,
        }}
      >
        <ColorPicker
          ref={pickerRef}
          color={props.color}
          onColorChangeComplete={(color) => {
            handleColorChange(color);
          }}
          swatchesOnly={false}
          thumbSize={30}
          sliderSize={40}
          noSnap={false}
          shadeSliderThumb={true}
          row={false}
          swatches={false}
          discrete={false}
        />
      </View>

      <View style={{}}>
        <ColorPalette
          colors={[
            "#FF3040",
            "#E91E63",
            "#9C27B0",
            "#673AB7",
            "#3F51B5",
            "#2196F3",
            "#03A9F4",
            "#00BCD4",
            "#009688",
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFEB3B",
            "#FFC107",
            "#FF9800",
            "#FF5722",
            "#FFFFFF",
            "#000000",
          ]}
          onChange={handleColorChange}
        />
      </View>
    </View>
  );
};

export default ColorWheelPicker;
