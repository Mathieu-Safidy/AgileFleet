import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Calendar, MapPin, ChevronRight, Clock, CheckCircle2, AlertCircle, X, Car, DockIcon, FileText, Package } from 'lucide-react-native';

export default function ReportCard({ report, updateAction }: any) {
  const [modalVisible, setModalVisible] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const value = new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const formatSimpleDate = (dateString: string) => {
    const date = new Date(dateString);
    const value = new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).format(date)
    return value;
  }

  const handleUpdateModal = () => {
    updateAction();
    setModalVisible(false)
  }



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
    <Pressable onPress={() => setModalVisible(true)} className="bg-white border border-zinc-200 rounded-3xl p-4 mb-4 shadow-sm active:bg-zinc-50">

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
            <Text className="text-zinc-400 text-xs font-semibold">{formatDate(report.date)}</Text>
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
          <View className="flex-row items-center justify-around flex-1">
            <Text className="text-zinc-800 text-sm font-bold">{report.from}</Text>
            <Text className="text-zinc-300 mx-2">──</Text>
            <Text className="text-zinc-800 text-sm font-bold">{report.to}</Text>
          </View>
        </View>

        <View className="flex-row items-start justify-between border-t border-zinc-200 pt-3">
          <View className="bg-white px-2 py-1 rounded-md border border-zinc-100">
            <Text className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{report.category}</Text>
          </View>
          <View className="flex-col items-end">
            {report.distance > 0 && (
              <View className="flex-row items-center gap-1">
                <Text className="text-zinc-400 text-[10px] font-bold mr-1">DISTANCE</Text>
                <Text className="text-green-600 font-black text-base">{report.distance}km</Text>
              </View>
            )}
            {report.duree > 0 && (
              <View className="flex-row items-center gap-1">
                <Text className="text-zinc-400 text-[10px] font-bold mr-1">DUREE</Text>
                <Text className="text-green-600 font-black text-base">{report.duree}h</Text>
              </View>
            )}

          </View>
        </View>
      </View>

      {/* modal */}
      <Modal
        animationType="slide" // ou "fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Pour le bouton retour Android
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView} className='p-3'>
            <View className='top-0 bg-white border-b border-gray-200 flex-row justify-between items-start py-5 px-2'>
              <View>
                <Text className='text-xl font-bold text-gray-900'>Détails du rapport ({formatSimpleDate(report.createdAt)})</Text>
                <Text className='text-gray-600 text-sm'>ID: {report.tripId}</Text>
                <View className="flex-col items-start gap-1">
                  <View className="flex-row rounded-md ">
                    <Text>Créé le : </Text>
                    <Text className="text-blue-600 font-bold text-sm">{formatDate(report.date)}</Text>
                  </View>
                  <View className='flex-row me-2'>
                    <Text>Etat : </Text>
                    <View className={`${status.bg} ${status.border} border px-2 py-0.5 rounded-full flex-row items-center gap-1`}>
                      {status.icon}
                      <Text className={`${status.text} text-[10px] font-black uppercase tracking-tight`}>
                        {report.status}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                activeOpacity={0.7}
                className='p-2 active:bg-gray-100 rounded-lg bg-zinc-50 border-zinc-100 shadow-lg'
              >
                <X size={24} color="#666" />
              </TouchableOpacity>
            </View>
            <ScrollView className='max-h-[60vh]' showsVerticalScrollIndicator={false} >


              {report.vehicle && (
                <View className="flex-row items-center my-5 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                  <View className="w-16 h-16 rounded-2xl bg-white items-center justify-center shadow-lg">
                    <Car size={30} color="blue" strokeWidth={2.5} />
                  </View>
                  <View className="ml-4 flex-1">
                    <Text className="text-zinc-400 font-bold uppercase text-sm leading-tight">Véhicule de la mission</Text>
                    <View className="flex-row items-center mt-1 ">
                      <Text className="text-zinc-900 font-extrabold text-lg ">{report.vehicle.marque} {report.vehicle.modele}</Text>
                      <View className=" px-2 py-0.5 rounded-md ml-2">
                        <Text className="text-blue-600 font-bold text-lg">{report.vehicle.plaque}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}

              <View className="flex-row items-center gap-2">
                <Calendar size={14} color="#94a3b8" />
                <Text className='text-zinc-400 text-[14px] font-black uppercase tracking-widest'>Mission</Text>
              </View>

              {report.category && (
                <>
                  <View className="flex-row items-center mt-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                    <View className="w-16 h-16 rounded-2xl bg-blue-50 items-center justify-center">
                      <Package size={30} color="black" strokeWidth={2.5} />
                    </View>
                    <View className="ml-4 flex-col h-max justify-between ">
                      <Text className="text-zinc-400 font-bold uppercase text-sm leading-tight">Type de mission</Text>
                      <View className="flex-col items-baseline mt-1 ">
                        <Text className="text-zinc-900 font-extrabold text-lg ">{report.category}</Text>
                      </View>
                    </View>
                  </View>
                  <View className='flex flex-row gap-3 mb-2 w-full'>
                    <View className="flex-1 flex-col items-start mt-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                      <View className="ml-2 flex-col h-max justify-between ">
                        <Text className="text-zinc-400 font-bold uppercase text-sm leading-tight">Depart</Text>
                        <View className="flex-col items-baseline mt-1 ">
                          <Text className="text-zinc-900 font-extrabold text-lg ">{report.departureTime}</Text>
                        </View>
                      </View>
                    </View>
                    <View className="flex-1 flex-col items-start mt-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                      <View className="ml-2 flex-col h-max justify-between ">
                        <Text className="text-zinc-400 font-bold uppercase text-sm leading-tight">Arrivée</Text>
                        <View className="flex-col items-baseline mt-1 ">
                          <Text className="text-zinc-900 font-extrabold text-lg ">{report.arrivalTime}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              )}

              <View className="flex-row items-center gap-2 mt-3">
                <Car size={14} color="#94a3b8" />
                <Text className='text-zinc-400 text-[14px] font-black uppercase tracking-widest'>Véhicule & Performance</Text>
              </View>
              {report.vehicle && (
                <>
                  <View className='flex flex-row gap-3 mb-1 w-full'>
                    <View className="flex-1 flex-col items-start mt-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                      <View className="ml-2 flex-col h-max justify-between ">
                        <Text className="text-zinc-400 font-bold uppercase text-sm leading-tight">Distance</Text>
                        <View className="flex-col items-baseline mt-1 ">
                          <Text className="text-zinc-900 font-extrabold text-lg ">{report.distance}km</Text>
                        </View>
                      </View>
                    </View>
                    <View className="flex-1 flex-col items-start mt-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                      <View className="ml-2 flex-col h-max justify-between ">
                        <Text className="text-zinc-400 font-bold uppercase text-sm leading-tight">Durée</Text>
                        <View className="flex-col items-baseline mt-1 ">
                          <Text className="text-zinc-900 font-extrabold text-lg ">{report.duration}h</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className='flex flex-row gap-3 mb-1 w-full'>
                    <View className="flex-1 flex-col items-start mt-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                      <View className="ml-2 flex-col h-max justify-between ">
                        <Text className="text-zinc-400 font-bold uppercase text-sm leading-tight">Carburant</Text>
                        <View className="flex-col items-baseline mt-1 ">
                          <Text className="text-zinc-900 font-extrabold text-lg ">{report.fuelConsumed}L</Text>
                        </View>
                      </View>
                    </View>
                    <View className="flex-1 flex-col items-start mt-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-100">
                      <View className="ml-2 flex-col h-max justify-between ">
                        <Text className="text-zinc-400 font-bold uppercase text-sm leading-tight">État véhicule</Text>
                        <View className="flex-col items-baseline mt-1 ">
                          <Text className="text-zinc-900 font-extrabold text-lg ">{report.vehicleCondition}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              )}

              <View className="flex-row items-center gap-2 mt-3">
                <MapPin size={14} color="#94a3b8" />
                <Text className='text-zinc-400 text-[14px] font-black uppercase tracking-widest'>Itinéraire</Text>
              </View>
              {report.vehicle && (
                <>
                  <View className="flex-row items-center mt-3 bg-blue-50 p-4 rounded-2xl border border-zinc-100">
                    <View className="w-16 h-16 rounded-2xl bg-blue-100 items-center justify-center">
                      <MapPin size={30} color="blue" strokeWidth={2.5} />
                    </View>
                    <View className="ml-4 flex-col h-max justify-between ">
                      <Text className="text-zinc-400 font-bold uppercase text-sm leading-tight">Départ</Text>
                      <View className="flex-col items-baseline mt-1 ">
                        <Text className="text-zinc-900 font-extrabold text-lg ">{report.startLocation}</Text>
                      </View>
                    </View>
                  </View>
                  <View className="flex-row items-center mt-3 bg-green-50 p-4 rounded-2xl border border-zinc-100">
                    <View className="w-16 h-16 rounded-2xl bg-green-100 items-center justify-center">
                      <MapPin size={30} color="green" strokeWidth={2.5} />
                    </View>
                    <View className="ml-4 flex-col h-max justify-between ">
                      <Text className="text-zinc-400 font-bold uppercase text-sm leading-tight">Arrivée</Text>
                      <View className="flex-col items-baseline mt-1 ">
                        <Text className="text-zinc-900 font-extrabold text-lg ">{report.endLocation}</Text>
                      </View>
                    </View>
                  </View>

                </>
              )}


              <View className="flex-row items-center gap-2 mt-3">
                <FileText size={14} color="#94a3b8" />
                <Text className='text-zinc-400 text-[14px] font-black uppercase tracking-widest'>Information</Text>
              </View>

              <View className="flex-row items-center mt-3 bg-red-100 p-4 rounded-2xl border border-zinc-100">
                <View className="ml-4 flex-col h-max justify-between ">
                  <Text className="text-red-400 font-bold uppercase text-sm leading-tight">Incidents signalés</Text>
                  <FlatList
                    data={report.incidents}
                    keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                    scrollEnabled={false} // Important si la FlatList est déjà dans une ScrollView
                    renderItem={({ item: incident }) => (
                      <View>
                        <View className="flex-col items-baseline mt-1">
                          <Text className="text-red-900 font-extrabold text-lg">
                            {incident.type} : {incident.description} ({incident.time})
                          </Text>
                        </View>
                      </View>
                    )}
                    ListEmptyComponent={<Text>Aucun incident signalé</Text>} // Optionnel : si la liste est vide
                  />
                </View>
              </View>



            </ScrollView>

            {/* <View className="flex-row items-center my-5 bg-white p-4 rounded-2xl">
              <View className="w-16 h-16 rounded-2xl bg-blue-50 items-center justify-center">
                <FileText size={35} color="blue" strokeWidth={2.5} />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-zinc-900 font-black text-xl leading-tight">{report.tripId}</Text>
                <View className="flex-col items-start mt-1">
                  <View className={`${status.bg} ${status.border} border px-2 py-0.5 rounded-full flex-row items-center gap-1`}>
                    {status.icon}
                    <Text className={`${status.text} text-[10px] font-black uppercase tracking-tight`}>
                      {report.status}
                    </Text>
                  </View>
                  <View className="rounded-md ">
                    <Text className="text-blue-600 font-bold text-lg">{formatDate(report.date)}</Text>
                  </View>
                </View>
              </View>
            </View> */}

            {/* Bouton pour fermer */}
            <Pressable
              // style={[styles.button, styles.buttonClose]}

              className='my-3 bg-green-500 rounded-lg py-2 mx-4 shadow-lg'
              onPress={handleUpdateModal}
            >
              <Text style={styles.textStyle}>Modifier</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* DESCRIPTION */}
      {/* {report.description && (
          <Text className="text-zinc-600 text-sm leading-5 mb-3 px-1 italic">
            "{report.description}"
          </Text>
      )} */}

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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
  },
  modalView: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Ombre sur Android
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#4CAF50',
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
});