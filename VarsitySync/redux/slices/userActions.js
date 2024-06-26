import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { setUser, setUserLoading, clearUser } from './user';

export const registerUser = (email, password, displayName) => async (dispatch) => {
  dispatch(setUserLoading(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName }); // Set the display name in Firebase Auth
    dispatch(setUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }));
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    dispatch(setUserLoading(false));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(setUserLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    dispatch(setUser({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    }));
  } catch (error) {
    console.error('Error signing in user:', error);
  } finally {
    dispatch(setUserLoading(false));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(clearUser());
  } catch (error) {
    console.error('Error signing out user:', error);
  }
};