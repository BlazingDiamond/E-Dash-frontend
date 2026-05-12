//restuarants screen
//needs to be able to hold the description of the restuarant and the menu items, but it must only be one page. we will not make a new file for each restuarant.
import { Image } from "expo-image";
import { Platform, StyleSheet, Text } from "react-native";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <Text style={styles.restuarantText}>
        Restuarants, make it a universal restuarant description
      </Text>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  restuarantText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#999999",
    textAlign: "center",
    marginTop: 20,
  },
});
