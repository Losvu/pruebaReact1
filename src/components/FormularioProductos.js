import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { db } from "../database/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const FormularioProductos = ({ actualizarProducto, modoEdicion, cargarDatos, nuevoProducto, manejoCambio, guardarProducto }) => {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                {modoEdicion ? "Actuaizar Producto" : "Registro de Productos"}
            </Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del producto"
                value={nuevoProducto.nombre}
                onChangeText={(nombre) => manejoCambio("nombre", nombre)}
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChangeText={(precio) => manejoCambio("precio", precio)}
                keyboardType="numeric"
            />
            <Button 
            title={modoEdicion ? "Actualizar" : "Guardar"}
             onPress={modoEdicion? actualizarProducto : guardarProducto}   
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: { padding: 20 },
    titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
    input: { borderWidth: 1, borderColor: "#25c510ff", padding: 10, marginBottom: 10 }
});

export default FormularioProductos;