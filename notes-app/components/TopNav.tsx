import { Box, Button, HStack, Image, Input } from 'native-base';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setSearchTerm } from '../redux/notes-slice';
import CustomIconButton from './CustomIconButton';
import CustomAvatar from './CustomAvatar';
import CustomButton from './CustomButton';

interface Props {
  onProfileAvatarPress: () => void;
  onRegisterPress: () => void;
  onLoginPress: () => void;
  onLogoutPress: () => void;
  onHomePress: () => void;
}

export default function TopNav({
  onProfileAvatarPress,
  onRegisterPress,
  onLoginPress,
  onLogoutPress,
  onHomePress,
}: Props) {
  const { loggedInUser } = useAppSelector((state) => state.profileInfo);
  const dispatch = useAppDispatch();

  return (
    <HStack alignItems="center" bg="#00838f" h="16" p="2" space="2">
      {loggedInUser ? (
        <Box
          bg="white"
          borderRadius="100"
          flex={1}
          h="12"
          justifyContent="center"
        >
          <Input
            borderWidth="0"
            fontSize="sm"
            textAlign="center"
            onChangeText={(text) =>
              dispatch(setSearchTerm({ searchTerm: text }))
            }
            placeholder="Search Notes..."
            selectionColor="#99999980"
            InputLeftElement={
              <CustomIconButton
                icon={
                  <CustomAvatar
                    size="sm"
                    source={require('../assets/logout-circle.png')}
                  />
                }
                onPressAction={onLogoutPress}
              />
            }
            InputRightElement={
              <CustomIconButton
                icon={
                  <CustomAvatar
                    size="sm"
                    source={require('../assets/profileImage.png')}
                  />
                }
                onPressAction={onProfileAvatarPress}
              />
            }
          />
        </Box>
      ) : (
        <HStack
          borderRadius="100"
          flex={1}
          h="12"
          justifyContent="space-evenly"
        >
          <CustomButton
            text="Sign Up"
            onPressAction={onRegisterPress}
            extraProps={{ size: 'sm' }}
          />
          <Button
            maxHeight="12"
            backgroundColor="#00838f"
            onPress={onHomePress}
          >
            <Image
              maxHeight="12"
              resizeMode="contain"
              flex={1}
              source={require('../assets/n-logo-white.png')}
              alt="logo"
            />
          </Button>
          <CustomButton
            text="Log In"
            onPressAction={onLoginPress}
            extraProps={{ size: 'sm' }}
          />
        </HStack>
      )}
    </HStack>
  );
}
