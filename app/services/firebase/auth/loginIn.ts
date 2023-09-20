import { auth as firebaseAuth } from '../../../config/firebaseConfig';
import { getAuth, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';

/**
 * Asynchronously log in a user using their email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<UserCredential>} - A promise that returns the user data if the login works.
 */

export const logIn = async (email: string, password: string): Promise<UserCredential> => {
  const REQUIRED_FIELDS_ERROR = 'Both email and password are required to log in.';
 
  try {
    if (!email || !password) {
      throw new Error(REQUIRED_FIELDS_ERROR);
    }
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return userCredential;
  } catch (error: unknown) {
    throw error;
  }
};