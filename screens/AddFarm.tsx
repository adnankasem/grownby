import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "./firebase";
import { useNavigation } from "@react-navigation/core";
import type { StackNavigationProp, Header } from "@react-navigation/stack";
import { RootStackParamList } from "../App";
import * as ImagePicker from "expo-image-picker";
import { Button, TextInput } from "react-native-paper";
import {
  getDownloadURL,
  ref,
  uploadString,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const AddFarm: React.FC<{}> = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const addFarmToDb = async (values) => {
    console.log("VALUES: ", values);

    const farmDoc = await addDoc(collection(db, "Farms"), {
      displayName: values.displayName,
      name: values.name,
      phone: values.phone,
      openHours: values.openHours,
      image: values.image,
    });
  };

  const imagePicker = async (handleChange) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      base64: true,
    });

    if (result.cancelled === false) {
      console.log("image picker result", result);

      // const uniqueId = uuidv4();

      const storageRef = ref(storage, "images");
      console.log("storageRef: ", storageRef);

      // if (Platform.OS === "web") {
      const firstItem = result.base64.charAt(0);
      let imageExt = "";
      switch (firstItem) {
        case "/":
          imageExt = "jpeg";
          break;
        case "i":
          imageExt = "png";
          break;

        default:
          break;
      }
      const imageDataUrlString = `data:image/${imageExt};base64,${result.base64}`;
      console.log(imageDataUrlString);
      await uploadString(storageRef, imageDataUrlString, "data_url").then(
        (snapshot) => {
          console.log(
            "Uploaded a data_url string! here is snapshot: ",
            snapshot
          );
          getDownloadURL(snapshot.ref).then((url) => {
            console.log("OUR URLLL: ", url);
            handleChange(url);
          });
        }
      );
      // } else {
      //   // let file = File(result.uri)
      //   // uploadBytes(storageRef, ).then((snapshot) => {
      //   //   console.log('Uploaded a blob or file!');
      //   // });

      //   const file = result.uri;
      //   // await uploadString(storageRef, file).then((snapshot) => {
      //   //   console.log("Uploaded a raw string!", snapshot);

      //   //   getDownloadURL(snapshot.ref).then((url) => {
      //   //     console.log("OUR URLLL: ", url);
      //   //     handleChange(url);
      //   //   });
      //   // });

      // }
    }
  };

  return (
    <Formik
      initialValues={{
        displayName: "",
        name: "",
        phone: "",
        image: "",
        openHours: "",
      }}
      onSubmit={async (values) => {
        await addFarmToDb(values);
        await navigation.navigate("Home");
      }}
      validationSchema={Yup.object().shape({
        displayName: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Please, provide your farm display name!"),
        name: Yup.string()
          .min(2, "Too Short!")
          .max(50, "Too Long!")
          .required("Please, provide your farm name!"),
        openHours: Yup.string(),
        phone: Yup.string().matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "Phone number is not valid"
        ),
        image: Yup.string(),
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
        setFieldValue,
      }) => (
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
          <TextInput
            onChangeText={handleChange("openHours")}
            onBlur={handleBlur("openHours")}
            value={values.openHours}
            style={styles.input}
            placeholder="Open Hours"
          />
          {touched.openHours && errors.openHours && (
            <Text style={{ fontSize: 12, color: "#FF0D10" }}>
              {errors.openHours}
            </Text>
          )}
          <Button
            mode="contained"
            style={styles.button}
            onPress={async () => {
              await imagePicker(handleChange("image"));
            }}
          >
            Pick an Image
          </Button>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSubmit as any}
              style={isValid ? styles.button : styles.disabledButton}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>Add Farm</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default AddFarm;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20,
    marginBottom: 20,
  },
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
