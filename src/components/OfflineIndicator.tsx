import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-semibold text-zinc-950 shadow-lg border border-amber-600 animate-fade-in">
      <WifiOff className="w-4 h-4 text-zinc-950" />
      <span>Offline Mode — All conversions run 100% locally in your browser.</span>
    </div>
  );
};
