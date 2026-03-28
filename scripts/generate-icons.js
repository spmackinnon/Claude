#!/usr/bin/env node
/**
 * Generates PNG app icons for the PWA using only Node.js built-ins.
 * No external dependencies required.
 *
 * Creates:
 *   public/icon-192.png  (192×192)
 *   public/icon-512.png  (512×512)
 */
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

// ── CRC32 (required by PNG spec) ──────────────────────────────────────
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ buf[i]) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii');
  const crcVal = crc32(Buffer.concat([typeBytes, data]));
  const out = Buffer.alloc(4 + 4 + data.length + 4);
  out.writeUInt32BE(data.length, 0);
  typeBytes.copy(out, 4);
  data.copy(out, 8);
  out.writeUInt32BE(crcVal, 8 + data.length);
  return out;
}

// ── Icon drawing ──────────────────────────────────────────────────────
// Draws a sage-green rounded square with a white house silhouette
function drawIcon(size) {
  // Each pixel: [R, G, B, A]
  const pixels = new Uint8Array(size * size * 4);

  const bg   = [78,  114, 78,  255]; // sage green #4E724E
  const fg   = [255, 255, 255, 255]; // white
  const dark = [50,  80,  50,  255]; // darker green for depth

  const cx = size / 2;
  const cy = size / 2;
  const r  = size * 0.42; // corner radius for rounded square feel

  // Helper: distance from rounded-square edge
  function inRoundedSquare(x, y) {
    const dx = Math.max(Math.abs(x - cx) - r * 0.58, 0);
    const dy = Math.max(Math.abs(y - cy) - r * 0.58, 0);
    return dx * dx + dy * dy < (r * 0.42) * (r * 0.42);
  }

  // House shape: roof triangle + body rectangle
  function inHouse(x, y) {
    const scale = size / 512;
    // Normalize to 0-512 space
    const nx = x / scale;
    const ny = y / scale;

    // Body rectangle
    const bodyL = 160, bodyR = 352, bodyT = 290, bodyB = 410;
    if (nx >= bodyL && nx <= bodyR && ny >= bodyT && ny <= bodyB) return true;

    // Door
    const doorL = 220, doorR = 292, doorT = 330, doorB = 410;
    if (nx >= doorL && nx <= doorR && ny >= doorT && ny <= doorB) return false; // cutout for door

    // Roof triangle: peak at (256, 130), base at y=295 from x=140 to x=372
    const roofPeakX = 256, roofPeakY = 135;
    const roofBaseY = 300;
    const roofBaseL = 140, roofBaseR = 372;
    if (ny >= roofPeakY && ny <= roofBaseY) {
      const t = (ny - roofPeakY) / (roofBaseY - roofPeakY);
      const lx = roofPeakX + t * (roofBaseL - roofPeakX);
      const rx = roofPeakX + t * (roofBaseR - roofPeakX);
      if (nx >= lx && nx <= rx) return true;
    }
    return false;
  }

  // Door cutout check
  function inDoor(x, y) {
    const scale = size / 512;
    const nx = x / scale, ny = y / scale;
    return nx >= 220 && nx <= 292 && ny >= 330 && ny <= 410;
  }

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const inSquare = inRoundedSquare(x, y);
      const house = inHouse(x, y);
      const door  = inDoor(x, y);

      let color;
      if (!inSquare) {
        color = [0, 0, 0, 0]; // transparent outside
      } else if (house && !door) {
        color = fg; // white house
      } else {
        color = bg; // green background
      }

      pixels[idx]     = color[0];
      pixels[idx + 1] = color[1];
      pixels[idx + 2] = color[2];
      pixels[idx + 3] = color[3];
    }
  }
  return pixels;
}

function buildPNG(size) {
  const pixels = drawIcon(size);

  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr.writeUInt8(8, 8);  // 8-bit depth
  ihdr.writeUInt8(6, 9);  // RGBA
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);

  // Raw scanlines: 1 filter byte + 4 bytes per pixel
  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let y = 0; y < size; y++) {
    raw[y * (1 + size * 4)] = 0; // filter: None
    for (let x = 0; x < size; x++) {
      const src = (y * size + x) * 4;
      const dst = y * (1 + size * 4) + 1 + x * 4;
      raw[dst]     = pixels[src];
      raw[dst + 1] = pixels[src + 1];
      raw[dst + 2] = pixels[src + 2];
      raw[dst + 3] = pixels[src + 3];
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 6 });

  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── Generate icons ────────────────────────────────────────────────────
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

for (const size of [192, 512]) {
  const filePath = path.join(publicDir, `icon-${size}.png`);
  fs.writeFileSync(filePath, buildPNG(size));
  console.log(`✓ Created ${filePath} (${size}×${size})`);
}
console.log('\nIcons ready.');
