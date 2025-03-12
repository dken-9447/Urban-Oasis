import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Alert, StatusBar, SafeAreaView } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Constants from "expo-constants";
import { IconButton } from "react-native-paper";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GOOGLE_PLACES_API_KEY } from "@env";

const API_KEY = GOOGLE_PLACES_API_KEY;

export const MapScreen = ({ route }) => {
    const navigation = useNavigation();
    const coordinates = route.params?.coordinates || null;
    const [region, setRegion] = useState(null);
    const [foodStores, setFoodStores] = useState([]);
    const [address, setAddress] = useState("");

    useEffect(() => {
        console.log("Received coordinates:", coordinates);

        if (coordinates && coordinates.latitude && coordinates.longitude) {
            setRegion({
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05
            });

            fetchNearbyFoodStores(coordinates.latitude, coordinates.longitude);
        } else {
            console.log("Invalid coordinates received.");
            Alert.alert("Error", "Invalid coordinates received.");
        }
    }, [coordinates]);

    const fetchNearbyFoodStores = async (lat, lon) => {
        const radius = 5000;
        const type = "grocery_or_supermarket";

        try {
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=${type}&key=${API_KEY}`;

            console.log("Fetching places from:", url);

            const response = await fetch(url);
            const data = await response.json();

            console.log("Places API Response:", data);

            if (data.results) {
                setFoodStores(data.results);
            } else {
                console.log("No results found:", data);
            }
        } catch (error) {
            console.error("Google Places API Error:", error);
            Alert.alert("Error", "Failed to fetch nearby stores.");
        }
    };

    const getCurrentLocation = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Please enable location services.");
                return null;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log("User's Location:", location);

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

    const handleSearch = async () => {
        let coordinates;

        if (address.trim() === "") {
            coordinates = await getCurrentLocation();
        } else {
            // Placeholder coordinates (Orlando, FL)
            coordinates = { latitude: 28.5384, longitude: -81.3789 };
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
            {/* Top Navigation Bar */}
            <View style={styles.topBar}>
                <Image
                    source={require("../../../../assets/urban-oasis-text-only.png")}
                    style={styles.logo}
                />
            </View>

            {/* Map Section */}
            <View style={styles.mapContainer}>
                {region ? (
                    <MapView style={styles.map} region={region}>
                        <Marker
                            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                            title="Your Location"
                        />
                        {foodStores.map(
                            (store, index) =>
                                store.geometry?.location?.lat &&
                                store.geometry?.location?.lng && (
                                    <Marker
                                        key={index}
                                        coordinate={{
                                            latitude: store.geometry.location.lat,
                                            longitude: store.geometry.location.lng
                                        }}
                                        title={store.name}
                                        description={store.vicinity}
                                    />
                                )
                        )}
                    </MapView>
                ) : (
                    <Text style={styles.loadingText}>Loading Map...</Text>
                )}
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomBar}>
                <IconButton
                    icon="basket-outline"
                    size={28}
                    iconColor="white"
                    onPress={() => navigation.navigate("StoresListScreen")}
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
    mapContainer: {
        flex: 1,
        marginTop: 0,
        marginBottom: 60
    },
    map: {
        width: "100%",
        height: "100%"
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
    },
    loadingText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 18
    }
});
