import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';

// Example query hook - add your backend queries here
export function useExampleQuery() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['example'],
    queryFn: async () => {
      if (!actor) return null;
      // Add your backend calls here
      return null;
    },
    enabled: !!actor && !isFetching,
  });
}
