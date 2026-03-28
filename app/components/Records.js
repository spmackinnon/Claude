'use client';
import { useState } from 'react';

const TABS = ['Bills', 'Documents', 'Contacts', 'Kids', 'In Case I Die'];

// ── Bills ─────────────────────────────────────────────────────────
function BillsTab({ bills, onUpdate }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', amount: '', dueDay: '', autopay: false, notes: '' });
  const addBill = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onUpdate({ bills: [...bills, { id: `b${Date.now()}`, ...form }] });
    setForm({ name: '', amount: '', dueDay: '', autopay: false, notes: '' });
    setShowAdd(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-stone-500">Recurring bills and due dates.</p>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Bill
        </button>
      </div>
      {showAdd && (
        <form onSubmit={addBill} className="bg-sage-50 border border-sage-100 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Bill name *" value={form.name} onChange={e => setForm({...form,name:e.target.value})} className="col-span-2 text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
            <input type="text" placeholder="Amount (e.g. 120)" value={form.amount} onChange={e => setForm({...form,amount:e.target.value})} className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
            <input type="text" placeholder="Due day (e.g. 1st)" value={form.dueDay} onChange={e => setForm({...form,dueDay:e.target.value})} className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
          </div>
          <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
            <input type="checkbox" className="custom-checkbox" checked={form.autopay} onChange={e => setForm({...form,autopay:e.target.checked})} />
            On autopay
          </label>
          <input type="text" placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setShowAdd(false)} className="text-sm text-stone-400 px-3 py-1.5">Cancel</button>
            <button type="submit" className="text-sm bg-sage-600 text-white px-4 py-1.5 rounded-lg hover:bg-sage-700">Save</button>
          </div>
        </form>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-stone-100">
            <th className="text-left pb-2 text-xs text-stone-400 font-medium">Bill</th>
            <th className="text-right pb-2 text-xs text-stone-400 font-medium">Amount</th>
            <th className="text-center pb-2 text-xs text-stone-400 font-medium">Due</th>
            <th className="text-center pb-2 text-xs text-stone-400 font-medium">Autopay</th>
            <th className="pb-2 w-6"></th>
          </tr></thead>
          <tbody>
            {bills.map(bill => (
              <tr key={bill.id} className="border-b border-stone-50 group hover:bg-stone-50 transition-colors">
                <td className="py-3 pr-3">
                  <div className="font-medium text-stone-700">{bill.name}</div>
                  {bill.notes && <div className="text-xs text-stone-400 mt-0.5">{bill.notes}</div>}
                </td>
                <td className="py-3 text-right text-stone-600 font-mono">{bill.amount ? `$${bill.amount}` : '—'}</td>
                <td className="py-3 text-center text-stone-500">{bill.dueDay || '—'}</td>
                <td className="py-3 text-center">
                  {bill.autopay ? <span className="badge bg-sage-50 text-sage-700">Auto</span> : <span className="badge bg-stone-100 text-stone-500">Manual</span>}
                </td>
                <td className="py-3">
                  <button onClick={() => onUpdate({ bills: bills.filter(b => b.id !== bill.id) })} className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bills.length === 0 && <p className="text-stone-300 text-sm py-6 text-center">No bills added yet.</p>}
      </div>
    </div>
  );
}

// ── Documents ─────────────────────────────────────────────────────
function DocumentsTab({ documents, onUpdate }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', location: '', notes: '' });
  const addDoc = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onUpdate({ documents: [...documents, { id: `d${Date.now()}`, ...form }] });
    setForm({ name: '', location: '', notes: '' });
    setShowAdd(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-stone-500">Where are your important documents?</p>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Document
        </button>
      </div>
      {showAdd && (
        <form onSubmit={addDoc} className="bg-sage-50 border border-sage-100 rounded-xl p-4 mb-4 space-y-3">
          <input type="text" placeholder="Document name *" value={form.name} onChange={e => setForm({...form,name:e.target.value})} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
          <input type="text" placeholder="Where is it stored?" value={form.location} onChange={e => setForm({...form,location:e.target.value})} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
          <input type="text" placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setShowAdd(false)} className="text-sm text-stone-400 px-3 py-1.5">Cancel</button>
            <button type="submit" className="text-sm bg-sage-600 text-white px-4 py-1.5 rounded-lg">Save</button>
          </div>
        </form>
      )}
      <div className="space-y-2">
        {documents.map(doc => (
          <div key={doc.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-stone-50 group transition-colors">
            <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#78716C" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-700">{doc.name}</p>
              {doc.location && <p className="text-xs text-stone-500 mt-0.5">📍 {doc.location}</p>}
              {doc.notes && <p className="text-xs text-stone-400 mt-0.5">{doc.notes}</p>}
            </div>
            <button onClick={() => onUpdate({ documents: documents.filter(d => d.id !== doc.id) })} className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        ))}
        {documents.length === 0 && <p className="text-stone-300 text-sm py-6 text-center">No documents added yet.</p>}
      </div>
    </div>
  );
}

// ── Contacts ──────────────────────────────────────────────────────
function ContactsTab({ contacts, onUpdate }) {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', phone: '', notes: '' });
  const addContact = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onUpdate({ contacts: [...contacts, { id: `c${Date.now()}`, ...form }] });
    setForm({ name: '', role: '', phone: '', notes: '' });
    setShowAdd(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-stone-500">Key people in your household network.</p>
        <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Contact
        </button>
      </div>
      {showAdd && (
        <form onSubmit={addContact} className="bg-sage-50 border border-sage-100 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input type="text" placeholder="Name *" value={form.name} onChange={e => setForm({...form,name:e.target.value})} className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
            <input type="text" placeholder="Role (e.g. Plumber)" value={form.role} onChange={e => setForm({...form,role:e.target.value})} className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
          </div>
          <input type="text" placeholder="Phone number" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
          <input type="text" placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setShowAdd(false)} className="text-sm text-stone-400 px-3 py-1.5">Cancel</button>
            <button type="submit" className="text-sm bg-sage-600 text-white px-4 py-1.5 rounded-lg">Save</button>
          </div>
        </form>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contacts.map(contact => (
          <div key={contact.id} className="p-3 rounded-xl border border-stone-100 hover:border-stone-200 group transition-colors relative">
            <button onClick={() => onUpdate({ contacts: contacts.filter(c => c.id !== contact.id) })} className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-sm font-medium text-stone-500">{contact.name.charAt(0)}</div>
              <div><p className="text-sm font-medium text-stone-700">{contact.name}</p>{contact.role && <p className="text-xs text-stone-400">{contact.role}</p>}</div>
            </div>
            {contact.phone && <p className="text-xs text-stone-500 mt-1">📞 {contact.phone}</p>}
            {contact.notes && <p className="text-xs text-stone-400 mt-1">{contact.notes}</p>}
          </div>
        ))}
        {contacts.length === 0 && <p className="text-stone-300 text-sm py-6 col-span-2 text-center">No contacts added yet.</p>}
      </div>
    </div>
  );
}

// ── Kids ──────────────────────────────────────────────────────────
function KidsTab({ kids, onUpdate }) {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(null);

  const startEdit = (kid) => { setSelected(kid.id); setForm({ ...kid }); };
  const addKid = () => {
    const newKid = { id: `k${Date.now()}`, name: 'New Child', dob: '', school: '', grade: '', teacher: '', schoolPhone: '', allergies: '', medications: '', doctor: '', clothingSize: '', shoeSize: '', notes: '' };
    onUpdate({ kids: [...kids, newKid] });
    setSelected(newKid.id);
    setForm(newKid);
  };
  const saveKid = () => {
    onUpdate({ kids: kids.map(k => k.id === form.id ? form : k) });
    setSelected(null);
    setForm(null);
  };
  const deleteKid = (id) => {
    onUpdate({ kids: kids.filter(k => k.id !== id) });
    setSelected(null);
    setForm(null);
  };
  const u = (k, v) => setForm(f => ({ ...f, [k]: v }));

  if (selected && form) {
    return (
      <div>
        <button onClick={saveKid} className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-600 mb-4">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          All Kids
        </button>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[['name','Name'],['dob','Date of Birth']].map(([k,l]) => (
              <div key={k}>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wide block mb-1">{l}</label>
                <input type={k==='dob'?'date':'text'} value={form[k]} onChange={e => u(k,e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700" />
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">School</p>
            <div className="grid grid-cols-2 gap-3">
              {[['school','School Name'],['grade','Grade'],['teacher','Teacher'],['schoolPhone','School Phone']].map(([k,l]) => (
                <div key={k}>
                  <label className="text-xs text-stone-400 block mb-1">{l}</label>
                  <input type="text" value={form[k]} onChange={e => u(k,e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Health</p>
            <div className="grid grid-cols-2 gap-3">
              {[['allergies','Allergies'],['medications','Medications'],['doctor','Doctor']].map(([k,l]) => (
                <div key={k} className={k==='doctor'?'col-span-2':''}>
                  <label className="text-xs text-stone-400 block mb-1">{l}</label>
                  <input type="text" value={form[k]} onChange={e => u(k,e.target.value)} placeholder={k==='allergies'?'None known':''} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-2">Sizes</p>
            <div className="grid grid-cols-2 gap-3">
              {[['clothingSize','Clothing Size'],['shoeSize','Shoe Size']].map(([k,l]) => (
                <div key={k}>
                  <label className="text-xs text-stone-400 block mb-1">{l}</label>
                  <input type="text" value={form[k]} onChange={e => u(k,e.target.value)} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-stone-400 uppercase tracking-wide block mb-1">Notes</label>
            <textarea value={form.notes} onChange={e => u('notes',e.target.value)} rows={3} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 resize-none" placeholder="Anything else worth remembering..." />
          </div>
          <div className="flex gap-2 justify-between pt-2">
            <button onClick={() => deleteKid(form.id)} className="text-xs text-stone-300 hover:text-red-400 transition-colors">Delete</button>
            <button onClick={saveKid} className="bg-sage-600 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-sage-700 transition-colors">Save</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-stone-500">Key info for each child, all in one place.</p>
        <button onClick={addKid} className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Add Child
        </button>
      </div>
      {kids.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-stone-300 text-sm mb-1">No children added yet.</p>
          <p className="text-xs text-stone-300">Add a child to store school info, health details, and sizes.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {kids.map(kid => (
            <button key={kid.id} onClick={() => startEdit(kid)} className="p-4 rounded-xl border border-stone-100 hover:border-sage-200 hover:bg-sage-50/50 text-left transition-all group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center text-lg font-bold text-sage-600">{kid.name.charAt(0) || '?'}</div>
                <div>
                  <p className="text-sm font-semibold text-stone-700">{kid.name}</p>
                  {kid.grade && <p className="text-xs text-stone-400">{kid.grade}{kid.school ? ` · ${kid.school}` : ''}</p>}
                </div>
              </div>
              {kid.allergies && <p className="text-xs text-terracotta-500">⚠️ {kid.allergies}</p>}
              <p className="text-xs text-stone-400 mt-1 group-hover:text-sage-600 transition-colors">Tap to edit →</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── In Case I Die ─────────────────────────────────────────────────
function EmergencyTab({ emergencyInfo, onUpdate }) {
  const { accounts = [], personalMessage = '', instructions = '' } = emergencyInfo;
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ name: '', username: '', password: '', url: '', notes: '' });
  const [showPasswords, setShowPasswords] = useState({});

  const addAccount = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onUpdate({ emergencyInfo: { ...emergencyInfo, accounts: [...accounts, { id: `ic${Date.now()}`, ...form }] } });
    setForm({ name: '', username: '', password: '', url: '', notes: '' });
    setShowAdd(false);
  };

  const deleteAccount = (id) => onUpdate({ emergencyInfo: { ...emergencyInfo, accounts: accounts.filter(a => a.id !== id) } });
  const togglePw = (id) => setShowPasswords(s => ({ ...s, [id]: !s[id] }));

  return (
    <div className="space-y-5">
      {/* Warning */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
        <p className="text-xs font-semibold text-amber-700 mb-1">⚠️ Privacy notice</p>
        <p className="text-xs text-amber-600 leading-relaxed">
          This information is stored locally on your device only — no one else can access it remotely. For sensitive passwords, consider a dedicated password manager (1Password, Bitwarden). This folder is for "in case of emergency" access, not daily use.
        </p>
      </div>

      {/* Personal message */}
      <div>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-2">Personal Message / Letter</label>
        <textarea
          value={personalMessage}
          onChange={e => onUpdate({ emergencyInfo: { ...emergencyInfo, personalMessage: e.target.value } })}
          rows={3} placeholder="A note for your family, if needed..."
          className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 placeholder-stone-300 resize-none" />
      </div>

      {/* Instructions */}
      <div>
        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide block mb-2">Instructions & Important Info</label>
        <textarea
          value={instructions}
          onChange={e => onUpdate({ emergencyInfo: { ...emergencyInfo, instructions: e.target.value } })}
          rows={4} placeholder="Where to find the will, attorney contact, insurance policies, funeral wishes, etc."
          className="w-full text-sm border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 placeholder-stone-300 resize-none" />
      </div>

      {/* Accounts / Passwords */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wide">Accounts & Access</label>
          <button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            Add Account
          </button>
        </div>

        {showAdd && (
          <form onSubmit={addAccount} className="bg-stone-50 border border-stone-100 rounded-xl p-4 mb-4 space-y-3">
            <input type="text" placeholder="Account name (e.g. Online Banking) *" value={form.name} onChange={e => setForm({...form,name:e.target.value})} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
            <div className="grid grid-cols-2 gap-3">
              <input type="text" placeholder="Username / Email" value={form.username} onChange={e => setForm({...form,username:e.target.value})} className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
              <input type="text" placeholder="Password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
            </div>
            <input type="url" placeholder="Website URL (optional)" value={form.url} onChange={e => setForm({...form,url:e.target.value})} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
            <input type="text" placeholder="Notes (optional)" value={form.notes} onChange={e => setForm({...form,notes:e.target.value})} className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setShowAdd(false)} className="text-sm text-stone-400 px-3 py-1.5">Cancel</button>
              <button type="submit" className="text-sm bg-sage-600 text-white px-4 py-1.5 rounded-lg">Save</button>
            </div>
          </form>
        )}

        <div className="space-y-2">
          {accounts.map(acc => (
            <div key={acc.id} className="border border-stone-100 rounded-xl p-3 group">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-700">{acc.name}</p>
                  {acc.username && <p className="text-xs text-stone-500 mt-0.5">User: {acc.username}</p>}
                  {acc.password && (
                    <p className="text-xs text-stone-500 mt-0.5 flex items-center gap-1.5">
                      Pass: <span className="font-mono">{showPasswords[acc.id] ? acc.password : '••••••••'}</span>
                      <button onClick={() => togglePw(acc.id)} className="text-stone-400 hover:text-stone-600 transition-colors">
                        {showPasswords[acc.id] ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                        )}
                      </button>
                    </p>
                  )}
                  {acc.url && <a href={acc.url} target="_blank" rel="noopener noreferrer" className="text-xs text-sage-600 hover:underline mt-0.5 block truncate">{acc.url}</a>}
                  {acc.notes && <p className="text-xs text-stone-400 mt-0.5">{acc.notes}</p>}
                </div>
                <button onClick={() => deleteAccount(acc.id)} className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>
              </div>
            </div>
          ))}
          {accounts.length === 0 && <p className="text-stone-300 text-sm py-4 text-center">No accounts added yet.</p>}
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────
export default function Records({ data, onUpdate }) {
  const [activeTab, setActiveTab] = useState('Bills');
  return (
    <div className="space-fade max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-stone-800">Records & Resources</h1>
        <p className="text-stone-500 text-sm mt-1">A home for information your brain shouldn't have to hold.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-card p-4">
        {/* Tabs */}
        <div className="flex gap-0.5 mb-5 bg-stone-50 rounded-xl p-1 overflow-x-auto">
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                activeTab === tab ? 'bg-white text-stone-700 shadow-sm' : 'text-stone-400 hover:text-stone-600'
              }`}>
              {tab}
            </button>
          ))}
        </div>
        {activeTab === 'Bills' && <BillsTab bills={data.bills} onUpdate={onUpdate} />}
        {activeTab === 'Documents' && <DocumentsTab documents={data.documents} onUpdate={onUpdate} />}
        {activeTab === 'Contacts' && <ContactsTab contacts={data.contacts} onUpdate={onUpdate} />}
        {activeTab === 'Kids' && <KidsTab kids={data.kids || []} onUpdate={onUpdate} />}
        {activeTab === 'In Case I Die' && <EmergencyTab emergencyInfo={data.emergencyInfo || {}} onUpdate={onUpdate} />}
      </div>
    </div>
  );
}
