import { Bed, Building2, CheckCircle } from "lucide-react";
import { registerUser } from "../../services/auth.services.js";
import { useRegisterForm } from "./useRegister.js";
import { toast } from "sonner";
import "./register.css";
import React, { useState } from "react";
import TermsModal from "./../terms/termsModal.jsx";


const onSubmit = async (data) => {
  try {
    // eslint-disable-next-line no-unused-vars
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

  // 👉 Estado para manejar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
    <div className="container-header">
    {/* HEADER */}
    <div className="header-one">
      <h1 className="header-title">
        Crea tu cuenta
      </h1>

      <p className="header-subtitle">
              Únete a la plataforma de gestión hotelera más moderna.
      </p>
    </div>

    {/* BODY */}
    <div className="p-8">
      <form className="form-body" onSubmit={handleSubmit(onSubmit)}>

        <h2 className="text-sm font-semibold uppercase text-slate-700 mb-5">
          ¿Qué deseas hacer?
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-8">

              <button
  type="button"
  onClick={() => handleRoleChange("guest")}
  className={`relative border rounded-xl px-5 py-4 text-left transition-all ${
    role === "guest"
      ? "border-cyan-600 bg-cyan-50"
      : "border-slate-300 bg-white hover:border-slate-400"
  }`}
>
  {role === "guest" && (
    <CheckCircle className="circle-check" />
  )}

  <div className="section-one">
    <Bed className="icon-bed" />

    <div>
      <h3 className="font-semibold text-slate-800">
        Quiero reservar hospedajes
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        Busca y gestiona tus estancias.
      </p>
    </div>
  </div>
</button>
         <button
  type="button"
  onClick={() => handleRoleChange("host")}
  className={`relative border rounded-xl px-5 py-4 text-left transition-all ${
    role === "host"
      ? "border-cyan-600 bg-cyan-50"
      : "border-slate-300 bg-white hover:border-slate-400"
  }`}
>
  {role === "host" && (
    <CheckCircle className="circle-check" />
  )}

  <div className="section-two">
    <Building2 className="icon-build" />

    <div>
      <h3 className="font-semibold text-slate-800">
        Quiero publicar mi hospedaje
      </h3>

      <p className="text-sm text-slate-500 mt-1">
        Administra tus habitaciones y reservas.
      </p>
    </div>
  </div>
</button>
            </div>

            {/* DATOS PERSONALES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 mt-2">
                  Nombre Completo
                </label>

                <input
                  {...register("fullName")}
                  placeholder="Ej. Juan Pérez"
className="
  w-full
  border
  border-slate-300
  rounded-lg
  px-4
  py-3.5
  text-sm
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-500
"
                />

                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2 mt-2">
                  Correo Electrónico
                </label>

                <input
                  {...register("email")}
                  placeholder="juan@ejemplo.com"
className="
  w-full
  border
  border-slate-300
  rounded-lg
  px-4
  py-3.5
  text-sm
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-500
"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Contraseña
                </label>

                <input
                  type="password"
                  {...register("password")} placeholder="********"
className="
  w-full
  border
  border-slate-300
  rounded-lg
  px-4
  py-3.5
  text-sm
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-500
"                />

                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirmar Contraseña
                </label>

                <input
                  type="password"
                  {...register("confirmPassword")} placeholder="********"
className="
  w-full
  border
  border-slate-300
  rounded-lg
  px-4
  py-3.5
  text-sm
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-500
"                />

                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* HOST */}
{role === "host" && (
  <div className="mt-3 border-t pt-3">
<div className="mt-3 border-t pt-3">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                  Datos del Hospedaje
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nombre del Hospedaje
                    </label>

                    <input
                      {...register("name")}
                      placeholder="Ej. Hotel Paraíso"
className="
  w-full
  border
  border-slate-300
  rounded-lg
  px-4
  py-3.5
  text-sm
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-500
"                    />

                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Ubicación
                    </label>

                    <input
                      {...register("province")}
                      placeholder="Ciudad, País"
className="
  w-full
  border
  border-slate-300
  rounded-lg
  px-4
  py-3.5
  text-sm
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-500
"                    />

                    {errors.province && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.province.message}
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Descripción
                    </label>

                    <textarea
                      rows={1}
                      {...register("description")}
                      placeholder="Cuéntanos sobre tu hospedaje..."
className="
  w-full
  border
  border-slate-300
  rounded-lg
  px-4
  py-3.5
  text-sm
  resize-none
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-500
"                      
                    />

                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      WhatsApp
                    </label>

                    <input
                      {...register("whatsapp")}
                      placeholder="+54 9 11 ..."
className="
  w-full
  border
  border-slate-300
  rounded-lg
  px-4
  py-3.5
  text-sm
  focus:outline-none
  focus:ring-2
  focus:ring-cyan-500
"                />

                    {errors.whatsapp && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.whatsapp.message}
                      </p>
                    )}
                  </div>
                </div>

<div className="mt-4 rounded-xl bg-cyan-50 border border-cyan-200 p-3">
                  <div className="section-state">
                    <CheckCircle className="w-5 h-5 text-[rgb(27,85,52)] mt-0.5" />

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
              </div>
            )}
            

<div className="mt-8 pt-5 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-6">
               <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={() => setIsModalOpen(true)}
                  />
                  <span>Términos y Servicios</span>
              </label>
                {/* Render del modal */}
    <TermsModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onAccept={() => {
        setTermsAccepted(true);
        setIsModalOpen(false);
      }}
    />
              <button
  type="submit"
  disabled={isSubmitting}
  className="btn-lodging"
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