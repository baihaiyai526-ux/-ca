import React from 'react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Download, Calendar, FileText } from 'lucide-react';

const HEALTH_DATA = [
  { date: '11/01', sys: 130, dia: 85, sugar: 6.1 },
  { date: '11/05', sys: 128, dia: 82, sugar: 5.8 },
  { date: '11/10', sys: 135, dia: 88, sugar: 6.5 },
  { date: '11/15', sys: 125, dia: 80, sugar: 5.5 },
  { date: '11/20', sys: 122, dia: 78, sugar: 5.6 },
  { date: '11/25', sys: 130, dia: 84, sugar: 6.0 },
  { date: '11/30', sys: 126, dia: 81, sugar: 5.7 },
];

const MED_DISTRIBUTION = [
  { name: '中药', value: 35 },
  { name: '西药', value: 65 },
];

const COLORS = ['#10b981', '#3b82f6'];

const HealthAnalytics: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">健康数据看板</h2>
                    <p className="text-gray-500 text-sm mt-1">查看您的健康趋势分析与用药统计</p>
                </div>
                <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 flex items-center shadow-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        最近30天
                    </button>
                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 flex items-center shadow-sm">
                        <Download className="w-4 h-4 mr-2" />
                        导出报告
                    </button>
                </div>
            </div>

            {/* Main Dual Axis Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">血压/血糖 混合趋势图</h3>
                    <div className="flex items-center space-x-4 text-xs">
                         <span className="flex items-center"><div className="w-3 h-1 bg-red-500 mr-1"></div> 收缩压</span>
                         <span className="flex items-center"><div className="w-3 h-1 bg-blue-500 mr-1"></div> 舒张压</span>
                         <span className="flex items-center"><div className="w-3 h-3 bg-emerald-500 rounded-full mr-1"></div> 血糖</span>
                    </div>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={HEALTH_DATA}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="date" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                            {/* Left Y Axis for BP */}
                            <YAxis yAxisId="left" label={{ value: 'mmHg', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#999', fontSize: 12} }} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                            {/* Right Y Axis for Sugar */}
                            <YAxis yAxisId="right" orientation="right" label={{ value: 'mmol/L', angle: 90, position: 'insideRight', style: {textAnchor: 'middle', fill: '#999', fontSize: 12} }} tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                            <Tooltip 
                                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                            />
                            <Line yAxisId="left" type="monotone" dataKey="sys" stroke="#ef4444" strokeWidth={2} dot={false} name="收缩压" />
                            <Line yAxisId="left" type="monotone" dataKey="dia" stroke="#3b82f6" strokeWidth={2} dot={false} name="舒张压" />
                            <Bar yAxisId="right" dataKey="sugar" barSize={20} fill="#10b981" radius={[4, 4, 0, 0]} name="血糖" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-4">
                    <div className="text-center">
                        <p className="text-gray-400 text-xs">平均收缩压</p>
                        <p className="text-xl font-bold text-gray-800">128 <span className="text-xs font-normal text-gray-500">mmHg</span></p>
                    </div>
                    <div className="text-center border-l border-gray-100">
                        <p className="text-gray-400 text-xs">平均舒张压</p>
                        <p className="text-xl font-bold text-gray-800">82 <span className="text-xs font-normal text-gray-500">mmHg</span></p>
                    </div>
                    <div className="text-center border-l border-gray-100">
                        <p className="text-gray-400 text-xs">平均血糖</p>
                        <p className="text-xl font-bold text-gray-800">5.8 <span className="text-xs font-normal text-gray-500">mmol/L</span></p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Medication Stats */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">中西药用药比例</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={MED_DISTRIBUTION}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {MED_DISTRIBUTION.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Generated Reports */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">健康周报 / 月报</h3>
                    <div className="space-y-3">
                        {[
                            { title: '2023年11月健康月报', date: '2023-12-01', size: '2.4MB' },
                            { title: '11月第4周健康周报', date: '2023-11-27', size: '1.1MB' },
                            { title: '11月第3周健康周报', date: '2023-11-20', size: '1.2MB' },
                        ].map((report, i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-red-50 text-red-500 p-2 rounded">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">{report.title}</p>
                                        <p className="text-xs text-gray-400">{report.date} • {report.size}</p>
                                    </div>
                                </div>
                                <Download className="w-5 h-5 text-gray-400 hover:text-emerald-600" />
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                        查看更多历史报告
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HealthAnalytics;