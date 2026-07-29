import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
//import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

type LocationState =
  | { status: "loading" }
  | { status: "denied"; message: string }
  | { status: "error"; message: string }
  | { status: "ready"; latitude: number; longitude: number };

const DEFAULT_DELTA = 0.01;

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const [locationState, setLocationState] = useState<LocationState>({
    status: "loading",
  });

  useEffect(() => {
    let isMounted = true;

    const loadLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (!isMounted) return;

      if (status !== "granted") {
        setLocationState({
          status: "denied",
          message:
            "Location access is needed to show your position on the map.",
        });
        return;
      }

      try {
        const position = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        if (!isMounted) return;

        setLocationState({
          status: "ready",
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      } catch {
        if (!isMounted) return;

        setLocationState({
          status: "error",
          message: "Unable to determine your current location.",
        });
      }
    };

    loadLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (locationState.status !== "ready" || !mapRef.current) return;

    const region: Region = {
      latitude: locationState.latitude,
      longitude: locationState.longitude,
      latitudeDelta: DEFAULT_DELTA,
      longitudeDelta: DEFAULT_DELTA,
    };

    mapRef.current.animateToRegion(region, 600);
  }, [locationState]);

  if (locationState.status === "loading") {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0047AB" />
        <Text style={styles.statusText}>Getting your location...</Text>
      </View>
    );
  }

  if (locationState.status !== "ready") {
    return (
      <View style={styles.centered}>
        <Text style={styles.statusTitle}>Location unavailable</Text>
        <Text style={styles.statusText}>{locationState.message}</Text>
      </View>
    );
  }

  const { latitude, longitude } = locationState;

  return (
    <View></View>
    // <MapView
    //   ref={mapRef}
    //   style={styles.map}
    //   provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
    //   initialRegion={{
    //     latitude,
    //     longitude,
    //     latitudeDelta: DEFAULT_DELTA,
    //     longitudeDelta: DEFAULT_DELTA,
    //   }}
    //   showsUserLocation
    //   showsMyLocationButton={Platform.OS === "android"}
    // >
    //   <Marker
    //     coordinate={{ latitude, longitude }}
    //     title="You are here"
    //     description="Your current location"
    //   />
    // </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: "#FFFFFF",
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 8,
    textAlign: "center",
  },
  statusText: {
    fontSize: 15,
    color: "#666666",
    textAlign: "center",
    marginTop: 12,
  },
});
