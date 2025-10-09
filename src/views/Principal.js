import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import Productos from "./Productos";
import Usuarios from "./Usuarios";

const Principal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione la vista</Text>
      <Button
        title="Ir a Usuarios"
        onPress={() => navigation.navigate("Usuarios")}
      />
      <Button
        title="Ir a Productos"
        onPress={() => navigation.navigate("Productos")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
});

export default Principal;