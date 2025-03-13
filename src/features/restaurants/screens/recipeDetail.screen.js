import React from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { IconButton, Button } from "react-native-paper";
import { recipeDetail, ingredients, directions, pricing } from "../components/data.js";

export const RecipeDetailScreen = ({ navigation, route }) => {
    const { recipeId } = route.params;
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
            <View className="z-0">
                <Text className="max-w-[400px] font-bold text-[#467e53] font-serif text-lg p-4">
                    {recipeDetail.map((item) => item.name)}
                </Text>
                <ScrollView>
                    <View className="bg-[#467e53] items-center p-1">
                        {recipeDetail.map((item) => (
                            <Image source={{ uri: item.image }} style={styles.recipeDetailImage} />
                        ))}
                    </View>

                    <View className="p-4 mb-5">
                        <Text className="text-[#467e53] pr-4 font-bold">
                            {recipeDetail.map((item) => item.category)} (
                            {recipeDetail.map((item) => item.rating)})
                        </Text>
                        <Text className="text-[#467e53] font-serif text-md">
                            {recipeDetail.map((item) => item.summary)}
                        </Text>

                        <View className="flex flex-row align-center justify-center mt-6">
                            <Text className="text-[#467e53] pr-4 pl-4 font-bold text-center">
                                Prep Time:{"\n"}
                                {recipeDetail.map((item) => item.prepTime)}
                            </Text>
                            <Text className="text-[#467e53] pr-4 pl-4 font-bold text-center">
                                Cook Time:{"\n"}
                                {recipeDetail.map((item) => item.cookTime)}
                            </Text>
                            <Text className="text-[#467e53] pr-4 pl-4 font-bold text-center">
                                Total Time:{"\n"}
                                {recipeDetail.map((item) => item.totalTime)}
                            </Text>
                        </View>

                        <View className="flex flex-row align-center justify-center mb-6 mt-4">
                            <Text className="text-[#467e53] pr-4 pl-4 font-bold text-center">
                                Servings:{"\n"}
                                {recipeDetail.map((item) => item.servings)}
                            </Text>
                            <Text className="text-[#467e53] pr-4 pl-4 font-bold text-center">
                                Est. Cost:{"\n"}
                                {recipeDetail.map((item) => item.cost)}
                            </Text>
                        </View>

                        <Text className="text-[#467e53] text-lg font-bold mb-1">Ingredients:</Text>
                        <View>
                            {ingredients.map((item) => (
                                <Text className="text-[#467e53] font-serif text-md mb-1">
                                    {item.ingredient}
                                </Text>
                            ))}
                        </View>

                        <Text className="text-[#467e53] text-lg font-bold mb-1 mt-5">
                            Directions:
                        </Text>
                        <View className="mb-5">
                            {directions.map((item) => (
                                <Text className="text-[#467e53] font-serif text-md mb-2">
                                    {item.id}. {item.direction}
                                </Text>
                            ))}
                        </View>

                        <Text className="text-[#467e53] text-lg font-bold mb-1 mt-5">Notes:</Text>
                        <Text className="text-[#467e53] font-serif text-md mb-5">
                            {recipeDetail.map((item) => item.notes)}
                        </Text>

                        <Button
                            icon="magnify"
                            mode="contained"
                            buttonColor="#467e53"
                            onPress={() => console.log("Reciple locate store button pressed.")}>
                            Locate Store
                        </Button>

                        <Text className="text-[#467e53] text-lg font-bold mb-1 mt-5">
                            Nutrition:
                        </Text>
                        <View className="flex flex-row align-center justify-center">
                            <Text className="text-[#467e53] pr-4 pl-4 font-bold text-center">
                                Calories:{"\n"}
                                {recipeDetail.map((item) => item.calories)}
                            </Text>
                            <Text className="text-[#467e53] pr-4 pl-4 font-bold text-center">
                                Fat:{"\n"}
                                {recipeDetail.map((item) => item.fat)} grams
                            </Text>
                            <Text className="text-[#467e53] pr-4 pl-4 font-bold text-center">
                                Carbs:{"\n"}
                                {recipeDetail.map((item) => item.carbs)} grams
                            </Text>
                            <Text className="text-[#467e53] pr-4 pl-4 font-bold text-center mb-5">
                                Protein:{"\n"}
                                {recipeDetail.map((item) => item.protein)} grams
                            </Text>
                        </View>

                        <Text className="text-[#467e53] text-lg font-bold mb-1">
                            Pricing Guide:
                        </Text>
                        <View className="mb-[200px]">
                            {pricing.map((item) => (
                                <Text className="text-[#467e53] font-serif text-md mb-1">
                                    {item.ingredient} (${item.cost})
                                </Text>
                            ))}
                        </View>
                    </View>
                </ScrollView>
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
    recipeDetailImage: {
        width: 400,
        height: 225,
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
