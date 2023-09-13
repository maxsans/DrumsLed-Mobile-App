import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import { StyleSheet } from "react-native-web";
import HomeBox from "../components/homeBox";
import { COLOR, DEFAULT_JSON } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { updateMyJSON } from "../redux/store";
import { useBluetoothManager } from "../context/BleManagerContext";

const Home = ({ route, navigation }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { bluetoothManager, state } = useBluetoothManager();
  const { sendDataToDevice } = bluetoothManager;

  const dispatch = useDispatch();
  let myJSON; // Declare myJSON variable outside the if-else blocks
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

  const allThemes = useSelector((state) => state.themeUpdate);

  if (isTheme) {
    myJSON = useSelector((state) => state.themeUpdate[themeId].data);
  } else {
    myJSON = useSelector((state) => state.myJSON);
  }
  useEffect(() => {
    // Check if the app has been opened before
    // dispatch(updateMyJSON(DEFAULT_JSON));
    if (!isTheme) {
      if (!myJSON) {
        // If not, dispatch the default JSON value
        dispatch(updateMyJSON(DEFAULT_JSON));
      }
    }
  }, []);

  useEffect(() => {
    if (myJSON) {
      const JsonModified = myJSON.map((obj) => ({
        ...obj,
        params: obj.params.map((param) =>
          (({ animations, ...rest }) => rest)(param)
        ),
      }));
      sendDataToDevice(JSON.stringify(JsonModified));
    }
  }, [myJSON]);

  onPressModify = (key, keyParm) => {
    if (!isButtonDisabled) {
      setButtonDisabled(true);
      navigation.push("ColorPicker", {
        itemId: key,
        keyParm: keyParm,
        isTheme: isTheme,
        themeId: themeId,
      });
      setTimeout(() => {
        setButtonDisabled(false);
      }, 1000);
    }
  };

  const items = Object.keys(myJSON).map((key) => {
    const item = myJSON[key];
    return (
      <HomeBox
        item={item}
        key={key}
        onPress={(keyParm) => this.onPressModify(key, keyParm)}
      />
    );
  });

  return (
    <View style={styles.homeView}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.allBox}>{items}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLOR.BACKGROUND,
  },
  scrollView: {},
  allBox: {
    marginTop: 5,
    marginRight: 15,
    marginLeft: 15,
    paddingBottom: 90,
  },
  loadingView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
