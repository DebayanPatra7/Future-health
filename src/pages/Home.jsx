import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.js';
import FacilityCard from '../components/FacilityCard.jsx';

export default function Home() {
  const [facilities, setFacilities] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase
      .from('facilities')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError('Could not load facilities: ' + error.message);
        else setFacilities(data);
        setLoading(false);
      });
  }, []);

  const categories = ['All', ...new Set(facilities.map((f) => f.category).filter(Boolean))];
  const filtered = facilities.filter(
    (f) =>
      (category === 'All' || f.category === category) &&
      f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <h1>Medical Facilities</h1>
      <div className="filters">
        <input placeholder="Search facility..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && filtered.length === 0 && <p>No facilities found.</p>}

      <div className="grid">
        {filtered.map((f) => <FacilityCard key={f.id} facility={f} />)}
      </div>
    </>
  );
}









