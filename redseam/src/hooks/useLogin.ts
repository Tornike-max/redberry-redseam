import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/requests";
import type { SignInData } from "../types/types";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { mutate: logInUser, isPending } = useMutation({
    mutationFn: (data: SignInData) => loginUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      navigate("/");
    },
    onError: () => {
      throw new Error("Error while log in user");
    },
  });

  return { logInUser, isPending };
};