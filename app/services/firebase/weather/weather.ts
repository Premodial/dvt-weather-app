import { firestore } from '../../../config/firebaseConfig';
import { collection, addDoc,  getDocs, query, where } from 'firebase/firestore';
import {Favorite, AddFavoriteResponse} from '../../../models/favorite';

/**
 * Adds a favorite weather location for a user to the database.
 *
 * @param userFavorite - An object representing the user's favorite weather location details.
 * @returns A promise that will be resolves to an object which will then indicate that the api call was a success.
 * @throws Will throw an error if the api fails.
 */

export const addFavorite = async (userFavorite: Favorite): Promise<AddFavoriteResponse> => {
  try {
    const favoritesCollectionRef = collection(firestore, "favorites");
    const docRef = await addDoc(favoritesCollectionRef, userFavorite);

    return { status: 'success', message: 'Favorite successfully added', docId: docRef.id };
  } catch (error) {
    console.error('Failed to add favorite:', error);
    throw new Error(error.message);
  }
};

/**
 * Fetches the data(favorites) of a user based on their userId.
 *
 * @param userId - The unique identifier of the user whose data you want to fetch.
 * @returns A promise that resolves to an array of user data objects.
 * @throws Will throw an error if the operation fails.
 */
export const getUserData = async (userId: string): Promise<Favorite[]> => {
    try {
     
      const favoritesCollectionRef = collection(firestore, "favorites");
      const q = query(favoritesCollectionRef, where("userId", "==", userId));
  
      const querySnapshot = await getDocs(q);
        const userData = querySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as unknown as Favorite ;
      });
      return userData;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      throw new Error('Failed to fetch user data');
    }
  };