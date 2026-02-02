import { LucideIcon } from "lucide-react-native";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

interface SmartInputProps {
    label?: string;
    icon: any;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    keyboardType?: any;
    editMode?: boolean;
    // Ajout des props pour le mode textarea
    isTextArea?: boolean; 
    rows?: number;
}

export default function SmartInput({ 
    label, 
    icon: Icon, 
    placeholder, 
    keyboardType, 
    editMode = true,
    onChangeText,
    isTextArea = false, // Par défaut, c'est un input normal
    rows = 4 
}: SmartInputProps) {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const isCurrentFocused = focusedField === placeholder;

    return (
        <View className="mt-4">
            {label && (
                <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    {label}
                </Text>
            )}

            <View
                className={`flex-row bg-white border-2 rounded-2xl px-4 ${
                    isCurrentFocused ? 'border-green-500' : 'border-zinc-100'
                } ${isTextArea ? 'py-3 items-start' : 'h-14 items-center'}`}
            >
                {/* On ajuste la position de l'icône si c'est un textarea */}
                <View className={isTextArea ? "mt-1" : ""}>
                    <Icon size={20} color={isCurrentFocused ? "#22c55e" : "#a1a1aa"} />
                </View>

                <TextInput
                    className="flex-1 ml-3 text-zinc-900 font-semibold text-base"
                    style={isTextArea ? { textAlignVertical: 'top', minHeight: rows * 20 } : {}}
                    placeholder={placeholder}
                    placeholderTextColor="#a1a1aa"
                    keyboardType={keyboardType}
                    onFocus={() => setFocusedField(placeholder)}
                    onBlur={() => setFocusedField(null)}
                    editable={editMode}
                    onChangeText={onChangeText}
                    // Propriétés spécifiques au TextArea
                    multiline={isTextArea}
                    numberOfLines={isTextArea ? rows : 1}
                />
            </View>
        </View>
    );
}