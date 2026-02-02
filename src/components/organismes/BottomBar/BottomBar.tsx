import { Pressable, Text, View } from "react-native";

type BottomBarProps = {
    menu: { title?: string; icon: any }[];
    activeIndex?: number;
    onChange?: (index: number) => void;
};

export default function BottomBar({ menu, activeIndex = 0, onChange }: BottomBarProps) {
    return (
        <View className="border-t border-gray-200 absolute bottom-0 left-0 right-0 shadow-lg">
            <View className="bg-white flex-row items-center justify-around h-20 px-4">
                {menu.map((tab, index) => {
                    const IconTag = tab.icon;
                    const isActive = index === activeIndex;

                    return (
                        <Pressable
                            key={index}
                            onPress={() => onChange?.(index)}
                            className="items-center justify-center flex-1 h-full"
                        >
                            <IconTag
                                size={25}
                                color={isActive ? "rgb(0 186 85)" : "#374151"}
                                strokeWidth={2}
                            />
                            <Text
                                className="text-xs font-semibold mt-1"
                                style={{ color: isActive ? "rgb(0 186 85)" : "#374151" }}
                            >
                                {tab.title ?? " "}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
}
