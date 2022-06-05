import { StyleSheet, Text, View, Button } from "react-native";
import React, { useEffect } from "react";
import { db } from "../screens/firebase";
import { collection, getDocs } from "firebase/firestore";

const Farms = () => {
  const getData = async () => {
    const farmsCollection = collection(db, "Farms");
    const farmsSnapshot = await getDocs(farmsCollection);
    const farmsList = farmsSnapshot.docs.map((doc) => doc.data());
    //farms ist returns all the farms... map through it and render jsx
    //form validation with formik? and schema validation with Yup
    //

    console.log("farmsCollection: ", farmsCollection);
    console.log("farmsSnapshot: ", farmsSnapshot);
    console.log("farms list: ", farmsList);
  };

  return (
    <View>
      <Text>Farms</Text>
      <Button title="Get Data" onPress={getData} />
    </View>
  );
};

export default Farms;

const styles = StyleSheet.create({});
