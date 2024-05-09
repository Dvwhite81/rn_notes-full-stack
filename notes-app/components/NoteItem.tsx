import { Pressable, Text, VStack } from 'native-base';

interface Props {
  title: string;
  content: string;
  onNotePress: () => void;
  onLongNotePress: () => void;
}

export default function NoteItem({
  title,
  content,
  onNotePress,
  onLongNotePress,
}: Props) {
  return (
    <Pressable onPress={onNotePress} onLongPress={onLongNotePress}>
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
