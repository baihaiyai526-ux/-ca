import React from 'react';
import { 
    Activity, 
    Droplets, 
    Heart, 
    Weight, 
    AlertCircle, 
    CheckCircle2, 
    Clock,
    ChevronRight,
    TrendingUp,
    Pill
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { name: '周一', sys: 135, dia: 85 },
  { name: '周二', sys: 132, dia: 82 },
  { name: '周三', sys: 138, dia: 88 },
  { name: '周四', sys: 128, dia: 80 },
  { name: '周五', sys: 130, dia: 84 },
  { name: '周六', sys: 134, dia: 86 },
  { name: '周日', sys: 129, dia: 81 },
];

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-2">欢迎回来，张先生</h2>
                    <p className="text-emerald-50 mb-6 max-w-2xl">
                        今日健康状况良好，请继续保持良好的生活习惯。您的血压控制稳定，建议适当进行太极拳运动。
                    </p>
                    <div className="flex space-x-8">
                        <div className="text-center">
                            <span className="text-3xl font-bold block">85</span>
                            <span className="text-emerald-100 text-sm">健康评分</span>
                        </div>
                        <div className="text-center">
                            <span className="text-3xl font-bold block">7</span>
                            <span className="text-emerald-100 text-sm">连续打卡</span>
                        </div>
                        <div className="text-center">
                            <span className="text-3xl font-bold block">3</span>
                            <span className="text-emerald-100 text-sm">待办事项</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vitals Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: '血压监测', value: '120/80', unit: 'mmHg', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50', status: '正常范围', time: '2小时前' },
                    { title: '血糖监测', value: '5.6', unit: 'mmol/L', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50', status: '空腹正常', time: '1小时前' },
                    { title: '心率监测', value: '72', unit: '次/分钟', icon: Heart, color: 'text-purple-500', bg: 'bg-purple-50', status: '正常范围', time: '30分钟前' },
                    { title: '体重监测', value: '68.5', unit: 'kg', icon: Weight, color: 'text-amber-500', bg: 'bg-amber-50', status: '略高于标准', time: '昨天' },
                ].map((item, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg ${item.bg}`}>
                                <item.icon className={`w-5 h-5 ${item.color}`} />
                            </div>
                            <span className="text-xs text-gray-400">{item.time}</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{item.title}</h3>
                        <div className="flex items-baseline space-x-1 mt-1">
                            <span className="text-2xl font-bold text-gray-900">{item.value}</span>
                            <span className="text-xs text-gray-500">{item.unit}</span>
                        </div>
                        <div className="flex items-center mt-3 text-xs">
                            {item.status.includes('高') ? (
                                <AlertCircle className="w-3 h-3 text-amber-500 mr-1" />
                            ) : (
                                <CheckCircle2 className="w-3 h-3 text-emerald-500 mr-1" />
                            )}
                            <span className={item.status.includes('高') ? 'text-amber-500' : 'text-emerald-500'}>
                                {item.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Medication Reminder */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            <Clock className="w-5 h-5 mr-2 text-emerald-600" />
                            今日用药提醒
                        </h3>
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">查看全部</button>
                    </div>
                    
                    <div className="space-y-4">
                        {[
                            { name: '降压药 - 氨氯地平片', dose: '5mg', time: '08:00', status: 'taken', type: '西药' },
                            { name: '降糖药 - 二甲双胍片', dose: '0.5g', time: '12:00', status: 'pending', type: '西药' },
                            { name: '中药调理 - 六味地黄丸', dose: '9g', time: '18:00', status: 'pending', type: '中药' },
                        ].map((med, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div className="flex items-center space-x-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        med.type === '中药' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                    }`}>
                                        <Pill className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">{med.name}</h4>
                                        <p className="text-xs text-gray-500">{med.dose} • {med.time}</p>
                                    </div>
                                </div>
                                <div>
                                    {med.status === 'taken' ? (
                                        <span className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            已服用
                                        </span>
                                    ) : (
                                        <span className="flex items-center px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                                            <Clock className="w-3 h-3 mr-1" />
                                            待服用
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
                            一周血压趋势
                        </h3>
                        <button className="p-1 hover:bg-gray-100 rounded">
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                                <Tooltip 
                                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                                />
                                <Area type="monotone" dataKey="sys" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorSys)" name="收缩压" />
                                <Area type="monotone" dataKey="dia" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorDia)" name="舒张压" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;