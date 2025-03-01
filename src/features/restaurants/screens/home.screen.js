import React, { useState } from "react";
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Keyboard,
    Pressable,
    Alert
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { Image } from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

export const HomeScreen = () => {
    const [address, setAddress] = useState("");
    const navigation = useNavigation();

    // Fetch latitude & longitude from Google Maps Geocoding API
    const fetchCoordinatesFromAddress = async (searchQuery) => {
        const API_KEY = Constants.expoConfig.extra.googlePlacesApiKey;
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchQuery)}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("Geocode API Response:", data);

            if (data.results.length > 0) {
                const location = data.results[0].geometry.location;
                return {
                    latitude: location.lat,
                    longitude: location.lng
                };
            } else {
                Alert.alert("Error", "No location found. Please enter a valid address.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
            Alert.alert("Error", "Could not get location.");
            return null;
        }
    };

    // Get the user's current location if no input is provided
    const getCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Please enable location permissions.");
                return null;
            }

            let location = await Location.getCurrentPositionAsync({});
            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            };
        } catch (error) {
            console.error("Error getting location:", error);
            Alert.alert("Error", "Could not get your location.");
            return null;
        }
    };

    // Handle search button clicks
    const handleSearch = async () => {
        let coordinates;

        if (address.trim() === "") {
            coordinates = await getCurrentLocation();
        } else {
            coordinates = await fetchCoordinatesFromAddress(address);
        }

        if (coordinates) {
            console.log("Navigating to MapScreen with:", coordinates);
            navigation.navigate("Maps", { coordinates });
        } else {
            Alert.alert("Error", "Could not retrieve location.");
        }
    };

    return (
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                {/* Top Navigation Bar */}
                <View style={styles.topBar}>
                    <Image
                        source={require("../../../../assets/urban-oasis-text-only.png")}
                        style={styles.logo}
                    />
                </View>

                {/* Logo and Description */}
                <View className="flex-1 justify-center items-center">
                    <Image
                        source={require("../../../../assets/urban-oasis-transparent-bg.png")}
                        className="w-40 h-40"
                        resizeMode="contain"
                    />
                    <Text className="text-center text-2xl font-bold text-gray-800 mt-6">
                        Welcome to the fresh side of life!
                    </Text>
                    <Text className="text-center text-base text-gray-700 mt-2 px-4">
                        Find fresh produce nearby, explore budget-friendly recipes, and discover
                        where to buy ingredients. Just enter your address!
                    </Text>

                    {/* Search Bar */}
                    <View className="flex-row items-center mt-6 w-3/4 bg-[#EDD2BD] rounded-full px-4 py-2">
                        <TextInput
                            placeholder="Enter current address"
                            placeholderTextColor="#8b6f47"
                            mode="flat"
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            theme={{ colors: { primary: "#467e53", text: "black" } }}
                            value={address}
                            onChangeText={setAddress}
                            keyboardType="default"
                            cursorColor="black"
                            style={{
                                flex: 1,
                                backgroundColor: "transparent",
                                color: "black",
                                fontSize: 16
                            }}
                            editable={true}
                        />
                        <IconButton
                            icon="magnify"
                            size={24}
                            iconColor="white"
                            style={{ backgroundColor: "#467e53", borderRadius: 20 }}
                            onPress={handleSearch}
                        />
                    </View>
                </View>

                {/* Bottom Navigation */}
                <View style={styles.bottomBar}>
                    <IconButton
                        icon="basket-outline"
                        size={28}
                        iconColor="white"
                        onPress={() => console.log("Basket-outline pressed")}
                    />
                    <IconButton
                        icon="home-outline"
                        size={28}
                        iconColor="white"
                        onPress={() => navigation.navigate("Home")}
                    />
                    <IconButton
                        icon="silverware-fork-knife"
                        size={28}
                        iconColor="white"
                        onPress={() => navigation.navigate("Foods")}
                    />
                </View>
            </SafeAreaView>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#467e53"
    },
    logo: {
        width: 150,
        height: 40,
        resizeMode: "contain"
    },
    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 12,
        backgroundColor: "#467e53",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    }
});
