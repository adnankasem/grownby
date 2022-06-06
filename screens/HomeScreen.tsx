import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import { auth } from "./firebase";
import { useNavigation } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { signOut } from "firebase/auth";
import { useAppContext } from "../context/appContext";
import Farms from "../components/Farms";
import { Button } from "react-native-paper";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { userSignedOut } = useAppContext();

  const handleSignout = (): void => {
    signOut(auth)
      .then(() => {
        userSignedOut();
        navigation.replace("Login");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <View style={styles.signOut}>
          <Button onPress={handleSignout} style={styles.button}>
            <Text style={styles.buttonText}>Sign out</Text>
          </Button>
        </View>
      </View>

      <Farms />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: Platform.OS === "web" ? {} : {},
  buttonContainer:
    Platform.OS === "web"
      ? {
          // justifyContent: "center",
          // alignItems: "flex-end",
          // marginTop: 40,
        }
      : {
          // justifyContent: "center",
          // alignItems: "center",
          // marginTop: 40,
        },
  addFarmButtonContainer: Platform.OS === "web" ? {} : {},
  button: {
    backgroundColor: "#0782F9",
    padding: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  signOut: {
    marginBottom: 50,
  },
});
