import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen.jsx';
import SplashScreen from '../screens/SplashScreen.jsx';
import TabNavigation from './TabNavigation.jsx';
import RegisterScreen from '../screens/RegisterScreen.jsx';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {

    

    return (
                
                <Stack.Navigator>
                    <Stack.Screen name="Splash Screen" component={SplashScreen} options={{ headerShown: false }} /> 
                    <Stack.Screen name="TabNavigation" component={TabNavigation} options={{ headerShown: false }} />
                    <Stack.Screen name="Login Screen" component={LoginScreen} options={ { headerShown: false }}/>
                    <Stack.Screen name="Register Screen" component={RegisterScreen} options={ { headerShown: false }}/>
                </Stack.Navigator>
        
    );
};