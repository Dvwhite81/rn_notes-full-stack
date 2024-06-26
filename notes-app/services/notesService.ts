import axios from 'axios';
import { NewNote, NoteType } from '../utils/interfaces';
import { Platform } from 'react-native';

const ANDROID_URL = 'http://192.168.1.70:5000/api/notes';
const WEB_URL = 'http://localhost:5000/api/notes';

const URL = Platform.OS === 'android' ? ANDROID_URL : WEB_URL;

export default {
  async getAllNotes() {
    const response = await axios.get(`${URL}`);
    return response.data;
  },
  async getSingleNote(noteId: string) {
    const response = await axios.get(`${URL}/${noteId}`);
    return response.data;
  },
  async updateNote(note: NoteType, userId: number) {
    const response = await axios.put(`${URL}/${note.id}`, { note, userId });
    return response.data;
  },
  async addNote(note: NewNote, userId: number) {
    const response = await axios.post(`${URL}`, { note, userId });
    return response.data;
  },
  async deleteNote(id: number) {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  },
};
