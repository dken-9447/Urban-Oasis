import * as React from "react";
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    Linking,
    StyleSheet,
    Dimensions,
    Animated
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-svg-rating";
<<<<<<< HEAD
import { MaterialCommunityIcons } from "@expo/vector-icons";
=======
import { useState } from "react";
>>>>>>> fbbf75d63d9f15d26a9d66d572abe67cdcb3152e

const screenWidth = Dimensions.get("window").width;

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
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.97,
            useNativeDriver: true,
            friction: 5
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 5
        }).start();
    };

    const handleNavigate = () => {
        if (!id) return;
        navigation.navigate("StoreDetailScreen", { storeId: id });
    };

<<<<<<< HEAD
  return (
    <TouchableWithoutFeedback
    onPressIn={handlePressIn}
    onPressOut={handlePressOut}
    onPress={handleNavigate}
    >
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

        <View style={styles.details}>
            <View style={styles.titleRow}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.ratingBox}>
                <StarRating
                rating={Number(userRating)}
                maxStars={5}
                starSize={25}
                color="#fdd835"
                borderColor="#fdd835"
                enableHalfStar
                starStyle={{ marginHorizontal: 1 }}
                />
            </View>
            </View>
=======
    return (
        <TouchableWithoutFeedback
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handleNavigate}>
            <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
                <View style={styles.card}>
                    <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />

                    <View style={styles.details}>
                        <View style={styles.titleRow}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.title}>{title}</Text>
                            </View>
                            <View style={styles.ratingBox}>
                                <StarRating
                                    rating={Number(userRating)}
                                    maxStars={5}
                                    starSize={24}
                                    color="#fdd835"
                                    borderColor="#fdd835"
                                    enableHalfStar={true}
                                    starStyle={{ marginHorizontal: 1 }}
                                    onChange={() =>
                                        console.log(
                                            "This is a debugging button for the star rating. // future update"
                                        )
                                    }
                                />
                            </View>
                        </View>
>>>>>>> fbbf75d63d9f15d26a9d66d572abe67cdcb3152e

                        {typeOfStore && <Text style={styles.type}>{typeOfStore}</Text>}

<<<<<<< HEAD
            {description && (
            <Text style={styles.description} numberOfLines={3}>
                {description}
            </Text>
            )}

            {/* Address now links to Google Maps */}
            {googleMapsLink && (
            <TouchableWithoutFeedback onPress={() => Linking.openURL(googleMapsLink)}>
                <View style={styles.iconRow}>
                <MaterialCommunityIcons name="map-marker" size={16} color="#705E4E" style={styles.icon} />
                <Text style={styles.link}>{address}</Text>
                </View>
            </TouchableWithoutFeedback>
            )}

            {website && (
            <TouchableWithoutFeedback onPress={() => Linking.openURL(website)}>
                <View style={styles.iconRow}>
                <MaterialCommunityIcons name="web" size={16} color="#705E4E" style={styles.icon} />
                <Text style={styles.link}>Visit Website</Text>
                </View>
            </TouchableWithoutFeedback>
            )}
        </View>
        </View>
    </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: screenWidth,
    alignItems: "center",
    marginBottom: 20
  },
  card: {
    width: "92%",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4
  },
  image: {
    width: "100%",
    height: 180
  },
  details: {
    padding: 16
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 6
  },
  titleWrapper: {
    flex: 1
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#705E4E",
    flexWrap: "wrap"
  },
  ratingBox: {
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: "transparent",
    padding: 4,
    borderBottomLeftRadius: 4
  },
  type: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6
  },
  icon: {
    marginRight: 6
  },
  address: {
    fontSize: 13,
    color: "#444",
    flexShrink: 1
  },
  link: {
    fontSize: 14,
    color: "#1E90FF",
    flexShrink: 1
  }
=======
                        {description && (
                            <Text style={styles.description} numberOfLines={3}>
                                {description}
                            </Text>
                        )}

                        <Text style={styles.address}>📍 {address}</Text>

                        {website && (
                            <Text style={styles.link} onPress={() => Linking.openURL(website)}>
                                🌐 Visit Website
                            </Text>
                        )}
                        {googleMapsLink && (
                            <Text
                                style={styles.link}
                                onPress={() => Linking.openURL(googleMapsLink)}>
                                🗺️ Get Directions
                            </Text>
                        )}
                    </View>
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: screenWidth,
        alignItems: "center",
        marginBottom: 20
    },
    card: {
        width: "92%",
        backgroundColor: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 4
    },
    image: {
        width: "100%",
        height: 180
    },
    details: {
        padding: 16
    },
    titleRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: 8,
        marginBottom: 6
    },
    titleWrapper: {
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#705E4E",
        flexWrap: "wrap"
    },
    ratingBox: {
        backgroundColor: "transparent",
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderColor: "transparent",
        padding: 4,
        borderBottomLeftRadius: 4
    },
    type: {
        fontSize: 14,
        color: "#666",
        marginBottom: 6
    },
    description: {
        fontSize: 14,
        color: "#444",
        marginBottom: 10
    },
    address: {
        fontSize: 13,
        color: "#444",
        marginBottom: 8
    },
    link: {
        fontSize: 14,
        color: "#1E90FF",
        marginBottom: 4
    }
>>>>>>> fbbf75d63d9f15d26a9d66d572abe67cdcb3152e
});
