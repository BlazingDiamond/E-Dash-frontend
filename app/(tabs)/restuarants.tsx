// app/restaurant/[id].tsx
//
// Navigate here with: router.push(`/restaurant/${restaurantId}`)
// e.g. router.push(`/restaurant/2`) for Karoo pot.

import { useLocalSearchParams, Stack } from "expo-router";
import {
  View,
  Text,
  Image,
  SectionList,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { food, restaurant, FoodItem } from "@/constants/logic"; // adjust path to wherever data.ts lives

type Section = {
  title: string;
  data: FoodItem[];
};

export default function RestaurantMenuScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();

  const currentRestaurant = restaurant.find((r) => r.id === id);

  if (!currentRestaurant) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>We couldn't find that restaurant.</Text>
      </View>
    );
  }

  const items = food.filter((f) => f.restaurantId === id);

  // Group items by category, preserving first-seen order & label
  const sections: Section[] = [];
  const sectionIndex = new Map<string, number>();

  for (const item of items) {
    if (!sectionIndex.has(item.category)) {
      sectionIndex.set(item.category, sections.length);
      sections.push({ title: item.categorylabel, data: [] });
    }
    sections[sectionIndex.get(item.category)!].data.push(item);
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: currentRestaurant.name }} />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        ListHeaderComponent={
          <RestaurantHeader restaurant={currentRestaurant} width={width} />
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>
              No menu items yet for {currentRestaurant.name}.
            </Text>
          </View>
        }
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => <FoodRow item={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

function RestaurantHeader({
  restaurant: r,
  width,
}: {
  restaurant: (typeof restaurant)[number];
  width: number;
}) {
  return (
    <View>
      <Image
        source={{ uri: r.img }}
        style={{ width, height: width * 0.5 }}
        resizeMode="cover"
      />
      <View style={styles.headerInfo}>
        <Text style={styles.restaurantName}>{r.name}</Text>
        <Text style={styles.restaurantDescription}>{r.description}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{r.reviews}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.metaText}>{r.distance}</Text>
        </View>
      </View>
    </View>
  );
}

function FoodRow({ item }: { item: FoodItem }) {
  return (
    <View style={[styles.row, item.soldout && styles.rowSoldOut]}>
      <View style={styles.rowText}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
        {item.soldout && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge ?? "Sold out"}</Text>
          </View>
        )}
      </View>
      <Image
        source={{ uri: item.img }}
        style={[styles.itemImage, item.soldout && styles.itemImageSoldOut]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  errorText: { fontSize: 16, color: "#666" },
  emptyText: { fontSize: 14, color: "#888" },

  headerInfo: { padding: 16, gap: 4 },
  restaurantName: { fontSize: 22, fontWeight: "700" },
  restaurantDescription: { fontSize: 14, color: "#555" },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 6, gap: 6 },
  metaText: { fontSize: 13, color: "#777" },
  metaDot: { fontSize: 13, color: "#ccc" },

  sectionHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#eee",
  },
  sectionHeaderText: { fontSize: 18, fontWeight: "700" },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f0f0f0",
    gap: 12,
  },
  rowSoldOut: { opacity: 0.6 },
  rowText: { flex: 1, gap: 4 },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemDescription: { fontSize: 13, color: "#777" },
  itemPrice: { fontSize: 14, fontWeight: "500", marginTop: 2 },

  itemImage: {
    width: 84,
    height: 84,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  itemImageSoldOut: { opacity: 0.5 },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#eee",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 2,
  },
  badgeText: { fontSize: 11, fontWeight: "600", color: "#555" },
});
