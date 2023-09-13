import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EvilIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import {
  COLOR,
  ANIMATION_LIST,
  ANIMATIONS_LIST_DRUMS_ICON,
} from "../utils/constants";

const DropdownComponent = ({ animations, animation, onPress }) => {
  const [value, setValue] = useState(animation);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return <Text style={[styles.label]}>Animation</Text>;
    }
    return null;
  };

  const animationObject = ANIMATIONS_LIST_DRUMS_ICON.find(
    (item) => item.value === animation
  );

  const iconName = animationObject ? animationObject.iconName : "";
  const iconTag = animationObject ? animationObject.iconTag : "";


  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.containerStyle}
        itemContainerStyle={styles.itemTextStyle}
        iconStyle={styles.iconStyle}
        data={animations}
        labelField="label"
        valueField="value"
        maxHeight={"65%"}
        placeholder={!isFocus ? "Select item" : "..."}
        value={animation}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          onPress(item.value);
        }}
        renderLeftIcon={() => {
            if (iconTag=="AntDesign"){
              return(
                <AntDesign
                  style={styles.icon}
                  color={COLOR.SECONDARY}
                  name={iconName}
                  size={20}
                />
              );
            }else if (iconTag=="EvilIcons"){
              return(
                <EvilIcons
                  style={styles.icon}
                  color={COLOR.SECONDARY}
                  name={iconName}
                  size={20}
                />
              );
            }else if (iconTag=="MaterialCommunityIcons"){
              return(
                <MaterialCommunityIcons
                  style={styles.icon}
                  color={COLOR.SECONDARY}
                  name={iconName}
                  size={20}
                />
              );
              }else if (iconTag=="FontAwesome5"){
              return(
                <FontAwesome5
                  style={styles.icon}
                  color={COLOR.SECONDARY}
                  name={iconName}
                  size={20}
                />
              );
            }else if (iconTag=="MaterialIcons"){
              return(
                <MaterialIcons
                  style={styles.icon}
                  color={COLOR.SECONDARY}
                  name={iconName}
                  size={20}
                />
              );
            }else {
              return(
              <View style={[styles.icon,{padding:10}]}/>
              );
            }
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    padding: 16,
  },
  dropdown: {
    height: 60,
    // borderColor: COLOR.PRIMARY,
    // borderWidth: 0.5,
    borderRadius: 15,
    paddingHorizontal: 8,
    backgroundColor: COLOR.PRIMARY_VARIANT,
    elevation: 3,
  },
  icon: {
    marginStart: 5,
    marginEnd: 10,
  },
  label: {
    color: COLOR.SECONDARY,
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: 5,
    backgroundColor: COLOR.ON_SECONDARY,
  },
  placeholderStyle: {
    fontSize: 16,
    
  },
  selectedTextStyle: {
    color: COLOR.SECONDARY,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },

  containerStyle: {
    borderRadius: 15,
  },
  itemTextStyle: {
    borderRadius: 15,
  },
});
