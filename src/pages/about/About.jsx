import "./About.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGem, FaCogs, FaLightbulb, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const team = [
  {
    name: "Santiago Brizuela",
    role: "Scrum Master / Developer Junior",
    img: "santiago.jpg",
    bio: "Scrum Master del equipo y desarrollador junior. Coordiné el flujo de trabajo y participé en el desarrollo de la plataforma.",
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
    bio: "Desarrollador junior, parte del equipo de desarrollo de la plataforma.",
  },
];

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      {/* High Values Section */}
      <section className="high-values">
        <div className="hv-container">
          <span className="line"></span>
        </div>
        <div className="hv-text-block">
            <h1 className="high">HIGH</h1>
            <h3 className="values">VALUES</h3>
            <p className="hv-detail">
              Nos comprometemos con la calidad, la innovación y la integridad en cada proyecto.
            </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-row">
          <div className="value"><FaGem className="icon" /><span>Integridad</span></div>
          <div className="value"><FaCogs className="icon" /><span>Calidad</span></div>
          <div className="value"><FaLightbulb className="icon" /><span>Innovación</span></div>
          <div className="value"><FaUsers className="icon" /><span>Trabajo en equipo</span></div>
        </div>
      </section>

      {/* Team Section */}
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
    </div>
  );
}
