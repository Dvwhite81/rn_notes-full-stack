import { useState } from 'react';
import { useToast, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParams } from '../utils/interfaces';
import { useAppDispatch } from '../redux/store';
import { userRegister } from '../redux/profile-actions';

import CustomButton from '../components/CustomButton';
import CustomFormControl from '../components/CustomFormControl';

type Props = NativeStackScreenProps<RootStackParams, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const registerToast = useToast();

  const registerUser = async () => {
    if (username.length < 3) {
      registerToast.show({
        description: 'Username must be at least 3 characters',
        duration: 2000,
        bg: 'danger.500',
        placement: 'top',
      });
      return;
    }

    if (password.length < 4) {
      registerToast.show({
        description: 'Password must be at least 4 characters',
        duration: 2000,
        bg: 'danger.500',
        placement: 'top',
      });
      return;
    }

    if (confirmation !== password) {
      registerToast.show({
        description: 'Confirmation must match password',
        duration: 2000,
        bg: 'danger.500',
        placement: 'top',
      });
      return;
    }

    const { success, message } = await dispatch(
      userRegister(username, password)
    );
    console.log('registerscreen success:', success);
    console.log('registerscreen message:', message);

    if (success) {
      registerToast.show({
        description: message,
        duration: 4000,
        bg: 'success.500',
      });
      navigation.navigate('Home');
    } else {
      registerToast.show({
        description: message,
        duration: 4000,
        bg: 'danger.500',
        placement: 'top',
      });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <VStack pt="5" alignItems="center" h="full" justifyContent="center">
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
        <CustomFormControl
          inputName="Confirm Password"
          inputType="password"
          placeholder="Confirm password"
          required={true}
          value={confirmation}
          onChangeText={(text) => setConfirmation(text)}
        />

        <CustomButton text="Sign Up" onPressAction={registerUser} />
      </VStack>
    </KeyboardAwareScrollView>
  );
}
