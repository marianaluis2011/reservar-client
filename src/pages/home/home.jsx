import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicAccommodations } from "../../services/accommodation.services.js";
import { getProvinces } from "../../services/province.services.js";
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
  const [accommodations, setAccommodations] = useState([]);
  const [loadingAcc, setLoadingAcc] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [accData, provData] = await Promise.all([
          getPublicAccommodations(),
          getProvinces(),
        ]);
        setAccommodations(accData);
        setProvinces(provData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoadingAcc(false);
      }
    };
    fetchData();
  }, []);

  const filteredAccommodations = accommodations.filter(
    (acc) => !selectedProvince || acc.province?.name === selectedProvince
  );

  const totalPages = Math.ceil(filteredAccommodations.length / perPage) || 1;
  const paginatedAccommodations = filteredAccommodations.slice(
    (page - 1) * perPage,
    page * perPage
  );

  useEffect(() => {
    setPage(1);
  }, [selectedProvince]);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero__overlay" />
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1400&q=80"
          alt="Hospedaje destacado"
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
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
              >
                <option value="">Todas las provincias</option>
                {provinces.map((p) => (
                  <option key={p._id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn--primary search-bar__btn" onClick={() => document.querySelector(".results")?.scrollIntoView({ behavior: "smooth" })}>
              🔍 Buscar hospedaje
            </button>
          </div>
        </div>
      </section>


      <section className="results">
        <div className="container">
          <div className="results__layout">
            <div className="results__main">
              <div className="results__top">
                <h2 className="results__count">Resultados encontrados ({filteredAccommodations.length})</h2>
              </div>

              <div className="cards-grid">
                {loadingAcc ? (
                  <p>Cargando hospedajes...</p>
                ) : filteredAccommodations.length === 0 ? (
                  <p>No se encontraron hospedajes para tu búsqueda.</p>
                ) : (
                  paginatedAccommodations.map((acc) => (
                    <div key={acc._id} className="property-card">
                      <div className="property-card__img-wrap">
                        <img src={acc.mainImage} alt={acc.name} className="property-card__img" />
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

              {!loadingAcc && totalPages > 1 && (
                <div className="pagination">
                  <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Anterior
                  </button>
                  <div className="pages">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        className={page === p ? "page-btn active" : "page-btn"}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    Siguiente
                  </button>
                </div>
              )}

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
            Únete a cientos de operadores que ya transformaron su gestión con Hospedar.
          </p>
          <div className="cta-section__btns">
            <button className="btn btn--primary" onClick={() => navigate("/register")}>Empezar Ahora</button>
            <button className="btn btn--ghost" onClick={() => navigate("/about")}>Saber más</button>
          </div>
        </div>
      </section>
    </div>
  );
}
