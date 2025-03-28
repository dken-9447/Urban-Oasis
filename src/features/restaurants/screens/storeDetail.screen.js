import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    Linking,
    StatusBar,
    Dimensions
} from "react-native";
import { IconButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../components/data";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

const screenWidth = Dimensions.get("window").width;
const Spacer = ({ height = 16 }) => <View style={{ height }} />;

export const StoreDetailScreen = ({ navigation, route }) => {
    const { storeId } = route.params;
    const [storeDetail, setStoreDetail] = useState(null);
    const db = getFirestore(app);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStore() {
            const docRef = doc(db, "locations", storeId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setStoreDetail({ id: docSnap.id, ...docSnap.data() });
                setTimeout(() => setLoading(false), 1000);
            } else {
                console.log("No store found for ID: ", storeId);
                setLoading(false);
            }
        }

        setLoading(true);
        fetchStore();
    }, [storeId, db]);

    if (loading || !storeDetail) {
        return (
            <ScrollView
                contentContainerStyle={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    paddingTop: 60,
                    paddingBottom: 240,
                    backgroundColor: "#ffffff"
                }}>
                <MotiView
                    from={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "timing", duration: 500 }}
                    style={styles.skeletonCard}>
                    {/* Store Image Placeholder */}
                    <Skeleton
                        colorMode="light"
                        width="100%"
                        height={180}
                        radius="lg"
                        boneColor="#dee2e6"
                        highlightColor="#f7f7f7"
                    />

                    <View style={{ padding: 16 }}>
                        {/* Store Title */}
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.6}
                            height={20}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={16} />

                        {/* Store Category */}
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.3}
                            height={16}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={20} />

                        {/* Description Lines */}
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.9}
                            height={14}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={14} />
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.8}
                            height={14}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={24} />

                        {/* Address Header + Line */}
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.4}
                            height={16}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={16} />
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.7}
                            height={14}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={14} />

                        {/* Phone Number */}
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.5}
                            height={14}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={24} />

                        {/* Website */}
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.5}
                            height={14}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={14} />

                        {/* Google Maps Link */}
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.6}
                            height={14}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={24} />

                        {/* Operating Hours Header */}
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.6}
                            height={16}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={14} />

                        {/* Operating Hours Lines (5x) */}
                        {Array.from({ length: 5 }).map((_, index) => (
                            <React.Fragment key={index}>
                                <Skeleton
                                    colorMode="light"
                                    width={screenWidth * (0.5 + Math.random() * 0.4)}
                                    height={14}
                                    radius="round"
                                    boneColor="#dee2e6"
                                    highlightColor="#f7f7f7"
                                />
                                <Spacer height={12} />
                            </React.Fragment>
                        ))}

                        {/* Optional: Store Tags or Amenities */}
                        <Spacer height={20} />
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.4}
                            height={16}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                        <Spacer height={14} />
                        <Skeleton
                            colorMode="light"
                            width={screenWidth * 0.65}
                            height={14}
                            radius="round"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />
                    </View>
                </MotiView>
            </ScrollView>
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

                        {/* Address Section */}
                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionHeader}>Address:</Text>
                            <View style={styles.iconRow}>
                                <MaterialCommunityIcons
                                    name="map-marker"
                                    size={20}
                                    color="#705E4E"
                                />
                                <Text style={styles.directionsText}>{storeDetail.address}</Text>
                            </View>

                            {storeDetail.phoneNumber && (
                                <View style={styles.iconRow}>
                                    <MaterialCommunityIcons
                                        name="phone"
                                        size={20}
                                        color="#705E4E"
                                    />
                                    <Text style={styles.directionsText}>
                                        {storeDetail.phoneNumber}
                                    </Text>
                                </View>
                            )}

                            {storeDetail.website && (
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(storeDetail.website)}>
                                    <View style={styles.iconRow}>
                                        <MaterialCommunityIcons
                                            name="web"
                                            size={20}
                                            color="#705E4E"
                                        />
                                        <Text style={styles.link}>Visit Website</Text>
                                    </View>
                                </TouchableOpacity>
                            )}

                            {storeDetail.googleMapsLink && (
                                <TouchableOpacity
                                    onPress={() => Linking.openURL(storeDetail.googleMapsLink)}>
                                    <View style={styles.iconRow}>
                                        <MaterialCommunityIcons
                                            name="map-outline"
                                            size={20}
                                            color="#705E4E"
                                        />
                                        <Text style={styles.link}>View on Google Maps</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Operating Hours Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.iconRowCentered}>
                                <MaterialCommunityIcons
                                    name="clock-outline"
                                    size={20}
                                    color="#705E4E"
                                />
                                <Text style={styles.sectionHeader}>Operating Hours:</Text>
                            </View>
                            {storeDetail.operatingHours?.length > 0 ? (
                                storeDetail.operatingHours.map((hour, index) => (
                                    <Text key={index} style={styles.operatingText}>
                                        {hour.day}: {hour.open} - {hour.close}
                                    </Text>
                                ))
                            ) : (
                                <Text style={styles.operatingText}>
                                    No operating hours available.
                                </Text>
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
    skeletonCard: {
        width: screenWidth * 0.92,
        backgroundColor: "#dee2e6",
        borderRadius: 16,
        marginTop: 60,
        marginBottom: 24,
        alignSelf: "center",
        padding: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3,
        overflow: "hidden"
    }
});
