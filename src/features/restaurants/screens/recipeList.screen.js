import React, { useState, useEffect } from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { getRecipeList } from "../components/data";

export const RecipeListScreen = ({ navigation }) => {
  const [recipeList, setRecipeList] = useState([]);

  // Fetch recipes when the component mounts
  useEffect(() => {
    getRecipeList().then((data) => {
      setRecipeList(data);
    });
  }, []);

  // Log each recipe's title and imageUrl for debugging
  useEffect(() => {
    recipeList.forEach(item => {
      console.log("Recipe item:", item.title, item.imageUrl);
    });
  }, [recipeList]);

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
      <View style={styles.mainContent}>
        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search recipes"
              placeholderTextColor="#467e53"
              mode="flat"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              keyboardType="default"
              cursorColor="#467e53"
              style={styles.recipeSearch}
              editable={true}
            />
            <IconButton
              icon="magnify"
              size={25}
              iconColor="#467e53"
              onPress={() => console.log("Recipe-search pressed")}
            />
          </View>
          <View style={styles.filterButton}>
            <IconButton
              icon="filter-outline"
              size={45}
              iconColor="#467e53"
              onPress={() => console.log("Recipe-filter pressed")}
            />
          </View>
        </View>

        <Text style={styles.headerText}>Recipes</Text>

        <ScrollView>
          {recipeList.map((item) => (
            <Pressable
              key={item.id}
              onPress={() =>
                navigation.navigate("RecipeDetail", { recipeId: item.id })
              }
            >
              <View style={styles.item}>
                <View style={styles.itemRow}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: item.imageUrl || "https://placehold.co/400" }}
                      style={styles.recipeThumbImage}
                    />
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    <View style={styles.itemDetails}>
                      <Text style={styles.detailText}>{item.category}</Text>
                      <Text style={styles.detailText}>{item.rating}</Text>
                      <Text style={styles.detailText}>{item.totalTime}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
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
    marginTop: StatusBar.currentHeight,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#467e53",
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: "contain",
  },
  mainContent: {
    flex: 1,
    padding: 16,
    marginBottom: 60, // leave space for bottom navigation
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    flex: 3,
    borderWidth: 2,
    borderColor: "#467e53",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  filterButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recipeSearch: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#467e53",
    fontSize: 14,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "#467e53",
    marginBottom: 12,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#467e53",
    marginBottom: 10,
    borderRadius: 10,
  },
  itemRow: {
    flexDirection: "row",
  },
  imageContainer: {
    marginRight: 10,
  },
  recipeThumbImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemContent: {
    justifyContent: "center",
  },
  itemTitle: {
    marginBottom: 6,
    maxWidth: 250,
    fontWeight: "bold",
    color: "#467e53",
    fontSize: 18,
    fontFamily: "serif",
  },
  itemDetails: {
    flexDirection: "row",
  },
  detailText: {
    marginRight: 12,
    color: "#467e53",
    fontWeight: "600",
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
    right: 0,
  },
});
