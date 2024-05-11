import { useState } from 'react';
import { AddIcon, Box, Button, Heading, Image } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParams } from '../utils/interfaces';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setIdOfNoteToDelete } from '../redux/notes-slice';
import { deleteNote } from '../redux/notes-actions';

import ActionModal from '../components/ActionModal';
import LoadingSpinner from '../components/LoadingSpinner';
import NotesDisplay from '../components/NotesDisplay';
import Welcome from '../components/Welcome';

type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { idOfNoteToDelete } = useAppSelector((state) => state.notes);
  const { loggedInUser } = useAppSelector((state) => state.profileInfo);
  const { loading } = useAppSelector((state) => state.siteInfo);

  const [showWelcome, setShowWelcome] = useState(true);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
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
        {!loggedInUser && showWelcome && (
          <Welcome hideWelcome={() => setShowWelcome(false)} />
        )}
        <NotesDisplay
          onNotePress={(id) => navigation.navigate('Note', { id })}
          onLongNotePress={(id) => {
            setModalIsOpen(true);
            dispatch(setIdOfNoteToDelete({ id }));
          }}
        />
        {loggedInUser && (
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
        )}
      </Box>
    </>
  );
}
