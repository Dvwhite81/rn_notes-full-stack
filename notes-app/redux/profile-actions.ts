import notesService from '../services/notesService';
import usersService from '../services/usersService';
import { NoteType, UserType } from '../utils/interfaces';
import { setAllNotes } from './notes-slice';
import {
  changeUsername,
  removeLoggedInUser,
  setLoggedInUser,
} from './profile-slice';
import { setLoading } from './site-slice';
import { AppDispatch } from './store';

export const userRegister = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const result = await usersService.register(username, password);
    dispatch(setLoading(false));
    const { success, message } = result;

    if (success) {
      const { user } = result;
      dispatch(setLoggedInUser(user));
    }

    return { success, message };
  };
};

export const userLogin = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const result = await usersService.login(username, password);
    dispatch(setLoading(false));
    const { success, message } = result;

    if (success) {
      const { user } = result;
      dispatch(setLoggedInUser(user));
    }

    return { success, message };
  };
};

export const userLogout = () => {
  return async (dispatch: AppDispatch) => {
    await usersService.logout();
    dispatch(removeLoggedInUser());
  };
};

export const userUpdateUsername = (user: UserType, newUsername: string) => {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    const result = await usersService.updateUsername(user, newUsername);
    dispatch(setLoading(false));
    const { success, message } = result;

    if (success) {
      const { user } = result;
      dispatch(changeUsername(user));
    }

    return { success, message };
  };
};
