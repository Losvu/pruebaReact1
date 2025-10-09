import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const UsuarioForm = ({ onGuardar }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");

  const handleGuardar = () => {
    onGuardar({ nombre, correo, telefono, edad: Number(edad) });
    setNombre("");
    setCorreo("");
    setTelefono("");
    setEdad("");
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />
      <Button title="Guardar Usuario" onPress={handleGuardar} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default UsuarioForm;