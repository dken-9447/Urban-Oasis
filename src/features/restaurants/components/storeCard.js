import * as React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import StarRating from "react-native-star-svg-rating";

export default function StoreCard({
    image,
    title,
    address,
    description,
    typeOfStore,
    userRating,
    website,
    googleMapsLink
}) {
    const [count, setCount] = React.useState(1);
    return (
        <View className="w-full bg-white dark:bg-gray-50/100 rounded-3xl p-5 my-5">
            <View className="bg-white rounded-xl">
                <Image
                    source={{ uri: image }}
                    className="w-full h-72"
                    resizeMode="cover"
                    style={{ borderRadius: 20 }}
                />
            </View>
            <View className="mt-5">
                {/**Container for title and star rating */}
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

                    {/* Display the star rating */}
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
                <Text numberOfLines={2} className=" text-black/60 dark:text-white/70">
                    {description}
                </Text>

                {/**Website Link */}
                {website && (
                    <TouchableOpacity
                        className="mb-3 mt-3"
                        onPress={() => Linking.openURL(website)}>
                        <Text>Visit Website</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/**Google Maps Link */}
            {googleMapsLink && (
                <TouchableOpacity onPress={() => Linking.openURL(googleMapsLink)}>
                    <Text>Get Directions</Text>
                </TouchableOpacity>
            )}
            <Text>_________________________________________________________</Text>
            <Text className="text-sm mt-3">Address: {address}</Text>
        </View>
    );
}
