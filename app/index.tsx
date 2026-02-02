import { Link, Redirect, router, Slot } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import HomeTemplates from "../src/templates/HomeTemplates";
import Acceuil from "./(home)";

export default function Home() {
    return (
        <Redirect href="/(home)/" />
    );
}