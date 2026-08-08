import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Lock, Search, CheckCircle, XCircle, Clock, Download, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminPayments() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      if (data) setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'DarkNova!2322' || password === 'goku8684') {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials.");
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    fetchOrders();
  };

  const filteredOrders = orders.filter(o => 
    (filter === 'ALL' || o.status === filter) &&
    (o.order_id.toLowerCase().includes(search.toLowerCase()) || 
     o.utr_number?.toLowerCase().includes(search.toLowerCase()))
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-sm space-y-4">
          <div className="flex justify-center mb-6">
            <Lock className="w-10 h-10 text-[#3b82f6]" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-6">Admin Access</h2>
          <input 
            type="password" 
            placeholder="Enter Master Password"
            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#3b82f6] focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full py-3 bg-[#3b82f6] text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Payments Dashboard</h1>
            <p className="text-white/50 text-sm mt-1">Manage AI OCR and Manual UPI verifications.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchOrders} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#10b981]/20 hover:bg-[#10b981]/30 border border-[#10b981]/50 text-[#10b981] rounded-lg text-sm">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between gap-4 bg-white/5 p-2 rounded-xl border border-white/10">
          <div className="flex gap-1 overflow-x-auto">
            {['ALL', 'PAID', 'PENDING_VERIFICATION', 'FAILED'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === f ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/80'}`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text" 
              placeholder="Search Order or UTR..."
              className="pl-9 pr-4 py-2 bg-black/50 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-[#3b82f6] w-full md:w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-black/40 border-b border-white/10 text-white/50 uppercase tracking-widest text-xs">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">UTR Number</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-white/40">No orders found.</td>
                  </tr>
                ) : (
                  filteredOrders.map(order => (
                    <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={order.id} className="hover:bg-white/[0.02]">
                      <td className="px-6 py-4 font-mono text-white/80">{order.order_id}</td>
                      <td className="px-6 py-4">{order.service_name}</td>
                      <td className="px-6 py-4 font-mono">₹{order.amount}</td>
                      <td className="px-6 py-4 font-mono text-white/60">{order.utr_number || 'N/A'}</td>
                      <td className="px-6 py-4">
                        {order.status === 'PAID' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#10b981]/10 text-[#10b981] text-xs font-bold"><CheckCircle className="w-3 h-3" /> PAID</span>}
                        {order.status === 'PENDING_VERIFICATION' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-bold"><Clock className="w-3 h-3" /> PENDING</span>}
                        {order.status === 'FAILED' && <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold"><XCircle className="w-3 h-3" /> FAILED</span>}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {order.status !== 'PAID' && (
                          <button onClick={() => updateStatus(order.id, 'PAID')} className="px-3 py-1 bg-[#10b981]/20 hover:bg-[#10b981]/40 text-[#10b981] rounded text-xs font-bold transition-colors">Approve</button>
                        )}
                        {order.status !== 'FAILED' && (
                          <button onClick={() => updateStatus(order.id, 'FAILED')} className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-500 rounded text-xs font-bold transition-colors">Reject</button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
