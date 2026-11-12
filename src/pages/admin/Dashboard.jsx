// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { supabase } from '../../supabaseClient.js';

// export default function Dashboard() {
//   const [stats, setStats] = useState({
//     facilities: 0,
//     bookings: 0,
//     pending: 0,
//   });

//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   // Fetch dashboard statistics and bookings
//   const fetchDashboard = async () => {
//     setLoading(true);

//     try {
//       const [f, b, p, bookingResult] = await Promise.all([
//         supabase
//           .from('facilities')
//           .select('*', { count: 'exact', head: true }),

//         supabase
//           .from('bookings')
//           .select('*', { count: 'exact', head: true }),

//         supabase
//           .from('bookings')
//           .select('*', { count: 'exact', head: true })
//           .eq('status', 'pending'),

//         supabase
//           .from('bookings')
//           .select('*')
//           .order('booking_date', { ascending: false }),
//       ]);

//       if (f.error) throw f.error;
//       if (b.error) throw b.error;
//       if (p.error) throw p.error;
//       if (bookingResult.error) throw bookingResult.error;

//       setStats({
//         facilities: f.count || 0,
//         bookings: b.count || 0,
//         pending: p.count || 0,
//       });

//       setBookings(bookingResult.data || []);

//     } catch (error) {
//       console.error('Dashboard loading error:', error.message);
//       alert('Unable to load dashboard: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   // Delete booking from Supabase
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm(
//       'Are you sure you want to delete this patient booking and its details?'
//     );

//     if (!confirmDelete) return;

//     setDeletingId(id);

//     try {
//       const { data, error } = await supabase
//         .from('bookings')
//         .delete()
//         .eq('id', id)
//         .select('id');

//       if (error) {
//         throw error;
//       }

//       // Check whether a row was actually deleted
//       if (!data || data.length === 0) {
//         throw new Error(
//           'Booking was not deleted. Check your Supabase DELETE permissions.'
//         );
//       }

//       alert('Patient booking deleted successfully!');

//       // Refresh bookings and all dashboard statistics
//       await fetchDashboard();

//     } catch (error) {
//       console.error('Delete booking error:', error.message);
//       alert('Failed to delete booking: ' + error.message);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   return (
//     <div className="dashboard-container">

//       <h1>Admin Dashboard</h1>

//       {/* Dashboard Statistics */}
//       <div className="grid stats">

//         <div className="stat">
//           <h2>{stats.facilities}</h2>
//           <p>Facilities</p>
//         </div>

//         <div className="stat">
//           <h2>{stats.bookings}</h2>
//           <p>Total Bookings</p>
//         </div>

//         <div className="stat">
//           <h2>{stats.pending}</h2>
//           <p>Pending</p>
//         </div>

//       </div>

//       {/* Navigation */}
//       <div className="dashboard-links">

//         <Link className="btn" to="/admin/facilities">
//           Manage Facilities
//         </Link>

//         <Link className="btn" to="/admin/bookings">
//           View Bookings
//         </Link>

//         <button
//           className="dashboard-refresh"
//           onClick={fetchDashboard}
//           disabled={loading}
//         >
//           {loading ? 'Refreshing...' : 'Refresh'}
//         </button>

//       </div>

//       {/* Patient Booking Management */}
//       <div className="dashboard-booking-section">

//         <div className="dashboard-booking-header">
//           <h2>Manage Patient Bookings</h2>
//           <span>Total: {bookings.length}</span>
//         </div>

//         {loading ? (
//           <p className="dashboard-message">
//             Loading bookings...
//           </p>
//         ) : bookings.length === 0 ? (
//           <p className="dashboard-message">
//             No bookings available.
//           </p>
//         ) : (

//           <div className="dashboard-table-wrapper">

//             <table className="dashboard-booking-table">

//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Patient Name</th>
//                   <th>Age</th>
//                   <th>Gender</th>
//                   <th>Phone</th>
//                   <th>Email</th>
//                   <th>Facility</th>
//                   <th>Booking Date</th>
//                   <th>Time Slot</th>
//                   <th>Address</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {bookings.map((booking) => (

//                   <tr key={booking.id}>

//                     <td>{booking.id}</td>
//                     <td>{booking.full_name}</td>
//                     <td>{booking.age}</td>
//                     <td>{booking.gender}</td>
//                     <td>{booking.phone}</td>
//                     <td>{booking.email}</td>
//                     <td>{booking.facility_name}</td>
//                     <td>{booking.booking_date}</td>
//                     <td>{booking.time_slot || 'N/A'}</td>
//                     <td>{booking.address}</td>

//                     <td>
//                       <button
//                         type="button"
//                         className="dashboard-delete-btn"
//                         onClick={() => handleDelete(booking.id)}
//                         disabled={deletingId === booking.id}
//                       >
//                         {deletingId === booking.id
//                           ? 'Deleting...'
//                           : 'Delete'}
//                       </button>
//                     </td>

//                   </tr>

//                 ))}
//               </tbody>

//             </table>

//           </div>
//         )}

//       </div>

//     </div>
//   );
// }




import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../supabaseClient.js';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalFacilities: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    setLoading(true);
    setError('');

    try {
      const [
        totalResult,
        pendingResult,
        confirmedResult,
        cancelledResult,
        facilitiesResult
      ] = await Promise.all([
        supabase.from('bookings')
          .select('*', { count: 'exact', head: true }),

        supabase.from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending'),

        supabase.from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'confirmed'),

        supabase.from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'cancelled'),

        supabase.from('facilities')
          .select('*', { count: 'exact', head: true })
      ]);

      const results = [
        totalResult,
        pendingResult,
        confirmedResult,
        cancelledResult,
        facilitiesResult
      ];

      const failedResult = results.find(result => result.error);

      if (failedResult) {
        throw failedResult.error;
      }

      setStats({
        totalBookings: totalResult.count || 0,
        pendingBookings: pendingResult.count || 0,
        confirmedBookings: confirmedResult.count || 0,
        cancelledBookings: cancelledResult.count || 0,
        totalFacilities: facilitiesResult.count || 0
      });

    } catch (err) {
      console.error('Dashboard error:', err);
      setError(err.message || 'Unable to load dashboard statistics.');
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      color: '#087f8c',
      icon: '📋'
    },
    {
      title: 'Pending Bookings',
      value: stats.pendingBookings,
      color: '#f0a500',
      icon: '⏳'
    },
    {
      title: 'Confirmed Bookings',
      value: stats.confirmedBookings,
      color: '#198754',
      icon: '✅'
    },
    {
      title: 'Cancelled Bookings',
      value: stats.cancelledBookings,
      color: '#dc3545',
      icon: '❌'
    },
    {
      title: 'Total Facilities',
      value: stats.totalFacilities,
      color: '#6f42c1',
      icon: '🏥'
    }
  ];

  return (
    <div className="admin-dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome to Future Health Admin Panel</p>
        </div>

        <button
          className="dashboard-refresh-btn"
          onClick={fetchDashboardStats}
          disabled={loading}
        >
          {loading ? 'Loading...' : '↻ Refresh'}
        </button>
      </div>

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="dashboard-loading">
          Loading dashboard statistics...
        </div>
      ) : (
        <div className="dashboard-cards">
          {cards.map((card, index) => (
            <div className="dashboard-card" key={index}>
              <div
                className="dashboard-card-icon"
                style={{ backgroundColor: card.color }}
              >
                {card.icon}
              </div>

              <div className="dashboard-card-info">
                <h3>{card.title}</h3>
                <h2>{card.value}</h2>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="dashboard-section">
        <h2>Quick Actions</h2>

        <div className="dashboard-actions">
          <Link
            to="/admin/bookings"
            className="dashboard-action-card"
          >
            <span>📅</span>
            <h3>Manage Bookings</h3>
            <p>View, confirm, cancel or delete patient bookings.</p>
          </Link>

          <Link
            to="/admin/facilities"
            className="dashboard-action-card"
          >
            <span>🏥</span>
            <h3>Manage Facilities</h3>
            <p>Add, update and manage medical facilities.</p>
          </Link>
        </div>
      </div>

    </div>
  );
}
