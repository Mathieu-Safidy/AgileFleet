import { Slot, useRouter, usePathname } from "expo-router";
import { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Car, ChartBarBig, Gauge, Locate, User } from "lucide-react-native";
import NavBar from "../../src/components/organismes/NavBar/NavBar";
import SideBar from "../../src/components/organismes/SideBar/SideBar";
import BottomBar from "../../src/components/organismes/BottomBar/BottomBar";
import { Notification } from "../../src/type/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { hydrateAuth } from "../../src/slices/authSlice";

export default function MainLayout() {
    const router = useRouter();
    const pathname = usePathname(); // Pour détecter la page actuelle
    const [isOpen, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(2);
    const dispatch = useDispatch();
    const [notifications, setNotifications] = useState<Notification[]>([
        { id: '1', type: 'alert', title: 'Maintenance', description: 'Vidange prévue pour la Peugeot 205 dans 500km.', time: '10 min', isRead: false },
        { id: '2', type: 'success', title: 'Plein effectué', description: 'Le véhicule 1234 AB 56 a été ravitaillé.', time: '2h', isRead: true },
        { id: '3', type: 'info', title: 'Nouveau trajet', description: 'Un nouveau planning est disponible pour demain.', time: 'Hier', isRead: true },
    ]);

    const menuBottom = [
        { title: "Véhicule", icon: Car, href: "/", actionType: "tabs" },
        // { title: "Gps", icon: Locate, href: "/gps",actionType: "tabs" },
        { title: "Board", icon: Gauge, href: "/home", actionType: "tabs" }, // Page d'accueil (index.tsx)
        { title: "Profil", icon: User, href: "/profil", actionType: "tabs" },
        { title: "Rapport", icon: ChartBarBig, href: "/rapport", actionType: "page" },
    ];

    const menuSide = [
        { title: "Véhicule", icon: Car, action: () => router.push("/") },
        { title: "Gps", icon: Locate, action: () => router.push("/gps") },
        { title: "Board", icon: Gauge, action: () => router.push("/home") },
        { title: "Profil", icon: User, action: () => router.push("/profil") },
        { title: "Rapport", icon: ChartBarBig, action: () => router.push("/rapport") },
    ];


    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkSession = async () => {
            try {
                const user = await AsyncStorage.getItem("user");

                if (!user) {
                    router.replace("/form/login");
                    return;
                }
            } catch (error) {
                console.log("Erreur AsyncStorage:", error);
                router.replace("/form/login");
                return;
            } finally {
                setLoading(false); // ✅ AU BON ENDROIT
            }
        };

        checkSession();
    }, []);

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
    const handlerDeleteNotifications = (index: number | null) => {
        if (index !== null && notifications.length > 0) {
            const updatedNotifications = notifications.filter((_, i) => i !== index);
            setNotifications(updatedNotifications);
        } else {
            setNotifications([]);
        }
    }

    useEffect(() => {
        const bootstrapAsync = async () => {
            const userSession: any = await AsyncStorage.getItem('user');
            if (userSession) {
                dispatch(hydrateAuth(JSON.parse(userSession)));
                console.log('====================================');
                console.log('Init user', userSession);
                console.log('====================================');
                return;
            }
        }
        bootstrapAsync();
    }, [])

    // function onChangePage(index: number) {
    //     return <Redirect href={menuBottom[index].href} />
    // }
    if (loading) return null;
    if (!loading) return (
        <View className="flex-1 bg-white">
            {/* NavBar persistante */}
            <NavBar onClickMenu={() => setOpen(true)} />

            {/* LE SLOT : C'est ici que le contenu de tes pages s'affiche */}
            <View className="flex-1 bg-slate-50 px-5 overflow-scroll pb-20">
                <Slot />
            </View>

            {/* SideBar (Drawer) */}


            {/* BottomBar persistante */}
            <BottomBar
                menu={menuBottom}
                activeIndex={activeIndex}
                onChange={onChangeTabs}
            />
            <SideBar isOpen={isOpen} onClose={() => setOpen(false)} notifications={notifications} onDeleteAll={handlerDeleteNotifications} />
        </View>
    );
}