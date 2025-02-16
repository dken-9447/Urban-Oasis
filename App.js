import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { HomeScreen } from "./src/features/restaurants/screens/home.screen";
import "./global.css";

export default function App() {
    return (
        <>
            {/*
             <FoodsScreen /> 
             */}
            <HomeScreen />
            <ExpoStatusBar style="auto" />
        </>
    );
}
