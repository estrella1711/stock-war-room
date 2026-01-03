import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  PieChart,
  Target,
  Gift,       
  Snowflake,  
  Bell,
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
  const [activeTab, setActiveTab] = useState('quick');

  return (
    <>
      <div className={`theme-base min-h-screen w-full flex flex-col transition-colors duration-300 overflow-hidden relative`}>

        {/* === 背景飄浮裝飾 === */}        
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
        

        <div className="flex-1 flex items-center justify-center p-4 w-full z-10">
          
          {/* 卡片容器 */}
          <div className={`w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 border-t-4 border-theme-deep border-x border-b border-slate-100`}>
            
            {/* Header */}
            <div className="bg-white pt-7 pb-5 text-center shadow-sm z-10 relative overflow-hidden">
                  <div className="absolute top-2 left-4 text-theme-green opacity-20 -rotate-12"><Snowflake size={20} /></div>
              <h1 className="text-2xl font-bold text-theme-deep flex items-center justify-center gap-3 tracking-wide relative">
                <TrendingUp className="text-theme-red drop-shadow-sm" size={28} /> 
                <span>股票風險戰情室</span>
               
              </h1>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-white border-b border-slate-100">
               <TabButton 
                isActive={activeTab === 'quick'} 
                onClick={() => setActiveTab('quick')} 
                icon={<Target size={20} />} 
                label="快速策略"
              />
              <TabButton 
                isActive={activeTab === 'risk'} 
                onClick={() => setActiveTab('risk')} 
                icon={<Calculator size={20} />} 
                label="損益試算"
              />
              <TabButton 
                isActive={activeTab === 'position'} 
                onClick={() => setActiveTab('position')} 
                icon={<PieChart size={20} />} 
                label="買股資金"
              />
            
            </div>

            {/* Content Area */}
            <div className="bg-white min-h-[450px] relative">
              {activeTab === 'quick' && <QuickStrategy  />}
              {activeTab === 'risk' && <RiskCalculator  />}
              {activeTab === 'position' && <PositionCalculator />}
             
            </div>

          </div>
        </div>
        
        {/* Footer */}
        <div className="pb-6 w-full z-10 relative flex flex-col items-center justify-center gap-2">
          <p className="text-slate-400 text-xs text-center font-light tracking-wider flex items-center gap-2">
             <Carrot size={12} className="text-orange-300 opacity-70"/>
            投資一定有風險，盈虧自負，請嚴格執行紀律
           <Rabbit size={12} className="text-slate-300 opacity-70"/>
          </p>
        </div>
      </div>
    </>
  );
};

export default App;