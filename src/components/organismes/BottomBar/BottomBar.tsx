import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ComponentType } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgProps } from "react-native-svg";
type RootStackParamList = {
    Home: undefined;
    Sidebar: undefined;
};

// Props du BottomBar
type BottomBarProps = {
    menu: { title?: string; icon: any; action?: () => void }[];
    navigation?: NativeStackNavigationProp<RootStackParamList, "Home">;
    activeIndex?: number;
    onChange?: (index: number) => void;
};

export default function BottomBar({ menu, navigation, activeIndex, onChange }: BottomBarProps) {
    return (
        <View className=" border-t border-gray-200 border-b bottom-0 absolute left-0 right-0 shadow-lg">
            <View className="bg-white flex-row items-center justify-around h-20 px-4">
                {menu.map((tab, index) => {
                    const IconTag = tab.icon;
                    const isActive = index === (activeIndex ?? 0);
                    return (
                        <Pressable
                            key={index}
                            onPress={() => onChange && onChange(index)}
                            className="items-center justify-center flex-1 h-full"
                        >
                            <IconTag size={25} color={isActive ? "rgb(0 186 85)" : "#374151"} strokeWidth={2} />
                            <Text className="text-xs font-semibold mt-1 text-gray-700" style={{ color: isActive ? "rgb(0 186 85)" : "#374151" }}>
                                {tab.title ?? " "}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}