import TituloPromedio from "../components/TituloPromedio.js";
import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebaseConfig";
import TablaPromedio from "../components/TablaPromedio.js";
import TituloPromedio from "../components/TituloPromedio.js";
import FormularioEdades from "../components/FormularioEdades.js";

const Promedio = () => {
  const [cargarDato, setCargarDato] = useState([]);
  const [promedio, setPromedio] = useState(null);

  // Cargar datos de Firestore
  const cargarDatos = async () => {
    try {
  const querySnapshot = await getDocs(collection(db, "promedio"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCargarDato(data);

      // Una vez que se cargan las edades, llama al método de cálculo con la API [1]
      if (data.length > 0) {
        calcularPromedioAPI(data);
      } else {
        setPromedio(null);
      }
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  // Calcular promedio usando la API
  const calcularPromedioAPI = async (lista) => {
    try {
      const response = await fetch('https://ggrgt89wj6.execute-api.us-east-2.amazonaws.com/calcularpromedio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ edades: lista }),
      });
      const data = await response.json();
      setPromedio(data.promedio || null);
    } catch (error) {
      console.error('Error al calcular promedio en API:', error);
    }
  };

  // Eliminar registro de promedio
  const eliminarPromedio = async (id) => {
    try {
      await deleteDoc(doc(db, "promedio", id));
      await cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error)
    }
  };

  // Cargar datos al montar
  useEffect(() => {
    cargarDatos();
  }, []);


  return (
    <View style={styles.container}>
      <TituloPromedio promedio={promedio}/>
      <FormularioEdades cargarDatos={cargarDatos} />
      <TablaPromedio
        promedio={cargarDato}
        eliminarPromedio={eliminarPromedio}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default Promedio;