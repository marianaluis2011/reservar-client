import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "./registerSchema.js";
 

export const useRegisterForm = () => {
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      role: "guest",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      province: "",
      description: "",
      whatsapp: "",
      terms: false,

      
    },
    
  });
const role = watch("role");

  return {
    register,
    role,
    handleSubmit,
    watch,
    setValue,
    reset,
    errors,
    isSubmitting,
  };
};