import { Box, Heading, Icon, Image } from 'native-base';
import CustomIconButton from './CustomIconButton';
import CustomAvatar from './CustomAvatar';
import { Path } from 'react-native-svg';

interface Props {
  hideWelcome: () => void;
}

export default function Welcome({ hideWelcome }: Props) {
  return (
    <>
      <Heading size="3xl" color="#00838f" pt={5} textAlign="center">
        Welcome to
        <Box position="absolute">
          <CustomIconButton
            icon={
              <Icon viewBox="0 0 40 40" size="sm">
                <Path d="M0 0h24v24H0V0z" fill="none" />
                <Path
                  d="M 10,10 L 30,30 M 30,10 L 10,30"
                  stroke="#00838f"
                  strokeWidth="5"
                />
              </Icon>
            }
            onPressAction={hideWelcome}
          />
        </Box>
      </Heading>
      <Box h="30%" w="full" alignItems="center" justifyContent="center">
        <Image
          flex={1}
          resizeMode="contain"
          source={require('../assets/native-notes-logo.png')}
          alt="logo"
        />
      </Box>
      <Heading color="#00838f" pt={5} textAlign="center">
        Log In To Create Posts!
      </Heading>
    </>
  );
}
