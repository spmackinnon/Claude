'use client';
import { useState } from 'react';

const TABS = ['Bills', 'Documents', 'Contacts'];

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

  const deleteBill = (id) => onUpdate({ bills: bills.filter(b => b.id !== id) });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-stone-500">Track recurring bills and their due dates.</p>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Bill
        </button>
      </div>

      {showAdd && (
        <form onSubmit={addBill} className="bg-sage-50 border border-sage-100 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Bill name *"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="col-span-2 text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
            />
            <input
              type="text"
              placeholder="Amount (e.g. 120)"
              value={form.amount}
              onChange={e => setForm({ ...form, amount: e.target.value })}
              className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
            />
            <input
              type="text"
              placeholder="Due day (e.g. 1st)"
              value={form.dueDay}
              onChange={e => setForm({ ...form, dueDay: e.target.value })}
              className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-stone-600 cursor-pointer">
            <input
              type="checkbox"
              className="custom-checkbox"
              checked={form.autopay}
              onChange={e => setForm({ ...form, autopay: e.target.checked })}
            />
            On autopay
          </label>
          <input
            type="text"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setShowAdd(false)} className="text-sm text-stone-400 px-3 py-1.5 hover:text-stone-600">Cancel</button>
            <button type="submit" className="text-sm bg-sage-600 text-white px-4 py-1.5 rounded-lg hover:bg-sage-700 transition-colors">Save</button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left pb-2 text-xs text-stone-400 font-medium">Bill</th>
              <th className="text-right pb-2 text-xs text-stone-400 font-medium">Amount</th>
              <th className="text-center pb-2 text-xs text-stone-400 font-medium">Due</th>
              <th className="text-center pb-2 text-xs text-stone-400 font-medium">Autopay</th>
              <th className="pb-2 w-6"></th>
            </tr>
          </thead>
          <tbody>
            {bills.map(bill => (
              <tr key={bill.id} className="border-b border-stone-50 group hover:bg-stone-50 transition-colors">
                <td className="py-3 pr-3">
                  <div className="font-medium text-stone-700">{bill.name}</div>
                  {bill.notes && <div className="text-xs text-stone-400 mt-0.5">{bill.notes}</div>}
                </td>
                <td className="py-3 text-right text-stone-600 font-mono">
                  {bill.amount ? `$${bill.amount}` : '—'}
                </td>
                <td className="py-3 text-center text-stone-500">{bill.dueDay || '—'}</td>
                <td className="py-3 text-center">
                  {bill.autopay ? (
                    <span className="badge bg-sage-50 text-sage-700">Auto</span>
                  ) : (
                    <span className="badge bg-stone-100 text-stone-500">Manual</span>
                  )}
                </td>
                <td className="py-3">
                  <button
                    onClick={() => deleteBill(bill.id)}
                    className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {bills.length === 0 && (
          <p className="text-stone-300 text-sm py-6 text-center">No bills added yet.</p>
        )}
      </div>
    </div>
  );
}

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

  const deleteDoc = (id) => onUpdate({ documents: documents.filter(d => d.id !== id) });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-stone-500">Where are your important documents stored?</p>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Document
        </button>
      </div>

      {showAdd && (
        <form onSubmit={addDoc} className="bg-sage-50 border border-sage-100 rounded-xl p-4 mb-4 space-y-3">
          <input
            type="text"
            placeholder="Document name *"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
          />
          <input
            type="text"
            placeholder="Where is it stored?"
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setShowAdd(false)} className="text-sm text-stone-400 px-3 py-1.5 hover:text-stone-600">Cancel</button>
            <button type="submit" className="text-sm bg-sage-600 text-white px-4 py-1.5 rounded-lg hover:bg-sage-700 transition-colors">Save</button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {documents.map(doc => (
          <div key={doc.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-stone-50 group transition-colors">
            <div className="w-8 h-8 bg-stone-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#78716C" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-stone-700">{doc.name}</p>
              {doc.location && <p className="text-xs text-stone-500 mt-0.5">📍 {doc.location}</p>}
              {doc.notes && <p className="text-xs text-stone-400 mt-0.5">{doc.notes}</p>}
            </div>
            <button
              onClick={() => deleteDoc(doc.id)}
              className="opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all flex-shrink-0"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
        {documents.length === 0 && (
          <p className="text-stone-300 text-sm py-6 text-center">No documents added yet.</p>
        )}
      </div>
    </div>
  );
}

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

  const deleteContact = (id) => onUpdate({ contacts: contacts.filter(c => c.id !== id) });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-stone-500">Key people in your household network.</p>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Contact
        </button>
      </div>

      {showAdd && (
        <form onSubmit={addContact} className="bg-sage-50 border border-sage-100 rounded-xl p-4 mb-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name *"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
            />
            <input
              type="text"
              placeholder="Role (e.g. Plumber)"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              className="text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
            />
          </div>
          <input
            type="text"
            placeholder="Phone number"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            className="w-full text-sm border border-stone-200 rounded-lg px-3 py-2 text-stone-700 placeholder-stone-300"
          />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setShowAdd(false)} className="text-sm text-stone-400 px-3 py-1.5 hover:text-stone-600">Cancel</button>
            <button type="submit" className="text-sm bg-sage-600 text-white px-4 py-1.5 rounded-lg hover:bg-sage-700 transition-colors">Save</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contacts.map(contact => (
          <div key={contact.id} className="p-3 rounded-xl border border-stone-100 hover:border-stone-200 group transition-colors relative">
            <button
              onClick={() => deleteContact(contact.id)}
              className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 text-stone-300 hover:text-red-400 transition-all"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-sm font-medium text-stone-500">
                {contact.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-stone-700">{contact.name}</p>
                {contact.role && <p className="text-xs text-stone-400">{contact.role}</p>}
              </div>
            </div>
            {contact.phone && (
              <p className="text-xs text-stone-500 mt-1">📞 {contact.phone}</p>
            )}
            {contact.notes && <p className="text-xs text-stone-400 mt-1">{contact.notes}</p>}
          </div>
        ))}
        {contacts.length === 0 && (
          <p className="text-stone-300 text-sm py-6 col-span-2 text-center">No contacts added yet.</p>
        )}
      </div>
    </div>
  );
}

export default function Records({ data, onUpdate }) {
  const [activeTab, setActiveTab] = useState('Bills');

  return (
    <div className="space-fade max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="font-serif text-2xl text-stone-800">Records & Resources</h1>
        <p className="text-stone-500 text-sm mt-1">
          A home for the information you always need but can never find.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-4">
        {/* Tabs */}
        <div className="flex gap-1 mb-5 bg-stone-50 rounded-xl p-1">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-white text-stone-700 shadow-sm'
                  : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Bills' && (
          <BillsTab bills={data.bills} onUpdate={onUpdate} />
        )}
        {activeTab === 'Documents' && (
          <DocumentsTab documents={data.documents} onUpdate={onUpdate} />
        )}
        {activeTab === 'Contacts' && (
          <ContactsTab contacts={data.contacts} onUpdate={onUpdate} />
        )}
      </div>

      <div className="mt-4 bg-stone-50 rounded-xl p-4">
        <p className="text-xs text-stone-400 font-medium uppercase tracking-wide mb-2">Remember</p>
        <p className="text-sm text-stone-500">
          You don't need to fill everything in at once. Add what you know now, and fill in the gaps when you look something up. The goal is to never search for the same thing twice.
        </p>
      </div>
    </div>
  );
}
