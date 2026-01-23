import { Slot, Stack } from "expo-router";
import { View } from "react-native";

export default function MenuLayout() {
    return (
        <View className="flex-1 bg-slate-100">
            {/* Ici on réactive le header pour avoir le bouton "Retour" et le titre */}
            
            <Stack.Screen options={{ 
                headerShown: true, 
                title: "Détails du trajet",
                headerBackTitle: "Retour" 
            }} />
            <Slot />
        </View>
    );
}