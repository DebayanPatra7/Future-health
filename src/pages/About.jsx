
import { Link } from 'react-router-dom';
import './About.css';

export default function About() {
  return (
    <div className="about-page">

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-tag">ABOUT FUTURE HEALTH</span>
          <h1>Committed to Your Health and Well-being</h1>
          <p>
            We are dedicated to making healthcare accessible, reliable,
            and convenient for everyone through quality medical services.
          </p>
          <Link to="/front" className="about-home-btn">
            Back to Home
          </Link>
        </div>

        <div className="about-hero-image">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900"
            alt="Healthcare professionals"
          />
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="about-who">
        <div className="about-who-image">
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=900"
            alt="Medical professional helping a patient"
          />
        </div>

        <div className="about-who-content">
          <span className="about-tag">WHO WE ARE</span>
          <h2>Your Health, Our Responsibility</h2>
          <p>
            Future Health is a healthcare facility management platform
            designed to make it easier for people to discover healthcare
            facilities and access important service information.
          </p>
          <p>
            Our goal is to simplify the healthcare experience by providing
            a convenient platform where users can explore facilities and
            manage their appointments.
          </p>
        </div>
      </section>

      {/* MISSION AND VISION */}
      <section className="about-mission">
        <div className="about-section-heading">
          <span className="about-tag">OUR PURPOSE</span>
          <h2>Our Mission and Vision</h2>
          <p>
            Building a better and more accessible healthcare experience.
          </p>
        </div>

        <div className="about-purpose-grid">
          <div className="about-purpose-card">
            <div className="about-purpose-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>
              To make healthcare information and facility access simple,
              convenient, and reliable for everyone.
            </p>
          </div>

          <div className="about-purpose-card">
            <div className="about-purpose-icon">🌍</div>
            <h3>Our Vision</h3>
            <p>
              To create a connected healthcare environment where people
              can easily find the services they need.
            </p>
          </div>

          <div className="about-purpose-card">
            <div className="about-purpose-icon">💙</div>
            <h3>Our Values</h3>
            <p>
              We value trust, transparency, convenience, and a
              patient-focused approach to healthcare.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="about-choose">
        <div className="about-section-heading">
          <span className="about-tag">WHY FUTURE HEALTH</span>
          <h2>Why Choose Us?</h2>
        </div>

        <div className="about-choose-grid">
          <div className="about-choose-item">
            <span>✓</span>
            <div>
              <h3>Easy Facility Access</h3>
              <p>Explore healthcare facilities conveniently.</p>
            </div>
          </div>

          <div className="about-choose-item">
            <span>✓</span>
            <div>
              <h3>Simple Booking</h3>
              <p>Make appointment management easier.</p>
            </div>
          </div>

          <div className="about-choose-item">
            <span>✓</span>
            <div>
              <h3>User-Friendly Platform</h3>
              <p>Navigate healthcare information with ease.</p>
            </div>
          </div>

          <div className="about-choose-item">
            <span>✓</span>
            <div>
              <h3>Reliable Information</h3>
              <p>Find useful information about available facilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="about-cta">
        <h2>Your Health Journey Starts Here</h2>
        <p>
          Explore our healthcare facilities and take the next step
          towards convenient healthcare access.
        </p>
        <Link to="/" className="about-cta-btn">
          Explore Facilities
        </Link>
      </section>

    </div>
  );
}
