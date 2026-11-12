
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient.js';
import { ADMIN_EMAIL } from '../../config.js';

export default function Login() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      // Step 1: Authenticate with Supabase
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: password,
        });

      if (loginError) {
        throw new Error(loginError.message);
      }

      // Step 2: Verify admin permission
      const { data: isAdmin, error: adminError } =
        await supabase.rpc('is_admin');

      if (adminError) {
        throw new Error(adminError.message);
      }

      if (isAdmin !== true) {
        await supabase.auth.signOut();
        throw new Error('This account is not an admin.');
      }

      // Step 3: Navigate to dashboard
      navigate('/admin/dashboard');

    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="form small" onSubmit={submit}>
      <h1>Admin Login</h1>

      <label>Admin Password</label>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="error">{error}</p>}

      <button className="btn" disabled={busy}>
        {busy ? 'Please wait...' : 'Login'}
      </button>
    </form>
  );
}
