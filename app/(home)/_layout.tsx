import { Slot, useRouter, usePathname, Stack, Link, Redirect } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Car, ChartBarBig, Gauge, Locate, User } from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import NavBar from "../../src/components/organismes/NavBar/NavBar";
import SideBar from "../../src/components/organismes/SideBar/SideBar";
import BottomBar from "../../src/components/organismes/BottomBar/BottomBar";

export default function MainLayout() {
    const router = useRouter();
    const pathname = usePathname(); // Pour détecter la page actuelle
    const [isOpen, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(2);

    const menuBottom = [
        { title: "Véhicule", icon: Car, href: "/vehicles",actionType: "tabs" },
        { title: "Gps", icon: Locate, href: "/gps",actionType: "tabs" },
        { title: "Board", icon: Gauge, href: "/Acceuil",actionType: "tabs" }, // Page d'accueil (index.tsx)
        { title: "Profil", icon: User, href: "/Profil",actionType: "tabs" },
        { title: "Rapport", icon: ChartBarBig, href: "/menu/MenuIndex",actionType: "page" },
    ];

    const menuSide = [
        { title: "Véhicule", icon: Car, action: () => router.push("/vehicles") },
        { title: "Gps", icon: Locate, action: () => router.push("/gps") },
        { title: "Board", icon: Gauge, action: () => router.push("/Acceuil") },
        { title: "Profil", icon: User, action: () => router.push("/Profil") },
        { title: "Rapport", icon: ChartBarBig, action: () => router.push("/reports") },
    ]

    // Met à jour l'index actif automatiquement quand l'URL change
    useEffect(() => {
        const index = menuBottom.findIndex(item => item.href === pathname);
        if (index !== -1) setActiveIndex(index);
    }, [pathname]);

    const onChangeTabs = (index: number) => {
        setActiveIndex(index);
        const target = menuBottom[index].href;
        router.push(target); // C'est ICI que tu "changes le slot"
    };

    function onChangePage(index: number) {
        return <Redirect href={menuBottom[index].href} />
    }
    return (
        <View className="flex-1 bg-white">
            {/* NavBar persistante */}
            <NavBar onClickMenu={() => setOpen(true)} />

            {/* LE SLOT : C'est ici que le contenu de tes pages s'affiche */}
            <View className="flex-1 bg-slate-50 pt-5 px-5">
                <Slot />
            </View>

            {/* SideBar (Drawer) */}
            <SideBar isOpen={isOpen} onClose={() => setOpen(false)} menu={menuSide}/>

            {/* BottomBar persistante */}
            <BottomBar
                menu={menuBottom}
                activeIndex={activeIndex}
                onChange={onChangeTabs}
            />
        </View>
    );
}