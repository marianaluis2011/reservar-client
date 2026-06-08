import { useState } from "react";
import { Bed, Building2, CheckCircle } from "lucide-react";
import { registerUser } from "../../services/auth.services.js";
import { useRegisterForm } from "./useRegister.js";

const onSubmit = async (data) => {
  try {
    const response = await registerUser(data);

    console.log(response);

    alert("Usuario registrado correctamente");
  } catch (error) {
    console.error(error);

    alert(
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
    watch,
    role,
  } = useRegisterForm();

  return (
    <div className="h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[85vh] bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col">

        {/* HEADER FIJO */}
        <div className="p-6 border-b flex-shrink-0">
          <h1 className="text-3xl font-bold text-slate-900">
            Crea tu cuenta
          </h1>

          <p className="text-slate-500 mt-2">
            Únete a la plataforma de gestión hotelera más moderna.
          </p>
        </div>

        {/* CONTENIDO SCROLLABLE */}
        <div className="flex-1 overflow-y-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Selector de perfil */}
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700 mb-4">
              ¿Qué deseas hacer?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Botón huésped */}
              <button
                type="button"
                onClick={() => handleRoleChange("guest")}
                className={`border rounded-xl p-4 text-left ${
                  role === "guest"
                    ? "border-cyan-600 bg-cyan-50"
                    : "border-slate-200"
                }`}
              >
                ...
              </button>

              {/* Botón host */}
              <button
                type="button"
                onClick={() => handleRoleChange("host")}
                className={`border rounded-xl p-4 text-left ${
                  role === "host"
                    ? "border-cyan-600 bg-cyan-50"
                    : "border-slate-200"
                }`}
              >
                ...
              </button>
            </div>

            {/* DATOS PERSONALES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm mb-2">
                  Nombre Completo
                </label>

                <input
                  {...register("fullName")}
                  className="w-full border rounded-lg px-4 py-3"
                />

                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-2">
                  Correo Electrónico
                </label>

                <input
                  {...register("email")}
                  className="w-full border rounded-lg px-4 py-3"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
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

              {/* Confirm Password */}
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

            {/* SOLO HOST */}
            {role === "host" && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                  Datos del Hospedaje
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">
                      Nombre del Hospedaje
                    </label>

                    <input
                      {...register("propertyName")}
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Ubicación
                    </label>

                    <input
                      {...register("location")}
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2">
                      Descripción
                    </label>

                    <textarea
                      rows={4}
                      {...register("description")}
                      className="w-full border rounded-lg px-4 py-3 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      WhatsApp
                    </label>

                    <input
                      {...register("whatsapp")}
                      className="w-full border rounded-lg px-4 py-3"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-cyan-50 border border-cyan-200 p-4">
                  <h4 className="font-semibold text-cyan-900">
                    Estado: Pendiente de aprobación
                  </h4>

                  <p className="text-sm text-cyan-800 mt-1">
                    Tu cuenta y hospedaje quedarán pendientes de aprobación.
                  </p>
                </div>
              </div>
            )}

            {/* FOOTER */}
            <div className="mt-8 pt-6 border-t flex flex-col md:flex-row gap-4 md:justify-between md:items-center">
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
                className="bg-blue-950 hover:bg-blue-900 text-white px-8 py-3 rounded-lg"
              >
                {role === "guest"
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