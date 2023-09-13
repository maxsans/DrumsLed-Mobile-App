import React from "react";
import { View, StyleSheet } from "react-native";
import BottomActivity from "../navigation/bottomTab";
import { COLOR } from "../utils/constants";
import Navigation from "../navigation/bottomTab";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { BluetoothManagerProvider } from "../context/BleManagerContext";
import BluetoothManagerComponent from "../components/bluetooth/bleManager";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BluetoothManagerProvider>
          <Navigation />

          {/* <BluetoothManagerComponent /> */}
        </BluetoothManagerProvider>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND,
    opacity: 0.5,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  indicator: {
    transform: [{ scale: 1.5 }],
  },
});

export default App;
