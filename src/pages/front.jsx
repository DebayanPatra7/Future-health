
import { Link } from 'react-router-dom';
import './Front.css';

export default function Front() {
  const services = [
    {
      icon: '🩺',
      title: 'Doctor Consultation',
      description: 'Find healthcare facilities for your medical needs.'
    },
    {
      icon: '🏥',
      title: 'Medical Facilities',
      description: 'Explore hospitals, clinics and healthcare centers.'
    },
    {
      icon: '📅',
      title: 'Easy Appointment',
      description: 'Book your medical appointments conveniently.'
    },
    {
      icon: '❤️',
      title: 'Patient Care',
      description: 'Get a simple and patient-friendly healthcare experience.'
    }
  ];

  return (
    <div className="front-page">


      {/* Hero Section */}
      <section className="front-hero">
        <div className="front-hero-content">
          <span className="front-tagline">
            YOUR HEALTH, OUR PRIORITY
          </span>

          <h1>
            Better Healthcare,
            <br />
            <span>Better Tomorrow.</span>
          </h1>

          <p>
            Welcome to Future Health. Discover medical facilities,
            manage appointments and access healthcare services
            through one convenient platform.
          </p>

          <div className="front-hero-buttons">
            <Link to="/" className="front-primary-btn">
              Explore Facilities →
            </Link>

            <a href="#front-services" className="front-secondary-btn">
              Our Services
            </a>
          </div>

          <div className="front-trust">
            <span>✓ Easy Access</span>
            <span>✓ Simple Booking</span>
            <span>✓ Patient Focused</span>
          </div>
        </div>

        <div className="front-hero-visual">
          <div className="front-circle">
            <div className="front-medical-icon">🏥</div>
            <div className="front-plus">✚</div>
          </div>

          <div className="front-floating-card front-card-one">
            ❤️ Quality Patient Care
          </div>

          <div className="front-floating-card front-card-two">
            📅 Easy Appointment
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="front-highlights">
        <div>
          <h2>01</h2>
          <p>Easy Appointment Management</p>
        </div>

        <div>
          <h2>02</h2>
          <p>Accessible Medical Facilities</p>
        </div>

        <div>
          <h2>03</h2>
          <p>Convenient Healthcare Services</p>
        </div>
      </section>

      {/* Services */}
      <section className="front-services" id="front-services">
        <div className="front-section-heading">
          <span>WHAT WE OFFER</span>
          <h2>Our Healthcare Services</h2>
          <p>
            Making healthcare access easier with convenient
            services designed around patients.
          </p>
        </div>

        <div className="front-services-grid">
          {services.map((service, index) => (
            <div className="front-service-card" key={index}>
              <div className="front-service-icon">
                {service.icon}
              </div>

              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <Link to="/">Explore More →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="front-about" id="front-about">
        <div className="front-about-visual">
          <span>🏥</span>
          <div>✚</div>
        </div>

        <div className="front-about-content">
          <span>ABOUT FUTURE HEALTH</span>

          <h2>Making Healthcare Simple and Accessible</h2>

          <p>
            Future Health is a healthcare management platform
            designed to help patients explore medical facilities
            and manage their appointments easily.
          </p>

          <ul>
            <li>✓ User-friendly healthcare platform</li>
            <li>✓ Easy access to medical facilities</li>
            <li>✓ Convenient appointment management</li>
          </ul>

          <Link to="/" className="front-about-btn">
            Get Started →
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="front-cta">
        <div>
          <span>START YOUR HEALTHCARE JOURNEY</span>
          <h2>Your Health Matters. We Care.</h2>
          <p>Explore our available medical facilities today.</p>
        </div>

        <Link to="/" className="front-cta-btn">
          View Facilities →
        </Link>
      </section>

      {/* Footer */}
      <footer className="front-footer" id="front-contact">
        <div className="front-footer-content">
          <div>
            <h2>✚ Future Health</h2>
            <p>
              Making healthcare access simpler and more convenient
              for everyone.
            </p>
          </div>

          <div>
            <h3>Quick Links</h3>
            <Link to="/front">Home</Link>
            <a href="/FacilityDetails">Facilities</a>
            <Link to="/About">About Us</Link>
            <Link to="/Contact">Contact</Link>
          </div>

          <div>
            <h3>Contact Us</h3>
            <p>Name:Santi Saha | Saikat Saha</p>
            <p>Ph: 9830631750 | 9163012481</p>
            <p>Email: saikatsaha28032003@gmail.com</p>
            <p>Address: 56, Vivekananda Park Haridevpur, Kolkata-700082, West Bengal, India</p>
          </div>
        </div>

        <div className="front-footer-bottom">
           {new Date().getFullYear()} Future Health.
        </div>
      </footer>

    </div>
  );
}
