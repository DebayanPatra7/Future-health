import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';

export default function FacilityDetails() {
  const { id } = useParams();
  const [f, setF] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.from('facilities').select('*').eq('id', id).single().then(({ data, error }) => {
      if (error) setError('Facility not found');
      else setF(data);
    });
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!f) return <p>Loading...</p>;

  return (
    <div className="details">
      {f.image_url && <img src={f.image_url} alt={f.name} />}
      <span className="tag">{f.category}</span>
      <h1>{f.name}</h1>
      <p>{f.description}</p>
        {/* Automatically display 0 if price is empty or NULL */}
      <h3>₹{Number(f.price || 0).toFixed(0)}</h3>
      {/* <h3>₹{Number(f.price).toFixed(0)}</h3> */}
      {f.is_available ? (
        <Link className="btn" to={`/book/${f.id}`}>Book Now</Link>
      ) : (
        <p className="error">Currently not available</p>
      )}
    </div>
  );
}
