import { Bed, Building2, ChevronRight } from "lucide-react"; 
import { useNavigate } from "react-router";
// const useNavigate = useNavigate();
export default function ProfileSelectionModal() {


  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Header móvil */}
<div className="lg:hidden bg-gradient-to-r from-slate-700 via-slate-800 to-blue-950 text-white py-6 px-4 text-center">
  <h1 className="text-3xl font-bold">ReservaHost</h1>
</div>

{/* Panel izquierdo desktop */}
<div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-700 via-slate-800 to-blue-950 text-white p-12 items-end">
  <div className="max-w-md">
    <h1 className="text-5xl font-bold mb-6">ReservaHost</h1>

    <p className="text-lg leading-relaxed text-slate-200">
      La plataforma inteligente para operadores de hospedaje
      independientes que buscan eficiencia corporativa con calidez
      boutique.
    </p>
  </div>
</div>

      {/* Panel derecho */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 px-6 py-10">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-slate-800">
            ¿Qué deseas hacer?
          </h2>

          <p className="text-center text-slate-500 mt-2 mb-8">
            Selecciona tu perfil para continuar
          </p>

          <div className="space-y-4">
            {/* Opción huésped */}
<button
  type="button"
  onClick={() => navigate("/register")}
  className="w-full bg-white border rounded-2xl p-5 flex items-center justify-between hover:shadow-md transition-all duration-200"
>
  <div className="flex items-center gap-4">
    <div className="h-12 w-12 rounded-full bg-cyan-100 flex items-center justify-center">
      <Bed className="w-6 h-6 text-cyan-600" />
    </div>

    <div className="text-left">
      <h3 className="font-semibold text-slate-800">
        Quiero reservar hospedajes
      </h3>

      <p className="text-sm text-slate-500">
        Busca y gestiona tus estancias
      </p>
    </div>
  </div>

  <ChevronRight className="text-slate-400" />
</button>

            {/* Opción anfitrión */}
            <button
              className="w-full bg-white border rounded-2xl p-5 flex items-center justify-between
              hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-700" />
                </div>

                <div className="text-left">
                  <h3 className="font-semibold text-slate-800">
                    Quiero publicar mi hospedaje
                  </h3>

                  <p className="text-sm text-slate-500">
                    Gestiona tus propiedades y reservas
                  </p>
                </div>
              </div>

              <ChevronRight className="text-slate-400" />
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 mt-8">
            ¿Aún no tienes cuenta?{" "}
            <a
              href="/register"
              className="font-semibold text-cyan-600 hover:text-cyan-700"
            >
              Regístrate ahora
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}