import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Pressable,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const handleEmail = () => {
  const subject = encodeURIComponent(
    "🚀 Let's talk - Senior Full Stack Developer",
  );
  const body = encodeURIComponent(
    `Hi Kuladeepu,\n\nWe saw your AI Product Advisor demo and want to explore a Senior Full Stack Developer opportunity.\n\n...`,
  );
  Linking.openURL(
    `mailto:kuladeepu@outlook.com?subject=${subject}&body=${body}`,
  );
};

const WelcomeScreen = ({ navigation }) => {
  const [showHire, setShowHire] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const hintPulse = useRef(new Animated.Value(0)).current;
  const hireAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      pulse.setValue(0);
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    };
    const raf = requestAnimationFrame(start);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [pulse]);

  useEffect(() => {
    const sequence = Animated.loop(
      Animated.sequence([
        Animated.timing(hintPulse, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.timing(hintPulse, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
      ]),
    );
    sequence.start();
    return () => sequence.stop();
  }, [hintPulse]);

  const ringScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2],
  });
  const ringOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0],
  });

  const revealHire = () => {
    if (showHire) return;
    setShowHire(true);
    hireAnim.setValue(0);
    Animated.timing(hireAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideHire = () => {
    Animated.timing(hireAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowHire(false));
  };

  const animatePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 35,
      bounciness: 10,
    }).start();
  };

  const animatePressOut = () => {
    Animated.spring(scale, {
      toValue: 1.08,
      useNativeDriver: true,
      speed: 18,
      bounciness: 18,
    }).start(() => {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 14,
      }).start();
      revealHire();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Pressable
          onPressIn={animatePressIn}
          onPressOut={animatePressOut}
          onLongPress={revealHire}
          delayLongPress={500}
          hitSlop={16}
        >
          <View>
            <Animated.View
              pointerEvents="none"
              style={[
                styles.pulseRing,
                { opacity: ringOpacity, transform: [{ scale: ringScale }] },
              ]}
            />
            <Animated.View style={[styles.aiIcon, { transform: [{ scale }] }]}>
              <Text style={styles.aiText}>AI</Text>
              <View style={styles.dot1} />
              <View style={styles.dot2} />
              <View style={styles.dot3} />
            </Animated.View>
          </View>
        </Pressable>
        <View style={styles.hintSlot} pointerEvents="none">
          <Animated.Text
            style={[styles.hintText, { opacity: showHire ? 0 : hintPulse }]}
          >
            Tap or long-press the logo
          </Animated.Text>
        </View>
      </View>

      <Text style={styles.heading}>Find your perfect product.</Text>

      <Text style={styles.subtitle}>
        Tell us what you&apos;re looking for, and our AI will find the best
        options for you.
      </Text>

      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate("Search")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      {showHire && (
        <Animated.View
          pointerEvents={showHire ? "auto" : "none"}
          style={[
            styles.hireOverlay,
            {
              opacity: hireAnim,
              transform: [
                {
                  translateY: hireAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [40, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.hireCard}>
            <TouchableOpacity onPress={hideHire} style={styles.closeIconButton}>
              <Ionicons name="close" size={20} color="#9ca3af" />
            </TouchableOpacity>
            <Text style={styles.hireTitle}>✨ Impressive, right?</Text>
            <Text style={styles.hireText}>
              This AI-powered product advisor was built with React Native, smart
              recommendations, and smooth UX. Looking for this level of quality
              on your team?
            </Text>
            <TouchableOpacity onPress={handleEmail} style={styles.emailButton}>
              <View style={styles.emailContent}>
                <Text style={styles.emailButtonText}>
                  kuladeepu@outlook.com
                </Text>
                <Ionicons
                  name="open-outline"
                  size={16}
                  color="#10b981"
                  style={styles.openIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 48,
    position: "relative",
    alignItems: "center",
  },
  aiIcon: {
    width: 100,
    height: 100,
    backgroundColor: "#10b981",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  aiText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  dot1: {
    position: "absolute",
    width: 8,
    height: 8,
    backgroundColor: "#10b981",
    borderRadius: 4,
    top: -12,
    right: 8,
  },
  dot2: {
    position: "absolute",
    width: 6,
    height: 6,
    backgroundColor: "#10b981",
    borderRadius: 3,
    top: 8,
    right: -16,
  },
  dot3: {
    position: "absolute",
    width: 4,
    height: 4,
    backgroundColor: "#10b981",
    borderRadius: 2,
    bottom: -8,
    left: -12,
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
    maxWidth: 300,
  },
  getStartedButton: {
    backgroundColor: "#10b981",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 24,
    minWidth: 200,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  hireOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 24,
    paddingBottom: 32,
  },
  hireCard: {
    backgroundColor: "rgba(17,24,39,0.95)",
    borderWidth: 1,
    borderColor: "#1f2937",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    position: "relative",
  },
  hireTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  hireText: {
    fontSize: 14,
    color: "#d1d5db",
    lineHeight: 20,
    marginBottom: 8,
  },
  emailButton: {
    backgroundColor: "#0d2538",
    borderWidth: 1,
    borderColor: "#1f3847",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  emailContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  emailButtonText: {
    color: "#10b981",
    fontSize: 13,
    fontWeight: "600",
    flex: 1,
  },
  openIcon: {
    marginLeft: 8,
  },
  closeIconButton: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 4,
    borderRadius: 20,
    backgroundColor: "rgba(156, 163, 175, 0.1)",
  },
  pulseRing: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 40,
    backgroundColor: "#10b981",
    opacity: 0.3,
  },
  hintSlot: {
    height: 20,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  hintText: {
    color: "#9ca3af",
    fontSize: 12,
  },
});

export default WelcomeScreen;
