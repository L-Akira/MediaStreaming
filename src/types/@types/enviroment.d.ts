export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number,
      CHUNK_SIZE_MB: number,
      VIDEO_NAME: string,
      TIMEOUT_TO_CUT_CONNECTIONS_SEC: number,
      TIMEOUT_TO_CUT_FORCE_SHUTDOWN_SEC: number,
    }
  }
}
