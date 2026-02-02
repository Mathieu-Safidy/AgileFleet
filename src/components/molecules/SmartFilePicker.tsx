import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { FileUp, X, FileText, FileImage, Paperclip } from 'lucide-react-native';

interface SmartFilePickerProps {
    label: string;
    onFileSelect: (file: DocumentPicker.DocumentPickerAsset | null) => void;
}

export default function SmartFilePicker({ label, onFileSelect }: SmartFilePickerProps) {
    const [file, setFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: [
                    'image/png', 
                    'image/jpeg', 
                    'application/pdf', 
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                ],
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                const selectedFile = result.assets[0];

                // Validation de la taille (10 Mo = 10 * 1024 * 1024 octets)
                if (selectedFile.size && selectedFile.size > 10 * 1024 * 1024) {
                    Alert.alert("Fichier trop lourd", "La taille maximum est de 10 Mo.");
                    return;
                }

                setFile(selectedFile);
                onFileSelect(selectedFile);
            }
        } catch (err) {
            Alert.alert("Erreur", "Impossible de lire le fichier.");
        }
    };

    const removeFile = () => {
        setFile(null);
        onFileSelect(null);
    };

    // Déterminer l'icône selon le type
    const getFileIcon = (mimeType?: string) => {
        if (mimeType?.includes('image')) return <FileImage size={24} color="#22c55e" />;
        if (mimeType?.includes('pdf')) return <FileText size={24} color="#ef4444" />;
        return <Paperclip size={24} color="#7c3aed" />;
    };

    return (
        <View className="mt-4">
            <Text className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2 ml-1">
                {label}
            </Text>

            {!file ? (
                <Pressable
                    onPress={pickDocument}
                    className="border-2 border-dashed border-zinc-200 bg-zinc-50 rounded-2xl h-32 items-center justify-center active:bg-zinc-100"
                >
                    <View className="bg-white p-3 rounded-full shadow-sm mb-2">
                        <FileUp size={24} color="#71717a" />
                    </View>
                    <Text className="text-zinc-500 font-bold text-xs">Ajouter une pièce jointe</Text>
                    <Text className="text-zinc-400 text-[10px]">PNG, JPG, PDF ou DOC (max 10Mo)</Text>
                </Pressable>
            ) : (
                <View className="bg-white border border-zinc-100 rounded-2xl p-4 flex-row items-center shadow-sm">
                    <View className="bg-zinc-50 p-3 rounded-xl">
                        {getFileIcon(file.mimeType)}
                    </View>
                    
                    <View className="flex-1 ml-3">
                        <Text className="text-zinc-900 font-bold text-sm" numberOfLines={1}>
                            {file.name}
                        </Text>
                        <Text className="text-zinc-400 text-[10px]">
                            {(file.size! / (1024 * 1024)).toFixed(2)} Mo
                        </Text>
                    </View>

                    <Pressable 
                        onPress={removeFile}
                        className="bg-red-50 p-2 rounded-full"
                    >
                        <X size={16} color="#ef4444" />
                    </Pressable>
                </View>
            )}
        </View>
    );
}