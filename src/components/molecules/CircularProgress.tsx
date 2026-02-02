import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type Props = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
};

export default function CircularProgress({ percentage, size = 50, strokeWidth = 5, color = "#00ba55" }: Props){
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ width: size, height: size }} className="justify-center items-center">
      <Svg width={size} height={size}>
        {/* Cercle d'arrière-plan (Gris clair) */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e2e8f0" // slate-200
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Cercle de progression */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <Text className="absolute text-[10px] font-bold" style={{ color }}>
        {percentage}%
      </Text>
    </View>
  );
};