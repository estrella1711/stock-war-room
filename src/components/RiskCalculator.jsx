import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Eraser, 
  Gift, 
  Sprout
  
} from 'lucide-react';
import { InputGroup, EmptyState } from './SharedComponents';
 // --- 功能 1: 風險報酬計算機 ---
export const RiskCalculator = () => {
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [results, setResults] = useState(null);
  const [advice, setAdvice] = useState('');
  const [direction, setDirection] = useState('long');

  useEffect(() => {
    calculate();
  }, [entryPrice, stopLoss, takeProfit]);

  const handleReset = () => {
    setEntryPrice('');
    setStopLoss('');
    setTakeProfit('');
    setResults(null);
  };

  const calculate = () => {
    const entry = parseFloat(entryPrice);
    const sl = parseFloat(stopLoss);
    const tp = parseFloat(takeProfit);

    if (!entry || !sl || !tp || entry <= 0) {
      setResults(null);
      return;
    }

    let riskAmt = 0, rewardAmt = 0, currentDirection = 'long';

    if (tp > entry && entry > sl) {
      currentDirection = 'long';
      riskAmt = entry - sl;
      rewardAmt = tp - entry;
    } else if (sl > entry && entry > tp) {
      currentDirection = 'short';
      riskAmt = sl - entry;
      rewardAmt = entry - tp;
    } else {
      setResults(null); 
      setAdvice('價格邏輯錯誤');
      return;
    }

    const riskPct = (riskAmt / entry) * 100;
    const rewardPct = (rewardAmt / entry) * 100;
    const rrRatio = rewardAmt / riskAmt;

    setDirection(currentDirection);
    setResults({
      riskPct: riskPct.toFixed(2),
      rewardPct: rewardPct.toFixed(2),
      rrRatio: rrRatio.toFixed(2)
    });

    if (riskPct > 10) setAdvice("⚠️ 風險 > 10%，部位請縮小。");
    else if (rrRatio < 1) setAdvice("❌ 損益比 < 1，不建議進場。");
    else if (rrRatio >= 3) setAdvice("🚀 損益比 > 3，優質交易。");
    else setAdvice("✅ 損益比正常，可依計畫執行。");
  };

  return (
    <div className="p-6 md:p-8 space-y-6 animate-in fade-in zoom-in duration-300">
      <div className="space-y-5 relative">
        
        {/* 標題與清除按鈕 */}
        <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-theme-deep flex items-center gap-1">
              <Sprout size={20} className="text-theme-green opacity-70 mb-0.5"/>
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

        <InputGroup label="進場價" value={entryPrice} setValue={setEntryPrice} placeholder="0" />
        
        <div className="grid grid-cols-2 gap-5">
          <InputGroup label="停損價" value={stopLoss} setValue={setStopLoss} theme="green" placeholder="0" />
          <InputGroup label="停利價" value={takeProfit} setValue={setTakeProfit} theme="red" placeholder="0" />
        </div>
      </div>

      {results ? (
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner mt-4 relative overflow-hidden">
          
           <div className="flex justify-between items-center mb-4 relative z-10">
              <span className={`text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm ${
                direction === 'long' 
                  ? 'bg-theme-red-light text-theme-red border border-theme-red' 
                  : 'bg-theme-green-light text-theme-green border border-theme-green'
              }`}>
                {direction === 'long' ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                {direction === 'long' ? '做多看漲' : '做空看跌'}
              </span>
              <span className="text-sm font-mono font-medium text-slate-500 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm flex items-center gap-1">
               
                R:R = 1 : {results.rrRatio}
              </span>
           </div>
           
           <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
             <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-theme-green">
               <div className="text-xs text-theme-deep/30 font-medium uppercase tracking-wider">Risk (停損)</div>
               <div className="font-bold text-2xl text-slate-700 mt-1">
                 {results.riskPct}%
               </div>
             </div>
             <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[var(--bx-red)]">
               <div className="text-xs text-theme-deep/30 font-medium uppercase tracking-wider">Reward (停利)</div>
               <div className="font-bold text-2xl text-slate-700 mt-1">
                 {results.rewardPct}%
               </div>
             </div>
           </div>
           
           <div className="text-sm text-theme-deep bg-blue-50/80 p-4 rounded-xl border border-blue-100 flex gap-3 items-start relative z-10">
             <div className="leading-relaxed">{advice}</div>
           </div>
        </div>
      ) : (
        <EmptyState text="輸入價格計算損益比"  />
      )}
    </div>
  );
};
export default RiskCalculator;