import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UserList from "./src/pages/Users/UserList";
import UserDetail from "./src/pages/Users/UserDetail";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="list"
              component={UserList}
              options={{ title: "Contact List" }}
            />
            <Stack.Screen
              name="details"
              component={UserDetail}
              options={{ title: "Contact Detail" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
