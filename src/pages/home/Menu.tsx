import { Car, ChartBarBig, ShipWheel, Toolbox, Users, ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type MenuProps = {
    menu?: { title: string; icon: any; action: () => void }[];
}

export default function MenuTemplates({ menu }: MenuProps) {
    const menuItems = menu || [
        // { title: "Véhicule", icon: Car, action: () => console.log("Vehicule") },
        { title: "Chauffeur", icon: ShipWheel, action: () => console.log("Chauffeur") },
        { title: "Maintenance", icon: Toolbox, action: () => console.log("Maintenance") },
        { title: "Équipe", icon: Users, action: () => console.log("Equipe") },
        { title: "Rapport", icon: ChartBarBig, action: () => console.log("Rapport") },
    ];

    return (
        <View className="flex-1 ">
            {menuItems.map((item, index) => (
                <Pressable 
                    key={index}
                    onPress={item.action}
                    // Le style dynamique pour l'effet de clic
                    className="active:opacity-70 active:scale-[0.98]"
                >
                    {/* Conteneur de la ligne */}
                    <View className="flex-row items-center bg-white mx-4 my-1.5 p-3 rounded-2xl shadow-sm border border-slate-100">
                        
                        {/* Wrapper d'icône avec fond coloré léger */}
                        <View className="w-10 h-10 rounded-xl bg-green-50 items-center justify-center mr-4">
                            <item.icon size={22} color="rgb(0 186 85)" strokeWidth={2} />
                        </View>
                        
                        {/* Texte du menu */}
                        <Text className="flex-1 text-[16px] font-semibold text-slate-800">
                            {item.title}
                        </Text>
                        
                        {/* Flèche de direction */}
                        <ChevronRight size={18} color="#94a3b8" />
                        
                    </View>
                </Pressable>
            ))}
        </View>
    );
}