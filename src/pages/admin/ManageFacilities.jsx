import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient.js';

const empty = { name: '', description: '', category: '', price: '', image_url: '' };

export default function ManageFacilities() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');

  const load = async () => {
    const { data } = await supabase.from('facilities').select('*').order('created_at', { ascending: false });
    setList(data || []);
  };
  useEffect(() => { load(); }, []);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const add = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Name is required');
    const { error } = await supabase.from('facilities').insert({
      name: form.name.trim(),
      description: form.description,
      category: form.category || 'General',
      price: Number(form.price) || 0,
      image_url: form.image_url,
    });
    if (error) return setError('Could not add facility: ' + error.message);
    setForm(empty);
    setError('');
    load();
  };

  const remove = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    const { error } = await supabase.from('facilities').delete().eq('id', id);
    if (error) setError('Could not delete: ' + error.message);
    else load();
  };

  return (
    <>
      <h1>Manage Facilities</h1>

      <form className="form" onSubmit={add}>
        <h3>Add New Facility</h3>
        <input name="name" placeholder="Facility name *" value={form.name} onChange={change} />
        <input name="category" placeholder="Category (Lab, ICU, X-ray...)" value={form.category} onChange={change} />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={change} />
        <input name="image_url" placeholder="Image URL (optional)" value={form.image_url} onChange={change} />
        <textarea name="description" rows={3} placeholder="Description" value={form.description} onChange={change} />
        {error && <p className="error">{error}</p>}
        <button className="btn">Add Facility</button>
      </form>

      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>ID</th><th>Name</th><th>Category</th><th>Price</th><th>Action</th></tr>
          </thead>
          <tbody>
            {list.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.name}</td>
                <td>{f.category}</td>
                <td>₹{Number(f.price).toFixed(0)}</td>
                <td><button className="btn btn-danger" onClick={() => remove(f.id, f.name)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
