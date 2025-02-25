import React from "react";
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform
} from "react-native";
import { Image } from "react-native";
import { IconButton } from "react-native-paper";
import { useState } from "react";

export const FoodsScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <View className="absolute top-0 left-0 right-0 flex-row items-center justify-between py-4 px-6 bg-[#467e53]">
                {/* Hamburger Menu Icon */}
                <IconButton
                    icon="menu"
                    size={24}
                    onPress={() =>
                        console.log("Hamburger Menu has been pressed // Used for debugging")
                    }
                    className="text-white ml-auto"
                    iconColor="white"
                />

                {/* Urban Oasis Text Image */}
                <Image
                    source={require("../../../../assets/urban-oasis-text-only.png")}
                    style={{
                        width: 150,
                        height: 40,
                        resizeMode: "contain",
                        position: "absolute",
                        left: "55%",
                        transform: [{ translateX: -75 }]
                    }}
                />

                {/* Magnifying glass icon */}
                <IconButton
                    icon="magnify"
                    size={24}
                    onPress={() =>
                        console.log("Magnifying button has been pressed // Used for debugging")
                    }
                    className="text-white ml-auto"
                    iconColor="white"
                />
            </View>

            {/* Bottom Navigation */}
            <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between bg-[#467e53] py-4 px-12">
                <IconButton
                    icon="basket-outline"
                    size={28}
                    onPress={() => console.log("Basket-outline has been pressed")}
                    iconColor="white"
                />
                <IconButton
                    icon="home-outline"
                    size={28}
                    onPress={() => navigation.navigate("Home")}
                    iconColor="white"
                />
                <IconButton
                    icon="silverware-fork-knife"
                    size={28}
                    onPress={() => navigation.navigate("Foods")}
                    iconColor="white"
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flexGrow: 0.25, marginTop: StatusBar.currentHeight },
    search: { padding: 16, backgroundColor: "white" },
    list: { flex: 1, padding: 16, backgroundColor: "green" },
    bottomnNav: { flexGrow: 1, padding: 16, backgroundColor: "white" }
});
