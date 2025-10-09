import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert, FlatList } from "react-native";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // 👈 tu configuración de Firebase
import UsuarioForm from "../components/UsuarioForm";
import UsuariosTable from "../components/UsuariosTable";

const API_URL = "https://g0h9o8gps8.execute-api.us-east-2.amazonaws.com/validarusuario"; // 👈 reemplaza con tu endpoint

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  // Cargar usuarios desde Firebase
  const cargarUsuarios = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      const lista = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsuarios(lista);
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los usuarios.");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Guardar usuario con validación en Lambda
  const guardarUsuario = async (usuario) => {
    try {
      // Validar con API Gateway
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const data = await response.json();

      if (response.status !== 200) {
        Alert.alert("Validación fallida", data.mensaje + "\n" + data.errores.join("\n"));
        return;
      }

      // Guardar en Firebase
      await addDoc(collection(db, "usuarios"), data.datos);
      Alert.alert("Éxito", "Usuario guardado correctamente.");
      cargarUsuarios();
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el usuario.");
    }
  };

  // Eliminar usuario
  const eliminarUsuario = async (id) => {
    try {
      await deleteDoc(doc(db, "usuarios", id));
      Alert.alert("Éxito", "Usuario eliminado.");
      cargarUsuarios();
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el usuario.");
    }
  };

  return (
    <View style={styles.container}>
      <UsuarioForm onGuardar={guardarUsuario} />
      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UsuariosTable usuario={item} onEliminar={eliminarUsuario} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
});

export default Usuarios;