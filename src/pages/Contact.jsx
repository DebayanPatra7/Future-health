
import { Link } from 'react-router-dom';
import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-page">

      <section className="contact-hero">
        <span>WE ARE HERE TO HELP</span>
        <h1>Contact Us</h1>
        <p>
          Have questions or feedback? Get in touch with us.
          Our team will be happy to assist you.
        </p>

        <div className="contact-breadcrumb">
          <Link to="/front">Home</Link>
          <span>/</span>
          <span>Contact Us</span>
        </div>
      </section>

      <section className="contact-main">

        <div className="contact-info">
          <span className="contact-label">GET IN TOUCH</span>
          <h2>We Would Love to Hear From You</h2>

          <p className="contact-description">
            Whether you have a question about our healthcare
            facilities, appointments, or services, our team
            is ready to assist you.
          </p>

          <div className="contact-info-card">
            <div className="contact-icon">📍</div>
            <div>
              <h3>Our Location</h3>
              <p>56,Vivekananda Park Haridevpur,Kolkata-700082,West Bengal, India</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">📞</div>
            <div>
              <h3>Phone Number</h3>
              <p>9830631750 | 9163012481</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">✉️</div>
            <div>
              <h3>Email Address</h3>
              <p>saikatsaha28032003@gmail.com</p>
            </div>
          </div>

          <div className="contact-info-card">
            <div className="contact-icon">⏰</div>
            <div>
              <h3>Working Hours</h3>
              <p>Monday - Saturday</p>
              <p>9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

      </section>

      <section className="contact-bottom">
        <h2>Need Healthcare Assistance?</h2>
        <p>
          Explore our healthcare facilities and find the
          information you need.
        </p>

        <Link to="/" className="contact-explore-btn">
          Explore Facilities
        </Link>
      </section>

    </div>
  );
}
