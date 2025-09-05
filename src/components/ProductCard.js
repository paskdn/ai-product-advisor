import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  formatPrice,
  getConfidenceColor,
  formatConfidencePercentage,
} from "../utils/formatters";
import { UI_TEXT } from "../utils/constants";
import { useFavorites } from "../context/FavoritesContext";

const ProductCard = React.memo(
  ({
    product,
    onPress,
    showReason = false,
    reason = "",
    confidence,
    showFavoriteButton = true,
  }) => {
    const { toggleFavorite, isFavorite } = useFavorites();
    const hasConfidence = confidence !== undefined && confidence !== null;

    const handleFavoritePress = (e) => {
      e.stopPropagation();
      toggleFavorite(product);
    };

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={onPress}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${product.product_name} by ${product.brand}`}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.productName} numberOfLines={2}>
              {product.product_name}
            </Text>
            {hasConfidence && (
              <View style={styles.matchIndicator}>
                <Text
                  style={[
                    styles.matchText,
                    { color: getConfidenceColor(confidence) },
                  ]}
                >
                  {formatConfidencePercentage(confidence)}% match
                </Text>
              </View>
            )}
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
            {showFavoriteButton && (
              <TouchableOpacity
                onPress={handleFavoritePress}
                style={styles.favoriteButton}
                activeOpacity={0.7}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                <Ionicons
                  name={isFavorite(product.id) ? "heart" : "heart-outline"}
                  size={20}
                  color={isFavorite(product.id) ? "#ef4444" : "#9ca3af"}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={styles.metaContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>

        <Text style={styles.description} numberOfLines={3}>
          {product.description}
        </Text>

        {showReason && reason && (
          <View style={styles.reasonContainer}>
            <Text style={styles.reasonLabel}>{UI_TEXT.REASON_LABEL}</Text>
            <Text style={styles.reason}>{reason}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    lineHeight: 24,
    marginBottom: 8,
  },
  matchIndicator: {
    alignSelf: "flex-start",
  },
  matchText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  priceContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    textAlign: "right",
    marginBottom: 4,
  },
  favoriteButton: {
    padding: 4,
    borderRadius: 12,
    backgroundColor: "#F8F8F8",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  brand: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666666",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  category: {
    fontSize: 12,
    color: "#888888",
    fontStyle: "italic",
  },
  description: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 20,
    marginBottom: 8,
  },
  reasonContainer: {
    backgroundColor: "#F0F8F0",
    borderRadius: 12,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#E8F5E8",
  },
  reasonLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: 10,
  },
  reason: {
    fontSize: 15,
    color: "#1B5E20",
    lineHeight: 22,
    fontWeight: "500",
  },
});

export default ProductCard;
