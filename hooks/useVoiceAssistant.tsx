// src/hooks/useVoiceAssistant.ts
import { useRef, useCallback, useState } from 'react';
import { useAuthStore } from '../lib/stores/AuthStore';
import { useSessionSettings } from '../lib/stores/SessionSettingsStore';
import { VoiceSessionManager } from '../lib/voice/SessionManager';

/**
 * Hook to manage a real-time voice session with the AI backend.
 * Uses a singleton VoiceSessionManager internally for efficiency.
 * @param sessionId ID of the current therapy session
 */
export function useVoiceAssistant(sessionId: string) {
  // Retrieve persistent token and settings directly from stores
  const token = useAuthStore.getState().token;
  const settings = useSessionSettings.getState();

  // Ref to hold our session manager instance
  const managerRef = useRef<VoiceSessionManager | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Start or resume a voice session: initializes manager, opens socket, starts audio
   */
  const startSession = useCallback(async () => {
    if (!token) {
      setError('Not authenticated');
      return;
    }

    try {
      // Lazily initialize the manager per session
      if (!managerRef.current) {
        managerRef.current = new VoiceSessionManager(sessionId, token, settings);
      }

      // Start streaming
      await managerRef.current.start();
      setConnected(true);
    } catch (e: any) {
      setError(e.message || 'Failed to start session');
    }
  }, [sessionId, token, settings]);

  /**
   * Stop the current voice session: stops audio and closes socket
   */
  const stopSession = useCallback(async () => {
    try {
      await managerRef.current?.stop();
    } catch {
      // ignore errors on stop
    }
    setConnected(false);
  }, []);

  return { connected, error, startSession, stopSession };
}
