import { useEffect, useState } from 'react';
import {
  Keyboard,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';

import NoteItem from './components/NoteItem';
import { NoteType } from './interfaces';

const BASE_URL = 'http://localhost:5000/api/notes';
const ANDROID_URL = 'http://10.0.2.2:5000/api/notes';

export default function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [selectedNote, setSelectedNote] = useState<NoteType | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const URL = Platform.OS === 'android' ? ANDROID_URL : BASE_URL;
  console.log('os:', Platform.OS);
  useEffect(() => {
    const fetchNotes = async () => {
      console.log('url:', URL);
      try {
        const response = await axios.get(URL);
        console.log('response:', response);
        const dbNotes: NoteType[] = await response.data;
        setNotes(dbNotes);
      } catch (error) {
        console.log('error:', error);
      }
    };

    fetchNotes();
  }, []);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setSelectedNote(null);
    Keyboard.dismiss();
  };

  const handleAddNote = async () => {
    console.log('handleAddNote');
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      console.log('response:', response);

      const newNote = await response.json();
      setNotes([...notes, newNote]);
      resetForm();
    } catch (error) {
      console.log('error:', error);
    }
  };

  const handleUpdateNote = async () => {
    if (!selectedNote) {
      return;
    }

    const noteId = selectedNote.id;

    try {
      const response = await fetch(`${URL}/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const updatedNote = await response.json();

      const newAllNotes = notes.map((note) =>
        note.id === selectedNote.id ? updatedNote : note
      );
      setNotes(newAllNotes);
      resetForm();
    } catch (error) {
      console.log('error:', error);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    try {
      await fetch(`${URL}/${noteId}`, {
        method: 'DELETE',
      });

      const newAllNotes = notes.filter((note) => note.id !== noteId);
      setNotes(newAllNotes);
      resetForm();
    } catch (error) {
      console.log('error:', error);
    }
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

      <ScrollView contentContainerStyle={styles.notesGrid}>
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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
