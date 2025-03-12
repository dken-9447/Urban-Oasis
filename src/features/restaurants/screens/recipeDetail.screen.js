import React, { useState, useEffect } from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { IconButton, Button } from "react-native-paper";

import { getRecipeDetail, getIngredients, getDirections } from "../components/data";

import { recipeDetail, ingredients, directions, pricing } from "../components/data.js";

export const RecipeDetailScreen = ({ navigation, route }) => {
    const { recipeId } = route.params;
    const [recipeDetail, setRecipeDetail] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [directions, setDirections] = useState([]);

    useEffect(() => {
        console.log("Fetching recipe detail for ID:", recipeId);
        getRecipeDetail(recipeId).then((data) => {
            if (data) {
                console.log("Fetched recipe detail:", data);
                setRecipeDetail(data);
            } else {
                console.log("No recipe found for ID:", recipeId);
            }
        });

        // Fetch ingredients (if stored as a subcollection)
        getIngredients(recipeId).then((data) => {
            console.log("Fetched ingredients:", data);
            setIngredients(data);
        });

        // Fetch directions (if stored as a subcollection)
        getDirections(recipeId).then((data) => {
            console.log("Fetched directions:", data);
            setDirections(data);
        });
    }, [recipeId]);

    if (!recipeDetail) {
        console.log(`Still waiting for recipe detail with ID: ${recipeId}`);
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{ textAlign: "center", marginTop: 20 }}>
                    Please check the console for fetch logs.
                </Text>
            </SafeAreaView>
        );
    }

    // For directions, if it's a string, split it into an array of steps.
    const steps = recipeDetail.Directions
        ? typeof recipeDetail.Directions === "string"
            ? recipeDetail.Directions.split("\n")
            : recipeDetail.Directions
        : [];

    // If ingredients are stored as a map in the recipe document, you might convert them:
    const ingredientEntries =
        recipeDetail.Ingredients && typeof recipeDetail.Ingredients === "object"
            ? Object.entries(recipeDetail.Ingredients)
            : [];

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
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <Text style={styles.recipeTitle}>
                        {recipeDetail.Title || "Untitled Recipe"}
                    </Text>

                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: recipeDetail.Image || "https://placehold.co/400"
                            }}
                            style={styles.recipeDetailImage}
                        />
                    </View>
                    <View>
                        {ingredients.map((item) => (
                            <Text className="text-[#467e53] font-serif text-md mb-1">
                                {item.ingredient}
                            </Text>
                        ))}
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.categoryRating}>
                            {recipeDetail.Category} • {recipeDetail["Total Time"]}
                        </Text>
                        <Text style={styles.summary}>
                            {recipeDetail.Description || "No description available."}
                        </Text>

                        <View style={styles.infoRow}>
                            <Text style={styles.infoText}>Servings: {recipeDetail.Servings}</Text>
                            <Text style={styles.infoText}>
                                Cost: {recipeDetail["Estimated Total Cost"]}
                            </Text>
                        </View>

                        <Text style={styles.infoText}>
                            Calories: {recipeDetail["Calories (grams)"]} g
                        </Text>

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

                        <Text style={styles.sectionHeader}>Ingredients:</Text>
                        {ingredientEntries.length > 0 ? (
                            ingredientEntries.map(([key, value]) => (
                                <Text key={key} style={styles.ingredientText}>
                                    {key}: {typeof value === "string" ? value : "Reference"}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.ingredientText}>No ingredients available.</Text>
                        )}

                        <Text style={styles.sectionHeader}>Directions:</Text>
                        {steps.length > 0 ? (
                            steps.map((step, index) => (
                                <Text key={index} style={styles.directionsText}>
                                    {index + 1}. {step}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.directionsText}>No directions available.</Text>
                        )}

                        <Button
                            icon="magnify"
                            mode="contained"
                            buttonColor="#467e53"
                            onPress={() => console.log("Locate store button pressed.")}>
                            Locate Store
                        </Button>

                        <View style={{ marginBottom: 250 }} />
                    </View>
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
    recipeTitle: {
        fontWeight: "bold",
        color: "#467e53",
        fontFamily: "serif",
        fontSize: 22,
        padding: 8,
        textAlign: "center"
    },
    imageContainer: {
        backgroundColor: "#467e53",
        alignItems: "center",
        padding: 8
    },
    recipeDetailImage: {
        width: 400,
        height: 225,
        borderRadius: 10
    },
    content: {
        padding: 16
    },
    categoryRating: {
        color: "#467e53",
        fontWeight: "bold",
        marginBottom: 6,
        textAlign: "center"
    },
    summary: {
        color: "#467e53",
        fontFamily: "serif",
        fontSize: 16,
        marginBottom: 10,
        textAlign: "center"
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10
    },
    infoText: {
        color: "#467e53",
        fontWeight: "bold",
        textAlign: "center"
    },
    sectionHeader: {
        color: "#467e53",
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 8
    },
    ingredientText: {
        color: "#467e53",
        fontFamily: "serif",
        fontSize: 16,
        marginBottom: 4
    },
    directionsText: {
        color: "#467e53",
        fontFamily: "serif",
        fontSize: 16,
        marginBottom: 6
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
