import React from "react";
import { Text, View } from "react-native";

const Greeting = ({ name }) => {
    return (
        <View>
            <Text testID="greeting-text">Hello, {name}!</Text>
        </View>
    );
};

export default Greeting;
