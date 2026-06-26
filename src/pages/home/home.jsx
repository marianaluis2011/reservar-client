import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicAccommodations } from "../../services/accommodation.services.js";
import "./Home.css";



const pillars = [
  {
    icon: "🏨",
    title: "Gestión fácil",
    desc: "Panel de control intuitivo para gestionar tus propiedades sin complicaciones técnicas.",
  },
  {
    icon: "🔒",
    title: "Reservas seguras",
    desc: "Protocolos de encriptación de nivel bancario para proteger cada transacción y dato.",
  },
  {
    icon: "💬",
    title: "Soporte WhatsApp",
    desc: "Atención humana y personalizada a un clic de distancia para cualquier eventualidad.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [accommodations, setAccommodations] = useState([]);
  const [loadingAcc, setLoadingAcc] = useState(true);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const data = await getPublicAccommodations();
        setAccommodations(data);
      } catch (error) {
        console.error("Error al cargar hospedajes:", error);
      } finally {
        setLoadingAcc(false);
      }
    };
    fetchAccommodations();
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__overlay" />
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&q=80"
          alt="Hero"
          className="hero__bg"
        />
        <div className="hero__content">
          <h1 className="hero__title">Encuentra tu próximo hospedaje</h1>
          <p className="hero__subtitle">
            Experiencias de hospedaje únicas diseñadas para operadores
            independientes y viajeros exigentes.
          </p>

          <div className="search-bar">
            <div className="search-bar__field">
              <span className="search-bar__icon">📍</span>
              <input
                type="text"
                placeholder="¿A dónde vas?"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="search-bar__divider" />
            <div className="search-bar__field">
              <span className="search-bar__icon">📅</span>
              <input
                type="text"
                placeholder="Entrada - Salida"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
              />
            </div>
            <div className="search-bar__divider" />
            <div className="search-bar__field">
              <span className="search-bar__icon">👥</span>
              <input
                type="text"
                placeholder="¿Cuántos?"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
              />
            </div>
            <button className="btn btn--primary search-bar__btn">
              🔍 Buscar hospedaje
            </button>
          </div>
        </div>
      </section>


      <section className="results">
        <div className="container">
          <div className="results__layout">
            <aside className="filters">
              <div className="filters__header">
                <span className="filters__title">Filtros</span>
                <button className="filters__clear">Limpiar</button>
              </div>

              <div className="filter-group">
                <p className="filter-group__label">Rango de Precio</p>
                <div className="filter-group__range">
                  <span>$50</span>
                  <input type="range" min="50" max="1000" defaultValue="500" className="range-input" />
                  <span>$1000+</span>
                </div>
              </div>

              <div className="filter-group">
                <p className="filter-group__label">Tipo de Alojamiento</p>
                {["Villas Privadas", "Hoteles Boutique", "Cabinas Modernas"].map((t) => (
                  <label key={t} className="filter-group__check">
                    <input type="checkbox" /> {t}
                  </label>
                ))}
              </div>

              <div className="filter-group">
                <p className="filter-group__label">Comodidades</p>
                {["WiFi Alta Velocidad", "Piscina Infinita", "Pet Friendly"].map((t) => (
                  <label key={t} className="filter-group__check">
                    <input type="checkbox" /> {t}
                  </label>
                ))}
              </div>

              <div className="filter-group">
                <p className="filter-group__label">Calificación</p>
                <label className="filter-group__check">
                  <input type="radio" name="rating" /> ⭐⭐⭐⭐⭐
                </label>
                <label className="filter-group__check">
                  <input type="radio" name="rating" /> 4.0+
                </label>
              </div>
            </aside>


            <div className="results__main">
              <div className="results__top">
                <h2 className="results__count">Resultados encontrados ({accommodations.length})</h2>  
                <div className="results__sort">
                  <span>Ordenar por:</span>
                  <select>
                    <option>Más destacados</option>
                    <option>Precio: menor a mayor</option>
                    <option>Mejor calificación</option>
                  </select>
                </div>
              </div>

              <div className="cards-grid">
                {loadingAcc ? (
                  <p>Cargando hospedajes...</p>
                ) : accommodations.length === 0 ? (
                  <p>No hay hospedajes disponibles por el momento.</p>
                ) : (
                  accommodations.map((acc) => (
                    <div key={acc._id} className="property-card">
                      <div className="property-card__img-wrap">
                        <img src={acc.mainImage} alt={acc.name} className="property-card__img" />
                        <button className="property-card__fav">♡</button>
                      </div>
                      <div className="property-card__body">
                        <div className="property-card__top">
                          <div>
                            <h3 className="property-card__name">{acc.name}</h3>
                            <p className="property-card__location">📍 {acc.province?.name || "Sin ubicación"}</p>
                          </div>
                        </div>
                        <div className="property-card__footer">
                          <button
                            className="btn btn--primary"
                            onClick={() => navigate(`/propertyPage/${acc._id}`)}
                          >
                            Ver hospedaje
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="results__more">
                <button className="btn btn--outlined">Ver más propiedades</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pillars">
        <div className="container">
          <p className="pillars__eyebrow">NUESTROS PILARES</p>
          <h2 className="pillars__title">Hospitalidad Inteligente</h2>
          <div className="pillars__grid">
            {pillars.map((p) => (
              <div key={p.title} className="pillar-card">
                <div className="pillar-card__icon">{p.icon}</div>
                <h3 className="pillar-card__title">{p.title}</h3>
                <p className="pillar-card__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-section__inner">
          <h2 className="cta-section__title">¿Listo para ser el anfitrión perfecto?</h2>
          <p className="cta-section__sub">
            Únete a cientos de operadores que ya transformaron su gestión con ReservaHost.
          </p>
          <div className="cta-section__btns">
            <button className="btn btn--primary">Empezar Ahora</button>
            <button className="btn btn--ghost">Saber más</button>
          </div>
        </div>
      </section>
    </div>
  );
}
