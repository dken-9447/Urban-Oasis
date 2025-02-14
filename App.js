import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StatusBar, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';

// Android-only screen resizing for top margin, otherwise MarginTop reverts to SafeAreaView for iOS
console.log(StatusBar.currentHeight);

export default function App() {
    return (
        <>
            <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                <View style={{ padding: 16, backgroundColor: 'green' }}>
                    <Text>Search</Text>
                </View>
                <View style={{ flex: 1, padding: 16, backgroundColor: 'blue' }}>
                    <Text>Welcome to the Fresh Side of Life!</Text>
                </View>
            </SafeAreaView>
            <ExpoStatusBar style="auto" />
        </>
    );
}
const styles = StyleSheet.create({});
