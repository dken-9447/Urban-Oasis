import * as React from "react";
import { FlatList, StyleSheet, View, Dimensions, ScrollView } from "react-native";
import StoreCard from "./storeCard";
import { getLocations } from "./data";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { getDistance } from "geolib";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";
import { type } from "@testing-library/react-native/build/user-event/type";
import "react-native-reanimated";
import "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;
const Spacer = ({ height = 16 }) => <View style={{ height }} />;

export default function StoresList({
    showOnlyOpen = false,
    filterType = null,
    userLocation = null,
    maxDistance = null
}) {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            let fetchedLocations = await getLocations();

            if (showOnlyOpen) {
                fetchedLocations = fetchedLocations.filter((store) => store.isOpen);
            }

            if (filterType) {
                fetchedLocations = fetchedLocations.filter(
                    (store) => store.typeOfStore === filterType
                );
            }

            if (userLocation && maxDistance !== null) {
                fetchedLocations = fetchedLocations.filter((store) => {
                    const dist = getDistance(userLocation, {
                        latitude: store.latitude,
                        longitude: store.longitude
                    });
                    return dist <= maxDistance;
                });
            }

            setLocations(fetchedLocations);
            setLoading(false);
        }

        fetchData();
    }, [showOnlyOpen, filterType, userLocation, maxDistance]);

    if (loading) {
        return (
            <ScrollView
                contentContainerStyle={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    paddingTop: 60,
                    paddingBottom: 100
                }}>
                {Array.from({ length: 4 }).map((_, index) => (
                    <MotiView
                        key={index}
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "timing", duration: 500 }}
                        style={styles.skeletonCard}>
                        {/* Image Placeholder */}
                        <Skeleton
                            colorMode="light"
                            width="100%"
                            height={180}
                            radius="lg"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />

                        <View style={{ padding: 16 }}>
                            {/* Title */}
                            <Skeleton
                                colorMode="light"
                                width={screenWidth * 0.6}
                                height={20}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={16} />

                            {/* Category */}
                            <Skeleton
                                colorMode="light"
                                width={screenWidth * 0.3}
                                height={16}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={20} />

                            {/* Description Line 1 */}
                            <Skeleton
                                colorMode="light"
                                width={screenWidth * 0.9}
                                height={14}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={14} />

                            {/* Description Line 2 */}
                            <Skeleton
                                colorMode="light"
                                width={screenWidth * 0.8}
                                height={14}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                        </View>
                    </MotiView>
                ))}
            </ScrollView>
        );
    }

    return (
        <FlatList
            data={locations}
            keyExtractor={(item) => item.id || Math.random().toString()}
            renderItem={({ item }) => {
                //console.log("🔹 Passing Store ID to StoreCard:", item.id);
                return (
                    <StoreCard
                        id={item.id}
                        image={item.image}
                        title={item.title}
                        address={item.address}
                        description={item.description}
                        typeOfStore={item.typeOfStore}
                        userRating={item.userRating}
                        website={item.website}
                        googleMapsLink={item.googleMapsLink}
                    />
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold"
    },
    address: {
        fontSize: 14,
        color: "#666"
    },
    skeletonCard: {
        width: screenWidth * 0.92,
        backgroundColor: "#dee2e6",
        borderRadius: 16,
        marginBottom: 24,
        alignSelf: "center",
        paddingBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3
    }
});
