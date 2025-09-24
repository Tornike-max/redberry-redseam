import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userRegistration } from "../api/requests";
import type { RegisterData } from "../types/types";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate: registerUser, isPending } = useMutation({
    mutationFn: (data: RegisterData) => userRegistration(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
      navigate("/");
    },
    onError: () => {
      throw new Error("Error while registering user");
    },
  });

  return { registerUser, isPending };
};