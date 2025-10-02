import { View, Text, StyleSheet, ScrollView } from 'react-native';
import BotonEliminarProducto from './BotonEliminarProducto';

const TablaProductos = ({ productos, eliminarProducto }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tabla de Productos</Text>
      {/* Encabezado de la tabla */}
      <View style={[styles.fila, styles.encabezado]}>
        <Text style={[styles.celda, styles.encabezadoTexto]}>Nombre</Text>
        <Text style={[styles.celda, styles.encabezadoTexto]}>Precio</Text>
        <Text style={[styles.celda, styles.encabezadoTexto]}>Acciones</Text>
      </View>
      {/* Contenido de la tabla */}
      <ScrollView>
        {productos.map(item => (
          <View key={item.id} style={styles.fila}>
            <Text style={styles.celda}>{item.nombre}</Text>
            <Text style={styles.celda}>{item.precio}</Text>
            <View style={styles.celdaAcciones}>
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
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fila: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    paddingVertical: 6,
  },
  encabezado: {
    backgroundColor: '#f0f0f0',
  },
  celda: {
    flex: 1,
    textAlign: 'center',
  },
  celdaAcciones: {
    flex: 1,
    justifyContent: 'center',
  },
  encabezadoTexto: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default TablaProductos;