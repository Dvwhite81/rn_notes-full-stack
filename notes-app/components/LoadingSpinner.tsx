import { Center, Heading, HStack, Spinner } from 'native-base';

const LoadingSpinner = () => {
  return (
    <Center flex={1}>
      <HStack space={3}>
        <Spinner color="#00838f" size="sm" />
        <Heading color="#00838f" fontSize="2xl">
          Loading
        </Heading>
      </HStack>
    </Center>
  );
};

export default LoadingSpinner;
