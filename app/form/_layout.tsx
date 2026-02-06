import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Animated, Dimensions, Linking } from "react-native";
import { ShieldCheck, AlertCircle, Lock, Car, Users, Home } from "lucide-react-native";
import iconeAgilefleet from "../../assets/iconeAgilfleet.png";
import googleIcon from "../../assets/Google__G__logo.svg.png";
import * as AuthSession from 'expo-auth-session';

const { width, height } = Dimensions.get("window");

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    speed: number;
    delay: number;
    animatedY: Animated.Value;
}

interface Props {
    error?: string; // Reçu via ton routeur (ex: searchParams dans Expo Router)
}

export default function AdminLogin({ error }: Props) {
    const [activeTab, setActiveTab] = useState<"admin" | "chauffeur">("chauffeur");
    const [particles, setParticles] = useState<Particle[]>([]);

    // --- ANIMATIONS REF ---
    const logoFloat = useRef(new Animated.Value(0)).current;
    const pingScale = useRef(new Animated.Value(1)).current;
    const pingOpacity = useRef(new Animated.Value(0.5)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;

    const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'agilefleet-app', // Ton scheme défini dans app.json
        path: 'auth/callback'
    });

    console.log("Voici l'URL à mettre dans NestJS :", redirectUri);
    useEffect(() => {
        // 1. C'est ici que tu reçois les données si l'application est ouverte par NestJS
        const handleDeepLink = (event: { url: string }) => {
            const { url } = event;

            // On vérifie si l'URL contient notre "endpoint" virtuel
            if (url.includes('auth/callback')) {
                // On récupère le data dans les paramètres de recherche
                const queryParams = url.split('?')[1];
                const data = new URLSearchParams(queryParams).get('data');

                if (data) {
                    console.log("Succès ! data reçu du serveur :", data);
                    // Ici, tu enregistres le token et tu changes d'écran
                }
            }
        };

        // 2. On écoute les événements de liens entrants
        const subscription = Linking.addEventListener('url', handleDeepLink);

        // 3. Vérifier aussi si l'app a été lancée via un lien alors qu'elle était fermée
        Linking.getInitialURL().then((url) => {
            if (url) handleDeepLink({ url });
        });

        return () => subscription.remove();
    }, []);

    // 1. Initialisation des particules
    useEffect(() => {
        const newParticles = Array.from({ length: 12 }, (_, i) => ({
            id: i,
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 4 + 2,
            speed: Math.random() * 2000 + 3000,
            delay: Math.random() * 2000,
            animatedY: new Animated.Value(0),
        }));
        setParticles(newParticles);
    }, []);

    //   // 2. Lancement des animations (Loop)
    useEffect(() => {
        // Animation de flottaison du logo
        Animated.loop(
            Animated.sequence([
                Animated.timing(logoFloat, { toValue: -7, duration: 1500, useNativeDriver: true }),
                Animated.timing(logoFloat, { toValue: 0, duration: 1500, useNativeDriver: true }),
            ])
        ).start();

        // Animation de Ping (cercle extérieur)
        Animated.loop(
            Animated.parallel([
                Animated.timing(pingScale, { toValue: 1.5, duration: 2000, useNativeDriver: true }),
                Animated.timing(pingOpacity, { toValue: 0, duration: 2000, useNativeDriver: true }),
            ])
        ).start();

        // Animation des particules
        particles.forEach((p) => {
            Animated.loop(
                Animated.sequence([
                    Animated.delay(p.delay),
                    Animated.timing(p.animatedY, { toValue: -20, duration: p.speed, useNativeDriver: true }),
                    Animated.timing(p.animatedY, { toValue: 0, duration: 0, useNativeDriver: true }),
                ])
            ).start();
        });
    }, [particles]);

    const handleGoogleLogin = () => {
        const baseUrl = "https://api.agilfleet.fr";
        // J'ajoute ?platform=mobile aux deux cas pour que le backend sache quoi faire
        const platformParam = "?platform=mobile";
        const endpoint = activeTab === "admin"
            ? `/auth-admin/google${platformParam}`
            : `/auth-chauffeur/google${platformParam}`;
        console.log("Ouverture de l'URL :", baseUrl + endpoint);
        Linking.openURL(baseUrl + endpoint);
    };

    return (
        <View className="flex-1 bg-gray-50 items-center justify-center px-6">
            {/* Arrière-plan particules (déjà présent dans ton code) */}
            <View className="absolute inset-0">
                {particles.map((p) => (
                    <Animated.View
                        key={p.id}
                        style={{
                            position: "absolute",
                            left: p.x,
                            top: p.y,
                            width: p.size,
                            height: p.size,
                            borderRadius: p.size / 2,
                            backgroundColor: "rgba(0, 186, 85, 0.15)", // Teinte verte pour l'harmonie
                            transform: [{ translateY: p.animatedY }],
                        }}
                    />
                ))}
            </View>

            <Animated.View
                style={{ transform: [{ translateX: shakeAnim }] }}
                className="w-full max-w-sm bg-white rounded-[40px] p-10 shadow-xl shadow-gray-200 border border-gray-100"
            >
                {/* Section Logo */}
                <View className="items-center mb-8">
                    <View className="relative">
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: 80,
                                height: 80,
                                top: -5,
                                left: -5,
                                borderRadius: 40,
                                borderWidth: 2,
                                borderColor: "rgba(0, 186, 85, 0.2)",
                                transform: [{ scale: pingScale }],
                                opacity: pingOpacity,
                            }}
                        />
                        <View
                            className="w-20 h-20 bg-green-50 rounded-full items-center justify-center shadow-inner"
                        >
                            <Animated.View
                                style={{ transform: [{ translateY: logoFloat }] }}

                            >
                                <Image source={iconeAgilefleet} style={{ width: 60, height: 60 }} resizeMode="contain" />
                            </Animated.View>
                            <View className="absolute inset-0 bg-green-500/10 blur-xl rounded-full" />
                        </View>
                    </View>
                </View>

                {/* Textes d'accueil */}
                <View className="mb-10 items-center">
                    <Text className="text-2xl font-extrabold text-gray-900 text-center">
                        Bienvenue
                    </Text>
                    <Text className="text-gray-500 text-center mt-2 px-4">
                        Connectez-vous à votre espace AgileFleet pour gérer votre activité.
                    </Text>
                </View>

                {/* Message d'erreur s'il existe */}
                {error && (
                    <View className="bg-red-50 border border-red-100 p-4 rounded-2xl mb-6 flex-row items-center">
                        <AlertCircle size={18} color="#ef4444" />
                        <Text className="text-red-600 text-xs ml-2 font-medium flex-1">
                            {error === "unauthorized" ? "Accès non autorisé à cette plateforme." : decodeURIComponent(error)}
                        </Text>
                    </View>
                )}

                {/* Bouton Google principal */}
                <TouchableOpacity
                    onPress={handleGoogleLogin}
                    activeOpacity={0.7}
                    className="flex-row items-center justify-center bg-red-600 py-4 rounded-2xl shadow-lg mb-6"
                >
                    <View className="bg-white p-1 rounded-md mr-3">
                        <Image source={googleIcon} style={{ width: 18, height: 18 }} />
                    </View>
                    <Text className="font-bold text-white text-base">
                        Continuer avec Google
                    </Text>
                </TouchableOpacity>

                {/* Lien de secours / Info */}
                <TouchableOpacity className="items-center pt-2">
                    <Text className="text-gray-400 text-xs font-semibold">
                        Besoin d'aide pour vous connecter ?
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Footer hors de la card pour "ancrer" la page */}
            <View className="absolute bottom-10 items-center">
                <View className="flex-row items-center mb-1">
                    <Lock size={12} color="#9ca3af" />
                    <Text className="text-gray-400 text-[10px] font-bold ml-1 uppercase tracking-widest">
                        Cloud Secure v2.0
                    </Text>
                </View>
                <Text className="text-gray-300 text-[10px]">
                    © 2026 Rapex Group. Tous droits réservés.
                </Text>
            </View>
        </View>
    );
}