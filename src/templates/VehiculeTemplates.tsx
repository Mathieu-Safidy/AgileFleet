import { Activity, Battery, ChevronRight, CircleGauge, Fuel, Gauge, Power, ThermometerSun, TrendingDown, User } from "lucide-react-native";
import { Pressable, ProgressBarAndroidBase, ScrollView, Text, View } from "react-native";
import CircularProgress from "../components/molecules/CircularProgress";
import { use } from "react";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

function VehiculeTemplates({ temp = 93 }: { temp?: number }) {

    const percentage = Math.min((temp / 120) * 100, 100);
    const router = useRouter();
    // Couleur dynamique
    const getBarColor = () => {
        if (temp > 100) return "bg-red-500";
        if (temp > 90) return "bg-orange-500";
        return "bg-blue-500";
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false} >
            <View className="flex flex-row justify-around gap-4 flex-wrap pb-24 mt-4">

                {/* Bloc 1 */}
                <View className={`flex-1 w-full p-4 rounded-2xl shadow-xl min-w-[140px] max-w-[48%] bg-white border-2 border-zinc-100 `} style={{ elevation: 10 }}>
                    {/* <Text className="text-lg font-semibold mb-2">Bloc 2</Text> */}
                    <View className="flex flex-col justify-between items-center pe-0">
                        <View className="w-10 h-10 rounded-2xl bg-green-50 items-center justify-center mb-4">
                            <Fuel size={22} color={`rgb(0 0 0)`} strokeWidth={2} />
                        </View>
                        <View className="mb-4">
                            <CircularProgress percentage={75} size={90} strokeWidth={5} color={"rgb(0,186,85)"} />
                        </View>
                        <Text className="text-center text-md font-bold">
                            Niveau Carburant
                        </Text>
                    </View>
                </View>

                {/* Bloc 1 */}
                <View className={`flex-1 w-full p-4 rounded-2xl shadow-xl min-w-[140px] max-w-[48%] bg-white border-2 border-zinc-100 `} style={{ elevation: 10 }}>
                    {/* <Text className="text-lg font-semibold mb-2">Bloc 2</Text> */}
                    <View className="flex flex-col justify-between items-center pe-0">
                        <View className="w-10 h-10 rounded-2xl bg-green-50 items-center justify-center mb-4">
                            <Gauge size={22} color={`rgb(0 0 0)`} strokeWidth={2} />
                        </View>
                        <View className="mb-4">
                            <CircularProgress percentage={75} size={90} strokeWidth={5} color={"red"} />
                        </View>
                        <Text className="text-center text-md font-bold">
                            Vitesse
                        </Text>
                    </View>
                </View>
                
                

                {/* Temperature */}
                <View
                    className="flex-1 w-full min-w-full p-4 rounded-2xl shadow-xl bg-white border-2 border-zinc-100"
                    style={{ elevation: 10 }}
                >
                    {/* Ligne unique : Icône + Titre + Valeur */}
                    <View className="flex-row items-center justify-between mb-4">

                        {/* Gauche : Icône + Label */}
                        <View className="flex-row items-center gap-1">
                            <ThermometerSun size={18} color="#3f3f46" strokeWidth={2.5} />
                            <Text className="text-zinc-500 text-[10px] font-bold uppercase">
                                Moteur
                            </Text>
                        </View>

                        {/* Droite : Valeur */}
                        <View className="flex-row items-baseline">
                            <Text className="text-xl font-black text-zinc-900-red">{temp}</Text>
                            <Text className="text-xs font-bold text-zinc-400 ml-0.5">°C</Text>
                        </View>

                    </View>

                    {/* Barre de Progression Custom */}
                    <View className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <View
                            className={`h-full rounded-full ${getBarColor()}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </View>

                    <View className="flex-row justify-between mt-1">
                        <Text className="text-[10px] text-zinc-400 font-bold">0°</Text>
                        <Text className="text-[10px] text-zinc-400 font-bold">120°</Text>
                    </View>
                </View>

                {/* Bloc 1 */}
                <View
                    className="flex-1 w-full p-4 rounded-2xl  min-w-[140px] max-w-[48%] bg-white border-2 border-zinc-100 shadow-xl"
                    style={{ elevation: 10 }}
                >
                    {/* Header avec Icône et Label */}
                    <View className="flex-row items-center gap-2 mb-2">
                        <View className="p-1.5 bg-green-100 rounded-lg">
                            <Activity size={14} color="#3f3f46" strokeWidth={2.5} />
                        </View>
                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                            Kilométrage
                        </Text>
                    </View>

                    {/* Valeur Principale */}
                    <View className="flex-row items-baseline ">
                        <Text className="font-black text-3xl  text-zinc-900 tracking-tighter">
                            20813
                        </Text>
                        <Text className="flex-1 w-full ml-1 text-right text-zinc-400 font-bold text-xs uppercase">
                            km
                        </Text>
                    </View>

                    {/* Petit indicateur visuel optionnel pour remplir l'espace */}
                    <View className="mt-2 w-full h-1 bg-green-50 rounded-full overflow-hidden">
                        <View className="w-2/3 h-full bg-green-200 rounded-full" />
                    </View>
                </View>

                

                {/* Bloc 1 */}
                <View
                    className="flex-1 w-full p-4 rounded-2xl  min-w-[140px] max-w-[48%] bg-white border-2 border-zinc-100 shadow-xl"
                    style={{ elevation: 10 }}
                >
                    {/* Header avec Icône et Label */}
                    <View className="flex-row items-center gap-2 mb-2">
                        <View className="p-1.5 bg-green-100 rounded-lg">
                            <CircleGauge size={14} color="#3f3f46" strokeWidth={2.5} />
                        </View>
                        <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                            Tour Moteur
                        </Text>
                    </View>

                    {/* Valeur Principale */}
                    <View className="flex-row items-baseline ">
                        <Text className="font-black text-3xl text-zinc-900 tracking-tighter">
                            6.5
                        </Text>
                        <Text className="flex-1 w-full ml-1 text-rigMoteurht text-zinc-400 font-bold text-xs uppercase">
                            tr/min
                        </Text>
                    </View>

                    {/* Petit indicateur visuel optionnel pour remplir l'espace */}
                    <View className="mt-2 w-full items-start h-1 bg-green-50 rounded-full overflow-hidden">
                        <View className="w-2/3 h-full bg-green-200 rounded-full" />
                    </View>
                </View>

                {/* Historique approvisionnement carburant */}
                <Pressable 
                onPress={() => { router.push('/parametre/historique')}}
                className={`flex-1 w-full min-w-full p-4 rounded-2xl shadow-xl bg-white border-2 border-zinc-100 active:opacity-70`}>
                    <View className="flex-row items-center justify-between gap-2">
                        <Text className="text-zinc-500 text-[10px] font-bold uppercase">
                            Historique Approvisionnement Carburant
                        </Text>
                        <View>
                            <ChevronRight size={16} color="#3f3f46" strokeWidth={2.5} />
                        </View>
                    </View>
                </Pressable>

                {/* Autre */}
                <View
                    className="flex-1 w-full p-4 rounded-2xl shadow-xl bg-white border-2 border-zinc-100"
                    style={{ elevation: 10 }}
                >
                    <View className="flex-row items-center gap-1">
                        <Text className="text-zinc-500 text-[10px] font-bold uppercase">
                            Autre
                        </Text>
                    </View>

                    {/* Tension */}
                    <View className="flex flex-row justify-between">
                        <View className="flex-row items-center gap-1 mt-4">
                            <Power size={18} color="#3f3f46" strokeWidth={2.5} />
                            <Text className="ms-1 text-zinc-500 text-[13px] font-bold">
                                Etat Moteur
                            </Text>
                        </View>
                        <View className="flex-row gap-1 mt-4 items-baseline ">
                            <Text className="font-black text-md text-zinc-900 tracking-tighter">
                                Actif
                            </Text>
                            {/* <Text className="ml-1 text-md text-zinc-900 font-bold ">
                                tr/min
                            </Text> */}
                        </View>
                    </View>


                    {/* Tension */}
                    <View className="flex flex-row justify-between">
                        <View className="flex-row items-center gap-1 mt-4">
                            <Battery size={18} color="#3f3f46" strokeWidth={2.5} />
                            <Text className="ms-1 text-zinc-500 text-[13px] font-bold">
                                Tension
                            </Text>
                        </View>
                        <View className="flex-row gap-1 mt-4 items-baseline">
                            <Text className="font-black text-md text-zinc-900 tracking-tighter">
                                6.5
                            </Text>
                            <Text className="ml-1 text-md text-zinc-900 font-bold ">
                                V
                            </Text>
                        </View>
                    </View>

                    {/* Consommation */}
                    <View className="flex flex-row justify-between">
                        <View className="flexhistorique-row items-center gap-1 mt-4">
                            <TrendingDown size={18} color="#3f3f46" strokeWidth={2.5} />
                            <Text className="ms-1 text-zinc-500 text-[13px] font-bold">
                                Consommation
                            </Text>
                        </View>
                        <View className="flex-row gap-1 mt-4 items-baseline">
                            <Text className="font-black text-md text-zinc-900 tracking-tighter">
                                6.5
                            </Text>
                            <Text className="ml-1 text-md text-zinc-900 font-bold ">
                                L/100km
                            </Text>
                        </View>
                    </View>

                </View>

            </View>
        </ScrollView>
    );
}

export default VehiculeTemplates;