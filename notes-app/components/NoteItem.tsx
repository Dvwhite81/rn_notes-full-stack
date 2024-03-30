import { Pressable, StyleSheet, Text, View } from 'react-native';
import { NoteType } from '../interfaces';

interface NoteItemProps {
  note: NoteType;
  handleNoteClick: (note: NoteType) => void;
  handleDeleteNote: (noteId: number) => void;
}

const NoteItem = ({
  note,
  handleNoteClick,
  handleDeleteNote,
}: NoteItemProps) => {
  return (
    <Pressable style={styles.noteItem} onPress={() => handleNoteClick(note)}>
      <View style={styles.noteHeader}>
        <Pressable
          style={styles.noteHeaderButtonStyle}
          onPress={() => handleDeleteNote(note.id)}
        >
          <Text style={styles.noteHeaderButtonText}>x</Text>
        </Pressable>
      </View>

      <Text style={styles.noteHeadingText}>{note.title}</Text>
      <Text>{note.content}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    margin: 5,
    padding: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  noteHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  noteHeaderButtonStyle: {},
  noteHeaderButtonText: {
    fontSize: 16,
  },
  noteHeadingText: {
    fontSize: 34,
    margin: 0,
  },
});

export default NoteItem;
