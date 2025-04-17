// src/features/restaurants/screens/storeList.screen.js

import React, { useState, useEffect } from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  Pressable,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";
import { TextInput, IconButton } from "react-native-paper"; 
import { Image } from "react-native";
import { useColorScheme } from "nativewind";
import { getLocations } from "../components/data";
import StoreCard from "../components/storeCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const StoreListScreen = ({ navigation }) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  // search state
  const [searchQuery, setSearchQuery] = useState("");

  // load & hold all stores
  const [stores, setStores]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const all = await getLocations();
        setStores(all);
      } catch (e) {
        console.error("Failed to fetch stores:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // filter by title
  const filteredStores = stores.filter(store =>
    store.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        {/* Top Navigation Bar */}
        <View style={styles.topBar}>
          <Image
            source={require("../../../../assets/urban-oasis-text-only.png")}
            style={styles.logo}
          />
        </View>

        {/* Search Row (filter icon removed) */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search grocery stores"
              placeholderTextColor="#A7A7A7"
              mode="flat"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              keyboardType="default"
              cursorColor="#A7A7A7"
              style={styles.recipeSearch}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <IconButton
              icon="magnify"
              size={25}
              iconColor="#A7A7A7"
              onPress={() => console.log("Search for:", searchQuery)}
            />
          </View>
        </View>

        {/* Header */}
        <View style={styles.headerRow}>
          <MaterialCommunityIcons
            name="basket"
            size={26}
            color="#705E4E"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.headerText}>Grocery Stores</Text>
        </View>

        {/* Main list of stores */}
        <View style={{ flex: 1 }}>
          {loading ? (
            <ActivityIndicator
              size="large"
              style={{ flex: 1, justifyContent: "center" }}
            />
          ) : (
            <FlatList
              data={filteredStores}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <StoreCard
                  id={item.id}
                  image={item.image}
                  title={item.title}
                  address={item.address}
                  description={item.description}
                  typeOfStore={item.typeOfStore}
                  userRating={item.userRating}
                  website={item.website}
                  googleMapsLink={item.googleMapsLink}
                />
              )}
            />
          )}
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomBar}>
          <IconButton
            icon="basket-outline"
            size={45}
            iconColor="#BCEDC3"
            onPress={() => navigation.navigate("StoresListScreen")}
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
            iconColor="white"
            onPress={() => navigation.navigate("RecipeList")}
          />
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#7FA184",
    borderBottomWidth: 2,
    borderBottomColor: "#5E7147"
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: "contain"
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 20,
    paddingHorizontal: 16,
    marginTop: 16
  },
  searchContainer: {
    flexDirection: "row",
    flex: 1, // expanded to fill full width
    borderWidth: 2,
    borderColor: "#A7A7A7",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  recipeSearch: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#A7A7A7",
    fontSize: 14
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12
  },
  headerText: {
    fontSize: 24,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "#705E4E"
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#7FA184",
    borderTopColor: "#5E7147",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});
