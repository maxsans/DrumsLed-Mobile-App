import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Modal,
  Dimensions,
  ScrollView,
  LayoutAnimation,
} from "react-native";
import SwitchSelector from "react-native-switch-selector";
import CPScreens from "../components/RadioBtnCPScreens";
import Elevations from "react-native-elevation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOR, STORAGEKEY } from "../utils/constants";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateParams, updateParamsThemes } from "../redux/store";
import Dropdown from "../components/dropDown";
import PopupColorPicker from "../components/popupColorPicker";
import ColorWheelPicker from "../components/colorPicker";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";

function ColorPicker({ route, navigation }) {
  const dispatch = useDispatch();

  const { itemId, keyParm } = route.params;
  let isTheme = false;
  let themeId;
  if (route.params) {
    if (route.params.isTheme) {
      isTheme = route.params.isTheme;
    }
    if (typeof route.params.themeId !== "undefined") {
      themeId = route.params.themeId;
    }
  }
  const test = useSelector((state) => state.themeUpdate);
  let itemParams;
  if (isTheme) {
    itemParams = useSelector(
      (state) => state.themeUpdate[themeId].data[itemId].params
    );
  } else {
    itemParams = useSelector((state) => state.myJSON[itemId].params);
  }

  const [editedItemParams, setEditedItemParams] = useState(itemParams);

  const [paramChoose, setParamChoose] = useState(keyParm);

  useEffect(() => {}, []);

  const [colors, setColors] = useState(itemParams[paramChoose].colors);
  const [animation, setAnimation] = useState(itemParams[paramChoose].animation);
  const [animations, setAnimations] = useState(
    itemParams[paramChoose].animations
  );

  const animChange = (anim) => {
    const foundNewAnimation = editedItemParams[paramChoose].animations.find(
      (animation) => animation.value === anim
    );
    let colors = [];
    if (Array.isArray(editedItemParams[paramChoose].colors)) {
      colors = editedItemParams[paramChoose].colors.slice(
        0,
        foundNewAnimation.maxColors
      );
    } else {
      colors = editedItemParams[paramChoose].colors;
    }

    const updatedParams = Object.values({
      ...editedItemParams,
      [paramChoose]: {
        ...editedItemParams[paramChoose],
        animation: anim,
        colors: Object.values(colors),
      },
    });
    setEditedItemParams(updatedParams);
    // setItemParams(updatedItemParams);
    setAnimation(anim);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };
  const paramChange = (paramKey) => {
    setParamChoose(paramKey);
    setColors(editedItemParams[paramKey].colors);
    setAnimation(editedItemParams[paramKey].animation);
    setAnimations(editedItemParams[paramKey].animations);
  };

  const onPressDone = () => {
    if (isTheme) {
      const JSON = {
        itemId: itemId,
        paramData: editedItemParams,
        themeId: themeId,
      };
      dispatch(updateParamsThemes(JSON));
    } else {
      const JSON = {
        itemId: itemId,
        paramData: editedItemParams,
      };
      dispatch(updateParams(JSON));
    }
    navigation.goBack();
  };

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedColorKey, setSelectedColorKey] = useState(null);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const openPopup = (color, key) => {
    setSelectedColor(color);
    setSelectedColorKey(key);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setPopupVisible(true);
  };

  const closePopupColor = () => {
    setPopupVisible(false);
    const updatedParams = Object.values({
      ...editedItemParams,
      [paramChoose]: {
        ...editedItemParams[paramChoose],
        colors: Object.values({
          ...editedItemParams[paramChoose].colors,
          [selectedColorKey]: selectedColor,
        }),
      },
    });

    setEditedItemParams(updatedParams);
    setSelectedColor(null);
  };

  const closePopup = () => {
    setSelectedColor(null);
    setPopupVisible(false);
  };

  const deleteColor = (key) => {
    setEditedItemParams((prevItemParams) => {
      const updatedColors = [...prevItemParams[paramChoose].colors];
      updatedColors.splice(key, 1);
      const updatedParams = Object.values({
        ...prevItemParams,
        [paramChoose]: {
          ...prevItemParams[paramChoose],
          colors: Object.values(updatedColors),
        },
      });

      return updatedParams;
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const addColor = () => {
    setEditedItemParams((prevItemParams) => {
      const updatedColors = {
        ...editedItemParams[paramChoose].colors,
        [Object.keys(editedItemParams[paramChoose].colors).length]: "#FFFFFF",
      };

      const updatedParams = Object.values({
        ...prevItemParams,
        [paramChoose]: {
          ...prevItemParams[paramChoose],
          colors: updatedColors,
        },
      });
      return updatedParams;
    });
    const updatedColors = {
      ...editedItemParams[paramChoose].colors,
      [Object.keys(editedItemParams[paramChoose].colors).length]: "#FFFFFF",
    };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    openPopup(
      updatedColors,
      Object.keys(editedItemParams[paramChoose].colors).length
    );
  };

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
                flex: 1,
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: -20,
                  left: 10,
                  alignItems: "center",
                  alignSelf: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  padding: 7,
                  borderRadius: 60,
                  elevation: 5,
                  backgroundColor: COLOR.PRIMARY_VARIANT,
                  shadowColor: "#000",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 25,
                    color: COLOR.SECONDARY_VARIANT,
                    lineHeight: 25,
                    fontWeight: "bold",
                    letterSpacing: 0.25,
                    marginHorizontal: 10,
                  }}
                >
                  Palette de couleur
                </Text>
              </View>
              <ColorWheelPicker
                key={itemId}
                color={selectedColor}
                onColorChange={handleColorChange}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "100%",
                }}
              >
                <Pressable onPress={closePopup} style={styles.btnCancel}>
                  <Text style={styles.btnCancelText}>Fermer</Text>
                </Pressable>
                <Pressable onPress={closePopupColor} style={styles.btnDone}>
                  <Text style={styles.btnDoneText}>Valider</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const foundAnimation = editedItemParams[paramChoose].animations.find(
    (animation) => animation.value === editedItemParams[paramChoose].animation
  );
  const printColors = Object.keys(editedItemParams[paramChoose].colors).map(
    (key) => {
      const color = editedItemParams[paramChoose].colors[key];
      const numberColor = parseInt(key, 10) + 1;
      const isLengthOne = editedItemParams[paramChoose].colors.length === 1;
      return (
        <View
          style={{ marginTop: 5, height: 80, marginHorizontal: 5 }}
          key={key}
        >
          <Text style={styles.titleParam}>Couleur {numberColor}</Text>
          <View style={styles.containerColorBox}>
            <Pressable
              style={{ flex: 5 }}
              onPress={() => {
                openPopup(color, key);
              }}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      flex: 2,
                      backgroundColor: color,
                      minHeight: 15,
                    }}
                  />
                </View>
                <View
                  style={{
                    flex: 3,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    style={styles.icon}
                    color={COLOR.SECONDARY}
                    name="mode-edit"
                    size={20}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      color: COLOR.SECONDARY,
                      fontWeight: "400",
                      paddingLeft: 8,
                    }}
                  >
                    Modifier
                  </Text>
                </View>
              </View>
            </Pressable>

            <Pressable
              style={{
                flex: 1,
                backgroundColor: isLengthOne ? "#c79cc8" : COLOR.SECONDARY,
                borderBottomStartRadius: 4,
                borderTopStartRadius: 4,
                overflow: "hidden",
              }}
              disabled={isLengthOne}
              onPress={() => {
                deleteColor(key);
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AntDesign
                  style={styles.icon}
                  color={COLOR.ON_SECONDARY}
                  name="delete"
                  size={20}
                />
              </View>
            </Pressable>
          </View>
        </View>
      );
    }
  );

  return (
    <View style={{ flex: 1, flexDirection: "column" }}>
      <View style={{ marginTop: 10, marginHorizontal: 5 }}>
        <CPScreens
          paramChoose={paramChoose}
          itemParams={itemParams}
          onPress={(paramKey) => {
            paramChange(paramKey);
          }}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <Dropdown
          animations={animations}
          animation={animation}
          onPress={(anim) => {
            animChange(anim);
          }}
        ></Dropdown>
      </View>
      <View
        style={{
          backgroundColor: COLOR.PRIMARY_VARIANT,
          marginHorizontal: 18,
          borderRadius: 10,
          elevation: 5,
          paddingTop: 10,
          marginTop: 30,
          maxHeight: "60%",
        }}
      >
        <View>
          <Text style={styles.titleColor}>Couleur </Text>
          <ScrollView style={{ paddingVertical: 10 }}>
            {printColors}
            {popup()}
            {foundAnimation &&
              foundAnimation.maxColors >
                editedItemParams[paramChoose].colors.length &&
              editedItemParams[paramChoose].colors[0] && (
                <View
                  style={{
                    marginTop: 5,
                    height: 80,
                    marginHorizontal: 5,
                    marginBottom: 15,
                  }}
                >
                  <Pressable
                    style={styles.containerAddColorBox}
                    onPress={() => {
                      addColor();
                    }}
                  >
                    <AntDesign
                      style={styles.icon}
                      color={COLOR.TERCIARY}
                      name="pluscircleo"
                      size={20}
                    />
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        justifyContent: "center",
                        paddingLeft: 8,
                        color: COLOR.TERCIARY,
                      }}
                    >
                      Ajouter
                    </Text>
                  </Pressable>
                </View>
              )}
          </ScrollView>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Pressable onPress={onPressDone} style={styles.btnDone}>
          <Text style={styles.btnDoneText}>Valider</Text>
        </Pressable>
      </View>
    </View>

    // <View style={{backgroundColor: color, width: 50, height: 50}} />

    //</CPScreens><SwitchSelector style options={options} initial={0} onPress={value => console.log(`Call onPress with value: ${value}`)} />
  );
}

const styles = StyleSheet.create({
  btnCancel: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: COLOR.SECONDARY,
    shadowColor: "#000",
    marginVertical: 20,
  },
  btnCancelText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLOR.ON_SECONDARY,
  },
  btnDone: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: COLOR.PRIMARY_VARIANT,
    shadowColor: "#000",
    marginVertical: 20,
  },
  btnDoneText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLOR.SECONDARY,
  },
  containerColorBox: {
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
    elevation: 5,
    shadowColor: "#000",
  },
  containerAddColorBox: {
    flex: 1,
    flexDirection: "row",
    margin: 10,
    borderRadius: 10,
    minHeight: 50,
    overflow: "hidden",
    borderWidth: 3,
    borderStyle: "dashed",
    borderColor: COLOR.TERCIARY,
    minWidth: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  titleColor: {
    color: COLOR.SECONDARY,
    position: "absolute",
    backgroundColor: "white",
    left: 5,
    top: -19,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: 5,
    backgroundColor: COLOR.ON_SECONDARY,
    elevation: 5,
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
    backgroundColor: COLOR.ON_SECONDARY,
    elevation: 5,
  },
  colorsBox: {
    flex: 1,
    borderBottomEndRadius: 4,
    overflow: "hidden",
    elevation: 4,
  },
  popup: {
    backgroundColor: COLOR.BACKGROUND,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    width: Dimensions.get("window").width * 0.8,
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
    borderWidth: 5,
    borderColor: COLOR.PRIMARY_VARIANT,
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
    height: "70%",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Couleur semi-transparente pour l'effet de flou
  },
});

export default ColorPicker;
