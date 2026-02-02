import { AlertTriangle, ChartNoAxesColumnIncreasing, CircleCheckBig, Clock, Plus, Search } from "lucide-react-native";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import SmartInput from "../components/molecules/SmartInput";
import ReportCard from "../components/molecules/ReportCard";
import React from "react";
import { useRouter } from "expo-router";

export default function RapportTemplates() {

    const STATUTS = ["En attente", "Terminés", "Annulés"];
    const [filter, setFilter] = React.useState("En attente");
    const router = useRouter();

    const handlerNewReport = () => {
        router.push("/parametre/rapport")
    }

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-50 flex-1 py-4">
                <View className="pb-4 mb-4">

                    {/* GRILLE ASYMETRIQUE */}
                    <View className="flex flex-row gap-3 h-[320px] mb-6">

                        {/* Colonne 1 : Une grande carte (ex: Consommation) */}
                        <View className="flex-1 justify-center">
                            <View className=" bg-white min-h-[160px] border border-zinc-100 rounded-3xl p-4 shadow-sm items-center justify-center">
                                <View className="w-12 h-12 rounded-2xl bg-orange-50 items-center justify-center mb-4">
                                    <ChartNoAxesColumnIncreasing size={24} color="#f97316" />
                                </View>
                                <Text className="text-3xl font-black text-zinc-900">0</Text>
                                <Text className="text-zinc-400 text-xs font-bold uppercase tracking-tighter mt-1">Total</Text>
                            </View>
                        </View>

                        {/* Colonne 2 : Deux petites cartes empilées (ex: Alertes / OK) */}
                        <View className="flex-1 gap-3">
                            <View className="flex-1 bg-white min-h-[160px] border border-zinc-100 rounded-3xl p-4 shadow-sm items-center justify-center">
                                <View className="w-10 h-10 rounded-xl bg-red-50 items-center justify-center mb-2">
                                    <AlertTriangle size={20} color="#ef4444" />
                                </View>
                                <Text className="text-xl font-black text-zinc-900">0</Text>
                                <Text className="text-zinc-400 text-[10px] font-bold uppercase">Rejetés</Text>
                            </View>

                            <View className="flex-1 bg-white min-h-[160px] border border-zinc-100 rounded-3xl p-4 shadow-sm items-center justify-center">
                                <View className="w-10 h-10 rounded-xl bg-yellow-50 items-center justify-center mb-2">
                                    <Clock size={20} color="#ca8a04" />
                                </View>
                                <Text className="text-xl font-black text-zinc-900">0</Text>
                                <Text className="text-zinc-400 text-[10px] font-bold uppercase">Actifs</Text>
                            </View>
                        </View>

                        {/* Colonne 3 : Une grande carte (ex: Distance) */}
                        <View className="flex-1 justify-center">
                            <View className="bg-white min-h-[160px] border border-zinc-100 rounded-3xl p-4 shadow-sm items-center justify-center">
                                <View className="w-12 h-12 rounded-2xl bg-green-50 items-center justify-center mb-4">
                                    <CircleCheckBig size={24} color="#22c55e" />
                                </View>
                                <Text className="text-3xl font-black text-zinc-900">0</Text>
                                <Text className="text-zinc-400 text-xs font-bold uppercase tracking-tighter mt-1">Valide</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest ml-4 mt-3">Liste de rapport</Text>

                    <View className="flex-1 mt-3 border border-zinc-100 bg-white rounded-2xl p-4 shadow-sm">
                        {/* Barre de recherche principale */}
                        <SmartInput
                            icon={Search}
                            placeholder="Recherche par trajet ou ID"
                            editMode={true}
                        />

                        {/* Séparateur subtil */}
                        <View className="h-[1px] bg-zinc-100 w-full my-4" />

                        {/* Section Filtres Rapides */}
                        <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-3">
                            Filtres rapides
                        </Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                            {STATUTS.map((statut, index) => {
                                const isActive = filter === statut;

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => setFilter(statut)}
                                        style={{ shadowColor: "#bbf7d0", shadowOpacity: 0.5, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } }}
                                        className={`px-4 py-2 rounded-full mr-2 border ${isActive
                                            ? "bg-green-500 border-green-500"
                                            : "bg-zinc-50 border-zinc-100"
                                            }`}
                                    >
                                        <Text className={`font-bold text-xs ${isActive ? "text-white" : "text-zinc-600"
                                            }`}>
                                            {statut} {statut === "En attente" && "(12)"}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {/* <View className="flex-1 mt-3">
                    <TouchableOpacity 
                        className="bg-purple-600 rounded-3xl items-center justify-center flex-row "
                        onPress={handlerNewReport}
                    >
                        <Plus size={20} color="white" />
                        <Text className="text-white font-bold text-center py-3 rounded-2xl">Nouveau Rapport</Text>
                    </TouchableOpacity>
                </View> */}
                    <View className=" mt-6">
                        <View className="flex-row justify-between items-center mb-4 ml-4">
                            <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest">
                                Résultats (1)
                            </Text>
                            <TouchableOpacity>
                                <Text className="text-green-600 text-[10px] font-bold uppercase">Voir tout</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Les cartes sont affichées directement ici */}
                        <ReportCard
                            report={{
                                tripId: "RPT-2026-003",
                                status: "en attente",
                                date: "29 Jan 2026",
                                from: "Ambohibao",
                                to: "Mandroso Ivato",
                                category: "Carburant",
                                amount: 45,
                                description: "Plein de gasoil effectué avant le départ pour la mission longue distance.",
                                adminComment: "Veuillez joindre la photo du ticket de caisse pour validation."
                            }}
                        />

                        {/* Ajoute une marge en bas pour ne pas que la dernière carte soit collée à la BottomBar */}
                        {/* <View className="h-20" /> */}
                    </View>

                </View>
            </ScrollView>
            {/* /* Bouton Fixe (Ajouter un plein)  */}
            <TouchableOpacity
                className="absolute bottom-24 right-6 w-16 h-16 bg-green-500 rounded-full items-center justify-center shadow-xl elevation-5 active:scale-95"
                onPress={handlerNewReport}
            >
                <Plus size={30} color="white" strokeWidth={3} />
            </TouchableOpacity>
        </>
    );
}