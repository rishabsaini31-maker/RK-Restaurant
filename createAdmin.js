require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
);

async function createAdmin() {
  const email = 'admin@example.com';
  const password = 'your_secure_password';

  console.log('Signing up user...');
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name: 'Rishab Admin' }
    }
  });

  if (error) {
    console.error('Signup error:', error.message);
    // If it says user exists, it's fine, we will just update role via psql
  } else {
    console.log('Signup success:', data.user?.id);
  }
}

createAdmin();
