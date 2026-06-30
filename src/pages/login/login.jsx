import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "./useLogin";
import { toast } from "sonner";
import { loginUser } from "../../services/auth.services";
import { useAuth } from "../../context/AuthContext";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 🔥 FIX

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
  } = useLoginForm();

  const onSubmit = async (data) => {
    try {
      const { email, password, rememberMe } = data;

      const result = await loginUser({
        email,
        password,
      });

      login(result.token, result.user, rememberMe);

      toast.success("Sesión iniciada correctamente");

      const routesByRole = {
        guest: "/",
        host: "/host/dashboard",
        super_admin: "/host/superAdmin",
      };

      navigate(routesByRole[result.user.role] || "/");

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error al iniciar sesión"
      );
    }
  };

  return (
    <div className="container-one">

      <div className="panel-left min-h-screen flex flex-col lg:flex-row">
        <div className="login-brand">
          <h1 className="login-brand__title">Hospedar</h1>
          <p className="login-brand__slogan">
            Tu próximo viaje empieza acá. 
            Encontrá hospedajes en todo el país
            y gestioná tus reservas de forma simple y segura.
          </p>
        </div>
      </div>

      <div className="panel-rigth">
        <div className="w-full max-w-md">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 mb-10"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <h2 className="text-4xl font-bold text-slate-900">
            Iniciar Sesión
          </h2>

          <p className="p-title">
            Ingresa tus credenciales para continuar.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Correo Electrónico
              </label>

              <input
                type="email"
                {...register("email")}
                placeholder="ejemplo@reservahost.com"
                className="btn-input"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-700 mb-2">
                Contraseña
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  className="btn-input"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                />
                Recordarme
              </label>
              <button
                type="button"
                onClick={() => navigate("/404")}
                className="font-semibold text-cyan-700 hover:text-cyan-800"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-register"
            >
              {isSubmitting
                ? "Ingresando..."
                : "Ingresar"}
            </button>

          </form>

          <p className="p-register">
            ¿Aún no tienes cuenta?{" "}
            <button
              className="font-semibold text-cyan-700 hover:text-cyan-800"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}