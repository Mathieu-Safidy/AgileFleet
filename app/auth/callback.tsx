import { useEffect } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../src/type/user';
import { Token } from '../../src/type/token';
import { jwtDecode } from 'jwt-decode';
import { Provider, useDispatch } from 'react-redux';
import { hydrateAuth, loginSuccess } from '../../src/slices/authSlice';

export default function AuthCallback() {
    const { data } = useLocalSearchParams(); // Récupère le ?data=...
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            const handleAuth = async () => {
                // await AsyncStorage.clear()
                if (data) {
                    try {
                        const decodedData = JSON.parse(decodeURIComponent(data as string));
                        console.log("Data reçu :", decodedData);

                        if (decodedData.user) {
                            // --- ICI ON ATTEND LA SAUVEGARDE ---
                            await saveUser(decodedData);
                            console.log("Sauvegarde terminée, redirection...");

                            // --- ENSUITE ON REDIRIGE ---
                            router.replace('/(home)/');
                        }
                    } catch (error) {
                        console.error("Erreur :", error);
                        router.replace('/form/login');
                    }
                }
            };

            // On définit saveUser comme une fonction interne async
            const saveUser = async (userData: any) => {
                try {
                    const token = userData.access_token || "";
                    const decoded: Token = jwtDecode(token);

                    const userToSave = {
                        ...userData.user,
                        role: decoded.role,
                        token: token,
                    };
                    const userSession: any = await AsyncStorage.getItem('user');
                    if (userSession) {
                        console.log('====================================');
                        console.log(userSession);
                        console.log('====================================');
                        dispatch(hydrateAuth(JSON.parse(userSession)));
                        return;
                    }

                    await AsyncStorage.setItem('user', JSON.stringify(userToSave));
                    dispatch(loginSuccess(userToSave));
                    
                } catch (error) {
                    console.log('Erreur AsyncStorage', error);
                    throw error; // On propage l'erreur pour le catch du dessus
                }
            };
            handleAuth();
        }
    }, [data]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Finalisation de la connexion...</Text>
        </View>
    );
}