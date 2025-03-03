import React from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { IconButton } from "react-native-paper";



export const RecipeDetailScreen = ({ navigation }) => {
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
      <View className="z-0">
        <Text>This is the recipe details page!</Text>
        <Text onPress={() => navigation.navigate("RecipeList")}>Return to Recipes</Text>
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
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#467e53",
    marginBottom: 10,
    borderRadius: 10
  },
  recipeThumbImage: {
    width: 80,
    height: 80,
    borderRadius: 10
  },
  recipeSearch: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#467e53",
    fontSize: 14,
    height: 8,
  }
});
