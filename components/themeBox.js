import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TouchableOpacity, Modal } from "react-native";
import { StyleSheet } from "react-native-web";
import { COLOR, ANIMATIONS_LIST_DRUMS_ICON } from "../utils/constants";
import Ripple from "react-native-advanced-ripple";
import ColorBox from "./colorBox";
import AntDesign from "@expo/vector-icons/AntDesign";
import { EvilIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const ThemeBox = ({ item, onPress, onPressModify, onPressDelete }) => {
  const [opacity, setOpacity] = useState(1);

  const onPressInHandler = () => {
    setOpacity(0.6);
  };

  const onPressOutHandler = () => {
    setOpacity(1);
  };
  const [opacitybtn, setOpacitybtn] = useState(1);
  const [isPopupVisible, setPopupVisible] = useState(false);

  const closePopup = () => {
    setPopupVisible(false);
  };
  const closePopupDelete = () => {
    setPopupVisible(false);
    onPressDelete();
  };
  const openPopup = () => {
    setPopupVisible(true);
  };

  const actualItem = useSelector((state) => state.myJSON);

  const popup = () => {
    return (
      <Modal
        visible={isPopupVisible}
        animationType="fade"
        transparent
        activeOpacity={1}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                alignItems: "center",
                flexDirection: "column",
                margin: 10,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  color: COLOR.TERCIARY,
                  lineHeight: 21,
                  fontWeight: "bold",
                  letterSpacing: 0.25,
                  marginHorizontal: 10,
                }}
              >
                Etes-vous sûr de vouloir supprimer le theme selectionné?
              </Text>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ flex: 1 }}>
                  <Pressable onPress={closePopup} style={styles.btnCancel}>
                    <MaterialIcons
                      style={{ marginEnd: 10 }}
                      color={COLOR.SECONDARY}
                      name="cancel"
                      size={25}
                    />
                    <Text style={styles.btnCancelText}>Annuler</Text>
                  </Pressable>
                </View>
                <View style={{ flex: 1 }}>
                  <Pressable
                    onPress={closePopupDelete}
                    style={styles.btnDelete}
                  >
                    <AntDesign
                      style={{ marginEnd: 10 }}
                      color={COLOR.ON_SECONDARY}
                      name="delete"
                      size={25}
                    />
                    <Text style={styles.btnDeleteText}>Supprimer</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
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
      <React.Fragment>
        {Object.keys(colors).map((key) => (
          <View
            key={key}
            style={{
              flex: 1,
              backgroundColor: colors[key],
              minHeight: 15,
              borderEndWidth: 0.5,
              borderColor: COLOR.PRIMARY_VARIANT2, // Assuming COLOR is defined elsewhere
            }}
          />
        ))}
      </React.Fragment>
    );
  };

  const items = Object.keys(item.data).map((key) => {
    const element = item.data[key];
    return (
      <View style={styles.colorsBox} key={key}>
        {Object.keys(element.params).map((key) => {
          return (
            <View
              key={key}
              style={{
                flex: 1,
                borderRadius: 3,
                elevation: 4,
                overflow: "hidden",
                maxWidth: 70,
              }}
            >
              {PrintColors(element.params[key].colors)}
            </View>
          );
        })}
      </View>
    );
  });

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={onPressInHandler}
      onPressOut={onPressOutHandler}
      style={[styles.container, { opacity: opacity }]}
      onPress={onPress}
    >
      {popup()}
      <View style={{ flex: 1, flexDirection: "row" }}>
        {item.data === actualItem ? (
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              marginStart: 10,
            }}
          >
            <Feather
              style={styles.icon}
              color={COLOR.PRIMARY_VARIANT}
              name={"check-circle"}
              size={20}
            />
          </View>
        ) : (
          <View></View>
        )}

        <View style={styles.boxHeader}>
          <Text style={styles.titleText}>{item.name}</Text>
        </View>
        <View
          style={{ marginVertical: 12, marginEnd: 15, flexDirection: "row" }}
        >
          <Pressable
            style={{
              backgroundColor: COLOR.BACKGROUND,
              borderRadius: 10,
              zIndex: 9999,
              marginEnd: 10,
            }}
            onPress={() => onPressModify()}
          >
            <MaterialIcons
              style={styles.icon}
              color={COLOR.SECONDARY}
              name="mode-edit"
              size={25}
            />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: COLOR.SECONDARY,
              borderRadius: 10,
              zIndex: 9999,
            }}
            onPress={() => openPopup()}
          >
            <AntDesign
              style={styles.icon}
              color={COLOR.ON_SECONDARY}
              name="delete"
              size={25}
            />
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ThemeBox;

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    marginBottom: 7,
    backgroundColor: COLOR.TERCIARY,
    borderRadius: 10,
    flexDirection: "column",
  },
  boxHeader: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
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
    justifyContent: "space-evenly",
  },
  paramBox: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
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
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden",
    minHeight: 40,
    marginHorizontal: 10,
    marginVertical: 10,
    minWidth: 100,
    maxWidth: 100,
    justifyContent: "center",
  },
  icon: {
    margin: 7,
  },
  popup: {
    backgroundColor: COLOR.BACKGROUND,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  popupText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  closeButton: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalView: {
    margin: 20,
    backgroundColor: COLOR.BACKGROUND,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Couleur semi-transparente pour l'effet de flou
  },
  btnCancel: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: COLOR.PRIMARY_VARIANT,
    shadowColor: "#000",
    marginVertical: 20,
  },
  btnCancelText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLOR.SECONDARY,
  },
  btnDelete: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: COLOR.SECONDARY,
    shadowColor: "#000",
    marginVertical: 20,
  },
  btnDeleteText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLOR.ON_SECONDARY,
  },
});
