import React, { useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { useAlert } from "../context/AlertContext";

const ProductDetailsScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showAlert } = useAlert();

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleToggleFavorite = useCallback(() => {
    const wasAdded = !isFavorite(product.id);
    toggleFavorite(product);
    showAlert(
      "Favorites",
      wasAdded ? "Added to favorites!" : "Removed from favorites!",
      [{ text: "OK" }]
    );
  }, [product, toggleFavorite, isFavorite, showAlert]);

  const favorited = isFavorite(product.id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackPress}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <View style={styles.productImage}>
            <Ionicons name="image-outline" size={80} color="#9ca3af" />
          </View>
        </View>

        <View style={styles.productInfo}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.productName}>{product.product_name}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            favorited && styles.favoriteButtonActive,
          ]}
          onPress={handleToggleFavorite}
          activeOpacity={0.8}
        >
          <Ionicons
            name={favorited ? "heart" : "heart-outline"}
            size={20}
            color={favorited ? "#FFFFFF" : "#10b981"}
          />
          <Text
            style={[
              styles.favoriteButtonText,
              favorited && styles.favoriteButtonTextActive,
            ]}
          >
            {favorited ? "Remove from Favorites" : "Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#1f2937",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: 250,
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  productImage: {
    width: 200,
    height: 200,
    backgroundColor: "#374151",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  brand: {
    fontSize: 14,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  productName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
    lineHeight: 32,
  },
  price: {
    fontSize: 28,
    fontWeight: "700",
    color: "#10b981",
    marginBottom: 12,
  },
  categoryBadge: {
    backgroundColor: "#374151",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  categoryText: {
    fontSize: 12,
    color: "#9ca3af",
    fontWeight: "500",
  },
  descriptionSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: "#d1d5db",
    lineHeight: 24,
  },
  bottomSpacing: {
    height: 100,
  },
  bottomActions: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1f2937",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#10b981",
    paddingVertical: 16,
    borderRadius: 12,
  },
  favoriteButtonActive: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  favoriteButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#10b981",
    marginLeft: 8,
  },
  favoriteButtonTextActive: {
    color: "#FFFFFF",
  },
});

export default ProductDetailsScreen;
