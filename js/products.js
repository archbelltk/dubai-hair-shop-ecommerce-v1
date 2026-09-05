// Shared product catalog for the shop, category, cart, and product pages.
const DHS_PRODUCTS = [
  // Hair Extensions
  { id: 'hair-brazilian-straight', name: 'Brazilian Straight Bundle', category: 'hair-extensions', categoryLabel: 'Hair Extensions', price: 850, image: 'img/brazilian-straight-bundle.webp', badge: 'Bestseller', description: 'Silky, tangle-free Brazilian human hair bundles with a natural shine that blends seamlessly with any texture.' },
  { id: 'hair-deep-wave-lace', name: 'Deep Wave Lace Front', category: 'hair-extensions', categoryLabel: 'Hair Extensions', price: 1450, image: 'img/deep-wave-lace-front.webp', badge: 'New', description: 'A pre-plucked deep wave lace front wig for a natural hairline and effortless glam, install-ready.' },
  { id: 'hair-peruvian-body-wave', name: 'Peruvian Body Wave Bundle', category: 'hair-extensions', categoryLabel: 'Hair Extensions', price: 780, image: null, description: 'Soft, bouncy Peruvian body wave bundles that hold their curl pattern wash after wash.' },
  { id: 'hair-curly-closure-wig', name: 'Curly Closure Wig', category: 'hair-extensions', categoryLabel: 'Hair Extensions', price: 1650, image: null, description: 'A voluminous curly closure wig crafted from 100% virgin human hair for a full, natural look.' },
  { id: 'hair-613-blonde-frontal', name: '613 Blonde Frontal Wig', category: 'hair-extensions', categoryLabel: 'Hair Extensions', price: 1900, image: null, description: 'A vibrant 613 blonde frontal wig, pre-bleached and ready to customize for any bold look.' },

  // Fashion Design
  { id: 'fashion-ankara-midi-dress', name: 'Ankara Midi Dress', category: 'fashion-design', categoryLabel: 'Fashion Design', price: 620, originalPrice: 780, image: 'img/ankara-midi-dress.webp', badge: 'Sale', description: 'A vibrant Ankara midi dress tailored for a flattering silhouette, perfect for day-to-night styling.' },
  { id: 'fashion-kente-wrap-skirt', name: 'Kente Wrap Skirt', category: 'fashion-design', categoryLabel: 'Fashion Design', price: 540, image: null, description: 'A bold Kente-print wrap skirt that celebrates heritage with a modern, versatile cut.' },
  { id: 'fashion-ankara-jumpsuit', name: 'Ankara Print Jumpsuit', category: 'fashion-design', categoryLabel: 'Fashion Design', price: 690, image: null, description: 'A statement Ankara print jumpsuit designed for comfort and standout style.' },
  { id: 'fashion-bespoke-kaftan', name: 'Bespoke Kaftan Gown', category: 'fashion-design', categoryLabel: 'Fashion Design', price: 980, image: null, description: 'A flowing bespoke kaftan gown, hand-finished with rich detailing for special occasions.' },
  { id: 'fashion-beaded-blazer', name: 'Beaded Ankara Blazer', category: 'fashion-design', categoryLabel: 'Fashion Design', price: 1150, image: null, badge: 'New', description: 'A beaded Ankara blazer that pairs bold print with elevated, tailored craftsmanship.' },

  // Natural Skincare
  { id: 'skincare-shea-glow-serum', name: 'Shea Glow Face Serum', category: 'natural-skincare', categoryLabel: 'Natural Skincare', price: 1200, image: 'img/shea-glow-face Serum.webp', description: 'A nourishing face serum blended with shea and African botanicals for a radiant, even-toned glow.' },
  { id: 'skincare-black-soap', name: 'African Black Soap Bar', category: 'natural-skincare', categoryLabel: 'Natural Skincare', price: 95, image: null, description: 'Traditional African black soap that gently cleanses and balances melanin-rich skin.' },
  { id: 'skincare-cocoa-butter-cream', name: 'Cocoa Butter Body Cream', category: 'natural-skincare', categoryLabel: 'Natural Skincare', price: 220, image: null, description: 'A rich cocoa butter body cream that deeply moisturizes for soft, glowing skin all day.' },
  { id: 'skincare-baobab-toner', name: 'Baobab Hydrating Toner', category: 'natural-skincare', categoryLabel: 'Natural Skincare', price: 260, image: null, badge: 'New', description: 'A hydrating baobab-infused toner that refreshes and preps skin for your routine.' },
  { id: 'skincare-melanin-face-oil', name: 'Melanin Radiance Face Oil', category: 'natural-skincare', categoryLabel: 'Natural Skincare', price: 340, image: null, description: 'A lightweight radiance face oil formulated to enhance melanin-rich complexions naturally.' },
];

const DHS_CATEGORIES = [
  { slug: 'hair-extensions', label: 'Hair Extensions' },
  { slug: 'fashion-design', label: 'Fashion Design' },
  { slug: 'natural-skincare', label: 'Natural Skincare' },
];
