import React, { useState, useEffect } from "react";
import {
    StatusBar,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions
} from "react-native";
import { IconButton, Button } from "react-native-paper";
import { getRecipeDetail, getIngredients, getDirections } from "../components/data";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

const Spacer = ({ height = 16 }) => <View style={{ height }} />;
const screenWidth = Dimensions.get("window").width;

export const RecipeDetailScreen = ({ navigation, route }) => {
    const { recipeId } = route.params;
    const [recipeDetail, setRecipeDetail] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [directions, setDirections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            getRecipeDetail(recipeId),
            getIngredients(recipeId),
            getDirections(recipeId)
        ]).then(([detail, ing, dir]) => {
            if (detail) setRecipeDetail(detail);
            setIngredients(ing);
            setDirections(dir);
            setTimeout(() => setLoading(false), 1500);
        });
    }, [recipeId]);

    if (loading) {
        const contentWidth = screenWidth * 0.92 - 32;

        return (
            <ScrollView
                contentContainerStyle={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    paddingTop: 60,
                    paddingBottom: 100,
                    backgroundColor: "#ffffff"
                }}>
                {Array.from({ length: 1 }).map((_, index) => (
                    <MotiView
                        key={index}
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "timing", duration: 500 }}
                        style={styles.skeletonCard}>
                        {/* Image */}
                        <Skeleton
                            colorMode="light"
                            width="100%"
                            height={180}
                            radius="lg"
                            boneColor="#dee2e6"
                            highlightColor="#f7f7f7"
                        />

                        <View style={{ padding: 16 }}>
                            {/* Title */}
                            <Skeleton
                                colorMode="light"
                                width={contentWidth * 0.6}
                                height={20}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={20} />

                            {/* Category & Time */}
                            <Skeleton
                                colorMode="light"
                                width={contentWidth * 0.3}
                                height={16}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={24} />

                            {/* Description */}
                            <Skeleton
                                colorMode="light"
                                width={contentWidth * 0.9}
                                height={14}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={16} />
                            <Skeleton
                                colorMode="light"
                                width={contentWidth * 0.8}
                                height={14}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={28} />

                            {/* Nutrition Info */}
                            <Skeleton
                                colorMode="light"
                                width={contentWidth * 0.5}
                                height={14}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={28} />

                            {/* Ingredients Header */}
                            <Skeleton
                                colorMode="light"
                                width={contentWidth * 0.3}
                                height={18}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={16} />

                            {/* Ingredients List */}
                            {Array.from({ length: 4 }).map((_, i) => (
                                <React.Fragment key={i}>
                                    <Skeleton
                                        colorMode="light"
                                        width={contentWidth * (0.6 + Math.random() * 0.3)}
                                        height={12}
                                        radius="round"
                                        boneColor="#dee2e6"
                                        highlightColor="#f7f7f7"
                                    />
                                    <Spacer height={16} />
                                </React.Fragment>
                            ))}

                            <Spacer height={28} />

                            {/* Directions Header */}
                            <Skeleton
                                colorMode="light"
                                width={contentWidth * 0.4}
                                height={18}
                                radius="round"
                                boneColor="#dee2e6"
                                highlightColor="#f7f7f7"
                            />
                            <Spacer height={16} />

                            {/* Directions List */}
                            {Array.from({ length: 3 }).map((_, i) => (
                                <React.Fragment key={i}>
                                    <Skeleton
                                        colorMode="light"
                                        width={contentWidth * (0.6 + Math.random() * 0.3)}
                                        height={12}
                                        radius="round"
                                        boneColor="#dee2e6"
                                        highlightColor="#f7f7f7"
                                    />
                                    <Spacer height={16} />
                                </React.Fragment>
                            ))}
                        </View>
                    </MotiView>
                ))}
            </ScrollView>
        );
    }

    if (!recipeDetail) {
        return (
            <SafeAreaView style={styles.container}>
                {<Text style={{ textAlign: "center", marginTop: 20 }}>... loading data</Text>}
            </SafeAreaView>
        );
    }

    const steps =
        recipeDetail.directions && typeof recipeDetail.directions === "string"
            ? recipeDetail.directions.split("\n")
            : recipeDetail.directions || [];

    const ingredientEntries =
        recipeDetail.ingredients && typeof recipeDetail.ingredients === "object"
            ? Object.entries(recipeDetail.ingredients)
            : [];

    return (
        <SafeAreaView style={styles.container}>
            {/* Top Navigation */}
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
                        {recipeDetail.title || "Untitled Recipe"}
                    </Text>

                    <View style={styles.imageContainer}>
                        <Image
                            source={{
                                uri: recipeDetail.imageUrl || "https://placehold.co/400"
                            }}
                            style={styles.recipeDetailImage}
                        />
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.categoryRating}>
                            {recipeDetail.category} • {recipeDetail.totalTime}
                        </Text>
                        <Text style={styles.summary}>
                            {recipeDetail.description || "No description available."}
                        </Text>

                        {/* Time & Cost Section*/}
                        <View style={styles.infoSection}>
                            <View style={styles.infoContent}>
                                <View style={styles.infoGrid}>
                                    <View style={styles.infoBlock}>
                                        <Text style={styles.infoLabel}>Prep Time:</Text>
                                        <Text style={styles.infoValue}>
                                            {recipeDetail.prepTime}
                                        </Text>
                                    </View>
                                    <View style={styles.infoBlock}>
                                        <Text style={styles.infoLabel}>Cook Time:</Text>
                                        <Text style={styles.infoValue}>
                                            {recipeDetail.cookTime}
                                        </Text>
                                    </View>
                                    <View style={styles.infoBlock}>
                                        <Text style={styles.infoLabel}>Total Time:</Text>
                                        <Text style={styles.infoValue}>
                                            {recipeDetail.totalTime}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.infoGrid}>
                                    <View style={styles.infoBlock}>
                                        <Text style={styles.infoLabel}>Servings:</Text>
                                        <Text style={styles.infoValue}>
                                            {recipeDetail.servings}
                                        </Text>
                                    </View>
                                    <View style={styles.infoBlock}>
                                        <Text style={styles.infoLabel}>Est. Cost:</Text>
                                        <Text style={styles.infoValue}>
                                            {recipeDetail.estimatedTotalCost}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Nutrition Section*/}
                        <View style={styles.infoSection}>
                            <View style={styles.infoContent}>
                                <View style={styles.infoGrid}>
                                    <View style={styles.infoBlock}>
                                        <Text style={styles.infoLabel}>Calories:</Text>
                                        <Text style={styles.infoValue}>
                                            {recipeDetail.caloriesGrams}g
                                        </Text>
                                    </View>
                                    <View style={styles.infoBlock}>
                                        <Text style={styles.infoLabel}>Fat:</Text>
                                        <Text style={styles.infoValue}>{recipeDetail.fat}</Text>
                                    </View>
                                    <View style={styles.infoBlock}>
                                        <Text style={styles.infoLabel}>Carbs:</Text>
                                        <Text style={styles.infoValue}>{recipeDetail.carbs}</Text>
                                    </View>
                                    <View style={styles.infoBlock}>
                                        <Text style={styles.infoLabel}>Protein:</Text>
                                        <Text style={styles.infoValue}>{recipeDetail.protein}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionHeader}>Ingredients:</Text>
                            {ingredientEntries.length > 0 ? (
                                ingredientEntries.map(([key, value]) => (
                                    <View key={key} style={styles.ingredientItem}>
                                        <Text style={styles.bullet}>•</Text>
                                        <Text style={styles.ingredientText}>
                                            {typeof value === "string" ? value : "Reference"}
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.ingredientText}>No ingredients available.</Text>
                            )}
                        </View>

                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionHeader}>Directions:</Text>
                            {steps.length > 0 ? (
                                steps.map((step, index) => (
                                    <View key={index} style={styles.directionItem}>
                                        <Text style={styles.stepNumber}>{index + 1}.</Text>
                                        <Text style={styles.directionsText}>{step}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.directionsText}>No directions available.</Text>
                            )}
                        </View>

                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionHeader}>Pricing Guide:</Text>
                            {ingredientEntries.length > 0 ? (
                                ingredientEntries.map(([key, value]) => (
                                    <View key={key} style={styles.pricingItem}>
                                        <Text style={styles.bullet}>•</Text>
                                        <Text style={styles.ingredientPricing}>
                                            {recipeDetail.ingredientCosts[key]}
                                        </Text>
                                    </View>
                                ))
                            ) : (
                                <Text style={styles.ingredientPricing}>
                                    No ingredients pricing guide available.
                                </Text>
                            )}
                        </View>

                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionHeader}>Notes:</Text>
                            <Text style={styles.notesText}>
                                {recipeDetail.notes || "No additional notes."}
                            </Text>
                        </View>

                        <View className="mt-10" />
                        <Button
                            icon="magnify"
                            mode="contained"
                            buttonColor="#7FA184"
                            onPress={() => console.log("Locate store button pressed.")}>
                            Locate Store
                        </Button>
                        <View className="mt-10" />

                        <View style={{ marginBottom: 100 }} />
                    </View>
                </ScrollView>
            </View>

            {/* Bottom Navigation */}
            <View style={styles.bottomBar}>
                <IconButton
                    icon="basket-outline"
                    size={45}
                    iconColor="white"
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
                    iconColor="#BCEDC3"
                    onPress={() => navigation.navigate("RecipeList")}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    // ============ CONTAINER & LAYOUT ============

    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight
    },
    content: {
        padding: 16
    },

    // ============ TOP BAR ============

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

    // ============ TITLE & HEADERS ============

    recipeTitle: {
        borderBottomWidth: 1,
        borderColor: "#BFBFBF",
        fontWeight: "bold",
        color: "#3A4E36",
        fontFamily: "serif",
        fontSize: 22,
        paddingVertical: 10,
        textAlign: "center"
    },
    sectionHeader: {
        color: "#31482B",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 6,
        paddingHorizontal: 4
    },

    // ============ IMAGE ============

    imageContainer: {
        backgroundColor: "transparent",
        alignItems: "center",
        paddingVertical: 8
    },
    recipeDetailImage: {
        width: 400,
        height: 225,
        borderRadius: 10
    },

    // ============ CATEGORY & SUMMARY ============

    categoryRating: {
        borderBottomWidth: 1,
        borderColor: "#BFBFBF",
        color: "#31482B",
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 10
    },
    summary: {
        borderBottomWidth: 1,
        borderColor: "#BFBFBF",
        paddingVertical: 10,
        color: "#467e53",
        fontFamily: "serif",
        fontSize: 16,
        textAlign: "center"
    },

    // ============ INFO SECTION ============

    infoSection: {
        borderBottomWidth: 1,
        borderColor: "#BFBFBF",
        marginVertical: 0,
        width: "100%",
        alignSelf: "center"
    },
    infoContent: {
        paddingHorizontal: 12
    },
    infoGrid: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        paddingVertical: 8
    },
    infoBlock: {
        alignItems: "center",
        minWidth: 80,
        marginVertical: 4
    },
    infoLabel: {
        fontWeight: "bold",
        color: "#31482B",
        fontSize: 14,
        marginBottom: 2
    },
    infoValue: {
        color: "#467e53",
        fontSize: 14
    },

    // ============ NOTES ============

    notesText: {
        paddingVertical: 8,
        color: "#467e53",
        fontFamily: "serif",
        fontSize: 16,
        textAlign: "center"
    },

    // ============ PRICING ============

    pricingItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingLeft: 16,
        marginBottom: 4
    },

    // ============ INGREDIENTS ============

    ingredientItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingLeft: 16,
        marginBottom: 4
    },
    bullet: {
        color: "#31482B",
        fontSize: 16,
        lineHeight: 22,
        marginRight: 6
    },
    ingredientText: {
        color: "#467e53",
        fontFamily: "serif",
        fontSize: 16,
        flexShrink: 1
    },
    ingredientPricing: {
        color: "#467e53",
        fontFamily: "serif",
        fontSize: 16,
        marginBottom: 4
    },

    // ============ DIRECTIONS ============

    directionItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        paddingLeft: 16,
        marginBottom: 6
    },
    stepNumber: {
        fontWeight: "bold",
        color: "#31482B",
        fontSize: 16,
        lineHeight: 22,
        marginRight: 6
    },
    directionsText: {
        color: "#467e53",
        fontFamily: "serif",
        fontSize: 16,
        flexShrink: 1
    },

    // ============ SECTION WRAPPER ============

    sectionContainer: {
        borderBottomWidth: 1,
        borderColor: "#BFBFBF",
        paddingBottom: 10,
        marginBottom: 0,
        marginVertical: 10,
        width: "100%",
        alignSelf: "center"
    },

    // ============ BOTTOM BAR ============

    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#7FA184",
        borderTopColor: "#5E7147",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    // ============ Skeleton Loader ============

    skeletonCard: {
        width: screenWidth * 0.92,
        backgroundColor: "#dee2e6",
        borderRadius: 16,
        marginTop: 60,
        marginBottom: 24,
        alignSelf: "center",
        paddingBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 3
    }
});
