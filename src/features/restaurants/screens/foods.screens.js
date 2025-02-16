import React from "react";
import { StatusBar, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { Card, Paragraph, Title } from "react-native-paper";

export const FoodsScreen = () => (
    <SafeAreaView style={styles.container}>
        <View style={styles.search}>
            <Searchbar />
        </View>
        <View style={styles.list}>
            <Text>Welcome to the Fresh Side of Life!</Text>
        </View>
        <View>
            <Card>
                <Card.Cover source={require("../../../../assets/urban-oasis-card.png")} />
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
);

const styles = StyleSheet.create({
    container: { flexGrow: 0.25, marginTop: StatusBar.currentHeight },
    search: { padding: 16, backgroundColor: "white" },
    list: { flex: 1, padding: 16, backgroundColor: "green" },
    bottomnNav: { flexGrow: 1, padding: 16, backgroundColor: "white" }
});
