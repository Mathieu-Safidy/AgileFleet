import React from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts"; // Changement ici

type GraphProps = {
    color?: string; 
    data?: Array<{ value: number; label: string }>;
    titre?: string;
};

function LineGraph({ color, data , titre = "Activité Flotte (Courbe)" }: GraphProps) {
    const DATA = data || [
        { value: 20, label: "Lun" },
        { value: 45, label: "Mar" },
        { value: 28, label: "Mer" },
        { value: 80, label: "Jeu" },
        { value: 99, label: "Ven" },
        { value: 43, label: "Sam" },
        { value: 50, label: "Dim" },
    ];

    const screenWidth = Dimensions.get("window").width;
    // Largeur adaptée au padding du conteneur
    const chartWidth = screenWidth - 110;

    return (
        <View className="p-4 items-center bg-white rounded-xl shadow-md" style={{ elevation: 5 }}>
            <Text className="text-base font-bold mb-5 text-gray-800">
                { titre }
            </Text>

            <LineChart
                data={DATA}
                height={200}
                width={chartWidth}
                
                // --- Style de la ligne ---
                color={color || "#007AFF"}
                thickness={3}
                curved // Rend la ligne lisse/arrondie
                hideRules
                
                // --- Points sur la ligne ---
                dataPointsColor={color || "#007AFF"}
                dataPointsRadius={4}
                
                // --- Axes ---
                yAxisThickness={0}
                xAxisThickness={0}
                yAxisTextStyle={{ color: '#64748b' }}
                xAxisLabelTextStyle={{ color: '#64748b', fontSize: 12 }}
                
                // --- Animation ---
                isAnimated
                animationDuration={1200}
                
                // --- Zone sous la courbe (Optionnel) ---
                areaChart // Transforme en graphique d'aire
                startFillColor={color || "#007AFF"}
                startOpacity={0.2}
                endOpacity={0.05}
            />
        </View>
    );
};

export default LineGraph;