"use client";
import { useState } from "react";
import { btn, btnGhost, field } from "../ui";

const BANDS = [
  { max: 16, label: "Severe thinness", c: "#2563eb" }, { max: 17, label: "Moderate thinness", c: "#3b82f6" }, { max: 18.5, label: "Mild thinness", c: "#60a5fa" },
  { max: 25, label: "Normal weight", c: "#16a34a" }, { max: 30, label: "Overweight", c: "#eab308" }, { max: 35, label: "Obesity class I", c: "#f97316" },
  { max: 40, label: "Obesity class II", c: "#ef4444" }, { max: 100, label: "Obesity class III", c: "#b91c1c" },
];

export default function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [cm, setCm] = useState("170"); const [kg, setKg] = useState("68");
  const [ft, setFt] = useState("5"); const [inch, setInch] = useState("7"); const [lb, setLb] = useState("150");
  const [waist, setWaist] = useState("");

  const heightCm = unit === "metric" ? Number(cm) : (Number(ft) * 12 + Number(inch)) * 2.54;
  const weightKg = unit === "metric" ? Number(kg) : Number(lb) * 0.45359237;
  const ok = heightCm >= 50 && heightCm <= 272 && weightKg >= 10 && weightKg <= 700;
  const hm = heightCm / 100;
  const bmi = ok ? weightKg / (hm * hm) : NaN;
  const band = ok ? BANDS.find((b) => bmi < b.max)! : null;
  const lo = 18.5 * hm * hm, hi = 24.9 * hm * hm;
  const pos = ok ? Math.min(100, Math.max(0, ((bmi - 12) / (42 - 12)) * 100)) : 0;
  const w = Number(waist);
  const whtr = waist && ok && w > 0 ? (unit === "metric" ? w : w * 2.54) / heightCm : NaN;
  const wt = (x: number) => unit === "metric" ? `${x.toFixed(1)} kg` : `${(x / 0.45359237).toFixed(1)} lb`;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button className={unit === "metric" ? btn : btnGhost} onClick={() => setUnit("metric")}>Metric (cm, kg)</button>
        <button className={unit === "imperial" ? btn : btnGhost} onClick={() => setUnit("imperial")}>Imperial (ft, lb)</button>
      </div>
      <div className="flex flex-wrap gap-3 text-sm text-zinc-700">
        {unit === "metric" ? (
          <>
            <label className="flex flex-col gap-1">Height (cm)<input type="number" className={field + " w-32"} value={cm} onChange={(e) => setCm(e.target.value)} /></label>
            <label className="flex flex-col gap-1">Weight (kg)<input type="number" className={field + " w-32"} value={kg} onChange={(e) => setKg(e.target.value)} /></label>
          </>
        ) : (
          <>
            <label className="flex flex-col gap-1">Feet<input type="number" className={field + " w-24"} value={ft} onChange={(e) => setFt(e.target.value)} /></label>
            <label className="flex flex-col gap-1">Inches<input type="number" className={field + " w-24"} value={inch} onChange={(e) => setInch(e.target.value)} /></label>
            <label className="flex flex-col gap-1">Weight (lb)<input type="number" className={field + " w-32"} value={lb} onChange={(e) => setLb(e.target.value)} /></label>
          </>
        )}
        <label className="flex flex-col gap-1">Waist, optional ({unit === "metric" ? "cm" : "in"})<input type="number" className={field + " w-32"} value={waist} onChange={(e) => setWaist(e.target.value)} /></label>
      </div>
      {!ok || !band ? <p className="text-sm text-red-600">Enter a realistic height and weight.</p> : (
        <>
          <div className="rounded-lg border border-zinc-200 bg-white px-4 py-4">
            <div className="text-4xl font-semibold" style={{ color: band.c }}>{bmi.toFixed(1)}</div>
            <div className="text-sm font-medium text-zinc-800">{band.label}</div>
            <div className="relative mt-4 h-3 rounded-full" style={{ background: "linear-gradient(90deg,#3b82f6 0%,#60a5fa 22%,#16a34a 22%,#16a34a 43%,#eab308 43%,#eab308 60%,#f97316 60%,#ef4444 80%,#b91c1c 100%)" }} role="img" aria-label={`BMI ${bmi.toFixed(1)}, ${band.label}`}>
              <div className="absolute -top-1 h-5 w-1.5 rounded bg-zinc-900" style={{ left: `calc(${pos}% - 3px)` }} />
            </div>
            <div className="mt-1 flex justify-between text-xs text-zinc-500"><span>12</span><span>18.5</span><span>25</span><span>30</span><span>35</span><span>42+</span></div>
          </div>
          <p className="text-sm text-zinc-700">Healthy weight range for your height (BMI 18.5 to 24.9): <strong>{wt(lo)} to {wt(hi)}</strong>.</p>
          {!isNaN(whtr) && <p className="text-sm text-zinc-700">Waist to height ratio: <strong>{whtr.toFixed(2)}</strong>. A ratio under 0.5 is commonly used as a general guide.</p>}
        </>
      )}
      <p className="text-xs text-zinc-500">BMI is a screening number, not a diagnosis. It does not suit children, pregnant women or very muscular people. Talk to a doctor about your health.</p>
    </div>
  );
}
