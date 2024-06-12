import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tyzhqkvauoujzwxwkqsg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR5emhxa3ZhdW91anp3eHdrcXNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNzE0MDksImV4cCI6MjAzMzc0NzQwOX0.-Cvcfopgseqzk2vzmhCxvppnyEhk8RDVuqfkB67ppzU';
const supabase = createClient(supabaseUrl, supabaseKey);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, role, password')
        .eq('useremail', email)
        .single();

      console.log('Supabase response:', data, error);

      if (error || !data) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      if (data.password !== password) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      localStorage.setItem('user', JSON.stringify({ id: data.id, username: data.username, role: data.role }));
      setLoading(false);

      console.log('User role:', data.role);

      switch (data.role.toLowerCase()) {
        case 'admin':
          navigate('/admin');
          break;
        case 'manager':
          navigate('/manager');
          break;
        case 'salesman':
          navigate('/salesman');
          break;
        case 'agent':
          navigate('/agent');
          break;
        case 'closer':
          navigate('/closer');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Something went wrong, please try again');
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
