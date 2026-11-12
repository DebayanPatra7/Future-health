// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { supabase } from '../supabaseClient.js';

// const empty = {
//   full_name: '', age: '', gender: 'Male', phone: '', email: '',
//   address: '', booking_date: '', time_slot: '', notes: '',
// };

// export default function BookingForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [facility, setFacility] = useState(null);
//   const [form, setForm] = useState(empty);
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   useEffect(() => {
//     supabase.from('facilities').select('*').eq('id', id).single().then(({ data, error }) => {
//       if (error) setError('Facility not found');
//       else setFacility(data);
//     });
//   }, [id]);

//   const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const validate = () => {
//     if (!form.full_name.trim()) return 'Name is required';
//     if (!form.age || form.age < 0 || form.age > 120) return 'Enter a valid age';
//     if (!/^\d{10}$/.test(form.phone)) return 'Phone must be 10 digits';
//     if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Enter a valid email';
//     if (!form.address.trim()) return 'Address is required';
//     if (!form.booking_date) return 'Select a booking date';
//     return '';
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     if (!facility) return setError('Facility not loaded');
//     const msg = validate();
//     if (msg) return setError(msg);
//     setError('');
//     setSubmitting(true);

//     const { error } = await supabase.from('bookings').insert({
//       facility_id: facility.id,
//       facility_name: facility.name,
//       full_name: form.full_name.trim(),
//       age: Number(form.age),
//       gender: form.gender,
//       phone: form.phone,
//       email: form.email.trim(),
//       address: form.address.trim(),
//       booking_date: form.booking_date,
//       time_slot: form.time_slot,
//       notes: form.notes,
//     });

//     setSubmitting(false);
//     if (error) setError('Booking failed: ' + error.message);
//     else navigate('/success');
//   };

//   const today = new Date().toISOString().split('T')[0];

//   return (
//     <form className="form" onSubmit={submit}>
//       <h1>Book: {facility?.name}</h1>

//       <label>Full Name *</label>
//       <input name="full_name" value={form.full_name} onChange={change} />

//       <div className="two">
//         <div>
//           <label>Age *</label>
//           <input type="number" name="age" value={form.age} onChange={change} />
//         </div>
//         <div>
//           <label>Gender</label>
//           <select name="gender" value={form.gender} onChange={change}>
//             <option>Male</option><option>Female</option><option>Other</option>
//           </select>
//         </div>
//       </div>

//       <label>Phone Number *</label>
//       <input name="phone" maxLength={10} value={form.phone} onChange={change} />

//       <label>Email *</label>
//       <input type="email" name="email" value={form.email} onChange={change} />

//       <label>Address *</label>
//       <textarea name="address" rows={3} value={form.address} onChange={change} />

//       <div className="two">
//         <div>
//           <label>Booking Date *</label>
//           <input type="date" name="booking_date" min={today} value={form.booking_date} onChange={change} />
//         </div>
//         <div>
//           <label>Time Slot</label>
//           <select name="time_slot" value={form.time_slot} onChange={change}>
//             <option value="">Select</option>
//             <option>09:00 - 11:00</option>
//             <option>11:00 - 13:00</option>
//             <option>14:00 - 16:00</option>
//             <option>16:00 - 18:00</option>
//           </select>
//         </div>
//       </div>

//       <label>Notes / Reason</label>
//       <textarea name="notes" rows={3} value={form.notes} onChange={change} />

//       {error && <p className="error">{error}</p>}
//       <button className="btn" disabled={submitting}>{submitting ? 'Submitting...' : 'Confirm Booking'}</button>
//     </form>
//   );
// }








// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { supabase } from '../supabaseClient.js';
// import emailjs from '@emailjs/browser';

// // EmailJS Configuration
// const EMAIL_SERVICE_ID = 'service_g5xzj0n';
// const EMAIL_TEMPLATE_ID = 'template_8aab3su';
// const EMAIL_PUBLIC_KEY = 'kdB9vtRnL9E3lBotd';

// const empty = {
//   full_name: '',
//   age: '',
//   gender: 'Male',
//   phone: '',
//   email: '',
//   address: '',
//   booking_date: '',
//   time_slot: '',
//   notes: '',
// };

// export default function BookingForm() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [facility, setFacility] = useState(null);
//   const [form, setForm] = useState(empty);
//   const [error, setError] = useState('');
//   const [submitting, setSubmitting] = useState(false);

//   // Today's date
//   const now = new Date();

//   const today = [
//     now.getFullYear(),
//     String(now.getMonth() + 1).padStart(2, '0'),
//     String(now.getDate()).padStart(2, '0'),
//   ].join('-');

//   // Load facility details
//   useEffect(() => {
//     const loadFacility = async () => {
//       const { data, error } = await supabase
//         .from('facilities')
//         .select('*')
//         .eq('id', id)
//         .single();

//       if (error) {
//         setError('Facility not found: ' + error.message);
//       } else {
//         setFacility(data);
//       }
//     };

//     loadFacility();
//   }, [id]);

//   // Handle form changes
//   const change = (e) => {
//     setForm((previous) => ({
//       ...previous,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Validate form
//   const validate = () => {
//     if (!form.full_name.trim()) {
//       return 'Name is required';
//     }

//     if (
//       !form.age ||
//       Number(form.age) < 1 ||
//       Number(form.age) > 120
//     ) {
//       return 'Enter a valid age';
//     }

//     if (!/^\d{10}$/.test(form.phone)) {
//       return 'Phone must be 10 digits';
//     }

//     if (!/^\S+@\S+\.\S+$/.test(form.email)) {
//       return 'Enter a valid email';
//     }

//     if (!form.address.trim()) {
//       return 'Address is required';
//     }

//     if (!form.booking_date) {
//       return 'Select a booking date';
//     }

//     if (form.booking_date < today) {
//       return 'Booking date cannot be in the past';
//     }

//     return '';
//   };

//   // Submit booking
//   const submit = async (e) => {
//     e.preventDefault();

//     if (!facility) {
//       setError('Facility not loaded');
//       return;
//     }

//     const validationMessage = validate();

//     if (validationMessage) {
//       setError(validationMessage);
//       return;
//     }

//     setError('');
//     setSubmitting(true);

//     try {
//       // STEP 1: Save booking in Supabase
//       const { error: bookingError } = await supabase
//         .from('bookings')
//         .insert({
//           facility_id: facility.id,
//           facility_name: facility.name,
//           full_name: form.full_name.trim(),
//           age: Number(form.age),
//           gender: form.gender,
//           phone: form.phone,
//           email: form.email.trim(),
//           address: form.address.trim(),
//           booking_date: form.booking_date,
//           time_slot: form.time_slot,
//           notes: form.notes,
//           status: 'pending',
//         });

//       if (bookingError) {
//         throw new Error(
//           'Booking could not be saved: ' + bookingError.message
//         );
//       }

//       console.log('Booking saved successfully');

//       // STEP 2: Send confirmation email
//       try {
//         const emailResponse = await emailjs.send(
//           EMAIL_SERVICE_ID,
//           EMAIL_TEMPLATE_ID,
//           {
//             email: form.email.trim(),
//             full_name: form.full_name.trim(),
//             facility_name: facility.name,
//             booking_date: form.booking_date,
//             time_slot: form.time_slot || 'Not selected',
//             status: 'pending',
//             phone: form.phone,
//             address: form.address.trim(),
//             notes: form.notes || 'Not provided',
//           },
//           {
//             publicKey: EMAIL_PUBLIC_KEY,
//           }
//         );

//         console.log('Email sent successfully:', emailResponse);

//         // STEP 3: Both booking and email successful
//         navigate('/success', {
//           state: {
//             message:
//               'Your booking was successful! Confirmation email sent to ' +
//               form.email,
//           },
//         });

//       } catch (emailError) {
//         console.error('EmailJS status:', emailError.status);
//         console.error('EmailJS message:', emailError.text);
//         console.error('Complete EmailJS error:', emailError);

//         // Booking saved but email failed
//         navigate('/success', {
//           state: {
//             message:
//               'Your booking was saved successfully, but the confirmation email could not be sent. Please contact the administrator.',
//           },
//         });
//       }

//     } catch (err) {
//       console.error('Booking error:', err);
//       setError(err.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <form className="form" onSubmit={submit}>

//       <h1>Book: {facility?.name || 'Loading...'}</h1>

//       <label>Full Name *</label>
//       <input
//         name="full_name"
//         value={form.full_name}
//         onChange={change}
//         required
//       />

//       <div className="two">
//         <div>
//           <label>Age *</label>
//           <input
//             type="number"
//             name="age"
//             min="1"
//             max="120"
//             value={form.age}
//             onChange={change}
//             required
//           />
//         </div>

//         <div>
//           <label>Gender</label>
//           <select
//             name="gender"
//             value={form.gender}
//             onChange={change}
//           >
//             <option>Male</option>
//             <option>Female</option>
//             <option>Other</option>
//           </select>
//         </div>
//       </div>

//       <label>Phone Number *</label>
//       <input
//         type="tel"
//         name="phone"
//         maxLength={10}
//         value={form.phone}
//         onChange={change}
//         required
//       />

//       <label>Email *</label>
//       <input
//         type="email"
//         name="email"
//         value={form.email}
//         onChange={change}
//         required
//       />

//       <label>Address *</label>
//       <textarea
//         name="address"
//         rows={3}
//         value={form.address}
//         onChange={change}
//         required
//       />

//       <div className="two">
//         <div>
//           <label>Booking Date *</label>
//           <input
//             type="date"
//             name="booking_date"
//             min={today}
//             value={form.booking_date}
//             onChange={change}
//             required
//           />
//         </div>

//         <div>
//           <label>Time Slot</label>
//           <select
//             name="time_slot"
//             value={form.time_slot}
//             onChange={change}
//           >
//             <option value="">Select</option>
//             <option>09:00 - 11:00</option>
//             <option>11:00 - 13:00</option>
//             <option>14:00 - 16:00</option>
//             <option>16:00 - 18:00</option>
//           </select>
//         </div>
//       </div>

//       <label>Notes / Reason</label>
//       <textarea
//         name="notes"
//         rows={3}
//         value={form.notes}
//         onChange={change}
//       />

//       {error && (
//         <p className="error">{error}</p>
//       )}

//       <button
//         className="btn"
//         type="submit"
//         disabled={submitting || !facility}
//       >
//         {submitting ? 'Submitting...' : 'Confirm Booking'}
//       </button>

//     </form>
//   );
// }







import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { supabase } from '../supabaseClient.js';

const empty = {
  full_name: '',
  age: '',
  gender: 'Male',
  phone: '',
  email: '',
  address: '',
  booking_date: '',
  time_slot: '',
  notes: '',
};

export default function BookingForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [facility, setFacility] = useState(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Popup and booking information
  const [showPopup, setShowPopup] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Load facility details
  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const { data, error } = await supabase
          .from('facilities')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Facility error:', error);
          setError('Facility not found.');
        } else {
          setFacility(data);
        }
      } catch (err) {
        console.error('Connection error:', err);
        setError('Unable to connect to the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchFacility();
  }, [id]);

  // Handle form input
  const change = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Today's date
  const today = new Date().toLocaleDateString('en-CA');

  // Validate form
  const validate = () => {
    if (!form.full_name.trim()) {
      return 'Name is required';
    }

    if (
      !form.age ||
      Number(form.age) < 0 ||
      Number(form.age) > 120
    ) {
      return 'Enter a valid age';
    }

    if (!/^\d{10}$/.test(form.phone)) {
      return 'Phone must be exactly 10 digits';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return 'Enter a valid email';
    }

    if (!form.address.trim()) {
      return 'Address is required';
    }

    if (!form.booking_date) {
      return 'Select a booking date';
    }

    if (form.booking_date < today) {
      return 'Please select today or a future date';
    }

    return '';
  };

  // Submit booking without Admin login
  const submit = async (e) => {
    e.preventDefault();

    if (!facility) {
      setError('Facility details are not loaded.');
      return;
    }

    const validationMessage = validate();

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setError('');
    setSubmitting(true);

    const reference = 'MC' + Date.now();

    const bookingData = {
      facility_id: facility.id,
      facility_name: facility.name,
      full_name: form.full_name.trim(),
      age: Number(form.age),
      gender: form.gender,
      phone: form.phone,
      email: form.email.trim(),
      address: form.address.trim(),
      booking_date: form.booking_date,
      time_slot: form.time_slot,
      notes: form.notes.trim(),
    };

    try {
      const { error: insertError } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (insertError) {
        console.error('Booking error:', insertError);
        setError('Booking failed: ' + insertError.message);
        return;
      }

      // Save booking information for popup and PDF
      setBookingDetails({
        ...bookingData,
        booking_reference: reference,
        created_at: new Date().toLocaleString(),
      });

      // Show confirmation popup
      setShowPopup(true);

      // Clear form
      setForm(empty);

    } catch (err) {
      console.error('Booking connection error:', err);
      setError(
        'Unable to connect to the server. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Download booking receipt as PDF
  const downloadPDF = () => {
    if (!bookingDetails) return;

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    // Header
    doc.setFillColor(8, 127, 140);
    doc.rect(0, 0, pageWidth, 38, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('MediCare', 15, 17);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Facility Booking Confirmation', 15, 27);

    // Booking reference
    doc.setTextColor(8, 127, 140);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('BOOKING DETAILS', 15, 52);

    doc.setDrawColor(8, 127, 140);
    doc.line(15, 57, pageWidth - 15, 57);

    // Booking information
    const details = [
      ['Booking Reference', bookingDetails.booking_reference],
      ['Facility Name', bookingDetails.facility_name],
      ['Full Name', bookingDetails.full_name],
      ['Age', String(bookingDetails.age)],
      ['Gender', bookingDetails.gender],
      ['Phone Number', bookingDetails.phone],
      ['Email', bookingDetails.email],
      ['Address', bookingDetails.address],
      ['Booking Date', bookingDetails.booking_date],
      ['Time Slot', bookingDetails.time_slot || 'Not selected'],
      ['Notes / Reason', bookingDetails.notes || 'N/A'],
      ['Booking Submitted', bookingDetails.created_at],
      ['Status', 'Booking Submitted'],
    ];

    let y = 70;

    details.forEach(([label, value]) => {
      doc.setTextColor(70, 70, 70);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(label + ':', 15, y);

      doc.setFont('helvetica', 'normal');

      const lines = doc.splitTextToSize(
        String(value || '-'),
        105
      );

      doc.text(lines, 75, y);

      y += Math.max(9, lines.length * 6);
    });

    // Footer
    y += 8;
    doc.setDrawColor(200, 200, 200);
    doc.line(15, y, pageWidth - 15, y);

    doc.setTextColor(8, 127, 140);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Thank you for choosing MediCare!', 15, y + 10);

    doc.setTextColor(100, 100, 100);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(
      'Please keep this receipt for your reference.',
      15,
      y + 17
    );

    doc.save(
      `MediCare_Booking_${bookingDetails.booking_reference}.pdf`
    );
  };

  if (loading) {
    return (
      <div className="form">
        <h2>Loading facility details...</h2>
      </div>
    );
  }

  if (!facility) {
    return (
      <div className="form">
        <h2>Facility Not Found</h2>
        <p className="error">{error}</p>
        <button
          type="button"
          className="btn"
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <>
      <form className="form" onSubmit={submit}>
        <h1>Book: {facility.name}</h1>

        {facility.image_url && (
          <img
            src={facility.image_url}
            alt={facility.name}
            style={{
              width: '100%',
              maxHeight: '230px',
              objectFit: 'cover',
              borderRadius: '10px',
              marginBottom: '15px',
            }}
          />
        )}

        <label>Full Name *</label>
        <input
          type="text"
          name="full_name"
          value={form.full_name}
          onChange={change}
          placeholder="Enter your full name"
          required
        />

        <div className="two">
          <div>
            <label>Age *</label>
            <input
              type="number"
              name="age"
              min="0"
              max="120"
              value={form.age}
              onChange={change}
              required
            />
          </div>

          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={change}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <label>Phone Number *</label>
        <input
          type="tel"
          name="phone"
          maxLength={10}
          value={form.phone}
          onChange={change}
          placeholder="Enter 10 digit phone number"
          required
        />

        <label>Email *</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={change}
          placeholder="Enter your email"
          required
        />

        <label>Address *</label>
        <textarea
          name="address"
          rows={3}
          value={form.address}
          onChange={change}
          placeholder="Enter your address"
          required
        />

        <div className="two">
          <div>
            <label>Booking Date *</label>
            <input
              type="date"
              name="booking_date"
              min={today}
              value={form.booking_date}
              onChange={change}
              required
            />
          </div>

          <div>
            <label>Time Slot</label>
            <select
              name="time_slot"
              value={form.time_slot}
              onChange={change}
            >
              <option value="">Select Time</option>
              <option value="09:00 - 11:00">09:00 - 11:00</option>
              <option value="11:00 - 13:00">11:00 - 13:00</option>
              <option value="14:00 - 16:00">14:00 - 16:00</option>
              <option value="16:00 - 18:00">16:00 - 18:00</option>
            </select>
          </div>
        </div>

        <label>Notes / Reason</label>
        <textarea
          name="notes"
          rows={3}
          value={form.notes}
          onChange={change}
          placeholder="Additional information (optional)"
        />

        {error && (
          <p className="error">{error}</p>
        )}

        <button
          type="submit"
          className="btn"
          disabled={submitting}
        >
          {submitting ? 'Submitting...' : 'Confirm Booking'}
        </button>
      </form>

      {/* BOOKING SUCCESS POPUP */}
      {showPopup && bookingDetails && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">

            <div className="success-icon">✓</div>

            <h2>Booking Successful!</h2>

            <p className="success-message">
              Your facility booking has been submitted successfully.
            </p>

            <div className="booking-reference">
              <span>Booking Reference</span>
              <strong>{bookingDetails.booking_reference}</strong>
            </div>

            <div className="popup-details">
              <p>
                <strong>Facility:</strong>{' '}
                {bookingDetails.facility_name}
              </p>

              <p>
                <strong>Name:</strong>{' '}
                {bookingDetails.full_name}
              </p>

              <p>
                <strong>Booking Date:</strong>{' '}
                {bookingDetails.booking_date}
              </p>

              <p>
                <strong>Time Slot:</strong>{' '}
                {bookingDetails.time_slot || 'Not selected'}
              </p>

              <p>
                <strong>Phone:</strong>{' '}
                {bookingDetails.phone}
              </p>
            </div>

            <button
              type="button"
              className="btn download-btn"
              onClick={downloadPDF}
            >
              Download Booking Details (PDF)
            </button>

            <button
              type="button"
              className="close-btn"
              onClick={() => {
                setShowPopup(false);
                navigate('/');
              }}
            >
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
}
