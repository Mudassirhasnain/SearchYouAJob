"use client";
import { useEffect, useMemo, useState } from "react";
import { btn, btnGhost, field } from "./ui";

type Job = { role: string; company: string; dates: string; bullets: string };
type Edu = { degree: string; school: string; dates: string };
type Data = {
  name: string; headline: string; email: string; phone: string; location: string; links: string; personal: string; summary: string;
  jobs: Job[]; edu: Edu[]; skills: string; projects: string; certs: string; languages: string; refs: string;
  template: "classic" | "modern"; accent: string; photo: string;
};

const blank = (cv: boolean): Data => ({
  name: "", headline: "", email: "", phone: "", location: "", links: "", personal: "", summary: "",
  jobs: [{ role: "", company: "", dates: "", bullets: "" }], edu: [{ degree: "", school: "", dates: "" }],
  skills: "", projects: "", certs: "", languages: "", refs: "", template: cv ? "modern" : "classic", accent: "#2E5C8A", photo: "",
});

const example = (cv: boolean): Data => ({
  ...blank(cv),
  name: "Sana Ahmed", headline: "Data Analyst", email: "sana.ahmed@example.com", phone: "+92 300 0000000", location: "Islamabad, Pakistan",
  links: "linkedin.com/in/sanaahmed", personal: cv ? "Nationality: Pakistani" : "",
  summary: "Analyst with three years of experience turning messy sales data into weekly reports that managers actually use. Strong in SQL and Excel, learning Python.",
  jobs: [
    { role: "Data Analyst", company: "Northline Retail", dates: "2023 - Present", bullets: "Built a weekly sales dashboard used by 12 store managers\nCut monthly reporting time from two days to three hours with SQL automation\nSpotted a pricing error that was costing about 4% of margin on one product line" },
    { role: "Reporting Assistant", company: "Brightway Logistics", dates: "2021 - 2023", bullets: "Cleaned and merged delivery data from five spreadsheets\nTrained two new hires on the reporting process" },
  ],
  edu: [{ degree: "BS Statistics", school: "Quaid-i-Azam University", dates: "2017 - 2021" }],
  skills: "SQL, Excel, Power BI, Python (basic), Data cleaning, Reporting",
  projects: cv ? "Retail demand forecast, a small project predicting weekly stock needs\nSurvey on student job hunting, 300 responses" : "",
  certs: cv ? "Google Data Analytics Certificate, 2022" : "", languages: cv ? "English (fluent), Urdu (native)" : "", refs: cv ? "Available on request" : "",
});

const e = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const PX = "-webkit-print-color-adjust:exact;print-color-adjust:exact;";

function html(d: Data, cv: boolean) {
  const modern = d.template === "modern", ac = d.accent;
  const list = (s: string) => lines(s).length ? `<ul style="margin:3px 0 0 18px;padding:0">${lines(s).map((l) => `<li style="margin:2px 0">${e(l)}</li>`).join("")}</ul>` : "";
  const sec = (t: string, body: string) => body
    ? `<h2 style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${modern ? ac : "#111"};border-bottom:1.5px solid ${modern ? ac : "#999"};padding-bottom:2px;margin:16px 0 6px">${t}</h2>${body}` : "";
  const row = (l: string, r: string, sub = "") => l || r || sub
    ? `<table style="width:100%;border-collapse:collapse;margin-top:8px"><tr><td style="font-weight:bold;padding:0">${e(l)}</td><td style="text-align:right;white-space:nowrap;color:#555;padding:0">${e(r)}</td></tr>${sub ? `<tr><td colspan="2" style="padding:0;color:${modern ? ac : "#333"}">${e(sub)}</td></tr>` : ""}</table>` : "";
  const para = (s: string) => (s.trim() ? `<div>${e(s).replace(/\n/g, "<br>")}</div>` : "");
  const chips = (s: string) => s.split(/[,\n]/).map((x) => x.trim()).filter(Boolean)
    .map((x) => `<span style="display:inline-block;background:#eef2f7;border-radius:10px;padding:2px 9px;margin:0 4px 5px 0">${e(x)}</span>`).join("");

  const summary = sec(cv ? "Profile" : "Summary", para(d.summary));
  const jobs = sec("Experience", d.jobs.map((j) => row(j.role, j.dates, j.company) + list(j.bullets)).join(""));
  const edu = sec("Education", d.edu.map((x) => row(x.degree, x.dates, x.school)).join(""));
  const proj = cv ? sec("Projects and publications", list(d.projects)) : "";
  const certs = cv ? sec("Certifications", list(d.certs)) : "";
  const langs = cv ? sec("Languages", para(d.languages)) : "";
  const refs = cv ? sec("References", para(d.refs)) : "";
  const personal = d.personal.trim() ? sec("Personal details", para(d.personal)) : "";
  const contact = [d.email, d.phone, d.location, ...lines(d.links)].filter(Boolean).map(e);
  const wrap = (inner: string) => `<div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.45;color:#1f2937">${inner}</div>`;

  if (!modern) {
    return wrap(
      `<h1 style="font-size:24px;margin:0">${e(d.name) || "Your Name"}</h1>` +
      (d.headline ? `<div style="font-size:14px;margin-top:2px">${e(d.headline)}</div>` : "") +
      `<div style="margin-top:4px;color:#333">${contact.join(" | ")}</div>` +
      summary + jobs + edu + sec("Skills", para(d.skills)) + proj + certs + langs + personal + refs
    );
  }
  const photo = d.photo ? `<td style="width:84px;text-align:right;padding:0 0 0 12px"><img src="${d.photo}" alt="" width="76" height="76" style="width:76px;height:76px;border-radius:50%;object-fit:cover;border:2px solid #fff"></td>` : "";
  const band = `<table style="width:100%;border-collapse:collapse;background:${ac};color:#fff;${PX}border-radius:6px"><tr><td style="padding:16px 18px"><div style="font-size:26px;font-weight:bold;line-height:1.15">${e(d.name) || "Your Name"}</div>${d.headline ? `<div style="font-size:14px;margin-top:3px;opacity:.95">${e(d.headline)}</div>` : ""}<div style="margin-top:8px;font-size:11.5px">${contact.join("&nbsp;&nbsp;|&nbsp;&nbsp;")}</div></td>${photo}</tr></table>`;
  const sk = d.skills.trim() ? sec("Skills", chips(d.skills)) : "";
  const main = summary + jobs + edu + proj;
  const side = sk + langs + certs + personal + refs;
  return wrap(
    band +
    (side
      ? `<table style="width:100%;border-collapse:collapse;margin-top:4px"><tr><td style="width:64%;vertical-align:top;padding:0 14px 0 0">${main}</td><td style="vertical-align:top;padding:0 0 0 14px;border-left:1px solid #e5e7eb">${side}</td></tr></table>`
      : main)
  );
}

export default function ResumeBuilder({ cv }: { cv: boolean }) {
  const key = cv ? "sya-cv-draft" : "sya-resume-draft";
  const [d, setD] = useState<Data>(blank(cv));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try { const s = localStorage.getItem(key); if (s) setD({ ...blank(cv), ...JSON.parse(s), photo: "" }); } catch {}
    setLoaded(true);
  }, [key, cv]);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(key, JSON.stringify({ ...d, photo: "" })); } catch {}
  }, [d, loaded, key]);

  const set = (k: keyof Data) => (ev: { target: { value: string } }) => setD((p) => ({ ...p, [k]: ev.target.value }));
  const setJob = (i: number, k: keyof Job, v: string) => setD((p) => ({ ...p, jobs: p.jobs.map((j, n) => (n === i ? { ...j, [k]: v } : j)) }));
  const setEdu = (i: number, k: keyof Edu, v: string) => setD((p) => ({ ...p, edu: p.edu.map((j, n) => (n === i ? { ...j, [k]: v } : j)) }));
  const out = useMemo(() => html(d, cv), [d, cv]);

  function onPhoto(f?: File) {
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setD((p) => ({ ...p, photo: String(r.result) }));
    r.readAsDataURL(f);
  }
  function word() {
    const doc = `<html><head><meta charset="utf-8"><title>${e(d.name)}</title></head><body>${out}</body></html>`;
    const url = URL.createObjectURL(new Blob([doc], { type: "application/msword" }));
    const a = document.createElement("a");
    a.href = url; a.download = (d.name.trim().replace(/\W+/g, "-") || (cv ? "cv" : "resume")) + ".doc"; a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  const T = (k: keyof Data, ph: string) => <input className={field} placeholder={ph} value={d[k] as string} onChange={set(k)} />;
  const A = (k: keyof Data, ph: string, h = "h-20") => <textarea className={field + " " + h} placeholder={ph} value={d[k] as string} onChange={set(k)} />;
  const h3 = "mb-2 mt-6 text-sm font-semibold text-zinc-800";

  return (
    <div className="grid gap-6 lg:grid-cols-2 print:block">
      <style>{`@media print{@page{size:A4;margin:12mm}}`}</style>
      <div className="space-y-2 print:hidden">
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 text-sm text-zinc-700">
          <label className="flex items-center gap-2">Template
            <select className={field + " w-auto"} value={d.template} onChange={(x) => setD((p) => ({ ...p, template: x.target.value as Data["template"] }))}>
              <option value="classic">Classic (plain, ATS safe)</option><option value="modern">Modern (colour header)</option>
            </select></label>
          {d.template === "modern" && (
            <label className="flex items-center gap-2">Colour
              <input type="color" value={d.accent} onChange={set("accent")} aria-label="Accent colour" /></label>
          )}
          <button className={btnGhost + " ml-auto"} onClick={() => setD(example(cv))}>Fill example</button>
          <button className={btnGhost} onClick={() => setD(blank(cv))}>Clear all</button>
        </div>

        <h3 className={h3 + " !mt-4"}>Contact</h3>
        <div className="grid gap-2 sm:grid-cols-2">{T("name", "Full name")}{T("headline", "Job title, e.g. Data Analyst")}{T("email", "Email")}{T("phone", "Phone")}{T("location", "City, Country")}</div>
        {A("links", "Links, one per line (LinkedIn, portfolio)", "h-16")}
        {cv && T("personal", "Personal details, e.g. Nationality: Pakistani (optional)")}
        {cv && d.template === "modern" && (
          <div className="flex items-center gap-3 text-sm text-zinc-700">
            <label className={btnGhost + " cursor-pointer"}>{d.photo ? "Change photo" : "Add photo (optional)"}
              <input type="file" accept="image/*" className="hidden" onChange={(x) => { onPhoto(x.target.files?.[0]); x.target.value = ""; }} /></label>
            {d.photo && <button className={btnGhost} onClick={() => setD((p) => ({ ...p, photo: "" }))}>Remove photo</button>}
            <span className="text-xs text-zinc-500">Only add one if the employer expects it.</span>
          </div>
        )}
        <h3 className={h3}>{cv ? "Profile" : "Summary"}</h3>
        {A("summary", "Two or three lines on what you do and what you are good at")}
        <h3 className={h3}>Experience</h3>
        {d.jobs.map((j, i) => (
          <div key={i} className="space-y-2 rounded-lg border border-zinc-200 bg-white p-3">
            <div className="grid gap-2 sm:grid-cols-3">
              <input className={field} placeholder="Job title" value={j.role} onChange={(x) => setJob(i, "role", x.target.value)} />
              <input className={field} placeholder="Company" value={j.company} onChange={(x) => setJob(i, "company", x.target.value)} />
              <input className={field} placeholder="Jan 2023 - Present" value={j.dates} onChange={(x) => setJob(i, "dates", x.target.value)} />
            </div>
            <textarea className={field + " h-24"} placeholder="One achievement per line. Start with what you did and add numbers." value={j.bullets} onChange={(x) => setJob(i, "bullets", x.target.value)} />
            {d.jobs.length > 1 && <button className={btnGhost} onClick={() => setD((p) => ({ ...p, jobs: p.jobs.filter((_, n) => n !== i) }))}>Remove job</button>}
          </div>
        ))}
        <button className={btnGhost} onClick={() => setD((p) => ({ ...p, jobs: [...p.jobs, { role: "", company: "", dates: "", bullets: "" }] }))}>Add another job</button>
        <h3 className={h3}>Education</h3>
        {d.edu.map((x, i) => (
          <div key={i} className="grid gap-2 sm:grid-cols-3">
            <input className={field} placeholder="Degree" value={x.degree} onChange={(v) => setEdu(i, "degree", v.target.value)} />
            <input className={field} placeholder="School" value={x.school} onChange={(v) => setEdu(i, "school", v.target.value)} />
            <input className={field} placeholder="2019 - 2023" value={x.dates} onChange={(v) => setEdu(i, "dates", v.target.value)} />
          </div>
        ))}
        <button className={btnGhost} onClick={() => setD((p) => ({ ...p, edu: [...p.edu, { degree: "", school: "", dates: "" }] }))}>Add education</button>
        <h3 className={h3}>Skills</h3>
        {A("skills", "Separate with commas: SQL, Excel, Python, Customer support", "h-16")}
        {cv && (<>
          <h3 className={h3}>Projects and publications</h3>{A("projects", "One per line")}
          <h3 className={h3}>Certifications</h3>{A("certs", "One per line", "h-16")}
          <h3 className={h3}>Languages</h3>{T("languages", "English (fluent), Urdu (native)")}
          <h3 className={h3}>References</h3>{T("refs", "Available on request")}
        </>)}
      </div>

      <div className="print:w-full">
        <div className="mb-3 flex flex-wrap items-center gap-2 print:hidden">
          <button className={btn} onClick={() => window.print()}>Save as PDF</button>
          <button className={btnGhost} onClick={word}>Download Word</button>
          <span className="text-xs text-zinc-500">Draft is saved in this browser.</span>
        </div>
        <p className="mb-3 text-xs text-zinc-500 print:hidden">In the print window choose Save as PDF as the destination, turn on Background graphics for the colour header, and switch off Headers and footers.</p>
        <div className="mx-auto w-full max-w-[210mm] rounded-sm border border-zinc-200 bg-white p-[9mm] shadow-md print:max-w-none print:border-0 print:p-0 print:shadow-none" style={{ minHeight: "min(297mm, 140vw)" }} dangerouslySetInnerHTML={{ __html: out }} />
      </div>
    </div>
  );
}
