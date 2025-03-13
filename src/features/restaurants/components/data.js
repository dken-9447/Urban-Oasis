// Import Firebase modules
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import {
    API_KEY,
    AUTH_DOMAIN,
    DATABASE_URL,
    PROJECT_ID,
    STORAGE_BUCKET,
    MESSAGING_SENDER_ID,
    APP_ID,
    MEASUREMENT_ID
} from "@env"; // React Native uses @env, not process.env

// Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID
};

// Prevent duplicate initialization
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize services
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}
const db = getFirestore(app);

// --- Recipe Data ---
export const recipeDetail = [
    {
        id: 1,
        title: "Blackened Shrimp Tacos with Pineapple",
        category: "Mexican",
        rating: "Easy",
        duration: "1 hour",
        imageUrl:
            "https://www.allrecipes.com/thmb/uWgYL40zm5CUQFv8BY4jK8PpKN0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8629864_Blackened-Shrimp-and-Pineapple-Tacos_Maura-Rawlette_4x3-6d6cff4dfbb54e958b7577db16ab8311.jpg",
        summary:
            "These blackened shrimp tacos with pineapple are bright and summery. Add sour cream if you want to cool them down a touch.",
        cost: "$15",
        prepTime: "10 minutes",
        cookTime: "15 minutes",
        totalTime: "25 minutes",
        servings: 3,
        calories: "250",
        fat: "15",
        carbs: "40",
        protein: "175",
        notes: "To heat tortillas effectively, consider using a skillet or comal for a traditional approach, a microwave with a damp cloth for a quick fix, or an oven for larger batches."
    }
];

// --- Firestore Fetching Functions ---
/**
 * Fetch all recipes from Firestore.
 */
export async function getRecipeList() {
    try {
        const snapshot = await getDocs(collection(db, "recipes"));
        const recipeList = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            title: docSnap.data().title || "Untitled",
            category: docSnap.data().category || "Uncategorized",
            rating: docSnap.data().rating || "Medium",
            totalTime: docSnap.data().totalTime || "30 minutes",
            imageUrl: docSnap.data().imageUrl || "https://placehold.co/400"
        }));

        return recipeList;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return [];
    }
}

/**
 * Fetch recipe details by ID.
 */
export async function getRecipeDetail(recipeId) {
    try {
        console.log("Fetching recipe detail for ID:", recipeId);
        const docRef = doc(db, "recipes", recipeId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Found recipe:", docSnap.data());
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No recipe found for ID:", recipeId);
            return null;
        }
    } catch (error) {
        console.error("Error fetching recipe detail:", error);
        return null;
    }
}

/**
 * Fetch ingredients from Firestore.
 */
export async function getIngredients(recipeId) {
    try {
        const snapshot = await getDocs(collection(db, "recipes", recipeId, "ingredients"));
        return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
    } catch (error) {
        console.error("Error fetching ingredients:", error);
        return [];
    }
}

/**
 * Fetch directions from Firestore.
 */
export async function getDirections(recipeId) {
    try {
        const snapshot = await getDocs(collection(db, "recipes", recipeId, "directions"));
        return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
    } catch (error) {
        console.error("Error fetching directions:", error);
        return [];
    }
}

// --- Pricing Data ---
export const pricing = [
    { id: 1, ingredient: "Smoked paprika", cost: "1.59" },
    { id: 2, ingredient: "Onion powder", cost: "1.75" },
    { id: 3, ingredient: "Dried oregano", cost: "1.25" },
    { id: 4, ingredient: "Cayenne pepper", cost: "2.25" },
    { id: 5, ingredient: "Garlic salt", cost: "0.75" },
    { id: 6, ingredient: "Ground black pepper", cost: "1.35" },
    { id: 7, ingredient: "Fresh pineapple", cost: "2.50" },
    { id: 8, ingredient: "Chopped red onions", cost: "0.65" },
    { id: 9, ingredient: "Chopped cilantro", cost: "0.20" },
    { id: 10, ingredient: "Lime", cost: "0.45" },
    { id: 11, ingredient: "Salt", cost: "0.75" },
    { id: 12, ingredient: "Large shrimp (1 pound)", cost: "12.95" },
    { id: 13, ingredient: "Butter", cost: "3.30" },
    { id: 14, ingredient: "Flour tortillas (6-6 inch)", cost: "4.00" }
];

export { app, db, analytics };
