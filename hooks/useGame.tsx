import { GameContext, GameContextType } from '@/contexts/GameContext';
import { useContext } from 'react';

/**
 * Hook pour accéder au contexte du jeu depuis n'importe quel composant.
 * Doit être utilisé dans un composant enfant de GameProvider.
 */
export function useGame(): GameContextType {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame doit être utilisé à l\'intérieur d\'un GameProvider');
  }
  return context;
}
