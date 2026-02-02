import { Calendar, Car, Clock, TrendingUp, User } from "lucide-react-native";
import { ScrollView, Text, View } from "react-native";
import BarGraph from "../components/molecules/BarChart";
import LineGraph from "../components/molecules/LineChart";

export default function HomeTemplates() {
   const DATA = [
      { value: 20, label: "Lun" },
      { value: 45, label: "Mar" },
      { value: 28, label: "Mer" },
      { value: 80, label: "Jeu" },
      { value: 99, label: "Ven" },
      { value: 43, label: "Sam" },
      { value: 50, label: "Dim" },
    ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} className="">
      <View className="flex flex-row justify-around gap-4 flex-wrap p-2 pt-4">
          
          {/* Bloc 1 */}
          <View className={`flex-1 w-full p-4 rounded-lg shadow-xl min-w-[140px] max-w-[48%] bg-white `} style={{ elevation: 10 }}>
            <Text className="text-lg font-semibold mb-2 color-black">Mission du jour</Text>
            <View className="flex flex-row justify-between items-center pe-0">
              <Text className="items-center text-3xl font-bold color-black">
                3
              </Text>
              <View className="w-10 h-10 rounded-2xl bg-blue-50 items-center justify-center ">
                <Calendar size={22} color={`blue`} strokeWidth={2} />
              </View>
            </View>
          </View>
          {/* Bloc 2 */}
          
          <View className={`flex-1 w-full p-4 rounded-lg  shadow min-w-[140px] max-w-[48%] bg-white`}>
            <Text className="text-md font-semibold mb-2 color-black">Kilometrage total</Text>
            <View className="flex flex-row justify-between items-center pe-0">
              <Text className="items-center text-3xl font-bold color-black">
                245
              </Text>
              <View className="w-10 h-10 rounded-2xl bg-green-50 items-center justify-center ">
                <Car size={22} color={`green`} strokeWidth={2} />
              </View>
            </View>
          </View>
          {/* Bloc 3 */}
          <View className={`flex-1 w-full p-4 rounded-lg  shadow min-w-[140px] max-w-[48%] bg-white`}>
            <Text className="text-lg font-semibold mb-2 color-black">Heure conduites</Text>
            <View className="flex flex-row justify-between items-center pe-0">
              <Text className="items-center text-3xl font-bold color-black">
                8.5h
              </Text>
              <View className="w-10 h-10 rounded-2xl bg-violet-50 items-center justify-center ">
                <Clock size={22} color={`violet`} strokeWidth={2} />
              </View>
            </View>
          </View>

          {/* Bloc 4 */}
          <View className={`flex-1 w-full p-4 rounded-lg shadow min-w-[140px] max-w-[48%] bg-white`}>
            <Text className="text-lg font-semibold mb-2 color-black">Efficacité</Text>
            <View className="flex flex-row justify-between items-center pe-0">
              <Text className="items-center text-md font-bold color-black">
                5.8L/100km
              </Text>
              <View className="w-10 h-10 rounded-2xl bg-orange-50 items-center justify-center ">
                <TrendingUp size={22} color={`orange`} strokeWidth={2} />
              </View>
            </View>
          </View>

          {/* BarGraph */}
          {/* <View className="w-full">
           <BarGraph color="bg-[rgb(0,186,85)]/100" data={DATA}/>
          </View> */}

          {/* BarGraph */}
          <View className="w-full">
           <LineGraph color="bg-[rgb(0,186,85)]/100" data={DATA} titre="Gains de la semaine"/>
          </View>


      </View>
    </ScrollView>
  );
}
