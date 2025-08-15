
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useRealtimeSync = (
  tableName: string,
  onUpdate: () => void,
  dependencies: any[] = []
) => {
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName
        },
        (payload) => {
          console.log(`Real-time update for ${tableName}:`, payload);
          onUpdate();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, dependencies);
};
