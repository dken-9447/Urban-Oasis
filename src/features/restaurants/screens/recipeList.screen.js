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
              placeholderTextColor="#A7A7A7"
              mode="flat"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              keyboardType="default"
              cursorColor="#A7A7A7"
              style={styles.recipeSearch}
              editable={true}
            />
            <IconButton
              icon="magnify"
              size={25}
              iconColor="#A7A7A7"
              onPress={() => console.log("Recipe-search pressed")}
            />
          </View>
          <View style={styles.filterButton}>
            <IconButton
              icon="filter-outline"
              size={45}
              iconColor="#7FA184"
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
          size={45}
          iconColor="white"
          onPress={() => console.log("Basket-outline pressed")}
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
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#7FA184",
    borderBottomWidth: 2, 
    borderBottomColor: "#5E7147", 
  },  
  logo: {
    width: 150,
    height: 40,
    resizeMode: "contain",
  },
  mainContent: {
    flex: 1,
    padding: 16,
    marginBottom: 60,
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    flex: 3,
    borderWidth: 2,
    borderColor: "#A7A7A7",
    backgroundColor: "#FFFFFF", 
    borderRadius: 25,
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
    color: "#A7A7A7",
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
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF", 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 3 }, 
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, 
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
    flexWrap: "nowrap",
    justifyContent: "flex-start", 
    gap: 10,
    width: "100%",
    overflow: "hidden",
  },
  detailText: {
    minWidth: "10%", 
    maxWidth: "45%", 
    marginBottom: 6,
    color: "#467e53",
    fontWeight: "600",
    backgroundColor: "#ECECEC",
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    textAlign: "center",
  },  
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 0,
    backgroundColor: "#7FA184",
    borderTopColor: "#5E7147", 
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
