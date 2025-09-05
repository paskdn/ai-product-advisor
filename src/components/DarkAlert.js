import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";

export const DarkAlert = ({
  visible,
  title,
  message,
  actions = [{ text: "OK" }],
  onClose,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.94)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 20,
          bounciness: 6,
        }),
      ]).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }).start();
    }
  }, [opacity, scale, visible]);

  const handlePress = (a) => {
    a.onPress && a.onPress();
    onClose && onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Animated.View style={[styles.backdrop, { opacity }]} />
      <View style={styles.centerWrap} pointerEvents={visible ? "auto" : "none"}>
        <Animated.View
          style={[styles.card, { transform: [{ scale }], opacity }]}
        >
          {title ? <Text style={styles.title}>{title}</Text> : null}
          <Text style={styles.message}>{message}</Text>
          <View style={styles.actionsRow}>
            {actions.map((a, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handlePress(a)}
                activeOpacity={0.8}
                style={[
                  styles.actionBtn,
                  a.tone === "destructive" && styles.destructive,
                  a.tone === "success" && styles.success,
                ]}
              >
                <Text
                  style={[
                    styles.actionText,
                    a.tone === "destructive" && styles.destructiveText,
                  ]}
                >
                  {a.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centerWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  card: {
    backgroundColor: "#1f2937",
    borderRadius: 18,
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: "#d1d5db",
    marginBottom: 18,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flexWrap: "wrap",
    gap: 12,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#374151",
  },
  actionText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  destructive: {
    backgroundColor: "#4b1120",
  },
  destructiveText: {
    color: "#fca5a5",
  },
  success: {
    backgroundColor: "#065f46",
  },
});

export default DarkAlert;
