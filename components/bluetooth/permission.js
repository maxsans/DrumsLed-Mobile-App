import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Linking } from "react-native";

function BluetoothPermissionHandler() {
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      setPermissionsGranted(granted);
      return granted;
    } catch (error) {
      console.error("Failed to request Bluetooth permission:", error);
    }
  };

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Bluetooth Permission",
          message:
            "This app requires Bluetooth permission for scanning devices.",
          buttonPositive: "OK",
        }
      );
      setPermissionsGranted(granted === PermissionsAndroid.RESULTS.GRANTED);

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.error("Failed to request Bluetooth permission:", error);
    }
  };

  const handleAppSettings = async () => {
    const isNeverAskAgain = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (!isNeverAskAgain) {
      // User selected 'Never ask again', guide them to app settings
      Linking.openSettings();
    }
  };

  return { checkPermissions, requestPermission, handleAppSettings }; // or return some JSX component
}

export default BluetoothPermissionHandler;
