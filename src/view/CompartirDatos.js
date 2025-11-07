
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native";
import { db } from "../database/firebaseConfig.js";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";

import * as FileSystem from "expo-file-system/legacy";
import * as Sharing from "expo-sharing";
import * as Clipboard from "expo-clipboard";

export default function CompartirDatos() {
    const [productos, setProductos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [promedio, setPromedio] = useState(null);
    const [ciudades, setCiudades] = useState([]);
    // Nombres de las colecciones en Firestore
    const colecciones = [
        "productos",
        "usuarios",
        "ciudades",
        "clientes",
        "promedio",
    ];

    const cargarDatos = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "productos"));
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProductos(data);
        } catch (error) {
            console.error("Error al obtener documentos:", error);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatosFirebase = async (nombreColeccion) => {
        if (!nombreColeccion || typeof nombreColeccion !== 'string') {
            console.error("Error: Se requiere un nombre de colección válido.");
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


    const exportarDatosProductos = async () => {
        try {
            // Cargar los datos
            const datos = await cargarDatosFirebase("productos");
            console.log("Datos cargados:", datos);

            // Formatear los datos para el archivo y el portapapeles
            const jsonString = JSON.stringify(datos, null, 2);
            const baseFileName = "datos_firebase.txt";

            // Copiar datos al portapapeles
            await Clipboard.setStringAsync(jsonString);
            console.log("¡Datos (JSON) copiados al portapapeles!");

            // Verificar si la función de compartir está disponible
            if (!(await Sharing.isAvailableAsync())) {
                alert("La función Compartir/Guardar no está disponible en tu dispositivo");
                return;
            }

            // Guardar el archivo temporalmente
            const fileUri = FileSystem.cacheDirectory + baseFileName;

            // Escribir el contenido JSON en el caché temporal
            await FileSystem.writeAsStringAsync(fileUri, jsonString);

            // Abrir el diálogo de compartir
            await Sharing.shareAsync(fileUri, {
                mimeType: 'text/plain',
                dialogTitle: 'Compartir datos de Firebase (JSON)',
            });

            alert("Datos copiados al portapapeles y listos para compartir.");
        } catch (error) {
            console.error("Error al exportar y compartir:", error);
            alert("Error al exportar o compartir: " + error.message);
        }
    };

    const exportarDatosUsuario = async () => {
        try {
            // Cargar los datos
            const datosUsuario = await cargarDatosFirebase("usuarios");
            console.log("Datos cargados:", datosUsuario);

            // Formatear los datos para el archivo y el portapapeles
            const jsonString = JSON.stringify(datosUsuario, null, 2);
            const baseFileName = "datos_firebase.txt";

            // Copiar datos al portapapeles
            await Clipboard.setStringAsync(jsonString);
            console.log("¡Datos (JSON) copiados al portapapeles!");

            // Verificar si la función de compartir está disponible
            if (!(await Sharing.isAvailableAsync())) {
                alert("La función Compartir/Guardar no está disponible en tu dispositivo");
                return;
            }

            // Guardar el archivo temporalmente
            const fileUri = FileSystem.cacheDirectory + baseFileName;

            // Escribir el contenido JSON en el caché temporal
            await FileSystem.writeAsStringAsync(fileUri, jsonString);

            // Abrir el diálogo de compartir
            await Sharing.shareAsync(fileUri, {
                mimeType: 'text/plain',
                dialogTitle: 'Compartir datos de Firebase (JSON)',
            });

            alert("Datos copiados al portapapeles y listos para compartir.");
        } catch (error) {
            console.error("Error al exportar y compartir:", error);
            alert("Error al exportar o compartir: " + error.message);
        }
    };

    const exportarDatosCiudades = async () => {
        try {
            // Cargar los datos
            const datosCiudades = await cargarDatosFirebase("ciudades");
            console.log("Datos cargados:", datosCiudades);

            // Formatear los datos para el archivo y el portapapeles
            const jsonString = JSON.stringify(datosCiudades, null, 2);
            const baseFileName = "datos_firebase.txt";

            // Copiar datos al portapapeles
            await Clipboard.setStringAsync(jsonString);
            console.log("¡Datos (JSON) copiados al portapapeles!");

            // Verificar si la función de compartir está disponible
            if (!(await Sharing.isAvailableAsync())) {
                alert("La función Compartir/Guardar no está disponible en tu dispositivo");
                return;
            }

            // Guardar el archivo temporalmente
            const fileUri = FileSystem.cacheDirectory + baseFileName;

            // Escribir el contenido JSON en el caché temporal
            await FileSystem.writeAsStringAsync(fileUri, jsonString);

            // Abrir el diálogo de compartir
            await Sharing.shareAsync(fileUri, {
                mimeType: 'text/plain',
                dialogTitle: 'Compartir datos de Firebase (JSON)',
            });

            alert("Datos copiados al portapapeles y listos para compartir.");
        } catch (error) {
            console.error("Error al exportar y compartir:", error);
            alert("Error al exportar o compartir: " + error.message);
        }
    };

    const exportarDatosClientes = async () => {
        try {
            // Cargar los datos
            const datosClientes = await cargarDatosFirebase("clientes");
            console.log("Datos cargados:", datosClientes);

            // Formatear los datos para el archivo y el portapapeles
            const jsonString = JSON.stringify(datosClientes, null, 2);
            const baseFileName = "datos_firebase.txt";

            // Copiar datos al portapapeles
            await Clipboard.setStringAsync(jsonString);
            console.log("¡Datos (JSON) copiados al portapapeles!");

            // Verificar si la función de compartir está disponible
            if (!(await Sharing.isAvailableAsync())) {
                alert("La función Compartir/Guardar no está disponible en tu dispositivo");
                return;
            }

            // Guardar el archivo temporalmente
            const fileUri = FileSystem.cacheDirectory + baseFileName;

            // Escribir el contenido JSON en el caché temporal
            await FileSystem.writeAsStringAsync(fileUri, jsonString);

            // Abrir el diálogo de compartir
            await Sharing.shareAsync(fileUri, {
                mimeType: 'text/plain',
                dialogTitle: 'Compartir datos de Firebase (JSON)',
            });

            alert("Datos copiados al portapapeles y listos para compartir.");
        } catch (error) {
            console.error("Error al exportar y compartir:", error);
            alert("Error al exportar o compartir: " + error.message);
        }
    };

    const exportarDatosPromedio = async () => {
        try {
            // Cargar los datos
            const datosPromedio = await cargarDatosFirebase("promedio");
            console.log("Datos cargados:", datosPromedio);

            // Formatear los datos para el archivo y el portapapeles
            const jsonString = JSON.stringify(datosPromedio, null, 2);
            const baseFileName = "datos_firebase.txt";

            // Copiar datos al portapapeles
            await Clipboard.setStringAsync(jsonString);
            console.log("¡Datos (JSON) copiados al portapapeles!");

            // Verificar si la función de compartir está disponible
            if (!(await Sharing.isAvailableAsync())) {
                alert("La función Compartir/Guardar no está disponible en tu dispositivo");
                return;
            }

            // Guardar el archivo temporalmente
            const fileUri = FileSystem.cacheDirectory + baseFileName;

            // Escribir el contenido JSON en el caché temporal
            await FileSystem.writeAsStringAsync(fileUri, jsonString);

            // Abrir el diálogo de compartir
            await Sharing.shareAsync(fileUri, {
                mimeType: 'text/plain',
                dialogTitle: 'Compartir datos de Firebase (JSON)',
            });

            alert("Datos copiados al portapapeles y listos para compartir.");
        } catch (error) {
            console.error("Error al exportar y compartir:", error);
            alert("Error al exportar o compartir: " + error.message);
        }
    };

     const cargarTodosDatosFirebase = async () => {
  try {
    const datosExportados = {};
        for (const col of colecciones) {
            const snapshot = await getDocs(collection(db, col));

            datosExportados[col] = snapshot.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            }));
        }

        return datosExportados;
  } catch (error) {
    console.error('Error extrayendo datos:', error);
  }
};
// Helper para copiar/guardar/compartir JSON
const compartirJson = async (objetoDatos, nombreArchivo = "datos_firebase.json") => {
    try {
        const jsonString = JSON.stringify(objetoDatos, null, 2);

        // Copiar al portapapeles
        await Clipboard.setStringAsync(jsonString);

        // Verificar disponibilidad de compartir
        if (!(await Sharing.isAvailableAsync())) {
            alert("La función Compartir/Guardar no está disponible en tu dispositivo");
            return;
        }

        const fileUri = FileSystem.cacheDirectory + nombreArchivo;
        await FileSystem.writeAsStringAsync(fileUri, jsonString);
        await Sharing.shareAsync(fileUri, {
            mimeType: 'application/json',
            dialogTitle: 'Compartir datos de Firebase (JSON)',
        });

        alert("Datos copiados al portapapeles y listos para compartir.");
    } catch (error) {
        console.error('Error al compartir JSON:', error);
        alert('Error al compartir datos: ' + (error.message || error));
    }
};

const exportarTodosDatos = async () => {
    try {
        const todos = await cargarTodosDatosFirebase();
        console.log('Todos los datos cargados:', todos);
        await compartirJson(todos, 'todos_datos_firebase.json');
    } catch (error) {
        console.error('Error exportando todos los datos:', error);
        alert('Error exportando todos los datos: ' + (error.message || error));
    }
};
    return (
        <View >
            <View style={{ marginTop: 100, marginVertical: 10, padding: 10, margin: 10 }}>
                <Button style={{ margin: 10, }} title="Exportar productos" onPress={exportarDatosProductos} />
            </View>
            <View style={{ marginVertical: 10, padding: 10, margin: 10 }}>
                <Button title="Exportar usuarios" onPress={exportarDatosUsuario} />
            </View>
            <View style={{ marginVertical: 10, padding: 10, margin: 10 }}>
                <Button title="Exportar ciudades" onPress={exportarDatosCiudades} />
            </View>
            <View style={{ marginVertical: 10, padding: 10, margin: 10 }}>
                <Button title="Exportar clientes" onPress={exportarDatosClientes} />
            </View>

             <View style={{ marginVertical: 10, padding: 10, margin: 10 }}>
                <Button title="Exportar edades" onPress={exportarDatosPromedio} />
            </View>
            <View style={{ marginVertical: 10, padding: 10, margin: 10 }}>
                <Button title="Exportar todos los datos" onPress={exportarTodosDatos} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})