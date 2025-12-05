import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Leaf, Sun, Moon, Wind, Thermometer, Info, ChevronLeft, ChevronRight, CheckCircle2, Loader2 } from 'lucide-react';
import { TCMResult } from '../types';

const MOCK_TCM_DATA = [
  { subject: '平和质', A: 40, fullMark: 100 },
  { subject: '气虚质', A: 85, fullMark: 100 },
  { subject: '阳虚质', A: 60, fullMark: 100 },
  { subject: '阴虚质', A: 30, fullMark: 100 },
  { subject: '痰湿质', A: 45, fullMark: 100 },
  { subject: '湿热质', A: 20, fullMark: 100 },
  { subject: '血瘀质', A: 35, fullMark: 100 },
  { subject: '气郁质', A: 50, fullMark: 100 },
  { subject: '特禀质', A: 10, fullMark: 100 },
];

const CURRENT_RESULT: TCMResult = {
    type: "气虚质",
    score: 85,
    description: "元气不足，以疲乏、气短、自汗等气虚表现为主要特征。",
    characteristics: [
        "肌肉松软不实",
        "平素语音低弱，气短懒言",
        "容易疲乏，精神不振",
        "易出汗，舌淡红"
    ],
    advice: {
        diet: "宜选用性平偏温、健脾益气的食物，如大米、小米、黄豆、香菇、鸡肉、牛肉、大枣等。少吃空心菜、生萝卜等耗气食物。",
        exercise: "宜选择柔缓的运动，如散步、打太极拳等，不宜做剧烈运动。",
        lifestyle: "起居宜规律，夏季午间应适当休息，保持充足睡眠。注意保暖，避免劳动过度。"
    }
};

// Mock Questions Generator (60 questions)
const generateQuestions = () => {
    const baseQuestions = [
        "您精力充沛吗？（指精神头足，乐于做事）",
        "您容易疲乏吗？（指体力如何，是否稍微活动就感到累）",
        "您说话声音低弱无力吗？（指说话没有力气）",
        "您感到闷闷不乐、情绪低沉吗？（指心情不愉快，情绪低落）",
        "您比一般人怕冷吗？（指穿衣比别人多，冬天特别怕冷）",
        "您能适应外界自然和社会环境的变化吗？",
        "您容易失眠吗？（指入睡困难，或睡后易醒）",
        "您容易忘事吗？（指记性差）",
        "您手脚发凉吗？（指手脚冰凉）",
        "您胃口好吗？（指食欲如何）"
    ];
    
    const questions = baseQuestions.map((q, i) => ({ id: i + 1, text: q }));
    
    // Fill up to 60 for demo purposes
    for (let i = baseQuestions.length + 1; i <= 60; i++) {
        questions.push({ id: i, text: `这是第 ${i} 道模拟测试题目，请根据您最近三个月的实际体验进行作答。` });
    }
    
    return questions;
};

const QUESTIONS = generateQuestions();
const QUESTIONS_PER_PAGE = 5;
const OPTIONS = [
    { label: '没有', desc: '(根本不)', score: 1 },
    { label: '很少', desc: '(有一点)', score: 2 },
    { label: '有时', desc: '(有些)', score: 3 },
    { label: '经常', desc: '(相当)', score: 4 },
    { label: '总是', desc: '(非常)', score: 5 },
];

const TCMConstitution: React.FC = () => {
    const [view, setView] = useState<'result' | 'quiz'>('result');
    const [pageIndex, setPageIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<TCMResult>(CURRENT_RESULT);

    const totalPages = Math.ceil(QUESTIONS.length / QUESTIONS_PER_PAGE);
    const progress = Math.round(((pageIndex) / totalPages) * 100);
    
    // Scroll to top on page change
    useEffect(() => {
        if (view === 'quiz') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pageIndex, view]);

    // Get current page questions
    const currentQuestions = QUESTIONS.slice(
        pageIndex * QUESTIONS_PER_PAGE, 
        (pageIndex + 1) * QUESTIONS_PER_PAGE
    );

    // Check if current page is complete
    const isPageComplete = currentQuestions.every(q => answers[q.id]);

    const handleOptionSelect = (questionId: number, score: number) => {
        setAnswers(prev => ({ ...prev, [questionId]: score }));
    };

    const handleNext = () => {
        if (pageIndex < totalPages - 1) {
            setPageIndex(prev => prev + 1);
        } else {
            submitQuiz();
        }
    };

    const submitQuiz = () => {
        setIsSubmitting(true);
        // Simulate API call and Calculation
        setTimeout(() => {
            // Mock Calculation: Update score based on answers (visual effect only)
            const scores = Object.values(answers);
            if (scores.length > 0) {
                 const total = scores.reduce((a, b) => a + b, 0);
                 const avg = total / scores.length; 
                 // Simple mapping of 1-5 scale to percentage for demo
                 const newScore = Math.round(((avg - 1) / 4) * 100);
                 
                 setResult(prev => ({
                     ...prev,
                     score: newScore
                 }));
            }

            setIsSubmitting(false);
            setView('result');
            setPageIndex(0);
            setAnswers({});
        }, 2000);
    };

    const handlePrevious = () => {
        if (pageIndex > 0) {
            setPageIndex(prev => prev - 1);
        } else {
            setView('result');
        }
    };

    if (isSubmitting) {
        return (
            <div className="flex flex-col items-center justify-center h-96 animate-fade-in bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-6" />
                <h3 className="text-xl font-bold text-gray-800">正在分析您的体质数据...</h3>
                <p className="text-gray-500 mt-2 text-center max-w-sm">系统正在根据《中医体质分类与判定》标准对您的回答进行综合分析，请稍候。</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
             <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">中医体质辨识</h2>
                    <p className="text-gray-500 text-sm mt-1">基于《中医体质分类与判定》国家标准</p>
                </div>
                {view === 'result' && (
                     <button 
                        onClick={() => setView('quiz')}
                        className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                    >
                        重新测评
                    </button>
                )}
            </div>

            {view === 'result' ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
                    {/* Left: Chart & Type */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                            <div className="inline-block p-4 rounded-full bg-emerald-50 mb-4">
                                <Wind className="w-12 h-12 text-emerald-600" />
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">您的体质类型</h3>
                            <h1 className="text-4xl font-bold text-gray-800 mt-2 mb-4">{result.type}</h1>
                            <p className="text-gray-600 text-sm leading-relaxed text-left bg-gray-50 p-4 rounded-lg">
                                {result.description}
                            </p>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-sm text-gray-500">综合得分</span>
                                <span className="text-xl font-bold text-emerald-600">{result.score}</span>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 h-80">
                            <h3 className="text-sm font-bold text-gray-700 mb-2 pl-2 border-l-4 border-emerald-500">体质分布雷达图</h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MOCK_TCM_DATA}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#666' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                                    <Radar name="体质得分" dataKey="A" stroke="#059669" fill="#10b981" fillOpacity={0.5} />
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right: Detailed Advice */}
                    <div className="lg:col-span-2 space-y-6">
                         {/* Characteristics */}
                         <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                <Info className="w-5 h-5 mr-2 text-emerald-600" />
                                典型特征
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {result.characteristics.map((char, i) => (
                                    <div key={i} className="flex items-center p-3 bg-gray-50 rounded-lg text-gray-700">
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 mr-3"></div>
                                        {char}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Advice Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-orange-50 rounded-xl p-5 border border-orange-100">
                                <div className="flex items-center mb-3 text-orange-800 font-bold">
                                    <Sun className="w-5 h-5 mr-2" />
                                    饮食调养
                                </div>
                                <p className="text-sm text-orange-900 leading-relaxed">
                                    {result.advice.diet}
                                </p>
                            </div>
                            
                            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
                                <div className="flex items-center mb-3 text-blue-800 font-bold">
                                    <Leaf className="w-5 h-5 mr-2" />
                                    运动建议
                                </div>
                                <p className="text-sm text-blue-900 leading-relaxed">
                                    {result.advice.exercise}
                                </p>
                            </div>

                            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                                <div className="flex items-center mb-3 text-purple-800 font-bold">
                                    <Moon className="w-5 h-5 mr-2" />
                                    起居调摄
                                </div>
                                <p className="text-sm text-purple-900 leading-relaxed">
                                    {result.advice.lifestyle}
                                </p>
                            </div>
                        </div>

                        {/* Seasonal Advice - Dynamic based on date (Mocked as Winter here) */}
                        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-2 flex items-center">
                                    <Thermometer className="w-5 h-5 mr-2" />
                                    冬季节气养生提示
                                </h3>
                                <p className="opacity-90 leading-relaxed mb-4">
                                    此时节为"冬至"，阴气最盛，阳气始生。对于气虚质的您，应特别注意"潜阳补气"。
                                </p>
                                <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                                    <p className="font-medium text-sm">推荐药膳：黄芪炖鸡</p>
                                    <p className="text-xs opacity-80 mt-1">取黄芪30g，老母鸡1只，生姜3片。具有益气升阳，固表止汗之功效。</p>
                                </div>
                            </div>
                            <div className="absolute -bottom-8 -right-8 text-white/10">
                                <Sun className="w-48 h-48" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto animate-fade-in">
                    {/* Progress Bar */}
                    <div className="mb-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>进度</span>
                            <span>{pageIndex + 1} / {totalPages}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
                                style={{ width: `${Math.max(5, progress)}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Questions List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-800">请回答以下问题</h3>
                            <p className="text-gray-500 text-sm mt-1">最近三个月的体验，请选择最符合的一项。</p>
                        </div>
                        
                        <div className="divide-y divide-gray-100">
                            {currentQuestions.map((q, idx) => {
                                const globalIndex = pageIndex * QUESTIONS_PER_PAGE + idx + 1;
                                return (
                                    <div key={q.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start mb-4">
                                            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-emerald-100 text-emerald-600 rounded-full text-sm font-bold mr-3">
                                                {globalIndex}
                                            </span>
                                            <p className="text-gray-800 font-medium text-lg pt-0.5">{q.text}</p>
                                        </div>
                                        
                                        <div className="grid grid-cols-5 gap-2 ml-11">
                                            {OPTIONS.map((opt) => {
                                                const isSelected = answers[q.id] === opt.score;
                                                return (
                                                    <button
                                                        key={opt.score}
                                                        onClick={() => handleOptionSelect(q.id, opt.score)}
                                                        className={`
                                                            flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200
                                                            ${isSelected 
                                                                ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm' 
                                                                : 'border-gray-200 text-gray-600 hover:border-emerald-300 hover:bg-emerald-50/30'}
                                                        `}
                                                    >
                                                        <span className={`text-lg font-bold mb-1 ${isSelected ? 'text-emerald-600' : 'text-gray-400'}`}>
                                                            {opt.score}
                                                        </span>
                                                        <span className="text-sm font-medium">{opt.label}</span>
                                                        <span className="text-xs text-gray-400 scale-90">{opt.desc}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer Controls */}
                        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center sticky bottom-0">
                            <button 
                                onClick={handlePrevious}
                                className="flex items-center px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" />
                                {pageIndex === 0 ? '返回' : '上一页'}
                            </button>
                            
                            <button 
                                onClick={handleNext}
                                disabled={!isPageComplete}
                                className={`
                                    flex items-center px-8 py-2.5 rounded-lg font-medium shadow-sm transition-all
                                    ${isPageComplete 
                                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200' 
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                                `}
                            >
                                {pageIndex === totalPages - 1 ? (
                                    <>
                                        提交问卷
                                        <CheckCircle2 className="w-5 h-5 ml-2" />
                                    </>
                                ) : (
                                    <>
                                        下一页
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TCMConstitution;