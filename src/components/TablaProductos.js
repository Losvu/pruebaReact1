
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import BotonEliminarProducto from "./BotonEliminarProducto.js";

const TablaProductos = ({ productos, eliminarProducto, editarProducto }) => {

  //metodo 1
  const cargarDatosFirebase = async (nombreColeccion) => {
    if (!nombreColeccion || typeof nombreColeccion !== 'string') {
      console.error('Error: Se requiere un nombre de colección válido.');
      return;
    }

    try {
      const datosExportados = {};

      // Obtener la referencia a la colección específica
      const snapshot = await getDocs(collection(db, nombreColeccion));

      // Mapear los documentos y agregarlos al objeto de resultados
      datosExportados[nombreColeccion] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return datosExportados;
    } catch (error) {
      console.error(`Error extrayendo datos de la colección '${nombreColeccion}':`, error);
    }
  };
  //metodo 2
  const exportarDatos = async () => {
    try {
      const jsonString = await cargarDatosDeFirebase("productos");
      console.log("Datos cargados:", jsonString);

      const baseFileName = "datos_firebase.txt";

      await Clipboard.setStringAsync(jsonString);
      console.log("Datos copiados al portapapeles");

      if (!(await Sharing.isAvailableAsync())) {
        alert("La función Compartir/Guardar no está disponible en tu dispositivo");
        return;
      }

      const fileUri = FileSystem.cacheDirectory + baseFileName;
      await FileSystem.writeAsStringAsync(fileUri, jsonString);

      await Sharing.shareAsync(fileUri);
      alert("Datos copiados al portapapeles y listos para compartir");
    } catch (error) {
      console.error("Error al exportar y compartir:", error);
      alert("Error al exportar o compartir: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 10 }}>
        <Button title="Exportar" onPress={exportarDatos} />
      </View>
      <Text style={styles.titulo}>Tabla de Productos</Text>

      {/* Encabezado de la tabla */}
      <View style={[styles.fila, styles.encabezado]}>
        <Text style={[styles.celda, styles.textoEncabezado]}>Nombre</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Precio</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Acciones</Text>
      </View>

      {/* Contenido de la tabla */}
      <ScrollView>
        {productos.map((item) => (
          <View key={item.id} style={styles.fila}>
            <Text style={styles.celda}>{item.nombre}</Text>
            <Text style={styles.celda}>${item.precio}</Text>

            {/* Celda de acciones */}
            <View style={[styles.celdaAcciones]}>

              <TouchableOpacity
                style={styles.botonActualizar}
                onPress={() => editarProducto(item)}
              >
                <Text>✏️</Text>
              </TouchableOpacity>

              <BotonEliminarProducto id={item.id} eliminarProducto={eliminarProducto} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: "stretch"
  },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  fila: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 6,
    alignItems: "center",
  },
  encabezado: {
    backgroundColor: "#f0f0f0",
  },
  celda: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  celdaAcciones: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  textoEncabezado: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  botonActualizar: {
    padding: 4,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#f3f3f7",
  }
});

export default TablaProductos;
