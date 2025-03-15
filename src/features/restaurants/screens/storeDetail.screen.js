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
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../components/data";

export const StoreDetailScreen = ({ navigation, route }) => {
    const { storeId } = route.params;

    //console.log("Received storeId: ", storeId);
    const [storeDetail, setStoreDetail] = useState(null);
    const db = getFirestore(app);

    useEffect(() => {
        async function fetchStore() {
            //console.log("Fetching store details for ID: ", storeId);
            const docRef = doc(db, "locations", storeId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                //console.log("Fetching store: ", docSnap.data());
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
            {/* Top Bar */}
            <View style={styles.topBar}>
                <Image
                    source={require("../../../../assets/urban-oasis-text-only.png")}
                    style={styles.logo}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.storeTitle}>{storeDetail.title || "Untitled Store"}</Text>

                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: storeDetail.image || "https://placehold.co/400" }}
                        style={styles.storeImage}
                    />
                </View>

                <View style={styles.content}>
                    <Text style={styles.type}>
                        {storeDetail.typeOfStore} • ⭐ {storeDetail.userRating}/5
                    </Text>
                    <Text style={styles.description}>
                        {storeDetail.description || "No description available."}
                    </Text>

                    <Text style={styles.sectionHeader}>📍 Address:</Text>
                    <Text style={styles.address}>{storeDetail.address}</Text>

                    {storeDetail.phoneNumber && (
                        <Text style={styles.infoText}>📞 Phone: {storeDetail.phoneNumber}</Text>
                    )}

                    {storeDetail.website && (
                        <TouchableOpacity onPress={() => Linking.openURL(storeDetail.website)}>
                            <Text style={styles.link}>🌐 Visit Website</Text>
                        </TouchableOpacity>
                    )}

                    {storeDetail.googleMapsLink && (
                        <TouchableOpacity
                            onPress={() => Linking.openURL(storeDetail.googleMapsLink)}>
                            <Text style={styles.link}>🗺️ View on Google Maps</Text>
                        </TouchableOpacity>
                    )}

                    <Text style={styles.sectionHeader}>🕒 Operating Hours:</Text>
                    {storeDetail.operatingHours && storeDetail.operatingHours.length > 0 ? (
                        storeDetail.operatingHours.map((hour, index) => (
                            <Text key={index} style={styles.operatingHours}>
                                {hour.day}: {hour.open} - {hour.close}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.operatingHours}>No operating hours available.</Text>
                    )}
                </View>
            </ScrollView>

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

            {/** Extra spacing for the store detail screen */}
            <View style={styles.bottomSpacing} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight || 20,
        backgroundColor: "#fff"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    storeTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#467e53",
        textAlign: "center",
        padding: 8
    },
    imageContainer: {
        alignItems: "center",
        padding: 8
    },
    storeImage: {
        width: 400,
        height: 225,
        borderRadius: 10
    },
    content: {
        padding: 16
    },
    type: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#467e53",
        textAlign: "center"
    },
    description: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 10
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#467e53",
        marginTop: 10
    },
    address: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5
    },
    infoText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5
    },
    link: {
        fontSize: 16,
        color: "#007AFF",
        textAlign: "center",
        marginTop: 5
    },
    operatingHours: {
        fontSize: 16,
        textAlign: "center",
        marginVertical: 2
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
        right: 0
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 60, //
        paddingVertical: 10,
        backgroundColor: "#7FA184",
        borderBottomWidth: 2,
        borderBottomColor: "#5E7147"
    },
    logo: {
        width: 150,
        height: 40,
        resizeMode: "contain",
        alignSelf: "center"
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 100
    },
    bottomSpacing: {
        height: 80
    }
});
