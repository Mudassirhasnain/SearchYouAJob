"use client";
import { useMemo, useState } from "react";
import { btn, btnGhost, field } from "../ui";

type Item = { desc: string; qty: number; price: number };
const CUR = ["USD", "EUR", "GBP", "PKR", "INR", "AED", "CAD", "AUD"];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const plus = (days: number) => { const d = new Date(); d.setDate(d.getDate() + days); return iso(d); };

export default function InvoiceGenerator() {
  const [from, setFrom] = useState("Your Business Name\n12 Example Street\nCity, Country\nyou@example.com");
  const [to, setTo] = useState("Client Company\n34 Client Road\nCity, Country");
  const [no, setNo] = useState("INV-001");
  const [issue, setIssue] = useState(() => iso(new Date()));
  const [due, setDue] = useState(() => plus(14));
  const [cur, setCur] = useState("USD");
  const [items, setItems] = useState<Item[]>([{ desc: "Website design", qty: 1, price: 800 }, { desc: "Hosting setup", qty: 2, price: 50 }]);
  const [tax, setTax] = useState(0);
  const [disc, setDisc] = useState(0);
  const [discType, setDiscType] = useState<"pct" | "fixed">("pct");
  const [notes, setNotes] = useState("Payment is due within 14 days. Thank you for your business.");
  const [logo, setLogo] = useState("");

  const fmt = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: cur }), [cur]);
  const c = (cents: number) => fmt.format(cents / 100);
  const lines = items.map((i) => Math.round((i.qty || 0) * (i.price || 0) * 100));
  const sub = lines.reduce((a, b) => a + b, 0);
  const discount = Math.min(sub, discType === "pct" ? Math.round((sub * (disc || 0)) / 100) : Math.round((disc || 0) * 100));
  const taxable = sub - discount;
  const taxAmt = Math.round((taxable * (tax || 0)) / 100);
  const total = taxable + taxAmt;

  const upd = (i: number, p: Partial<Item>) => setItems((a) => a.map((x, k) => (k === i ? { ...x, ...p } : x)));
  function pickLogo(f?: File) { if (!f) return; const r = new FileReader(); r.onload = () => setLogo(String(r.result)); r.readAsDataURL(f); }

  return (
    <div className="grid gap-6 lg:grid-cols-2 print:block">
      <style>{`@media print{@page{size:A4;margin:12mm}}`}</style>
      <div className="space-y-3 text-sm text-zinc-700 print:hidden">
        <label className="flex flex-col gap-1">Your details<textarea className={field + " h-24"} value={from} onChange={(e) => setFrom(e.target.value)} /></label>
        <label className="flex flex-col gap-1">Bill to<textarea className={field + " h-24"} value={to} onChange={(e) => setTo(e.target.value)} /></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1">Invoice number<input className={field} value={no} onChange={(e) => setNo(e.target.value)} /></label>
          <label className="flex flex-col gap-1">Currency<select className={field} value={cur} onChange={(e) => setCur(e.target.value)}>{CUR.map((x) => <option key={x}>{x}</option>)}</select></label>
          <label className="flex flex-col gap-1">Issue date<input type="date" className={field} value={issue} onChange={(e) => setIssue(e.target.value)} /></label>
          <label className="flex flex-col gap-1">Due date<input type="date" className={field} value={due} onChange={(e) => setDue(e.target.value)} /></label>
        </div>
        <div className="space-y-2">
          <p className="font-medium">Line items</p>
          {items.map((it, i) => (
            <div key={i} className="grid grid-cols-[1fr_4rem_5.5rem_auto] items-center gap-2">
              <input className={field} placeholder="Description" aria-label="Description" value={it.desc} onChange={(e) => upd(i, { desc: e.target.value })} />
              <input type="number" min={0} className={field} aria-label="Quantity" value={it.qty} onChange={(e) => upd(i, { qty: +e.target.value })} />
              <input type="number" min={0} step="0.01" className={field} aria-label="Unit price" value={it.price} onChange={(e) => upd(i, { price: +e.target.value })} />
              <button className={btnGhost + " !px-3"} aria-label="Remove line" disabled={items.length === 1} onClick={() => setItems((a) => a.filter((_, k) => k !== i))}>x</button>
            </div>
          ))}
          <button className={btnGhost} onClick={() => setItems((a) => [...a, { desc: "", qty: 1, price: 0 }])}>Add line</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1">Tax (%)<input type="number" min={0} step="0.1" className={field} value={tax} onChange={(e) => setTax(+e.target.value)} /></label>
          <label className="flex flex-col gap-1">Discount<span className="flex gap-2"><input type="number" min={0} step="0.01" className={field} value={disc} onChange={(e) => setDisc(+e.target.value)} /><select className={field + " w-auto"} value={discType} onChange={(e) => setDiscType(e.target.value as "pct" | "fixed")}><option value="pct">%</option><option value="fixed">{cur}</option></select></span></label>
        </div>
        <label className="flex flex-col gap-1">Notes and payment terms<textarea className={field + " h-20"} value={notes} onChange={(e) => setNotes(e.target.value)} /></label>
        <label className="flex flex-col gap-1">Logo (optional, stays on your device)<input type="file" accept="image/*" onChange={(e) => pickLogo(e.target.files?.[0])} /></label>
      </div>
      <div className="print:w-full">
        <div className="mb-3 flex flex-wrap items-center gap-2 print:hidden">
          <button className={btn} onClick={() => window.print()}>Save as PDF</button>
          {logo && <button className={btnGhost} onClick={() => setLogo("")}>Remove logo</button>}
        </div>
        <p className="mb-3 text-xs text-zinc-500 print:hidden">In the print window choose Save as PDF as the destination and switch off Headers and footers.</p>
        <div className="mx-auto w-full max-w-[210mm] rounded-sm border border-zinc-200 bg-white p-[9mm] text-[12px] leading-snug text-zinc-800 shadow-md print:max-w-none print:border-0 print:p-0 print:shadow-none" style={{ minHeight: "min(297mm, 140vw)" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              {logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logo} alt="Logo" className="mb-2 max-h-16 max-w-[160px]" />
              )}
              <p className="whitespace-pre-line font-semibold">{from}</p>
            </div>
            <div className="text-right"><p className="text-2xl font-bold tracking-wide text-[#2E5C8A]">INVOICE</p><p className="mt-1">No. {no}</p><p>Issued: {issue}</p><p>Due: {due}</p></div>
          </div>
          <div className="mt-6"><p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Bill to</p><p className="whitespace-pre-line">{to}</p></div>
          <table className="mt-6 w-full border-collapse">
            <thead><tr className="border-b-2 border-zinc-800 text-left"><th className="py-1.5">Description</th><th className="py-1.5 text-right">Qty</th><th className="py-1.5 text-right">Unit price</th><th className="py-1.5 text-right">Amount</th></tr></thead>
            <tbody>{items.map((it, i) => <tr key={i} className="border-b border-zinc-200"><td className="py-1.5 pr-2">{it.desc}</td><td className="py-1.5 text-right">{it.qty}</td><td className="py-1.5 text-right">{fmt.format(it.price || 0)}</td><td className="py-1.5 text-right">{c(lines[i])}</td></tr>)}</tbody>
          </table>
          <div className="ml-auto mt-4 w-64 space-y-1">
            <div className="flex justify-between"><span>Subtotal</span><span>{c(sub)}</span></div>
            {discount > 0 && <div className="flex justify-between"><span>Discount</span><span>-{c(discount)}</span></div>}
            {tax > 0 && <div className="flex justify-between"><span>Tax ({tax}%)</span><span>{c(taxAmt)}</span></div>}
            <div className="flex justify-between border-t-2 border-zinc-800 pt-1.5 text-base font-bold"><span>Total due</span><span>{c(total)}</span></div>
          </div>
          {notes.trim() && <div className="mt-8"><p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Notes</p><p className="whitespace-pre-line">{notes}</p></div>}
        </div>
      </div>
    </div>
  );
}
