import React from "react";
import { HomeScreen } from "./src/features/restaurants/screens/home.screen";
import { RecipeListScreen } from "./src/features/restaurants/screens/recipeList.screen";
import { RecipeDetailScreen } from "./src/features/restaurants/screens/recipeDetail.screen";
import { NavigationContainer } from "@react-navigation/native";
import { MapScreen } from "./src/features/restaurants/screens/map.screen";
import "./global.css";
import "./gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="RecipeList" component={RecipeListScreen} />
                <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
                <Stack.Screen name="Maps" component={MapScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
