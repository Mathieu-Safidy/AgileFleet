import { LucideIcon } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileItemProps {
    icon: LucideIcon; // On précise que c'est une icône Lucide
    label: string;
    isLast?: boolean;
    action?: () => void;
}

// Sous-composant pour les lignes de menu
export default function ProfileItem ({ icon: Icon, label, isLast = false , action }: ProfileItemProps) {
    return (
        <TouchableOpacity onPress={action} className={`flex-row items-center justify-between p-4 ${!isLast ? 'border-b border-zinc-50' : ''}`}>
            <View className="flex-row items-center gap-4">
                <View className="p-2 bg-slate-50 rounded-xl">
                    <Icon size={20} color="#71717a" />
                </View>
            <Text className="font-semibold text-zinc-700">{label}</Text>
        </View>
        <Text className="text-zinc-300 text-xl">›</Text>
    </TouchableOpacity>
);
}