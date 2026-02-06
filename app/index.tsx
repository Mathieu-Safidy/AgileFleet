import { Link, Redirect, router, Slot, useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import HomeTemplates from "../src/templates/HomeTemplates";
import Acceuil from "./(home)";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { Token } from "../src/type/token";
import { User } from "../src/type/user";

export default function Home() {
  

    return ( <Redirect href="/(home)/" /> );
}