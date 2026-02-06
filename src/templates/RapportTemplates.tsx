import { AlertTriangle, ChartNoAxesColumnIncreasing, CircleCheckBig, Clock, Plus, Search } from "lucide-react-native";
import { ActivityIndicator, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import SmartInput from "../components/molecules/SmartInput";
import ReportCard from "../components/molecules/ReportCard";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchDriverStats, fetchReports, ReportFilters } from "../thunk/reportthunk";
import { setFilters } from "../slices/reportSlice";

export default function RapportTemplates() {
    const user = useSelector((state: RootState) => state.auth);
    const { liste: reports = [], stats, filters, loading, loadingStats, totalPages, page, limit } = useSelector((state: RootState) => state.reports || {});
    const [rapports, setRapports] = useState<any[]>([]);

    // const [loading, setLoading] = useState(true);
    const [nombreResultats, setNombreResultats] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [recherche, setRecherche] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);

    const [localFilterStatus, setLocalFilterStatus] = useState<string>('all');
    // const [stats, setStats] = useState<{ total: number, enAttente: number, rejete: number, valide: number }>({ total: 0, enAttente: 0, rejete: 0, valide: 0 });
    const STATUTS = [{ lib: "Tout les status", value: '' }, { lib: "Validé", value: 'validé' }, { lib: "En attente", value: 'en attente' }, { lib: "Rejeté", value: 'rejeté' }, { lib: "Soumis", value: 'soumis' }];
    const [filter, setFilter] = useState({ lib: "Tout les status", value: '' });
    const router = useRouter();
    console.log("2. Selector Auth passé", user);
    const dispatch = useDispatch<AppDispatch>();
    console.log("3. Selector passé");

    const handlerNewReport = () => {
        router.push("/parametre/rapport")
    }

    const handleUpdateReport = (id: string) => {
        router.push({
            pathname: "/parametre/rapport",
            params: { id }
        })
    }

    // useEffect(() => {
    //     console.log("User ID au rendu:", user?.id)
    // }, []);

    useEffect(() => {
        setLocalFilterStatus(filter.value);
        dispatch(setFilters({ page: 1 }))

        // console.log("Composant RapportTemplates Rendu !");
        // Ici tu peux ajouter du code pour charger les rapports depuis une API si besoin
        // const fetchRapports = async () => {
        //     try {
        //         setLoading(true);
        //         // const user = await AsyncStorage.getItem("user");
        //         // Utilisation de ta variable d'environnement
        //         let link = `${process.env.EXPO_PUBLIC_BACKEND_URL}/report?page=1&limit=10&driverId=${user ? user.id : ""}&search=${recherche}${filter.lib !== "Tout les status" ? `&status=${filter.value}` : ""}`;
        //         const response = await fetch(link, {
        //             method: 'GET', // ou POST
        //             headers: {
        //                 'Accept': 'application/json',
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `Bearer ${user ? user.token : ""}`,
        //             },
        //         });
        //         if (!response.ok) {
        //             throw new Error('Erreur réseau link ' + link);
        //         }
        //         const json = await response.json();
        //         setRapports(json.reports);
        //         setNombreResultats(json.total);
        //     } catch (e: any) {
        //         console.log('====================================');
        //         console.log(e);
        //         console.log('====================================');
        //         setError(e.message);
        //     } finally {
        //         setLoading(false);
        //     }
        // }

        // fetchRapports();


    }, [recherche, filter]);

    // useEffect(() => {
    //     const fetchstats = async () => {
    //         try {
    //             // setLoading(true);
    //             // const user = await AsyncStorage.getItem("user");
    //             // Utilisation de ta variable d'environnement
    //             const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/report/driver/stats`, {
    //                 method: 'GET', // ou POST
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${user ? user.token : ""}`,
    //                 },
    //             });
    //             if (!response.ok) {
    //                 throw new Error('Erreur réseau');
    //             }
    //             const json = await response.json();
    //             // setStats({ total: json.total, enAttente: json.pending, rejete: json.rejected, valide: json.submitted });

    //         } catch (error: any) {
    //             setError(error.message);
    //         } finally {
    //             // setLoading(false);
    //         }
    //     }
    //     fetchstats();
    // }, []);

    const loadReports = useCallback(() => {
        if (!user?.id) return;
        const filterParams: ReportFilters = {
            ...filters,
            page,
            limit,
            // @ts-ignore
            driverId: user.id,
        };
        console.log('===========filtre===================');
        console.log(filterParams);
        console.log('====================================');
        if (recherche) filterParams.search = recherche;
        if (localFilterStatus !== 'all') filterParams.status = localFilterStatus;
        dispatch(fetchReports(filterParams));
    }, [dispatch, user?.id, page, limit, filters, recherche, localFilterStatus]);


    useEffect(() => {
        console.log("User ID au rendu:", user)
        if (user?.id) {
            dispatch(fetchDriverStats());
            loadReports();
            console.log('=============loading============');
            console.log('fecth', JSON.stringify(reports));
            console.log('====================================');
            // fetchVehicleData();
        }
    }, [user?.id, dispatch, loadReports]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (user?.id) loadReports();
    //     }, 400);
    //     return () => clearTimeout(timer);
    // }, [recherche, localFilterStatus, page, loadReports, user?.id]);


    // if (loading) return <ActivityIndicator size="large" />;
    // if (error) return <Text>Erreur : {error}</Text>; 
    // https://api.agilfleet.fr/report?page=1&limit=10&driverId=



    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} className="bg-slate-50 flex-1 py-4">
                <View className="pb-4 mb-4">

                    {/* GRILLE ASYMETRIQUE */}
                    <View className="">
                        <View className="flex flex-row gap-3 h-[320px] mb-6 bg-white border-2 border-gray-100 rounded-[20%] mx-4">

                            {/* Colonne 1 : Une grande carte (ex: Consommation) */}
                            <View className="flex-1 justify-center">
                                <View className=" min-h-[160px] rounded-3xl p-4 items-center justify-center">
                                    <View className="w-12 h-12 rounded-2xl bg-orange-50 items-center justify-center mb-4">
                                        <ChartNoAxesColumnIncreasing size={24} color="#f97316" />
                                    </View>
                                    <Text className="text-3xl font-black text-zinc-900">{stats?.total}</Text>
                                    <Text className="text-zinc-400 text-xs font-bold uppercase tracking-tighter mt-1">Total</Text>
                                </View>
                            </View>

                            {/* Colonne 2 : Deux petites cartes empilées (ex: Alertes / OK) */}
                            <View className="flex-1 gap-3">
                                <View className="flex-1 min-h-[160px] rounded-3xl p-4 items-center justify-center">
                                    <View className="w-12 h-12 rounded-xl bg-red-50 items-center justify-center mb-2">
                                        <AlertTriangle size={24} color="#ef4444" />
                                    </View>
                                    <Text className="text-3xl font-black text-zinc-900">{stats?.rejected}</Text>
                                    <Text className="text-zinc-400 text-[10px] font-bold uppercase">Rejetés</Text>
                                </View>

                                <View className="flex-1 min-h-[160px] rounded-3xl p-4 items-center justify-center">
                                    <View className="w-12 h-12 rounded-xl bg-yellow-50 items-center justify-center mb-2">
                                        <Clock size={24} color="#ca8a04" />
                                    </View>
                                    <Text className="text-3xl font-black text-zinc-900">{stats?.pending}</Text>
                                    <Text className="text-zinc-400 text-[10px] font-bold uppercase">En attente</Text>
                                </View>
                            </View>

                            {/* Colonne 3 : Une grande carte (ex: Distance) */}
                            <View className="flex-1 justify-center">
                                <View className="min-h-[160px] rounded-3xl p-4 items-center justify-center">
                                    <View className="w-12 h-12 rounded-2xl bg-green-50 items-center justify-center mb-4">
                                        <CircleCheckBig size={24} color="#22c55e" />
                                    </View>
                                    <Text className="text-3xl font-black text-zinc-900">{stats?.validated}</Text>
                                    <Text className="text-zinc-400 text-xs font-bold uppercase tracking-tighter mt-1">Valide</Text>
                                </View>
                            </View>
                        </View>

                    </View>
                    <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest ml-4 mt-3">Liste de rapport</Text>

                    <View className="flex-1 mt-3 border border-zinc-100 bg-white rounded-2xl p-4 shadow-sm">
                        {/* Barre de recherche principale */}
                        <SmartInput
                            icon={Search}
                            placeholder="Recherche par trajet ou ID"
                            value={recherche}
                            editMode={true}
                            onChangeText={(text) => { setRecherche(text) }}
                        />

                        {/* Séparateur subtil */}
                        <View className="h-[1px] bg-zinc-100 w-full my-4" />

                        {/* Section Filtres Rapides */}
                        <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-3">
                            Filtres rapides
                        </Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                            {STATUTS.map((statut, index) => {
                                const isActive = filter.lib === statut.lib;

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
                                            {statut.lib}
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
                                Résultats ({reports.length})
                            </Text>
                            <TouchableOpacity>
                                <Text className="text-green-600 text-[10px] font-bold uppercase">Voir tout</Text>
                            </TouchableOpacity>
                        </View>
                        {loading && <ActivityIndicator size="large" />}
                        {error && <Text>Erreur : {error}</Text>}
                        {!loading && !error && reports.length > 0 && reports && reports.map((report, index) => (
                            <ReportCard
                                key={index}
                                updateAction={() => handleUpdateReport(report.id)}
                                report={{
                                    tripId: report.reportId,
                                    status: report.status,
                                    date: report.missionDate,
                                    from: report.startLocation,
                                    to: report.endLocation,
                                    category: report.missionType,
                                    duree: report.hoursDriven,
                                    distance: report.distance,
                                    vehicle: report.vehicle,
                                    departureTime: report.departureTime,
                                    arrivalTime: report.arrivalTime,
                                    startLocation: report.startLocation,
                                    endLocation: report.endLocation,
                                    duration: report.hoursDriven,
                                    fuelConsumed: report.fuelConsumed,
                                    vehicleCondition: report.vehicleCondition,
                                    createdAt: report.createdAt,
                                    incidents: report.incidents
                                    // description: "Plein de gasoil effectué avant le départ pour la mission longue distance.",
                                    // adminComment: "Veuillez joindre la photo du ticket de caisse pour validation."
                                }}
                            />
                        ))
                        }
                        {/* Les cartes sont affichées directement ici */}


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