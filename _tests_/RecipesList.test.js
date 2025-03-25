import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import RecipesList from "../src/features/restaurants/components/recipeList";

/**
 * Compared to J-unit, this is like importing test and assertions.assertEquals
 * the import statement for render will render my component.
 * the import statement for waitFor will wait for asynchronous updates.
 * the import statement for screen will query the screen.
 */

// This uses the real getRecipeDetail() function with a mock that returns a hard coded array of recipe data
// This will strictly test the function away from the backend
// NOTE: These are not real recipes. These are dummy recipes for unit testing.
jest.mock("../src/features/restaurants/components/data", () => ({
    getRecipeList: jest.fn().mockResolvedValue([
        {
            id: "3M3I5MweRBZiBqo0ONRL",
            title: "Sheet Pan Shrimp Scampi",
            category: "Seafood",
            rating: "Easy",
            totalTime: "35 minutes",
            imageUrl: "https://www.allrecipes.com/thmb/SheetPanShrimpScampi",
            ingredients: "12 Large shrimp",
            description: "Healthy, super flavorful, and the cleanup is effortless.",
            estimatedTotalCost: "$21.00",
            prepTime: "15 min",
            cookTime: "20 min",
            fat: "16g",
            carbs: "12g",
            protein: "30g",
            notes: "Quick seafood dish, low-carb option with zucchini noodles",
            ingredientCosts: "$8.00 per pound",
            servings: "4",
            directions: "Preheat oven to 350 degrees F"
        },
        {
            id: "3",
            title: "Garlic Shrimp",
            category: "Chinese",
            rating: "Medium",
            totalTime: "40 minutes",
            imageUrl: "https://www.allrecipes.com/thmb/SheetPanShrimpScampi",
            ingredients: "Green peppers",
            description: "Really worth the effort!",
            estimatedTotalCost: "$18.00",
            prepTime: "30 min",
            cookTime: "10 min",
            fat: "14g",
            carbs: "13g",
            protein: "40g",
            notes: "Generally well liked by everyone!",
            ingredientCosts: "$2.25 per pound",
            servings: "2",
            directions: "Heat oil in wok until very hot."
        }
    ])
}));

// This is the test class that will 'bundle' all the related tests
describe("RecipesList Component", () => {
    
    // UT-2 Recipe List Screen displays the correct information for a single recipe.
    it("UT-2 Recipe List Screen displays the correct information for a single recipe.", async () => {
        render(
                <RecipesList />
        );

        await waitFor(() => {
            expect(screen.getByText(/Sheet Pan Shrimp Scampi/)).toBeTruthy(); // Title
            expect(screen.getByText(/Seafood/)).toBeTruthy(); // Category
            expect(screen.getByText(/Easy/)).toBeTruthy(); // Rating
            expect(screen.getByText(/35 minutes/)).toBeTruthy(); // Total Time
        });
    });

    // UT-3 Reciple List Screen Displays multiple recipes.
    it("UT-3 Reciple List Screen Displays multiple recipes.", async () => {
        render(
                <RecipesList />
        );

        await waitFor(() => {
            expect(screen.getByText(/Sheet Pan Shrimp Scampi/)).toBeTruthy(); // Title of recipe 1
            expect(screen.getByText(/Garlic Shrimp/)).toBeTruthy(); // Title of recipe 2
        });
    });

    // UT-4 Filtering recipes by ingredients returns only recipes that contain a selected ingredient. 
    it("UT-4 Filtering recipes by ingredients returns only recipes that contain a selected ingredient.", async () => {
        render(
                <RecipesList />
        );

        await waitFor(() => {
            expect(false).toBe(true); // This test always fails as the functionality is not implemented.
        });
    });

    // UT-5 Filtering recipes to exclude ingredients returns only recipes that do not contain those ingredients.
    it("UT-5 Filtering recipes to exclude ingredients returns only recipes that do not contain those ingredients.", async () => {
        render(
                <RecipesList />
        );

        await waitFor(() => {
            expect(false).toBe(true); // This test always fails as the functionality is not implemented.
        });
    });
    
    // UT-6 Filtering recipes by category returns only recipes within that category.
    it("UT-6 Filtering recipes by category returns only recipes within that category.", async () => {
        render(
                <RecipesList />
        );

        await waitFor(() => {
            expect(false).toBe(true); // This test always fails as the functionality is not implemented.
        });
    });

});
