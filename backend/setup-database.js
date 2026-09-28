// Database initialization script
require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  // Connect to postgres database first to create our database
  const adminClient = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: 'postgres',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
  });

  try {
    console.log('🔍 Connecting to PostgreSQL...');
    await adminClient.connect();
    console.log('✅ Connected to PostgreSQL');

    // Check if database exists
    const dbCheck = await adminClient.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [process.env.DB_NAME]
    );

    if (dbCheck.rows.length === 0) {
      console.log(`📦 Creating database "${process.env.DB_NAME}"...`);
      await adminClient.query(`CREATE DATABASE ${process.env.DB_NAME}`);
      console.log('✅ Database created');
    } else {
      console.log(`✅ Database "${process.env.DB_NAME}" already exists`);
    }

    await adminClient.end();

    // Now connect to our new database to create schema
    const appClient = new Client({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });

    await appClient.connect();

    // Read and execute schema.sql
    console.log('📋 Running schema.sql...');
    const schemaSQL = fs.readFileSync(path.join(__dirname, '..', 'database', 'schema.sql'), 'utf8');
    await appClient.query(schemaSQL);
    console.log('✅ Schema created successfully');

    // Read and execute seed.sql
    console.log('🌱 Running seed.sql...');
    const seedSQL = fs.readFileSync(path.join(__dirname, '..', 'database', 'seed.sql'), 'utf8');
    await appClient.query(seedSQL);
    console.log('✅ Sample data inserted successfully');

    await appClient.end();

    console.log('');
    console.log('==========================================');
    console.log('✅ Database setup complete!');
    console.log('==========================================');
    console.log('');
    console.log('📊 Database contains:');
    console.log('   • 1 admin user (username: admin, password: admin123)');
    console.log('   • 6 sample blog posts');
    console.log('   • 6 sample comments');
    console.log('   • 3 sample contact messages');
    console.log('');
    console.log('🚀 You can now start the server with: npm start');
    console.log('');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('password authentication failed')) {
      console.error('');
      console.error('Please check your PostgreSQL credentials in backend/.env');
      console.error('Current settings:');
      console.error(`  DB_HOST: ${process.env.DB_HOST}`);
      console.error(`  DB_PORT: ${process.env.DB_PORT}`);
      console.error(`  DB_USER: ${process.env.DB_USER}`);
      console.error(`  DB_NAME: ${process.env.DB_NAME}`);
    }
    process.exit(1);
  }
}

setupDatabase();
