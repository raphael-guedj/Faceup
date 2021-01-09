import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { LogBox } from "react-native";
LogBox.ignoreAllLogs(true);
import data from "./reducers/lien";
import Userpseudo from "./reducers/pseudo";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import HomeScreen from "./screens/homescreen";
import SnapScreen from "./screens/snapscreen";
import GalleryScreen from "./screens/galleryscreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const store = createStore(combineReducers({ Userpseudo, data }));

const PageTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Gallery"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Gallery") {
            iconName = "ios-images";
          } else if (route.name === "Snap") {
            iconName = "ios-camera";
          }
          return <Ionicons name={iconName} size={34} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#009788",
        inactiveTintColor: "#FFF",
        style: {
          backgroundColor: "#130f40",
          paddingVertical: 8,
        },
      }}
    >
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Gallery" component={PageTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
