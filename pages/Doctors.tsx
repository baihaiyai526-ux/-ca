import React from 'react';
import { Star, Video, MessageSquare, Clock, Filter, MapPin } from 'lucide-react';
import { Doctor } from '../types';

const MOCK_DOCTORS: Doctor[] = [
    {
        id: '1',
        name: '王建国',
        title: '主任医师',
        department: '中医内科',
        specialty: ['高血压', '糖尿病', '心脑血管病'],
        hospital: '北京中医药大学附属医院',
        imageUrl: 'https://picsum.photos/id/1012/200/200',
        available: true,
        consultationCount: 1250,
        price: 80
    },
    {
        id: '2',
        name: '李秀英',
        title: '副主任医师',
        department: '内分泌科',
        specialty: ['甲状腺疾病', '代谢综合征'],
        hospital: '上海中医院',
        imageUrl: 'https://picsum.photos/id/1011/200/200',
        available: false,
        consultationCount: 890,
        price: 50
    },
    {
        id: '3',
        name: '张明远',
        title: '主治医师',
        department: '脾胃病科',
        specialty: ['消化系统疾病', '中医调理'],
        hospital: '广东省中医院',
        imageUrl: 'https://picsum.photos/id/1025/200/200',
        available: true,
        consultationCount: 560,
        price: 40
    }
];

const DoctorConsultation: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">医生在线咨询</h2>
                    <p className="text-gray-500 text-sm mt-1">专业中西医专家为您提供健康指导</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                    <input type="text" placeholder="搜索医生姓名或科室" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 outline-none" />
                </div>
                <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 outline-none">
                    <option>全部科室</option>
                    <option>中医内科</option>
                    <option>内分泌科</option>
                    <option>心血管科</option>
                </select>
                <select className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 outline-none">
                    <option>全部职称</option>
                    <option>主任医师</option>
                    <option>副主任医师</option>
                    <option>主治医师</option>
                </select>
            </div>

            {/* Doctor List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_DOCTORS.map((doc) => (
                    <div key={doc.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="relative">
                                        <img src={doc.imageUrl} alt={doc.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                        {doc.available && (
                                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-800">{doc.name}</h3>
                                        <p className="text-emerald-600 text-sm font-medium">{doc.title}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold text-amber-500">¥{doc.price}</span>
                                    <span className="text-xs text-gray-400 block">/次</span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <div className="flex items-center text-xs text-gray-500">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {doc.hospital} • {doc.department}
                                </div>
                                <div className="flex items-center text-xs text-gray-500">
                                    <Star className="w-3 h-3 mr-1 text-amber-400 fill-current" />
                                    {doc.consultationCount} 次咨询 | 98% 好评
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {doc.specialty.map((tag, i) => (
                                    <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors text-sm font-medium">
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    图文咨询
                                </button>
                                <button className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                                    <Video className="w-4 h-4 mr-2" />
                                    预约视频
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                            <span className="text-xs text-gray-500 flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                最快可约: 今天 14:00
                            </span>
                            <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:underline">查看排班 &gt;</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorConsultation;