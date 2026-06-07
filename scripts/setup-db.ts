import { Client } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: DATABASE_URL must be set in .env.local');
  process.exit(1);
}

async function runSqlFile(client: Client, filePath: string) {
  console.log(`Running ${path.basename(filePath)}...`);
  const sql = fs.readFileSync(filePath, 'utf8');
  await client.query(sql);
  console.log(`Successfully executed ${path.basename(filePath)}`);
}

async function setup() {
  const client = new Client({
    connectionString,
    ssl: {
      rejectUnauthorized: false // Required for Supabase
    }
  });

  try {
    await client.connect();
    console.log('Connected to database.');

    const projectRoot = process.cwd();
    
    // 1. Run Schema 1
    await runSqlFile(client, path.join(projectRoot, 'supabase', 'schema.sql'));
    
    // 2. Run Schema 2 (Profiles & Inventory)
    await runSqlFile(client, path.join(projectRoot, 'supabase', 'schema_v2.sql'));
    
    // 3. Run Seed (Data)
    // Note: seed.sql contains the same data as my TS seed script but is more direct for SQL execution
    await runSqlFile(client, path.join(projectRoot, 'supabase', 'seed.sql'));

    console.log('\nDatabase setup complete! 🚀');
  } catch (err) {
    console.error('Database setup failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setup();
