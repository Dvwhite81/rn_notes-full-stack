import notesService from '../services/notesService';
import usersService from '../services/usersService';
import { NoteType, UserType } from '../utils/interfaces';
import {
  changeMessage,
  changeUsername,
  removeLoggedInUser,
  setLoggedInUser,
} from './profile-slice';
import { AppDispatch } from './store';

export const userRegister = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    const result = await usersService.register(username, password);
    const { success, message } = result;

    if (success) {
      const { user } = result;
      const userNotes: NoteType[] = [];
      dispatch(
        setLoggedInUser({ loggedInUser: user, notes: userNotes, message })
      );
    }

    return { success, message };
  };
};

export const userLogin = (username: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    const result = await usersService.login(username, password);
    const { success, message } = result;

    if (success) {
      const { user } = result;
      const userNotes = await notesService.getUserNotes(user.id);
      console.log('userLogin userNotes:', userNotes);
      dispatch(
        setLoggedInUser({ loggedInUser: user, notes: userNotes, message })
      );
    }

    return { success: success, message: message };
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
    const result = await usersService.updateUsername(user, newUsername);
    const { success, message } = result;

    if (success) {
      const { user } = result;
      dispatch(changeUsername(user));
    }

    return { success: success, message: message };
  };
};
