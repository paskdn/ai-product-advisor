import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import TabNavigator from "./src/navigation/TabNavigator";
import AdvisorScreen from "./src/screens/AdvisorScreen";
import ProductDetailsScreen from "./src/screens/ProductDetailsScreen";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { AlertProvider } from "./src/context/AlertContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AlertProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <SafeAreaView style={styles.container}>
              <StatusBar
                barStyle="light-content"
                backgroundColor="#1f2937"
                translucent={false}
              />
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="MainTabs" component={TabNavigator} />
                <Stack.Screen name="Advisor" component={AdvisorScreen} />
                <Stack.Screen
                  name="ProductDetails"
                  component={ProductDetailsScreen}
                />
              </Stack.Navigator>
            </SafeAreaView>
          </NavigationContainer>
        </FavoritesProvider>
      </AlertProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f2937",
  },
});
