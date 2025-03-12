import React from "react";
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
    ScrollView
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { recipeList } from "../components/data.js";

export const RecipeListScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Top Navigation Bar */}
            <View style={styles.topBar}>
                <Image
                    source={require("../../../../assets/urban-oasis-text-only.png")}
                    style={styles.logo}
                />
            </View>

            {/* Main Content */}
            <View className="z-0 border-2 border-solid p-4 mb-2">
                {/* Search Bar */}
                <View className="flex-row mb-5">
                    <View className="flex-row w-3/4 border-sold border-2 border-[#467e53] rounded-2xl px-4 py-2 mr-7">
                        <TextInput
                            placeholder="Search recipes"
                            placeholderTextColor="#467e53"
                            mode="flat"
                            underlineColor="transparent"
                            activeUnderlineColor="transparent"
                            keyboardType="default"
                            cursorColor="#467e53"
                            style={styles.recipeSearch}
                            editable={true}
                        />
                        <IconButton
                            icon="magnify"
                            size={25}
                            iconColor="#467e53"
                            onPress={() => console.log("Recipe-search pressed")}
                        />
                    </View>
                    <View className="content-right">
                        <IconButton
                            icon="filter-outline"
                            size={45}
                            iconColor="#467e53"
                            onPress={() => console.log("Recipe-filter pressed")}
                        />
                    </View>
                </View>

                <Text className="text-3xl font-serif font-bold text-[#467e53] mb-2">Recipes</Text>

                <ScrollView>
                    {recipeList.map((item) => (
                        <Pressable
                            onPress={() =>
                                navigation.navigate("RecipeDetail", { recipeId: item.id })
                            }>
                            <View style={styles.item}>
                                <View className="flex flex-row">
                                    <View className="mr-3">
                                        <Image
                                            source={{ uri: item.image }}
                                            style={styles.recipeThumbImage}
                                        />
                                    </View>
                                    <View className="mt-1">
                                        <Text className="mb-2 max-w-[250px] font-bold text-[#467e53] font-serif text-lg">
                                            {item.name}
                                        </Text>
                                        <View className="flex flex-row align-center font-semibold">
                                            <Text className="mr-6 text-[#467e53]">
                                                {item.category}
                                            </Text>
                                            <Text className="mr-6 text-[#467e53]">
                                                {item.rating}
                                            </Text>
                                            <Text className="mr-6 text-[#467e53]">{item.time}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomBar}>
                <IconButton
                    icon="basket-outline"
                    size={28}
                    iconColor="white"
                    onPress={() => console.log("Basket-outline pressed")}
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
    },
    item: {
        padding: 10,
        borderWidth: 1,
        borderColor: "#467e53",
        marginBottom: 10,
        borderRadius: 10
    },
    recipeThumbImage: {
        width: 80,
        height: 80,
        borderRadius: 10
    },
    recipeSearch: {
        flex: 1,
        backgroundColor: "transparent",
        color: "#467e53",
        fontSize: 14,
        height: 8
    }
});
