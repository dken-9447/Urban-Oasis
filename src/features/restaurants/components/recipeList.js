import * as React from "react";
import { Text, View, ScrollView, Pressable, Image } from "react-native";
import { useEffect, useState } from "react";
import { getRecipeList } from "./data";

// This function mimicks the code used by recipeList.screen.js. However
// all of the formatting code has been removed as that is not being tested.
export default function RecipesList({}) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let fetchedRecipes = await getRecipeList();
            setRecipes(fetchedRecipes);
        }

        fetchData();
    });

    return (
        <View>
            <ScrollView>
                {recipes.map((item) => (
                    <Pressable key={item.id}>
                        <View>
                            <View>
                                <View>
                                    <Image source={{ uri: item.imageUrl }} />
                                </View>
                                <View>
                                    <Text>{item.title}</Text>
                                    <View>
                                        <Text>{item.category}</Text>
                                        <Text>{item.rating}</Text>
                                        <Text>{item.totalTime}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
    );
}
