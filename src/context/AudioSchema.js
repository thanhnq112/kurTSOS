import { createContext, useContext } from "react";

export const AudioSchema = createContext();
export function useAudioSchema() {
  return useContext(AudioSchema);
}
