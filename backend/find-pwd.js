const { Client } = require('pg');

const passwords = ['admin', 'postgres', 'admin123', 'root', '1234', '123456', 'password', 'Jeet@123', 'jeet', 'jeet123', ''];

async function findPassword() {
  for (const pwd of passwords) {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: pwd,
      connectionTimeoutMillis: 2000,
    });

    try {
      await client.connect();
      console.log(`✅ SUCCESS! PostgreSQL password is: "${pwd}"`);
      await client.end();
      return pwd;
    } catch (err) {
      console.log(`❌ "${pwd}" failed: ${err.message}`);
    }
  }
  console.log('None of the common passwords worked.');
  return null;
}

findPassword().then(pwd => {
  if (pwd !== null) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});
