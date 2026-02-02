import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Calendar, MapPin, ChevronRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react-native';

export default function ReportCard({ report }: any) {
  // Adaptation des couleurs pour fond blanc/clair
  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'validé': 
        return { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-700', icon: <CheckCircle2 size={12} color="#15803d" /> };
      case 'rejeté': 
        return { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-700', icon: <AlertCircle size={12} color="#b91c1c" /> };
      default: 
        return { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-700', icon: <Clock size={12} color="#c2410c" /> };
    }
  };

  const status = getStatusStyle(report.status);

  return (
    <Pressable className="bg-white border border-zinc-200 rounded-3xl p-4 mb-4 shadow-sm active:bg-zinc-50">
      
      {/* HEADER : ID + STATUS + DATE */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <Text className="text-green-600 font-black text-lg">{report.tripId}</Text>
            <View className={`${status.bg} ${status.border} border px-2 py-0.5 rounded-full flex-row items-center gap-1`}>
              {status.icon}
              <Text className={`${status.text} text-[10px] font-black uppercase tracking-tight`}>
                {report.status}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-1">
            <Calendar size={13} color="#94a3b8" />
            <Text className="text-zinc-400 text-xs font-semibold">{report.date}</Text>
          </View>
        </View>
        <View className="bg-zinc-50 p-2 rounded-full">
            <ChevronRight size={18} color="#a1a1aa" />
        </View>
      </View>

      {/* BOITE DE TRAJET (Fond gris très clair) */}
      <View className="bg-zinc-50 p-4 rounded-2xl mb-3 border border-zinc-100">
        <View className="flex-row items-center gap-3 mb-3">
          <View className="bg-green-100 p-2 rounded-lg">
            <MapPin size={16} color="#22c55e" />
          </View>
          <View className="flex-row items-center flex-1">
            <Text className="text-zinc-800 text-sm font-bold">{report.from}</Text>
            <Text className="text-zinc-300 mx-2">──</Text>
            <Text className="text-zinc-800 text-sm font-bold">{report.to}</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between items-center border-t border-zinc-200 pt-3">
          <View className="bg-white px-2 py-1 rounded-md border border-zinc-100">
             <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{report.category}</Text>
          </View>
          {report.amount > 0 && (
            <View className="flex-row items-center gap-1">
              <Text className="text-zinc-400 text-[10px] font-bold mr-1">MONTANT</Text>
              <Text className="text-green-600 font-black text-base">{report.amount}€</Text>
            </View>
          )}
        </View>
      </View>

      {/* DESCRIPTION */}
      {report.description && (
          <Text className="text-zinc-600 text-sm leading-5 mb-3 px-1 italic">
            "{report.description}"
          </Text>
      )}

      {/* COMMENTAIRE ADMIN
      {report.adminComment && (
        <View className="bg-blue-50 border border-blue-100 p-4 rounded-2xl mt-1">
          <View className="flex-row items-center gap-2 mb-2">
            <View className="bg-blue-500 p-1 rounded-md">
                <MessageSquare size={10} color="white" />
            </View>
            <Text className="text-blue-700 text-[10px] font-black uppercase tracking-wider">Réponse de la direction</Text>
          </View>
          <Text className="text-blue-600/80 text-sm font-medium leading-5">
            {report.adminComment}
          </Text>
        </View>
      )} */}
    </Pressable>
  );
}