import React from "react";
import { HomeScreen } from "./src/features/restaurants/screens/home.screen";
import { FoodsScreen } from "./src/features/restaurants/screens/foods.screens";
import { NavigationContainer } from "@react-navigation/native";
import "./global.css";
import "./gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Foods" component={FoodsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
