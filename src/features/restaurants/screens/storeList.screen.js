import React, { useState } from "react";
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Keyboard,
    Pressable,
    Alert
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { Image } from "react-native";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export const StoreListScreen = ({ navigation }) => {
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

                {/* Bottom Navigation */}
                <View style={styles.bottomBar}>
                    <IconButton
                        icon="basket-outline"
                        size={28}
                        iconColor="white"
                        onPress={() => navigation.navigate("StoreListScreen")}
                    />
                    <IconButton
                        icon="home-outline"
                        size={28}
                        iconColor="white"
                        onPress={() => navigation.navigate("Home")}
                    />
                    <IconButton
                        icon="silverware-fork-knife"
                        size={28}
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
        paddingVertical: 12,
        backgroundColor: "#467e53",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    }
});
