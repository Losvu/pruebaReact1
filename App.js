import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
// AÑADIR 'Button' aquí:
import { View, Text, StyleSheet, Button } from "react-native";
import { auth } from "./src/database/firebaseConfig";

// Componentes de la app
import Login from "./src/Components/Login";
import Home from "./src/Components/Home"; // Nuevo menú de navegación
import Productos from "./src/view/Productos";
import Ciudades from "./src/view/Ciudades"; 
import CompartirDatos from "./src/view/CompartirDatos";
import ProductosRealtime from "./src/view/ProductosRealtime"; 
import CalculadoraIMC from "./src/view/CalculadoraDePeso"; // Componente de la asignación
// Asumo que estos componentes existen en src/view
import Clientes from "./src/view/Clientes";
import Promedios from "./src/view/Promedios";
import Usuarios from "./src/view/Usuarios";


export default function App() {
  const [usuario, setUsuario] = useState(null);
  // Nuevo estado para la navegación: 'Home' es la vista inicial
  const [vistaActual, setVistaActual] = useState('Home'); 

  useEffect(() => {
    // Escucha los cambios en la autenticación (login/logout)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      // Cuando el usuario se autentica, lo llevamos a la vista inicial
      if (user) {
        setVistaActual('Home'); 
      }
    });
    return unsubscribe;
  }, []);

  const cerrarSesion = async () => {
    await signOut(auth);
    setVistaActual('Home'); // Volvemos a Home (que luego mostrará Login)
  };

  // Mapeo de vistas para renderizado condicional
  const renderVista = () => {
    switch (vistaActual) {
      case 'Home':
        // Pasamos setVista y cerrarSesion a Home
        return <Home setVista={setVistaActual} cerrarSesion={cerrarSesion} />;
      case 'Productos':
        return <Productos />;
      case 'Ciudades':
        return <Ciudades />;
      case 'CompartirDatos':
        return <CompartirDatos />;
      case 'ProductosRealtime':
        return <ProductosRealtime />;
      case 'CalculadoraIMC':
        return <CalculadoraIMC />; // Vista de la asignación
      case 'Clientes':
        return <Clientes />;
      case 'Promedios':
        return <Promedios />;
      case 'Usuarios':
        return <Usuarios />;
      default:
        return <Text style={styles.errorText}>Vista no encontrada</Text>;
    }
  };

  if (!usuario) {
    // Si no hay usuario autenticado, mostrar login
    return <Login onLoginSuccess={() => setUsuario(auth.currentUser)} />;
  }

  // Si hay usuario autenticado, mostramos la vista seleccionada
  return (
    <View style={styles.container}>
      {/* Añadimos un botón de "Regresar" o "Home" en la parte superior 
        cuando no estamos en la vista Home
      */}
      {vistaActual !== 'Home' && (
        <View style={styles.header}>
          <Button 
            title="← Menú Principal" 
            onPress={() => setVistaActual('Home')} 
            color="#2c3e50"
          />
        </View>
      )}
      <View style={styles.content}>
        {renderVista()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 50, // Ajuste para la barra de estado de RN
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#f8f8f8'
    },
    content: {
        flex: 1,
    },
    errorText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: 'red'
    }
});