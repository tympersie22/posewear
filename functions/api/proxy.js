// Stateless, same-origin image-provider proxy. Request bodies and credentials
// are streamed through and are never logged or stored by application code.
const API_PATH = /^\/(api\/v3|v\d+(beta|alpha)?)\/(images\/(edits|generations)|models\/[^/]+:generateContent)$/;
const CUSTOM_PATH = /\/(images\/(edits|generations)|models\/[^/]+:generateContent)$/;
const OFFICIAL = [/^api\.openai\.com$/, /^generativelanguage\.googleapis\.com$/, /^ark\.[a-z0-9-]+\.volces\.com$/, /^ark\.[a-z0-9-]+\.bytepluses\.com$/];
const IMAGE_HOSTS = [/^oaidalleapiprodscus\.blob\.core\.windows\.net$/, /(^|\.)volces\.com$/, /(^|\.)bytepluses\.com$/, /(^|\.)googleusercontent\.com$/];
const DROP_HEADERS = new Set(['host', 'x-target-url', 'x-proxy-kind', 'x-proxy-custom', 'cookie', 'origin', 'referer', 'x-forwarded-for', 'x-forwarded-proto', 'x-real-ip', 'content-length', 'sec-fetch-site', 'sec-fetch-mode', 'sec-fetch-dest']);
const WINDOW_MS = 60_000;
const MAX_API_REQUESTS = 20;
const MAX_IMAGE_REQUESTS = 40;
const MAX_BODY_BYTES = 25 * 1024 * 1024;

function json(status, message) {
  return new Response(JSON.stringify({ error: { message } }), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } });
}

function isSameOrigin(request) {
  const self = new URL(request.url).origin;
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  if (!origin && !referer) return false;
  try {
    if (origin && new URL(origin).origin !== self) return false;
    if (referer && new URL(referer).origin !== self) return false;
    return true;
  } catch { return false; }
}

function isPrivateHost(hostname) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (host === 'localhost' || host.endsWith('.localhost') || host === '::1' || host.includes(':')) return true;
  const match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (!match) return false;
  const [a, b] = match.slice(1).map(Number);
  return a === 0 || a === 10 || a === 127 || a >= 224 || (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
}

async function rateLimited(request, kind) {
  // Approximate per-PoP protection. Add an account-level Cloudflare rate
  // limiting rule for an atomic global ceiling without changing application code.
  try {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
    const keyId = [...new Uint8Array(digest).slice(0, 12)].map(v => v.toString(16).padStart(2, '0')).join('');
    const bucket = Math.floor(Date.now() / WINDOW_MS);
    const key = new Request(`https://posewear-rate.invalid/${kind}/${keyId}/${bucket}`);
    const cache = caches.default;
    const previous = await cache.match(key);
    const count = (previous ? Number(await previous.text()) || 0 : 0) + 1;
    await cache.put(key, new Response(String(count), { headers: { 'cache-control': 'max-age=120' } }));
    return count > (kind === 'image' ? MAX_IMAGE_REQUESTS : MAX_API_REQUESTS);
  } catch { return false; }
}

export async function onRequest(context) {
  const { request } = context;
  if (request.method === 'OPTIONS') return isSameOrigin(request) ? new Response(null, { status: 204 }) : json(403, 'Cross-origin requests are not allowed.');
  if (!['GET', 'POST'].includes(request.method)) return json(405, 'Only GET and POST are supported.');
  if (!isSameOrigin(request)) return json(403, 'Only same-origin requests are accepted.');

  let target;
  try { target = new URL(request.headers.get('x-target-url') || ''); }
  catch { return json(400, 'The x-target-url header is missing or invalid.'); }
  if (target.username || target.password) return json(400, 'Target URLs cannot contain credentials.');
  const isOfficial = OFFICIAL.some(pattern => pattern.test(target.hostname));
  if (target.protocol !== 'https:' || target.port && target.port !== '443') return json(400, 'Provider and relay targets must use standard HTTPS.');

  const isImage = request.headers.get('x-proxy-kind') === 'image';
  if (isImage) {
    if (request.method !== 'GET') return json(405, 'Image downloads only support GET.');
    if (!IMAGE_HOSTS.some(pattern => pattern.test(target.hostname))) return json(403, 'The result image host is not allowed.');
    if (await rateLimited(request, 'image')) return json(429, 'Rate limit reached. Try again shortly.');
    try {
      const result = await fetch(target, { redirect: 'manual' });
      const type = result.headers.get('content-type') || '';
      if (!result.ok || !type.startsWith('image/')) return json(502, 'The result image could not be downloaded.');
      return new Response(result.body, { headers: { 'content-type': type, 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' } });
    } catch { return json(502, 'The result image could not be downloaded.'); }
  }

  const custom = request.headers.get('x-proxy-custom') === '1';
  if (!isOfficial && !custom) return json(403, 'Select Custom relay before using a non-official endpoint.');
  if (custom && isPrivateHost(target.hostname)) return json(403, 'Private-network relay targets are not allowed.');
  const path = target.pathname.replace(/\/+$/, '');
  if (isOfficial ? !API_PATH.test(path) : !CUSTOM_PATH.test(path)) return json(403, 'This provider path is not allowed.');
  if (request.method === 'POST') {
    const length = Number(request.headers.get('content-length') || 0);
    if (length > MAX_BODY_BYTES) return json(413, 'Upload exceeds the 25 MiB proxy limit.');
  }
  if (await rateLimited(request, 'api')) return json(429, 'Rate limit reached. Try again shortly.');

  const headers = new Headers();
  for (const [key, value] of request.headers) {
    const lower = key.toLowerCase();
    if (!DROP_HEADERS.has(lower) && !lower.startsWith('cf-')) headers.set(key, value);
  }
  try {
    const result = await fetch(target, { method: request.method, headers, body: request.method === 'POST' ? request.body : undefined, redirect: 'manual' });
    const responseHeaders = new Headers({ 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
    const type = result.headers.get('content-type');
    if (type) responseHeaders.set('content-type', type);
    return new Response(result.body, { status: result.status, headers: responseHeaders });
  } catch { return json(502, 'The proxy could not reach the provider.'); }
}
