import React from 'react';
import { Book, AlertCircle, UserCog, Lightbulb, ChevronRight, MessageCircle } from 'lucide-react';

const HelpCenter: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">我们能为您提供什么帮助？</h2>
                <div className="max-w-xl mx-auto px-4">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="搜索问题，如：如何录入血压数据..." 
                            className="w-full pl-6 pr-12 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm outline-none"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: '操作指导', icon: Book, desc: '软件基础功能的使用方法', color: 'bg-emerald-100 text-emerald-600' },
                    { title: '数据异常', icon: AlertCircle, desc: '解决数据录入错误、同步失败', color: 'bg-blue-100 text-blue-600' },
                    { title: '账号问题', icon: UserCog, desc: '注册登录、密码找回', color: 'bg-purple-100 text-purple-600' },
                    { title: '功能建议', icon: Lightbulb, desc: '收集您的改进意见和想法', color: 'bg-amber-100 text-amber-600' },
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${item.color}`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                        <span className="text-xs text-emerald-600 font-medium flex items-center">
                            查看全部 <ChevronRight className="w-3 h-3 ml-1" />
                        </span>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">常见问题 (FAQ)</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {[
                        '如何记录每日用药情况？',
                        '同步健康数据时失败怎么办？',
                        '忘记登录密码如何处理？',
                        '希望增加血压预警功能'
                    ].map((q, i) => (
                        <div key={i} className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center group">
                            <span className="text-gray-700 group-hover:text-emerald-700">{q}</span>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between border border-emerald-100">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold text-emerald-900">没有找到您的问题？</h3>
                    <p className="text-emerald-700 text-sm mt-1">请通过以下渠道联系我们，我们将为您提供专业的帮助</p>
                </div>
                <div className="flex space-x-4">
                    <button className="flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow-sm transition-colors">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        在线客服
                    </button>
                    <button className="flex items-center px-6 py-3 bg-white text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors">
                        发送邮件
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HelpCenter;