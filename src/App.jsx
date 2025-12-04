import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  PieChart,
  Target,
  Wallet,
  Eraser,
  Gift,       
  Snowflake,  
  Bell,
  Scissors,   
  Skull,
  ToggleLeft,  
  ToggleRight,
  Rabbit,
  Trees,
  Carrot,         
  Sparkles   
} from 'lucide-react';
import {TabButton } from './components/Tab';
import {RiskCalculator } from './components/RiskCalculator';
import {PositionCalculator } from './components/PositionCalculator';
import {QuickStrategy } from './components/QuickStrategy';
import './styles/BaseTheme.css';
import './styles/XmasTheme.css';
const App = () => {
  // Tab State: 'risk' | 'position' | 'quick'
  const [activeTab, setActiveTab] = useState('risk');
  
  // Theme State: 聖誕裝飾模式開關 (預設 true: 開啟聖誕模式)
  const [isXmasMode, setIsXmasMode] = useState(false);

  return (
    <>

      {/* 主容器：根據 isXmasMode 決定是否套用 .xmas-effects */}
      <div className={`theme-base min-h-screen w-full flex flex-col transition-colors duration-300 overflow-hidden relative ${isXmasMode ? 'xmas-effects' : ''}`}>
        
        {/* === 右上角控制區 === */}
        <div className="absolute top-4 right-4 z-50 flex flex-col gap-2 items-end">
          
          {/* 1. 聖誕模式切換開關 */}
          <button 
            onClick={() => setIsXmasMode(!isXmasMode)}
            className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md hover:bg-white transition-all text-sm font-bold text-slate-600 border border-slate-200 cursor-pointer active:scale-95 select-none"
          >
            <span className="text-xs tracking-wider font-mono">{isXmasMode ? 'XMAS ON' : 'XMAS OFF'}</span>
            {isXmasMode ? 
              <ToggleRight className="text-theme-green fill-theme-green/20" size={24} /> : 
              <ToggleLeft className="text-slate-300" size={24} />
            }
          </button>

        </div>

        {/* === 背景飄浮裝飾 === */}
        {isXmasMode ? (
          // 聖誕模式：雪花、鈴鐺、聖誕樹
          <>
            <div className="absolute top-8 left-8 text-theme-pale opacity-20 rotate-12 pointer-events-none animate-pulse">
                <Snowflake size={64} />
            </div>
            <div className="absolute bottom-12 right-8 text-theme-gold opacity-30 -rotate-12 pointer-events-none">
                <Bell size={48} />
            </div>
            {/* 左下角聖誕樹 */}
            <div className="absolute bottom-8 left-8 text-theme-green opacity-20 rotate-6 pointer-events-none">
                <Trees size={72} />
            </div>
          </>
        ) : (
          // 普通模式：可愛小兔子樂園 (兔子、紅蘿蔔、閃亮)
          <>
             {/* 左上角：兔子與紅蘿蔔 */}
             <div className="absolute top-12 left-10 text-slate-300/70 -rotate-12 pointer-events-none">
                <Rabbit size={64} />
             </div>
             <div className="absolute top-8 left-28 text-orange-300/50 rotate-45 pointer-events-none animate-pulse">
                <Carrot size={28} />
             </div>

             {/* 右下角：另一隻兔子 */}
             <div className="absolute bottom-20 right-10 text-slate-300/70 rotate-12 pointer-events-none">
                <Rabbit size={56} />
             </div>

             {/* 隨機點綴：閃亮元素 */}
             <div className="absolute top-1/3 right-12 text-yellow-300/40 pointer-events-none">
                <Sparkles size={32} />
             </div>
             <div className="absolute bottom-1/4 left-16 text-blue-200/40 pointer-events-none">
                <Sparkles size={24} />
             </div>
          </>
        )}

        <div className="flex-1 flex items-center justify-center p-4 w-full z-10">
          
          {/* 卡片容器 */}
          <div className={`w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ${isXmasMode ? 'candy-cane-border-all' : 'border-t-4 border-theme-deep border-x border-b border-slate-100'}`}>
            
            {/* Header */}
            <div className="bg-white pt-7 pb-5 text-center shadow-sm z-10 relative overflow-hidden">
              
              {/* 聖誕標題裝飾圖示 */}
              {isXmasMode && (
                <>
                  <div className="absolute top-2 right-4 text-theme-red opacity-20 rotate-45"><Gift size={24} /></div>
                  <div className="absolute top-2 left-4 text-theme-green opacity-20 -rotate-12"><Snowflake size={20} /></div>
                </>
              )}

              <h1 className="text-2xl font-bold text-theme-deep flex items-center justify-center gap-3 tracking-wide relative">
                <TrendingUp className="text-theme-red drop-shadow-sm" size={28} /> 
                <span>股票風險戰情室</span>
               
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-white border-b border-slate-100">
             
              <TabButton 
                isActive={activeTab === 'risk'} 
                onClick={() => setActiveTab('risk')} 
                icon={<Calculator size={20} />} 
                label="損益試算"
                isXmasMode={isXmasMode}
              />
              <TabButton 
                isActive={activeTab === 'position'} 
                onClick={() => setActiveTab('position')} 
                icon={<PieChart size={20} />} 
                label="買股資金"
                isXmasMode={isXmasMode} 
              />
              <TabButton 
                isActive={activeTab === 'quick'} 
                onClick={() => setActiveTab('quick')} 
                icon={<Target size={20} />} 
                label="快速策略"
                isXmasMode={isXmasMode} 
              />
            </div>

            {/* Content Area */}
            <div className="bg-white min-h-[450px] relative">
                {isXmasMode && (
                  <span className="text-[10px] bg-theme-red text-white px-2 py-0.5 rounded-full absolute -top-3 -right-6 rotate-12 shadow-sm animate-bounce">Xmas</span>
                )}
              {activeTab === 'risk' && <RiskCalculator isXmasMode={isXmasMode} />}
              {activeTab === 'position' && <PositionCalculator isXmasMode={isXmasMode} />}
              {activeTab === 'quick' && <QuickStrategy isXmasMode={isXmasMode} />}
            </div>

          </div>
        </div>
        
        {/* Footer */}
        <div className="pb-6 w-full z-10 relative flex flex-col items-center justify-center gap-2">
          <p className="text-slate-400 text-xs text-center font-light tracking-wider flex items-center gap-2">
            {isXmasMode ? <Snowflake size={12} className="text-theme-pale opacity-50"/> : <Carrot size={12} className="text-orange-300 opacity-70"/>}
            投資一定有風險，盈虧自負，請嚴格執行紀律
            {isXmasMode ? <Snowflake size={12} className="text-theme-pale opacity-50"/> : <Rabbit size={12} className="text-slate-300 opacity-70"/>}
          </p>
        </div>
      </div>
    </>
  );
};

export default App;