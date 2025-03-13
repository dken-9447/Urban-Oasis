import React, { useState } from "react";
import { StatusBar, SafeAreaView, StyleSheet, View, Keyboard, Pressable } from "react-native";
import { TextInput, IconButton, Switch } from "react-native-paper";
import { Image } from "react-native";
import { useColorScheme } from "nativewind";
import StoresList from "../components/storeList";

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

                <View
                    className="flex-row items-center mt-3 mb-3 w-full px-4"
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between"
                    }}>
                    {/* Search Box */}
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            flex: 1,
                            borderColor: "black",
                            borderWidth: 0.25,
                            borderRadius: 25,
                            paddingHorizontal: 5,
                            paddingVertical: 2
                        }}>
                        <TextInput
                            placeholder="Search grocery stores"
                            placeholderTextColor="#8b6f47"
                            mode="flat"
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            theme={{ colors: { primary: "#467e53", text: "black" } }}
                            keyboardType="default"
                            cursorColor="black"
                            style={{
                                flex: 1,
                                backgroundColor: "transparent",
                                color: "black",
                                fontSize: 14
                            }}
                            editable={true}
                        />

                        {/* Magnifying Glass Icon*/}
                        <IconButton
                            icon="magnify"
                            size={24}
                            iconColor="white"
                            style={{ backgroundColor: "#467e53", borderRadius: 20, marginLeft: 5 }}
                            onPress={() => console.log("Search button pressed")}
                        />
                    </View>

                    {/* Filter Icon */}
                    <IconButton
                        icon="filter-variant"
                        size={28}
                        iconColor="black"
                        onPress={() => console.log("Filter icon pressed")}
                        style={{ marginLeft: 15 }}
                    />
                </View>

                {/** Main list of stores */}
                <View className="flex-1 items-center justify-center">
                    <StoresList />
                </View>

                {/* Bottom Navigation */}
                <View style={styles.bottomBar}>
                    <IconButton
                        icon="basket-outline"
                        size={30}
                        iconColor="white"
                        onPress={() => navigation.navigate("StoresListScreen")}
                    />
                    <IconButton
                        icon="home-outline"
                        size={35}
                        iconColor="white"
                        onPress={() => navigation.navigate("Home")}
                    />
                    <IconButton
                        icon="silverware-fork-knife"
                        size={30}
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
        backgroundColor: "#467e53"
    },
    logo: {
        width: 150,
        height: 40,
        resizeMode: "contain"
    },
    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 1,
        backgroundColor: "#467e53",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    }
});
