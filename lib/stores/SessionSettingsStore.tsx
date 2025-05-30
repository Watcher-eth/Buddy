import { create } from 'zustand'

export type Voice = 'male' | 'female'

type SettingsState = {
  voice: Voice
  genzMode: boolean
  subtitles: boolean
  guided: boolean
  /* ───── actions ───── */
  setVoice: (v: Voice) => void
  toggleGenZ: () => void
  toggleSubtitles: () => void
  toggleGuided: () => void
}

export const useSessionSettings = create<SettingsState>()((set) => ({
  /* defaults */
  voice: 'female',
  genzMode: false,
  subtitles: false,
  guided: true,
  /* actions */
  setVoice: (voice) => set({ voice }),
  toggleGenZ:     () => set((s) => ({ genzMode:      !s.genzMode      })),
  toggleSubtitles:() => set((s) => ({ subtitles:     !s.subtitles     })),
  toggleGuided:   () => set((s) => ({ guided: !s.guided })),
}))
