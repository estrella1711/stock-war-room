import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Eraser, 
  Gift, 
  Rabbit 
} from 'lucide-react';
import { InputGroup, EmptyState } from './SharedComponents';

// --- 功能 3: 快速進出場策略 ---
export const QuickStrategy = ({ isXmasMode }) => {
  const [price, setPrice] = useState('');
  const p = parseFloat(price);

  const tpPrice = p ? (p * 1.04).toFixed(2) : '-';
  const slPrice5 = p ? (p * 0.95).toFixed(2) : '-';
  const slPrice10 = p ? (p * 0.90).toFixed(2) : '-';

  return (
    <div className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <InputGroup label="股票現價" value={price} setValue={setPrice} placeholder="例如: 80" />

      {p ? (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-theme-red-light p-5 rounded-2xl border border-theme-red text-center hover:scale-[1.02] transition-transform relative overflow-hidden">
              {isXmasMode && <div className="absolute -top-2 -left-2 text-theme-red opacity-10 rotate-45"><Gift size={40}/></div>}
              {!isXmasMode && <div className="absolute -top-2 -left-2 text-orange-200 opacity-20 rotate-45"><Carrot size={40}/></div>}
              <div className="text-theme-red text-xs font-bold mb-2 uppercase tracking-wider relative z-10">停利目標 (+4%)</div>
              <div className="text-3xl font-black text-theme-red relative z-10">
                ${tpPrice}
              </div>
            </div>
            <div className="bg-theme-green-light p-5 rounded-2xl border border-theme-green text-center hover:scale-[1.02] transition-transform relative overflow-hidden">
              {isXmasMode && <div className="absolute -bottom-2 -right-2 text-theme-green opacity-10 -rotate-12"><Snowflake size={50}/></div>}
              {!isXmasMode && <div className="absolute -bottom-2 -right-2 text-slate-300 opacity-20 -rotate-12"><Rabbit size={50}/></div>}
              <div className="text-theme-green text-xs font-bold mb-2 uppercase tracking-wider relative z-10">停損防守 (-5%)</div>
              <div className="text-3xl font-black text-theme-green relative z-10">
                ${slPrice5}
              </div>
            </div>
          </div>

          <div className="bg-orange-50/50 border-l-4 border-orange-400 p-5 rounded-r-2xl shadow-sm">
            <h3 className="font-bold text-orange-900 flex items-center gap-2 mb-4">
              <AlertTriangle size={20} className="text-orange-500" />
              短線操作紀律
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm">
                <span className="text-orange-800 font-medium">停損 5%</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-700 bg-white px-3 py-1 rounded-md border border-orange-100 shadow-sm">
                    ${slPrice5}
                  </span>
                  <span className="text-theme-red font-bold bg-theme-red-light px-3 py-1 rounded-full text-xs border border-theme-red flex items-center gap-1">
                    <Scissors size={12} /> 砍 70%
                  </span>
                </div>
              </li>
              <li className="w-full h-px bg-orange-200/50"></li>
              <li className="flex justify-between items-center text-sm">
                <span className="text-orange-800 font-medium">停損 10%</span>
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-slate-700 bg-white px-3 py-1 rounded-md border border-orange-100 shadow-sm">
                    ${slPrice10}
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