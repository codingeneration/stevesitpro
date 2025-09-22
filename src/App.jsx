import React, { useState } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyo6dZN1C2utD35Rc3UwrJ56l-9ACyiS7mNfbqB19E1_2eKPwA-nu6xtsJzLcsDTc7w/exec";

export default function App() {
  const [form, setForm] = useState({ name:"", email:"", company:"", message:"", website:"" });
  const [status, setStatus] = useState({ type:"idle", note:"" });

  const submitDirect = async () => {
    if ((form.website||"").trim() !== "") { setStatus({ type:"ok", note:"Thanks!" }); return; }
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus({ type:"error", note:"Please enter your name, email and a short message." });
      return;
    }
    setStatus({ type:"sending", note:"" });
    try {
      const res = await fetch(WEB_APP_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          website: form.website || "",
          source: "stevesitpro.com"
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.status === "error") throw new Error(data.message || `HTTP ${res.status}`);
      setStatus({ type:"ok", note:"Thanks! We received your message." });
      setForm({ name:"", email:"", company:"", message:"", website:"" });
    } catch (e) {
      setStatus({ type:"error", note:"Submission failed. Try again or email us." });
    }
  };

  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700">Steve’s IT Pro</h1>
      <p className="text-slate-600 mt-2">Google Workspace consulting & Apps Script automation</p>

      <form className="mt-6 grid gap-3" onSubmit={(e)=>{e.preventDefault(); submitDirect();}}>
        <input className="border border-slate-300 rounded-xl px-3 py-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="border border-slate-300 rounded-xl px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="border border-slate-300 rounded-xl px-3 py-2" placeholder="Company" value={form.company} onChange={e=>setForm({...form, company:e.target.value})}/>
        <textarea className="border border-slate-300 rounded-xl px-3 py-2" rows={5} placeholder="What problem should we solve?" value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>

        {/* Honeypot */}
        <input type="text" name="website" value={form.website||""} onChange={e=>setForm({...form, website:e.target.value})} style={{ display:"none" }} tabIndex={-1} autoComplete="off" />

        <button type="submit" className="px-4 py-2 rounded-xl bg-green-600 text-white inline-flex items-center gap-2 disabled:opacity-50" disabled={status.type==="sending"}>
          {status.type==="sending" ? "Sending…" : "Send"} <ArrowRight className="w-4 h-4" />
        </button>
        {status.type==="ok" && <div className="text-xs text-green-700">{status.note}</div>}
        {status.type==="error" && <div className="text-xs text-red-600">{status.note}</div>}
        <div className="text-xs text-slate-500">Prefer email? steve@stevesitpro.com</div>
      </form>

      <div className="mt-10 text-sm text-slate-600">
        <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-blue-600"/> steve@stevesitpro.com</div>
        <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-green-600"/> TBD</div>
      </div>
    </main>
  );
}