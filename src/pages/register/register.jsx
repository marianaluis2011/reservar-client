import { useState } from "react";
import { Bed, Building2, CheckCircle } from "lucide-react";
import { registerUser } from "../../services/auth.services.js";

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
  const [role, setRole] = useState("guest");
   const {
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
  } = useRegisterForm();


  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl border shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-slate-900">
            Crea tu cuenta
          </h1>

          <p className="text-slate-500 mt-2">
            Únete a la plataforma de gestión hotelera más moderna.
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700 mb-4">
            ¿Qué deseas hacer?
          </h2>

          {/* Selector de perfil */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setRole("guest")}
              className={`border rounded-xl p-4 text-left transition-all ${
                role === "guest"
                  ? "border-cyan-600 bg-cyan-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Bed className="w-5 h-5 mt-1" />

                  <div>
                    <h3 className="font-semibold">
                      Quiero reservar hospedajes
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Busca y gestiona tus estancias en segundos.
                    </p>
                  </div>
                </div>

                {role === "guest" && (
                  <CheckCircle className="text-cyan-600" />
                )}
              </div>
            </button>

            <button
              type="button"
              onClick={() => setRole("host")}
              className={`border rounded-xl p-4 text-left transition-all ${
                role === "host"
                  ? "border-cyan-600 bg-cyan-50"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Building2 className="w-5 h-5 mt-1" />

                  <div>
                    <h3 className="font-semibold">
                      Quiero publicar mi hospedaje
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Administra tus habitaciones y reservas
                      profesionalmente.
                    </p>
                  </div>
                </div>

                {role === "host" && (
                  <CheckCircle className="text-cyan-600" />
                )}
              </div>
            </button>
          </div>

          {/* Formulario */}
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm mb-2">
                  Nombre Completo
                </label>

                <input
                  type="text"
                  placeholder="Ej. Juan Pérez"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-2">
                  Correo Electrónico
                </label>

                <input
                  type="email"
                  placeholder="juan@ejemplo.com"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm mb-2">
                  Contraseña
                </label>

                <input
                  type="password"
                  placeholder="********"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm mb-2">
                  Confirmar Contraseña
                </label>

                <input
                  type="password"
                  placeholder="********"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Campos extra para anfitrión */}
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
                      type="text"
                      placeholder="Ej. Hotel Paraíso"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      Ubicación
                    </label>

                    <input
                      type="text"
                      placeholder="Ciudad, País"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2">
                      Descripción
                    </label>

                    <textarea
                      rows={4}
                      placeholder="Cuéntanos sobre tu hospedaje..."
                      className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-2">
                      WhatsApp
                    </label>

                    <input
                      type="text"
                      placeholder="+54 9 11 ..."
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-xl bg-cyan-50 border border-cyan-200 p-4">
                  <h4 className="font-semibold text-cyan-900">
                    Estado: Pendiente de aprobación
                  </h4>

                  <p className="text-sm text-cyan-800 mt-1">
                    Tu cuenta y hospedaje han sido creados. Se
                    encuentran pendientes de aprobación por el Super
                    Administrador.
                  </p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 pt-6 border-t flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between md:items-center">
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" />

                <span>
                  Acepto los{" "}
                  <a
                    href="#"
                    className="text-cyan-600 hover:underline"
                  >
                    Términos de Servicio
                  </a>
                </span>
              </label>

              <button
                type="submit"
                className="bg-blue-950 hover:bg-blue-900 text-white px-8 py-3 rounded-lg font-medium transition-colors"
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