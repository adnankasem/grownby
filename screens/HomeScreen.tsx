import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { auth } from "./firebase";
import { useNavigation } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import AddFarm from "./AddFarm";
import { signOut } from "firebase/auth";
import { useAppContext } from "../context/appContext";
import Farms from "../components/Farms";
// import firestore from "@react-native-firebase/firestore";

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

  const navigateToAddFarm = () => {
    navigation.navigate("AddFarm");
  };

  // const farmsCollection = firestore().collection("Farms");

  // console.log("farms collection: ", farmsCollection);

  return (
    <View style={styles.container}>
      <View style={styles.signOutContainer}>
        {/* <Text>Email: {auth.currentUser?.email}</Text> */}
        <TouchableOpacity onPress={handleSignout} style={styles.button}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.addFarmButtonContainer}>
        <TouchableOpacity onPress={navigateToAddFarm} style={styles.button}>
          <Text style={styles.buttonText}>Add A Farm</Text>
        </TouchableOpacity>
      </View>
      <Farms />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
  signOutContainer: {},
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
});
