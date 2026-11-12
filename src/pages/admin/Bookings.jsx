// import { useEffect, useState } from 'react';
// import { supabase } from '../../supabaseClient.js';

// export default function Bookings() {
//   const [list, setList] = useState([]);
//   const [error, setError] = useState('');

//   const load = async () => {
//     const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
//     if (error) setError(error.message);
//     else setList(data);
//   };
//   useEffect(() => { load(); }, []);

//   const updateStatus = async (id, status) => {
//     const { error } = await supabase.from('bookings').update({ status }).eq('id', id);
//     if (error) setError(error.message);
//     else load();
//   };

//   return (
//     <>
//       <h1>All Bookings</h1>
//       {error && <p className="error">{error}</p>}
//       <div className="table-wrap">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th><th>Facility</th><th>Name</th><th>Age</th><th>Gender</th>
//               <th>Phone</th><th>Email</th><th>Address</th><th>Date</th><th>Slot</th>
//               <th>Notes</th><th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {list.map((b) => (
//               <tr key={b.id}>
//                 <td>{b.id}</td>
//                 <td>{b.facility_name}</td>
//                 <td>{b.full_name}</td>
//                 <td>{b.age}</td>
//                 <td>{b.gender}</td>
//                 <td>{b.phone}</td>
//                 <td>{b.email}</td>
//                 <td>{b.address}</td>
//                 <td>{b.booking_date}</td>
//                 <td>{b.time_slot}</td>
//                 <td>{b.notes}</td>
//                 <td>
//                   <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)}>
//                     <option>pending</option>
//                     <option>confirmed</option>
//                     <option>cancelled</option>
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {list.length === 0 && <p>No bookings yet.</p>}
//       </div>
//     </>
//   );
// }



import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient.js';

export default function Bookings() {
  const [list, setList] = useState([]);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  // Load all bookings
  const load = async () => {
    setError('');

    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(error.message);
    } else {
      setList(data || []);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Update booking status
  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (error) {
      setError(error.message);
    } else {
      load();
    }
  };

  // Delete booking
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this booking?'
    );

    if (!confirmDelete) return;

    setDeletingId(id);
    setError('');

    const { data, error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id)
      .select('id');

    if (error) {
      setError(error.message);
    } else if (!data || data.length === 0) {
      setError('Booking could not be deleted. Check your Supabase DELETE policy.');
    } else {
      setList((prevList) =>
        prevList.filter((booking) => booking.id !== id)
      );
    }

    setDeletingId(null);
  };

  return (
    <>
      <h1>All Bookings</h1>

      {error && <p className="error">{error}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Facility</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Date</th>
              <th>Slot</th>
              <th>Notes</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.facility_name}</td>
                <td>{b.full_name}</td>
                <td>{b.age}</td>
                <td>{b.gender}</td>
                <td>{b.phone}</td>
                <td>{b.email}</td>
                <td>{b.address}</td>
                <td>{b.booking_date}</td>
                <td>{b.time_slot}</td>
                <td>{b.notes}</td>

                <td>
                  <select
                    value={b.status || 'pending'}
                    onChange={(e) =>
                      updateStatus(b.id, e.target.value)
                    }
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </td>

                <td>
                  <button
                    type="button"
                    className="dashboard-delete-btn"
                    onClick={() => handleDelete(b.id)}
                    disabled={deletingId === b.id}
                  >
                    {deletingId === b.id ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {list.length === 0 && <p>No bookings yet.</p>}
      </div>
    </>
  );
}
