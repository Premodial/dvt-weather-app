import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageKey = string;

interface UserData {
    userId: string;
    email: string | null;
    isLoggedIn: boolean;
  }

/**
 * Asynchronously stores a value identified by a key in the AsyncStorage.
 *
 * @param key - The identifier for the value to store.
 * @param value - The value to store.
 * @throws Will throw an error if the operation fails.
 */

export const setUserData = async (key: StorageKey, value: UserData): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    throw new Error('Failed to set user data');
  }
};

/**
 * Asynchronously retrieves a value identified by a key from the AsyncStorage.
 *
 * @param key - The identifier for the value to retrieve.
 * @returns The retrieved value, or null if the value does not exist.
 * @throws Will throw an error if the operation fails.
 */

export const retrieveUserData = async (key: StorageKey): Promise<UserData> => {
    try {
      const result = await AsyncStorage.getItem(key);
      
      if (result === null) {
        throw new Error('No data found for the specified key');
      }
      
      return JSON.parse(result);
    } catch (error) {
      throw new Error('Failed to retrieve user data');
    }
};

/**
 * Asynchronously removes a value identified by a key from the AsyncStorage.
 *
 * @param key - The identifier for the value to remove.
 * @throws Will throw an error if the operation fails.
 */

export const removeUserData = async (key: StorageKey): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new Error('Failed to remove user data');
  }
};
