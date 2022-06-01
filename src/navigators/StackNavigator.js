import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import screens from './screens';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            {screens.map(({ name, component }) => (
                <Stack.Screen name={name} component={component} key={name} />
            ))}
        </Stack.Navigator>
    );
};

export default StackNavigator;
