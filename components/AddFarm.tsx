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
import { collection, addDoc } from "firebase/firestore";
import { db } from "../screens/firebase";

const AddFarm: React.FC<{}> = () => {
  // const initialValues: AddFarmValues = { displayName: "" };

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
      onSubmit={(values) => addFarmToDb(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={handleChange("displayName")}
              onBlur={handleBlur("displayName")}
              value={values.displayName}
              style={styles.input}
              placeholder="Farm Display Name"
            />
            <TextInput
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              style={styles.input}
              placeholder="Farm Name"
            />
            <TextInput
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
              style={styles.input}
              placeholder="Phone Number"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit as any}
              style={styles.button}
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
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
