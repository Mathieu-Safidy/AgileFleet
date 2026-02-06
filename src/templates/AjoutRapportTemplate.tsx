import { Alert, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ProgresStepTemplate from "./ProgressSteps";
import { Calendar, Car, Check, CircleAlert, Clock, Fuel, MapPin, Phone, Plus, User, X } from "lucide-react-native";
import SmartInput from "../components/molecules/SmartInput";
import { useEffect, useState } from "react";
import SmartSelect from "../components/molecules/SmartSelect";
import SmartTimePicker from "../components/molecules/SmarTimePicker";
import SmarTimePicker from "../components/molecules/SmarTimePicker";
import SmartDatePicker from "../components/molecules/SmartDatePicker";
import * as DocumentPicker from 'expo-document-picker';
import SmartFilePicker from "../components/molecules/SmartFilePicker";
import { ReportData } from "../interfaces/reportinterface";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { createReport, fetchReportById, updateReport } from "../thunk/reportthunk";
// Type pour tes incidents
interface Incident {
    id: string;
    time: Date;
    type: string;
    description: string;
}

export default function AjoutRapportTemplate() {
    const { id }: { id?: string } = useLocalSearchParams();
    const [editModeInfo, setEditModeInfo] = useState(true);
    const [incidents, setIncidents] = useState<Incident[]>([]);
    // const [id, setId] = useState<string | undefined>("");
    const [tempTime, setTempTime] = useState<Date>(new Date());
    const [tempType, setTempType] = useState<string>("");
    const [tempDesc, setTempDesc] = useState<string>("");
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [dateMission, setDateMission] = useState<Date>(new Date());
    const [departureTime, setDepartureTime] = useState<Date>(new Date());
    // const [missionType, setMissionType] = useState<"livraison" | "transport" | "demenagement" | "service" | "course" | "autre">("livraison");
    const [missionType, setMissionType] = useState<string>("livraison");
    const [arrivalTime, setArrivalTime] = useState<Date>(new Date());
    const [startLocation, setStartLocation] = useState<string>("");
    const [endLocation, setEndLocation] = useState<string>("");
    const [distance, setDistance] = useState<string>("");
    const [fuelConsumed, setFuelConsumed] = useState<string>("");
    const [hoursDriven, setHoursDriven] = useState<string>("");
    const [vehicleCondition, setVehicleCondition] = useState<string>("");
    const [observations, setObservations] = useState<string>("");
    const user = useSelector((state: RootState) => state.auth);

    const [tempFile, setTempFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
    const { currentReport, loadingReport } = useSelector((state: RootState) => state.reports);
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [alertsVisible, setAlertsVisible] = useState<{ [key: string]: boolean }>({
        departureTime: false,
        arrivalTime: false,
        departLocation: false,
        endLocation: false,
        distance: false,
    });

    const isEditMode = !!id;

    useEffect(() => {
        // console.log('====================================');
        // console.log('id', id);
        // console.log('====================================');
        if (id) {
            dispatch(fetchReportById(id) as any)
            console.log('============FETCING ....============');
            console.log(currentReport);
            console.log('====================================');
        }
    }, [isEditMode, id, dispatch])

    useEffect(() => {
        setAlertsVisible((prev) => ({ ...prev, departLocation: !!startLocation, endLocation: !!endLocation, distance: !!distance }));
    }, [])

    useEffect(() => {

        if (isEditMode && currentReport) {
            // console.log('=================mission=============');
            // console.log(currentReport.missionType);
            // console.log('====================================');
            //      missionDate: currentReport.missionDate.split('T')[0],
            // missionType: currentReport.missionType,
            // departureTime: currentReport.departureTime,
            // arrivalTime: currentReport.arrivalTime,
            // startLocation: currentReport.startLocation,
            // endLocation: currentReport.endLocation,
            // distance: currentReport.distance.toString(),
            // fuelConsumed: currentReport.fuelConsumed?.toString() || '',
            // hoursDriven: currentReport.hoursDriven.toString(),
            // vehicleCondition: currentReport.vehicleCondition || '',
            // observations: currentReport.observations || ''
            setDateMission(new Date(currentReport.missionDate.split('T')[0]));
            setMissionType(currentReport.missionType);
            setDepartureTime(formatTimeToDate(currentReport.departureTime));
            setArrivalTime(formatTimeToDate(currentReport.arrivalTime));
            setStartLocation(currentReport.startLocation);
            setEndLocation(currentReport.endLocation);
            setDistance(currentReport.distance.toString());
            setFuelConsumed(currentReport.fuelConsumed?.toString() || '');
            setHoursDriven(currentReport.hoursDriven.toString());
            setVehicleCondition(currentReport.vehicleCondition || '');
            setObservations(currentReport.observations || '');
            setIncidents(initIncident(currentReport.incidents || []))
        }
    }, [isEditMode, currentReport])

    useEffect(() => {
        const isInvalid = departureTime.getTime() >= arrivalTime.getTime();
        setAlertsVisible((prev) => ({
            ...prev,
            departureTime: isInvalid,
            arrivalTime: isInvalid
        }));
    }, [departureTime, arrivalTime]);

    const formatTimeToDate = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
    }

    const initIncident = (incidents: any[]): Incident[] => {
        return incidents.map((incident) => {
            return {
                id: Date.now().toString() + Math.random().toString(), // Génère un ID unique
                description: incident.description,
                time: formatTimeToDate(incident.time),
                type: incident.type
            }
        })
    }

    const handleValidate = async () => {
        // 1. On calcule les nouvelles erreurs directement à partir des variables de saisistartLocatione
        const newAlerts = {
            ...alertsVisible,
            departLocation: !startLocation,
            endLocation: !endLocation,
            distance: !distance || isNaN(Number(distance))
        };

        // 2. On met à jour le state pour l'affichage visuel (bordures rouges)
        setAlertsVisible(newAlerts);


        // 3. On vérifie l'objet "newAlerts" qu'on vient de créer, pas le state "alertsVisible" !
        const hasError = Object.values(newAlerts).some((isInvalid) => isInvalid === true);
        const reportData: ReportData = {
            missionDate: dateMission.toISOString(),
            missionType,
            departureTime: formatToWithoutTimeZone(departureTime),
            arrivalTime: formatToWithoutTimeZone(arrivalTime),
            startLocation,
            endLocation,
            distance: Number(distance),
            fuelConsumed: fuelConsumed ? Number(fuelConsumed) : undefined,
            hoursDriven: Number(hoursDriven),
            observations,
            incidents: incidents.map(incident => ({
                description: incident.description,
                time: formatToWithoutTimeZone(incident.time),
                type: incident.type
            })),
            vehicleCondition
        };
        console.log('====================================');
        console.log(alertsVisible, '\n', hasError, '\n', newAlerts, '\n', reportData); // <-- Vérifie que newAlerts est correct et que hasError est à true si un champ est invalide
        console.log('====================================');
        if (hasError) {
            // appel API ici...
            Alert.alert("Champs requis", "Veuillez remplir tous les champs correctement.");
            return;
        }

        // appel API ici...
        // Si on arrive ici, tout est bon !
        console.log("Formulaire valide, envoi en cours...");

        try {
            if (isEditMode && id) {
                await dispatch(updateReport({ id, data: reportData })).unwrap();
            } else {
                await dispatch(createReport(reportData)).unwrap();
            }
            Alert.alert("Succès", "Votre rapport a été soumis avec succès.");
            router.push("/rapport");
        } catch (error) {
            Alert.alert("Erreur", "Une erreur est survenue lors de l'envoi du rapport.");
        }
    };

    const formatToWithoutTimeZone = (date: Date) => {
        const pad = (n: number) => n < 10 ? '0' + n : n;

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    // const submitReport = async (reportData: ReportData) => {
    //     try {
    //         const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/report`, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${user ? user.token : ""}`,
    //             },
    //             body: JSON.stringify(reportData),
    //         })
    //         const data = await response.json(); // On parse le JSON dans tous les cas
    //         if (response.ok) {
    //             Alert.alert("Succès", "Votre rapport a été soumis avec succès.");
    //             router.push("/rapport");
    //         } else {
    //             const errorServer = Array.isArray(data.message)
    //                 ? data.message.join("\n")
    //                 : data.message || "Erreur serveur inconnue";

    //             console.log('--- DETAILS ERREUR REQUETE ---');
    //             console.log(data);
    //             console.log('------------------------------');

    //             throw new Error(errorServer);
    //         }
    //     } catch (error) {
    //         console.log('====================================');
    //         console.log(error);
    //         console.log('====================================');
    //         Alert.alert("Erreur", "Une erreur est survenue lors de l'envoi du rapport.");
    //     }
    // }

    const data = [
        { label: 'Livraison', value: 'livraison' },
        { label: 'Transport de personne', value: 'transport' },
        { label: 'Demenagement', value: 'demenagement' },
        { label: 'Service technique', value: 'service' },
        { label: 'Course', value: 'course' },
        { label: 'Autre', value: 'autre' },
    ]

    const dataCarState = [
        { label: 'Excellent', value: 'excellent' },
        { label: 'Bon', value: 'bon' },
        { label: 'Problème mecanique', value: 'probleme' },
        { label: 'Maintenance', value: 'maintenance' },
    ]

    const dataIncidentType = [
        { label: 'Accident', value: 'accident' },
        { label: 'Panne mécanique', value: 'panne' },
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
                    <SmartDatePicker label="Date de la mission" value={dateMission} onChange={(date) => setDateMission(date)} />
                    <SmartSelect selectable={editModeInfo} label="Type de mission" data={data} selectedValue={missionType} onValueChange={(value) => setMissionType(value as "livraison" | "transport" | "demenagement" | "service" | "course" | "autre")} />
                    <SmarTimePicker alertVisible={alertsVisible.departureTime} label="Heure de départ" value={departureTime} onChange={(date) => setDepartureTime(date)} />
                    <SmarTimePicker alertVisible={alertsVisible.arrivalTime} label="Heure d'arrivée" value={arrivalTime} onChange={(date) => setArrivalTime(date)} />
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

                    <SmartInput label="Point de départ" isInvalid={alertsVisible.departLocation} valid={(valeur) => setAlertsVisible({ ...alertsVisible, departLocation: !valeur })} required={true} icon={MapPin} placeholder="Adresse des départ" editMode={editModeInfo} value={startLocation} onChangeText={(text) => setStartLocation(text)} />
                    <SmartInput label="Point d'arrivée" isInvalid={alertsVisible.endLocation} valid={(valeur) => setAlertsVisible({ ...alertsVisible, endLocation: !valeur })} required={true} icon={MapPin} placeholder="Adresse d'arrivée" editMode={editModeInfo} value={endLocation} onChangeText={(text) => setEndLocation(text)} />
                    <SmartInput label="Distance parcourue (km)" isInvalid={alertsVisible.distance} valid={(valeur) => setAlertsVisible({ ...alertsVisible, distance: !valeur })} required={true} icon={Car} placeholder="0" keyboardType="numeric" editMode={editModeInfo} value={distance} onChangeText={(text) => setDistance(text)} />
                    <SmartInput label="Consommation carburant (L)" icon={Fuel} placeholder="0" keyboardType="numeric" editMode={editModeInfo} value={fuelConsumed} onChangeText={(text) => setFuelConsumed(text)} />
                    <SmartInput label="Heures de conduite" icon={Clock} placeholder="0" keyboardType="numeric" editMode={editModeInfo} value={hoursDriven} onChangeText={(text) => setHoursDriven(text)} />
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

                    <SmartSelect selectable={editModeInfo} label="Sélectionnez l'état du véhicule" data={dataCarState} selectedValue={vehicleCondition} onValueChange={(value) => setVehicleCondition(value)} />
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
                        value={observations}
                        onChangeText={(text) => setObservations(text)}
                    />

                    <SmartFilePicker label="Documents joints (photos, factures, etc.)" onFileSelect={(file) => { setTempFile(file); }} />

                </View>



                <View className="h-20" />
            </ScrollView>
            <TouchableOpacity
                onPress={handleValidate}
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