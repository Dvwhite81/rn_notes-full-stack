import { useEffect, useState } from 'react';
import { AddIcon, Box, Button, Heading, Image } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParams } from '../navigation/NavigatorTypes';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setIdOfNoteToDelete, setSearchTerm } from '../redux/notes-slice';
import ActionModal from '../components/ActionModal';
import NotesDisplay from '../components/NotesDisplay';
import { deleteNote } from '../redux/notes-actions';
import Message from '../components/Message';

type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const idOfNoteToDelete = useAppSelector(
    (state) => state.notes.idOfNoteToDelete
  );
  const loggedInUser = useAppSelector(
    (state) => state.profileInfo.loggedInUser
  );
  const message = useAppSelector((state) => state.profileInfo.message);

  if (!loggedInUser) {
    return (
      <>
        <Message />
        <Heading size="3xl" color="#00838f" pt={5} textAlign="center">
          Welcome to
        </Heading>
        <Box h="30%" w="full" alignItems="center" justifyContent="center">
          <Image
            resizeMode="contain"
            flex={1}
            source={require('../assets/native-notes-logo.png')}
          />
        </Box>
        <Heading color="#00838f" pt={5} textAlign="center">
          Log In To See Posts!
        </Heading>
      </>
    );
  }

  const dispatch = useAppDispatch();

  return (
    <>
      <Message />
      <ActionModal
        modalIsOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        onDelete={() => {
          if (!idOfNoteToDelete) return;
          dispatch(deleteNote(idOfNoteToDelete));
          dispatch(setIdOfNoteToDelete({ id: undefined }));
        }}
      />

      <Box h="full">
        <NotesDisplay
          onNotePress={(id) => navigation.navigate('Note', { id })}
          onLongNotePress={(id) => {
            setModalIsOpen(true);
            dispatch(setIdOfNoteToDelete({ id }));
          }}
        />
        <Button
          m="4"
          size="16"
          bottom="0"
          right="0"
          position="absolute"
          rounded="full"
          bgColor="#00838f"
          _pressed={{ bgColor: '#005662' }}
          onPress={() => navigation.navigate('Note')}
        >
          <AddIcon size="xs" color="white" />
        </Button>
      </Box>
    </>
  );
}
