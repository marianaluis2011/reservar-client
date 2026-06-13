import { 
  Bed, 
  Wind, 
  Wifi, 
  ShowerHead, 
  MapPin, 
  MessageCircle, 
  ChevronLeft,
  Star
} from "lucide-react";
import { useNavigate } from "react-router";

export default function PropertyPage() {
  const navigate = useNavigate();

  // Datos de ejemplo basados en tu estructura
  const property = {
    name: "Apartamento Moderno con Vista",
    location: "San Miguel de Tucumán, Tucumán",
    price: 45000,
    description: "Este hermoso apartamento ofrece una combinación perfecta de comodidad y estilo. Ubicado en el corazón de la ciudad, cuenta con amplios espacios iluminados, mobiliario moderno y todas las facilidades para que tu estancia sea placentera. Ideal tanto para viajeros de negocios como para parejas que buscan una escapada romántica.",
    whatsapp: "5493812345678",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000",
    ]
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Encabezado */}
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">Detalle del hospedaje</h1>
        </div>

        {/* Galería de Imágenes (Estilo asimétrico de la imagen) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 h-[300px] md:h-[450px]">
          <div className="md:col-span-2 overflow-hidden rounded-2xl">
            <img 
              src={property.images[0]} 
              alt="Principal" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <div className="flex-1 overflow-hidden rounded-2xl">
              <img 
                src={property.images[1]} 
                alt="Secundaria 1" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 overflow-hidden rounded-2xl">
              <img 
                src={property.images[2]} 
                alt="Secundaria 2" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Columna Izquierda: Información */}
          <div className="lg:col-span-2">
            {/* Lo que ofrece este lugar */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-6">Lo que ofrece este lugar</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6">
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="p-3 bg-slate-100 rounded-xl">
                    <Bed className="w-6 h-6 text-slate-600" />
                  </div>
                  <span className="text-lg">Cama doble</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="p-3 bg-slate-100 rounded-xl">
                    <Wind className="w-6 h-6 text-slate-600" />
                  </div>
                  <span className="text-lg">Aire acondicionado</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="p-3 bg-slate-100 rounded-xl">
                    <Wifi className="w-6 h-6 text-slate-600" />
                  </div>
                  <span className="text-lg">Wi-fi</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="p-3 bg-slate-100 rounded-xl">
                    <ShowerHead className="w-6 h-6 text-slate-600" />
                  </div>
                  <span className="text-lg">Baño privado</span>
                </div>
              </div>
            </section>

            {/* Descripción */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Descripción</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {property.description}
              </p>
            </section>

            {/* Mapa (Placeholder basado en el diseño) */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Encontranos aquí</h2>
              <div className="w-full h-64 bg-slate-200 rounded-2xl relative overflow-hidden flex items-center justify-center border">
                <MapPin className="w-8 h-8 text-slate-400 absolute" />
                <span className="text-slate-500 font-medium">Mapa interactivo</span>
              </div>
            </section>
          </div>

          {/* Columna Derecha: Tarjeta de Reserva */}
          <div className="relative">
            <div className="sticky top-8 border border-slate-200 rounded-3xl p-8 shadow-sm bg-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Precio por noche</p>
                  <span className="text-3xl font-black text-slate-900">${property.price.toLocaleString()}</span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold">4.8</span>
                  </div>
                  <span className="text-xs text-slate-400">15 reseñas</span>
                </div>
              </div>

              <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-cyan-100 mb-4 text-lg">
                Reservar ahora
              </button>

              <a 
                href={`https://wa.me/${property.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 border-2 border-green-500 text-green-600 font-bold py-4 rounded-2xl hover:bg-green-50 transition-all text-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Contactar al dueño
              </a>

              <div className="mt-8 flex items-start gap-3 text-slate-500 italic">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <p className="text-sm leading-snug">{property.location}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}