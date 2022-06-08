import { StyleSheet, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import AddFarm from "./screens/AddFarm";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppProvider } from "./context/appContext";
import { useEffect, useState } from "react";
import { firebase } from "@react-native-firebase/firestore";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  AddFarm: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  // const [storageKey, setStorageKey] = useState<string | null>()

  // const checkStorage = async () => {
  //   const key = await AsyncStorage.getItem("@auth_Key");
  //   console.log("KEYYYY: ", key);

  //   if (key === "string") {
  //     setIsAuth(true);
  //     return;
  //   }

  //   setIsAuth(false);
  // };
  // checkStorage();

  // (async () => {
  //   try {
  //     const value = await AsyncStorage.getItem("@auth_Key");
  //     if (value === "true") {
  //       console.log("val is trueee");
  //       console.log("value:::: ", value);

  //       // value previously stored
  //       setIsAuth(true);
  //     } else if (value === "false") {
  //       console.log("val is nullll");

  //       setIsAuth(false);
  //     }
  //   } catch (e) {
  //     // error reading value
  //     console.log("error in app asyncanonymouse: ", e);
  //   }
  // })();

  useEffect(() => {
    console.log("ISAUTH: ", isAuth);
  });
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: Platform.OS === "web" ? false : true,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />

          <Stack.Screen name="AddFarm" component={AddFarm} />
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
