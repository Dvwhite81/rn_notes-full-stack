import { useEffect, useState } from 'react';
import { AddIcon, Box, Button } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParams } from '../navigation/NavigatorTypes';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setIdOfNoteToDelete, setSearchTerm } from '../redux/notes-slice';
import ActionModal from '../components/ActionModal';
import NotesDisplay from '../components/NotesDisplay';
import { deleteNote, fetchAllNotes } from '../redux/notes-actions';

type Props = NativeStackScreenProps<RootStackParams, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const idOfNoteToDelete = useAppSelector(
    (state) => state.notes.idOfNoteToDelete
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getInitialNotes = async () => {
      dispatch(fetchAllNotes());
    };

    getInitialNotes();
  }, []);

  useEffect(() => {
    dispatch(setSearchTerm({ searchTerm: '' }));
  }, []);

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
