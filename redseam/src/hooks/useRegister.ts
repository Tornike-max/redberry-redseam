import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRegistration } from "../api/requests";
import type { RegisterData } from "../types/types";

export const useRegister = () => {
  const queryClient = useQueryClient();

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: (data: RegisterData) => userRegistration(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
    onError: () => {
      throw new Error("Error while registering user");
    },
  });

  return { registerUser, isPending };
};