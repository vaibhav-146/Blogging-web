const { Client } = require('pg');

async function resetPassword() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: '', // trust mode, no password needed
  });

  try {
    await client.connect();
    console.log('✅ Connected with trust auth');

    // Set new password
    await client.query("ALTER USER postgres WITH PASSWORD 'admin123';");
    console.log('✅ Password set to: admin123');

    await client.end();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

resetPassword();
