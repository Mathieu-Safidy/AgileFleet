import { Link, Redirect, router, Slot } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeTemplates from "../src/templates/HomeTemplates";
import Acceuil from "./(home)/Acceuil";

export default function Home() {
    return (
        <Redirect href="/Acceuil" />
    );
}