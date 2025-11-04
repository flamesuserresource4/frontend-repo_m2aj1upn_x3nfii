import React, { useEffect, useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

function useAuth() {
  const [token, setToken] = useState(() => localStorage.getItem('cms_token') || '');
  const isAuthed = !!token;
  const headers = useMemo(() => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }), [token]);
  const logout = () => { localStorage.removeItem('cms_token'); setToken(''); };
  return { token, setToken, isAuthed, headers, logout };
}

const Section = ({ title, children, right }) => (
  <section className="rounded-xl border border-[#0B1E3F]/10 bg-white p-5">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="font-serif text-xl text-[#0B1E3F]">{title}</h3>
      {right}
    </div>
    {children}
  </section>
);

export default function Admin() {
  const { token, setToken, isAuthed, headers, logout } = useAuth();
  const [view, setView] = useState('services');
  const [error, setError] = useState('');

  // Login form state
  const [email, setEmail] = useState('admin@compassremodeling.com');
  const [password, setPassword] = useState('Compass2025!');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error('Invalid credentials');
      const data = await res.json();
      localStorage.setItem('cms_token', data.access_token);
      setToken(data.access_token);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-[#EADBC8] text-[#0B1E3F]">
        <div className="mx-auto flex max-w-md flex-col gap-6 px-6 py-20">
          <h1 className="text-center font-serif text-3xl">Admin Login</h1>
          <form onSubmit={handleLogin} className="rounded-xl border border-[#0B1E3F]/10 bg-white p-6 shadow-sm">
            <label className="mb-2 block text-sm">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="mb-4 w-full rounded-md border border-[#0B1E3F]/20 px-3 py-2 outline-none focus:border-[#0B1E3F]" />
            <label className="mb-2 block text-sm">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="mb-6 w-full rounded-md border border-[#0B1E3F]/20 px-3 py-2 outline-none focus:border-[#0B1E3F]" />
            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
            <button className="w-full rounded-md bg-[#0B1E3F] px-4 py-2 text-white">Sign in</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EADBC8]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-[#0B1E3F]">Compass CMS</h1>
          <div className="flex items-center gap-3">
            <a href="#/preview" className="rounded-md border border-[#0B1E3F]/20 bg-white px-3 py-1.5 text-sm text-[#0B1E3F]">Preview</a>
            <button onClick={logout} className="rounded-md bg-[#0B1E3F] px-3 py-1.5 text-sm text-white">Logout</button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {['services','gallery','testimonials','messages','media'].map(tab => (
            <button key={tab} onClick={()=>setView(tab)} className={`rounded-md px-3 py-1.5 text-sm capitalize ${view===tab? 'bg-[#0B1E3F] text-white' : 'bg-white text-[#0B1E3F] border border-[#0B1E3F]/20'}`}>{tab}</button>
          ))}
        </div>

        {view === 'services' && <ServicesAdmin headers={headers} />}
        {view === 'gallery' && <GalleryAdmin headers={headers} />}
        {view === 'testimonials' && <TestimonialsAdmin headers={headers} />}
        {view === 'messages' && <MessagesAdmin headers={headers} />}
        {view === 'media' && <MediaUrlAdmin headers={headers} />}
      </div>
    </div>
  );
}

function ServicesAdmin({ headers }) {
  const [form, setForm] = useState({ title:'', description:'', image_url:'', featured:false, order:0 });
  const [items, setItems] = useState([]);

  const load = async () => {
    const res = await fetch(`${API_BASE}/api/services`);
    const data = await res.json();
    setItems(data);
  };
  useEffect(()=>{ load(); },[]);

  const submit = async () => {
    await fetch(`${API_BASE}/api/admin/services`, { method:'POST', headers, body: JSON.stringify({ ...form, order:Number(form.order)||0 }) });
    setForm({ title:'', description:'', image_url:'', featured:false, order:0 });
    load();
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Section title="Add Service">
        <div className="grid gap-3">
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={4} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <input placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form, featured:e.target.checked})} /> Featured</label>
            <input type="number" placeholder="Order" value={form.order} onChange={e=>setForm({...form, order:e.target.value})} className="w-28 rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          </div>
          <button onClick={submit} className="rounded-md bg-[#0B1E3F] px-4 py-2 text-white">Save</button>
        </div>
      </Section>
      <Section title="Existing Services">
        <div className="grid gap-3">
          {items.map((s)=> (
            <div key={s.title} className="flex items-center gap-4 rounded-md border border-[#0B1E3F]/10 bg-white p-3">
              {s.image_url && <img src={s.image_url} alt="" className="h-14 w-20 rounded object-cover" />}
              <div className="min-w-0">
                <div className="font-medium text-[#0B1E3F]">{s.title}</div>
                <div className="truncate text-sm text-[#0B1E3F]/70">{s.description}</div>
              </div>
              <span className="ml-auto text-xs text-[#0B1E3F]/60">order {s.order||0}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function GalleryAdmin({ headers }) {
  const [form, setForm] = useState({ title:'', image_url:'', category:'', order:0 });
  const [items, setItems] = useState([]);
  const load = async () => {
    const res = await fetch(`${API_BASE}/api/gallery`);
    setItems(await res.json());
  };
  useEffect(()=>{ load(); },[]);
  const submit = async () => {
    await fetch(`${API_BASE}/api/admin/gallery`, { method:'POST', headers, body: JSON.stringify({ ...form, order:Number(form.order)||0 }) });
    setForm({ title:'', image_url:'', category:'', order:0 });
    load();
  };
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Section title="Add Gallery Item">
        <div className="grid gap-3">
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <input placeholder="Image URL" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <input type="number" placeholder="Order" value={form.order} onChange={e=>setForm({...form, order:e.target.value})} className="w-28 rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <button onClick={submit} className="rounded-md bg-[#0B1E3F] px-4 py-2 text-white">Save</button>
        </div>
      </Section>
      <Section title="Existing Gallery">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {items.map((g)=> (
            <figure key={g.title} className="overflow-hidden rounded-md border border-[#0B1E3F]/10 bg-white">
              <img src={g.image_url} alt="" className="h-28 w-full object-cover" />
              <figcaption className="p-2 text-xs text-[#0B1E3F]">{g.title}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </div>
  );
}

function TestimonialsAdmin({ headers }) {
  const [form, setForm] = useState({ client_name:'', description:'', video_url:'', thumbnail_url:'', order:0 });
  const [items, setItems] = useState([]);
  const load = async () => {
    const res = await fetch(`${API_BASE}/api/testimonials`);
    setItems(await res.json());
  };
  useEffect(()=>{ load(); },[]);
  const submit = async () => {
    await fetch(`${API_BASE}/api/admin/testimonials`, { method:'POST', headers, body: JSON.stringify({ ...form, order:Number(form.order)||0 }) });
    setForm({ client_name:'', description:'', video_url:'', thumbnail_url:'', order:0 });
    load();
  };
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Section title="Add Testimonial">
        <div className="grid gap-3">
          <input placeholder="Client name" value={form.client_name} onChange={e=>setForm({...form,client_name:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} rows={3} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <input placeholder="Video URL" value={form.video_url} onChange={e=>setForm({...form,video_url:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <input placeholder="Thumbnail URL" value={form.thumbnail_url} onChange={e=>setForm({...form,thumbnail_url:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <input type="number" placeholder="Order" value={form.order} onChange={e=>setForm({...form, order:e.target.value})} className="w-28 rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <button onClick={submit} className="rounded-md bg-[#0B1E3F] px-4 py-2 text-white">Save</button>
        </div>
      </Section>
      <Section title="Existing Testimonials">
        <div className="grid gap-3">
          {items.map((t)=> (
            <div key={t.client_name} className="flex items-center gap-3 rounded-md border border-[#0B1E3F]/10 bg-white p-3">
              {t.thumbnail_url && <img src={t.thumbnail_url} alt="" className="h-12 w-12 rounded object-cover" />}
              <div className="min-w-0">
                <div className="font-medium text-[#0B1E3F]">{t.client_name}</div>
                <div className="truncate text-sm text-[#0B1E3F]/70">{t.description}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function MessagesAdmin({ headers }) {
  const [items, setItems] = useState([]);
  const load = async () => {
    const res = await fetch(`${API_BASE}/api/admin/messages`, { headers: { Authorization: headers.Authorization } });
    setItems(await res.json());
  };
  useEffect(()=>{ load(); },[]);

  return (
    <Section title="Contact Messages" right={<button onClick={load} className="rounded-md border border-[#0B1E3F]/20 bg-white px-3 py-1.5 text-sm">Refresh</button>}>
      <div className="grid gap-3">
        {items.map((m)=> (
          <div key={m.id} className="rounded-md border border-[#0B1E3F]/10 bg-white p-3 text-sm">
            <div className="mb-1 font-medium text-[#0B1E3F]">{m.name} • {m.email} • {m.phone||'—'}</div>
            <div className="text-[#0B1E3F]/80">{m.message}</div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-[#0B1E3F]/70">No messages yet.</p>}
      </div>
    </Section>
  );
}

function MediaUrlAdmin({ headers }) {
  const [form, setForm] = useState({ url:'', type:'image/jpeg', width:'', height:'', size:'', alt:'' });
  const [result, setResult] = useState(null);

  const save = async () => {
    const payload = { ...form, width: form.width? Number(form.width): undefined, height: form.height? Number(form.height): undefined, size: form.size? Number(form.size): undefined };
    const res = await fetch(`${API_BASE}/api/admin/media-url`, { method: 'POST', headers, body: JSON.stringify(payload) });
    const data = await res.json();
    setResult(data);
    setForm({ url:'', type:'image/jpeg', width:'', height:'', size:'', alt:'' });
  };

  return (
    <Section title="Add Media by URL">
      <div className="grid gap-3">
        <input placeholder="Public URL (image/video)" value={form.url} onChange={(e)=>setForm({...form,url:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <input placeholder="Type (mime)" value={form.type} onChange={(e)=>setForm({...form,type:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <input placeholder="Width" value={form.width} onChange={(e)=>setForm({...form,width:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <input placeholder="Height" value={form.height} onChange={(e)=>setForm({...form,height:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
          <input placeholder="Size (bytes)" value={form.size} onChange={(e)=>setForm({...form,size:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
        </div>
        <input placeholder="Alt text / caption" value={form.alt} onChange={(e)=>setForm({...form,alt:e.target.value})} className="rounded-md border border-[#0B1E3F]/20 px-3 py-2" />
        <button onClick={save} className="rounded-md bg-[#0B1E3F] px-4 py-2 text-white">Save Asset</button>
        {result && (
          <div className="rounded-md border border-[#0B1E3F]/10 bg-white p-3 text-sm">
            <div className="font-medium text-[#0B1E3F]">Saved</div>
            <a href={result.url} target="_blank" className="text-[#0B1E3F] underline" rel="noreferrer">{result.url}</a>
          </div>
        )}
      </div>
    </Section>
  );
}
