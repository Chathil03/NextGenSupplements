-- ============================================================
-- NextGen Supplements — Complete Seed File
-- Run AFTER schema.sql AND schema_v2.sql
-- Populates: products, goals, profiles (users), inventory
-- ============================================================


-- ============================================================
-- 1. PRODUCTS (12 products — safe to re-run with ON CONFLICT)
-- ============================================================

insert into public.products
  (name, slug, category, description, price, original_price, badge, image_url, image_alt, rating, review_count, is_featured)
values
  ('APEX ISO-PURE ISOLATE',   'apex-iso-pure-isolate',   'Protein',      'Ultra-pure cold-filtered whey isolate for rapid muscle recovery and maximum protein synthesis.',                             64.99, 79.99,  'Third-Party Tested',   'https://lh3.googleusercontent.com/aida-public/AB6AXuDRnyZDnsXZ_RE1DVgfwhTiTsMD20ZpmcCJYWfTTimNFo6__fXQhknhahdHOpC8A6w9setTZRk6tMV02XRd7FSqfgVoT7iQQAIlQfkBQz9h6PxxQ16yYkSksMInPPmzzVutJ41TGNxaCwr1B3e9ijEPDUt4PHVTDd2nOd-u98zLOrEn7UtcZt4eohiLSkAg0zUBYbvYkksURlukQ3tSS0w9RZzdut7vKm4ipsNAExwvFyfXDFUcXbGD07pIfl_fwggfB573czCNSl4', 'APEX ISO-PURE ISOLATE supplement tub',          5, 312, true),
  ('PRE-IGNITE NEUROFUSE',    'pre-ignite-neurofuse',    'Pre-Workout',  'Explosive energy and laser-sharp focus matrix for peak training intensity. Clinically dosed ingredients.',                49.99, null,   'Clinically Dosed',     'https://lh3.googleusercontent.com/aida-public/AB6AXuBPGRhtWGAzLFAvtjVFiP6MLpkTvRSrNV8g0g0jGhcqoOqFiJCitwD7YM2yuOODQjvv7NLxgLy0Zhuh6mCdpbsnHM3rsivaevTzPqRLdaGz9V0nB9srSnfWbKKW5k1T3Twp8v_ynixNelIZx20OUyuv2iWp9jWsMgI0fvAp4iwdn-iaco-Ia2ftBYswCV69VBcXY48tKccEFGyfLSykccU4bRF_IMVsCPcEEl2FgJGrVNSrh_vtxjSvnFiRkgKCw5aEdrF0YzxrIew', 'PRE-IGNITE NEUROFUSE pre-workout container',    4, 187, true),
  ('RECOVER-7 ELITE BCAA',    'recover-7-elite-bcaa',    'Recovery',     'Premium 2:1:1 branched-chain amino acids with electrolytes for accelerated post-workout recovery.',                      34.99, null,   'Banned Sub-Free',      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCcFT7CgjD7hlKPvqqAdgkXc_HWyEP_ZUeYcuAo8rVV-h3mRpJO5OAX_qrEbGdU5SKzSk4PL5W7-wFnaqIHJ8MFIXkQzEfPs9fOIy9SwCHMJ45hYTP9S4rSz9ZH3S_x9xYoKQRsqUJxBKvFCXodK5QprFRbN0t2ZCqAnzoisQbuUYelea2HhyXOBq18t3ftI17FVmbG9qnzJqPXv6gpMrXcMHW75SdeT4meFzxbLQsFK08cPRbQ7z89wqO1lNC6PdZurdtdd7U8TI', 'RECOVER-7 ELITE BCAA white jar',                5,  98, true),
  ('APEX PERFORMANCE MULTI',  'apex-performance-multi',  'Wellness',     'Essential micronutrients and antioxidants optimized for active individuals demanding pharmaceutical precision.',          44.99, 54.99,  'Pharmaceutical',       'https://lh3.googleusercontent.com/aida-public/AB6AXuAp7HZLMm3p49d6Jn1VL3gmUPR7pbBHMiNl2IvhWDTXHsJRhNNG5TDMBSB_qBUZUKRF6wdkJpa3AR9XM5nu0uO6cUa-wHefNKEXTZaya2iQ9Iw7SZPnLj9y06iESMqugF2Pxigf_kSOc6M5X9qbtxRRz3XK0QSVuXD37Z83s15bmc57Shz2uooIRO2urYbQtmY1K3AvDhcsd7EQvI4UONrYHwclM1DsyX7bZ44ey6lnrfOjgeRZS8MA_tSI3U2JqUTl-WIY9D3rF1c', 'APEX PERFORMANCE MULTI dark glass bottle',      5, 241, true),
  ('ISO-APEX WHEY PROTEIN',   'iso-apex-whey-protein',   'Protein',      'Ultra-pure cold-filtered whey isolate for rapid muscle recovery and lean muscle growth.',                                 54.99, null,   'Third-Party Tested',   'https://lh3.googleusercontent.com/aida-public/AB6AXuCQb1RETlYXDAoOffYwsfs8-jeuv2YTPu2u6T3m7yeU_q0lnMu4q4fcFSnrClNqJo-4ThmQQfuQLUWqGMnbGDw42gsqQPYpdPJcm7h0jAqZReBUi2fdyS8qHuOCFR8BqIIQiqj-J5vvGxp3toibnjhKVMLhe6BGAC6jcbALseBP29zCuKtg6YgIVhkuMHdvimQuLU11APOD8z1esDDAKwDfx0YwYY8VE8Qm4TEwOCQ0zPwaWoq2eb2HWK1CDLb9rUjr33wGAwNJeqY', 'APEX Whey Isolate supplement container',        5, 128, false),
  ('IGNITE PRE-WORKOUT',      'ignite-pre-workout',      'Pre-Workout',  'Explosive energy and laser-sharp focus matrix. NSF certified and banned substance free.',                                 42.00, null,   'Banned Substance Free','https://lh3.googleusercontent.com/aida-public/AB6AXuDTMSlbZ68y5GL46BQhLehpgyCJzNW9Ui9WwGKVBJ0R_gtXlGt2qxT8Ss-l5FCjojmQmrPXC9VyqFpxIgUK8XPlkrnpIb6xRqkseBbr3wc-x24dWSLYp0VgjWibeoPEr8O_KpEvbqWP-aZPE2VEl2Wgsku1H6VpCduL3LLXBbyFOiWIRfBzSiN-v-vyVsyincUcGs9V2S1we4-7zFx6dQYa79gAt-RBNTBXLSy7vRPh7x0MjLpVNxekqOA3V3rRdfl0e6p0PSMKCwI', 'Pre-Apex Ignition pre-workout container',       4,  89, false),
  ('VITA-APEX COMPLEX',       'vita-apex-complex',       'Wellness',     'Essential micronutrients and antioxidants optimized for active individuals. GMP certified facility.',                     29.99, null,   'GMP Certified',        'https://lh3.googleusercontent.com/aida-public/AB6AXuDQ3_SLeVjieU67l0oseRDYNQc_fCZxZI_-vxSEZkn8Jgs9x5KRnewsYO1fKWOZQ2fHQeRNkI1c4m5cbGZuqYLPEvmMWsZox1tjgbEm7sz4K2bk8Jt8zVfnUTiFnjSSAXVkN1nxmKO25-szHrbmw0ajak1vt3YqDOjmu5DNC03xlBiTo6HPrwP4ZqHt6S2I1oCrQvOVolI1U6KgcvLb3_gO7W2Ba701F_R8oopUN9MNW2AJE4iNo_1-RUDsHlaaEFbqSLARvRlY960', 'Apex Multivitamin supplement bottle',           5, 215, false),
  ('CREA-APEX MONOHYDRATE',   'crea-apex-monohydrate',   'Recovery',     'Pure micronized creatine monohydrate for increased power output and muscle endurance.',                                   24.99, null,   'Micronized',           'https://lh3.googleusercontent.com/aida-public/AB6AXuDXaRcX_9hO4TPMNkw7PaaCTagvJEg9qvcp9nEbeML8eDk0RnCb-3gbahe5FsOLLo7gJ083TK76t2QlGqGhleixq0BojI_QhM0lNSaGRIbwQtqOB9QGIDpgBnjScunvHY1pcuAbmBPCPnzyBkU85QXB9TPJoglbob0Ww9jIz8wmD2Bx1rKA-4xJSqqIVjqnYYS8RvXzyWJJFfO-G9niRa65bWPHzLvoQ6KivssZf46RaZnaj3cmmUMiMv8EJ15MscrhV-na1h5m9UE', 'Apex Creatine Monohydrate powder',              5, 342, false),
  ('ELITE SHAKER PRO',        'elite-shaker-pro',        'Accessories',  'Leak-proof, BPA-free shaker with integrated mixing technology and insulated double-wall construction.',                  14.99, null,   null,                   'https://lh3.googleusercontent.com/aida-public/AB6AXuB3wcKvY0LUDKmHhsBdGhhyzFCNd3D51xm7et3f4cNJhFQBe3d-HFNDN9v3Yy_aAeah3FPxxC_n8KcWUXl-65vR0Yw4ydNFLBFhYn8SmSxUfqM4k8C4d2V_GCYRrM1_334rZlBEKE4IF6iEkyQ8x8qz1WcSu_gOvlVTfw7exdXqVz9MbTI-UcTD28aXL-uimGvJX61SjeEZXcdTlYra8nPpbVE35PSfy9VGr0obipcV2L-RZmFkQk0EWshf9QEKB78glfD2A2NJVpI', 'Apex Elite Shaker Pro bottle',                  4,  54, false),
  ('PLANT-APEX PROTEIN',      'plant-apex-protein',      'Protein',      'Complete amino acid profile derived from premium organic plant sources. Smooth texture, zero compromise.',               49.99, null,   'Vegan Certified',      'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEtuzF3V_1-YNm2Omh8tHhrgzxJxOfCOiFZk2xcHHFYPGcFfyG6nE2gKJOJRlFR24drZC92kULFqoc8BUY3cqjuH7Y6fiN4UDjiUmettrKypnQsmOpa0Q7cDP93bf6IQAv17jiEdoXzk1r75Rz7maX6LN9nvMA3tdF-wv9WVhNVkMx5fJULFZDmMkpuNP6Zh8YO3HwZ7OpVhwjgr6vzAGwzBwlRYxHUJx0DOCoL3IZhcNp5YY2oOF6Eg_72ykrdWjdM5gKpJHinU', 'Apex Plant Protein supplement bottle',          5, 167, false),
  ('OMEGA-3 ELITE',           'omega-3-elite',           'Wellness',     'Ultra-pure fish oil concentrate with high EPA/DHA for cardiovascular support and inflammation reduction.',               39.99, 44.99,  'Pharmaceutical',       'https://lh3.googleusercontent.com/aida-public/AB6AXuAp7HZLMm3p49d6Jn1VL3gmUPR7pbBHMiNl2IvhWDTXHsJRhNNG5TDMBSB_qBUZUKRF6wdkJpa3AR9XM5nu0uO6cUa-wHefNKEXTZaya2iQ9Iw7SZPnLj9y06iESMqugF2Pxigf_kSOc6M5X9qbtxRRz3XK0QSVuXD37Z83s15bmc57Shz2uooIRO2urYbQtmY1K3AvDhcsd7EQvI4UONrYHwclM1DsyX7bZ44ey6lnrfOjgeRZS8MA_tSI3U2JqUTl-WIY9D3rF1c', 'Omega-3 Elite soft gels bottle',                4,  76, false),
  ('NIGHT RECOVER PRO',       'night-recover-pro',       'Recovery',     'Advanced ZMA + ashwagandha sleep and recovery stack to optimize deep sleep cycles and hormone balance.',                  54.99, 64.99,  'Clinically Dosed',     'https://lh3.googleusercontent.com/aida-public/AB6AXuDCcFT7CgjD7hlKPvqqAdgkXc_HWyEP_ZUeYcuAo8rVV-h3mRpJO5OAX_qrEbGdU5SKzSk4PL5W7-wFnaqIHJ8MFIXkQzEfPs9fOIy9SwCHMJ45hYTP9S4rSz9ZH3S_x9xYoKQRsqUJxBKvFCAXodK5QprFRbN0t2ZCqAnzoisQbuUYelea2HhyXOBq18t3ftI17FVmbG9qnzJqPXv6gpMrXcMHW75SdeT4meFzxbLQsFK08cPRbQ7z89wqO1lNC6PdZurdtdd7U8TI', 'Night Recover Pro dark bottle',                 5,  93, false)
on conflict (slug) do nothing;


-- ============================================================
-- 2. GOALS
-- ============================================================

insert into public.goals (title, slug, description, image_url, image_alt, sort_order)
values
  ('Muscle Growth', 'muscle',   'Precision-formulated protein and amino blends to maximize hypertrophic response.',                          'https://lh3.googleusercontent.com/aida-public/AB6AXuDd0wk_nDY7Ot3XXlfToU2PfSnxaBIdeptFBqun61kaWiz_PdeaxAMPWo5f9sQdpTaicqgmZOgFz9RrjcYwKUNepyHsjvBOUXpKPfSt7xsNfRt4dkjbte2ZqibV30IZs2tIsPOlCcJtMPfnkXO-tLECFvTBYhArUdkQWfRsVrYXtmPsDjNnnf5YhTeJ2rtt9toyslafudvNQ64OPYE8FpkGa5_V0o7FK_fQ1VvImYcDEdGKU4EuQaLQv24ayBbo3d7KzqaZFtgC-PA', 'Weightlifter hands gripping a heavy barbell', 1),
  ('Energy & Focus','energy',   'Scientifically formulated pre-workout and nootropic blends for sustained mental and physical energy.',    'https://lh3.googleusercontent.com/aida-public/AB6AXuCrssuyzmeyRfKnjIFN8EIqOpiUG0oEwAxyypIhwK16MZxuAXziPR_2jQ-0nFYG4Lbm--h7j9xMfo2_IXDRrckfQwCazowFea64qwFKwwsRdCjc99vrjatSJEkHWp0leRmIRr_fSJE2SmWaRxe7ReI_uepu3MyD2xG_dqfKrWyKyvtHIVZLEC0eMswYTLD2GhppNE4BxkdbWLkBNeAGIHKydwPdjIWlIfmTGHO49-jHq171tdtzNovMmXIeSUaxccP8_VeNqW7bgdo', 'Track athlete at the starting blocks',         2),
  ('Rapid Recovery','recovery', 'Advanced recovery formulas to reduce muscle soreness and get you back to training faster.',                'https://lh3.googleusercontent.com/aida-public/AB6AXuB8yESyKloJ91Hzc9Q7bpet2pVwdMHcwJaJdoRgOmY2ECr_aZnRxf8uM0yCXBrvTxHRk6gSyfAofEUddZpBNwtzG6lOKjdmftwxZ2ojVAK5eHwXrXTzjHqgYHxEK7kk7RpLe1mpW1z0ZhRJgkws5NBaku2DPuOx-VZJjqKSZJuJnVIjhTw_iaXihFqJHpdrOtQgg33ByM6r1x3GjBJ4i_ZXCAGedp2sn1NyD6m5TNQ8o9d_pvvFNKpMHtHG7dJG0__dgG4ZXeLDCnQ', 'Recovery capsules on a clean surface',         3)
on conflict (slug) do nothing;


-- ============================================================
-- 3. [SKIPPED] USERS / PROFILES
--
-- NOTE: Profiles must link to real users in auth.users.
-- Since this is a new project, you should create users 
-- via the Supabase Auth dashboard. The handle_new_user() 
-- trigger will then create their profiles automatically.
-- ============================================================


-- ============================================================
-- 4. INVENTORY (one row per product)
--
-- Columns: product_id, sku, quantity, reserved_quantity,
--          low_stock_threshold, warehouse_location
-- ============================================================

insert into public.inventory
  (product_id, sku, quantity, reserved_quantity, low_stock_threshold, warehouse_location)
select
  p.id,
  inv.sku,
  inv.quantity,
  inv.reserved,
  inv.threshold,
  inv.location
from public.products p
join (values
  -- slug,                      sku,              qty, reserved, threshold, location
  ('apex-iso-pure-isolate',   'NGS-PROT-001',   245,  12,       30,  'A1-S3'),
  ('pre-ignite-neurofuse',    'NGS-PRWK-001',   180,   8,       25,  'A2-S1'),
  ('recover-7-elite-bcaa',    'NGS-RCVR-001',   310,  15,       30,  'A3-S2'),
  ('apex-performance-multi',  'NGS-WELL-001',   420,   5,       40,  'B1-S1'),
  ('iso-apex-whey-protein',   'NGS-PROT-002',   155,  20,       30,  'A1-S4'),
  ('ignite-pre-workout',      'NGS-PRWK-002',    18,   3,       20,  'A2-S2'),  -- LOW STOCK
  ('vita-apex-complex',       'NGS-WELL-002',   500,   0,       50,  'B1-S2'),
  ('crea-apex-monohydrate',   'NGS-RCVR-002',   275,  10,       25,  'A3-S3'),
  ('elite-shaker-pro',        'NGS-ACCS-001',    62,   2,       15,  'C1-S1'),
  ('plant-apex-protein',      'NGS-PROT-003',    95,   7,       20,  'A1-S5'),
  ('omega-3-elite',           'NGS-WELL-003',     0,   0,       20,  'B2-S1'),  -- OUT OF STOCK
  ('night-recover-pro',       'NGS-RCVR-003',   130,   4,       20,  'A3-S4')
) as inv(slug, sku, quantity, reserved, threshold, location)
  on p.slug = inv.slug
on conflict (product_id) do update
  set quantity           = excluded.quantity,
      reserved_quantity  = excluded.reserved_quantity,
      low_stock_threshold= excluded.low_stock_threshold,
      warehouse_location = excluded.warehouse_location,
      updated_at         = now();


-- ============================================================
-- 5. VERIFY — quick summary after seeding
-- ============================================================

select 'products'             as table_name, count(*) as rows from public.products       union all
select 'goals'                as table_name, count(*) as rows from public.goals           union all
select 'profiles'             as table_name, count(*) as rows from public.profiles        union all
select 'inventory'            as table_name, count(*) as rows from public.inventory       union all
select 'newsletter_subscribers',             count(*)          from public.newsletter_subscribers;

-- Stock status summary
select stock_status, count(*) as products
from public.inventory_status
group by stock_status
order by stock_status;
