import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Animated,
  Easing,
  LayoutAnimation,
} from "react-native";
import { COLOR } from "../utils/constants";
import {
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BluetoothStatus } from "./bluetooth/bleManager";
import ScanAnimation from "./animationScan";

const FindDevicesModal = ({
  isPopupVisible,
  error,
  onValidate,
  onCancel,
  devices,
  onChooseDevice,
}) => {
  const BluetoothErrorMessages = {
    [BluetoothStatus.NoError]: "Pas d'erreur",
    [BluetoothStatus.NoPermission]: "Les permissions ne sont pas acceptées",
    [BluetoothStatus.BluetoothNotEnabled]: "Le bluetooth n'est pas activé",
    [BluetoothStatus.LocationNotEnabled]: "La localisation n'est pas activée",
    [BluetoothStatus.OtherScanError]: "Erreur inconnu",
    [BluetoothStatus.FailedToConnectToDevice]:
      "La connexion à l'appareil à échouée",
    [BluetoothStatus.FailedToDisconnectDevice]:
      "La déconnexion à l'appareil à échouée",
    [BluetoothStatus.DisconnectionErrorDevice]: "TunesKit déconnecté",
  };

  const [animation] = useState(new Animated.Value(1));
  const [startAnim, setStartAnim] = useState(false);
  const [animationText, setAnimationText] = useState("Scan");

  useEffect(() => {
    if (isPopupVisible) {
      const interval = setInterval(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

        setAnimationText((prevText) => {
          if (prevText === "Scan...") {
            return "Scan";
          } else {
            return prevText + ".";
          }
        });
      }, 750); // Change text every 1 second

      return () => {
        clearInterval(interval); // Clear interval on unmount
      };
    }
  }, [isPopupVisible]);

  useEffect(() => {
    if (isPopupVisible && error) {
      startAnimation();
    }
  }, [isPopupVisible, error]);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  const interpolatedScale = animation.interpolate({
    inputRange: [1, 1.2],
    outputRange: [1, 1.2],
  });
  // if (isPopupVisible) {
  //   LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  // }

  const listDevicesBox = Object.keys(devices).map((value, key) => {
    const device = devices[key];

    let bluetoothLength = "";

    if (device.rssi > -50) {
      bluetoothLength = "wifi-strength-4";
    } else if (device.rssi > -70) {
      bluetoothLength = "wifi-strength-3";
    } else if (device.rssi > -80) {
      bluetoothLength = "wifi-strength-2";
    } else if (device.rssi > -90) {
      bluetoothLength = "wifi-strength-1";
    } else {
      bluetoothLength = "wifi-strength-outline";
    }

    return (
      <Pressable
        style={{
          backgroundColor: COLOR.PRIMARY_VARIANT2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
          marginVertical: 10,
          paddingVertical: 20,
          opacity: 1,
        }}
        key={key}
        onPress={() => {
          onChooseDevice(key);
        }}
      >
        <Text
          style={{
            textAlign: "left",
            paddingStart: 10,
            fontSize: 18,
            color: COLOR.TERCIARY,
            lineHeight: 21,
            fontWeight: "bold",
            letterSpacing: 0.25,
            marginHorizontal: 10,
            flex: 1,
            opacity: 1,
          }}
        >
          {device.name}
        </Text>
        <MaterialCommunityIcons
          style={{ marginEnd: 10, flex: 0 }}
          color={COLOR.ON_SECONDARY}
          name={bluetoothLength}
          size={25}
        />
      </Pressable>
    );
  });

  const devicesBox = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return (
      <View style={{ opacity: 10000000, marginBottom: -10 }}>
        {listDevicesBox}
      </View>
    );
  };

  return (
    <Modal
      visible={isPopupVisible}
      animationType="fade"
      transparent
      activeOpacity={1}
    >
      <View
        style={[
          styles.centeredView,
          {
            paddingTop: error ? 0 : "35%",
            justifyContent: error ? "center" : "flex-start",
            alignItems: error ? "center" : "flex-start",
          },
        ]}
      >
        <View
          style={[
            styles.modalView,
            {
              borderColor: error ? COLOR.ON_ERROR : COLOR.PRIMARY_VARIANT,
              borderWidth: 3,
            },
          ]}
        >
          {error === 0 ? (
            <>
              <View style={styles.boxTitle}>
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
                  {animationText}
                </Text>
              </View>
              <Pressable onPress={onCancel} style={styles.btnCancel}>
                <MaterialIcons
                  style={{}}
                  color={COLOR.SECONDARY}
                  name="cancel"
                  size={25}
                />
              </Pressable>
            </>
          ) : (
            <View style={styles.btnWarning}>
              <Animated.View
                style={{
                  transform: [{ scale: interpolatedScale }],
                  marginTop: -2,
                  marginBottom: 2,
                }}
              >
                <AntDesign color={COLOR.ERROR} name="warning" size={25} />
              </Animated.View>
            </View>
          )}
          {error === 0 ? (
            <View
              style={{
                alignItems: "center",
                flexDirection: "column",
                margin: 10,
                borderRadius: 10,
                flexDirection: "column",
                overflow: "hidden",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <ScrollView style={{ flexGrow: 0, width: "100%" }}>
                  {devices.length === 0 ? <ScanAnimation /> : devicesBox()}
                </ScrollView>
              </View>
            </View>
          ) : (
            <View>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "column",
                  margin: 40,
                  marginBottom: 15,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    color: COLOR.ERROR,
                    lineHeight: 21,
                    fontWeight: "bold",
                    letterSpacing: 0.25,
                    marginHorizontal: 10,
                  }}
                >
                  {BluetoothErrorMessages[error]}
                </Text>
                <View style={{ flex: 0 }}>
                  <Pressable onPress={onValidate} style={styles.btnValidate}>
                    <AntDesign
                      style={{ marginEnd: 10 }}
                      color={COLOR.ON_SECONDARY}
                      name="check"
                      size={25}
                    />
                    <Text style={styles.btnValidateText}>Compris</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
export default FindDevicesModal;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: COLOR.BACKGROUND,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
    maxHeight: "75%",
    minWidth: "80%",
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Couleur semi-transparente pour l'effet de flou
  },
  btnCancel: {
    position: "absolute",
    top: -20,
    right: -10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 7,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: COLOR.PRIMARY_VARIANT,
    shadowColor: "#000",
  },
  btnCancelText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLOR.SECONDARY,
  },
  btnValidate: {
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
    marginTop: 30,
  },
  btnValidateText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: COLOR.ON_SECONDARY,
  },
  btnWarning: {
    position: "absolute",
    top: -10,
    left: -10,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 10,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: COLOR.ON_ERROR,
    shadowColor: "#000",
  },
  boxTitle: {
    position: "absolute",
    top: -25,
    left: 20,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 7,
    borderRadius: 60,
    elevation: 3,
    backgroundColor: COLOR.PRIMARY_VARIANT,
    shadowColor: "#000",
    zIndex: 10,
  },
});
