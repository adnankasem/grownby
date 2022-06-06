import { StyleSheet, Platform } from "react-native";

import { AppProvider } from "./context/appContext";
import MainScreen from "./screens/MainScreen";

export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  AddFarm: undefined;
};

export default function App() {
  return (
    <AppProvider>
      <MainScreen />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
  },
});

// AppRegistry.registerComponent("App", () => App);
