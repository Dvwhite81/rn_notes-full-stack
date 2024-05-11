import { useState } from 'react';
import { useToast, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RootStackParams } from '../utils/interfaces';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { userUpdateUsername } from '../redux/profile-actions';

import CustomAvatar from '../components/CustomAvatar';
import CustomButton from '../components/CustomButton';
import CustomFormControl from '../components/CustomFormControl';
import LoadingSpinner from '../components/LoadingSpinner';

type Props = NativeStackScreenProps<RootStackParams, 'Profile'>;

export default function ProfileScreen({}: Props) {
  const dispatch = useAppDispatch();
  const { loggedInUser } = useAppSelector((state) => state.profileInfo);
  const { loading } = useAppSelector((state) => state.siteInfo);

  if (!loggedInUser) return;

  const [username, setUsername] = useState<string>(
    loggedInUser?.username || ''
  );

  const saveProfileToast = useToast();

  const saveCurrentProfileInfo = async () => {
    if (username.length < 3) {
      saveProfileToast.show({
        description: 'Username must be at least 3 characters',
        duration: 2000,
        bg: 'danger.500',
      });
      return;
    }

    const { success, message } = await dispatch(
      userUpdateUsername(loggedInUser, username)
    );

    if (success) {
      saveProfileToast.show({
        description: message,
        duration: 2000,
        bg: 'success.500',
      });
    } else {
      saveProfileToast.show({
        description: message,
        duration: 2000,
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
        <CustomAvatar
          size="3xs"
          source={require('../assets/profileImage.png')}
          {...{ mt: '4', mb: '12' }}
        />
        <VStack space="5">
          <CustomFormControl
            inputName="Username"
            inputType="text"
            placeholder="Enter new username"
            required={true}
            errorMessage="This field is required"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />

          <CustomButton text="Save" onPressAction={saveCurrentProfileInfo} />
        </VStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
