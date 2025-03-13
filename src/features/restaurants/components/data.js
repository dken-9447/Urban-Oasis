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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

//copy and paste the method in the .env

};





// 1) Initialize Firebase
const app = initializeApp(firebaseConfig);
// 2) Optional: Initialize Analytics (only works in certain environments)
const analytics = getAnalytics(app);
// 3) Get Firestore reference
const db = getFirestore(app);

/**
 * Fetch all recipes from Firestore and map them
 * to the shape your React app expects.
 */
export async function getRecipeList() {
  const snapshot = await getDocs(collection(db, "recipes"));
  const recipeList = [];

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    recipeList.push({
      id: docSnap.id,
      name: data.Title || "Untitled",
      category: data.Category || "Uncategorized",
      rating: data.Rating || "Medium",
      time: data["Total Time"] || "30 minutes",
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
