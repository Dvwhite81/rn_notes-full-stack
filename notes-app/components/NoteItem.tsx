import { Pressable, Text, useToast, VStack } from 'native-base';
import { useAppSelector } from '../redux/store';

interface Props {
  userId: number;
  title: string;
  content: string;
  onNotePress: () => void;
  onLongNotePress: () => void;
}

export default function NoteItem({
  userId,
  title,
  content,
  onNotePress,
  onLongNotePress,
}: Props) {
  const { loggedInUser } = useAppSelector((state) => state.profileInfo);

  const pressToast = useToast();

  const handlePress = (func: () => void) => {
    if (loggedInUser && loggedInUser.id === userId) {
      func();
    } else {
      pressToast.show({
        description: 'You can only edit your own posts',
        duration: 2000,
        bg: 'warning.500',
      });
    }
  };

  return (
    <Pressable
      onPress={() => handlePress(onNotePress)}
      onLongPress={() => handlePress(onLongNotePress)}
    >
      {({ isPressed }) => (
        <VStack
          bgColor={isPressed ? '#00838f' : '#fff'}
          borderColor="#aaa"
          borderRadius="sm"
          borderWidth="1"
          m="1.5"
          p="2"
          space="1"
        >
          {title ? (
            <Text
              color={isPressed ? '#fff' : '#000'}
              fontSize="md"
              fontWeight="bold"
            >
              {title}
            </Text>
          ) : null}
          {content ? (
            <Text color={isPressed ? '#fff' : '#555'} fontSize="xs">
              {content}
            </Text>
          ) : null}
        </VStack>
      )}
    </Pressable>
  );
}
