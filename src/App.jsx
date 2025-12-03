import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  RefreshCcw, 
  PieChart,
  Target,
  Wallet,
  Eraser // 新增橡皮擦圖示
} from 'lucide-react';

const App = () => {
  // Tab State: 'risk' | 'position' | 'quick'
  const [activeTab, setActiveTab] = useState('risk');

  return (
    <>
      {/* [獨立主題 CSS 設定] */}
      <style>{`
        :root {
          /* 主題色票 */
          --bx-white: #F0F8FF;      
          --bx-pale-blue: #5CA4DA;  
          --bx-deep-blue: #1E468C;  
          --bx-red: #C13A45;        
          
          /* 輔助色 */
          --bx-green: #10B981;      
          --bx-text-main: #334155;  
        }

        /* 全域樣式應用 */
        .theme-blue-xmas {
          background-color: var(--bx-white);
          color: var(--bx-text-main);
        }
        
        .bg-theme-deep { background-color: var(--bx-deep-blue); }
        .text-theme-deep { color: var(--bx-deep-blue); }
        
        .text-theme-pale { color: var(--bx-pale-blue); }
        .border-theme-pale { border-color: var(--bx-pale-blue); }

        .text-theme-red { color: var(--bx-red); }
        .bg-theme-red-light { background-color: rgba(193, 58, 69, 0.1); }
        .border-theme-red { border-color: rgba(193, 58, 69, 0.2); }

        .text-theme-green { color: var(--bx-green); }
        .bg-theme-green-light { background-color: rgba(16, 185, 129, 0.1); }
        .border-theme-green { border-color: rgba(16, 185, 129, 0.2); }
      `}</style>

      {/* 版面結構：卡片置中 (min-h-screen + flex + justify-center) */}
      <div className="theme-blue-xmas min-h-screen w-full flex flex-col transition-colors duration-300">
        
        <div className="flex-1 flex items-center justify-center p-4 w-full">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
            
            {/* Header: 移除副標題 */}
            <div className="bg-white pt-6 pb-4 text-center shadow-sm z-10">
              <h1 className="text-2xl font-bold text-theme-deep flex items-center justify-center gap-3 tracking-wide">
                <TrendingUp className="text-theme-pale" size={28} /> 
                股票風險戰情室
              </h1>
            </div>

            {/* Navigation Tabs: 移除背景色，改用線條樣式 */}
            <div className="flex bg-white border-b border-slate-100">
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
              <TabButton 
                isActive={activeTab === 'quick'} 
                onClick={() => setActiveTab('quick')} 
                icon={<Target size={20} />} 
                label="快速策略" 
              />
            </div>

            {/* Content Area */}
            <div className="bg-white min-h-[450px] relative">
              {activeTab === 'risk' && <RiskCalculator />}
              {activeTab === 'position' && <PositionCalculator />}
              {activeTab === 'quick' && <QuickStrategy />}
            </div>

          </div>
        </div>
        
        <p className="pb-6 text-slate-400 text-xs text-center font-light tracking-wider w-full">
          投資一定有風險，計算結果僅供參考<br/>盈虧自負，請嚴格執行紀律
        </p>
      </div>
    </>
  );
};

// --- 元件: Tab 按鈕 (修改：選中時顏色改為紅色) ---
const TabButton = ({ isActive, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-4 text-sm font-bold flex flex-col items-center gap-1.5 transition-all duration-300 relative ${
      isActive 
        ? 'text-theme-red' // 選取時：改成紅色 (原本是 text-theme-pale)
        : 'text-slate-400 hover:text-slate-600' // 未選取：灰字
    }`}
  >
    {/* 底部線條指示器：顏色改成紅色 */}
    {isActive && (
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-theme-red rounded-t-full" />
    )}
    <span>{icon}</span>
    {label}
  </button>
);

// --- 功能 1: 風險報酬計算機 (新增重置按鈕) ---
const RiskCalculator = () => {
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
        
        {/* 新增：右上角清除按鈕 */}
        <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-slate-400">交易設定</span>
            <button 
              onClick={handleReset}
              className="text-slate-300 hover:text-theme-red transition-colors p-1"
              title="清除重置"
            >
              <Eraser size={20} />
            </button>
        </div>

        <InputGroup label="進場價" value={entryPrice} setValue={setEntryPrice} placeholder="100" />
        
        {/* 停損價與停利價：確保在同一行 (Grid Columns 2) */}
        <div className="grid grid-cols-2 gap-5">
          <InputGroup label="停損價" value={stopLoss} setValue={setStopLoss} theme="green" placeholder="90" />
          <InputGroup label="停利價" value={takeProfit} setValue={setTakeProfit} theme="red" placeholder="120" />
        </div>
      </div>

      {results ? (
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-inner mt-4">
           <div className="flex justify-between items-center mb-4">
              <span className={`text-sm font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm ${
                direction === 'long' 
                  ? 'bg-theme-red-light text-theme-red border border-theme-red' 
                  : 'bg-theme-green-light text-theme-green border border-theme-green'
              }`}>
                {direction === 'long' ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                {direction === 'long' ? '做多看漲' : '做空看跌'}
              </span>
              <span className="text-sm font-mono font-medium text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
                R:R = 1 : {results.rrRatio}
              </span>
           </div>
           
           <div className="grid grid-cols-2 gap-4 mb-4">
             <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500">
               <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Risk (停損)</div>
               <div className="font-bold text-2xl text-slate-700 mt-1">{results.riskPct}%</div>
             </div>
             <div className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-[var(--bx-red)]">
               <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">Reward (停利)</div>
               <div className="font-bold text-2xl text-slate-700 mt-1">{results.rewardPct}%</div>
             </div>
           </div>
           
           <div className="text-sm text-theme-deep bg-blue-50/80 p-4 rounded-xl border border-blue-100 flex gap-3 items-start">
             <div className="shrink-0 mt-0.5"><AlertTriangle size={16}/></div>
             <div className="leading-relaxed">{advice}</div>
           </div>
        </div>
      ) : (
        <EmptyState text="輸入價格計算損益比" />
      )}
    </div>
  );
};

// --- 功能 2: 資金分配計算機 (優化顯示區塊) ---
const PositionCalculator = () => {
  const [capital, setCapital] = useState('');
  const [price, setPrice] = useState('');
  
  const targetPercent = 0.30; 
  const investAmt = capital ? parseFloat(capital) * targetPercent : 0;
  const shares = (price && investAmt) ? Math.floor(investAmt / parseFloat(price)) : 0;

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-5">
        <InputGroup label="總資金 (Total Capital)" value={capital} setValue={setCapital} placeholder="例如: 1000000" icon={<Wallet size={18}/>} />
        <InputGroup label="股票現價 (Stock Price)" value={price} setValue={setPrice} placeholder="例如: 50" />
      </div>

      {capital && price ? (
        <div className="space-y-4">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
            <p className="text-sm text-slate-500 mb-2 font-bold tracking-wide">建議投入資金 (30%)</p>
            <p className="text-4xl font-black text-slate-700">
              ${investAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>

          {/* 修改樣式：淺藍底 + 深藍字 (比照快速策略風格) */}
          <div className="bg-[rgba(92,164,218,0.1)] p-6 rounded-2xl border border-[rgba(92,164,218,0.3)] shadow-sm relative overflow-hidden group hover:scale-[1.01] transition-transform">
            <div className="absolute -right-6 -top-6 text-theme-pale opacity-20 transform rotate-12">
               <PieChart size={140} />
            </div>
            
            <p className="text-theme-pale text-sm mb-3 font-bold uppercase tracking-wider">約可購買股數</p>
            
            <div className="flex items-end gap-3 relative z-10">
              <span className="text-5xl font-bold text-theme-deep">{shares.toLocaleString()}</span>
              <span className="text-xl text-theme-pale mb-1.5 font-light">股</span>
            </div>
            
            <div className="h-px w-full bg-theme-pale/20 my-4"></div>
            
            <p className="text-sm text-theme-deep flex items-center gap-2 font-medium">
              <span className="bg-white border border-theme-pale/30 text-theme-pale px-2 py-0.5 rounded text-xs">換算</span>
              {Math.floor(shares/1000)} 張 {shares%1000} 股
            </p>
          </div>
        </div>
      ) : (
        <EmptyState text="輸入資金與股價以計算部位" />
      )}
    </div>
  );
};

// --- 功能 3: 快速進出場策略 ---
const QuickStrategy = () => {
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
            <div className="bg-theme-red-light p-5 rounded-2xl border border-theme-red text-center hover:scale-[1.02] transition-transform">
              <div className="text-theme-red text-xs font-bold mb-2 uppercase tracking-wider">停利目標 (+4%)</div>
              <div className="text-3xl font-black text-theme-red">${tpPrice}</div>
            </div>
            <div className="bg-theme-green-light p-5 rounded-2xl border border-theme-green text-center hover:scale-[1.02] transition-transform">
              <div className="text-theme-green text-xs font-bold mb-2 uppercase tracking-wider">停損防守 (-5%)</div>
              <div className="text-3xl font-black text-theme-green">${slPrice5}</div>
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
                  <span className="text-theme-red font-bold bg-theme-red-light px-3 py-1 rounded-full text-xs border border-theme-red">
                    砍 70%
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
                  <span className="text-white font-bold bg-slate-800 px-3 py-1 rounded-full text-xs">
                    全砍
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <EmptyState text="輸入現價以生成操作策略" />
      )}
    </div>
  );
};

// --- Shared Components ---

const InputGroup = ({ label, value, setValue, placeholder, theme = "blue", icon }) => {
  const themeStyles = {
    blue: "focus:ring-[var(--bx-pale-blue)] focus:border-[var(--bx-pale-blue)] bg-slate-50",
    red: "focus:ring-[var(--bx-red)] focus:border-[var(--bx-red)] bg-theme-red-light/30 text-theme-red placeholder-red-200 border-theme-red/30",
    green: "focus:ring-[var(--bx-green)] focus:border-[var(--bx-green)] bg-theme-green-light/90 text-theme-green placeholder-green-200 border-theme-green/30"
  };
  
  const inputClass = themeStyles[theme];

  return (
    <div>
      <label className="block text-sm font-medium text-slate-500 mb-1.5 flex items-center gap-2">
        {icon} {label}
      </label>
      <div className="relative group">
        <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-sans transition-colors ${
           theme === 'red' ? 'text-theme-red/50' : theme === 'green' ? 'text-theme-green/50' : 'text-slate-400 group-hover:text-theme-pale'
        }`}>$</span>
        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-9 pr-4 py-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-opacity-20 text-xl font-bold transition-all shadow-sm ${inputClass}`}
        />
      </div>
    </div>
  );
};

const EmptyState = ({ text }) => (
  <div className="flex flex-col items-center justify-center h-56 text-slate-300">
    <div className="bg-slate-50 p-6 rounded-full mb-4 animate-pulse">
      <RefreshCcw size={32} className="text-slate-200" />
    </div>
    <p className="text-sm font-medium tracking-wide">{text}</p>
  </div>
);

export default App;