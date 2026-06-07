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

const products = [
  {
    name: 'APEX ISO-PURE ISOLATE',
    slug: 'apex-iso-pure-isolate',
    category: 'Protein',
    description: 'Ultra-pure cold-filtered whey isolate for rapid muscle recovery and maximum protein synthesis.',
    price: 64.99,
    original_price: 79.99,
    badge: 'Third-Party Tested',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRnyZDnsXZ_RE1DVgfwhTiTsMD20ZpmcCJYWfTTimNFo6__fXQhknhahdHOpC8A6w9setTZRk6tMV02XRd7FSqfgVoT7iQQAIlQfkBQz9h6PxxQ16yYkSksMInPPmzzVutJ41TGNxaCwr1B3e9ijEPDUt4PHVTDd2nOd-u98zLOrEn7UtcZt4eohiLSkAg0zUBYbvYkksURlukQ3tSS0w9RZzdut7vKm4ipsNAExwvFyfXDFUcXbGD07pIfl_fwggfB573czCNSl4',
    image_alt: 'APEX ISO-PURE ISOLATE supplement tub',
    rating: 5,
    review_count: 312,
    is_featured: true
  },
  {
    name: 'PRE-IGNITE NEUROFUSE',
    slug: 'pre-ignite-neurofuse',
    category: 'Pre-Workout',
    description: 'Explosive energy and laser-sharp focus matrix for peak training intensity. Clinically dosed ingredients.',
    price: 49.99,
    original_price: null,
    badge: 'Clinically Dosed',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPGRhtWGAzLFAvtjVFiP6MLpkTvRSrNV8g0g0jGhcqoOqFiJCitwD7YM2yuOODQjvv7NLxgLy0Zhuh6mCdpbsnHM3rsivaevTzPqRLdaGz9V0nB9srSnfWbKKW5k1T3Twp8v_ynixNelIZx20OUyuv2iWp9jWsMgI0fvAp4iwdn-iaco-Ia2ftBYswCV69VBcXY48tKccEFGyfLSykccU4bRF_IMVsCPcEEl2FgJGrVNSrh_vtxjSvnFiRkgKCw5aEdrF0YzxrIew',
    image_alt: 'PRE-IGNITE NEUROFUSE pre-workout container',
    rating: 4,
    review_count: 187,
    is_featured: true
  },
  {
    name: 'RECOVER-7 ELITE BCAA',
    slug: 'recover-7-elite-bcaa',
    category: 'Recovery',
    description: 'Premium 2:1:1 branched-chain amino acids with electrolytes for accelerated post-workout recovery.',
    price: 34.99,
    original_price: null,
    badge: 'Banned Sub-Free',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCcFT7CgjD7hlKPvqqAdgkXc_HWyEP_ZUeYcuAo8rVV-h3mRpJO5OAX_qrEbGdU5SKzSk4PL5W7-wFnaqIHJ8MFIXkQzEfPs9fOIy9SwCHMJ45hYTP9S4rSz9ZH3S_x9xYoKQRsqUJxBKvFCXodK5QprFRbN0t2ZCqAnzoisQbuUYelea2HhyXOBq18t3ftI17FVmbG9qnzJqPXv6gpMrXcMHW75SdeT4meFzxbLQsFK08cPRbQ7z89wqO1lNC6PdZurdtdd7U8TI',
    image_alt: 'RECOVER-7 ELITE BCAA white jar',
    rating: 5,
    review_count: 98,
    is_featured: true
  },
  {
    name: 'APEX PERFORMANCE MULTI',
    slug: 'apex-performance-multi',
    category: 'Wellness',
    description: 'Essential micronutrients and antioxidants optimized for active individuals demanding pharmaceutical precision.',
    price: 44.99,
    original_price: 54.99,
    badge: 'Pharmaceutical',
    image_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAp7HZLMm3p49d6Jn1VL3gmUPR7pbBHMiNl2IvhWDTXHsJRhNNG5TDMBSB_qBUZUKRF6wdkJpa3AR9XM5nu0uO6cUa-wHefNKEXTZaya2iQ9Iw7SZPnLj9y06iESMqugF2Pxigf_kSOc6M5X9qbtxRRz3XK0QSVuXD37Z83s15bmc57Shz2uooIRO2urYbQtmY1K3AvDhcsd7EQvI4UONrYHwclM1DsyX7bZ44ey6lnrfOjgeRZS8MA_tSI3U2JqUTl-WIY9D3rF1c',
    image_alt: 'APEX PERFORMANCE MULTI dark glass bottle',
    rating: 5,
    review_count: 241,
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
