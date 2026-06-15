import { Bed, Building2, CheckCircle } from "lucide-react";
import { registerUser } from "../../services/auth.services.js";
import { useRegisterForm } from "./useRegister.js";
import { toast } from "sonner";

const onSubmit = async (data) => {
  try {
    const response = await registerUser(data);

    toast.success("Usuario registrado correctamente");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Error al registrar usuario"
    );
  }
};

export default function Register() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    setValue,
    role,
  } = useRegisterForm();

  const handleRoleChange = (newRole) => {
    setValue("role", newRole);
  };

  return (
    <div className="h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[90vh] bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col">

        <div className="p-0 border-b flex-shrink-0">
          <h1 className="text-2xl font-bold text-slate-900">
            Crea tu cuenta
          </h1>

          <p className="text-slate-500 mt-1">
            Únete a la plataforma de gestión hotelera más moderna.
          </p>
        </div>


        <div className="flex-1 overflow-y-auto p-5">
          <form onSubmit={handleSubmit(onSubmit)}>

            <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-700 mb-3">
              ¿QUÉ DESEAS HACER?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">

              <button
                type="button"
                onClick={() => handleRoleChange("guest")}
                className={`relative border rounded-xl p-3 text-left transition-all ${role === "guest"
                    ? "border-cyan-600 bg-cyan-50"
                    : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
              >
                {role === "guest" && (
                  <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-cyan-600" />
                )}

                <div className="flex gap-3">
                  <Bed className="w-5 h-5 text-slate-700 mt-1 flex-shrink-0" />

                  <div>
                    <h3 className="font-medium text-xs text-slate-800 leading-tight">
                      Quiero reservar hospedajes
                    </h3>

                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Busca y gestiona tus estancias en segundos.
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("host")}
                className={`relative border rounded-xl p-3 text-left transition-all ${role === "host"
                    ? "border-cyan-600 bg-cyan-50"
                    : "border-slate-300 bg-white hover:border-slate-400"
                  }`}
              >
                {role === "host" && (
                  <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-cyan-600" />
                )}

                <div className="flex gap-3">
                  <Building2 className="w-5 h-5 text-slate-700 mt-1 flex-shrink-0" />

                  <div>
                    <h3 className="font-medium text-xs text-slate-800 leading-tight">
                      Quiero publicar mi hospedaje
                    </h3>

                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                      Administra tus habitaciones y reservas profesionalmente.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* DATOS PERSONALES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm mb-2">
                  Nombre Completo
                </label>

                <input
                  {...register("fullName")}
                  placeholder="Ej. Juan Pérez"
                  className="w-full border rounded-lg px-4 py-3"
                />

                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Correo Electrónico
                </label>

                <input
                  {...register("email")}
                  placeholder="juan@ejemplo.com"
                  className="w-full border rounded-lg px-4 py-3"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Contraseña
                </label>

                <input
                  type="password"
                  {...register("password")}
                  className="w-full border rounded-lg px-4 py-3"
                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Confirmar Contraseña
                </label>

                <input
                  type="password"
                  {...register("confirmPassword")}
                  className="w-full border rounded-lg px-4 py-3"
                />

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* HOST */}
            {role === "host" && (
              <div className="mt-4 border-t pt-4">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  Datos del Hospedaje
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div>
                    <label className="block text-sm mb-2">
                      Nombre del Hospedaje
                    </label>

                    <input
                      {...register("name")}
                      placeholder="Ej. Hotel Paraíso"
                      className="w-full border rounded-lg px-4 py-3"
                    />

                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Ubicación
                    </label>

                    <input
                      {...register("location")}
                      placeholder="Ciudad, País"
                      className="w-full border rounded-lg px-4 py-3"
                    />

                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.location.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2">
                      Descripción
                    </label>

                    <textarea
                      rows={4}
                      {...register("description")}
                      placeholder="Cuéntanos sobre tu hospedaje..."
                      className="w-full border rounded-lg px-4 py-3 resize-none"
                    />

                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      WhatsApp
                    </label>

                    <input
                      {...register("whatsapp")}
                      placeholder="+54 9 11 ..."
                      className="w-full border rounded-lg px-4 py-3"
                    />

                    {errors.whatsapp && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.whatsapp.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-cyan-50 border border-cyan-200 p-4">
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-700 mt-0.5" />

                    <div>
                      <h4 className="font-semibold text-cyan-900">
                        Estado: Pendiente de aprobación
                      </h4>

                      <p className="text-sm text-cyan-800 mt-1">
                        Tu cuenta y hospedaje han sido creados.
                        Se encuentran pendientes de aprobación
                        por el Super Administrador.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}


            <div className="mt-6 pt-4 border-t flex flex-col md:flex-row gap-4 md:justify-between md:items-center">

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register("terms")}
                />

                <span className="text-sm">
                  Acepto los Términos de Servicio
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-950 hover:bg-blue-900 text-white px-8 py-3 rounded-lg disabled:opacity-50"
              >
                {isSubmitting
                  ? "Procesando..."
                  : role === "guest"
                    ? "Crear cuenta"
                    : "Registrar Hospedaje"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
}