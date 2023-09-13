import React, { useEffect, useState, useRef } from "react";
import { Button, FlatList, Text, View, LogBox } from "react-native";

import {
  BleManager,
  LogLevel,
  BleError,
  BleErrorCode,
} from "react-native-ble-plx";
import BluetoothPermissionHandler from "./permission";
const { Buffer } = require("buffer");
import { useSelector, useDispatch } from "react-redux";
import { updateDevices } from "../../redux/store";

const bleManager = new BleManager();

const BluetoothStatus = {
  NoError: 0,
  NoPermission: 1,
  BluetoothNotEnabled: 2,
  LocationNotEnabled: 3,
  OtherScanError: 4,
  FailedToConnectToDevice: 5,
  FailedToDisconnectDevice: 6,
  DisconnectionErrorDevice: 7,
};

const errorMap = {
  [BleErrorCode.LocationServicesDisabled]: BluetoothStatus.LocationNotEnabled,
  [BleErrorCode.BluetoothUnauthorized]: BluetoothStatus.NoPermission,
  [BleErrorCode.BluetoothPoweredOff]: BluetoothStatus.BluetoothNotEnabled,
};

function BluetoothManager() {
  useEffect(() => {
    LogBox.ignoreLogs(["new NativeEventEmitter"]);
  }, []);
  const { checkPermissions, requestPermission, handleAppSettings } =
    BluetoothPermissionHandler();
  const dispatch = useDispatch();

  const [bleStatus, setBleStatus] = useState(BluetoothStatus.NoError);
  const [characteristic, setCharacteristic] = useState(null);
  const [scannedDevices, setScannedDevices] = useState([]);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [receivedData, setReceivedData] = useState([]);
  const [isScan, setIsScan] = useState(false);
  const [readyToSend, setReadyToSend] = useState(false);

  const devices = useSelector((state) => state.devices);

  const scannedDevicesRef = useRef(scannedDevices);
  scannedDevicesRef.current = scannedDevices;

  useEffect(() => {
    const interval = setInterval(async () => {
      // if (connectedDevice) {
      //   console.log("device connected :" + connectedDevice.id);
      // } else {
      //   console.log("no device connected ");
      // }
      if (connectedDevice) {
        const status = await bleManager.isDeviceConnected(connectedDevice.id);
        if (!status) {
          setConnectedDevice(null);
        }
      } else {
        // try {
        //   let deviceFound = false;
        //   for (const device of devices) {
        //     const deviConnected = await bleManager.isDeviceConnected(device);
        //     if (!deviceFound) {
        //       console.log("device connected :" + deviConnected);
        //       if (deviConnected) {
        //         const descDevice = bleManager.devices(device);
        //         console.log(descDevice);
        //         setConnectedDevice(descDevice[0]);
        //         deviceFound = true;
        //       }
        //     } else {
        //       if (deviConnected) {
        //         const descDevice = bleManager.devices(device);
        //         descDevice[0].cancelConnection();
        //       }
        //     }
        //   }
        // } catch (error) {
        //   console.log("error :" + error);
        // }
      }

      const currentTime = Date.now();
      setScannedDevices((prevDevices) => {
        const filteredDevices = prevDevices.filter(
          (device) => currentTime - device.lastDetected <= 3000
        );
        const sortedDevices = filteredDevices
          .slice()
          .sort((a, b) => b.rssi - a.rssi);
        return sortedDevices;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [connectedDevice, readyToSend]);

  function wait200ms() {
    return new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  }

  async function startScan(errorCallback) {
    if (isScan) {
      stopScanDevices;
    }

    try {
      // Check permissions
      setBleStatus(BluetoothStatus.NoError);
      const perm = await checkPermissions();
      if (!perm) {
        const requestPerm = await requestPermission();
        if (!requestPerm) {
          setBleStatus(BluetoothStatus.NoPermission);
          return BluetoothStatus.NoPermission;
        }
      }

      // Check the state of the bluetooth
      const state = await bleManager.state();
      if (state !== "PoweredOn") {
        const enaBluetooth = await enableBluetooth();
        if (!enaBluetooth) {
          setBleStatus(BluetoothStatus.BluetoothNotEnabled);
          return BluetoothStatus.BluetoothNotEnabled;
        }
      }

      // Start Scan
      await scanDevices(errorCallback);
      return BluetoothStatus.NoError;

      // On error of the Scan or other things
    } catch (error) {
      if (error.errorCode === BleErrorCode.LocationServicesDisabled) {
        return BluetoothStatus.LocationNotEnabled;
      } else if (error.errorCode === BleErrorCode.BluetoothUnauthorized) {
        return BluetoothStatus.NoPermission;
      } else if (error.errorCode === BleErrorCode.BluetoothPoweredOff) {
        return BluetoothStatus.BluetoothNotEnabled;
      } else {
        console.log("Failed to get Ble status:", error);
        return BluetoothStatus.OtherScanError;
      }
    }
  }

  const enableBluetooth = async () => {
    try {
      await bleManager.enable();
      console.log("Bluetooth activé");
      return true;
    } catch (error) {
      console.log("Erreur lors de l'activation du Bluetooth:", error);
      return false;
    }
  };

  const scanDevices = async (errorCallback) => {
    setScannedDevices([]);
    console.log("scanning devices...");
    setIsScan(true);
    return new Promise((resolve, reject) => {
      bleManager.startDeviceScan(
        null,
        { allowDuplicates: false },
        (error, device) => {
          if (error) {
            console.log("Scan error:", error);

            const bleStatus =
              errorMap[error.errorCode] || BluetoothStatus.OtherScanError;
            setBleStatus(bleStatus);
            errorCallback(bleStatus);
            stopScanDevices();
            reject(error);
          } else {
            if (device.name) {
              setScannedDevices((prevDevices) => {
                const existingDeviceIndex = prevDevices.findIndex(
                  (d) => d.id === device.id
                );
                if (existingDeviceIndex !== -1) {
                  const updatedDevices = [...prevDevices];
                  updatedDevices[existingDeviceIndex] = {
                    ...device,
                    lastDetected: Date.now(),
                  };
                  const sortedDevices = updatedDevices
                    .slice()
                    .sort((a, b) => b.rssi - a.rssi);
                  return sortedDevices;
                } else {
                  return [
                    ...prevDevices,
                    { ...device, lastDetected: Date.now() },
                  ];
                }
              });
            }
          }
        }
      );
      resolve();
    });
  };

  const stopScanDevices = async () => {
    setScannedDevices([]);
    console.log("stop scanning devices...");
    setIsScan(false);
    try {
      await bleManager.stopDeviceScan();
    } catch (error) {
      console.error("Scan error:", error);
    }
  };

  const connectToDevice = async (
    device,
    callbackOnDisconnect,
    callbackOnData
  ) => {
    let deviceConnected = null;
    try {
      await bleManager.stopDeviceScan();

      deviceConnected = await bleManager.connectToDevice(
        device.id,
        (true, null, null, null)
      );
    } catch (error) {
      console.log("Failed to connect to device:", error);
      return false;
    }
    try {
      await deviceConnected.onDisconnected((error, device) => {
        // const status = await device.isConnected();
        // console.log(status);
        // if (status) {
        console.log("callback function on Disconnect");
        callbackOnDisconnect();
        // }
        setConnectedDevice(null);
      });
    } catch (error) {
      console.log(
        "Failed to set the callback function onDisconnected :",
        error
      );
      return false;
    }
    const deviceId = deviceConnected.id;

    if (!devices.includes(deviceId)) {
      const newDevice = [...devices, deviceId];
      dispatch(updateDevices(newDevice));
    }
    try {
      const statusMonitor = await monitorCharacteristic(
        device,
        deviceConnected,
        callbackOnData
      );
      if (!statusMonitor) {
        console.log("Failed to monitor characteristic");
        await deviceConnected.cancelConnection();
        callbackOnDisconnect();
        return false;
      }
    } catch (error) {
      console.log("Failed to monitor characteristic:", error);
      await deviceConnected.cancelConnection();
      callbackOnDisconnect();

      return false;
    }

    setConnectedDevice(deviceConnected);
    return true;
  };

  const monitorCharacteristic = async (
    device,
    bluetoothConnected,
    callbackOnData
  ) => {
    await bluetoothConnected.discoverAllServicesAndCharacteristics();
    const services = await bluetoothConnected.services();
    // bluetoothConnected.monitorCharacteristicForService(
    //   "4fafc201-1fb5-459e-8fcc-c5c9c331914b",
    //   "beb5483e-36e1-4688-b7f5-ea07361b26a8",
    //   (error, char) => {
    //     if (error) {
    //       console.log("Failed to monitor characteristic:", error);
    //       return;
    //     }
    //     const data = char.value;
    //     const dataString = Buffer.from(data, "base64").toString("utf-8");
    //     handleReceivedData(dataString, callbackOnData);
    //   }
    // );

    const serviceUUID = device.serviceUUIDs[0];
    if (serviceUUID === null || serviceUUID.length === 0) {
      console.log("No Service UUID found");
      return false;
    }
    // const service = services[20]; // Choose the appropriate service UUID
    const service = services.find((s) => s.uuid === serviceUUID);
    if (!service) {
      console.log(`Service ${serviceUUID} not found on the device.`);
      return false;
    }
    console.log("Service UUID found:", service.uuid);

    // const characteristicUUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8"; // Replace with your characteristic UUID

    const characteristics = await service.characteristics();

    const characteristic = characteristics[0];
    if (!characteristic) {
      console.log(
        `Characteristic ${characteristicUUID} not found in the service.`
      );
      return false;
    }
    setCharacteristic(characteristic);
    await characteristic.monitor((error, char) => {
      if (error) {
        console.log("Failed to monitor characteristic:", error);
        return;
      }
      const data = char.value;
      const dataString = Buffer.from(data, "base64").toString("utf-8");
      handleReceivedData(dataString, callbackOnData);
    });
    return true;
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      try {
        setConnectedDevice(null);
        await connectedDevice.cancelConnection();
        return true;
      } catch (error) {
        if (error.errorCode === BleErrorCode.DeviceNotConnected) {
          setConnectedDevice(null);
          return true;
        }
        console.log("Failed to disconnect from device:", error);
        return false;
      }
    }
  };

  const JSON_DELIMITER = "<!JSON_END!>";

  function splitJsonIntoChunks(jsonString, chunkSize) {
    const chunks = [];
    let currentChunk = "";

    for (let i = 0; i < jsonString.length; i++) {
      currentChunk += jsonString[i];
      if (currentChunk.length >= chunkSize || i === jsonString.length - 1) {
        chunks.push(currentChunk);
        currentChunk = "";
      }
    }
    chunks.push(JSON_DELIMITER);
    return chunks;
  }

  const sendDataToDevice = async (data) => {
    if (connectedDevice && readyToSend) {
      try {
        const dataChunks = splitJsonIntoChunks(data, 20);
        // console.log(dataChunks);
        for (const chunk of dataChunks) {
          const buffer = Buffer.from(chunk, "utf-8");
          const base64String = buffer.toString("base64");
          await characteristic.writeWithoutResponse(base64String);
        }
        console.log("Data sent successfully");
      } catch (error) {
        console.error("Failed to send data:", error);
      }
    }
  };

  const sendDataToDeviceWithoutReadyToSend = async (data) => {
    if (connectedDevice) {
      try {
        const dataChunks = splitJsonIntoChunks(data, 20);
        // console.log(dataChunks);
        for (const chunk of dataChunks) {
          const buffer = Buffer.from(chunk, "utf-8");
          const base64String = buffer.toString("base64");
          await characteristic.writeWithoutResponse(base64String);
        }
        console.log("Data sent successfully");
      } catch (error) {
        console.error("Failed to send data:", error);
      }
    }
  };

  const handleReceivedData = (data, callbackOnData) => {
    callbackOnData(data);
    setReceivedData((prevData) => [...prevData, data]);
  };

  const isReadyToSend = (enable) => {
    setReadyToSend(enable);
  };

  return {
    startScan,
    enableBluetooth,
    requestPermission,
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
  };
}

export { BluetoothManager, BluetoothStatus };
