import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParams } from './NavigatorTypes';
import { useAppDispatch } from '../redux/store';
import { userLogout } from '../redux/profile-actions';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import NoteScreen from '../screens/NoteScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TopNav from '../components/TopNav';

const Stack = createNativeStackNavigator<RootStackParams>();

export default function MainNavigator() {
  const { Navigator, Screen } = Stack;

  const dispatch = useAppDispatch();

  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00838f',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          header: (props) => (
            <TopNav
              onProfileAvatarPress={() => navigation.navigate('Profile')}
              onRegisterPress={() => navigation.navigate('Register')}
              onLoginPress={() => navigation.navigate('Login')}
              onLogoutPress={() => dispatch(userLogout())}
              onHomePress={() => navigation.navigate('Home')}
              {...props}
            />
          ),
        })}
      />
      <Screen name="Profile" component={ProfileScreen} />
      <Screen name="Note" component={NoteScreen} />
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="Login" component={LoginScreen} />
    </Navigator>
  );
}
