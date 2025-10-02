import { View, Text, StyleSheet, FlatList } from 'react-native';

const ListaProductos = ({ productos }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Productos</Text>
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.nombre}>{item.nombre} - ${item.precio}</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  nombre: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default ListaProductos;