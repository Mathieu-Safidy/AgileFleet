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
    required?: boolean;
    valid?: (valeur: boolean) => void;
    isInvalid?: boolean;
}

export default function SmartInput({
    label,
    icon: Icon,
    placeholder,
    keyboardType,
    editMode = true,
    value,
    onChangeText,
    isTextArea = false, // Par défaut, c'est un input normal
    rows = 4,
    required = false,
    isInvalid = false,
    valid,
}: SmartInputProps) {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [localAlert, setLocalAlert] = useState(false);
    const alertVisible = localAlert || isInvalid;
    const handleBlur = () => {
        const isEmpty = required && !value;
        setLocalAlert(isEmpty);
        valid && valid(!isEmpty);
        setFocusedField(null);
    }
    const isCurrentFocused = focusedField === placeholder;
    const color = (isCurrentFocused && !alertVisible) ? "#22c55e" : alertVisible ? "#ef4444" : "#a1a1aa";
    return (
        <View className="mt-4">
            {label && (
                <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                    {label}
                </Text>
            )}

            <View
                className={`flex-row bg-white border-2 rounded-2xl px-4 ${isCurrentFocused ? 'border-green-500' : 'border-zinc-100'
                    } ${isTextArea ? 'py-3 items-start' : 'h-14 items-center'} ${alertVisible && required ? 'border-red-500' : ''}`}
            >
                {/* On ajuste la position de l'icône si c'est un textarea */}
                <View className={isTextArea ? "mt-1" : ""}>
                    <Icon size={20} color={color} />
                </View>

                <TextInput
                    className="flex-1 ml-3 text-zinc-900 font-semibold text-base"
                    style={isTextArea ? { textAlignVertical: 'top', minHeight: rows * 20 } : {}}
                    placeholder={placeholder}
                    placeholderTextColor="#a1a1aa"
                    keyboardType={keyboardType}
                    onFocus={() => setFocusedField(placeholder)}
                    onBlur={handleBlur}
                    editable={editMode}
                    onChangeText={onChangeText}
                    value={value}
                    // Propriétés spécifiques au TextArea
                    multiline={isTextArea}
                    numberOfLines={isTextArea ? rows : 1}
                />
            </View>
        </View>
    );
}