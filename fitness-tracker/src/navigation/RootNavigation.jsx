import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen.jsx';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {

    

    return (
       
                <Stack.Navigator>
                    <Stack.Screen name="Login Screen" component={LoginScreen} />
                </Stack.Navigator>
        
    );
};