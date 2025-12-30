
import React, { useState } from 'react';
import { AuthMode } from '../types.ts';

interface AuthScreenProps {
  onLoginSuccess: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>(AuthMode.LOGIN);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLoginSuccess();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark max-w-md mx-auto w-full overflow-x-hidden">
      {/* 히어로 영역 */}
      <div className="relative w-full h-[38vh] min-h-[300px] rounded-b-[3rem] overflow-hidden shrink-0 shadow-2xl">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-110" 
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1000')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col items-start justify-end">
          <div className="flex items-center gap-2 mb-3 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '20px' }}>lunch_dining</span>
            <span className="text-white font-bold tracking-[0.2em] text-[10px] uppercase">K-Food Delivery</span>
          </div>
          <h1 className="text-white text-4xl font-black tracking-tight leading-tight">
            지금 가장<br/>
            <span className="text-primary">맛있는 음식</span>을<br/>
            만나보세요
          </h1>
        </div>
      </div>

      {/* 폼 영역 */}
      <div className="flex-1 flex flex-col px-8 py-8 w-full -mt-6 relative z-10 bg-background-light dark:bg-background-dark rounded-t-[3rem]">
        {/* 탭 전환 */}
        <div className="flex p-1.5 mb-10 bg-gray-100 dark:bg-surface-dark rounded-2xl">
          <button 
            onClick={() => setMode(AuthMode.LOGIN)}
            className={`flex-1 py-3 px-4 text-center text-sm font-bold rounded-xl transition-all duration-300 ${
              mode === AuthMode.LOGIN ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            로그인
          </button>
          <button 
            onClick={() => setMode(AuthMode.SIGNUP)}
            className={`flex-1 py-3 px-4 text-center text-sm font-bold rounded-xl transition-all duration-300 ${
              mode === AuthMode.SIGNUP ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-lg' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            회원가입
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
            {mode === AuthMode.LOGIN ? '반가워요! 👋' : '함께할까요? ✨'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            {mode === AuthMode.LOGIN 
              ? '계정에 로그인하여 맛있는 미식을 즐겨보세요.' 
              : '간단한 가입으로 나만의 AI 추천 메뉴를 받아보세요.'}
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-1">이메일 주소</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">mail</span>
              </div>
              <input 
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-surface-dark border-2 border-transparent focus:border-primary/30 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all text-sm font-medium" 
                placeholder="example@email.com" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold text-primary uppercase tracking-widest ml-1">비밀번호</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 group-focus-within:text-primary transition-colors">lock</span>
              </div>
              <input 
                className="block w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-surface-dark border-2 border-transparent focus:border-primary/30 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none transition-all text-sm font-medium" 
                placeholder="비밀번호를 입력하세요" 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white font-black py-5 rounded-2xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span className="text-lg font-bold">{mode === AuthMode.LOGIN ? '로그인하기' : '지금 시작하기'}</span>
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>chevron_right</span>
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-[0.3em] font-bold">
            <span className="bg-background-light dark:bg-background-dark px-4 text-gray-400">
              SNS 계정 연결
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center gap-3 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-[#3a2d20] border-2 border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white py-3.5 px-4 rounded-2xl transition-all shadow-sm">
            <img src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png" className="w-5 h-5" alt="Google" />
            <span className="text-sm font-bold">Google</span>
          </button>
          <button className="flex items-center justify-center gap-3 bg-white dark:bg-surface-dark hover:bg-gray-50 dark:hover:bg-[#3a2d20] border-2 border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white py-3.5 px-4 rounded-2xl transition-all shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>apple</span>
            <span className="text-sm font-bold">Apple</span>
          </button>
        </div>

        <div className="mt-auto pt-10 text-center">
          <p className="text-xs text-gray-400 font-medium">
            이용에 어려움이 있으신가요? 
            <a className="text-primary font-bold hover:underline ml-1.5" href="#">카카오 상담</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
