import React from "react";
import { View, Text, Dimensions } from "react-native";
import { CartesianChart, Line } from "victory-native";

const DATA = [
  { day: "Lun", value: 20 },
  { day: "Mar", value: 40 },
  { day: "Mer", value: 35 },
  { day: "Jeu", value: 50 },
  { day: "Ven", value: 45 },
];

export default function Graph() {
  return (
    <View style={{ height: 250, width: '100%', backgroundColor: 'white', padding: 16, borderRadius: 12 }}>
      <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Statistiques</Text>
      
      <CartesianChart data={DATA} xKey="day" yKeys={["value"]}>
        {({ points }) => (
          <Line
            points={points.value}
            color="rgb(0, 186, 85)"
            strokeWidth={3}
            animate={{ type: "timing", duration: 500 }} // Animation fluide
          />
        )}
      </CartesianChart>
    </View>
  );
}