import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { FontAwesome } from "@expo/vector-icons";
import { COLOR } from "../utils/constants";

const ScanAnimation = () => {
  const centerX = 150; // Coordonnée X du centre de la vue
  const centerY = 150; // Coordonnée Y du centre de la vue
  const radius = 20; // Rayon du cercle

  const animatedProgress = useSharedValue(0);
  const animateLoop = () => {
    animatedProgress.value = 0;
    animatedProgress.value = withTiming(1000000, {
      duration: 2000000000,
      easing: Easing.linear,
    });
  };
  useEffect(() => {
    animateLoop();
    const interval = setInterval(() => {
      animateLoop(); // Appeler la fonction animateLoop périodiquement
    }, 2000000000); // Toutes les deux secondes

    return () => {
      clearInterval(interval); // Nettoyer le minuteur lorsque le composant est démonté
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const angle = animatedProgress.value * 2 * Math.PI;
    const translateX = radius * Math.cos(angle);
    const translateY = radius * Math.sin(angle);

    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={animatedStyle}>
        <FontAwesome color={COLOR.DISABLE} name="search" size={30} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingBottom: 30,
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: "blue", // Couleur de fond de l'icône
    borderRadius: 25, // Pour rendre l'icône circulaire
  },
});

export default ScanAnimation;
