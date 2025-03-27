import React, { useState } from "react";
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Keyboard,
    Pressable,
    Alert,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { Image } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_PLACES_API_KEY } from "@env";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getCenter } from "geolib";

const API_KEY = GOOGLE_PLACES_API_KEY;

export const HomeScreen = () => {
    const [address, setAddress] = useState("");
    const navigation = useNavigation();

    // Fetch latitude & longitude from Google Maps Geocoding API
    const fetchCoordinatesFromAddress = async (searchQuery) => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchQuery)}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            //console.log("Geocode API Response:", data);

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
            //console.error("Error fetching coordinates:", error);
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
        <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollContainer}
                enableOnAndroid
                keyboardShouldPersistTaps="handled"
                extraHeight={100}>
                <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
                    {/* Top Navigation Bar */}
                    <View style={styles.topBar}>
                        <Image
                            source={require("../../../../assets/urban-oasis-text-only.png")}
                            style={styles.logo}
                        />
                    </View>
                    {/* Logo and Description */}
                    <View style={styles.content}>
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
                        <View
                            className="flex-row items-center mt-6 w-3/4 bg-[#EDD2BD] rounded-full px-4 py-2"
                            style={{
                                borderWidth: 2,
                                borderColor: "#B99772",
                                shadowColor: "#000",
                                shadowOffset: { width: 0, height: 3 },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                elevation: 4
                            }}>
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
                                size={30}
                                iconColor="white"
                                style={{
                                    backgroundColor: "#7FA184",
                                    borderRadius: 20,
                                    borderWidth: 2,
                                    borderColor: "#3B5C49",
                                    padding: 2
                                }}
                                onPress={handleSearch}
                            />
                        </View>
                    </View>
                </Pressable>
            </KeyboardAwareScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomBar}>
                <IconButton
                    icon="basket-outline"
                    size={45}
                    iconColor="white"
                    onPress={() => navigation.navigate("StoresListScreen")}
                />
                <IconButton
                    icon="home-outline"
                    size={45}
                    iconColor="#BCEDC3"
                    onPress={() => navigation.navigate("Home")}
                />
                <IconButton
                    icon="silverware-fork-knife"
                    size={45}
                    iconColor="white"
                    onPress={() => navigation.navigate("RecipeList")}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    content: {
        flexGrow: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 200
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 30
    },
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        backgroundColor: "#7FA184",
        borderBottomWidth: 2,
        borderBottomColor: "#5E7147"
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
        paddingVertical: 0,
        backgroundColor: "#7FA184",
        borderTopColor: "#5E7147",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    }
});
