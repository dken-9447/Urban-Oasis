import React from "react";
import { render, waitFor, screen } from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import StoresList from "../src/features/restaurants/components/storeList";

/**
 * Compared to J-unit, this is like importing test and assertions.assertEquals
 * the import statement for render will render my component.
 * the import statement for waitFor will wait for asynchronous updates.
 * the import statement for screen will query the screen.
 */

// This uses the real getLocations() function with a mock that returns a hard coded array of store data
// This will strictly test the function away from the backend
// NOTE: These are not real stores. These are dummy stores for unit testing.
jest.mock("../src/features/restaurants/components/data", () => ({
    getLocations: jest.fn().mockResolvedValue([
        {
            id: "1",
            title: "Fresh Farm Market",
            image: "https://placehold.co/400",
            address: "123 Fresh St",
            description: "A local farm market.",
            typeOfStore: "Produce",
            userRating: 4.5,
            isOpen: true,
            latitude: 33.7455,
            longitude: -117.8677,
            website: "",
            googleMapsLink: ""
        },
        {
            id: "2",
            title: "Healthy Bites",
            image: "https://placehold.co/400",
            address: "456 Green Ave",
            description: "Organic produce and healthy snacks.",
            typeOfStore: "Organic",
            userRating: 4.2,
            isOpen: false,
            latitude: 33.555,
            longitude: -117.8677,
            website: "",
            googleMapsLink: ""
        },
        {
            id: "3",
            title: "Pantry Pros",
            image: "https://placehold.co/400",
            address: "789 Pantry Rd",
            description: "Bulk pantry goods and essentials.",
            typeOfStore: "Pantry",
            userRating: 3.8,
            isOpen: true,
            latitude: 33.8121,
            longitude: -117.919,
            website: "",
            googleMapsLink: ""
        },
        {
            id: "4",
            title: "Daily Dairy",
            image: "https://placehold.co/400",
            address: "321 Cream Ln",
            description: "Fresh dairy products from local farms.",
            typeOfStore: "Dairy",
            userRating: 4.7,
            isOpen: true,
            latitude: 33.85,
            longitude: -117.9,
            website: "",
            googleMapsLink: ""
        },
        {
            id: "5",
            title: "Harvest House",
            image: "https://placehold.co/400",
            address: "654 Autumn Blvd",
            description: "All-natural produce and pantry staples.",
            typeOfStore: "Produce",
            userRating: 4.0,
            isOpen: false,
            latitude: 33.6,
            longitude: -117.8,
            website: "",
            googleMapsLink: ""
        }
    ])
}));

// This is the test class that will 'bundle' all the related tests
describe("StoresList Component", () => {
    // This is declaring a single test case
    it("displays multiple Store Cards when location data is provided", async () => {
        // This will render the Stores List component inside a mock NavigationContainer. Equivalent to setting up the environment your component needs to run.
        render(
            <NavigationContainer>
                <StoresList />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(screen.getByText("Fresh Farm Market")).toBeTruthy();
            expect(screen.getByText("Healthy Bites")).toBeTruthy();
        });
    });

    // Testing filterType field
    it("filters stores based on type of store", async () => {
        render(
            <NavigationContainer>
                <StoresList filterType="Produce" />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(screen.getByText("Fresh Farm Market")).toBeTruthy();
            expect(screen.queryByText("Healthy Bites")).toBeNull();
        });
    });

    // Testing showOnlyOpen field
    it("displays only stores that are currently open", async () => {
        render(
            <NavigationContainer>
                <StoresList showOnlyOpen={true} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(screen.getByText("Fresh Farm Market")).toBeTruthy();
            expect(screen.queryByText("Healthy Bites")).toBeNull();
        });
    });

    // Checking address, description, or rating fields
    it("displays store location info correctly", async () => {
        render(
            <NavigationContainer>
                <StoresList />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(screen.getByText(/123 Fresh St/)).toBeTruthy(); // allows partial match
        });
        await waitFor(() => {
            expect(screen.getByText(/A local farm market/)).toBeTruthy();
        });
    });

    // Filter by distance by providing stores with lat/lng and a mocker user location
    it("filters stores by distance to a given location", async () => {
        const mockLocation = { latitude: 33.7455, longitude: -117.8677 };
        render(
            <NavigationContainer>
                <StoresList userLocation={mockLocation} maxDistance={5000} />
            </NavigationContainer>
        );

        await waitFor(() => {
            expect(screen.getByText("Fresh Farm Market")).toBeTruthy();
            expect(screen.queryByText("Harvest House")).toBeNull();
        });
    });
});
