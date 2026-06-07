import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const productsDir = path.resolve(process.cwd(), 'public/products');
const BUCKET_NAME = 'products';

async function seedStorage() {
  console.log('Starting Storage seed...');

  // 1. Ensure bucket exists
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);

  if (!bucketExists) {
    console.log(`Creating bucket: ${BUCKET_NAME}`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
      fileSizeLimit: 5242880 // 5MB
    });
    if (createError) {
      console.error('Error creating bucket:', createError);
      return;
    }
  } else {
    console.log(`Bucket ${BUCKET_NAME} already exists.`);
  }

  // 2. Upload files
  const files = fs.readdirSync(productsDir);
  for (const file of files) {
    if (file === '.DS_Store') continue;
    
    const filePath = path.join(productsDir, file);
    const fileBuffer = fs.readFileSync(filePath);
    
    console.log(`Uploading ${file}...`);
    const { error: uploadError } = await supabase.storage.from(BUCKET_NAME).upload(file, fileBuffer, {
      upsert: true,
      contentType: 'image/png'
    });

    if (uploadError) {
      console.error(`Error uploading ${file}:`, uploadError);
    } else {
      const publicUrl = `${supabaseUrl}/storage/v1/object/public/${BUCKET_NAME}/${file}`;
      console.log(`Uploaded ${file}. Public URL: ${publicUrl}`);
    }
  }

  console.log('Storage seed finished.');
}

seedStorage().catch(console.error);
