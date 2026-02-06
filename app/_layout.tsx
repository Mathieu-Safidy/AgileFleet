import { Slot, Stack, useRootNavigationState } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import "../global.css"
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { store } from "../src/store/store";
import { Provider, useDispatch } from "react-redux";
import { hydrateAuth } from "../src/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function RootLayout() {
    const navigationState = useRootNavigationState();
    useEffect(() => {
        if (navigationState?.key) {
            console.log("🛣️ Routes enregistrées dans le Router :",
                navigationState?.routeNames
            );
        }
    }, [navigationState]);
   
    return (
        <SafeAreaProvider className="flex-1 bg-white">
            <Provider store={store}>
                <StatusBar backgroundColor="black" style="light" />
                {/* <View className="flex-1 " > */}
                <SafeAreaView className="flex-1 bg-white">

                    <Stack screenOptions={{ headerShown: false }}>
                        {/* Ce Stack va gérer la bascule entre le groupe (tabs) et les autres pages */}
                        <Stack.Screen name="(home)" options={{ headerShown: false }} />
                        <Stack.Screen name="auth/callback" options={{ headerShown: false }} />
                        <Stack.Screen name="form" options={{ headerShown: false }} />
                        <Stack.Screen name="menu" options={{ headerShown: false }} />
                        <Stack.Screen name="parametre" options={{ headerShown: false }} />
                        {/* <Stack.Screen name="/parametre/rapport" options={{ headerShown: false }} /> */}
                    </Stack>
                </SafeAreaView>
                {/* </View> */}
            </Provider>
        </SafeAreaProvider>
    )
}