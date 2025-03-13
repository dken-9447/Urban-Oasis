// data.js
// Import Firebase modules from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";

// Your web app's Firebase configuration
// (Assuming you are now loading this from your .env file or similar)
const firebaseConfig = {
  // Copy and paste your config here (ensure fields are correct)
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

// 1) Initialize Firebase
const app = initializeApp(firebaseConfig);
// 2) Optional: Initialize Analytics (only works in certain environments)
const analytics = getAnalytics(app);
// 3) Get Firestore reference
const db = getFirestore(app);

/**
 * Updated static recipeDetail array using camelCase keys.
 * (This is sample data used for testing.)
 */
export const recipeDetail = [
  { 
    id: 1, 
    title: "Blackened Shrimp Tacos with Pineapple",
    category: "Mexican",
    rating: "Easy",
    duration: "1 hour", // if you prefer to combine prep and cook time, or keep separate fields below
    imageUrl: "https://www.allrecipes.com/thmb/uWgYL40zm5CUQFv8BY4jK8PpKN0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8629864_Blackened-Shrimp-and-Pineapple-Tacos_Maura-Rawlette_4x3-6d6cff4dfbb54e958b7577db16ab8311.jpg", 
    summary: "These blackened shrimp tacos with pineapple are bright and summery. Add sour cream if you want to cool them down a touch.",
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
  },
  // ... add additional sample recipes if needed
];

/**
 * Fetch all recipes from Firestore and map them
 * to the shape your React app expects.
 * Now using camelCase field names.
 */
export async function getRecipeList() {
  const snapshot = await getDocs(collection(db, "recipes"));
  const recipeList = [];

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    recipeList.push({
      id: docSnap.id,
      title: data.title || "Untitled",
      category: data.category || "Uncategorized",
      rating: data.rating || "Medium",
      totalTime: data.totalTime || "30 minutes",
      imageUrl: data.imageUrl || "https://placehold.co/400"
    });
  });

  return recipeList;
}

/**
 * Get a single recipe document by ID.
 * Make sure your Firestore has a "recipes" collection with docs keyed by recipeId.
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
    console.log("Error fetching recipe detail:", error);
    return null;
  }
}

/**
 * Example: If you store ingredients in a subcollection:
 * /recipes/{recipeId}/ingredients
 */
export async function getIngredients(recipeId) {
  const snapshot = await getDocs(collection(db, "recipes", recipeId, "ingredients"));
  const ingredientsArray = [];
  snapshot.forEach((docSnap) => {
    ingredientsArray.push({ id: docSnap.id, ...docSnap.data() });
  });
  return ingredientsArray;
}

/**
 * Example: If you store directions in a subcollection:
 * /recipes/{recipeId}/directions
 */
export async function getDirections(recipeId) {
  const snapshot = await getDocs(collection(db, "recipes", recipeId, "directions"));
  const directionsArray = [];
  snapshot.forEach((docSnap) => {
    directionsArray.push({ id: docSnap.id, ...docSnap.data() });
  });
  return directionsArray;
}

export const pricing = [
  {
    id: 1,
    ingredient: "Smoked paprika",
    cost: "1.59",
  },
  {
    id: 2,
    ingredient: "Onion powder",
    cost: "1.75",
  },
  {
    id: 3,
    ingredient: "Dried oregano",
    cost: "1.25",
  },
  {
    id: 4,
    ingredient: "Cayenne pepper",
    cost: "2.25",
  },
  {
    id: 5,
    ingredient: "Garlic salt",
    cost: "0.75",
  },
  {
    id: 6,
    ingredient: "Ground black pepper",
    cost: "1.35",
  },
  {
    id: 7,
    ingredient: "Fresh pineapple",
    cost: "2.50",
  },
  {
    id: 8,
    ingredient: "Chopped red onions",
    cost: "0.65",
  },
  {
    id: 9,
    ingredient: "Chopped cilantro",
    cost: "0.20",
  },
  {
    id: 10,
    ingredient: "Lime",
    cost: "0.45",
  },
  {
    id: 11,
    ingredient: "Salt",
    cost: "0.75",
  },
  {
    id: 12,
    ingredient: "Large shrimp (1 pound)",
    cost: "12.95",
  },
  {
    id: 13,
    ingredient: "Butter",
    cost: "3.30",
  },
  {
    id: 14,
    ingredient: "Flour tortillas (6-6 inch)",
    cost: "4.00",
  },
];
