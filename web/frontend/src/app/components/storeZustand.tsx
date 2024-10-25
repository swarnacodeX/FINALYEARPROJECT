import {create} from 'zustand';

// Define the Zustand store interface
interface EmailZustand {
  email: string;
  setEmail: (email: string) => void;
}

// Create the Zustand store and export it
export const useStore = create<EmailZustand>((set) => ({
  email: '',
  setEmail: (email) => set({ email })
}));
