import React from 'react';
import { View, Button, StyleSheet, ScrollView, Text } from 'react-native';

// Este componente recibe la función setVista para cambiar el estado de App.js
// y la función cerrarSesion.
export default function Home({ setVista, cerrarSesion }) {
  return (
    <View style={styles.fullContainer}>
      <Text style={styles.titulo}>Menú Principal de Vistas</Text>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* VISTAS DE REALTIME Y ASIGNACIÓN INDIVIDUAL */}
        <View style={styles.botones}>
          <Button 
            title="1. Productos (Realtime)" 
            onPress={() => setVista('ProductosRealtime')} 
            color="#2ecc71"
          />
        </View>
        <View style={styles.botones}>
          <Button 
            title="2. Calculadora IMC (Asignación)" 
            onPress={() => setVista('CalculadoraIMC')} 
            color="#3498db"
          />
        </View>

        {/* OTRAS VISTAS (Asumo que están en src/view) */}
        <View style={styles.botones}>
          <Button 
            title="3. Productos (Firestore)" 
            onPress={() => setVista('Productos')} 
          />
        </View>
        <View style={styles.botones}>
          <Button 
            title="4. Ciudades" 
            onPress={() => setVista('Ciudades')} 
          />
        </View>
        <View style={styles.botones}>
          <Button 
            title="5. Compartir Datos" 
            onPress={() => setVista('CompartirDatos')} 
          />
        </View>
         <View style={styles.botones}>
          <Button 
            title="6. Clientes" 
            onPress={() => setVista('Clientes')} 
          />
        </View>
         <View style={styles.botones}>
          <Button 
            title="7. Promedios" 
            onPress={() => setVista('Promedios')} 
          />
        </View>
         <View style={styles.botones}>
          <Button 
            title="8. Usuarios" 
            onPress={() => setVista('Usuarios')} 
          />
        </View>

      </ScrollView>
      <View style={styles.cerrarSesion}>
        <Button 
          title="Cerrar Sesión" 
          onPress={cerrarSesion} 
          color="#e74c3c" 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: "#ecf0f1",
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50, // Más padding superior para dejar espacio libre
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  botones: {
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden', // Para que el botón respete el borderRadius
  },
  cerrarSesion: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  }
});