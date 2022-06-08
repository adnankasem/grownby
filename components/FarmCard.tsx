import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";

type Farm = {
  displayName: string;
  name: string;
  phone: string;
  image: string;
  openHours: string;
};

interface FarmCardProps {
  farm: Farm;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }: FarmCardProps) => {
  return (
    <Card style={Styles.container}>
      <Card.Content>
        <Title>{`Display Name: ${farm.displayName || "N/A"}`}</Title>
      </Card.Content>
      <Card.Cover source={{ uri: farm.image }} />

      <Card.Content>
        <Paragraph>{`Farm Name: ${farm.name || "N/A"}`}</Paragraph>
      </Card.Content>
      <Card.Content>
        <Paragraph>{`Phone: ${farm.phone || "N/A"}`}</Paragraph>
      </Card.Content>
      <Card.Content>
        <Paragraph>{`Open Hours: ${farm.openHours || "N/A"}`}</Paragraph>
      </Card.Content>
    </Card>
  );
};

export default FarmCard;

const Styles = StyleSheet.create({
  container:
    Platform.OS === "web"
      ? {
          alignContent: "center",
          margin: 37,
          maxWidth: "90%",
        }
      : {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "90%",
          margin: 20,
        },
});
