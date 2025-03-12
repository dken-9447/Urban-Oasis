import * as React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native"; // ✅ Import StyleSheet
import { stores } from "../components/stores"; // Ensure correct path
import StoreCard from "./storeCard";

export default function StoresList() {
    return (
        <FlatList
            data={stores}
            keyExtractor={(stores) => stores.id}
            renderItem={({ item }) => <StoreCard {...item} />}
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
