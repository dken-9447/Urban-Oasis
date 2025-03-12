import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useColorScheme } from "nativewind";
import StarRating from "react-native-star-svg-rating";

export default function StoreCard({ image, title, address, description, category, rating }) {
    const [count, setCount] = React.useState(1);
    const { colorScheme } = useColorScheme();
    return (
        <View className="w-full bg-white dark:bg-gray-50/100 rounded-3xl p-5 my-5">
            <View className="bg-white rounded-xl">
                <Image
                    source={{ uri: image }}
                    className="w-full h-72"
                    style={{ resizeMode: "contain", borderRadius: 15 }}
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
                        style={{ flex: 1, flexShrink: 1, maxWidth: "80%" }} // Prevents overflow
                    >
                        {title}
                    </Text>
                    {/* Display the star rating */}
                    <StarRating
                        rating={rating.rate} // use the rate from the rating prop
                        maxStars={5}
                        starSize={20}
                        color="#fdd835"
                        borderColor="#fdd835"
                        enableHalfStar={true}
                    />
                </View>
                <Text className="text-lg font-semibold text-black/70 mb-3">{category}</Text>
                <Text numberOfLines={2} className=" text-black/60 dark:text-white/70">
                    {description}
                </Text>
                <Text className="text-sm mt-3">Address: {address}</Text>
            </View>
        </View>
    );
}
