import { FormEvent, SyntheticEvent, useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { initialNotes } from './helpers';
import NoteItem from './components/NoteItem';
import { NoteType } from './interfaces';

export default function App() {
  const [notes, setNotes] = useState<NoteType[]>(initialNotes);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const resetForm = () => {
    setTitle('');
    setContent('');
    setSelectedNote(null);
    Keyboard.dismiss();
  };

  const handleAddNote = () => {
    const newNote: NoteType = {
      id: notes.length + 1,
      title: title,
      content: content,
    };

    const newAllNotes = [...notes, newNote];
    setNotes(newAllNotes);
    resetForm();
  };

  const handleUpdateNote = () => {
    if (!selectedNote) {
      return;
    }

    const updatedNote: NoteType = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    const newAllNotes = notes.map((note) =>
      note.id === selectedNote.id ? updatedNote : note
    );
    setNotes(newAllNotes);
    resetForm();
  };

  const handleDeleteNote = (noteId: number) => {
    const newAllNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newAllNotes);
    resetForm();
  };

  const handleNoteClick = (note: NoteType) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.formInput}
          placeholder="Title"
          placeholderTextColor="lightgray"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          style={styles.formInput}
          placeholder="Content"
          placeholderTextColor="lightgray"
          multiline
          value={content}
          onChangeText={(text) => setContent(text)}
        />

        {selectedNote ? (
          <View style={styles.editButtonsGroup}>
            <Pressable
              style={[styles.formButtonStyle, styles.saveButtonStyle]}
              onPress={handleUpdateNote}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
              style={[styles.formButtonStyle, styles.cancelButtonStyle]}
              onPress={resetForm}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            style={[styles.formButtonStyle, styles.saveButtonStyle]}
            onPress={handleAddNote}
          >
            <Text style={styles.buttonText}>Add Note</Text>
          </Pressable>
        )}
      </View>

      <ScrollView style={styles.notesGrid}>
        {notes.map((note, index) => (
          <NoteItem
            key={index}
            note={note}
            handleNoteClick={handleNoteClick}
            handleDeleteNote={handleDeleteNote}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    flex: 1,
    padding: 10,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginTop: 40,
    padding: 10,
  },
  formInput: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 5,
    fontSize: 16,
    padding: 5,
  },
  formButtonStyle: {
    borderRadius: 5,
    color: '#000',
    padding: 10,
  },
  notesGrid: {
    rowGap: 20,
  },
  editButtonsGroup: {
    display: 'flex',
    gap: 5,
    justifyContent: 'space-evenly',
  },
  saveButtonStyle: {
    backgroundColor: '#9ab840',
  },
  cancelButtonStyle: {
    backgroundColor: '#FF6666',
    color: 'white',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
