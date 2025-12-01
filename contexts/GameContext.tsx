import useIdleGame from '@/hooks/useIdleGame';
import React, { createContext, ReactNode } from 'react';

// Type du contexte
export type GameContextType = ReturnType<typeof useIdleGame>;

// Créer le contexte avec une valeur par défaut undefined
export const GameContext = createContext<GameContextType | undefined>(undefined);

// Provider wrapper
export function GameProvider({ children }: { children: ReactNode }) {
  const gameState = useIdleGame();
  
  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
}
