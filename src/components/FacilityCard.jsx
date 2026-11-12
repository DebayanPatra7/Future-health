import { Link } from 'react-router-dom';

export default function FacilityCard({ facility }) {
  return (
    <div className="card">
      {facility.image_url ? (
        <img src={facility.image_url} alt={facility.name} />
      ) : (
        <div className="img-placeholder">+</div>
      )}
      <div className="card-body">
        <span className="tag">{facility.category}</span>
        <h3>{facility.name}</h3>
        <p className="muted">{facility.description?.slice(0, 90)}</p>
        <div className="row">
          {/* <strong>₹{Number(facility.price).toFixed(0)}</strong> */}
          <Link className="btn" to={`/facility/${facility.id}`}>View</Link>
        </div>
      </div>
    </div>
  );
}
