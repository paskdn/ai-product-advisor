import React from "react";
import { View, StyleSheet } from "react-native";

const SkeletonProductCard = () => (
  <View style={styles.productCard}>
    <View style={[styles.productImage, styles.skeleton]}>
      <View style={styles.skeletonShimmer} />
    </View>
    <View style={styles.productInfo}>
      <View style={[styles.skeletonText, { width: "40%", height: 12 }]} />
      <View
        style={[
          styles.skeletonText,
          { width: "80%", height: 16, marginTop: 4 },
        ]}
      />
      <View
        style={[
          styles.skeletonText,
          { width: "30%", height: 14, marginTop: 8 },
        ]}
      />
      <View
        style={[
          styles.skeletonText,
          { width: "90%", height: 12, marginTop: 8 },
        ]}
      />
      <View
        style={[
          styles.skeletonText,
          { width: "70%", height: 12, marginTop: 4 },
        ]}
      />
    </View>
  </View>
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
  skeleton: {
    backgroundColor: "#374151",
    overflow: "hidden",
  },
  skeletonShimmer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#4b5563",
    opacity: 0.7,
  },
  skeletonText: {
    backgroundColor: "#374151",
    borderRadius: 4,
    marginBottom: 4,
  },
});

export default SkeletonProductCard;
