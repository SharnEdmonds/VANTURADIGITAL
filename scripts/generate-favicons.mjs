/**
 * Generate favicon files from logo-icon.webp
 * Run with: node scripts/generate-favicons.mjs
 */

import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const logoPath = join(publicDir, 'images', 'logo-icon.webp');

async function generateFavicons() {
    console.log('🎨 Generating favicons from logo-icon.webp...\n');

    // Read the source logo
    const logo = sharp(logoPath);

    // Get metadata to ensure proper cropping
    const metadata = await logo.metadata();
    console.log(`Source: ${metadata.width}x${metadata.height}`);

    // Generate PNG icons at various sizes
    const sizes = [16, 32, 48, 180, 192, 512];

    for (const size of sizes) {
        const outputPath = size === 180
            ? join(publicDir, 'apple-touch-icon.png')
            : join(publicDir, `icon-${size}.png`);

        await sharp(logoPath)
            .resize(size, size, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png()
            .toFile(outputPath);

        console.log(`✅ Generated: ${size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`} (${size}x${size})`);
    }

    // Generate favicon.ico (multi-resolution ICO requires a different approach)
    // For simplicity, we'll create a 32x32 PNG and rename it
    // Note: True .ico files need special handling, but modern browsers accept PNG
    await sharp(logoPath)
        .resize(32, 32, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(join(publicDir, 'favicon.ico'));

    console.log('✅ Generated: favicon.ico (32x32)');

    // Also create a proper SVG-based icon if possible (copy for reference)
    console.log('\n🎉 All favicons generated successfully!');
    console.log('\nNext steps:');
    console.log('1. Verify the icons look correct in /public/');
    console.log('2. Rebuild and deploy your site');
    console.log('3. Request Google to recrawl your site via Search Console');
}

generateFavicons().catch(console.error);
