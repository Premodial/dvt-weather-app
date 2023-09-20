import { create } from 'zustand';

interface UserStore {
  userId: string | null;
  isLoggedIn: false;
  setUserId: (userId: string) => Promise<void>;
  setIsLoggedIn: (isLoggedIn: boolean) => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  isLoggedIn: false,
  setUserId: async (userId: string) => {
    try {
      set({ userId });
    } catch (error) {
      console.error('Error in setUserId:', error);
    }
  },
  setIsLoggedIn: async (isLoggedIn: false) => {
    try {
      set({ isLoggedIn });
    } catch (error) {
      console.error('Error in setUserId:', error);
    }
  },
}));
