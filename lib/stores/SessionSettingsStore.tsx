import { create } from 'zustand'

export type Voice = 'male' | 'female'

type SettingsState = {
  voice: Voice
  genZMode: boolean
  subtitles: boolean
  guidedSession: boolean
  /* ───── actions ───── */
  setVoice: (v: Voice) => void
  toggleGenZ: () => void
  toggleSubtitles: () => void
  toggleGuided: () => void
}

export const useSettings = create<SettingsState>()((set) => ({
  /* defaults */
  voice: 'female',
  genZMode: false,
  subtitles: false,
  guidedSession: true,
  /* actions */
  setVoice: (voice) => set({ voice }),
  toggleGenZ:     () => set((s) => ({ genZMode:      !s.genZMode      })),
  toggleSubtitles:() => set((s) => ({ subtitles:     !s.subtitles     })),
  toggleGuided:   () => set((s) => ({ guidedSession: !s.guidedSession })),
}))
