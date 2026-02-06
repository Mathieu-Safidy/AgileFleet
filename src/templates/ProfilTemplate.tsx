import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Camera, Settings, User, Mail, ShieldCheck, LucideIcon, Phone, Car, LogOut } from "lucide-react-native";
import logo from "../../assets/agilfleet.png"; // Note: Remplace par une photo de profil si besoin
import ProfileItem from "../components/molecules/ProfileItem";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function ProfilTemplate() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = await AsyncStorage.getItem("user");
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.log("Erreur chargement user", error);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-50">
            {/* Conteneur Carte Profil */}
            <View className="items-center justify-center border border-zinc-100 rounded-3xl bg-white p-8 shadow-sm mx-4 mt-4">

                {/* Conteneur Image avec bouton d'édition */}
                <View className="relative">
                    <View className="rounded-full border-4 border-green-50 w-32 h-32 items-center justify-center overflow-hidden bg-slate-100">
                        <Image
                            source={{ uri: user?.photoProfil || Image.resolveAssetSource(logo).uri }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                    {/* Badge Edition */}
                    <TouchableOpacity className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full border-4 border-white">
                        <Camera size={18} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Infos Utilisateur */}
                <Text className="text-2xl font-black text-zinc-900 mt-5">{user?.nom || "Jean Dupont"}</Text>
                <Text className="text-zinc-500 font-medium">{"Chauffeur"}</Text>

                <View className="flex-col mt-6 gap-4">
                    <View className="flex flex-row items-center px-4 py-2 bg-slate-50 rounded-2xl">
                        <Mail size={20} color="#71717a" className="" />
                        <Text className="ms-2 text-lg text-zinc-400 font-bold">{user?.email || "jeandupont@gmail.com"}</Text>
                    </View>
                    <View className="flex flex-row w-fit items-center px-4 py-2 bg-slate-50 rounded-2xl">
                        <Phone size={20} color="#71717a" className="" />
                        <Text className="ms-6 text-md text-zinc-400 uppercase font-bold">{user?.phone || "+261 38 33 594 99"}</Text>
                    </View>
                </View>
            </View>

            {/* Section Véhicule */}
            <View className="p-4 mt-2">
                <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest ml-4 mb-3">Véhicule Assigné</Text>

                <View className="bg-white rounded-3xl border border-zinc-100 shadow-sm overflow-hidden p-4">

                    {/* Header : Infos Principales */}
                    <View className="flex-row items-center mb-5">
                        <View className="w-16 h-16 rounded-2xl bg-green-50 items-center justify-center">
                            <Car size={35} color="#16a34a" strokeWidth={2.5} />
                        </View>
                        <View className="ml-4 flex-1">
                            <Text className="text-zinc-900 font-black text-xl leading-tight">Peugeot 205</Text>
                            <View className="flex-row items-center mt-1">
                                <View className="bg-zinc-100 px-2 py-0.5 rounded-md border border-zinc-200">
                                    <Text className="text-zinc-600 font-bold text-[10px]">1234 AB 56</Text>
                                </View>
                                <Text className="text-zinc-400 font-medium text-xs ml-2">Modèle 2002</Text>
                            </View>
                        </View>
                    </View>

                    {/* Stats rapides en bas */}
                    <View className="flex-row gap-3 flex-wrap justify-between">
                        <View className="flex p-3 min-w-[48%] max-w-[48%] bg-slate-50 rounded-2xl border border-slate-100">
                            <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-tight">Kilometrage</Text>
                            <Text className="text-zinc-900 font-black text-lg">51 444 km</Text>
                        </View>

                        <View className="flex p-3 min-w-[48%] max-w-[48%] bg-slate-50 rconst user = await AsyncStorage.getItem('user');ounded-2xl border border-slate-100">
                            <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-tight">Carburant</Text>
                            <View className="flex-row items-baseline">
                                <Text className="text-zinc-900 font-black text-lg">Essence</Text>
                                {/* <Text className="text-zinc-500 font-bold text-xs ml-0.5">%</Text> */}
                            </View>
                        </View>

                        <View className="flex p-3 min-w-[48%] max-w-[48%] bg-slate-50 rounded-2xl border border-slate-100">
                            <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-tight">Derniere Maintenance</Text>
                            <View className="flex-row items-baseline">
                                <Text className="text-zinc-900 font-black text-lg">08/01/2026</Text>
                                {/* <Text className="text-zinc-500 font-bold text-xs ml-0.5">%</Text> */}
                            </View>
                        </View>

                        <View className="flex p-3 min-w-[48%] max-w-[48%] bg-slate-50 rounded-2xl border border-slate-100">
                            <Text className="text-zinc-500 text-[10px] font-bold uppercase tracking-tight">Prochain controle</Text>
                            <View className="flex-row items-baseline">
                                <Text className="text-zinc-900 font-black text-lg">27/01/2026</Text>
                                {/* <Text className="text-zinc-500 font-bold text-xs ml-0.5">%</Text> */}
                            </View>
                        </View>
                    </View>

                </View>
            </View>

            {/* Liste des réglages */}
            <View className="p-4 mt-2">
                <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest ml-4 mb-3">Paramètres</Text>

                <View className="bg-white rounded-3xl border border-zinc-100 overflow-hidden">
                    <ProfileItem icon={User} label="Informations personnelles" action={() => { router.push("/parametre/info") }} />
                    <ProfileItem icon={Mail} label="Contact Support" />
                    <ProfileItem icon={ShieldCheck} label="Sécurité & Compte" />
                    <ProfileItem icon={Settings} label="Préférences" />
                    <ProfileItem icon={LogOut} label="Se deconnecter" isLast action={async () => { await AsyncStorage.clear(),router.push("/form/login") }} />
                </View>
            </View>
        </ScrollView>
    );
}
