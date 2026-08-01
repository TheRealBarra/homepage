// Lokaler Foto-Upload-Helfer fuers Altbau-Bautagebuch.
// Start: node scripts/photo-upload-server.mjs
// Dann auf dem Handy (selbes LAN) die angezeigte Adresse oeffnen.
//
// Liest die Zieleintraege direkt aus src/content/altbau/*.md (Frontmatter),
// nimmt Fotos vom Handy per Datei-Upload entgegen und legt sie unter
// Hausprojekt/uploads/<eintrag-slug>/ ab -- als Rohmaterial, so wie es
// BAUTAGEBUCH.md fuer Hausprojekt/ vorsieht. Die eigentliche Auswahl und
// der Umzug nach public/altbau/ bleibt bewusst ein manueller, spaeterer
// Schritt.

import { createServer } from 'node:http';
import { readdir, readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { networkInterfaces } from 'node:os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ALTBAU_DIR = path.join(ROOT, 'src', 'content', 'altbau');
const UPLOAD_DIR = path.join(ROOT, 'Hausprojekt', 'uploads');
const PORT = 4173;

const MAX_BODY_BYTES = 60 * 1024 * 1024; // ~60 MB, reicht fuer ein Foto/Video als Base64-JSON

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    const m = line.match(/^(\w+):\s*(.*)$/);
    if (!m) continue;
    const [, key, rawValue] = m;
    let value = rawValue.trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    fm[key] = value;
  }
  return fm;
}

async function loadTargets() {
  const files = (await readdir(ALTBAU_DIR)).filter((f) => f.endsWith('.md'));
  const targets = [];
  for (const file of files) {
    const raw = await readFile(path.join(ALTBAU_DIR, file), 'utf8');
    const fm = parseFrontmatter(raw);
    if (!fm) continue;
    const slug = file.replace(/\.md$/, '');
    const uploadedCount = await countUploaded(slug);
    targets.push({
      slug,
      title: fm.title || slug,
      pubDate: fm.pubDate || '',
      status: fm.status || '',
      uploadedCount,
    });
  }
  targets.sort((a, b) => (a.pubDate < b.pubDate ? -1 : a.pubDate > b.pubDate ? 1 : 0));
  return targets;
}

async function countUploaded(slug) {
  const dir = path.join(UPLOAD_DIR, slug);
  if (!existsSync(dir)) return 0;
  const files = await readdir(dir);
  return files.length;
}

function safeFilename(name) {
  const base = path.basename(name).replace(/[^\w.\-]+/g, '_');
  return base || `foto_${Date.now()}`;
}

async function uniquePath(dir, filename) {
  let candidate = path.join(dir, filename);
  if (!existsSync(candidate)) return candidate;
  const ext = path.extname(filename);
  const stem = filename.slice(0, filename.length - ext.length);
  let i = 2;
  while (existsSync(candidate)) {
    candidate = path.join(dir, `${stem}_${i}${ext}`);
    i++;
  }
  return candidate;
}

function sendJson(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

async function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('payload_too_large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

const PAGE = `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Altbau-Fotos hochladen</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: -apple-system, system-ui, sans-serif; margin: 0; padding: 1rem 1rem 4rem; max-width: 640px; margin-inline: auto; background: #0f172a; color: #e2e8f0; }
  h1 { font-size: 1.25rem; margin: 0 0 .25rem; }
  p.hint { color: #94a3b8; font-size: .875rem; margin-top: 0; }
  .entry { border: 1px solid #334155; border-radius: 12px; padding: .875rem 1rem; margin-bottom: .75rem; background: #1e293b; }
  .entry-head { display: flex; justify-content: space-between; align-items: baseline; gap: .5rem; }
  .entry-title { font-weight: 600; font-size: .95rem; }
  .entry-date { font-size: .75rem; color: #94a3b8; white-space: nowrap; }
  .entry-count { display: inline-block; margin-top: .35rem; font-size: .75rem; padding: .1rem .5rem; border-radius: 999px; background: #334155; color: #cbd5e1; }
  .entry-count.has-photos { background: #14532d; color: #86efac; }
  label.upload-btn { display: block; margin-top: .6rem; text-align: center; padding: .6rem; border-radius: 8px; background: #f59e0b; color: #1e293b; font-weight: 600; font-size: .875rem; cursor: pointer; }
  input[type=file] { display: none; }
  .status { font-size: .75rem; margin-top: .5rem; color: #94a3b8; }
  .status.ok { color: #86efac; }
  .status.err { color: #fca5a5; }
  .progress { font-size: .7rem; color: #64748b; }
</style>
</head>
<body>
  <h1>Fotos zuordnen</h1>
  <p class="hint">Pro Eintrag Fotos direkt aus der Mediathek auswaehlen. Landet unrouted als Rohmaterial in <code>Hausprojekt/uploads/&lt;eintrag&gt;/</code> -- Auswahl fuer den Blog bleibt ein spaeterer Schritt.</p>
  <div id="list">Lade...</div>

<script>
async function load() {
  const res = await fetch('/api/targets');
  const targets = await res.json();
  const list = document.getElementById('list');
  list.innerHTML = '';
  for (const t of targets) {
    const el = document.createElement('div');
    el.className = 'entry';
    el.innerHTML = \`
      <div class="entry-head">
        <span class="entry-title">\${escapeHtml(t.title)}</span>
        <span class="entry-date">\${t.pubDate}</span>
      </div>
      <span class="entry-count \${t.uploadedCount > 0 ? 'has-photos' : ''}">\${t.uploadedCount} Foto(s) hochgeladen</span>
      <label class="upload-btn">
        + Fotos hinzufuegen
        <input type="file" accept="image/*,video/*" multiple data-slug="\${t.slug}">
      </label>
      <div class="status"></div>
    \`;
    const input = el.querySelector('input');
    const statusEl = el.querySelector('.status');
    const countEl = el.querySelector('.entry-count');
    input.addEventListener('change', async () => {
      const files = Array.from(input.files || []);
      if (!files.length) return;
      let done = 0;
      statusEl.className = 'status';
      statusEl.textContent = \`0 / \${files.length} hochgeladen...\`;
      for (const file of files) {
        try {
          const dataUrl = await fileToDataUrl(file);
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ target: t.slug, filename: file.name || 'foto.jpg', dataUrl }),
          });
          if (!res.ok) throw new Error(await res.text());
          done++;
          statusEl.className = 'status';
          statusEl.textContent = \`\${done} / \${files.length} hochgeladen...\`;
        } catch (err) {
          statusEl.className = 'status err';
          statusEl.textContent = 'Fehler bei ' + file.name + ': ' + err.message;
        }
      }
      statusEl.className = 'status ok';
      statusEl.textContent = \`Fertig: \${done} / \${files.length} hochgeladen.\`;
      const countRes = await fetch('/api/targets');
      const fresh = await countRes.json();
      const match = fresh.find((x) => x.slug === t.slug);
      if (match) {
        countEl.textContent = \`\${match.uploadedCount} Foto(s) hochgeladen\`;
        countEl.className = 'entry-count ' + (match.uploadedCount > 0 ? 'has-photos' : '');
      }
      input.value = '';
    });
    list.appendChild(el);
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

load();
</script>
</body>
</html>`;

const server = createServer(async (req, res) => {
  try {
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(PAGE);
      return;
    }

    if (req.method === 'GET' && req.url === '/api/targets') {
      const targets = await loadTargets();
      sendJson(res, 200, targets);
      return;
    }

    if (req.method === 'POST' && req.url === '/api/upload') {
      const body = await readBody(req);
      const { target, filename, dataUrl } = JSON.parse(body.toString('utf8'));

      const targets = await loadTargets();
      const known = targets.some((t) => t.slug === target);
      if (!known) {
        sendJson(res, 400, { error: 'unknown_target' });
        return;
      }
      const match = /^data:([\w/.+-]+);base64,(.*)$/s.exec(dataUrl || '');
      if (!match) {
        sendJson(res, 400, { error: 'invalid_data_url' });
        return;
      }
      const buffer = Buffer.from(match[2], 'base64');

      const dir = path.join(UPLOAD_DIR, target);
      await mkdir(dir, { recursive: true });
      const dest = await uniquePath(dir, safeFilename(filename || 'foto.jpg'));
      await writeFile(dest, buffer);

      sendJson(res, 200, { ok: true, savedAs: path.basename(dest) });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
  } catch (err) {
    if (err.message === 'payload_too_large') {
      sendJson(res, 413, { error: 'payload_too_large' });
      return;
    }
    console.error(err);
    sendJson(res, 500, { error: 'server_error', message: err.message });
  }
});

// Virtuelle/getunnelte Adapter (Spiele-Hosting, VPN, Virtualisierung) haben
// oft eine IPv4-Adresse und werden von os.networkInterfaces() nicht als
// "internal" markiert -- fuer ein Handy im selben WLAN sind sie aber falsch.
// Wir sortieren sie heuristisch aus und heben echte WLAN/Ethernet-Adapter hervor.
const SUSPICIOUS_ADAPTER_PATTERN = /vpn|virtual|hamachi|radmin|tailscale|zerotier|hyper-v|vmware|virtualbox|terraria|wireguard|tunnel/i;
const LIKELY_ADAPTER_PATTERN = /wlan|wi-?fi|wireless|ethernet|lan/i;

function lanAddresses() {
  const nets = networkInterfaces();
  const out = [];
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family !== 'IPv4' || net.internal) continue;
      out.push({
        name,
        address: net.address,
        suspicious: SUSPICIOUS_ADAPTER_PATTERN.test(name),
        likely: LIKELY_ADAPTER_PATTERN.test(name),
      });
    }
  }
  // Wahrscheinliche Adapter (WLAN/Ethernet) zuerst, verdaechtige zuletzt.
  out.sort((a, b) => Number(b.likely) - Number(a.likely) || Number(a.suspicious) - Number(b.suspicious));
  return out;
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\nFoto-Upload-Server laeuft.\n`);
  console.log(`Auf dem PC:  http://localhost:${PORT}`);
  const addrs = lanAddresses();
  for (const a of addrs) {
    const tag = a.suspicious ? '  <- vermutlich VPN/virtuell, NICHT verwenden' : a.likely ? '  <- WLAN/Ethernet, diese nehmen' : '';
    console.log(`Auf dem Handy (selbes WLAN): http://${a.address}:${PORT}   [${a.name}]${tag}`);
  }
  console.log(`\nFotos landen unter: ${path.relative(ROOT, UPLOAD_DIR)}\\<eintrag>\\`);
  console.log('Zum Beenden: Strg+C\n');
});
