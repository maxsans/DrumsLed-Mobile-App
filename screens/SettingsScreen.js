import React, { useEffect, useState } from "react";
import {
  View,
  Switch,
  Button,
  Modal,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DeviceModal from "../components/connectionBleModal";
import BLEBox from "../components/bleBox";

const Settings = () => {
  return (
    <View style={{ flex: 1, marginHorizontal: 15, marginTop: 5 }}>
      <View style={{ flex: 0 }}>
        <BLEBox></BLEBox>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  ctaButton: {
    backgroundColor: "#FF6060",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
