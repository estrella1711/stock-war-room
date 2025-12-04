import React, { useState } from 'react';
import { 
  Gift, 
  Wallet, 
  Bell, 
  PieChart, 
  Carrot,
  Sprout,
  Eraser
} from 'lucide-react';
// [修正] 加上 .jsx 副檔名以確保編譯器能正確解析路徑
import { InputGroup, EmptyState } from './SharedComponents.jsx';

const PositionCalculator = ({ isXmasMode }) => {
  const [capital, setCapital] = useState('');
  const [price, setPrice] = useState('');
  
  // 投入資金百分比狀態 (預設 30%)
  const [investPercent, setInvestPercent] = useState(30);
  
  const targetPercent = investPercent / 100; 
  const investAmt = capital ? parseFloat(capital) * targetPercent : 0;
  const shares = (price && investAmt) ? Math.floor(investAmt / parseFloat(price)) : 0;

  // 新增：重置功能 (保留總資金)
  const handleReset = () => {
    setPrice('');          // 清空股價
    setInvestPercent(30);  // 重置比例回 30%
    // setCapital('');     // 不清空總資金，方便連續計算
  };

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      
      {/* 輸入區塊 (含標題與重置按鈕) */}
      <div className="space-y-5 relative">
        <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-theme-deep flex items-center gap-1">
              {isXmasMode ? <Gift size={20} className="text-theme-red opacity-70 mb-0.5"/> : <Sprout size={20} className="text-theme-green opacity-70 mb-0.5"/>}
              資金設定
            </span>
            <button 
              onClick={handleReset}
              className="text-slate-300 hover:text-theme-red transition-colors p-1 hover:bg-theme-red-light rounded-full"
              title="清除設定 (保留總資金)"
            >
              <Eraser size={20} />
            </button>
        </div>

        <InputGroup label="總資金 (Total Capital)" value={capital} setValue={setCapital} placeholder="1000000" icon={<Wallet size={18}/>} />
        <InputGroup label="股票現價 (Stock Price)" value={price} setValue={setPrice} placeholder="100" />
      </div>

      {capital && price ? (
        <div className="space-y-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center relative overflow-hidden">
            {isXmasMode && <div className="absolute top-2 left-2 text-theme-gold opacity-40"><Bell size={20} /></div>}
            
            {/* 百分比滑桿控制區 */}
            <div className="mb-4">
              <label htmlFor="percent-range" className="text-sm text-slate-500 mb-2 font-bold tracking-wide block">
                設定投入比例: <span className="text-xl text-theme-pale font-black ml-1">{investPercent}%</span>
              </label>
              <div className="px-4">
                <input
                  id="percent-range"
                  type="range"
                  min="1"
                  max="100"
                  step="1"
                  value={investPercent}
                  onChange={(e) => setInvestPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: 'var(--bx-pale-blue)' }}
                />
                <div className="flex justify-between text-[10px] text-theme-deep/30 mt-1 font-mono">
                  <span>1%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>

            <p className="text-4xl font-black text-slate-700 transition-all duration-300">
              ${investAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-[rgba(92,164,218,0.1)] p-6 rounded-2xl border border-[rgba(92,164,218,0.3)] shadow-sm relative overflow-hidden group hover:scale-[1.01] transition-transform">
            <div className="absolute -right-6 -top-6 text-theme-pale opacity-20 transform rotate-12">
               <PieChart size={140} />
            </div>
            
            <p className="text-theme-pale text-sm mb-3 font-bold uppercase tracking-wider flex items-center gap-1">
              {isXmasMode ? <Gift size={16} className="mb-1"/> : <Carrot size={16} className="mb-1 text-orange-400"/>} 約可購買股數
            </p>
            
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-5xl font-bold text-theme-deep">
                {shares.toLocaleString()}
              </span>
              <span className="text-xl text-theme-pale mb-1.5 font-light">股</span>
            </div>
            
            <div className="h-px w-full bg-theme-pale/20 my-4"></div>
            
            <p className="text-sm text-theme-deep flex items-center gap-2 font-medium">
              <span className="bg-white border border-theme-pale/30 text-theme-pale px-2 py-0.5 rounded text-xs shadow-sm">換算</span>
              {Math.floor(shares/1000)} 張 {shares%1000} 股
            </p>
          </div>
        </div>
      ) : (
        <EmptyState text="輸入資金與股價以計算部位" isXmasMode={isXmasMode} />
      )}
    </div>
  );
};

export default PositionCalculator;