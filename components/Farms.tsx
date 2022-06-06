import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../screens/firebase";
import {
  collection,
  getDocs,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";

const Farms = () => {
  const [farmsData, setFarmsData] = useState([]);

  const getData = async () => {
    // const farmsCollection = collection(db, "Farms");
    // const farmsSnapshot = await getDocs(farmsCollection);
    // const farmsList = farmsSnapshot.docs.map((doc) => doc.data());
    // setFarmsData(farmsList);
    // console.log("farmsCollection: ", farmsCollection);
    // console.log("farmsSnapshot: ", farmsSnapshot);
    // console.log("farms list: ", farmsList);
  };

  useEffect(() => {
    const farmsCollection = query(collection(db, "Farms"));

    // const unsubscribe = onSnapshot(collection(farmsCollection, (querysnapshot) => {
    //   //   const farmsSnapshotData = doc.data();
    //   const farms = [];
    //   querysnapshot.forEach((doc) => {
    //   farms.push(doc.data());

    //   console.log("farms in useeffect: ", farms);
    // });

    const unsubscribe = onSnapshot(farmsCollection, (querySnapshot) => {
      const farms = [];
      querySnapshot.forEach((doc) => {
        farms.push(doc.data());
      });
      setFarmsData(farms);
      console.log("farms fata in useffect???: ", farmsData);
    });
  }, []);

  return (
    <>
      <View style={styles.farmsContainer}>
        <Text>Farms</Text>
        {/* <Button title="Get Data" onPress={getData} /> */}

        <View>
          <FlatList
            data={farmsData}
            renderItem={({ item }) => (
              <Text key={item.displayName}>{item.name}</Text>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Farms;

const styles = StyleSheet.create({
  farmsContainer: {
    marginBottom: 10,
    borderColor: "green",
    borderWidth: 2,
  },
});
