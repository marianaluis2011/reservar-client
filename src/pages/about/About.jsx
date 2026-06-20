import "./about.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGem, FaCogs, FaLightbulb, FaUsers } from "react-icons/fa";

const team = [
  { name: "Phil Shackleton", role: "Creative Director", img: "caricatura1.png" },
  { name: "Mike Danford", role: "Technical Director", img: "caricatura2.png" },
  { name: "Aaron Thomas", role: "Developer", img: "caricatura3.png" },
  { name: "Aaron Hobbs", role: "Designer", img: "caricatura4.png" },
  { name: "Jim Masdlaw", role: "Marketing Specialist", img: "caricatura5.png" },
];

export default function About() {
  return (
    <div className="about-page">
      {/* High Values Section */}
      <section className="high-values">
        <h2>HIGH VALUES</h2>
        <p>
          Nos comprometemos con la calidad, la innovación y la integridad en cada proyecto.
        </p>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-row">
          <div className="value">
            <FaGem className="icon" />
            <span>Integridad</span>
          </div>
          <div className="value">
            <FaCogs className="icon" />
            <span>Calidad</span>
          </div>
          <div className="value">
            <FaLightbulb className="icon" />
            <span>Innovación</span>
          </div>
          <div className="value">
            <FaUsers className="icon" />
            <span>Trabajo en equipo</span>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>MEET THE TEAM</h2>
        {team.map((member, index) => (
          <div
            className={`team-card ${index % 2 === 0 ? "left" : "right"}`}
            key={index}
          >
            <div className="team-img">
              <img src={member.img} alt={member.name} />
            </div>
            <div className="team-info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
              <div className="social-icons">
                <FaFacebookF />
                <FaTwitter />
                <FaLinkedinIn />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
