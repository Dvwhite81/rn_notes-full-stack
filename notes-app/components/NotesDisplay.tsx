import { FlatList } from 'native-base';

import { useAppDispatch, useAppSelector } from '../redux/store';
import NoteItem from './NoteItem';
import { useEffect } from 'react';
import { fetchAllNotes, fetchUserNotes } from '../redux/notes-actions';
import LoadingSpinner from './LoadingSpinner';
import { setLoading } from '../redux/site-slice';

interface Props {
  onNotePress: (id: number) => void;
  onLongNotePress: (id: number) => void;
}

export default function NotesDisplay({ onNotePress, onLongNotePress }: Props) {
  const dispatch = useAppDispatch();
  const { notes, searchTerm } = useAppSelector((state) => state.notes);
  const userNotes = useAppSelector((state) => state.profileInfo.notes);
  const loggedInUser = useAppSelector(
    (state) => state.profileInfo.loggedInUser
  );

  useEffect(() => {
    console.log('notesdisplay useEffect');
    const getNotes = async () => {
      await dispatch(fetchAllNotes());

      if (loggedInUser) {
        await dispatch(fetchUserNotes(loggedInUser.id));
      }
    };

    getNotes();
  }, []);

  console.log('notesdisplay notes:', notes);
  console.log('notesdisplay usernotes:', userNotes);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const { loading } = useAppSelector((state) => state.siteInfo);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <FlatList
      data={filteredNotes}
      renderItem={({ item }) => (
        <NoteItem
          title={item.title}
          content={item.content}
          onNotePress={() => onNotePress(item.id)}
          onLongNotePress={() => onLongNotePress(item.id)}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    ></FlatList>
  );
}
