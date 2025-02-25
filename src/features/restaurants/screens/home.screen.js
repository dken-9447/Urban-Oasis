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
import { Searchbar, TextInput } from "react-native-paper";
import { Card, Paragraph, Title } from "react-native-paper";
import { colors } from "../../../theme";
import { Image } from "react-native";
import { IconButton } from "react-native-paper";
import { useState } from "react";

export const HomeScreen = ({ navigation }) => {
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

            {/* Urban Oasis Official Image */}
            <View className="flex-1 justify-center items-center">
                <Image
                    source={require("../../../../assets/urban-oasis-transparent-bg.png")}
                    className="w-40 h-40"
                    resizeMode="contain"
                />

                {/* Welcome Text for the Home Screen */}
                <Text className="text-center text-2xl font-bold text-gray-800 mt-6">
                    Welcome to the fresh side of life!
                </Text>

                {/* Description Text for Home Screen */}
                <Text className="text-center text-base text-gray-700 mt-2 px-4">
                    Find fresh produce nearby, explore budget-friendly recipes, and discover where
                    to buy ingredients. Just enter your address!
                </Text>

                {/* Search Bar */}
                <View className="flex-row items-center mt-6 w-3/4 bg-[#EDD2BD] rounded-full px-4 py-2">
                    <TextInput
                        placeholder="Email Address"
                        placeholderTextColor="#8b6f47"
                        mode="flat"
                        underlineColor="transparent"
                        activeUnderlineColor="transparent"
                        value={email}
                        onChangeText={setEmail}
                        style={{
                            flex: 1,
                            backgroundColor: "#EDD2BD",
                            color: "white",
                            fontSize: 16,
                            borderWidth: 0
                        }}
                    />
                    <IconButton
                        icon="magnify"
                        size={24}
                        iconColor="white"
                        style={{ backgroundColor: "#467e53", borderRadius: 20 }}
                        onPress={() => console.log("SearchBar icon pressed")}
                    />
                </View>
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
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    }
});
