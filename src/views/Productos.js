import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import FormularioProductos from '../components/FormularioProductos';
import TablaProductos from '../components/TablaProductos';
import { db } from '../database/firebaseConfig';

const Productos = () => {
  const [productos, setProductos] = useState([]);

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(docs);
    } catch (error) {
      console.error('Error al obtener documentos:', error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, 'productos', id));
      cargarDatos();
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <View style={styles.container}>
      <FormularioProductos cargarDatos={cargarDatos} />
      <TablaProductos productos={productos} eliminarProducto={eliminarProducto} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default Productos;