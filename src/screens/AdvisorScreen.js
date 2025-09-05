import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PRODUCT_CATALOG } from "../data/catalog";
import { getProductRecommendations } from "../services/aiService";
import {
  validateSearchQuery,
  processRecommendations,
  generateProductKey,
  ERROR_MESSAGES,
} from "../utils";
import { useAlert } from "../context/AlertContext";

const AdvisorScreen = ({ navigation }) => {
  const { showAlert } = useAlert();
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedReasons, setExpandedReasons] = useState({});

  const searchProducts = async () => {
    const validation = validateSearchQuery(query);
    if (!validation.isValid) {
      showAlert("Error", validation.error);
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);

    try {
      const aiResponse = await getProductRecommendations(
        query,
        PRODUCT_CATALOG
      );
      const limited = (aiResponse.recommendations || []).slice(0, 5);
      const matchedProducts = processRecommendations(limited, PRODUCT_CATALOG);
      setRecommendations(matchedProducts);
    } catch (error) {
      showAlert("Error", ERROR_MESSAGES.API_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReason = useCallback((productId) => {
    setExpandedReasons((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  }, []);

  const handleProductPress = useCallback(
    (product) => {
      navigation.navigate("ProductDetails", { product });
    },
    [navigation]
  );

  const renderProduct = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item)}
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
                onPress={() => toggleReason(item.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.reasonToggleText}>Why this?</Text>
                <Ionicons
                  name={
                    expandedReasons[item.id] ? "chevron-up" : "chevron-down"
                  }
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
    ),
    [expandedReasons, toggleReason, handleProductPress]
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Product Advisor</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.textInput}
          placeholder="Describe your needs... for example 'I need a laptop for video editing under $1500'"
          placeholderTextColor="#9ca3af"
          value={query}
          onChangeText={setQuery}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity
          style={[styles.recommendButton, isLoading && styles.disabledButton]}
          onPress={searchProducts}
          disabled={isLoading || !query.trim()}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <View style={styles.inlineLoadingWrapper}>
              <ActivityIndicator
                color="#FFFFFF"
                size="small"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.buttonText}>AI curating picks...</Text>
            </View>
          ) : (
            <Text style={styles.buttonText}>Get Recommendations</Text>
          )}
        </TouchableOpacity>
      </View>

      {recommendations.length > 0 && (
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>Recommended Products</Text>

          <FlatList
            data={recommendations}
            renderItem={renderProduct}
            keyExtractor={generateProductKey}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
      )}

      {!isLoading && recommendations.length === 0 && query.trim() && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No recommendations found. Try rephrasing your query.
          </Text>
        </View>
      )}
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
  menuButton: {
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
  inputSection: {
    padding: 20,
  },
  textInput: {
    backgroundColor: "#1f2937",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#FFFFFF",
    height: 120,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  recommendButton: {
    backgroundColor: "#10b981",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#6b7280",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  resultsSection: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  productsList: {
    paddingBottom: 20,
  },
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
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
  },
  inlineLoadingWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AdvisorScreen;
