import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

export default function ProfileNavigation() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Profile Screen' component={ ProfileScreen } options={{ headerShown: false }} /> 
            <Stack.Screen name='Change Password Screen' component={ ChangePasswordScreen } options={{ headerShown: false }}  /> 

        </Stack.Navigator>

    );
}