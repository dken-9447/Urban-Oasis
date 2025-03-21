module.exports = {
    preset: "jest-expo",
    transform: {
        "^.+\\.[jt]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
        "node_modules/(?!(jest-expo" +
            "|expo(nent)?" +
            "|@expo(nent)?" +
            "|expo-modules-core" +
            "|react-native" +
            "|@react-native" +
            "|@react-navigation" +
            "|@firebase" +
            "|firebase" +
            "|react-native-svg" +
            "|react-native-paper" +
            "|react-native-star-svg-rating" +
            "|react-native-css-interop" +
            ")/)"
    ],
    moduleNameMapper: {
        "^react-native-svg$": "<rootDir>/__mocks__/react-native-svg.js",
        "^react-native-star-svg-rating$": "<rootDir>/__mocks__/react-native-star-svg-rating.js"
    }
};
