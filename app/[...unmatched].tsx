import { usePathname, useSegments } from 'expo-router';
import { Text, View } from 'react-native';

// L'export default est OBLIGATOIRE ici
export default function UnmatchedRouteDebug() {
  const pathname = usePathname();
  const segments = useSegments();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'red' }}>
        Route non trouvée !
      </Text>
      
      <View style={{ marginTop: 20, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
        <Text style={{ fontWeight: '600' }}>Pathname tenté :</Text>
        <Text style={{ color: 'blue', fontSize: 16 }}>{pathname}</Text>
      </View>

      <View style={{ marginTop: 10, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
        <Text style={{ fontWeight: '600' }}>Segments :</Text>
        <Text>{JSON.stringify(segments)}</Text>
      </View>

      <Text style={{ marginTop: 30, color: 'gray', textAlign: 'center', paddingHorizontal: 20 }}>
        Vérifie si ce chemin correspond exactement à l'emplacement de ton fichier dans le dossier /app
      </Text>
    </View>
  );
}