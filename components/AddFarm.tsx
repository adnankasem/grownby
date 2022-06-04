import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  Platform,
} from "react-native";
import React from "react";
import { Formik } from "formik";

const AddFarm: React.FC<{}> = () => {
  // const initialValues: AddFarmValues = { displayName: "" };

  return (
    <Formik
      initialValues={{ displayName: "" }}
      onSubmit={(values) => alert(`displayName: ${values.displayName}`)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              onChangeText={handleChange("displayName")}
              onBlur={handleBlur("displayName")}
              value={values.displayName}
              style={styles.input}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={handleSubmit as any} title="Submit" />
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default AddFarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: { width: Platform.OS === "web" ? "25%" : "80%" },
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
  button: {},
});
