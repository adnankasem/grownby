import { useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Text, View, AppRegistry, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { useAppContext } from "./context/appContext";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AppProvider } from "./context/appContext";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const { isSignedIn } = useAppContext();

  // const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // useEffect(() => {
  //   navigation.replace("Home");
  // }, [isSignedIn]);

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: Platform.OS === "web" ? false : true,
          }}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
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

// AppRegistry.registerComponent("App", () => App);
// AppRegistry.runApplication("App", {
//   rootTag: document.getElementById("react-root"),
// });
