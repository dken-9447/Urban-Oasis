import * as React from "react";
import { Text, View, ScrollView, Image, Button} from "react-native";
import { useEffect, useState } from "react";
import { getRecipeDetail } from "./data";


// This function mimicks the code used by recipeDetail.screen.js. However
// all of the formatting code has been removed as that is not being tested.
export default function RecipesDetail({}) {
    
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            let fetchedRecipesDetails = await getRecipeDetail();
            setRecipes(fetchedRecipesDetails);
        }

        fetchData();
    });

    return (
        <View>
            <ScrollView>
            {recipes.map((item) => (
                <View  key={item.id}>
                    <Text>
                        {item.title}
                    </Text>
                    <View>
                        <Image source={{ uri: item.imageUrl }} />
                    </View> 
                    <Text>
                        {item.category} • {item.totalTime}
                    </Text>
                    <Text>
                        {item.description}
                    </Text>
                    <Text>
                        Servings: {item.servings}
                    </Text>
                    <Text>
                        Cost: {item.estimatedTotalCost}
                    </Text>
                    <Text>
                        Calories: {item.caloriesGrams}
                    </Text>
                    <Text>
                        Prep: {item.prepTime} | Cook: {item.cookTime}
                    </Text>
                    <Text>
                        Fat: {item.fat} | Carbs: {item.carbs} | Protein:{" "}
                        {item.protein}
                    </Text>
                    <Text>Notes:</Text>
                    <Text>
                        {item.notes}
                    </Text> 
                    <Text>Ingredients:</Text>
                    <Text>{item.ingredients}</Text>
                    <Text>Directions:</Text>
                    <Text>{item.directions}</Text>
                    <Text>Pricing Guide:</Text>
                    <Text>{item.ingredientCosts}</Text>
                </View>
            ))}
            </ScrollView>
        </View>
    );
}                    
