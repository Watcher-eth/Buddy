// src/stores/authStore.ts

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  token: string | null;
  userId: string | null;
  setAuth: (token: string, userId: string) => void;
  clearAuth: () => void;
}

// Persistent auth store using AsyncStorage (encrypted with native storage if configured)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userId: null,
      
      setAuth: (token, userId) => {
        set({ token, userId });
      },
      
      clearAuth: () => {
        set({ token: null, userId: null });
      },
    }),
    {
      name: 'auth-storage', // key under which state is persisted
      storage: createJSONStorage(() => ({ getItem: SecureStore.getItemAsync, setItem: SecureStore.setItemAsync, removeItem: SecureStore.deleteItemAsync })),
    }
  )
);
