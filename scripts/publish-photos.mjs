// Einmal-Skript: kuratierte Fotos aus Hausprojekt/uploads/ komprimieren,
// sprechend umbenennen und nach public/altbau/ kopieren.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'C:/src/homepage';
const SRC = path.join(ROOT, 'Hausprojekt', 'uploads');
const OUT = path.join(ROOT, 'public', 'altbau');

const jobs = [
  ['2025-09-boeden-bad-gaube/28a6c199-9b76-4263-be67-72afc1667d89.jpeg', 'altes-grohe-vorwandelement.jpg'],
  ['2025-09-boeden-bad-gaube/a80593c4-3527-4b7c-971b-da07a19c3aec.jpeg', 'geberit-vorwandelement-neu.jpg'],
  ['2025-09-boeden-bad-gaube/cd45f3b0-0d3e-450f-bb0d-a6346de2ab70.jpeg', 'bad-og-fertig.jpg'],
  ['2025-09-boeden-bad-gaube/IMG_9013.jpeg', 'gaube-trocknungsgeraet.jpg'],
  ['2025-09-boeden-bad-gaube/b5a73050-f247-42de-80ab-ff45eff7fe8a.jpeg', 'schlafzimmer-ecke-schaden.jpg'],
  ['2025-09-boeden-bad-gaube/IMG_AC731EC5-529F-483A-8A2C-6C3CE446BF32.jpeg', 'rohrbruch-defektes-stueck.jpg'],

  ['2025-12-heizungs-saga/IMG_9948.jpeg', 'ventiltausch-nahaufnahme.jpg'],
  ['2025-12-heizungs-saga/bc9fa5e4-4652-467a-9180-7aee3ef7242b.jpeg', 'wasserschaden-decke-entdeckt.jpg'],
  ['2025-12-heizungs-saga/2d76da34-2ae5-4f10-bb5c-8c08dfe10010.jpeg', 'flurheizung-neue-rohre.jpg'],
  ['2025-12-heizungs-saga/964b368b-14f9-45e8-b99b-3f7e21687d06.jpeg', 'wohnzimmer-neu-verputzt.jpg'],

  ['2026-01-rueckblick/d56ceb8c-26fa-46f2-95e9-f1388647ddc0.jpeg', 'kinderzimmer-bodenaufbau-januar.jpg'],
  ['2026-01-rueckblick/5f188805-3bd0-4475-a3fe-fb014efd667e.jpeg', 'schlafzimmer-fertig.jpg'],

  ['2026-02-rueckblick/IMG_0429.jpeg', 'kuechentuer-vorher.jpg'],
  ['2026-02-rueckblick/IMG_0423.jpeg', 'kuechentuer-streichen.jpg'],
  ['2026-02-rueckblick/5a31eb16-780f-4139-89d8-033e990ceb77.jpeg', 'kuechentuer-montiert.jpg'],
  ['2026-02-rueckblick/IMG_0155.jpeg', 'kinderzimmer-clickvinyl-test.jpg'],
  ['2026-02-rueckblick/IMG_0611.jpeg', 'terrasse-kaercher-vorher-nachher.jpg'],

  ['2026-03-rueckblick/a2728261-7e7e-47d7-842f-76603ed73cf3.jpeg', 'haengelampe-esszimmer.jpg'],
  ['2026-03-rueckblick/dd952023-88c4-434d-825d-3a0c43075691.jpeg', 'garten-ausgehobenes-beet-hund.jpg'],
  ['2026-03-rueckblick/IMG_0695.jpeg', 'garten-werkzeug-heckenschnitt.jpg'],

  ['2026-04-rueckblick/IMG_1053.jpeg', 'graben-kabel-verlegt.jpg'],
  ['2026-04-rueckblick/IMG_1038.jpeg', 'graben-hausanschluss.jpg'],
  ['2026-04-rueckblick/f0cc983e-516f-41d9-865a-aa6234b5e90a.jpeg', 'neues-beet-strauchpflanzung.jpg'],
  ['2026-04-rueckblick/IMG_1081.jpeg', 'beet-weg-hund.jpg'],
  ['2026-04-rueckblick/IMG_1097.jpeg', 'kirschbaum-gepflanzt.jpg'],
  ['2026-04-rueckblick/IMG_5AF45DFC-9D1E-4305-BC46-01F18D708F9E.jpeg', 'kirschbaum-verankerung.jpg'],

  ['2026-07-kinderzimmer-fertig/IMG_1936.jpeg', 'kinderzimmer-fertig.jpg'],
];

async function run() {
  await mkdir(OUT, { recursive: true });
  for (const [src, destName] of jobs) {
    const srcPath = path.join(SRC, src);
    const destPath = path.join(OUT, destName);
    await sharp(srcPath).rotate().resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 68, mozjpeg: true }).toFile(destPath);
    console.log(destName, 'ok');
  }
  console.log(`\n${jobs.length} Bilder verarbeitet.`);
}

run().catch((e) => { console.error(e); process.exit(1); });
