import { lookup } from 'node:dns/promises';
import { BlockList, isIP } from 'node:net';

// Fetch a URL a stranger handed us (discovery chat, citation checks) without
// letting it reach our own network: loopback, private ranges, link-local
// (cloud metadata at 169.254.169.254), CGNAT, and their IPv6 equivalents.
// Redirects are followed by hand so every hop is re-checked.
//
// Residual risk: DNS can change between our lookup and fetch's own lookup
// (rebinding). Closing that needs a pinned-IP dispatcher; for a read-only
// title/headings scrape the window is accepted.

const blocked = new BlockList();
for (const [net, prefix] of [
  ['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
  ['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24], ['192.168.0.0', 16],
  ['198.18.0.0', 15], ['224.0.0.0', 4], ['240.0.0.0', 4],
] as const) blocked.addSubnet(net, prefix, 'ipv4');
for (const [net, prefix] of [
  ['::', 128], ['::1', 128], ['fc00::', 7], ['fe80::', 10], ['ff00::', 8],
] as const) blocked.addSubnet(net, prefix, 'ipv6');

function isBlockedIp(ip: string): boolean {
  const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i)?.[1];
  if (mapped) return blocked.check(mapped, 'ipv4');
  return blocked.check(ip, isIP(ip) === 6 ? 'ipv6' : 'ipv4');
}

export class BlockedUrlError extends Error {}

async function assertPublic(url: URL) {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new BlockedUrlError('Only http(s) URLs are allowed');
  if (url.username || url.password) throw new BlockedUrlError('URLs with credentials are not allowed');
  const host = url.hostname.replace(/^\[|\]$/g, '');
  const addrs = isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
  if (!addrs.length || addrs.some((a) => isBlockedIp(a.address))) {
    throw new BlockedUrlError('That address is not publicly reachable');
  }
}

export async function safeFetch(
  input: string,
  init: { method?: 'GET' | 'HEAD'; timeoutMs?: number; headers?: Record<string, string> } = {},
): Promise<{ res: Response; finalUrl: string }> {
  let url = new URL(input);
  const signal = AbortSignal.timeout(init.timeoutMs ?? 8000);
  for (let hop = 0; hop <= 5; hop++) {
    await assertPublic(url);
    const res = await fetch(url, { method: init.method ?? 'GET', redirect: 'manual', signal, headers: init.headers });
    const loc = res.status >= 300 && res.status < 400 ? res.headers.get('location') : null;
    if (!loc) return { res, finalUrl: url.toString() };
    url = new URL(loc, url);
  }
  throw new BlockedUrlError('Too many redirects');
}

/** Read at most `maxBytes` of a body as text — a hostile page can't OOM us. */
export async function readCapped(res: Response, maxBytes = 2_000_000): Promise<string> {
  if (!res.body) return '';
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (total < maxBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.byteLength;
  }
  reader.cancel().catch(() => {});
  return new TextDecoder().decode(Buffer.concat(chunks).subarray(0, maxBytes));
}
