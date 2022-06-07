import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import { useAppContext } from "../context/appContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { isSignedIn, userSignedIn } = useAppContext();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      storeData(user.uid);
      // ...
    } else {
      // User is signed out
      // ...
      storeData("");
    }
  });

  const storeData = async (value) => {
    try {
      const storageKey = await AsyncStorage.setItem("@auth_Key", value);
      console.log("storageKey: ", storageKey);
    } catch (e) {
      // saving error
      console.log("error in storeDAta", e);
    }
  };

  useEffect(() => {
    console.log("issignedin: ", isSignedIn);
    if (isSignedIn) {
      navigation.replace("Home");
      return;
    }
  });

  const handleSignUp = (): void => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("res Create user: ", res);
        userSignedIn();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode);
      });
  };

  const handleLogin = (): void => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        userSignedIn();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    width: Platform.OS === "web" ? "25%" : "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: Platform.OS === "web" ? "15%" : "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
