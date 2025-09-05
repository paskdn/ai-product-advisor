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
import { ERROR_MESSAGES } from "../utils";
import { useAlert } from "../context/AlertContext";
import SkeletonProductCard from "../components/SkeletonProductCard";
import AdvisorProductCard from "../components/AdvisorProductCard";

const generateProductKey = (item, index) => {
  return `${item.brand}-${item.product_name}-${index}`;
};

const validateSearchQuery = (query) => {
  if (!query || !query.trim()) {
    return { isValid: false, error: "Please enter a search query" };
  }
  if (query.trim().length < 3) {
    return {
      isValid: false,
      error: "Query must be at least 3 characters long",
    };
  }
  return { isValid: true };
};

const findProductInCatalog = (catalog, productName, brand) => {
  return catalog.find(
    (p) =>
      p.product_name.toLowerCase() === productName.toLowerCase() &&
      p.brand.toLowerCase() === brand.toLowerCase(),
  );
};

const processRecommendations = (recommendations, catalog) => {
  return recommendations
    .map((rec) => {
      const product = findProductInCatalog(
        catalog,
        rec.product_name,
        rec.brand,
      );
      return product
        ? {
            ...product,
            reason: rec.reason,
            confidence: rec.confidence_score,
          }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.confidence - a.confidence);
};

const AdvisorScreen = ({ navigation }) => {
  const { showAlert } = useAlert();
  const [query, setQuery] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedReasons, setExpandedReasons] = useState({});
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const searchProducts = async () => {
    const validation = validateSearchQuery(query);
    if (!validation.isValid) {
      showAlert("Error", validation.error);
      return;
    }

    Keyboard.dismiss();

    setRecommendations([]);
    setExpandedReasons({});
    setIsLoading(true);
    setLastSearchQuery(query);
    setHasSearched(true);

    try {
      const aiResponse = await getProductRecommendations(
        query,
        PRODUCT_CATALOG,
      );
      const limited = (aiResponse.recommendations || []).slice(0, 5);
      const matchedProducts = processRecommendations(limited, PRODUCT_CATALOG);
      setRecommendations(matchedProducts);
    } catch (_error) {
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
    [navigation],
  );

  const renderProduct = useCallback(
    ({ item }) => (
      <AdvisorProductCard
        item={item}
        onPress={handleProductPress}
        expandedReasons={expandedReasons}
        onToggleReason={toggleReason}
      />
    ),
    [expandedReasons, toggleReason, handleProductPress],
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

      {isLoading && hasSearched && (
        <View style={styles.resultsSection}>
          <View style={styles.productsList}>
            {[1, 2, 3].map((index) => (
              <SkeletonProductCard key={index} />
            ))}
          </View>
        </View>
      )}

      {!isLoading && recommendations.length > 0 && (
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>
            {recommendations.length} Recommendations...
          </Text>

          <FlatList
            data={recommendations}
            renderItem={renderProduct}
            keyExtractor={generateProductKey}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        </View>
      )}

      {!isLoading && recommendations.length === 0 && hasSearched && (
        <View style={styles.emptyState}>
          <Ionicons
            name="search-outline"
            size={48}
            color="#6b7280"
            style={{ marginBottom: 16 }}
          />
          <Text style={styles.emptyTitle}>No matches found</Text>
          <Text style={styles.emptyText}>
            Try different keywords or be more specific about your needs.
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => setQuery("")}
            activeOpacity={0.7}
          >
            <Text style={styles.retryButtonText}>Try a new search</Text>
          </TouchableOpacity>
        </View>
      )}

      {!hasSearched && !isLoading && (
        <View style={styles.welcomeState}>
          <Ionicons
            name="sparkles"
            size={64}
            color="#10b981"
            style={{ marginBottom: 24 }}
          />
          <Text style={styles.welcomeTitle}>AI Product Advisor</Text>
          <Text style={styles.welcomeText}>
            Describe what you&apos;re looking for and let AI find the perfect
            products for you.{"\n\n"}
            Try: &quot;Budget laptop for programming&quot; or &quot;Wireless
            headphones for gym&quot;
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
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#10b981",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  welcomeState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 24,
  },
  inlineLoadingWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default AdvisorScreen;
