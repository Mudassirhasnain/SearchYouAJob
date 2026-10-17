"use client";
import { useMemo, useState } from "react";
import { btn, btnGhost, field } from "../ui";

const CUR = ["PKR", "USD", "EUR", "GBP", "INR"];

export default function EmiCalculator() {
  const [amount, setAmount] = useState(1000000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(5);
  const [unit, setUnit] = useState<"years" | "months">("years");
  const [cur, setCur] = useState("PKR");
  const [showAll, setShowAll] = useState(false);

  const fmt = useMemo(() => new Intl.NumberFormat("en-US", { style: "currency", currency: cur, maximumFractionDigits: cur === "PKR" || cur === "INR" ? 0 : 2 }), [cur]);

  const r = useMemo(() => {
    const n = Math.round(unit === "years" ? tenure * 12 : tenure);
    if (!(amount > 0) || !(n > 0) || rate < 0) return null;
    const i = rate / 12 / 100;
    const emi = i === 0 ? amount / n : (amount * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
    const rows: { m: number; interest: number; principal: number; balance: number }[] = [];
    let bal = amount;
    for (let m = 1; m <= n; m++) {
      const interest = bal * i;
      const principal = Math.min(bal, emi - interest);
      bal = Math.max(0, bal - principal);
      rows.push({ m, interest, principal, balance: m === n ? 0 : bal });
    }
    const total = emi * n;
    return { n, emi, total, interest: total - amount, rows };
  }, [amount, rate, tenure, unit]);

  function csv() {
    if (!r) return;
    const lines = ["Month,EMI,Principal,Interest,Balance", ...r.rows.map((x) => [x.m, r.emi.toFixed(2), x.principal.toFixed(2), x.interest.toFixed(2), x.balance.toFixed(2)].join(","))];
    const url = URL.createObjectURL(new Blob([lines.join("\n")], { type: "text/csv" }));
    const a = document.createElement("a"); a.href = url; a.download = "amortization.csv"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  const shown = r ? (showAll ? r.rows : r.rows.slice(0, 12)) : [];
  const pPct = r ? Math.round((amount / r.total) * 100) : 0;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm text-zinc-700">
        <label className="flex flex-col gap-1">Loan amount<input type="number" min={0} className={field} value={amount || ""} onChange={(e) => setAmount(+e.target.value)} /></label>
        <label className="flex flex-col gap-1">Interest rate (% per year)<input type="number" min={0} step="0.1" className={field} value={rate} onChange={(e) => setRate(+e.target.value)} /></label>
        <label className="flex flex-col gap-1">Tenure
          <span className="flex gap-2">
            <input type="number" min={1} className={field} value={tenure || ""} onChange={(e) => setTenure(+e.target.value)} />
            <select className={field + " w-auto"} value={unit} onChange={(e) => setUnit(e.target.value as "years" | "months")}><option value="years">years</option><option value="months">months</option></select>
          </span>
        </label>
        <label className="flex flex-col gap-1">Currency<select className={field} value={cur} onChange={(e) => setCur(e.target.value)}>{CUR.map((c) => <option key={c}>{c}</option>)}</select></label>
      </div>
      {!r ? <p className="text-sm text-red-600">Enter a positive amount, a rate of 0 or more, and a tenure of at least one month.</p> : (
        <>
          <div className="grid gap-2 sm:grid-cols-3">
            {[["Monthly EMI", fmt.format(r.emi)], ["Total interest", fmt.format(r.interest)], ["Total payment", fmt.format(r.total)]].map(([l, v]) => (
              <div key={l} className="rounded-lg border border-zinc-200 bg-white px-3 py-3"><div className="text-xl font-semibold">{v}</div><div className="text-xs text-zinc-500">{l}</div></div>
            ))}
          </div>
          <div>
            <div className="flex h-4 overflow-hidden rounded-full bg-zinc-200" role="img" aria-label={`Principal ${pPct}%, interest ${100 - pPct}%`}>
              <div className="bg-[#2E5C8A]" style={{ width: pPct + "%" }} /><div className="bg-[#69ABF7]" style={{ width: 100 - pPct + "%" }} />
            </div>
            <p className="mt-1 text-xs text-zinc-600">Principal {pPct}% (dark), interest {100 - pPct}% (light), over {r.n} months.</p>
          </div>
          <div className="overflow-auto rounded-lg border border-zinc-200 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-zinc-50 text-zinc-600"><tr><th className="px-3 py-2">Month</th><th className="px-3 py-2">Principal</th><th className="px-3 py-2">Interest</th><th className="px-3 py-2">Balance</th></tr></thead>
              <tbody>{shown.map((x) => <tr key={x.m} className="border-t border-zinc-100"><td className="px-3 py-1.5">{x.m}</td><td className="px-3 py-1.5">{fmt.format(x.principal)}</td><td className="px-3 py-1.5">{fmt.format(x.interest)}</td><td className="px-3 py-1.5">{fmt.format(x.balance)}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="flex gap-2">
            {r.rows.length > 12 && <button className={btnGhost} onClick={() => setShowAll(!showAll)}>{showAll ? "Show first 12 months" : `Show all ${r.rows.length} months`}</button>}
            <button className={btn} onClick={csv}>Download CSV</button>
          </div>
        </>
      )}
    </div>
  );
}
