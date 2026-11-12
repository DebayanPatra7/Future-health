// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar.jsx';
// import ProtectedRoute from './components/ProtectedRoute.jsx';
// import Home from './pages/Home.jsx';
// import FacilityDetails from './pages/FacilityDetails.jsx';
// import BookingForm from './pages/BookingForm.jsx';
// import Success from './pages/Success.jsx';
// import Login from './pages/admin/Login.jsx';
// import Dashboard from './pages/admin/Dashboard.jsx';
// import ManageFacilities from './pages/admin/ManageFacilities.jsx';
// import Bookings from './pages/admin/Bookings.jsx';
// import { SUPABASE_URL } from './config.js';

// export default function App() {
//   if (SUPABASE_URL.includes('YOUR-PROJECT')) {
//     return (
//       <main className="container">
//         <h1>Setup needed</h1>
//         <p>Open <b>src/config.js</b> and paste your Supabase URL and anon key, then save.</p>
//       </main>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <main className="container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/facility/:id" element={<FacilityDetails />} />
//           <Route path="/book/:id" element={<BookingForm />} />
//           <Route path="/success" element={<Success />} />

//           <Route path="/admin/login" element={<Login />} />
//           <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//           <Route path="/admin/facilities" element={<ProtectedRoute><ManageFacilities /></ProtectedRoute>} />
//           <Route path="/admin/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />

//           <Route path="*" element={<h2>Page not found</h2>} />
//         </Routes>
//       </main>
//     </>
//   );
// }






import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Front from './pages/front.jsx';
import Home from './pages/Home.jsx';
import FacilityDetails from './pages/FacilityDetails.jsx';
import BookingForm from './pages/BookingForm.jsx';
import Success from './pages/Success.jsx';
import About from './pages/About.jsx';
import Login from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ManageFacilities from './pages/admin/ManageFacilities.jsx';
import Bookings from './pages/admin/Bookings.jsx';
import Contact from './pages/contact.jsx';

import { SUPABASE_URL } from './config.js';

export default function App() {
  if (SUPABASE_URL.includes('YOUR-PROJECT')) {
    return (
      <main className="container">
        <h1>Setup needed</h1>
        <p>
          Open <b>src/config.js</b> and paste your Supabase URL
          and anon key, then save.
        </p>
      </main>
    );
  }

  return (
    <>
      <Navbar />

      <main className="container">
        <Routes>

          {/* Front Home Page */}
          <Route path="/front" element={<Front />} />

          {/* Existing Facilities Page */}
          <Route path="/" element={<Home />} />

          {/* Facility Pages */}
          <Route path="/facility/:id" element={<FacilityDetails />} />
          <Route path="/book/:id" element={<BookingForm />} />
          <Route path="/success" element={<Success />} />

          {/* Admin Pages */}
          <Route path="/admin/login" element={<Login />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/facilities"
            element={
              <ProtectedRoute>
                <ManageFacilities />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
        <Route path="/about" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        {/* Not Found */}
        <Route path="*" element={<h2>Page not found</h2>} />

        </Routes>
      </main>
    </>
  );
}
