import { CircleEllipsis, Menu } from "lucide-react-native";
import { Image, Pressable, View, Platform } from "react-native";
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
                className="p-2 active:opacity-50"
                hitSlop={10} // Agrandit la zone de clic sans changer le design
            >
                <CircleEllipsis size={28} color="#334155" /> 
            </Pressable>
        </View>
    );
}