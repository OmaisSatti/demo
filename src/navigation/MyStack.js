import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';
import Home from '../screens/Home';
import Demo from '../screens/Demo';

import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Demo" component={Demo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default MyStack;