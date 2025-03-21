import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import StoreCard from "./storeCard";
import { getLocations } from "./data";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";
import { getDistance } from "geolib";

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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#467e53" />
            </View>
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
                        id={item.id} // ✅ Explicitly pass id
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
    }
});
