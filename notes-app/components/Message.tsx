import { Box, Heading } from 'native-base';
import { useAppSelector } from '../redux/store';

export default function Message() {
  const message = useAppSelector((state) => state.profileInfo.message);

  return (
    message.length > 0 && (
      <Box
        position="absolute"
        alignSelf="center"
        bg="#00838f"
        borderRadius="xl"
        p="5"
        top="8"
        h="50%"
        w="50%"
        fontSize="xl"
        zIndex={2}
      >
        <Heading textAlign="center" w="full" color="white">
          {message}
        </Heading>
      </Box>
    )
  );
}
