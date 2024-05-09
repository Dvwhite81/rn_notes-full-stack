import { useState } from 'react';
import { useToast, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RootStackParams } from '../navigation/NavigatorTypes';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { saveProfileInfo } from '../redux/profile-slice';
import CustomAvatar from '../components/CustomAvatar';
import CustomButton from '../components/CustomButton';
import CustomFormControl from '../components/CustomFormControl';

type Props = NativeStackScreenProps<RootStackParams, 'Profile'>;

export default function ProfileScreen({}: Props) {
  const profileInfo = useAppSelector((state) => state.profileInfo);
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState(profileInfo.firstName);
  const [lastName, setLastName] = useState(profileInfo.lastName);
  const [nameIsInvalid, setNameIsInvalid] = useState(false);

  const saveProfileToast = useToast();

  const saveCurrentProfileInfo = () => {
    if (firstName === '') {
      setNameIsInvalid(true);
      return;
    }

    setNameIsInvalid(false);
    dispatch(saveProfileInfo({ firstName, lastName }));

    saveProfileToast.show({
      description: 'Saved Profile Info',
      duration: 2000,
    });
  };

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
            inputName="First name"
            inputType="text"
            invalid={nameIsInvalid}
            placeholder="e.g. John"
            required={true}
            errorMessage="This field is required"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <CustomFormControl
            inputName="Last name"
            inputType="text"
            invalid={false}
            placeholder="e.g. Wick"
            required={false}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <CustomButton text="Save" onPressAction={saveCurrentProfileInfo} />
        </VStack>
      </VStack>
    </KeyboardAwareScrollView>
  );
}
