import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Principal from "./src/views/Principal";
import Usuarios from "./src/views/Usuarios";
import Productos from "./src/views/Productos";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Principal">
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Usuarios" component={Usuarios} />
        <Stack.Screen name="Productos" component={Productos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}