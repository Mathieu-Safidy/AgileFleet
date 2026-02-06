import React, { useState } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Clock } from 'lucide-react-native';

interface SmartTimePickerProps {
    label: string;
    value: Date;
    onChange: (date: Date) => void;
    alertVisible?: boolean;
}

export default function SmartTimePicker({ label, value, onChange , alertVisible }: SmartTimePickerProps) {
    const [show, setShow] = useState(false);

    const handleTimeChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        // Sur Android, on ferme dès qu'une heure est choisie ou si on annule
        if (Platform.OS === 'android') {
            setShow(false);
        }

        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    const formattedTime = value.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

     const color = (show && !alertVisible) ? "#22c55e" : alertVisible ? "#ef4444" : "#a1a1aa";

    return (
        <View className="mt-4">
            <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                {label}
            </Text>

            <Pressable
                onPress={() => setShow(true)}
                // On change la bordure dynamiquement si 'show' est vrai
                className={`flex-row items-center bg-white border p-4 rounded-2xl shadow-sm active:bg-zinc-50 
                    ${ show ? 'border-purple-500' : 'border-zinc-100' } ${alertVisible ? 'border-red-500' : ''}` }
            >
                <View className={`p-2 rounded-xl mr-3 ${show ? 'bg-purple-100' : 'bg-zinc-50'}`}>
                    <Clock size={18} color={color} />
                </View>
                
                <Text className={`font-bold text-lg ${show ? 'text-purple-600' : 'text-zinc-900'}`}>
                    {formattedTime}
                </Text>
            </Pressable>

            {show && (
                <DateTimePicker
                    value={value}
                    mode="time"
                    is24Hour={true}
                    // 'spinner' est souvent plus propre sur iOS pour les heures
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'} 
                    onChange={handleTimeChange}
                />
            )}
        </View>
    );
}