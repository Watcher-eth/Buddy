// src/stores/onboardingStore.ts
import { create } from 'zustand';

type OnboardingState = {
  gender: string | null;
  setGender: (v: string) => void;

  age: string | null;
  setAge: (v: string) => void;

  relationshipStatus: string | null;
  setRelationshipStatus: (v: string) => void;

  childhood: string | null;
  setChildhood: (v: string) => void;

  parents: string | null;
  setParents: (v: string) => void;

  everHadTherapy: string | null;
  setEverHadTherapy: (v: string) => void;

  mentalHealth: string | null;
  setMentalHealth: (v: string) => void;

  pressingIssues: string | null;
  setPressingIssues: (v: string) => void;

  goal: string | null;
  setGoal: (v: string) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  gender: null,
  setGender: (gender) => set({ gender }),

  age: null,
  setAge: (age) => set({ age }),

  relationshipStatus: null,
  setRelationshipStatus: (relationshipStatus) =>
    set({ relationshipStatus }),

  childhood: null,
  setChildhood: (childhood) => set({ childhood }),

  parents: null,
  setParents: (parents) => set({ parents }),

  everHadTherapy: null,
  setEverHadTherapy: (everHadTherapy) => set({ everHadTherapy }),

  mentalHealth: null,
  setMentalHealth: (mentalHealth) => set({ mentalHealth }),

  pressingIssues: null,
  setPressingIssues: (pressingIssues) => set({ pressingIssues }),

  goal: null,
  setGoal: (goal) => set({ goal }),
}));
