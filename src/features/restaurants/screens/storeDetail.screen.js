import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Linking,
    StatusBar
} from "react-native";
import { IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../components/data";

export const StoreDetailScreen = ({ navigation, route }) => {
    const { storeId } = route.params;
    const [storeDetail, setStoreDetail] = useState(null);
    const db = getFirestore(app);

    useEffect(() => {
        async function fetchStore() {
            const docRef = doc(db, "locations", storeId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setStoreDetail({ id: docSnap.id, ...docSnap.data() });
            } else {
                console.log("No store found for ID: ", storeId);
            }
        }
        fetchStore();
    }, [storeId, db]);

    if (!storeDetail) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#467e53" />
                    <Text>Loading store details...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Navigation */}
            <View style={styles.topBar}>
                <Image
                    source={require("../../../../assets/urban-oasis-text-only.png")}
                    style={styles.logo}
                />
            </View>

            {/* Main Content */}
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                    <Text style={styles.recipeTitle}>{storeDetail.title || "Untitled Store"}</Text>

                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: storeDetail.image || "https://placehold.co/400" }}
                            style={styles.recipeDetailImage}
                        />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.categoryRating}>
                            {storeDetail.typeOfStore} • ⭐ {storeDetail.userRating}/5
                        </Text>

                        <Text style={styles.summary}>
                            {storeDetail.description || "No description available."}
                        </Text>

                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionHeader}>Address:</Text>
                            <View style={styles.iconRow}>
                                <MaterialCommunityIcons name="map-marker" size={20} color="#705E4E" />
                                <Text style={styles.directionsText}>{storeDetail.address}</Text>
                            </View>

                            {storeDetail.phoneNumber && (
                                <View style={styles.iconRow}>
                                    <MaterialCommunityIcons name="phone" size={20} color="#705E4E" />
                                    <Text style={styles.directionsText}>{storeDetail.phoneNumber}</Text>
                                </View>
                            )}

                            {storeDetail.website && (
                                <TouchableOpacity onPress={() => Linking.openURL(storeDetail.website)}>
                                    <View style={styles.iconRow}>
                                        <MaterialCommunityIcons name="web" size={20} color="#705E4E" />
                                        <Text style={styles.link}>Visit Website</Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            {storeDetail.googleMapsLink && (
                                <TouchableOpacity onPress={() => Linking.openURL(storeDetail.googleMapsLink)}>
                                    <View style={styles.iconRow}>
                                        <MaterialCommunityIcons name="map-outline" size={20} color="#705E4E" />
                                        <Text style={styles.link}>View on Google Maps</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.sectionContainer}>
                            <View style={styles.iconRowCentered}>
                                <MaterialCommunityIcons name="clock-outline" size={20} color="#705E4E" />
                                <Text style={styles.sectionHeader}>Operating Hours:</Text>
                            </View>
                            {storeDetail.operatingHours && storeDetail.operatingHours.length > 0 ? (
                                storeDetail.operatingHours.map((hour, index) => (
                                    <Text key={index} style={styles.operatingText}>
                                        {hour.day}: {hour.open} - {hour.close}
                                    </Text>
                                ))
                            ) : (
                                <Text style={styles.operatingText}>No operating hours available.</Text>
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomBar}>
                <IconButton
                    icon="basket-outline"
                    size={45}
                    iconColor="#BCEDC3"
                    onPress={() => navigation.navigate("StoresListScreen")}
                />
                <IconButton
                    icon="home-outline"
                    size={45}
                    iconColor="white"
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
    recipeTitle: {
        borderBottomWidth: 1,
        borderColor: "#BFBFBF",
        fontWeight: "bold",
        color: "#705E4E",
        fontFamily: "serif",
        fontSize: 22,
        paddingVertical: 10,
        textAlign: "center"
    },
    imageContainer: {
        backgroundColor: "transparent",
        alignItems: "center",
        paddingVertical: 8
    },
    iconRowCentered: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 6,
        gap: 6
    },
    operatingText: {
        color: "#705E4E",
        fontFamily: "serif",
        fontSize: 16,
        marginBottom: 6,
        textAlign: "center"
    },    
    recipeDetailImage: {
        width: 400,
        height: 225,
        borderRadius: 10
    },
    content: {
        padding: 16
    },
    categoryRating: {
        borderBottomWidth: 1,
        borderColor: "#BFBFBF",
        color: "#705E4E",
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 10
    },
    summary: {
        borderBottomWidth: 1,
        borderColor: "#BFBFBF",
        paddingVertical: 10,
        color: "#705E4E",
        fontFamily: "serif",
        fontSize: 16,
        textAlign: "center"
    },
    sectionContainer: {
        borderBottomWidth: 1,
        borderColor: "#BFBFBF",
        paddingBottom: 10,
        marginVertical: 10,
        width: "100%",
        alignSelf: "center"
    },
    sectionHeader: {
        color: "#705E4E",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
        paddingHorizontal: 4
    },
    directionsText: {
        color: "#705E4E",
        fontFamily: "serif",
        fontSize: 16,
        marginBottom: 6,
        paddingLeft: 8
    },
    link: {
        fontSize: 16,
        color: "#1E90FF",
        fontFamily: "serif",
        marginLeft: 8,
        marginBottom: 6
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
        paddingLeft: 16
    },
    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#7FA184",
        borderTopColor: "#5E7147",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});