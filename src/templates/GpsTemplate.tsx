import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Search, MapPin, Navigation, Focus } from 'lucide-react-native';

export default function MapTemplate() {
    // Coordonnées initiales (ex: Paris)
    const [region, setRegion] = useState({
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    return (
        <View className="flex-1">
            {/* 1. La Carte */}
            <MapView
                provider={PROVIDER_GOOGLE} // Utilise Google Maps sur Android/iOS
                className="w-full h-full"
                initialRegion={region}
                onRegionChangeComplete={setRegion}
            >
                {/* Marqueur de test */}
                <Marker
                    coordinate={{ latitude: 48.8566, longitude: 2.3522 }}
                    title="Véhicule #12"
                    description="Peugeot 205 - En mouvement"
                >
                    <View className="bg-green-500 p-2 rounded-full border-2 border-white shadow-lg">
                        <MapPin size={20} color="white" />
                    </View>
                </Marker>
            </MapView>

            {/* 2. Barre de recherche flottante */}
            <View className="absolute top-12 left-4 right-4 flex-row items-center bg-white h-14 rounded-2xl px-4 shadow-xl border border-zinc-100">
                <Search size={20} color="#71717a" />
                <TextInput
                    placeholder="Rechercher un véhicule..."
                    className="flex-1 ml-3 font-semibold text-zinc-900"
                    placeholderTextColor="#a1a1aa"
                />
                <TouchableOpacity className="p-2 bg-zinc-50 rounded-xl">
                    <Focus size={20} color="#3f3f46" />
                </TouchableOpacity>
            </View>

            {/* 3. Boutons d'actions rapides (Flottants en bas) */}
            <View className="absolute bottom-10 right-6 gap-4">
                <TouchableOpacity className="bg-white w-12 h-12 rounded-full items-center justify-center shadow-lg border border-zinc-100">
                    <Navigation size={22} color="#16a34a" />
                </TouchableOpacity>
                
                <TouchableOpacity className="bg-green-500 px-6 h-14 rounded-2xl flex-row items-center shadow-xl">
                    <MapPin size={20} color="white" />
                    <Text className="text-white font-black ml-2 uppercase tracking-widest text-xs">
                        Ma Position
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}