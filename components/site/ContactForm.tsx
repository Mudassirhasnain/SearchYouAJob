"use client";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

const TOPICS = ["Bug report", "Suggest a new tool", "Feedback on job search results", "Report or remove a job listing", "Privacy or data request", "Business or partnership", "Press", "Something else"];
const inp = "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-[#69ABF7] focus:ring-2 focus:ring-[#69ABF7]/30";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `[SearchYouAJob] ${topic}`;
    const body = `${message}\n\n---\nName: ${name}\nReply to: ${email}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-4 rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">Your name<input className={inp} value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" /></label>
        <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">Your email<input type="email" className={inp} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" /></label>
      </div>
      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">Topic
        <select className={inp} value={topic} onChange={(e) => setTopic(e.target.value)}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">Message
        <textarea className={inp + " h-36"} value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="For a bug, include the tool name, your browser and device, and the steps that led to the problem." />
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" className="inline-flex items-center rounded-full bg-[#2E5C8A] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#244a70]">Open in my email app</button>
        <p className="text-xs text-zinc-500">This form has no server. It opens a ready-written email in your email app, so nothing is sent until you press send there.</p>
      </div>
      {sent && <p role="status" className="text-sm text-zinc-700">If nothing opened, copy your message and email it to <a className="text-[#2E5C8A] underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>}
    </form>
  );
}
