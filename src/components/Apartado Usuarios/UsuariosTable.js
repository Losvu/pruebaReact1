import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const UsuariosTable = ({ usuario, onEliminar }) => {
  return (
    <View style={styles.row}>
      <View style={styles.info}>
        <Text style={styles.text}>Nombre: {usuario.nombre}</Text>
        <Text style={styles.text}>Correo: {usuario.correo}</Text>
        <Text style={styles.text}>Teléfono: {usuario.telefono}</Text>
        <Text style={styles.text}>Edad: {usuario.edad}</Text>
      </View>
      <Button title="Eliminar" color="red" onPress={() => onEliminar(usuario.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 10,
  },
  info: { flex: 1 },
  text: { fontSize: 14 },
});

export default UsuariosTable;