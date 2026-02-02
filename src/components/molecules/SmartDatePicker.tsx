import React, { useState } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Calendar } from 'lucide-react-native';

interface SmartDatePickerProps {
    label: string;
    value: Date;
    onChange: (date: Date) => void;
}

export default function SmartDatePicker({ label, value, onChange }: SmartDatePickerProps) {
    const [show, setShow] = useState(false);

    const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        // Sur Android, on ferme après sélection
        if (Platform.OS === 'android') {
            setShow(false);
        }

        if (selectedDate) {
            onChange(selectedDate);
        }
    };

    // Formatage français (ex: 30 Janvier 2026)
    const formattedDate = value.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <View className="mt-4">
            <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                {label}
            </Text>

            <Pressable
                onPress={() => setShow(true)}
                className={`flex-row items-center bg-white border p-4 rounded-2xl shadow-sm active:bg-zinc-50 ${
                    show ? 'border-green-500' : 'border-zinc-100'
                }`}
            >
                <View className={`p-2 rounded-xl mr-3 ${show ? 'bg-green-100' : 'bg-zinc-50'}`}>
                    <Calendar size={18} color={show ? "#22c55e" : "#a1a1aa"} />
                </View>
                
                <Text className={`font-bold text-lg ${show ? 'text-green-600' : 'text-zinc-900'}`}>
                    {formattedDate}
                </Text>
            </Pressable>

            {show && (
                <DateTimePicker
                    value={value}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'inline' : 'calendar'}
                    onChange={handleDateChange}
                    // Optionnel : restreindre les dates (ex: pas de futur)
                    maximumDate={new Date()} 
                />
            )}
        </View>
    );
}