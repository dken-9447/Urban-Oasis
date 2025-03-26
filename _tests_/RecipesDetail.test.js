import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import RecipesDetail from "../src/features/restaurants/components/recipeDetail";

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
    getRecipeDetail: jest.fn().mockResolvedValue([
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
            directions: "Preheat oven to 350 degrees F",
            caloriesGrams: "600g"
        }
    ])
}));

// This is the test class that will 'bundle' all the related tests
describe("RecipesDetail Component", () => {
    
    // UT-1 Recipe Detail Screen displays all reciple infomration correctly.
    it("UT-1 Recipe Detail Screen displays all reciple infomration correctly.", async () => {
        render(
                <RecipesDetail />
        );

        await waitFor(() => {
            expect(screen.getByText(/Sheet Pan Shrimp Scampi/)).toBeTruthy(); // Title
            expect(screen.getByText(/Seafood/)).toBeTruthy(); // Category
            expect(screen.getByText(/12 Large shrimp/)).toBeTruthy(); // Ingredients
            expect(screen.getByText(/Healthy, super flavorful, and the cleanup is effortless/)).toBeTruthy(); // Description
            expect(screen.getByText(/21.00/)).toBeTruthy(); // Estimated Total Cost
            expect(screen.getByText(/15 min/)).toBeTruthy(); // Prep Time
            expect(screen.getByText(/15 min/)).toBeTruthy(); // Cook Time
            expect(screen.getByText(/16g/)).toBeTruthy(); // Fat
            expect(screen.getByText(/12g/)).toBeTruthy(); // Carbs
            expect(screen.getByText(/30g/)).toBeTruthy(); // Protein
            expect(screen.getByText(/Quick seafood dish, low-carb option with zucchini noodles/)).toBeTruthy(); // Notes
            expect(screen.getByText(/8.00 per pound/)).toBeTruthy(); // Ingredient Cost
            expect(screen.getByText(/4/)).toBeTruthy(); // Servings
            expect(screen.getByText(/Preheat oven to 350 degrees F/)).toBeTruthy(); // Directions
            expect(screen.getByText(/600g/)).toBeTruthy(); // Calorie Grams
        });
    });
});
