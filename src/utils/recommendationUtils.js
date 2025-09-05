export const extractProductId = (item) => item.id;

export const validateSearchQuery = (query) => {
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

export const findProductById = (catalog, productId) => {
  if (!catalog || !Array.isArray(catalog) || !productId) {
    console.warn("Invalid parameters for findProductById:", {
      catalog: !!catalog,
      productId,
    });
    return null;
  }

  const product = catalog.find((p) => p.id === productId);

  if (!product) {
    console.warn("Product not found in catalog by ID:", productId);
  }

  return product || null;
};

export const processRecommendations = (recommendations, catalog) => {
  if (
    !recommendations ||
    !Array.isArray(recommendations) ||
    !catalog ||
    !Array.isArray(catalog)
  ) {
    console.warn("Invalid parameters for processRecommendations:", {
      recommendations: !!recommendations,
      catalog: !!catalog,
    });
    return [];
  }

  return recommendations
    .map((rec) => {
      if (
        !rec.product_id ||
        !rec.reason ||
        typeof rec.confidence_score !== "number"
      ) {
        console.warn("Invalid recommendation structure:", rec);
        return null;
      }

      const product = findProductById(catalog, rec.product_id);

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
