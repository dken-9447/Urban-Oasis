import React, { useState } from "react";
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    View,
    Keyboard,
    Pressable,
    Text
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { Image } from "react-native";
import { useColorScheme } from "nativewind";
import StoresList from "../components/storeList";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const StoreListScreen = ({ navigation }) => {
    const { colorScheme, toggleColorScheme } = useColorScheme();

    return (
        <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                {/* Top Navigation Bar */}
                <View style={styles.topBar}>
                    <Image
                        source={require("../../../../assets/urban-oasis-text-only.png")}
                        style={styles.logo}
                    />
                </View>

                {/* Search and Filter Row */}
                <View style={styles.searchRow}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder="Search grocery stores"
                            placeholderTextColor="#A7A7A7"
                            mode="flat"
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            keyboardType="default"
                            cursorColor="#A7A7A7"
                            style={styles.recipeSearch}
                            editable={true}
                        />
                        <IconButton
                            icon="magnify"
                            size={25}
                            iconColor="#A7A7A7"
                            onPress={() => console.log("Store-search pressed")}
                        />
                    </View>
                    <View style={styles.filterButton}>
                        <IconButton
                            icon="filter-variant"
                            size={45}
                            iconColor="#7FA184"
                            onPress={() => console.log("Store-filter pressed")}
                        />
                    </View>
                </View>

                {/* Header */}
                <View style={styles.headerRow}>
                    <MaterialCommunityIcons
                        name="basket"
                        size={26}
                        color="#705E4E"
                        style={{ marginRight: 8 }}
                    />
                    <Text style={styles.headerText}>Grocery Stores</Text>
                </View>

                {/* Main list of stores */}
                <View className="flex-1 items-center justify-center">
                    <StoresList />
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
        </Pressable>
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
    searchRow: {
        flexDirection: "row",
        marginBottom: 20,
        paddingHorizontal: 16,
        marginTop: 16
    },
    searchContainer: {
        flexDirection: "row",
        flex: 3,
        borderWidth: 2,
        borderColor: "#A7A7A7",
        backgroundColor: "#FFFFFF",
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10
    },
    filterButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    recipeSearch: {
        flex: 1,
        backgroundColor: "transparent",
        color: "#A7A7A7",
        fontSize: 14
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 12
    },
    headerText: {
        fontSize: 24,
        fontFamily: "serif",
        fontWeight: "bold",
        color: "#705E4E"
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
    }
});
