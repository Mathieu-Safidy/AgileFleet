import { Slot, Stack } from "expo-router";
import { Platform, View } from "react-native";

export default function HomeLayout() {
    return (
        <View className="flex-1 bg-slate-100">
            {/* Ici on réactive le header pour avoir le bouton "Retour" et le titre */}

            <Stack screenOptions={{
                headerTitleAlign: 'center',
                headerTitleStyle: { fontWeight: 'bold' },
                // On définit les propriétés d'ombre ici
                headerShadowVisible: true, // Crucial pour iOS
                headerStyle: {
                    backgroundColor: 'white',
                    ...Platform.select({
                        ios: {
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.2,
                            shadowRadius: 4,
                        },
                        android: {
                            elevation: 10, // Force l'ombre sur Android
                        },
                    }),
                },
            }}>
                {/* Tu définis tes titres ici ou dans les fichiers des pages */}
                <Stack.Screen name="info" options={{ title: "Information et confidentialité" }} />
                <Stack.Screen name="rapport" options={{ title: "Ajout de nouveau rapport" }} />
                <Stack.Screen name="historique" options={{ title: "Historique d'approvisionnement" }} />
            </Stack>
        </View>
    )
}