import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

export default function AuthNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Login Screen' component={ LoginScreen } /> 
            <Stack.Screen name='Register Screen' component={ RegisterScreen } /> 
        </Stack.Navigator>

    );
}