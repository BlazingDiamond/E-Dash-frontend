// main home screen
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  // Handle category button presses (Blue Square Section)
  const handleCategoryPress = (categoryName: string) => {
    // Navigates to your restaurants tab and passes the selected category
    router.push({
      pathname: '/(tabs)/restuarants',
      params: { category: categoryName.toLowerCase() }
    });
  };

  // Handle restaurant card presses
  const handleRestaurantPress = (restaurantId: string) => {
    router.push({
      pathname: '/(tabs)/restuarants',
      params: { id: restaurantId }
    });
  };

  // Static data array for categories to keep the layout code clean
  const categories = [
    { name: 'Sushi', image: require('@/assets/images/Sushi.png') },
    { name: 'Pizza', image: require('@/assets/images/Pizza.png') },
    { name: 'Italian', image: require('@/assets/images/Italian.png') },
    { name: 'Chinese', image: require('@/assets/images/Chinese.png') },
  ];

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1D3D47' }}
      headerImage={
        <ThemedView style={styles.headerContainer}>
           <ThemedText type="defaultSemiBold">Search for an address</ThemedText>
           <ThemedText>Enter your address</ThemedText>
        </ThemedView>
      }>

      {/* 1. Search Bar */}
      <ThemedView style={styles.searchSection}>
        <Ionicons name="search-outline" size={20} color="#bab9b9" style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput} 
          placeholder="Food, restaurants, categories..." 
          placeholderTextColor="#888"
        />
      </ThemedView>

      {/* 2. Categories Horizontal Scroll (The buttons inside your Blue Square) */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((item) => (
          <Pressable 
            key={item.name} 
            style={({ pressed }) => [
              styles.categoryItem,
              pressed && styles.categoryPressed // Visual feedback when tapped
            ]}
            onPress={() => handleCategoryPress(item.name)}
          >
            <View style={styles.categoryCircle}>
              {/* Added Image inside the circle to match your screenshot icons */}
              <Image 
                source={item.image} 
                style={styles.categoryIcon} 
                contentFit="contain"
              />
            </View>
            <ThemedText style={styles.categoryText}>{item.name}</ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      {/* 3. Restaurants Section */}
      <ThemedView style={styles.sectionHeader}>
        <ThemedText type="subtitle">Restaurants (4)</ThemedText>
      </ThemedView>

      {/* Smitswinkel Card */}
      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} 
        onPress={() => handleRestaurantPress('smitswinkel')}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={require('@/assets/images/smitswinkel-header.png')} 
            style={styles.cardImage} 
          />
          <View style={styles.ratingBadge}>
            <ThemedText style={styles.ratingText}>⭐ 4.1 (2700+)</ThemedText>
          </View>
        </View>
        <ThemedView style={styles.cardInfo}>
          <ThemedText type="defaultSemiBold" style={styles.restaurantTitle}>
            Smitswinkel • <ThemedText style={styles.deliveryTime}>🕒 25-40 min</ThemedText>
          </ThemedText>
        </ThemedView>
      </Pressable>

      {/* Karoopot Card */}
      <Pressable 
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} 
        onPress={() => handleRestaurantPress('karoopot')}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={require('@/assets/images/karoopot-header.png')} 
            style={styles.cardImage} 
          />
          <View style={styles.ratingBadge}>
            <ThemedText style={styles.ratingText}>⭐ 4.0 (800+)</ThemedText>
          </View>
        </View>
        <ThemedView style={styles.cardInfo}>
          <ThemedText type="defaultSemiBold" style={styles.restaurantTitle}>
            Karoopot • <ThemedText style={styles.deliveryTime}>🕒 25-40 min</ThemedText>
          </ThemedText>
        </ThemedView>
      </Pressable>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    paddingTop: 60,
  },
  searchSection: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    marginHorizontal: 16,
    paddingHorizontal: 15,
    alignItems: 'center',
    height: 50,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  categoriesContainer: {
    paddingLeft: 16,
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  categoryPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }], // Gives a nice little pop when a food category button is clicked
  },
  categoryCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // Soft shadow around food circles to match UI design
    elevation: 2,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ff0000',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    elevation: 2, 
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }], 
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 180,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 15, 
    right: 15,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    elevation: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  cardInfo: {
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  restaurantTitle: {
    fontSize: 16,
    color: '#000000',
  },
  deliveryTime: {
    color: '#ffffff',
    fontSize: 14,
  },
});
