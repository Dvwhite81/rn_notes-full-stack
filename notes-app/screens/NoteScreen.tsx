import { useEffect, useRef, useState } from 'react';
import { useToast, VStack } from 'native-base';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { RootStackParams } from '../utils/interfaces';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addNewNote, deleteNote, editNote } from '../redux/notes-actions';
import { updateNote } from '../redux/notes-slice';

import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import LoadingSpinner from '../components/LoadingSpinner';

type Props = NativeStackScreenProps<RootStackParams, 'Note'>;

export default function NoteScreen({ navigation, route }: Props) {
  const [noteId, setNoteId] = useState<number | undefined>();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');

  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.notes);
  const { loggedInUser } = useAppSelector((state) => state.profileInfo);
  const { loading } = useAppSelector((state) => state.siteInfo);

  if (!loggedInUser) {
    navigation.navigate('Login');
    return;
  }

  const noteIdRef = useRef<number | undefined>();
  noteIdRef.current = noteId;
  const noteTitleRef = useRef<string>();
  noteTitleRef.current = noteTitle;
  const noteContentRef = useRef<string>();
  noteContentRef.current = noteContent;

  const updateNoteTitle = (text: string) => {
    setNoteTitle(text);
    if (!noteId) return;

    dispatch(updateNote({ id: noteId, title: text }));
  };

  const updateNoteContent = (text: string) => {
    setNoteContent(text);
    if (!noteId) return;

    dispatch(updateNote({ id: noteId, content: text }));
  };

  const saveNoteToast = useToast();

  const saveNote = async () => {
    if (!noteId) return;

    const note = {
      id: noteId,
      title: noteTitle,
      content: noteContent,
      userId: loggedInUser.id,
    };
    const { success, message } = await dispatch(editNote(note));

    if (success) {
      saveNoteToast.show({
        description: 'Saved Note!',
        duration: 2000,
        bg: 'success.500',
      });
      setNoteId(undefined);
      navigation.navigate('Home');
    } else {
      saveNoteToast.show({
        description: message,
        duration: 4000,
        bg: 'danger.500',
        placement: 'top',
      });
    }
  };

  const createNote = async () => {
    if (noteId) return;
    const note = { title: '', content: '' };
    const result = await dispatch(addNewNote(note));
    const { success, message } = result;

    if (success) {
      const { note } = result;
      setNoteId(note.id);
    } else {
      saveNoteToast.show({
        description: message,
        duration: 4000,
        bg: 'danger.500',
        placement: 'top',
      });
    }
  };

  const setNote = () => {
    const currentNote = notes.find((note) => note.id === route.params?.id);

    if (currentNote) {
      setNoteId(currentNote.id);
      setNoteTitle(currentNote.title);
      setNoteContent(currentNote.content);
    }
  };

  const cancelNote = () => {
    if (noteTitleRef.current || noteContentRef.current) {
      return;
    }

    if (noteIdRef.current) {
      dispatch(deleteNote(noteIdRef.current));
    }
  };

  useEffect(() => {
    console.log('useEffect route.params, noteId:', route.params, noteId);
    if (!route.params?.id && !noteId) {
      createNote();
    } else {
      setNote();
    }

    return cancelNote;
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <KeyboardAwareScrollView>
      <VStack>
        <CustomInput
          placeholder="Title"
          fontSize="lg"
          value={noteTitle}
          onChangeText={(text) => updateNoteTitle(text)}
          {...{ fontWeight: 'bold' }}
        />
        <CustomInput
          placeholder="Content"
          value={noteContent}
          onChangeText={(text) => updateNoteContent(text)}
          fontSize="sm"
          {...{ mt: '0' }}
        />
        <CustomButton text="Save" onPressAction={saveNote} />
      </VStack>
    </KeyboardAwareScrollView>
  );
}
