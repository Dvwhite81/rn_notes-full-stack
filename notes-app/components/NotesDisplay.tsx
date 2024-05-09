import { FlatList } from 'native-base';

import { useAppSelector } from '../redux/store';
import NoteItem from './NoteItem';

interface Props {
  onNotePress: (id: number) => void;
  onLongNotePress: (id: number) => void;
}

export default function NotesDisplay({ onNotePress, onLongNotePress }: Props) {
  const notes = useAppSelector((state) => state.notes.notes);
  const searchTerm = useAppSelector((state) => state.notes.searchTerm);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
