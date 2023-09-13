import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesomeIcon from "react-native-fontawesome";
import { COLOR } from "../utils/constants";
import { $CombinedState } from "redux";
import SwitchSelector from "react-native-switch-selector";

const RadioBtn = ({ paramChoose, onPress, itemParams }) => {
  const options = itemParams.map((item, index) => ({
    label: item.name,
    value: JSON.stringify(index),
  }));
  return (
    <SwitchSelector
      textStyle={{ fontSize: 18 }}
      selectedTextStyle={{ fontSize: 18 }}
      buttonColor={COLOR.ON_TERCIARY}
      borderColor={COLOR.TERCIARY_VARIANT}
      backgroundColor={COLOR.TERCIARY}
      animationDuration={400}
      height={50}
      hasPadding
      options={options}
      initial={parseInt(paramChoose, 10)}
      onPress={(value) => onPress(value)}
    />
  );
};

export default RadioBtn;

const styles = {
  buttonRowTop: {
    backgroundColor: COLOR.TERCIARY,
    borderRadius: 30,
    height: 60,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonSwitch: {
    position: "absolute",
    width: 200,
    height: 50,
    zIndex: 1,
    left: 5,
    top: 5,
    borderRadius: 30,
    backgroundColor: COLOR.ON_TERCIARY,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textSwitchActiveLeft: {
    zIndex: 0,
    flex: 1,
    color: COLOR.BACKGROUND,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 2,
    width: 70,
  },
  textSwitchLeft: {
    zIndex: 0,
    flex: 1,
    color: COLOR.BACKGROUND,
    fontSize: 18,
    fontWeight: "bold",

    textAlign: "center",
    marginTop: 2,
    width: 70,
  },
  textSwitchInactive: {
    zIndex: 0,
    flex: 1,
    color: COLOR.BACKGROUND,
    fontWeight: "bold",

    fontSize: 18,
    textAlign: "center",
    marginTop: 2,
    width: 70,
  },
  textSwitch: {
    zIndex: 0,
    flex: 1,
    fontWeight: "bold",

    color: COLOR.BACKGROUND,
    fontSize: 18,
    textAlign: "center",
    marginTop: 2,
    width: 70,
  },
};
