import "./About.css";
import {
  FaGem, FaCogs, FaLightbulb, FaUsers,
  FaFacebookF, FaTwitter, FaLinkedinIn,
  FaShieldAlt, FaChartLine, FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const team = [
  {
    name: "Santiago Brizuela",
    role: "Scrum Master / Developer Junior",
    img: "santiago.jpg",
    bio: "Scrum Master del equipo y desarrollador junior. Coordinó el flujo de trabajo y participó en el desarrollo de la plataforma.",
  },
  {
    name: "Mariana Luis",
    role: "Directora Técnica / Developer Junior",
    img: "mariana.jpg",
    bio: "Directora técnica: creó los repositorios del proyecto y trabajó como desarrolladora junior.",
  },
  {
    name: "Sebastián Varela",
    role: "Developer Junior",
    img: "sebastian.jpg",
    bio: "Developer junior con un gran aporte al equipo. Su trabajo y dedicación fueron clave para el desarrollo del producto.",
  },
];

const valores = [
  { icon: FaGem, title: "Integridad", desc: "Actuamos con transparencia y honestidad en cada compromiso que asumimos." },
  { icon: FaCogs, title: "Calidad", desc: "Buscamos la mejor solución técnica y estética en cada hospedaje que ofrecemos." },
  { icon: FaLightbulb, title: "Innovación", desc: "Desafiamos lo convencional para mejorar la experiencia de reservar y hospedar." },
  { icon: FaUsers, title: "Trabajo en equipo", desc: "Nuestra fuerza está en la diversidad de ideas y la colaboración del equipo." },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <button className="about-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Volver
        </button>
        <div className="about-hero__inner">
          <div className="about-hero__text">
            <span className="about-badge">NUESTRA HISTORIA</span>
            <h1 className="about-hero__title">Transformando la gestión de hospedajes</h1>
            <p className="about-hero__desc">
              En Hospedar redefinimos la experiencia de hospitalidad digital.
              Nuestra misión es darles a los anfitriones herramientas modernas y
              ofrecer a los viajeros una estancia simple, segura y sofisticada.
            </p>
            <div className="about-hero__btns">
              <button
                className="about-btn about-btn--primary"
                onClick={() => document.querySelector(".about-values")?.scrollIntoView({ behavior: "smooth" })}
              >
                Conocé más
              </button>
              <button className="about-btn about-btn--outline" onClick={() => navigate("/help")}>
                Ir a Ayuda
              </button>
            </div>
          </div>
          <div className="about-hero__media">
            <img
              src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80"
              alt="Hospedaje de calidad"
            />
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="about-values">
        <div className="about-values__header">
          <h2>Nuestros Valores Fundamentales</h2>
          <div className="about-values__line" />
          <p>
            Guiamos cada proyecto con excelencia y compromiso, para que cada
            interacción refleje nuestra identidad.
          </p>
        </div>
        <div className="about-values__grid">
          {valores.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="value-card">
              <div className="value-card__icon"><Icon /></div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EQUIPO (cards que ya teníamos) */}
      <section className="team-section">
        <h2>NUESTRO EQUIPO</h2>
        {team.map((member, index) => (
          <div className={`team-card ${index % 2 === 0 ? "left" : "right"}`} key={index}>
            <div className="team-img">
              <img src={member.img} alt={member.name} />
            </div>
            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <p className="team-bio">{member.bio}</p>
              <div className="social-icons">
                <FaFacebookF onClick={() => navigate("/404")} />
                <FaTwitter onClick={() => navigate("/404")} />
                <FaLinkedinIn onClick={() => navigate("/404")} />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* VISIÓN / SEGURIDAD */}
      <section className="about-bento">
        <div className="about-bento__grid">
          <div className="bento-vision">
            <div>
              <h2>Nuestra visión</h2>
              <p>
                Convertirnos en una plataforma de referencia para reservar
                hospedajes en todo el país, simple y segura tanto para viajeros
                como para anfitriones.
              </p>
            </div>
            <div className="bento-vision__foot">
              <span className="bento-vision__circle"><FaChartLine /></span>
              <span>Crecimiento constante junto a nuestros hospedajes</span>
            </div>
          </div>
          <div className="bento-security">
            <FaShieldAlt className="bento-security__icon" />
            <h3>Seguridad</h3>
            <p>Cuentas verificadas y datos protegidos para huéspedes y anfitriones.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
