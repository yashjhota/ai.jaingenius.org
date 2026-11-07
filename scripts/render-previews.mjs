/**
 * Renders PNG previews for downloadable SVG files.
 *   public/downloads/<name>.svg → src/assets/previews/<name>.png
 *
 * Run after adding or changing a design: `npm run previews`.
 * Astro then optimises the PNGs (WebP, responsive sizes) at build time.
 */
import { readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const src = 'public/downloads';
const out = 'src/assets/previews';
const MAX_WIDTH = 1200;

mkdirSync(out, { recursive: true });

for (const file of readdirSync(src).filter((f) => f.endsWith('.svg'))) {
  const target = join(out, file.replace(/\.svg$/, '.png'));
  const image = sharp(join(src, file), { density: 144 });
  const { width = MAX_WIDTH } = await image.metadata();
  await image
    .resize({ width: Math.min(width * 2, MAX_WIDTH), withoutEnlargement: false })
    .flatten({ background: '#ffffff' })
    .png({ compressionLevel: 9 })
    .toFile(target);
  console.log(`${file} → ${target}`);
}
