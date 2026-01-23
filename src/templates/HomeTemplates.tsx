import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User } from "lucide-react-native";
import { Text, View } from "react-native";
import Graph from "../components/molecules/Graph";

const HomeStack = createNativeStackNavigator();

export default function HomeTemplates() {
  return (
    <View className="">
      <View className="flex flex-row justify-around gap-4 flex-wrap">
          
          {/* Bloc 1 */}
          <View className={`flex-1 w-full p-4 rounded-lg min-w-[140px] max-w-[48%] bg-[rgb(0,186,85)]/100`}>
            <Text className="text-lg font-semibold mb-2">Bloc 2</Text>
            <View className="flex flex-row justify-between items-center pe-0">
              <Text className="items-center text-3xl font-bold">
                25
              </Text>
              <View className="w-10 h-10 rounded-2xl bg-green-50 items-center justify-center ">
                <User size={22} color={`rgb(0 186 85)`} strokeWidth={2} />
              </View>
            </View>
          </View>
          {/* Bloc 2 */}
          
          <View className={`flex-1 w-full p-4 rounded-lg  shadow min-w-[140px] max-w-[48%] bg-[rgb(0,0,0)]/100`}>
            <Text className="text-lg font-semibold mb-2 color-white">Bloc 1</Text>
            <View className="flex flex-row justify-between items-center pe-0">
              <Text className="items-center text-3xl font-bold color-white">
                25
              </Text>
              <View className="w-10 h-10 rounded-2xl bg-green-50 items-center justify-center ">
                <User size={22} color={`black`} strokeWidth={2} />
              </View>
            </View>
          </View>
          {/* Bloc 3 */}
          <View className={`flex-1 w-full p-4 rounded-lg  shadow min-w-[140px] max-w-[48%] bg-[rgb(0,0,0)]/100`}>
            <Text className="text-lg font-semibold mb-2 color-white">Bloc 1</Text>
            <View className="flex flex-row justify-between items-center pe-0">
              <Text className="items-center text-3xl font-bold color-white">
                25
              </Text>
              <View className="w-10 h-10 rounded-2xl bg-green-50 items-center justify-center ">
                <User size={22} color={`black`} strokeWidth={2} />
              </View>
            </View>
          </View>
          {/* Bloc 4 */}
          
          <View className={`flex-1 w-full p-4 rounded-lg min-w-[140px] max-w-[48%] bg-[rgb(0,186,85)]/100`}>
            <Text className="text-lg font-semibold mb-2">Bloc 2</Text>
            <View className="flex flex-row justify-between items-center pe-0">
              <Text className="items-center text-3xl font-bold">
                25
              </Text>
              <View className="w-10 h-10 rounded-2xl bg-green-50 items-center justify-center ">
                <User size={22} color={`rgb(0 186 85)`} strokeWidth={2} />
              </View>
            </View>
          </View>

          {/* Graph */}

          <Graph />
      </View>
    </View>
  );
}
