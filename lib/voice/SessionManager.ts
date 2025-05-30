// src/services/VoiceSessionManager.ts
import { Audio } from 'expo-av';
import type { Sound, Recording } from 'expo-av';

type SessionSettings = { voice: string; genzMode: boolean; guided: boolean };

export class VoiceSessionManager {
  private player?: Sound;
  private recorder?: Recording;
  private socket?: WebSocket;
  private initDone = false;

  constructor(
    private sessionId: string,
    private token: string,
    private settings: SessionSettings
  ) {}

  /** One-time init: ask mic perms & prep player */
  async init() {
    if (this.initDone) return;
    await Audio.requestPermissionsAsync();
    this.player = new Audio.Sound();
    this.initDone = true;
  }

  /** Open WS & start recording → proxy to OpenAI; play back incoming audio */
  async start() {
    await this.init();

    // 1. start recorder
    this.recorder = new Audio.Recording();
    await this.recorder.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
    await this.recorder.startAsync();

    // 2. open WebSocket
    const url = `wss://api.yourdomain.com/ws/voice?sessionId=${this.sessionId}&token=${this.token}`;
    this.socket = new WebSocket(url);
    this.socket.binaryType = 'arraybuffer';

    // 3. forward mic → OpenAI
    this.recorder.setOnRecordingStatusUpdate(async (status) => {
      if (status.isRecording) {
        const uri = this.recorder!.getURI();
        if (!uri || !this.socket) return;
        const blob = await fetch(uri).then((r) => r.blob());
        this.socket.send(await blob.arrayBuffer());
      }
    });

    // 4. play back AI audio → speaker
    this.socket.onmessage = async ({ data }) => {
      if (!this.player) return;
      const blob = new Blob([data], { type: 'audio/ogg; codecs=opus' });
      const uri = URL.createObjectURL(blob);
      await this.player.unloadAsync();
      await this.player.loadAsync({ uri }, {}, false);
      await this.player.playAsync();
    };
  }

  /** Stop recording and close WS */
  async stop() {
    if (this.recorder) {
      try { await this.recorder.stopAndUnloadAsync(); } catch {}
    }
    if (this.socket) {
      this.socket.close();
    }
  }
}
