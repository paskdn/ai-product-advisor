export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatPriceLocale = (price) => {
  return price.toLocaleString("en-IN");
};

export const getConfidenceColor = (confidence) => {
  if (confidence >= 0.8) return "#4CAF50";
  if (confidence >= 0.6) return "#FF9800";
  return "#F44336";
};

export const formatConfidencePercentage = (confidence) => {
  return Math.round(confidence * 100);
};

export const generateProductKey = (item, index) => {
  return `${item.brand}-${item.product_name}-${index}`;
};
