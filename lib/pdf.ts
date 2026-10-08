// Tiny dependency-free PDF writer: JPEG image pages and plain-text pages.
const W: Record<string, number> = {};
(
  " 278,!278,\"355,#556,$556,%889,&667,'191,(333,)333,*389,+584,,278,-333,.278,/278,:278,;278,<584,=584,>584,?556,@1015," +
  "A667,B667,C722,D722,E667,F611,G778,H722,I278,J500,K667,L556,M833,N722,O778,P667,Q778,R722,S667,T611,U722,V667,W944,X667,Y667,Z611," +
  "[278,\\278,]278,^469,_556,`333,a556,b556,c500,d556,e556,f278,g556,h556,i222,j222,k500,l222,m833,n556,o556,p556,q556,r333,s500,t278,u556,v500,w722,x500,y500,z500,{334,|260,}334,~584"
).split(/(?<=\d),/).forEach((p) => (W[p[0]] = Number(p.slice(1))));
for (let d = 48; d < 58; d++) W[String.fromCharCode(d)] = 556;

const bytes = (s: string) => Uint8Array.from(s, (c) => c.charCodeAt(0) & 255);

function clean(s: string) {
  return s
    .replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-").replace(/\u2026/g, "...").replace(/[\u2022\u25CF]/g, "*")
    .replace(/\t/g, "    ").replace(/\r/g, "")
    .replace(/[^\n\x20-\x7E\xA0-\xFF]/g, "?");
}
const width = (s: string, size: number) =>
  ([...s].reduce((t, c) => t + (W[c] ?? 556), 0) * size) / 1000;
const esc = (s: string) => s.replace(/[\\()]/g, "\\$&");

function wrap(text: string, size: number, max: number) {
  const out: string[] = [];
  for (const para of clean(text).split("\n")) {
    let line = "";
    for (let word of para.split(" ")) {
      while (width(word, size) > max) {
        let i = word.length;
        while (i > 1 && width(word.slice(0, i), size) > max) i--;
        if (line) { out.push(line); line = ""; }
        out.push(word.slice(0, i)); word = word.slice(i);
      }
      const next = line ? line + " " + word : word;
      if (width(next, size) <= max) line = next;
      else { out.push(line); line = word; }
    }
    out.push(line);
  }
  return out;
}

function assemble(objs: Uint8Array[]) {
  const chunks: Uint8Array[] = [bytes("%PDF-1.4\n")];
  const offs: number[] = [];
  let pos = chunks[0].length;
  const push = (b: Uint8Array) => { chunks.push(b); pos += b.length; };
  objs.forEach((o, i) => {
    offs.push(pos);
    push(bytes(`${i + 1} 0 obj\n`)); push(o); push(bytes("\nendobj\n"));
  });
  let x = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n`;
  offs.forEach((o) => (x += String(o).padStart(10, "0") + " 00000 n \n"));
  x += `trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${pos}\n%%EOF`;
  push(bytes(x));
  return new Blob(chunks as unknown as BlobPart[], { type: "application/pdf" });
}

const stream = (dict: string, data: Uint8Array) => {
  const a = bytes(`<< ${dict} /Length ${data.length} >>\nstream\n`);
  const b = bytes("\nendstream");
  const o = new Uint8Array(a.length + data.length + b.length);
  o.set(a); o.set(data, a.length); o.set(b, a.length + data.length);
  return o;
};

// objects: 1 catalog, 2 pages, 3 Helvetica, 4 Helvetica-Bold, then pages
function build(pages: { content: Uint8Array; w: number; h: number; image?: { data: Uint8Array; w: number; h: number } }[]) {
  const objs: Uint8Array[] = [bytes(""), bytes(""), bytes("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>"),
    bytes("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>")];
  const kids: string[] = [];
  for (const p of pages) {
    const pageId = objs.length + 1;
    let res = "/Font << /F1 3 0 R /F2 4 0 R >>";
    let extra: Uint8Array[] = [];
    if (p.image) {
      res += ` /XObject << /Im0 ${pageId + 2} 0 R >>`;
      extra = [stream(`/Type /XObject /Subtype /Image /Width ${p.image.w} /Height ${p.image.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode`, p.image.data)];
    }
    objs.push(bytes(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${p.w} ${p.h}] /Resources << ${res} >> /Contents ${pageId + 1} 0 R >>`));
    objs.push(stream("", p.content));
    objs.push(...extra);
    kids.push(`${pageId} 0 R`);
  }
  objs[0] = bytes("<< /Type /Catalog /Pages 2 0 R >>");
  objs[1] = bytes(`<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${kids.length} >>`);
  return assemble(objs);
}

export function textToPdf(text: string, opts: { title?: string; size?: number } = {}) {
  const size = opts.size ?? 11, M = 56, PW = 595, PH = 842, lh = size * 1.45;
  const lines: { t: string; font: string; size: number; skip?: number }[] = [];
  if (opts.title?.trim()) {
    wrap(opts.title, 18, PW - 2 * M).forEach((t) => lines.push({ t, font: "F2", size: 18, skip: 26 }));
    lines.push({ t: "", font: "F1", size, skip: 8 });
  }
  wrap(text, size, PW - 2 * M).forEach((t) => lines.push({ t, font: "F1", size }));
  const pages: Parameters<typeof build>[0] = [];
  let y = PH - M, cur = "";
  const flush = () => { pages.push({ content: bytes(cur), w: PW, h: PH }); cur = ""; y = PH - M; };
  for (const l of lines) {
    const step = l.skip ?? lh;
    if (y - step < M) flush();
    y -= step;
    if (l.t) cur += `BT /${l.font} ${l.size} Tf ${M} ${y.toFixed(1)} Td (${esc(l.t)}) Tj ET\n`;
  }
  flush();
  return build(pages);
}

export type JpegPage = { data: Uint8Array; w: number; h: number };

export function imagesToPdf(imgs: JpegPage[], margin = 24) {
  return build(
    imgs.map((im) => {
      const landscape = im.w > im.h;
      const pw = landscape ? 842 : 595, ph = landscape ? 595 : 842;
      const s = Math.min((pw - 2 * margin) / im.w, (ph - 2 * margin) / im.h);
      const w = im.w * s, h = im.h * s;
      const content = bytes(`q ${w.toFixed(2)} 0 0 ${h.toFixed(2)} ${((pw - w) / 2).toFixed(2)} ${((ph - h) / 2).toFixed(2)} cm /Im0 Do Q`);
      return { content, w: pw, h: ph, image: im };
    })
  );
}
