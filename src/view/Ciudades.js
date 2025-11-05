import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { db } from "../database/firebaseConfig.js";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";
import FormularioCiudades from "../Components/FormularioCiudades.js";
import TablaCiudades from "../Components/TablaCiudades.js";

const Ciudades = ({ cerrarSesion }) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [ciudadId, setCiudadId] = useState(null);

  const [ciudades, setCiudades] = useState([]);

  const [nuevaCiudad, setNuevaCiudad] = useState({
    nombre: "",
    pais: "",
    poblacion: "",
    region: "",
  });

  const manejoCambio = (nombre, valor) => {
    setNuevaCiudad((prev) => ({
      ...prev,
      [nombre]: valor,
    }));
  };

  const guardarCiudad = async () => {
    try {
      if (nuevaCiudad.nombre && nuevaCiudad.pais && nuevaCiudad.poblacion && nuevaCiudad.region) {
        await addDoc(collection(db, "ciudades"), {
          nombre: nuevaCiudad.nombre,
          pais: nuevaCiudad.pais,
          poblacion: parseInt(nuevaCiudad.poblacion, 10),
          region: nuevaCiudad.region,
        });
        cargarDatos();
        setNuevaCiudad({ nombre: "", pais: "", poblacion: "", region: "" });
      } else {
        alert("Por favor, complete todos los campos.");
      }
    } catch (error) {
      console.error("Error al registrar ciudad:", error);
    }
  };

  const actualizarCiudad = async () => {
    try {
      if (nuevaCiudad.nombre && nuevaCiudad.pais && nuevaCiudad.poblacion && nuevaCiudad.region) {
        await updateDoc(doc(db, "ciudades", ciudadId), {
          nombre: nuevaCiudad.nombre,
          pais: nuevaCiudad.pais,
          poblacion: parseInt(nuevaCiudad.poblacion, 10),
          region: nuevaCiudad.region,
        });
        setNuevaCiudad({ nombre: "", pais: "", poblacion: "", region: "" });
        setModoEdicion(false);
        setCiudadId(null);
        cargarDatos();
      } else {
        alert("Por favor, complete todos los campos.");
      }
    } catch (error) {
      console.error("Error al actualizar ciudad:", error);
    }
  };

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ciudades"));
      const data = querySnapshot.docs.map((docu) => ({
        id: docu.id,
        ...docu.data(),
      }));
      setCiudades(data);
    } catch (error) {
      console.error("Error al obtener documentos:", error);
    }
  };

  const eliminarCiudad = async (id) => {
    try {
      await deleteDoc(doc(db, "ciudades", id));
      cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const editarCiudad = (ciudad) => {
    setNuevaCiudad({
      nombre: ciudad.nombre,
      pais: ciudad.pais,
      poblacion: ciudad.poblacion?.toString?.() ?? "",
      region: ciudad.region ?? "",
    });
    setCiudadId(ciudad.id);
    setModoEdicion(true);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Cerrar Sesión" onPress={cerrarSesion} />

      <FormularioCiudades
        nuevaCiudad={nuevaCiudad}
        manejoCambio={manejoCambio}
        guardarCiudad={guardarCiudad}
        actualizarCiudad={actualizarCiudad}
        modoEdicion={modoEdicion}
      />

      <TablaCiudades
        ciudades={ciudades}
        editarCiudad={editarCiudad}
        eliminarCiudad={eliminarCiudad}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default Ciudades;


