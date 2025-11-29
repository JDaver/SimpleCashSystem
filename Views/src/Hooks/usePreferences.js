import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { getPreferences, updatePreferences } from '../utils/preferencesService';

export function usePreferences() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['preferences'],
    queryFn: getPreferences,
    staleTime: 5 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: updatePreferences,
    onMutate: async newPrefs => {
      await queryClient.cancelQueries(['preferences']);
      const previousPrefs = queryClient.getQueryData(['preferences']);
      queryClient.setQueryData(['preferences'], newPrefs);
      return { previousPrefs };
    },
    onError: (err, newPrefs, context) => {
      if (context?.previousPrefs) {
        queryClient.setQueryData(['preferences'], context.previousPrefs);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['preferences']);
    },
  });

  return {
    preferences: query.data,
    isLoading: query.isLoading,
    updatePreferences: mutation.mutate,
  };
}
