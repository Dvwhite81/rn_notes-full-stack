import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParams } from './NavigatorTypes';
import HomeScreen from '../screens/HomeScreen';
import TopNav from '../components/TopNav';
import ProfileScreen from '../screens/ProfileScreen';
import NoteScreen from '../screens/NoteScreen';

const Stack = createNativeStackNavigator<RootStackParams>();

export default function MainNavigator() {
  const { Navigator, Screen } = Stack;

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
              {...props}
            />
          ),
        })}
      />
      <Screen name="Profile" component={ProfileScreen} />
      <Screen name="Note" component={NoteScreen} />
    </Navigator>
  );
}
