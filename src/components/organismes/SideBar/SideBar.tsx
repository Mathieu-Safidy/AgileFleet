import { Bell, Check, Info, Trash2, X } from "lucide-react-native";
import { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Notification } from "../../../type/notifications";


type NotificationPageProps = {
    isOpen: boolean;
    onClose: () => void;
    notifications?: Notification[];
    onDeleteAll?: (index: number | null) => void;
}

export default function NotificationPage({ isOpen, onClose, notifications, onDeleteAll }: NotificationPageProps) {
    const translateX = useRef(new Animated.Value(400)).current; // On part de la droite (hors écran)
    const insets = useSafeAreaInsets();

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: isOpen ? 0 : 400,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isOpen]);

    return (
        <>
        
            {/* OVERLAY (Flou derrière) */}
            {isOpen && (
                <TouchableOpacity 
                    onPress={onClose} 
                    className="absolute inset-0 bg-black/30 z-50" 
                />
            )}

            {/* PANNEAU DE NOTIFICATIONS */}
            <Animated.View
                style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: '85%', // Prend une bonne partie de l'écran
                    height: "100%",
                    backgroundColor: "#f8fafc", // slate-50
                    paddingTop: 0,
                    paddingBottom: insets.bottom,
                    transform: [{ translateX }],
                    shadowColor: "#000",
                    shadowOffset: { width: -5, height: 0 },
                    shadowOpacity: 0.1,
                    shadowRadius: 10,
                    elevation: 10,
                }}
                className="z-50"
            >
                {/* HEADER */}
                <View className="flex-row items-center justify-between p-5 bg-white border-b border-zinc-100">
                    <View className="flex-row items-center gap-2">
                        <Bell size={20} color="#18181b" strokeWidth={2.5} />
                        <Text className="text-xl font-black text-zinc-900">Notifications</Text>
                    </View>
                    <TouchableOpacity onPress={onClose} className=" bg-zinc-100 rounded-full">
                        <X size={20} color="#71717a" />
                    </TouchableOpacity>
                </View>

                {/* LISTE DES NOTIFICATIONS */}
                <ScrollView showsVerticalScrollIndicator={false} className="flex-1 p-4">
                    {notifications && notifications.length > 0 ? (
                        notifications.map((notif) => (
                            <View 
                                key={notif.id} 
                                className={`mb-3 p-4 rounded-2xl bg-white border ${notif.isRead ? 'border-zinc-100' : 'border-green-100 bg-green-50/30'}`}
                            >
                                <View className="flex-row justify-between mb-1">
                                    <View className="flex-row items-center gap-2">
                                        {notif.type === 'alert' ? <Info size={16} color="#ef4444" /> : <Check size={16} color="#22c55e" />}
                                        <Text className={`font-bold ${notif.isRead ? 'text-zinc-700' : 'text-zinc-900'}`}>
                                            {notif.title}
                                        </Text>
                                    </View>
                                    <Text className="text-[10px] text-zinc-400 font-medium">{notif.time}</Text>
                                </View>
                                <Text className="text-zinc-500 text-sm leading-5">{notif.description}</Text>
                            </View>
                        ))
                    ) : (
                        <View className="flex-1 items-center justify-center pt-20">
                            <Bell size={48} color="#e4e4e7" />
                            <Text className="text-zinc-400 mt-4 font-medium">Aucune notification</Text>
                        </View>
                    )}
                </ScrollView>

                {/* FOOTER (Action rapide) */}
                <View className="p-4 bg-white border-t border-zinc-100">
                    <TouchableOpacity
                        className="flex-row items-center justify-center gap-2 py-3 bg-zinc-900 rounded-xl"
                        onPress={() => onDeleteAll && onDeleteAll(null)}
                    >
                        <Trash2 size={18} color="white" />
                        <Text className="text-white font-bold text-center">Tout effacer</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </>
    );
}