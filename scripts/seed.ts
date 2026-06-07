import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const storageUrl = `${supabaseUrl}/storage/v1/object/public/products/`;

const products = [
  {
    name: 'Kevin Levrone Gold Creatine',
    slug: 'kevin-levrone-gold-creatine',
    category: 'Creatine',
    description: 'Micronized creatine monohydrate for maximum power output and cell volumization. Pharmaceutical grade purity.',
    price: 34.99,
    original_price: null,
    badge: 'Premium Series',
    image_url: `${storageUrl}gold-creatine.png`,
    image_alt: 'Kevin Levrone Gold Creatine container',
    rating: 5,
    review_count: 512,
    is_featured: true
  },
  {
    name: 'Applied Nutrition Creatine Monohydrate',
    slug: 'applied-nutrition-creatine-monohydrate',
    category: 'Creatine',
    description: '100% pure micronized creatine for increased physical performance in successive bursts of short-term, high intensity exercise.',
    price: 29.99,
    original_price: 39.99,
    badge: 'Best Seller',
    image_url: `${storageUrl}applied-creatine.png`,
    image_alt: 'Applied Nutrition Creatine container',
    rating: 5,
    review_count: 843,
    is_featured: true
  },
  {
    name: 'Applied Nutrition ABE Pre-Workout',
    slug: 'applied-nutrition-abe-pre-workout',
    category: 'Pre-Workout',
    description: 'All Black Everything. The ultimate pre-workout focal matrix with energy and performance boosters.',
    price: 39.99,
    original_price: 49.99,
    badge: 'Clinically Dosed',
    image_url: `${storageUrl}applied-pre.png`,
    image_alt: 'Applied Nutrition ABE container',
    rating: 5,
    review_count: 1205,
    is_featured: true
  },
  {
    name: 'Optimum Nutrition Gold Standard Whey',
    slug: 'gold-standard-whey-standard',
    category: 'Protein',
    description: 'The world\'s best-selling whey protein. Delivering 24g of high-quality whey protein per serving.',
    price: 64.99,
    original_price: 74.99,
    badge: 'Gold Standard',
    image_url: `${storageUrl}gold-whey.png`,
    image_alt: 'Gold Standard Whey tub',
    rating: 5,
    review_count: 25400,
    is_featured: true
  },
  {
    name: 'Applied Nutrition Whey Isotope',
    slug: 'applied-nutrition-whey-isotope',
    category: 'Protein',
    description: 'Premium Whey Isolate & Concentrate blend. Engineered for rapid absorption and peak recovery.',
    price: 74.99,
    original_price: null,
    badge: 'Elite Grade',
    image_url: `${storageUrl}applied-isotope.png`,
    image_alt: 'Applied Nutrition Whey Isotope tub',
    rating: 5,
    review_count: 421,
    is_featured: true
  }
];

const goals = [
  {
    title: 'Muscle Growth',
    slug: 'muscle',
    description: 'Precision-formulated protein and amino blends to maximize hypertrophic response.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd0wk_nDY7Ot3XXlfToU2PfSnxaBIdeptFBqun61kaWiz_PdeaxAMPWo5f9sQdpTaicqgmZOgFz9RrjcYwKUNepyHsjvBOUXpKPfSt7xsNfRt4dkjbte2ZqibV30IZs2tIsPOlCcJtMPfnkXO-tLECFvTBYhArUdkQWfRsVrYXtmPsDjNnnf5YhTeJ2rtt9toyslafudvNQ64OPYE8FpkGa5_V0o7FK_fQ1VvImYcDEdGKU4EuQaLQv24ayBbo3d7KzqaZFtgC-PA',
    image_alt: 'Weightlifter hands gripping a heavy barbell',
    sort_order: 1
  },
  {
    title: 'Energy & Focus',
    slug: 'energy',
    description: 'Scientifically formulated pre-workout and nootropic blends for sustained mental and physical energy.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrssuyzmeyRfKnjIFN8EIqOpiUG0oEwAxyypIhwK16MZxuAXziPR_2jQ-0nFYG4Lbm--h7j9xMfo2_IXDRrckfQwCazowFea64qwFKwwsRdCjc99vrjatSJEkHWp0leRmIRr_fSJE2SmWaRxe7ReI_uepu3MyD2xG_dqfKrWyKyvtHIVZLEC0eMswYTLD2GhppNE4BxkdbWLkBNeAGIHKydwPdjIWlIfmTGHO49-jHq171tdtzNovMmXIeSUaxccP8_VeNqW7bgdo',
    image_alt: 'Track athlete at the starting blocks',
    sort_order: 2
  },
  {
    title: 'Rapid Recovery',
    slug: 'recovery',
    description: 'Advanced recovery formulas to reduce muscle soreness and get you back to training faster.',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8yESyKloJ91Hzc9Q7bpet2pVwdMHcwJaJdoRgOmY2ECr_aZnRxf8uM0yCXBrvTxHRk6gSyfAofEUddZpBNwtzG6lOKjdmftwxZ2ojVAK5eHwXrXTzjHqgYHxEK7kk7RpLe1mpW1z0ZhRJgkws5NBaku2DPuOx-VZJjqKSZJuJnVIjhTw_iaXihFqJHpdrOtQgg33ByM6r1x3GjBJ4i_ZXCAGedp2sn1NyD6m5TNQ8o9d_pvvFNKpMHtHG7dJG0__dgG4ZXeLDCnQ',
    image_alt: 'Recovery capsules on a clean surface',
    sort_order: 3
  }
];

async function seed() {
  console.log('Starting seed...');

  // 1. Seed Goals
  console.log('Seeding goals...');
  const { error: goalsError } = await supabase.from('goals').upsert(goals, { onConflict: 'slug' });
  if (goalsError) {
    console.error('Error seeding goals:', goalsError);
  } else {
    console.log('Goals seeded successfully.');
  }

  // 2. Seed Products
  console.log('Seeding products...');
  const { data: seededProducts, error: productsError } = await supabase.from('products').upsert(products, { onConflict: 'slug' }).select();
  if (productsError) {
    console.error('Error seeding products:', productsError);
  } else {
    console.log('Products seeded successfully.');
  }

  // 3. Seed Inventory
  if (seededProducts) {
    console.log('Seeding inventory...');
    const inventory = seededProducts.map((p, i) => ({
      product_id: p.id,
      sku: `NGS-${p.category.substring(0, 4).toUpperCase()}-00${i + 1}`,
      quantity: Math.floor(Math.random() * 500) + 50,
      reserved_quantity: 0,
      low_stock_threshold: 20,
      warehouse_location: 'MAIN-WH'
    }));

    const { error: invError } = await supabase.from('inventory').upsert(inventory, { onConflict: 'product_id' });
    if (invError) {
      console.error('Error seeding inventory:', invError);
    } else {
      console.log('Inventory seeded successfully.');
    }
  }

  console.log('Seed finished.');
}

seed().catch((err) => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
