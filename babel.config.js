module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo", "nativewind/babel"],
        plugins: [
            "react-native-paper/babel",
            [
                "module:react-native-dotenv",
                {
                    envName: "APP_ENV",
                    moduleName: "@env",
                    path: ".env",
                    blocklist: null,
                    allowlist: null,
                    safe: false,
                    allowUndefined: true,
                    verbose: false
                }
            ],
            "react-native-reanimated/plugin"
        ]
    };
};
