import { BoxSelect, LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import { Picker } from '@react-native-picker/picker';
type InputFieldProps = {
    placeholder?: string;
    selectedValue?: string;
    onValueChange?: (itemValue: string, itemIndex: number) => void;
    selectable?: boolean;
    data?: Array<{ label: string; value: string | number }>;
    label?: string;
};


export default function SmartSelect({ selectedValue, onValueChange, selectable, data, placeholder , label }: InputFieldProps) {
    // console.log('============selected value composant===============');
    // console.log(selectedValue);
    // console.log('====================================');
    return (
        <View className="mt-4">
            {label && (
                <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    {label}
                </Text>
            )}

            <View className="bg-white border border-zinc-200 rounded-2xl overflow-hidden">
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onValueChange}
                    enabled={selectable}
                    
                >
                    {placeholder && (
                        <Picker.Item label={placeholder} value="" key="default" enabled={false} />
                    )}

                    {data && data.map((item, index) => (
                        <Picker.Item label={item.label} value={item.value} key={index} />
                    ))}
                </Picker>
            </View>
        </View>
    )
}