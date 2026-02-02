import React from 'react';
import { ScrollView, View, Text, Pressable } from "react-native";
import { Fuel, Calendar, ChevronRight, Plus, Droplets } from "lucide-react-native";

// Type pour tes données
interface FuelRecord {
    id: string;
    date: string;
    vehicle: string;
    liters: number;
    kilometers: number;
    amount: number;
    station: string;
}

const MOCK_DATA: FuelRecord[] = [
    { id: '1', date: '30 Janv. 2026', vehicle: 'AB-123-CD', liters: 45, kilometers: 300, amount: 82.50, station: 'TotalEnergies' },
    { id: '2', date: '25 Janv. 2026', vehicle: 'EF-456-GH', liters: 60, kilometers: 300, amount: 110.20, station: 'Shell' },
    { id: '3', date: '18 Janv. 2026', vehicle: 'AB-123-CD', liters: 42, kilometers: 300, amount: 78.00, station: 'Esso' },
];

export default function HistoriqueTemplates() {
    return (
        <View className="flex-1 bg-slate-100">
            {/* Contenu défilant */}
            <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-5">
                <View className="flex-row justify-between items-end mb-6">
                    <View>
                        <Text className="text-zinc-400 text-xs font-black uppercase tracking-widest">Suivi</Text>
                        <Text className="text-zinc-900 text-2xl font-black">Carburant</Text>
                    </View>
                    <View className="bg-white px-3 py-1 rounded-full border border-zinc-200">
                        <Text className="text-zinc-500 font-bold text-xs">Ce mois</Text>
                    </View>
                </View>

                {/* Liste des cartes */}
                {MOCK_DATA.map((item) => (
                    <Pressable 
                        key={item.id} 
                        className="bg-white rounded-3xl p-4 mb-4 flex-row items-center shadow-sm border border-zinc-100 active:bg-zinc-50"
                    >
                        {/* Icône à gauche */}
                        <View className="bg-amber-50 p-3 rounded-2xl">
                            <Fuel size={24} color="#f59e0b" />
                        </View>

                        {/* Infos centrales */}
                        <View className="flex-1 ms-4">
                            <View className="flex-row items-center">
                                <Text className="text-zinc-900 font-black text-base">{item.amount.toFixed(2)} €</Text>
                                <View className="mx-2 w-1 h-1 rounded-full bg-zinc-300" />
                                <Text className="text-zinc-500 font-bold text-sm">{item.liters}L</Text>
                                <View className="mx-2 w-1 h-1 rounded-full bg-zinc-300" />
                                <Text className="text-zinc-500 font-bold text-sm">{item.kilometers}km</Text>
                            </View>
                            
                            <Text className="text-zinc-400 text-xs mt-1 font-medium italic">
                                {item.station} • {item.vehicle}
                            </Text>
                        </View>

                        {/* Date et flèche à droite */}
                        <View className="items-end">
                            <Text className="text-zinc-400 text-[10px] font-bold uppercase mb-1">{item.date}</Text>
                            {/* <ChevronRight size={16} color="#d4d4d8" /> */}
                        </View>
                    </Pressable>
                ))}

                {/* Padding pour ne pas être caché par le bouton fixe */}
                <View className="h-24" />
            </ScrollView>

            {/* Bouton Fixe (Ajouter un plein) */}
            <Pressable 
                className="absolute bottom-10 right-6 w-16 h-16 bg-amber-500 rounded-full items-center justify-center shadow-xl elevation-5 active:scale-95"
                onPress={() => console.log("Nouveau plein")}
            >
                <Plus size={30} color="white" strokeWidth={3} />
            </Pressable>
        </View>
    );
}