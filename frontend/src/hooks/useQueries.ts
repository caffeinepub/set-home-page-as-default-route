import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { VisitorEntry } from '@/backend';

// Log a visitor username to the backend
export function useLogVisitor() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (username: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.logVisitor(username);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
      queryClient.invalidateQueries({ queryKey: ['visitorLog'] });
    },
  });
}

// Get visitor log (password protected)
export function useGetVisitorLog(password: string, enabled: boolean = false) {
  const { actor, isFetching } = useActor();

  return useQuery<VisitorEntry[] | null>({
    queryKey: ['visitorLog', password],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      const result = await actor.getVisitorLog(password);
      // Backend returns null for wrong password, array for correct password
      if (result === null) {
        throw new Error('Invalid password or no data returned');
      }
      return result;
    },
    enabled: !!actor && !isFetching && enabled && !!password,
    retry: false,
    staleTime: 0,
  });
}

// Clear visitor log (password protected)
export function useClearVisitorLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (password: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.clearVisitorLog(password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['visitorLog'] });
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
}

// Get recent notifications (polls every 30 seconds)
export function useGetNotifications() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getNotifications();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30000,
  });
}
