import * as React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import StoreCard from "./storeCard";
import { getLocations } from "./data";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native-paper";

export default function StoresList() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const fetchedLocations = await getLocations();
            //console.log("🛠 Fetched Locations:", fetchedLocations);
            setLocations(fetchedLocations);
            setLoading(false);
        }

        fetchData();
    }, []);

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
