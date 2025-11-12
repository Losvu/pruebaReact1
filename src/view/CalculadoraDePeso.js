import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ref, set, push, onValue } from "firebase/database";
import { realtimeDB } from "../database/firebaseConfig"; 

const CalculadoraIMC = () => {
  // Estados para la entrada del usuario
  const [peso, setPeso] = useState("");      // en kg
  const [altura, setAltura] = useState("");  // en metros
  const [resultadoIMC, setResultadoIMC] = useState(null);
  
  // Estado para la lista de registros guardados
  const [registrosIMC, setRegistrosIMC] = useState([]);

  // Constantes de la colección en Realtime Database
  const COLECCION = "registros_imc";

  // Función de cálculo
  const calcularIMC = () => {
    // Convertir a números
    const p = parseFloat(peso);
    const a = parseFloat(altura);

    if (isNaN(p) || isNaN(a) || p <= 0 || a <= 0) {
      // Usamos console.error para evitar alert() en producción, pero lo mantengo por el código original
      alert("Por favor, introduce valores válidos (peso y altura > 0)");
      return null;
    }
    
    // IMC = Peso / (Altura * Altura)
    const imc = p / (a * a);
    
    // Función de clasificación
    const clasificarIMC = (valor) => {
      if (valor < 18.5) return "Bajo peso";
      if (valor >= 18.5 && valor <= 24.9) return "Peso normal";
      if (valor >= 25 && valor <= 29.9) return "Sobrepeso";
      return "Obesidad";
    };

    const clasificacion = clasificarIMC(imc);
    
    // Formatear el resultado a 2 decimales
    const resultado = imc.toFixed(2);
    
    // Actualizar el estado del resultado y guardarlo
    const resultadoFinal = {
      valor: resultado,
      clasificacion: clasificacion,
      fecha: new Date().toLocaleDateString()
    };
    
    setResultadoIMC(resultadoFinal);
    guardarIMC(p, a, resultadoFinal);
  };
  
  // Función de guardado
  const guardarIMC = async (pesoKg, alturaM, resultado) => {
    try {
      const referencia = ref(realtimeDB, COLECCION);
      const nuevoRef = push(referencia); // crea ID automático
      
      await set(nuevoRef, {
        peso: pesoKg,
        altura: alturaM,
        imc: resultado.valor,
        clasificacion: resultado.clasificacion,
        fecha: resultado.fecha,
      });

      // Nota: No se limpian peso/altura para que el usuario pueda hacer ajustes rápidos,
      // pero se podría hacer con setPeso("") y setAltura("") si fuera necesario.
      
    } catch (error) {
      console.log("Error al guardar registro IMC:", error);
      // Usamos console.error para evitar alert() en producción, pero lo mantengo por el código original
      alert("Error al guardar el registro en la base de datos.");
    }
  };

  // Función de lectura (similar a leerRT)
  const leerIMC = () => {
    const referencia = ref(realtimeDB, COLECCION);

    const unsubscribe = onValue(referencia, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val();

        // Convertir el objeto {id: data} a un array [{id, ...data}]
        const lista = Object.entries(dataObj).map(([id, datos]) => ({
          id,
          ...datos,
        }));

        setRegistrosIMC(lista.reverse()); // Muestra los más recientes primero
      } else {
        setRegistrosIMC([]);
      }
    });
    
    return unsubscribe;
  };

  useEffect(() => {
    // Inicia el listener para la lectura de registros de IMC
    const unsubscribe = leerIMC(); 
    return () => unsubscribe(); // Limpia el listener
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora y Registro de IMC</Text>
      <Text style={styles.subtitulo}>Registra tus medidas</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (metros, ej: 1.75)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />
      
      {/* El botón ejecuta el cálculo y guarda los datos en un solo paso */}
      <Button 
        title="Calcular IMC y Guardar Registro" 
        onPress={calcularIMC} 
        color="#008080" // Color diferente para destacar
      />
      
      {resultadoIMC && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoTitulo}>Tu IMC es:</Text>
          <Text style={styles.resultadoValor}>{resultadoIMC.valor}</Text>
          <Text style={styles.resultadoClasificacion}>({resultadoIMC.clasificacion})</Text>
          <Text style={styles.nota}>Registro guardado el {resultadoIMC.fecha}</Text>
        </View>
      )}

      <Text style={styles.subtitulo}>Historial de Registros:</Text>

      {registrosIMC.length === 0 ? (
        <Text>No hay registros de IMC guardados.</Text>
      ) : (
        // Mapear y mostrar los registros (Línea corregida)
        registrosIMC.map((r) => (
          <Text key={r.id} style={styles.registroItem}>
            <Text style={{fontWeight: 'bold'}}>{r.fecha}</Text> {" -> "}
            IMC: <Text style={{fontWeight: 'bold'}}>{r.imc}</Text> {" | "}
            Clasificación: <Text style={{fontStyle: 'italic'}}>{r.clasificacion}</Text>
          </Text>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50, backgroundColor: '#f9f9f9' },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 15, color: '#333' },
  subtitulo: { fontSize: 18, fontWeight: "bold", marginTop: 25, marginBottom: 10, color: '#555' },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  resultadoContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#e6f7ff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b3e0ff',
  },
  resultadoTitulo: { fontSize: 16, color: '#004085' },
  resultadoValor: { fontSize: 36, fontWeight: 'bold', color: '#004085', marginVertical: 5 },
  resultadoClasificacion: { fontSize: 18, fontStyle: 'italic', color: '#004085' },
  nota: { fontSize: 12, marginTop: 5, color: '#888' },
  registroItem: {
    fontSize: 14,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    color: '#333'
  }
});

export default CalculadoraIMC;