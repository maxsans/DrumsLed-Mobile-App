import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-web";
import { COLOR, ANIMATIONS_LIST_DRUMS_ICON } from "../utils/constants";
import Ripple from "react-native-advanced-ripple";
import ColorBox from "./colorBox";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const BatteryElementBox = ({ item, onPress }) => {
  const [opacity, setOpacity] = useState(1);

  const onPressInHandler = () => {
    setOpacity(0.8);
  };

  const onPressOutHandler = () => {
    setOpacity(1);
  };
  const [opacitybtn, setOpacitybtn] = useState(1);

  const onPressModify = (key) => {
    onPress(key);
  };

  const renderLeftIcon = (animationValue) => {
    const animationObject = ANIMATIONS_LIST_DRUMS_ICON.find(
      (item) => item.value === animationValue
    );

    const iconName = animationObject ? animationObject.iconName : "";
    const iconTag = animationObject ? animationObject.iconTag : "";
    if (iconTag == "AntDesign") {
      return (
        <AntDesign
          style={styles.icon}
          color={COLOR.SECONDARY}
          name={iconName}
          size={20}
        />
      );
    } else if (iconTag == "EvilIcons") {
      return (
        <EvilIcons
          style={styles.icon}
          color={COLOR.SECONDARY}
          name={iconName}
          size={20}
        />
      );
    } else if (iconTag == "MaterialCommunityIcons") {
      return (
        <MaterialCommunityIcons
          style={styles.icon}
          color={COLOR.SECONDARY}
          name={iconName}
          size={20}
        />
      );
    } else if (iconTag == "FontAwesome5") {
      return (
        <FontAwesome5
          style={styles.icon}
          color={COLOR.SECONDARY}
          name={iconName}
          size={20}
        />
      );
    } else if (iconTag == "MaterialIcons") {
      return (
        <MaterialIcons
          style={styles.icon}
          color={COLOR.SECONDARY}
          name={iconName}
          size={20}
        />
      );
    } else {
      return <View style={[styles.icon, { padding: 10 }]} />;
    }
  };

  const PrintColors = (colors) => {
    return (
      <View style={{ flex: 1 }}>
        {Object.keys(colors).map((key) => (
          <View
            key={key}
            style={{
              flex: 1,
              backgroundColor: colors[key],
              minHeight: 15,
              borderTopWidth: 0.7,
              borderColor: COLOR.PRIMARY_VARIANT2,
            }}
          />
        ))}
      </View>
    );
  };

  const params = Object.keys(item.params).map((key) => {
    const param = item.params[key];
    return (
      <Pressable
        style={{
          minWidth: "50%",
          // height: 50,
          flex: 1,
          marginTop: 10,
        }}
        onPress={() => {
          onPressModify(key);
        }}
        key={key}
      >
        <Text style={styles.titleParam}>{param.name}</Text>
        <View style={styles.paramBox}>
          <View style={styles.colorsBox}>{PrintColors(param.colors)}</View>
          <View
            style={{
              flex: 3,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {renderLeftIcon(param.animation)}
            <Text
              style={{
                textAlign: "center",
                fontSize: 15,
                color: COLOR.SECONDARY,
                fontWeight: "400",
              }}
            >
              {
                param.animations.find(
                  (animation) => animation.value === param.animation
                ).label
              }
            </Text>
          </View>
        </View>
      </Pressable>
    );
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}
      style={[styles.container, { opacity: opacity }]}
    >
      <View style={styles.boxHeader}>
        <Text style={styles.titleText}>{item.name}</Text>
      </View>
      <View style={styles.paramsBox}>{params}</View>
    </TouchableOpacity>
  );
};

export default BatteryElementBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 7,
    marginBottom: 7,
    backgroundColor: COLOR.TERCIARY,
    borderRadius: 10,
    flexDirection: "column",
  },
  boxHeader: {
    alignItems: "center",
    flex: 1,
    marginTop: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOR.ON_PRIMARY,
  },
  paramsBox: {
    flex: 1,
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 15,
  },
  paramBox: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    marginBottom: 0,
    backgroundColor: COLOR.PRIMARY_VARIANT2,
    borderRadius: 10,
    minHeight: 50,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: COLOR.PRIMARY_VARIANT2,
    minWidth: 100,
  },
  titleParam: {
    color: COLOR.SECONDARY,
    position: "absolute",
    backgroundColor: "white",
    left: 20,
    top: -3,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: 5,
    backgroundColor: COLOR.PRIMARY_VARIANT,
  },
  colorsBox: {
    flex: 1,
    borderBottomEndRadius: 4,
    overflow: "hidden",
    elevation: 4,
    maxWidth: 60,
  },
  icon: {
    marginEnd: 5,
  },
});
