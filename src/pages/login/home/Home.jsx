import { useState } from "react";
import "./Home.css";

const featuredProperties = [
  {
    id: 1,
    name: "Lumina Suites",
    location: "Tulum, México",
    price: "$245",
    rating: 4.8,
    badge: "Superhost",
    img: "https://images.unsplash.com/photo-1506059612708-99d6128a857a?w=400&q=80",
  },
  {
    id: 2,
    name: "Villa Azure Estate",
    location: "Amalfi Coast, Italy",
    price: "$410",
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80",
  },
  {
    id: 3,
    name: "Mountain Peak Lodge",
    location: "Aspen, USA",
    price: "$380",
    rating: 5.0,
    img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80",
  },
];

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
  const [location, setLocation] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <div className="home">
      {/* HERO */}
      <section className="hero">
        <div className="hero__overlay" />
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&q=80"
          alt="Hero"
          className="hero__bg"
        />
        <div className="hero__content">
          <h1 className="hero__title">Encuentra tu próximo refugio</h1>
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
              🔍 Buscar Hospedaje
            </button>
          </div>
        </div>
      </section>

      
      <section className="results">
        <div className="container">
          <div className="results__layout">
            {/* Filters */}
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

            {/* Cards */}
            <div className="results__main">
              <div className="results__top">
                <h2 className="results__count">Resultados encontrados (24)</h2>
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
                {featuredProperties.map((prop) => (
                  <div key={prop.id} className="property-card">
                    <div className="property-card__img-wrap">
                      <img src={prop.img} alt={prop.name} className="property-card__img" />
                      {prop.badge && (
                        <span className="property-card__badge">{prop.badge}</span>
                      )}
                      <button className="property-card__fav">♡</button>
                    </div>
                    <div className="property-card__body">
                      <div className="property-card__top">
                        <div>
                          <h3 className="property-card__name">{prop.name}</h3>
                          <p className="property-card__location">📍 {prop.location}</p>
                        </div>
                        <span className="property-card__rating">⭐ {prop.rating}</span>
                      </div>
                      <div className="property-card__footer">
                        <div>
                          <p className="property-card__price-label">Precio por noche</p>
                          <p className="property-card__price">{prop.price} USD</p>
                        </div>
                        <button className="btn btn--primary">Reservar</button>
                      </div>
                    </div>
                  </div>
                ))}
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
