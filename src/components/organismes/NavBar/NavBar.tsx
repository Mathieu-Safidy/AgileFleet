import { Bell, CircleEllipsis, Menu } from "lucide-react-native";
import { Image, Pressable, View, Platform, Text } from "react-native";
import logo from "../../../../assets/agilfleet.png";

type NavBarProps = {
    onClickMenu?: () => void;
}

export default function NavBar({ onClickMenu }: NavBarProps) {
    return (
        <View
            // On ajoute l'élévation pour Android car shadow-sm ne suffit pas
            style={{
                ...Platform.select({
                    ios: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 3,
                    },
                    android: {
                        elevation: 5,
                    },
                }),
            }}
            className="flex flex-row items-center justify-between px-4 h-16 bg-white z-30"
        >
            <Image
                source={logo}
                className="w-28 h-10"
                resizeMode="contain"
            />

            <Pressable
                onPress={onClickMenu}
                className="p-2 active:opacity-50 relative" // Ajout de relative pour positionner le badge
                hitSlop={10}
            >
                <Bell size={28} color="#334155" />

                {/* BADGE */}
                <View
                    className="absolute top-1 right-1 bg-red-500 min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white"
                    style={{ elevation: 3 }} // Petit relief sur Android
                >
                    <Text className="text-white text-[10px] font-bold px-1">
                        3
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}