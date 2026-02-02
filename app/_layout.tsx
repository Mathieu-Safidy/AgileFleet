import { Slot, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import "../global.css"
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
export default function RootLayout() {

    return (
        <SafeAreaProvider className="flex-1 bg-white">
            <StatusBar backgroundColor="black" style="light" />
            {/* <View className="flex-1 " > */}
            <SafeAreaView className="flex-1 bg-white">

                <Stack screenOptions={{ headerShown: false }}>
                    {/* Ce Stack va gérer la bascule entre le groupe (tabs) et les autres pages */}
                    <Stack.Screen name="(home)" options={{ headerShown: false }} />
                    <Stack.Screen name="parametre" options={{ headerShown: false }} />
                </Stack>
            </SafeAreaView>
            {/* </View> */}
        </SafeAreaProvider>
    )
}