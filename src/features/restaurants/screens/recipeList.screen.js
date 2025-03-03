import React from "react";
import {
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";

const recipes = [
    { 
        id: 1, 
        name: "Creamy Tuscan White Bean Skillet",
        category: "Italian",
        rating: "Medium",
        time: "30 minutes",
        image: "https://www.allrecipes.com/thmb/Er42_ZsBGqmyKLXSZrB4CmCy4Cs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8769362-Creamy-Tuscan-White-Bean-Skillet-ddmfs-Beauty-10491-630805bfa81c4de5a5cc6c8f55f9ce35.jpg",

    },
    { 
        id: 2, 
        name: "Tuscan Salmon",
        category: "Italian",
        rating: "Easy",
        time: "1 hour",
        image: "https://www.allrecipes.com/thmb/vykNCmNgKXagMTjC37o6Ard-Ank=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8673342_Tuscan-Salmon_Brenda-Venable_4x3.2-e1746990ad644bf58dd2f22c2160ca8c.jpg", 
    },
    { 
        id: 3, 
        name: "Slow Cooker Tuscan Chicken", 
        category: "Italian",
        rating: "Difficult",
        time: "1 1/2 hours",
        image: "https://www.allrecipes.com/thmb/YmDs8tjAz1VisZEJx5zgB6hhNVg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Slow-Cooker-Tuscan-Chicken-4x3-1-f86a87652bd34f5aa585b505f8e3aff9.jpg",
    },
    { 
        id: 4, 
        name: "One Pot Chicken Pomodoro",
        category: "Italian",
        rating: "Medium",
        time: "45 minutes",
        image: "https://www.allrecipes.com/thmb/VbtlQ7IEka83SzxEam_c4BANHIA=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/ALR-8730087-one-pot-chicken-pomodoro-recipe-VAT-4x3-1closeup-39a64dd4ec624e609e71f6f5133cd28a.jpg", 
    },
    { 
        id: 5, 
        name: "Sheet Pan General Tso's Chicken and Broccoli",
        category: "Asian",
        rating: "Medium",
        time: "1 hour",
        image: "https://www.allrecipes.com/thmb/gPQvlZIi5EUWQjtb0hh2S5y_hgE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8715504_Sheet-Pan-General-Tsos-Chicken-and-Broccoli_Nicole-Russell_4x3-e7136208213f4be2b59f3bb82797cf3e.jpg", 
    },
    { 
        id: 6, 
        name: "Veggie Lo Mein",
        category: "Asian",
        rating: "Easy",
        time: "25 minutes",
        image: "https://www.allrecipes.com/thmb/xrm5nC-UryvEKUR6eewce5jDrig=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8620468_Veggie-Lo-Mein_Pat-Bernitt_4x3-81ca9a7653fb4536a0da018ea024f311.jpg", 
    },
    { 
        id: 7, 
        name: "Yaki Udon",
        category: "Asian",
        rating: "Medium",
        time: "40 minutes",
        image: "https://www.allrecipes.com/thmb/BeiPKIvYnmn0GVq14nKDIKC27Lk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/yaki-udon-ddmfs-3x2-55-30ba570fed0a425595f9b1343ebd9c6e.jpg", 
    },
    { 
        id: 8, 
        name: "Mixed Vegetable Curry", 
        category: "Asian",
        rating: "Difficult",
        time: "1 hour",
        image: "https://www.allrecipes.com/thmb/EO0RuQlSz4rpbd27NWod1_AK6sc=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8737107_Mixed-Vegetable-Curry_Brenda-Venable_4x3-f65b0efec23f4ca5b923029abe5deb45.jpg",
    },
    { 
        id: 9, 
        name: "Blackened Shrimp Tacos with Pineapple",
        category: "Mexican",
        rating: "Medium",
        time: "40 minutes",
        image: "https://www.allrecipes.com/thmb/uWgYL40zm5CUQFv8BY4jK8PpKN0=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8629864_Blackened-Shrimp-and-Pineapple-Tacos_Maura-Rawlette_4x3-6d6cff4dfbb54e958b7577db16ab8311.jpg", 
    },
    { 
        id: 10, 
        name: "Marinated Grilled Flank Steak",
        category: "Mexican",
        rating: "Medium",
        time: "45 minutes",
        image: "https://www.allrecipes.com/thmb/B2nOqYY5hZ55jKnAxnAaFSSNJKY=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7368602KaluahMarinatedGrilledFlankSteak4x-c4bd840ecc334343a91b760ca2aa0590.jpg", 
    },
    { 
        id: 11, 
        name: "Salsa Chicken",
        category: "Mexican",
        rating: "Medium",
        time: "1 hour",
        image: "https://www.allrecipes.com/thmb/K02jKj-SGeuVQPMM53RKV_I_jlY=/0x512/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/AR-16700-salsa-chicken-DDMFS-4x3-0e54b044a6c9451e9e52bdc7118feefa.jpg",
    },
    { 
        id: 12, 
        name: "Veracruz-Style Whitefish",
        category: "Mexican",
        rating: "Difficult",
        time: "2 1/2 hours",
        image: "https://www.allrecipes.com/thmb/hhH9POy7Z31p_2LUa6wACiKoG48=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/7368544VeracryzStyleWhitefish-9e8181a69ca94323b19d6a9d9b1156c8.jpg", 
    },
  ];

const RowItem = ({ item }) => (
  <Pressable onPress={() => console.log("Recipe pressed")}>
  <View style={styles.item}>
    <View className="flex flex-row" >
      <View className="mr-3">
        <Image
          source={{uri: item.image}}
          style={styles.recipeThumbImage}
        />
      </View>
      <View className="mt-1">
        <Text className="mb-2 max-w-[250px] font-bold text-[#467e53] font-serif text-lg">{item.name}</Text>
        <View className="flex flex-row align-center font-semibold">
          <Text className="mr-6 text-[#467e53]">{item.category}</Text>
          <Text className="mr-6 text-[#467e53]">{item.rating}</Text>
          <Text className="mr-6 text-[#467e53]">{item.time}</Text>
        </View>
      </View>
    </View>
  </View>
  </Pressable>
);

export const RecipeListScreen = ({ navigation }) => {
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
      <View className="z-0 border-2 border-solid p-4 mb-2">
        {/* Search Bar */}
        <View className="flex-row mb-5"> 
          <View className="flex-row w-3/4 border-sold border-2 border-[#467e53] rounded-2xl px-4 py-2 mr-7">
            <TextInput
              placeholder="Search recipes"
              placeholderTextColor="#467e53"
              mode="flat"
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              //theme={{ colors: { primary: "#467e53", text: "black" } }}
              //value={address}
              //onChangeText={setAddress}
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
          <View className="content-right">
            <IconButton
              icon="filter-outline"
              size={45}
              iconColor="#467e53"
              onPress={() => console.log("Recipe-filter pressed")}
            />
          </View>
        </View>

        <Text className="text-3xl font-serif font-bold text-[#467e53] mb-2">Recipes</Text>

        <FlatList
          data={recipes}
          renderItem={({ item }) => <RowItem item={item} />}
          keyExtractor={(item) => item.id}
          horizontal={false} // Set to true for horizontal scrolling
        />
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
    borderRadius: 10,
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
