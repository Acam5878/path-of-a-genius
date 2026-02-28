import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Returns a live learner count from the DB, with a minimum floor for social proof
export const useLearnerCount = (floor = 1216) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { count: dbCount } = await supabase
        .from('user_progress')
        .select('user_id', { count: 'exact', head: true });
      // Use real count but show at least 'floor' for social proof
      setCount(Math.max(dbCount ?? 0, floor));
    };
    fetch();
  }, [floor]);

  // Format nicely: 1247 → "1,247"
  const formatted = count !== null
    ? count.toLocaleString()
    : '1,216+';

  return { count, formatted };
};
