
import React, { useState, useEffect } from 'react';
import { getAIFoodRecommendations } from '../services/gemini';
import { Recommendation } from '../types';

interface HomeScreenProps {
  onLogout: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onLogout }) => {
  const [mood, setMood] = useState('출출함');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  const fetchRecommendations = async (selectedMood: string) => {
    setLoading(true);
    try {
      const rec = await getAIFoodRecommendations(selectedMood);
      setRecommendation(rec);
    } catch (error) {
      console.error("AI 추천 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations(mood);
  }, []);

  const moods = ['출출함', '스트레스', '기분 최고', '피곤함', '다이어트 중'];

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto w-full pb-24">
      {/* 상단바 */}
      <header className="px-6 py-6 flex items-center justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-20">
        <div className="flex flex-col">
          <span className="text-[10px] text-primary font-bold uppercase tracking-widest mb-0.5">Current Location</span>
          <div className="flex items-center gap-1 group cursor-pointer">
            <span className="material-symbols-outlined text-primary text-sm">location_on</span>
            <span className="font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">서울시 강남구 역삼동</span>
            <span className="material-symbols-outlined text-gray-400 text-xs">expand_more</span>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-10 h-10 rounded-xl bg-surface-dark flex items-center justify-center text-gray-400 hover:text-primary transition-all active:scale-95"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
        </button>
      </header>

      {/* 히어로 배너 */}
      <div className="px-6 mb-8">
        <div className="bg-gradient-to-br from-primary to-[#ff9f43] p-6 rounded-[2rem] text-white relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-1 leading-tight">무엇을<br/>먹어볼까요?</h3>
            <p className="text-white/80 text-xs mb-4 font-medium">Gemini AI가 당신의 기분을 분석하여<br/>최적의 메뉴를 골라드릴게요.</p>
            <button className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold hover:bg-white/30 transition-all">
              이용 가이드 보기
            </button>
          </div>
          <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-white/10 select-none" style={{ fontSize: '180px' }}>auto_awesome</span>
        </div>
      </div>

      {/* 기분 선택 섹션 */}
      <div className="px-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">지금 기분은?</h4>
          <span className="text-xs text-primary font-semibold">선택 시 추천 변경</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => {
                setMood(m);
                fetchRecommendations(m);
              }}
              className={`px-5 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-300 border ${
                mood === m 
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-105' 
                  : 'bg-white dark:bg-surface-dark text-gray-500 border-gray-100 dark:border-gray-800 hover:border-primary/50'
              }`}
            >
              {m === '출출함' && '😋 '}
              {m === '스트레스' && '🤯 '}
              {m === '기분 최고' && '✨ '}
              {m === '피곤함' && '😴 '}
              {m === '다이어트 중' && '🥗 '}
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* AI 추천 결과 */}
      <div className="px-6 space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-primary rounded-full"></div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">Gemini's Pick</h4>
          {loading && (
            <div className="ml-auto flex items-center gap-2 text-primary">
              <span className="text-xs font-bold animate-pulse">메뉴 고르는 중...</span>
              <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
            </div>
          )}
        </div>

        {recommendation ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-5 bg-primary/5 rounded-3xl border border-primary/20 relative">
              <span className="material-symbols-outlined absolute -top-3 -left-1 text-primary bg-background-dark px-1" style={{ fontSize: '24px' }}>format_quote</span>
              <p className="text-[13px] text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                {recommendation.reasoning}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {recommendation.suggestions.map((food, idx) => (
                <div 
                  key={idx} 
                  className="bg-white dark:bg-surface-dark p-4 rounded-2xl flex items-center gap-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                      {idx === 0 ? 'temp_pref_custom' : idx === 1 ? 'local_fire_department' : 'celebration'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900 dark:text-white mb-0.5">{food}</h5>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md font-bold uppercase">Popular</span>
                      <span className="text-[10px] text-gray-500 font-medium">배달 20-30분</span>
                    </div>
                  </div>
                  <button className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-400 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>shopping_cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : !loading && (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-surface-dark rounded-full flex items-center justify-center mb-2">
              <span className="material-symbols-outlined text-gray-600" style={{ fontSize: '40px' }}>restaurant_menu</span>
            </div>
            <p className="text-gray-500 font-medium">오늘의 기분을 선택하고<br/>맞춤 추천을 받아보세요!</p>
          </div>
        )}
      </div>

      {/* 하단 탭바 */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-surface-dark/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-8 py-4 flex justify-between items-center max-w-md mx-auto z-30 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <button className="flex flex-col items-center gap-1.5 text-primary group">
          <span className="material-symbols-outlined font-variation-fill" style={{ fontSize: '26px' }}>home</span>
          <span className="text-[10px] font-bold">홈</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>search</span>
          <span className="text-[10px] font-bold">검색</span>
        </button>
        <div className="relative -top-8">
          <button className="w-14 h-14 bg-primary rounded-2xl shadow-xl shadow-primary/40 flex items-center justify-center text-white active:scale-90 transition-all">
            <span className="material-symbols-outlined" style={{ fontSize: '30px' }}>receipt_long</span>
          </button>
        </div>
        <button className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>favorite</span>
          <span className="text-[10px] font-bold">찜</span>
        </button>
        <button className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-primary transition-colors">
          <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>person</span>
          <span className="text-[10px] font-bold">마이</span>
        </button>
      </nav>
    </div>
  );
};

export default HomeScreen;
