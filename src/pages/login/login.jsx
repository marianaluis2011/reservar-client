import { useState, useContext } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLoginForm } from "./useLogin";
import { toast } from "sonner";
import { loginUser } from "../../services/auth.services";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

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

      // 🔐 Guardar sesión
      login(result.token, result.user, rememberMe);

      toast.success("Sesión iniciada correctamente");

      // 🚀 Redirección por rol (limpia y escalable)
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

      {/* PANEL IZQUIERDO */}
      <div className="panel-left min-h-screen flex flex-col lg:flex-row">
        <div className="absolute bottom-5 z-10 max-w-md">
          <h1 className="text-5xl font-bold mb-8">
            ReservaHost
          </h1>

          <h2 className="text-4xl font-bold leading-tight mb-6">
            Accede a tu cuenta y continúa gestionando
            tus reservas y hospedajes.
          </h2>
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="panel-rigth">
        <div className="w-full max-w-md">

          {/* VOLVER */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 mb-10"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          {/* TITULO */}
          <h2 className="text-4xl font-bold text-slate-900">
            Iniciar Sesión
          </h2>

          <p className="p-title">
            Ingresa tus credenciales para continuar.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
          >

            {/* EMAIL */}
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

            {/* PASSWORD */}
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

            {/* RECORDARME */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                />
                Recordarme
              </label>
            </div>

            {/* SUBMIT */}
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

          {/* REGISTER */}
          <p className="p-register">
            ¿Aún no tienes cuenta?{" "}
            <button
              className="font-semibold text-cyan-700 hover:text-cyan-800"
              onClick={() => navigate("/register")}
            >
              Registrarme
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}