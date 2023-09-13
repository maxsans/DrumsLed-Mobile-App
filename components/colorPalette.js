import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import React, { useRef, useEffect, useState } from "react";

const ColorPalette = ({ colors, onChange, selectedColor, title }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleLayout = () => {
    containerRef.current.measure((x, y, width, height) => {
      setContainerWidth(width);
    });
  };

  return (
    <View style={{ margin: 5 }}>
      <View ref={containerRef} style={styles.container} onLayout={handleLayout}>
        {colors.map((color) => {
          return (
            <TouchableOpacity
              onPress={() => {
                onChange(color);
              }}
              key={color}
            >
              <View
                style={{
                  width: 40,
                  borderRadius: 10,
                  height: 40,
                  margin: 7,
                  backgroundColor: color,
                }}
              ></View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
  },
});

export default ColorPalette;
