import React from "react";
import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-gifted-charts";

type GraphProps = {
  color?: string;
  data?: Array<{ value: number; label: string }>;
};

function BarGraph({ color, data }: GraphProps){
  const DATA = data || [
    { value: 50, label: 'Jan' },
    { value: 80, label: 'Feb' },
    { value: 40, label: 'Mar' },
    { value: 95, label: 'Apr' },
    { value: 85, label: 'May' },
    { value: 55, label: 'Jun' },
    { value: 70, label: 'Jul' },
    { value: 100, label: 'Aug' },
    { value: 65, label: 'Sep' },
    { value: 90, label: 'Oct' },
    { value: 75, label: 'Nov' },
    { value: 110, label: 'Dec' },
  ];

  // On calcule la largeur dynamiquement pour que ça reste centré dans votre View p-10
  const screenWidth = Dimensions.get("window").width;
  const chartWidth = screenWidth - 120; // Ajusté pour tenir compte du p-10 (padding 40px x 2)

  return (
    <View className="p-9 ps-3 flex rounded-2xl bg-white items-center justify-center shadow-md">
      <Text className="text-lg font-bold mb-5 text-gray-800 text-start">
        Activité Flotte
      </Text>
      
      <BarChart
        data={DATA}
        barWidth={25}
        spacing={20}
        roundedTop
        // roundedBottom
        hideRules
        xAxisThickness={1}
        yAxisThickness={1}
        xAxisColor="#e5e7eb" // gray-200
        yAxisColor="#e5e7eb" // gray-200
        yAxisTextStyle={{ color: '#94a3b8' }} // text-slate-400
        xAxisLabelTextStyle={{ color: '#94a3b8', fontSize: 11 }}
        frontColor={color || "#3b82f6"} // blue-500 (NativeWind standard)
        height={200}
        width={chartWidth}
        isAnimated
        animationDuration={1000}
      />
    </View>
  );
};

export default BarGraph;