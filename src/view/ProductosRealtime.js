import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

import { ref, set, push, onValue } from "firebase/database";
// Nota: La ruta a realtimeDB puede variar según la estructura de tu proyecto.
// Asumo que la ruta es correcta:
import { realtimeDB } from "../database/firebaseConfig"; 

const ProductosRealtime = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [productosRT, setProductosRT] = useState([]);

  // Usamos una función interna para guardar datos
  const guardarEnRT = async () => {
    // Reemplazar alert() con un console.error o un mensaje en pantalla, 
    // pero mantengo alert() ya que el código original lo usaba.
    if (!nombre || !precio) {
      alert("Rellena ambos campos"); 
      return;
    }

    try {
      const referencia = ref(realtimeDB, "productos_rt");
      const nuevoRef = push(referencia); // crea ID automático

      await set(nuevoRef, {
        nombre,
        precio: Number(precio),
      });

      setNombre("");
      setPrecio("");

      alert("Producto guardado en Realtime");
    } catch (error) {
      console.log("Error al guardar:", error);
    }
  };

  // Usamos una función interna para leer datos
  const leerRT = () => {
    const referencia = ref(realtimeDB, "productos_rt");

    // Retorna la función de desuscripción para limpiar el listener
    const unsubscribe = onValue(referencia, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val();

        // convertir el objeto en un array limpio {id: data} -> [{id, ...data}]
        const lista = Object.entries(dataObj).map(([id, datos]) => ({
          id,
          ...datos,
        }));

        setProductosRT(lista);
      } else {
        setProductosRT([]);
      }
    });
    
    // Devolver la función de desuscripción para el cleanup
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = leerRT(); 
    return () => unsubscribe(); // Limpia el listener cuando el componente se desmonta
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Prueba Realtime Database</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre producto"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <Button title="Guardar en Realtime" onPress={guardarEnRT} />

      <Text style={styles.subtitulo}>Productos en RT:</Text>

      {productosRT.length === 0 ? (
        <Text>No hay productos</Text>
      ) : (
        productosRT.map((p) => (
          <Text key={p.id}>
            • {p.nombre} - ${p.precio}
          </Text>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subtitulo: { fontSize: 18, marginTop: 20, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ProductosRealtime;