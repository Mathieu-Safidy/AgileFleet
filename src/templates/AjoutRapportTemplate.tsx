import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ProgresStepTemplate from "./ProgressSteps";
import { Calendar, Car, Check, CircleAlert, Clock, Fuel, MapPin, Phone, Plus, User, X } from "lucide-react-native";
import SmartInput from "../components/molecules/SmartInput";
import { useState } from "react";
import SmartSelect from "../components/molecules/SmartSelect";
import SmartTimePicker from "../components/molecules/SmarTimePicker";
import SmarTimePicker from "../components/molecules/SmarTimePicker";
import SmartDatePicker from "../components/molecules/SmartDatePicker";
import * as DocumentPicker from 'expo-document-picker';
import SmartFilePicker from "../components/molecules/SmartFilePicker";
// Type pour tes incidents
interface Incident {
    id: string;
    time: Date;
    type: string;
    description: string;
}

export default function AjoutRapportTemplate() {
    const [editModeInfo, setEditModeInfo] = useState(true);
    const [incidents, setIncidents] = useState<Incident[]>([]);

    const [tempTime, setTempTime] = useState<Date>(new Date());
    const [tempType, setTempType] = useState<string>("");
    const [tempDesc, setTempDesc] = useState<string>("");

    const [tempFile, setTempFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    const data = [
        { label: 'Livraison', value: 'livraison' },
        { label: 'Transport de personne', value: 'transport' },
        { label: 'Demenagement', value: 'demenagement' },
        { label: 'Service technique', value: 'service_technique' },
        { label: 'Course', value: 'course' },
        { label: 'Autre', value: 'autre' },
    ]

    const dataCarState = [
        { label: 'Bon état', value: 'bon_etat' },
        { label: 'Problème mineur', value: 'probleme_mineur' },
        { label: 'Problème majeur', value: 'probleme_majeur' },
        { label: 'En panne', value: 'en_panne' },
    ]

    const dataIncidentType = [
        { label: 'Accident', value: 'accident' },
        { label: 'Panne mécanique', value: 'panne_mecanique' },
        { label: 'Problème de pneus', value: 'probleme_pneus' },
        { label: 'Autre', value: 'autre' },
    ]


    function addIncident(incidentTime: Date, incidentType: string, incidentDesc: string) {
        // Trim permet d'éviter de valider si l'utilisateur a juste mis des espaces
        if (!incidentType || incidentType.trim() === "") {
            Alert.alert("Erreur", "Veuillez remplir tous les champs avant d'ajouter.");
            return; // 🛑 Très important : cela stoppe l'exécution ici
        }

        const newIncident = {
            id: Date.now().toString(), // Plus fiable que Math.random()
            time: incidentTime,
            type: incidentType,
            description: incidentDesc.trim()
        };

        setIncidents([...incidents, newIncident]);

        // Reset les champs pour le prochain incident
        setTempDesc("");
    }

    function removeIncident(incidentId: string) {
        const updatedIncidents = incidents.filter(incident => incident.id !== incidentId);
        setIncidents(updatedIncidents);
    }

    return (
        <>

            <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-100 flex-1 p-5">

                {/* Information generales */}
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 mb-4">
                    {/* Header du bloc */}
                    <View className="flex flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <View className="bg-blue-50 p-2 rounded-xl">
                                <Calendar size={20} color="#3b82f6" />
                            </View>
                            <Text className="ms-3 text-zinc-800 font-black text-lg">Informations generales</Text>
                        </View>
                    </View>

                    {/* Liste des Inputs via notre composant intelligent */}
                    <SmartDatePicker label="Date de la mission" value={new Date()} onChange={(date) => console.log(date)} />
                    <SmartSelect selectable={editModeInfo} label="Type de mission" data={data} />
                    <SmarTimePicker label="Heure de départ" value={new Date()} onChange={(date) => console.log(date)} />
                    <SmarTimePicker label="Heure d'arrivée" value={new Date()} onChange={(date) => console.log(date)} />
                </View>

                {/* Itinéraire & Distance */}
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 mb-4">
                    <View className="flex flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <View className="bg-green-50 p-2 rounded-xl">
                                <MapPin size={20} color="#22c55e" />
                            </View>
                            <Text className="ms-3 text-zinc-800 font-black text-lg">Itinéraire & Distance</Text>
                        </View>
                    </View>

                    <SmartInput label="Point de départ" icon={MapPin} placeholder="Adresse des départ" editMode={editModeInfo} />
                    <SmartInput label="Point d'arrivée" icon={MapPin} placeholder="Adresse d'arrivée" editMode={editModeInfo} />
                    <SmartInput label="Distance parcourue (km)" icon={Car} placeholder="0" keyboardType="numeric" editMode={editModeInfo} />
                    <SmartInput label="Consommation carburant (L)" icon={Fuel} placeholder="0" keyboardType="numeric" editMode={editModeInfo} />
                    <SmartInput label="Heures de conduite" icon={Clock} placeholder="0" keyboardType="numeric" editMode={editModeInfo} />
                </View>

                {/* Etat du vehicule */}
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 mb-4">
                    <View className="flex flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <View className="bg-orange-50 p-2 rounded-xl">
                                <Car size={20} color="#f97316" />
                            </View>
                            <Text className="ms-3 text-zinc-800 font-black text-lg">État du véhicule</Text>
                        </View>
                    </View>

                    <SmartSelect selectable={editModeInfo} label="Sélectionnez l'état du véhicule" data={dataCarState} />
                </View>

                {/* Incidents */}
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 mb-4">
                    <View className="flex flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <View className="bg-red-50 p-2 rounded-xl">
                                <Car size={20} color="#ef4444" />
                            </View>
                            <Text className="ms-3 text-zinc-800 font-black text-lg">Incidents</Text>
                        </View>
                        {/* Badge compteur */}
                        <View className="bg-zinc-100 px-3 py-1 rounded-full">
                            <Text className="text-zinc-500 font-bold text-xs">{incidents.length}</Text>
                        </View>
                    </View>

                    {/* Formulaire de saisie */}
                    <View className="space-y-4">
                        <SmarTimePicker
                            label="Heure"
                            value={tempTime}
                            onChange={(date) => setTempTime(date)}
                        />

                        <SmartSelect
                            label="Type d'incident"
                            data={dataIncidentType}
                            placeholder="Type d'incident"
                            // Assure-toi que ton SmartSelect accepte onSelect ou onChange
                            onValueChange={(value) => setTempType(value)}
                        />

                        <SmartInput
                            label="Description"
                            icon={CircleAlert}
                            placeholder="Décrivez l'incident..."
                            isTextArea={true}
                            rows={3}
                            value={tempDesc}
                            onChangeText={(text) => setTempDesc(text)}
                        />

                        <TouchableOpacity
                            // On appelle la fonction en lui passant les 3 états actuels
                            onPress={() => addIncident(tempTime, tempType, tempDesc)}
                            className="bg-red-500 p-4 rounded-2xl flex-row justify-center items-center mt-4"
                        >
                            <Plus size={20} color="white" />
                            <Text className="text-white font-bold ms-2">Ajouter l'incident</Text>
                        </TouchableOpacity>
                    </View>

                    {/* TABLEAU / LISTE DES INCIDENTS AJOUTÉS */}
                    {incidents.length > 0 && (
                        <View className="mt-6 border-t border-zinc-50 pt-6">
                            <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-4">
                                Incidents enregistrés
                            </Text>

                            {incidents.map((item, index) => (
                                <View key={item.id} className="flex-row items-start mb-4 bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                                    <View className="bg-white p-2 rounded-lg border border-zinc-100 items-center justify-center">
                                        <Text className="text-[10px] font-black text-red-500">
                                            {item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Text>
                                    </View>
                                    <View className="flex-1 ms-3">
                                        <Text className="text-zinc-900 font-bold text-sm">{item.type}</Text>
                                        <Text className="text-zinc-500 text-xs" numberOfLines={2}>{item.description}</Text>
                                    </View>
                                    <Pressable onPress={() => removeIncident(item.id)}>
                                        <X size={16} color="#a1a1aa" />
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Observations & Documents */}
                <View className="bg-white rounded-3xl p-6 shadow-sm border border-zinc-100 mb-4">
                    <View className="flex flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <View className="bg-violet-50 p-2 rounded-xl">
                                <Car size={20} color="#8b5cf6" />
                            </View>
                            <Text className="ms-3 text-zinc-800 font-black text-lg">Observations & Documents</Text>
                        </View>
                    </View>

                    <SmartInput
                        label="Observations"
                        icon={CircleAlert}
                        placeholder="Ajoutez vos observations ici..."
                        isTextArea={true}
                        rows={5}
                        editMode={editModeInfo}
                    />

                    <SmartFilePicker label="Documents joints (photos, factures, etc.)" onFileSelect={(file) => { setTempFile(file); }} />

                </View>



                <View className="h-20" />
            </ScrollView>
            <TouchableOpacity
                onPress={() => console.log("Validé")}
                // absolute bottom-0 right-0 : place le bouton tout en bas à droite
                // rounded-full : garantit un cercle parfait (mieux que 50% en RN)
                // shadow-lg : pour donner de la profondeur
                className="absolute bottom-0 right-0 m-6 w-16 h-16 bg-green-500 rounded-full items-center justify-center shadow-lg active:bg-green-400"
            >
                <Check size={32} color="#ffffff" strokeWidth={3} />
            </TouchableOpacity>
        </>
    )
}