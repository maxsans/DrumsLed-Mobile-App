import React, { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateMyJSON } from "../redux/store";
import { COLOR, DEFAULT_JSON, MAX_THEMES } from "../utils/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import AddBox from "../components/addBox";
import ThemeBox from "../components/themeBox";
import { updateTheme } from "../redux/store";
import { BluetoothManager } from "../components/bluetooth/bleManager";

const Theme = ({ navigation }) => {
  const { sendDataToDevice } = BluetoothManager();

  const dispatch = useDispatch();

  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const themes = useSelector((state) => state.themeUpdate);

  const addTheme = () => {
    if (!isButtonDisabled) {
      setButtonDisabled(true);
      const themeLength = themes.length;

      const updatedThemes = [...themes]; // Create a new array with existing themes
      const numberColor = parseInt(themeLength, 10) + 1;

      const JSON = {
        name: "theme " + numberColor,
        data: DEFAULT_JSON,
      };
      updatedThemes[themeLength] = JSON;
      // If not, dispatch the default JSON value
      dispatch(updateTheme(updatedThemes));
      navigation.push("ThemesEdit", {
        isTheme: true,
        themeId: themeLength,
      });
      setTimeout(() => {
        setButtonDisabled(false);
      }, 1000);
    }
  };

  const onPressDelete = (key) => {
    const updatedThemes = [...themes]; // Create a new array with existing themes

    updatedThemes.splice(key, 1);

    dispatch(updateTheme(updatedThemes));
  };

  const onPressModify = (key) => {
    if (!isButtonDisabled) {
      setButtonDisabled(true);
      navigation.push("ThemesEdit", {
        isTheme: true,
        themeId: key,
      });
      setTimeout(() => {
        setButtonDisabled(false);
      }, 1000);
    }
  };

  const onPress = (key) => {
    const item = themes[key].data;
    dispatch(updateMyJSON(item));
    sendDataToDevice(item);
  };

  const items = Object.keys(themes).map((key) => {
    const item = themes[key];
    return (
      <ThemeBox
        item={item}
        key={key}
        onPressDelete={() => onPressDelete(key)}
        onPressModify={() => onPressModify(key)}
        onPress={() => onPress(key)}
      />
    );
  });
  return (
    <View style={styles.themeView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.allBox}>
          {items}
          {themes.length < MAX_THEMES ? (
            <View
              style={{ marginTop: 7, flex: 1, minHeight: 63, marginBottom: 15 }}
            >
              <AddBox onPress={addTheme} />
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Theme;

const styles = StyleSheet.create({
  themeView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLOR.BACKGROUND,
  },
  allBox: {
    marginTop: 5,
    marginRight: 15,
    marginLeft: 15,
    paddingBottom: 90,
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
});
