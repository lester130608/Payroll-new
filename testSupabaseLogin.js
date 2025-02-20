const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://wdfpirihfudsxtvxlmhz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkZnBpcmloZnVkc3h0dnhsbWh6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTExOTYxOCwiZXhwIjoyMDU0Njk1NjE4fQ.mgnGUIeWR274SR7HBY7qMhsvZBfLqgoHDVLAFMQsfLI'
);

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@example.com',
    password: 'password123',
  });

  if (error) {
    console.error('Login failed:', error.message);
  } else {
    console.log('Login success:', data);
  }
}

login();

