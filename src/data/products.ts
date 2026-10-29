import type { Category, Product, Size } from '../types'

const allSizes: Size[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

export const products: Product[] = [
  {
    id: 'gulabi-rose-saree', name: 'Gulabi Rose Saree', category: 'Sarees', price: 3290,
    description: 'A graceful drape imagined in soft rose tones, with a delicate border for celebrations and slow evenings alike.',
    colors: [{ name: 'Rose', hex: '#bc7779' }, { name: 'Ivory', hex: '#e5d6bd' }], sizes: allSizes, artwork: 'rose', badge: 'Demo design',
  },
  {
    id: 'chandni-kurti', name: 'Chandni Embroidered Kurti', category: 'Kurtis', price: 1890,
    description: 'An easy, polished silhouette with a subtle handcrafted feel, designed to move from weekday plans to dinner out.',
    colors: [{ name: 'Ivory', hex: '#e6dbc7' }, { name: 'Wine', hex: '#763e4c' }], sizes: allSizes, artwork: 'chandni',
  },
  {
    id: 'gulmohar-coord', name: 'Gulmohar Co-ord Set', category: 'Co-ord Sets', price: 2490,
    description: 'A relaxed two-piece look with a little structure, made for days when getting dressed should feel effortless.',
    colors: [{ name: 'Terracotta', hex: '#b76f5d' }, { name: 'Moss', hex: '#737b5a' }], sizes: allSizes, artwork: 'gulmohar', badge: 'Demo design',
  },
  {
    id: 'mehfil-midi-dress', name: 'Mehfil Printed Dress', category: 'Dresses', price: 2190,
    description: 'A softly gathered dress concept with a flowing skirt and a playful print inspired by garden evenings.',
    colors: [{ name: 'Berry', hex: '#a45163' }, { name: 'Midnight', hex: '#3e4655' }], sizes: allSizes, artwork: 'mehfil',
  },
  {
    id: 'noor-handloom-saree', name: 'Noor Handloom Saree', category: 'Sarees', price: 3790,
    description: 'A timeless handloom-inspired palette with a considered contrast border, pictured here as a design study.',
    colors: [{ name: 'Sage', hex: '#8b987d' }, { name: 'Burgundy', hex: '#743c49' }], sizes: allSizes, artwork: 'noor',
  },
  {
    id: 'saanjh-kurti-set', name: 'Saanjh Kurti Set', category: 'Kurtis', price: 2690,
    description: 'A longline kurti and coordinating bottom in a warm, understated palette for everyday elegance.',
    colors: [{ name: 'Dusty Rose', hex: '#c18b88' }, { name: 'Sand', hex: '#c7ac8e' }], sizes: allSizes, artwork: 'saanjh', badge: 'Demo design',
  },
  {
    id: 'indrani-coord', name: 'Indrani Evening Co-ord', category: 'Co-ord Sets', price: 2890,
    description: 'A statement set concept with a fluid fit and jewel-toned accents, created for festive gatherings.',
    colors: [{ name: 'Plum', hex: '#73506b' }, { name: 'Teal', hex: '#477975' }], sizes: allSizes, artwork: 'indrani',
  },
  {
    id: 'amaltas-dress', name: 'Amaltas Anarkali Dress', category: 'Dresses', price: 3190,
    description: 'A festive, flowing shape inspired by golden blooms and graceful movement. This is illustrative demo data.',
    colors: [{ name: 'Marigold', hex: '#c58a3d' }, { name: 'Rose', hex: '#b76d73' }], sizes: allSizes, artwork: 'amaltas',
  },
]

export const categoryArtworks: Record<Category, string> = {
  Sarees: 'rose', Kurtis: 'chandni', 'Co-ord Sets': 'gulmohar', Dresses: 'mehfil',
}