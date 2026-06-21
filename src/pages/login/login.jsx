import { useState, useContext } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { useLoginForm } from "./useLogin";
import { toast } from "sonner";
import { loginUser } from "../../services/auth.services";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ usamos el contexto

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
  } = useLoginForm();

const onSubmit = async (data) => {
  try {
    // Extraemos rememberMe para NO enviarlo al backend
    const { email, password, rememberMe } = data;

    const result = await loginUser({
      email,
      password,
    });

    // Guarda la sesión en localStorage o sessionStorage
    login(result.token, result.user, rememberMe);

    toast.success("Sesión iniciada correctamente");

    // Redirección por rol
    switch (result.user.role) {
      case "guest":
        navigate("/");
        break;

      case "host":
        navigate("/hostdashboard");
        break;

      case "super_admin":
        navigate("/super-admin");
        break;

      default:
        navigate("/");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Error al iniciar sesión");
  }
};
  return (
    // <div className="min-h-screen flex flex-col lg:flex-row">
    <div className="container-one">
      {/* HEADER MOBILE
      <div className="lg:hidden bg-gradient-to-r from-slate-700 via-slate-800 to-blue-950 text-white py-6 px-4 text-center">
        <h1 className="text-3xl font-bold">
          ReservaHost
        </h1>
      </div> */}

      {/* PANEL IZQUIERDO */}
      {/* <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-700 via-slate-800 to-blue-950 text-white p-12 items-end relative overflow-hidden"> */}
      <div className="panel-left min-h-screen flex flex-col lg:flex-row">
        {/* <div className="absolute inset-0">
          <div className="absolute left-0 top-0 h-full w-full bg-blue-950 opacity-50"></div>

          <div
            className="absolute left-0 top-0 h-full w-full"
            style={{
              clipPath: "polygon(0 0, 0 100%, 80% 100%)",
              background: "rgba(0,0,0,0.15)",
            }}
          />
        </div> */}

        <div className="absolute bottom-5 z-10 max-w-md">
          <h1 className="text-5xl font-bold mb-8">
            ReservaHost
          </h1>

          <h2 className="text-4xl font-bold leading-tight mb-6">
            Accede a tu cuenta y continúa gestionando
            tus reservas y hospedajes.
          </h2>

          {/* <div className="w-16 h-1 bg-cyan-400 rounded-full"></div> */}
        </div>
      </div>

      {/* PANEL DERECHO */}
      {/* <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-10"> */}
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

          {/* TÍTULO */}
          <h2 className="text-4xl font-bold text-slate-900">
            Iniciar Sesión
          </h2>

          <p className="text-slate-500 mt-3 mb-10">
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
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  {...register("password")}
                  placeholder="••••••••"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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

              <button
                type="button"
                className="text-cyan-700 hover:text-cyan-800"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-400 hover:bg-cyan-500 disabled:opacity-50 text-slate-800 font-semibold py-3 rounded-lg transition-colors"
            >
              {isSubmitting
                ? "Ingresando..."
                : "Ingresar"}
            </button>
          </form>

          {/* REGISTER */}
          <p className="text-center text-sm text-slate-500 mt-10">
            ¿Aún no tienes cuenta?{" "}
            <button
              type="button"
              onClick={() =>
                navigate("/register")
              }
              className="font-semibold text-cyan-700 hover:text-cyan-800"
            >
              Registrarme
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}