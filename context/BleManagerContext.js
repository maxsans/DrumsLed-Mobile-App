import React, { createContext, useContext, useState } from "react";
import { BluetoothManager } from "../components/bluetooth/bleManager";

const BluetoothManagerContext = createContext();

export function useBluetoothManager() {
  return useContext(BluetoothManagerContext);
}

export function BluetoothManagerProvider({ children }) {
  const bluetoothManager = BluetoothManager(); // Créez une instance de votre composant BluetoothManager
  const [state, setState] = useState({});

  return (
    <BluetoothManagerContext.Provider
      value={{ bluetoothManager, state, setState }}
    >
      {children}
    </BluetoothManagerContext.Provider>
  );
}
