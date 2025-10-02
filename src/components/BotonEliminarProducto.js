import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const BotonEliminarProducto = ({ id, eliminarProducto }) => {
  const [visible, setVisible] = useState(false);

  const confirmarEliminar = () => {
    setVisible(false);
    eliminarProducto(id);
  };

  return (
    <View>
      <TouchableOpacity style={styles.boton} onPress={() => setVisible(true)}>
        <Text style={styles.textoBoton}>🗑</Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.texto}>¿Desea eliminar este producto?</Text>
            <View style={styles.fila}>
              <TouchableOpacity style={[styles.botonAccion, styles.cancelar]} onPress={() => setVisible(false)}>
                <Text style={styles.textoAccion}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.botonAccion, styles.confirmar]} onPress={confirmarEliminar}>
                <Text style={styles.textoAccion}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    padding: 4,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F3F7",
  },
  textoBoton: {
    color: "#e63946",
    fontSize: 14,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  texto: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  botonAccion: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  cancelar: {
    backgroundColor: "#ccc",
  },
  confirmar: {
    backgroundColor: "#e63946",
  },
  textoAccion: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BotonEliminarProducto;