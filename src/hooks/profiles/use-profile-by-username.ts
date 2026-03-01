import { getProfileByUsername } from "@/actions/app/profiles";
import { useQuery } from "@tanstack/react-query";

export const useProfileByUserId = (username: string) => {
  return useQuery({
    queryKey: ["profile-by-username", username],
    queryFn: () => getProfileByUsername(username),
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
  });
};
