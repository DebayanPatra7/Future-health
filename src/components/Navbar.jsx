
// import { Link, useNavigate } from 'react-router-dom';
// import { supabase } from '../supabaseClient.js';
// import { useAuth } from '../AuthContext.jsx';

// export default function Navbar() {
//   const navigate = useNavigate();
//   const { session } = useAuth();

//   const logout = async () => {
//     await supabase.auth.signOut();
//     navigate('/admin/login');
//   };

//   return (
//     <header className="navbar">
//       <Link to="/" className="brand">
//         <img
//           src="/logo.jpeg"
//           alt="Future Health Logo"
//           className="brand-logo"
//         />
//       </Link>

//       <nav>
//         <Link to="/">Facilities</Link>
//         {session ? (
//           <>
//             <Link to="/admin/dashboard">Dashboard</Link>
//             <Link to="/admin/facilities">Manage Facilities</Link>
//             <Link to="/admin/bookings">Bookings</Link>
//             <button className="btn btn-light" onClick={logout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <Link to="/admin/login">Admin Login</Link>
//         )}
//       </nav>
//     </header>
//   );
// }



















import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient.js';
import { useAuth } from '../AuthContext.jsx';

export default function Navbar() {
  const navigate = useNavigate();
  const { session } = useAuth();

  const logout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const goToSection = (sectionId) => {
    navigate('/front');

    setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <header className="navbar">
      <Link to="/front" className="brand">
        <img
          src="/logo.jpeg"
          alt="Future Health Logo"
          className="brand-logo"
        />
      </Link>

      <nav>
        <Link to="/front">Home</Link>

        <Link to="/">Facilities</Link>

      <Link to="/about">About Us</Link>

       <Link link to="/contact">Contact</Link>

        {session ? (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/facilities">Manage Facilities</Link>
            <Link to="/admin/bookings">Bookings</Link>

            <button className="btn btn-light" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/admin/login">Admin Login</Link>
        )}
      </nav>
    </header>
  );
}
