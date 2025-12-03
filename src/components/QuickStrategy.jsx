import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Gift, 
  Carrot, 
  Snowflake, 
  Rabbit, 
  Scissors, 
  Skull,
  Eraser // 新增 Eraser 圖示
} from 'lucide-react';
import { InputGroup, EmptyState } from './SharedComponents';

export const QuickStrategy = ({ isXmasMode }) => {
  const [price, setPrice] = useState('');
  
  // 自定義百分比狀態
  const [tpPercent, setTpPercent] = useState(4); // 停利預設 4%
  const [slPercent, setSlPercent] = useState(5); // 停損預設 5%

  const p = parseFloat(price);

  // 動態計算價格
  const tpPrice = p ? (p * (1 + tpPercent / 100)).toFixed(2) : '-';
  const slPrice = p ? (p * (1 - slPercent / 100)).toFixed(2) : '-';
  
  // 第二道防線 (硬停損)：設定為主要停損 + 5%
  const hardSlPercent = slPercent + 5;
  const hardSlPrice = p ? (p * (1 - hardSlPercent / 100)).toFixed(2) : '-';

  // 重置功能
  const handleReset = () => {
    setPrice('');
    setTpPercent(4);
    setSlPercent(5);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* 標題與清除按鈕區塊 */}
      <div className="space-y-5 relative">
        <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-slate-400 flex items-center gap-1">
              {isXmasMode ? <Gift size={16} className="text-theme-red opacity-70 mb-0.5"/> : <Rabbit size={16} className="text-slate-400 opacity-70 mb-0.5"/>}
              交易設定
            </span>
            <button 
              onClick={handleReset}
              className="text-slate-300 hover:text-theme-red transition-colors p-1 hover:bg-theme-red-light rounded-full"
              title="清除重置"
            >
              <Eraser size={20} />
            </button>
        </div>

        <InputGroup label="股票現價" value={price} setValue={setPrice} placeholder="例如: 80" />
      </div>

      {p ? (
        <div className="space-y-5">
          {/* 停利停損卡片區 */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* 紅色：停利目標 */}
            <div className="bg-theme-red-light p-4 rounded-2xl border border-theme-red text-center hover:scale-[1.02] transition-transform relative overflow-hidden flex flex-col justify-between">
              {isXmasMode && <div className="absolute -top-2 -left-2 text-theme-red opacity-10 rotate-45"><Gift size={40}/></div>}
              {!isXmasMode && <div className="absolute -top-2 -left-2 text-orange-200 opacity-20 rotate-45"><Carrot size={40}/></div>}
              
              <div className="relative z-10">
                <div className="text-theme-red text-xs font-bold mb-1 uppercase tracking-wider">停利目標 (+{tpPercent}%)</div>
                <div className="text-2xl sm:text-3xl font-black text-theme-red mb-2">
                  ${tpPrice}
                </div>
              </div>

              {/* 停利拉桿 */}
              <div className="relative z-10 px-1">
                <input 
                  type="range" 
                  min="3" 
                  max="30" 
                  step="0.5"
                  value={tpPercent} 
                  onChange={(e) => setTpPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-red-200 rounded-lg appearance-none cursor-pointer accent-[var(--bx-red)]"
                />
              </div>
            </div>

            {/* 綠色：停損防守 */}
            <div className="bg-theme-green-light p-4 rounded-2xl border border-theme-green text-center hover:scale-[1.02] transition-transform relative overflow-hidden flex flex-col justify-between">
              {isXmasMode && <div className="absolute -bottom-2 -right-2 text-theme-green opacity-10 -rotate-12"><Snowflake size={50}/></div>}
              {!isXmasMode && <div className="absolute -bottom-2 -right-2 text-slate-300 opacity-20 -rotate-12"><Rabbit size={50}/></div>}
              
              <div className="relative z-10">
                <div className="text-theme-green text-xs font-bold mb-1 uppercase tracking-wider">停損防守 (-{slPercent}%)</div>
                <div className="text-2xl sm:text-3xl font-black text-theme-green mb-2">
                  ${slPrice}
                </div>
              </div>

              {/* 停損拉桿 */}
              <div className="relative z-10 px-1">
                <input 
                  type="range" 
                  min="3" 
                  max="20" 
                  step="0.5"
                  value={slPercent} 
                  onChange={(e) => setSlPercent(Number(e.target.value))}
                  className="w-full h-1.5 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-[var(--bx-green)]"
                />
              </div>
            </div>
          </div>

          {/* 紀律操作提醒區 */}
          <div className="bg-orange-50/50 border-l-4 border-orange-400 p-5 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-orange-900 flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-orange-500" />
              短線操作紀律
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm">
                <span className="text-orange-800 font-medium">第一停損 {slPercent}%</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-700 bg-white px-3 py-1 rounded-md border border-orange-100 shadow-sm">
                    ${slPrice}
                  </span>
                  <span className="text-theme-red font-bold bg-theme-red-light px-3 py-1 rounded-full text-xs border border-theme-red flex items-center gap-1">
                    <Scissors size={12} /> 砍 70%
                  </span>
                </div>
              </li>
              <li className="w-full h-px bg-orange-200/50"></li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-orange-800 font-medium">硬停損 {hardSlPercent}%</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-700 bg-white px-3 py-1 rounded-md border border-orange-100 shadow-sm">
                    ${hardSlPrice}
                  </span>
                  <span className="text-white font-bold bg-slate-800 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Skull size={12} /> 全砍
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <EmptyState text="輸入現價以生成操作策略" isXmasMode={isXmasMode} />
      )}
    </div>
  );
};

export default QuickStrategy;