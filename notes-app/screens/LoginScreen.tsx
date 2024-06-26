import { useState } from 'react';
import { useToast, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParams } from '../utils/interfaces';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { userLogin } from '../redux/profile-actions';

import CustomButton from '../components/CustomButton';
import CustomFormControl from '../components/CustomFormControl';
import LoadingSpinner from '../components/LoadingSpinner';

type Props = NativeStackScreenProps<RootStackParams, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.siteInfo);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginToast = useToast();

  const loginUser = async () => {
    if (username.length < 3) {
      loginToast.show({
        description: 'Username must be at least 3 characters',
        duration: 2000,
        bg: 'danger.500',
        placement: 'top',
      });
      return;
    }

    if (password.length < 4) {
      loginToast.show({
        description: 'Password must be at least 4 characters',
        duration: 2000,
        bg: 'danger.500',
        placement: 'top',
      });
      return;
    }

    const { success, message } = await dispatch(userLogin(username, password));
    console.log('success:', success);

    if (success) {
      loginToast.show({
        description: message,
        duration: 4000,
        bg: 'success.500',
      });

      navigation.navigate('Home');
    } else {
      loginToast.show({
        description: message,
        duration: 4000,
        bg: 'danger.500',
        placement: 'top',
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <KeyboardAwareScrollView>
      <VStack pt="5" alignItems="center" h="full">
        <CustomFormControl
          inputName="Username"
          inputType="text"
          placeholder="Enter a username"
          required={true}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <CustomFormControl
          inputName="Password"
          inputType="password"
          placeholder="Enter a password"
          required={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <CustomButton text="Log In" onPressAction={loginUser} />
      </VStack>
    </KeyboardAwareScrollView>
  );
}
