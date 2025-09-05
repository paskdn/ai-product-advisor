import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AdvisorProductCard = ({
  item,
  onPress,
  expandedReasons,
  onToggleReason,
}) => (
  <TouchableOpacity
    style={styles.productCard}
    onPress={() => onPress(item)}
    activeOpacity={0.7}
  >
    <View style={styles.productImage}>
      <Ionicons name="image-outline" size={40} color="#9ca3af" />
    </View>

    <View style={styles.productInfo}>
      <Text style={styles.brandText}>{item.brand}</Text>
      <Text style={styles.productName}>{item.product_name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      {item.reason && (
        <View style={styles.reasonSection}>
          <TouchableOpacity
            style={styles.reasonToggle}
            onPress={() => onToggleReason(item.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.reasonToggleText}>Why this?</Text>
            <Ionicons
              name={expandedReasons[item.id] ? "chevron-up" : "chevron-down"}
              size={16}
              color="#10b981"
            />
          </TouchableOpacity>

          {expandedReasons[item.id] && (
            <View style={styles.reasonContent}>
              <Text style={styles.reasonText}>{item.reason}</Text>
              {item.confidence && (
                <Text style={styles.confidenceText}>
                  Match Score: {Math.round(item.confidence * 100)}%
                </Text>
              )}
            </View>
          )}
        </View>
      )}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#374151",
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: "#374151",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  brandText: {
    fontSize: 12,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#10b981",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#9ca3af",
    lineHeight: 20,
    marginBottom: 12,
  },
  reasonSection: {
    borderTopWidth: 1,
    borderTopColor: "#374151",
    paddingTop: 12,
  },
  reasonToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reasonToggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#10b981",
  },
  reasonContent: {
    marginTop: 8,
    paddingTop: 8,
  },
  reasonText: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 20,
    marginBottom: 4,
  },
  confidenceText: {
    fontSize: 12,
    color: "#9ca3af",
    fontStyle: "italic",
  },
});

export default AdvisorProductCard;
