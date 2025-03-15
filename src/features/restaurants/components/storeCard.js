import * as React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-svg-rating";

export default function StoreCard({
    id,
    image,
    title,
    address,
    description,
    typeOfStore,
    userRating,
    website,
    googleMapsLink
}) {
    const navigation = useNavigation();
    //console.log("Storecard received id: ", id);

    return (
        <TouchableOpacity
            onPress={() => {
                //console.log("🔄 Navigating to StoreDetailScreen with id:", id);
                if (!id) {
                    console.error("❌ Error: StoreCard received an undefined id!");
                    return;
                }
                navigation.navigate("StoreDetailScreen", { storeId: id });
            }}>
            <View className="w-full bg-white dark:bg-gray-50/100 rounded-3xl p-5 my-5">
                {/* Store Image */}
                <View className="bg-white rounded-xl">
                    <Image
                        source={{ uri: image }}
                        className="w-full h-72"
                        resizeMode="cover"
                        style={{ borderRadius: 20 }}
                    />
                </View>

                {/* Store Details */}
                <View className="mt-5">
                    {/* Store Name & Rating */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "nowrap"
                        }}>
                        <Text
                            className="text-xl font-extrabold dark:text-white my-3"
                            style={{ flex: 1, flexShrink: 1, maxWidth: "80%" }}>
                            {title}
                        </Text>

                        {/* Star Rating */}
                        <StarRating
                            rating={Number(userRating)}
                            maxStars={5}
                            starSize={20}
                            color="#fdd835"
                            borderColor="#fdd835"
                            enableHalfStar={true}
                        />
                    </View>

                    <Text className="text-lg font-semibold text-black/70 mb-3">{typeOfStore}</Text>
                    <Text numberOfLines={2} className="text-black/60 dark:text-white/70">
                        {description}
                    </Text>

                    {/* Address */}
                    <Text className="text-sm mt-3">📍 {address}</Text>

                    {/* Website Link */}
                    {website && (
                        <TouchableOpacity onPress={() => Linking.openURL(website)}>
                            <Text className="text-blue-600 dark:text-blue-400 mt-2">
                                🌐 Visit Website
                            </Text>
                        </TouchableOpacity>
                    )}

                    {/* Google Maps Link */}
                    {googleMapsLink && (
                        <TouchableOpacity onPress={() => Linking.openURL(googleMapsLink)}>
                            <Text className="text-blue-600 dark:text-blue-400 mt-2">
                                🗺️ Get Directions
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
}
