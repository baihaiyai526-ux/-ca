import React, { useState } from 'react';
import { Plus, Search, Filter, AlertCircle, Clock, CalendarDays, Bell } from 'lucide-react';
import { Medication, MedicationType } from '../types';

const MOCK_MEDICATIONS: Medication[] = [
    {
        id: '1',
        name: '阿司匹林肠溶片',
        type: MedicationType.WESTERN,
        dosage: '100mg',
        frequency: '1次/天',
        nextDose: '08:00',
        instructions: '饭后服用',
        stock: 24
    },
    {
        id: '2',
        name: '六味地黄丸',
        type: MedicationType.TCM,
        dosage: '8丸',
        frequency: '2次/天',
        nextDose: '12:00',
        instructions: '空腹温开水送服',
        stock: 120
    },
    {
        id: '3',
        name: '二甲双胍片',
        type: MedicationType.WESTERN,
        dosage: '0.5g',
        frequency: '3次/天',
        nextDose: '12:00',
        instructions: '餐中或餐后即服',
        stock: 45
    }
];

const MedicationManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'add'>('list');
    const [medications] = useState<Medication[]>(MOCK_MEDICATIONS);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">用药管理</h2>
                    <p className="text-gray-500 text-sm mt-1">管理您的中西药处方与服药提醒</p>
                </div>
                <button 
                    onClick={() => setActiveTab('add')}
                    className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5 mr-1" />
                    添加新药
                </button>
            </div>

            {/* Content Area */}
            {activeTab === 'list' ? (
                <>
                    {/* Search and Filters */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input 
                                type="text" 
                                placeholder="搜索药品名称..." 
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center text-gray-600 hover:bg-gray-50">
                                <Filter className="w-4 h-4 mr-2" />
                                全部类型
                            </button>
                            <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center text-gray-600 hover:bg-gray-50">
                                <Clock className="w-4 h-4 mr-2" />
                                服药时间
                            </button>
                        </div>
                    </div>

                    {/* Medication List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {medications.map((med) => (
                            <div key={med.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
                                <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${med.type === MedicationType.TCM ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${
                                            med.type === MedicationType.TCM 
                                                ? 'bg-amber-50 text-amber-600' 
                                                : 'bg-blue-50 text-blue-600'
                                        }`}>
                                            {med.type}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-800">{med.name}</h3>
                                    </div>
                                    <button className="text-gray-400 hover:text-emerald-600">
                                        <Bell className="w-5 h-5" />
                                    </button>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <div className="w-8 flex-shrink-0 text-gray-400">剂量</div>
                                        <div>{med.dosage}</div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <div className="w-8 flex-shrink-0 text-gray-400">频次</div>
                                        <div>{med.frequency}</div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                        <div className="w-8 flex-shrink-0 text-gray-400">医嘱</div>
                                        <div>{med.instructions}</div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                                    <div className="flex items-center text-sm text-emerald-600 font-medium">
                                        <Clock className="w-4 h-4 mr-1" />
                                        下次服用: {med.nextDose}
                                    </div>
                                    <span className="text-xs text-gray-400">库存: {med.stock}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* TCM Interaction Warning */}
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
                        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-amber-800 font-semibold mb-1">配伍禁忌智能提示</h4>
                            <p className="text-amber-700 text-sm">
                                系统检测到您正在服用“阿司匹林”，请注意避免同时食用大量银杏叶提取物或丹参类中药，以免增加出血风险。详情请咨询您的主治中医师。
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                /* Add Medication Form */
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-3xl mx-auto">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">添加新药物</h3>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">药品名称 / 扫码录入</label>
                                <div className="relative">
                                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" placeholder="请输入药品名称" />
                                    <button type="button" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600">
                                        <Search className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">药物类型</label>
                                <div className="flex space-x-4">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="type" className="text-emerald-600 focus:ring-emerald-500" defaultChecked />
                                        <span>西药</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="type" className="text-emerald-600 focus:ring-emerald-500" />
                                        <span>中药</span>
                                    </label>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">单次剂量</label>
                                <div className="flex space-x-2">
                                    <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" />
                                    <select className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                                        <option>片</option>
                                        <option>粒</option>
                                        <option>mg</option>
                                        <option>g</option>
                                        <option>ml</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">每日频次</label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500">
                                    <option>每日1次</option>
                                    <option>每日2次</option>
                                    <option>每日3次</option>
                                    <option>睡前服用</option>
                                    <option>必要时</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">服用时间设置</label>
                            <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="morning" className="rounded text-emerald-600" defaultChecked />
                                    <label htmlFor="morning">早餐后 (08:00)</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="noon" className="rounded text-emerald-600" />
                                    <label htmlFor="noon">午餐后 (12:00)</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="evening" className="rounded text-emerald-600" />
                                    <label htmlFor="evening">晚餐后 (18:00)</label>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end space-x-3">
                            <button 
                                type="button"
                                onClick={() => setActiveTab('list')}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            >
                                取消
                            </button>
                            <button 
                                type="button"
                                onClick={() => setActiveTab('list')}
                                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm"
                            >
                                保存并开启提醒
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MedicationManager;