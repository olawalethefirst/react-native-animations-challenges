import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './src/navigators/StackNavigator';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <NavigationContainer>
                <StatusBar style="dark" />
                <StackNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
