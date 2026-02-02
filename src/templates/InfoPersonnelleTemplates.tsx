import { CircleAlert, MapPin, Pen, Phone, User, LucideIcon, Car, RefreshCcw } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import SmartInput from "../components/molecules/SmartInput";



export default function InfoPersonnelleTemplates() {
    const [editModeInfo, setEditModeInfo] = useState(false);
    const [editModeCar, setEditModeCar] = useState(false);
    // On stocke le nom du champ qui a le focus

    // Composant interne pour éviter la répétition de code (DRY)

    return (
        <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-100 flex-1 p-5">

            <View className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 mb-5">
                {/* Header du bloc */}
                <View className="flex flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center">
                        <View className="bg-green-50 p-2 rounded-xl">
                            <User size={20} color="#22c55e" />
                        </View>
                        <Text className="ms-3 text-zinc-800 font-black text-lg">Informations</Text>
                    </View>
                    <TouchableOpacity className="bg-zinc-50 p-2 rounded-full" onPress={() => setEditModeInfo(!editModeInfo)}>
                        <Pen size={18} color="#16a34a" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>

                {/* Liste des Inputs via notre composant intelligent */}
                <SmartInput icon={User} placeholder="Nom complet" editMode={editModeInfo} />
                <SmartInput icon={Phone} placeholder="Téléphone" keyboardType="phone-pad" editMode={editModeInfo} />
                <SmartInput icon={MapPin} placeholder="Adresse" editMode={editModeInfo} />
                <SmartInput icon={CircleAlert} placeholder="Contact d'urgence" keyboardType="phone-pad" editMode={editModeInfo} />
                {/* Bouton de validation optionnel */}
                {editModeInfo && (
                    <TouchableOpacity className="bg-green-500 h-14 rounded-2xl items-center justify-center mt-8 shadow-md shadow-green-200">
                        <Text className="text-white font-black text-md uppercase tracking-wider">Mettre à jour</Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* <View className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 mb-10">
                <View className="flex flex-row justify-between items-center mb-6">
                    <View className="flex-row items-center">
                        <View className="bg-green-50 p-2 rounded-xl">
                            <Car size={20} color="#22c55e" />
                        </View>
                        <Text className="ms-3 text-zinc-800 font-black text-lg">Vehicule</Text>
                    </View>
                    <TouchableOpacity className="bg-zinc-50 p-2 rounded-full" onPress={() => setEditModeCar(!editModeCar)}>
                        <RefreshCcw size={18} color="#16a34a" strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>
            </View> */}
        </ScrollView>
    );
}