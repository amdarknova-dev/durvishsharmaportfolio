import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHack } from '@/context/HackContext';
import { motion } from 'framer-motion';
import { Shield, Globe, Activity, Users, Lock, Wifi, AlertTriangle, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAnalyticsData } from '@/lib/analytics';

type VisitorData = {
    ip: string;
    city: string;
    country_name: string;
    org: string;
};

const AdminDashboard = () => {
    const { isAdmin } = useHack();
    const navigate = useNavigate();
    const [visitor, setVisitor] = useState<VisitorData | null>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [analytics, setAnalytics] = useState(getAnalyticsData());

    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
            return;
        }

        // Fetch current user's IP (The Admin, or whoever is looking at this page)
        // In a real app, this would fetch from a database of ALL visitors.
        // Since this is client-side, we 'simulate' the tracking monitor by showing YOUR current connection.
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => {
                setVisitor(data);
                generateFakelogs(data);
            })
            .catch(err => console.error("Tracking blocked by adblocker probably", err));

    }, [isAdmin, navigate]);

    const generateFakelogs = (realData: any) => {
        // Generate some visual "filler" logs to look cool
        const fakeIps = ['192.168.1.105', '10.0.0.52', '172.16.0.23', '203.54.12.5'];
        const actions = ['ACCESS_REQUEST', 'PORT_SCAN', 'PAGE_VIEW', 'FILE_DOWNLOAD'];

        const newLogs = fakeIps.map(ip => ({
            timestamp: new Date(Date.now() - Math.random() * 10000000).toISOString(),
            ip: ip,
            status: Math.random() > 0.8 ? 'BLOCKED' : 'ALLOWED',
            action: actions[Math.floor(Math.random() * actions.length)]
        }));

        // Add real current user as "LIVE"
        newLogs.unshift({
            timestamp: 'NOW (LIVE)',
            ip: realData.ip || 'UNKNOWN',
            status: 'DETECTED',
            action: 'ACTIVE_SESSION'
        });

        setLogs(newLogs);
    };

    if (!isAdmin) return null;

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-6 pt-24 overflow-hidden relative">
            {/* Grid Background */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

            <div className="max-w-6xl mx-auto space-y-6 relative z-10">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-green-500/30 pb-4">
                    <div className="flex items-center gap-3">
                        <Shield className="w-8 h-8 text-green-400 animate-pulse" />
                        <div>
                            <h1 className="text-2xl font-bold tracking-widest text-white">COMMAND_CENTER</h1>
                            <p className="text-xs text-green-600">SYSTEM_INTEGRITY: 100% // AUTHORIZED_USER: ADMIN</p>
                        </div>
                    </div>
                    <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500/10" onClick={() => navigate('/')}>
                        EXIT_DASHBOARD
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="bg-black/50 border border-green-500/30 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm text-gray-400">TOTAL_VIEWS</h3>
                            <Activity className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-4xl font-bold text-white">{analytics.pageViews}</div>
                        <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                            System tracking active
                        </div>
                    </Card>

                    <Card className="bg-black/50 border border-green-500/30 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm text-gray-400">UNIQUE_VISITORS</h3>
                            <Users className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-4xl font-bold text-white">{analytics.visitors}</div>
                        <div className="text-xs text-green-400 mt-2">
                            New nodes detected
                        </div>
                    </Card>

                    <Card className="bg-black/50 border border-green-500/30 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm text-gray-400">ACTIVE_NODE</h3>
                            <Wifi className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-lg font-bold text-white truncate max-w-[200px]">
                            {visitor ? visitor.ip : 'SCANNING...'}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                            {visitor ? `${visitor.city}, ${visitor.country_name}` : 'Locating...'}
                        </div>
                    </Card>

                    <Card className="bg-black/50 border border-green-500/30 p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm text-gray-400">THREAT_LEVEL</h3>
                            <AlertTriangle className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div className="text-4xl font-bold text-yellow-500">LOW</div>
                        <div className="text-xs text-yellow-700 mt-2">
                            0 intrusions detected
                        </div>
                    </Card>
                </div>

                {/* Device Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-black/50 border border-green-500/30 p-4 flex items-center gap-4">
                        <Monitor className="w-8 h-8 text-blue-500" />
                        <div>
                            <div className="text-2xl font-bold text-white">{analytics.devices.Desktop}</div>
                            <div className="text-xs text-gray-500 uppercase">Desktop</div>
                        </div>
                    </Card>
                    <Card className="bg-black/50 border border-green-500/30 p-4 flex items-center gap-4">
                        <Smartphone className="w-8 h-8 text-green-500" />
                        <div>
                            <div className="text-2xl font-bold text-white">{analytics.devices.Mobile}</div>
                            <div className="text-xs text-gray-500 uppercase">Mobile</div>
                        </div>
                    </Card>
                    <Card className="bg-black/50 border border-green-500/30 p-4 flex items-center gap-4">
                        <Tablet className="w-8 h-8 text-purple-500" />
                        <div>
                            <div className="text-2xl font-bold text-white">{analytics.devices.Tablet}</div>
                            <div className="text-xs text-gray-500 uppercase">Tablet</div>
                        </div>
                    </Card>
                </div>


                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">

                    {/* Visitor Log */}
                    <Card className="col-span-2 bg-black/50 border border-green-500/30 p-4 flex flex-col">
                        <h3 className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                            <Activity className="w-4 h-4" /> LIVE_TRAFFIC_LOG
                        </h3>
                        <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs">
                            <div className="grid grid-cols-4 text-gray-500 border-b border-gray-800 pb-2 mb-2">
                                <span>TIMESTAMP</span>
                                <span>IP_ADDRESS</span>
                                <span>ACTION</span>
                                <span>STATUS</span>
                            </div>
                            {logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="grid grid-cols-4 hover:bg-white/5 p-1 rounded cursor-default"
                                >
                                    <span className="text-gray-400">{log.timestamp}</span>
                                    <span className="text-blue-400">{log.ip}</span>
                                    <span className="text-white">{log.action}</span>
                                    <span className={log.status === 'BLOCKED' ? 'text-red-500' : 'text-green-500'}>
                                        {log.status}
                                    </span>
                                </motion.div>
                            ))}
                            <div className="animate-pulse text-green-500 mt-4 border-t border-green-500/20 pt-2">
                                {">"} LISTENING_FOR_PACKETS...
                            </div>
                        </div>
                    </Card>

                    {/* World Map Placeholder (Stylized) */}
                    <Card className="col-span-1 bg-black/50 border border-green-500/30 p-4 flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.1),transparent_70%)]" />

                        <Globe className="w-32 h-32 text-green-900 group-hover:text-green-700 transition-colors duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 border border-green-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="w-40 h-40 border border-dashed border-green-500/10 rounded-full absolute animate-[spin_15s_linear_infinite_reverse]" />
                        </div>
                        <div className="z-10 text-center mt-8">
                            <h3 className="text-white font-bold text-lg">GLOBAL_TRACKER</h3>
                            <p className="text-xs text-gray-500">
                                {visitor ? `TARGET LOCKED: ${visitor.org}` : 'SCANNING_SECTOR...'}
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
