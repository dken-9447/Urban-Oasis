import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { LOCATIONS } from "../components/stores";
import StoreCard from "./storeCard";

export default function StoresList() {
    return (
        <FlatList
            data={LOCATIONS}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <StoreCard
                    image={item.image}
                    title={item.title}
                    address={item.address}
                    description={item.description || "No description available"}
                    typeOfStore={item.typeOfStore}
                    userRating={Number(item.userRating)}
                    website={item.website}
                    googleMapsLink={item.googleMapsLink}
                />
            )}
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
