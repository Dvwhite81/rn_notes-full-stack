import { Box, HStack, IconButton, Input } from 'native-base';
import { useAppDispatch } from '../redux/store';
import { setSearchTerm } from '../redux/notes-slice';
import CustomIconButton from './CustomIconButton';
import CustomAvatar from './CustomAvatar';

interface Props {
  onProfileAvatarPress: () => void;
}

export default function TopNav({ onProfileAvatarPress }: Props) {
  const dispatch = useAppDispatch();

  return (
    <HStack alignItems="center" bg="#00838f" h="16" p="2" space="2">
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
          onChangeText={(text) => dispatch(setSearchTerm({ searchTerm: text }))}
          placeholder="Search Notes..."
          selectionColor="#99999980"
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
    </HStack>
  );
}
