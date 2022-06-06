import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AddFarm from "../screens/AddFarm";
import { useAppContext } from "../context/appContext";

const MainScreen = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const { isSignedIn, userSignedIn } = useAppContext();

  console.log("iSignedInMAINNNN", isSignedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: Platform.OS === "web" ? false : true,
        }}
        initialRouteName={isSignedIn ? "Home" : "Login"}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddFarm" component={AddFarm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;

const styles = StyleSheet.create({});
