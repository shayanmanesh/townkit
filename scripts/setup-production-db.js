#!/usr/bin/env node

// This script sets up the production database
// Run with: node scripts/setup-production-db.js

const { spawn } = require('child_process');

const DATABASE_URL = "postgresql://postgres:ojK3DQaqjFET94IR@db.orunhawechncfxiyhifr.supabase.co:5432/postgres";

async function runCommand(command, args, env = {}) {
  return new Promise((resolve, reject) => {
    console.log(`Running: ${command} ${args.join(' ')}`);
    
    const childProcess = spawn(command, args, {
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL, ...env }
    });

    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });
  });
}

async function main() {
  try {
    console.log('🔨 Setting up production database...');
    
    console.log('\n1. Generating Prisma client...');
    await runCommand('npx', ['prisma', 'generate']);
    
    console.log('\n2. Running database migrations...');
    await runCommand('npx', ['prisma', 'migrate', 'deploy']);
    
    console.log('\n3. Seeding database...');
    await runCommand('npx', ['prisma', 'db', 'seed']);
    
    console.log('\n✅ Production database setup complete!');
    
  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    process.exit(1);
  }
}

main();