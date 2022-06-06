import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, Button, Title, Paragraph } from "react-native-paper";

type Farm = {
  displayName: string;
  name: string;
  phone: string;
  image: string;
};

interface FarmCardProps {
  farm: Farm;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }: FarmCardProps) => {
  return (
    <Card style={Styles.container}>
      <Card.Content>
        <Title>{`Display Name: ${farm.displayName}`}</Title>
      </Card.Content>
      <Card.Cover source={{ uri: farm.image }} />
      <Card.Content>
        <Paragraph>{`Farm Name: ${farm.name}`}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button>Add To Favourites</Button>
      </Card.Actions>
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
        },
});
