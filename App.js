import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, Paragraph, Searchbar, Title } from "react-native-paper";

// Android-only screen resizing for top margin, otherwise MarginTop reverts to SafeAreaView for iOS
console.log(StatusBar.currentHeight);

// Bottom NavBar
const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

export default function App() {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <View style={styles.search}>
                    <Searchbar />
                </View>
                <View style={styles.list}>
                    <Text>Welcome to the Fresh Side of Life!</Text>
                </View>
                <View>
                    <Card>
                        <Card.Cover
                            source={require("../Urban-Oasis/assets/urban-oasis-card.png")}
                        />
                        <Card.Content>
                            <Title>Urban Oasis</Title>
                            <Paragraph>lorem ipsum</Paragraph>
                        </Card.Content>
                    </Card>
                </View>
                <View style={styles.bottomnNav}>
                    <Text>Placeholder for bottom navbar</Text>
                </View>
            </SafeAreaView>
            <ExpoStatusBar style="auto" />
        </>
    );
}
const styles = StyleSheet.create({
    container: { flexGrow: 0.25, marginTop: StatusBar.currentHeight },
    search: { padding: 16, backgroundColor: "white" },
    list: { flex: 1, padding: 16, backgroundColor: "green" },
    bottomnNav: { flexGrow: 1, padding: 16, backgroundColor: "white" }
});
