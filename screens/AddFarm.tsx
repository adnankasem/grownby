import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Platform,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigation } from "@react-navigation/core";
import type { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

const AddFarm: React.FC<{}> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const addFarmToDb = async (values) => {
    console.log("VALUES: ", values);

    const farmDoc = await addDoc(collection(db, "Farms"), {
      displayName: values.displayName,
      name: values.name,
      phone: values.phone,
    });
  };

  return (
    <Formik
      initialValues={{ displayName: "", name: "", phone: "" }}
      onSubmit={(values) => {
        addFarmToDb(values);
        navigation.navigate("Home");
      }}
      validationSchema={Yup.object().shape({
        displayName: Yup.string().required(
          "Please, provide your farm display name!"
        ),
        name: Yup.string().required("Please, provide your farm name!"),
        phone: Yup.string().matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        ),
      })}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={handleChange("displayName")}
              onBlur={handleBlur("displayName")}
              value={values.displayName}
              style={styles.input}
              placeholder="* Farm Display Name"
            />
            {touched.displayName && errors.displayName && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.displayName}
              </Text>
            )}
            <TextInput
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              style={styles.input}
              placeholder="* Farm Name"
            />
            {touched.name && errors.name && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.name}
              </Text>
            )}
            <TextInput
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
              style={styles.input}
              placeholder="Phone Number"
            />
            {touched.phone && errors.phone && (
              <Text style={{ fontSize: 12, color: "#FF0D10" }}>
                {errors.phone}
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit as any}
              style={isValid ? styles.button : styles.disabledButton}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Add Farm</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default AddFarm;

const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: { width: Platform.OS === "web" ? "75%" : "80%" },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: Platform.OS === "web" ? "25%" : "60%",
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
  disabledButton: {
    width: "100%",
    padding: 15,
    borderRadius: 10,

    border: "1px solid #999999",
    backgroundColor: "#cccccc",
    color: "#666666",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
