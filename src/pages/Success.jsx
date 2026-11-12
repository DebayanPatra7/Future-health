import { Link } from 'react-router-dom';

export default function Success() {
  return (
    <div className="center">
      <h1>Booking Submitted</h1>
      <p>Your details have been saved. We will contact you soon.</p>
      <Link className="btn" to="/">Back to Facilities</Link>
    </div>
  );
}
