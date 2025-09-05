export const findProductInCatalog = (catalog, productName, brand) => {
  return catalog.find(
    (p) =>
      p.product_name.toLowerCase() === productName.toLowerCase() &&
      p.brand.toLowerCase() === brand.toLowerCase()
  );
};

export const processRecommendations = (recommendations, catalog) => {
  return recommendations
    .map((rec) => {
      const product = findProductInCatalog(
        catalog,
        rec.product_name,
        rec.brand
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

export const formatCatalogForPrompt = (catalog) => {
  return JSON.stringify(catalog, null, 2);
};

export const formatProductDetails = (product) => {
  return `${product.description}\n\nPrice: ₹${product.price.toLocaleString(
    "en-IN"
  )}\nBrand: ${product.brand}`;
};
