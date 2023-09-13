import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, LogBox } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/HomeScreen";
import ThemeScreen from "../screens/ThemeScreen.js";
import SettingsScreen from "../screens/SettingsScreen.js";
import ColorPicker from "../screens/ColorPickerScreen.js";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLOR } from "../utils/constants";
import { createStackNavigator } from "@react-navigation/stack";
import Ripple from "react-native-advanced-ripple";
import { useSelector, useDispatch } from "react-redux";
import { updateTheme } from "../redux/store";

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

function BottomAct({}) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLOR.PRIMARY,
        tabBarInactiveTintColor: COLOR.SECONDARY_VARIANT,

        tabBarStyle: {
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 20,
          height: 57,
          shadowColor: "#000",
          borderRadius: 20,
          color: COLOR.ON_PRIMARY,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: styles.headerBar,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: "center",
          tabBarLabel: "Home",
          tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Themes"
        component={ThemeScreen}
        options={{
          headerStyle: styles.headerBar,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: "center",
          tabBarLabel: "Themes",
          tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="pencil" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerStyle: styles.headerBar,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: "center",
          tabBarLabel: "Settings",
          tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Navigation = ({}) => {
  useEffect(() => {
    LogBox.ignoreLogs(["new NativeEventEmitter"]);
  }, []);

  const renderHeaderLeft = ({ navigation }) => (
    <Ripple
      // onPress={() => navigation.goBack()}
      rippleDuration={200}
      rippleColor={COLOR.ON_SECONDARY}
      rippleOpacity={0.3}
      onPressOut={() => navigation.goBack()}
    >
      <View
        style={{
          borderRadius: 10,
          backgroundColor: COLOR.PRIMARY_VARIANT,
          padding: 5,
        }}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={28}
          color={COLOR.SECONDARY}
        />
      </View>
    </Ripple>
  );

  const dispatch = useDispatch();

  const [headerTitleStr, setHeaderTitleStr] = useState("Themes");

  const themes = useSelector((state) => state.themeUpdate);

  const myJSON = useSelector((state) => state.myJSON);

  const handleTitleChange = (text, route) => {
    setHeaderTitleStr(text);

    if (route.params.isTheme && typeof route.params.themeId !== "undefined") {
      if (
        themes[route.params.themeId] &&
        typeof themes[route.params.themeId].name !== "undefined"
      ) {
        const updatedThemes = Object.values({
          ...themes,
          [route.params.themeId]: {
            ...themes[route.params.themeId],
            name: text,
          },
        });

        dispatch(updateTheme(updatedThemes));
      }
    }
  };

  const title = (route) => {
    useEffect(() => {
      if (route.params.isTheme && typeof route.params.themeId !== "undefined") {
        if (themes[route.params.themeId] && themes[route.params.themeId].name) {
          setHeaderTitleStr(themes[route.params.themeId].name);
        }
      }
    }, []);
  };

  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="loadingScreen"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <LoadingScreen {...props} />}
      </Stack.Screen> */}

      <Stack.Screen
        name="BottomNavigator"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <BottomAct />}
      </Stack.Screen>

      <Stack.Screen
        name="ColorPicker"
        component={ColorPicker}
        options={({ navigation, route }) => ({
          headerLeft: () => renderHeaderLeft({ navigation }),
          headerLeftContainerStyle: styles.headerArrow,
          headerStyle: styles.headerBar,
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: "center",
          headerTitle: () => (
            <>
              <Text style={styles.headerTitle}>
                {myJSON[route.params.itemId].name}
              </Text>
            </>
          ),
          tabBarLabel: "Settings",
          tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={size} />
          ),
        })}
      />

      <Stack.Screen
        name="ThemesEdit"
        component={Home}
        options={({ navigation, route }) => ({
          headerLeft: () => renderHeaderLeft({ navigation }),
          headerLeftContainerStyle: styles.headerArrow,
          headerStyle: styles.headerBar,
          headerTitleAlign: "center",
          headerTitle: () => (
            <View>
              {title(route)}
              <TextInput
                value={headerTitleStr}
                onChangeText={(text) => handleTitleChange(text, route)}
                style={styles.headerTitle}
              />
            </View>
          ),
          tabBarLabel: "Settings",
          tabBarLabelPosition: "beside-icon",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cogs" color={color} size={size} />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR.BACKGROUND,
  },
  headerBar: {
    backgroundColor: COLOR.ON_SECONDARY,
    borderBottomColor: "#ccc",
    elevation: 10,
    shadowColor: "#000",
    height: 80,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLOR.SECONDARY,
  },
  headerArrow: {
    marginLeft: 20,
    marginTop: 5,
  },
  tabBarLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLOR.ON_PRIMARY,
  },
  tabBarIcon: {
    fontSize: 20,
    color: COLOR.ON_PRIMARY,
  },
});

export default Navigation;
