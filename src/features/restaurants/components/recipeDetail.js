import * as React from "react";
import { Text, View, ScrollView, Image, Dimensions, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getRecipeDetail } from "./data";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

const screenWidth = Dimensions.get("window").width;
const Spacer = ({ height = 16 }) => <View style={{ height }} />;

export default function RecipesDetail() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const fetchedRecipesDetails = await getRecipeDetail();
            setRecipes(fetchedRecipesDetails);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <ScrollView
                contentContainerStyle={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    paddingTop: 60,
                    paddingBottom: 100
                }}>
                {Array.from({ length: 2 }).map((_, index) => (
                    <MotiView
                        key={index}
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "timing", duration: 500 }}
                        style={styles.skeletonCard}>
                        {/* Image Placeholder */}
                        <Skeleton
                            colorMode="light"
                            width="100%"
                            height={200}
                            radius="lg"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />

                        <View style={{ padding: 16 }}>
                            {/* Title */}
                            <Skeleton
                                colorMode="light"
                                width={screenWidth * 0.6}
                                height={22}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={14} />

                            {/* Category & Time */}
                            <Skeleton
                                colorMode="light"
                                width={screenWidth * 0.4}
                                height={16}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={14} />

                            {/* Description */}
                            <Skeleton
                                colorMode="light"
                                width={screenWidth * 0.9}
                                height={14}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={10} />
                            <Skeleton
                                colorMode="light"
                                width={screenWidth * 0.8}
                                height={14}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={14} />

                            {/* Nutrients */}
                            <Skeleton
                                colorMode="light"
                                width={screenWidth * 0.5}
                                height={14}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={14} />
                        </View>
                    </MotiView>
                ))}
            </ScrollView>
        );
    }

    return (
        <ScrollView style={{ padding: 16 }}>
            {recipes.map((item) => (
                <View key={item.id} style={styles.recipeCard}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    <Text style={styles.subTitle}>
                        {item.category} • {item.totalTime}
                    </Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text>Servings: {item.servings}</Text>
                    <Text>Cost: {item.estimatedTotalCost}</Text>
                    <Text>Calories: {item.caloriesGrams}</Text>
                    <Text>
                        Prep: {item.prepTime} | Cook: {item.cookTime}
                    </Text>
                    <Text>
                        Fat: {item.fat} | Carbs: {item.carbs} | Protein: {item.protein}
                    </Text>
                    <Text style={styles.sectionTitle}>Notes:</Text>
                    <Text>{item.notes}</Text>
                    <Text style={styles.sectionTitle}>Ingredients:</Text>
                    <Text>{item.ingredients}</Text>
                    <Text style={styles.sectionTitle}>Directions:</Text>
                    <Text>{item.directions}</Text>
                    <Text style={styles.sectionTitle}>Pricing Guide:</Text>
                    <Text>{item.ingredientCosts}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    skeletonCard: {
        width: screenWidth * 0.92,
        backgroundColor: "#dee2e6",
        borderRadius: 16,
        marginBottom: 24,
        alignSelf: "center",
        paddingBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3
    },
    recipeCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 8
    },
    subTitle: {
        fontSize: 14,
        color: "#888",
        marginBottom: 8
    },
    image: {
        width: "100%",
        height: 200,
        borderRadius: 12,
        marginBottom: 12
    },
    description: {
        marginBottom: 10
    },
    sectionTitle: {
        marginTop: 16,
        fontWeight: "600"
    }
});
