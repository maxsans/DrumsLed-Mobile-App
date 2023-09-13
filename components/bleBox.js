import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  LayoutAnimation,
  NativeModules,
  TouchableWithoutFeedback,
} from "react-native";
import { COLOR } from "../utils/constants";
import Toggle from "react-native-toggle-element";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import FindDevicesModal from "./connectionBleModal";
import { useBluetoothManager } from "../context/BleManagerContext";

import { BluetoothStatus } from "./bluetooth/bleManager";
import ModalErr from "./modalErr";
import Switch from "react-native-switch-toggles";
import { useSelector } from "react-redux";

const BLEBox = (props) => {
  const { bluetoothManager, state } = useBluetoothManager();
  let myJSON;
  myJSON = useSelector((state) => state.myJSON);

  const {
    startScan,
    enableBluetooth,
    handleAppSettings,
    scanDevices,
    stopScanDevices,
    scannedDevices,
    connectToDevice,
    disconnectDevice,
    connectedDevice,
    receivedData,
    sendDataToDevice,
    sendDataToDeviceWithoutReadyToSend,
    isReadyToSend,
  } = bluetoothManager;

  const [onTransmission, setOnTransmission] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textBluetoothBtn, setTextBluetoothBtn] = useState(
    "Trouver mon TunesKit"
  );
  const [scanError, setScanError] = useState(BluetoothStatus.NoError);
  const [switchStatus, setSwitchStatus] = useState(false);

  useEffect(() => {}, []);

  const onError = (error) => {
    console.log("scan error: " + error);
    setScanError(error);
  };

  const bluetoothBtn = async () => {
    if (!connectedDevice) {
      const scanResult = await startScan(onError);
      setScanError(scanResult);
      setIsModalVisible(true);
    }
  };

  const onCancelBtn = async () => {
    if (scanError === BluetoothStatus.NoError) {
      stopScanDevices();
    }
    setIsModalVisible(false);
  };

  const onValidateBtn = async () => {
    setIsModalVisible(false);

    if (scanError === BluetoothStatus.FailedToConnectToDevice) {
      setScanError(BluetoothStatus.NoError);
      return;
    }
    if (scanError === BluetoothStatus.NoPermission) {
      await handleAppSettings();
    }
    setScanError(BluetoothStatus.NoError);
  };

  const handleSwitchPress = async (value) => {
    if (value !== switchStatus) {
      if (value && !onTransmission) {
        setOnTransmission(true);
        const JsonModified = myJSON.map((obj) => ({
          ...obj,
          params: obj.params.map((param) =>
            (({ animations, ...rest }) => rest)(param)
          ),
        }));
        await sendDataToDeviceWithoutReadyToSend(JSON.stringify(JsonModified));
        setOnTransmission(false);
      }
      await isReadyToSend(value);
      setSwitchStatus(value);
    }
  };
  const callbackOnDisconnect = () => {
    setScanError(BluetoothStatus.DisconnectionErrorDevice);
    setIsModalVisible(true);
    setSwitchStatus(false);
    isReadyToSend(false);
  };

  const callbackOnData = (data) => {
    console.log(data);
  };

  const onChooseDevice = async (key) => {
    setIsModalVisible(false);
    const connected = await connectToDevice(
      scannedDevices[key],
      callbackOnDisconnect,
      callbackOnData
    );
    console.log(connected);
    if (connected) {
      await stopScanDevices();
      setIsModalVisible(false);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } else {
      onError(BluetoothStatus.FailedToConnectToDevice);
    }
  };

  const DisconnectBtn = async () => {
    const disconnectStatus = await disconnectDevice();
    if (!disconnectStatus) {
      setScanError(BluetoothStatus.FailedToDisconnectDevice);
      setIsModalVisible(true);
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  };

  return (
    <View style={styles.container}>
      <FindDevicesModal
        devices={scannedDevices}
        error={scanError}
        isPopupVisible={isModalVisible}
        onCancel={onCancelBtn}
        onValidate={onValidateBtn}
        onChooseDevice={onChooseDevice}
      />
      <Text style={styles.titleBLE}>Bluetooth</Text>
      <View style={{ flexDirection: "row", flex: 0 }}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Pressable onPress={bluetoothBtn} style={styles.containerBLE}>
              <View style={styles.containerBox}>
                {!connectedDevice ? (
                  <Text style={styles.text}>Trouver mon TunesKit</Text>
                ) : (
                  <>
                    <Text style={styles.text}>Connecté à : </Text>
                    <Text
                      style={[styles.text, { color: COLOR.SECONDARY_VARIANT }]}
                    >
                      {connectedDevice.name}
                    </Text>
                  </>
                )}
              </View>
            </Pressable>
          </View>
          {connectedDevice && (
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.containerBLE, { flex: 0 }]}>
                <View style={[styles.containerBox, { marginVertical: 0 }]}>
                  <Switch
                    size={45}
                    value={switchStatus}
                    onChange={(value) => handleSwitchPress(value)}
                    activeTrackColor={"#6796f9A0"}
                    renderActiveThumbIcon={() => (
                      <MaterialCommunityIcons
                        color={COLOR.SECONDARY}
                        name={"bluetooth"}
                        size={20}
                      />
                    )}
                    renderInactiveThumbIcon={() => (
                      <MaterialCommunityIcons
                        color={COLOR.SECONDARY}
                        name={"bluetooth-off"}
                        size={20}
                      />
                    )}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.containerBLE,
                  { backgroundColor: COLOR.SECONDARY },
                ]}
              >
                <Pressable
                  onPress={DisconnectBtn}
                  style={[
                    styles.containerBox,
                    { backgroundColor: COLOR.SECONDARY },
                  ]}
                >
                  <AntDesign
                    color={COLOR.ON_SECONDARY}
                    name={"disconnect"}
                    size={20}
                  />
                  <Text style={[styles.text, { color: COLOR.ON_SECONDARY }]}>
                     Déconnecter
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default BLEBox;

const styles = StyleSheet.create({
  container: {
    marginVertical: 7,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: COLOR.TERCIARY,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    flexDirection: "column",
  },
  containerBox: {
    marginHorizontal: 4,
    marginVertical: 5,
    backgroundColor: COLOR.PRIMARY_VARIANT2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    flexDirection: "row",
  },
  containerBLE: {
    flex: 1,
    marginHorizontal: 4,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLOR.PRIMARY_VARIANT2,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  titleBLE: {
    color: COLOR.SECONDARY,
    position: "absolute",
    backgroundColor: "white",
    left: 15,
    top: -10,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: 5,
    backgroundColor: COLOR.PRIMARY_VARIANT,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: COLOR.SECONDARY,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    marginVertical: 7,
    maxWidth: "auto",
  },
});
