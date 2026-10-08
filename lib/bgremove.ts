// Colour-based background removal. Flood-fills inward from the image edges, so
// matching colours inside the subject (a white shirt, say) are left alone.
export type RGB = [number, number, number];

export function guessBackground(d: Uint8ClampedArray, w: number, h: number): RGB {
  const pts = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1], [w >> 1, 0], [w >> 1, h - 1], [0, h >> 1], [w - 1, h >> 1]];
  const key = (i: number) => `${d[i] >> 4},${d[i + 1] >> 4},${d[i + 2] >> 4}`;
  const count: Record<string, { n: number; i: number }> = {};
  for (const [x, y] of pts) {
    const i = (y * w + x) * 4, k = key(i);
    (count[k] ??= { n: 0, i }).n++;
  }
  const best = Object.values(count).sort((a, b) => b.n - a.n)[0];
  return [d[best.i], d[best.i + 1], d[best.i + 2]];
}

export function removeBackground(src: Uint8ClampedArray, w: number, h: number, bg: RGB, tol: number, soft: number) {
  const data = new Uint8ClampedArray(src);
  const seen = new Uint8Array(w * h);
  const lim2 = (tol + soft) ** 2, tol2 = tol * tol;
  const stack: number[] = [];
  for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
  while (stack.length) {
    const p = stack.pop()!;
    if (seen[p]) continue;
    seen[p] = 1;
    const i = p * 4;
    const dr = data[i] - bg[0], dg = data[i + 1] - bg[1], db = data[i + 2] - bg[2];
    const d2 = dr * dr + dg * dg + db * db;
    if (d2 > lim2) continue;
    if (d2 > tol2) {
      data[i + 3] = Math.min(data[i + 3], Math.round((255 * (Math.sqrt(d2) - tol)) / soft));
      continue; // soft edge pixel: do not spread further into the subject
    }
    data[i + 3] = 0;
    const x = p % w;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (p >= w) stack.push(p - w);
    if (p < w * (h - 1)) stack.push(p + w);
  }
  return data;
}
