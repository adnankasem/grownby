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
  Image,
  ActivityIndicator,
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
  const [loading, setLoading] = useState(true);

  const { isSignedIn, userSignedIn, userSignedOut } = useAppContext();

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // useEffect(() => {
  //   console.log("issignedin: ", isSignedIn);
  //   if (isSignedIn) {
  //     navigation.replace("Home");
  //     return;
  //   }
  // });

  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user == null) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User

      // console.log("USER: ", user);
      // storeData("false");

      await AsyncStorage.removeItem("@auth_Key");
      // console.log(
      //   "storageKey: truee ",
      //   await AsyncStorage.getItem("@auth_Key")
      // );
      setLoading(false);

      // ...
    } else {
      // ...
      // console.log("USER: ", user);

      // storeData("true");

      await AsyncStorage.setItem("@auth_Key", "string");
      // console.log(
      //   "storageKey: truee ",
      //   await AsyncStorage.getItem("@auth_Key")
      // );

      navigation.navigate("Home");
    }
  });

  // const storeData = async (boolean) => {
  //   try {
  //     if (boolean === "false") {
  //       const storageKey = await AsyncStorage.setItem("@auth_Key", null);
  //       console.log("storageKey falsse: ", storageKey);
  //     }
  //     if (boolean === "true") {
  //       const storageKey = await AsyncStorage.setItem("@auth_Key", "string");
  //       console.log(
  //         "storageKey: truee ",
  //         await AsyncStorage.getItem("@auth_Key")
  //       );
  //     }
  //   } catch (e) {
  //     // saving error
  //     console.log("error in storeDAta", e);
  //   }
  // };

  const handleSignUp = (): void => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("res Create user: ", res);
        navigation.navigate("Home");
        // userSignedIn();
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
        // userSignedIn();
        navigation.navigate("Home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const item = {
    image: require("../assets/logo.png"),
  };

  return loading ? (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={item.image}
        style={[
          Platform.OS === "web"
            ? { width: 700, height: 170 }
            : { width: 200, height: 50 },
        ]}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          accessibilityLabel="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          testID="email-input"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
          testID="password-input"
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          accessibilityLabel="Login"
          accessibilityRole="button"
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityLabel="Register"
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
    marginTop: 25,
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
